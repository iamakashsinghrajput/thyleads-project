import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "visitor-logs.json");

interface VisitorLog {
  id: string;
  timestamp: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  lat: number | null;
  lon: number | null;
  isp: string;
  // System info
  browser: string;
  os: string;
  device: string;
  screenResolution: string;
  language: string;
  // Page info
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  // Cookie
  visitorId: string;
  visitCount: number;
  firstVisit: string;
}

async function getVisitorLogs(): Promise<VisitorLog[]> {
  try {
    const data = await fs.readFile(LOG_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveVisitorLogs(logs: VisitorLog[]) {
  await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
}

function isLocalIP(ip: string): boolean {
  return ip === "::1" || ip === "127.0.0.1" || ip === "localhost" || ip === "Unknown" || ip.startsWith("192.168.") || ip.startsWith("10.");
}

async function getGeoFromIP(ip: string) {
  try {
    // If local IP, fetch public IP first
    const url = isLocalIP(ip)
      ? "http://ip-api.com/json/?fields=query,city,regionName,country,lat,lon,isp"
      : `http://ip-api.com/json/${ip}?fields=query,city,regionName,country,lat,lon,isp`;

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return {
        resolvedIP: data.query || ip,
        city: data.city || "Unknown",
        region: data.regionName || "Unknown",
        country: data.country || "Unknown",
        lat: data.lat || null,
        lon: data.lon || null,
        isp: data.isp || "Unknown",
      };
    }
  } catch {}
  return { resolvedIP: ip, city: "Unknown", region: "Unknown", country: "Unknown", lat: null, lon: null, isp: "Unknown" };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get IP from headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "Unknown";

    // Get geo data from IP (resolves public IP if local)
    const geo = await getGeoFromIP(ip);

    const log: VisitorLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ip: geo.resolvedIP,
      ...geo,
      browser: body.browser || "Unknown",
      os: body.os || "Unknown",
      device: body.device || "Unknown",
      screenResolution: body.screenResolution || "Unknown",
      language: body.language || "Unknown",
      page: body.page || "Unknown",
      referrer: body.referrer || "Direct",
      utmSource: body.utmSource || "",
      utmMedium: body.utmMedium || "",
      utmCampaign: body.utmCampaign || "",
      utmTerm: body.utmTerm || "",
      visitorId: body.visitorId || "",
      visitCount: body.visitCount || 1,
      firstVisit: body.firstVisit || new Date().toISOString(),
    };

    const logs = await getVisitorLogs();
    logs.push(log);

    // Keep only last 10,000 entries
    if (logs.length > 10000) {
      logs.splice(0, logs.length - 10000);
    }

    await saveVisitorLogs(logs);

    return NextResponse.json({ ok: true, visitorId: log.visitorId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Group logs by visitor (IP-based, 1 IP = 1 user)
function groupByVisitor(logs: VisitorLog[]) {
  const grouped: Record<string, {
    ip: string;
    visitorId: string;
    city: string;
    region: string;
    country: string;
    isp: string;
    browser: string;
    os: string;
    device: string;
    screenResolution: string;
    language: string;
    referrer: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmTerm: string;
    firstSeen: string;
    lastSeen: string;
    totalTimeSpent: number; // seconds
    pagesVisited: { page: string; timestamp: string; timeSpent: number }[];
  }> = {};

  // Sort logs by timestamp
  const sorted = [...logs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  for (const log of sorted) {
    const key = log.ip;

    if (!grouped[key]) {
      grouped[key] = {
        ip: log.ip,
        visitorId: log.visitorId,
        city: log.city,
        region: log.region,
        country: log.country,
        isp: log.isp,
        browser: log.browser,
        os: log.os,
        device: log.device,
        screenResolution: log.screenResolution,
        language: log.language,
        referrer: log.referrer,
        utmSource: log.utmSource,
        utmMedium: log.utmMedium,
        utmCampaign: log.utmCampaign,
        utmTerm: log.utmTerm,
        firstSeen: log.timestamp,
        lastSeen: log.timestamp,
        totalTimeSpent: 0,
        pagesVisited: [],
      };
    }

    const user = grouped[key];
    user.lastSeen = log.timestamp;

    // Calculate time spent on previous page
    if (user.pagesVisited.length > 0) {
      const prevPage = user.pagesVisited[user.pagesVisited.length - 1];
      const prevTime = new Date(prevPage.timestamp).getTime();
      const currTime = new Date(log.timestamp).getTime();
      const diff = Math.floor((currTime - prevTime) / 1000);
      // Cap at 30 min (if gap is longer, they likely left and came back)
      prevPage.timeSpent = diff <= 1800 ? diff : 0;
    }

    user.pagesVisited.push({
      page: log.page,
      timestamp: log.timestamp,
      timeSpent: 0, // will be calculated when next page is visited
    });

    // Recalculate total time
    user.totalTimeSpent = user.pagesVisited.reduce((sum, p) => sum + p.timeSpent, 0);
  }

  return Object.values(grouped);
}

// GET endpoint to view logs (protected with a simple key)
export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (key !== process.env.ADMIN_KEY && key !== "thyleads2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logs = await getVisitorLogs();
  const users = groupByVisitor(logs);

  // Sort by most recent activity
  users.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());

  const summary = {
    totalPageViews: logs.length,
    uniqueUsers: users.length,
    topCities: Object.entries(
      users.reduce((acc: Record<string, number>, u) => {
        acc[u.city] = (acc[u.city] || 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
    topPages: Object.entries(
      logs.reduce((acc: Record<string, number>, l) => {
        acc[l.page] = (acc[l.page] || 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
    googleAdsUsers: users.filter(
      (u) => u.utmSource === "google" || u.referrer.includes("googleads") || u.utmMedium === "cpc"
    ).length,
  };

  return NextResponse.json({ summary, users });
}
