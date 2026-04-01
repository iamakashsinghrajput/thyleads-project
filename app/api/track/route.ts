import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "visitor-logs.json");

const ALLOWED_ORIGINS = [
  "https://thyleads.com",
  "https://www.thyleads.com",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

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
  browser: string;
  os: string;
  device: string;
  screenResolution: string;
  language: string;
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
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
  await fs.writeFile(LOG_FILE, JSON.stringify(logs));
}

function isLocalIP(ip: string): boolean {
  return ip === "::1" || ip === "127.0.0.1" || ip === "localhost" || ip === "Unknown" || ip.startsWith("192.168.") || ip.startsWith("10.");
}

async function getGeoFromIP(ip: string) {
  try {
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
  const origin = request.headers.get("origin");
  try {
    const body = await request.json();

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "Unknown";

    const geo = await getGeoFromIP(ip);

    const log: VisitorLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ip: geo.resolvedIP,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      lat: geo.lat,
      lon: geo.lon,
      isp: geo.isp,
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

    return NextResponse.json({ ok: true }, { headers: corsHeaders(origin) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders(origin) });
  }
}

// Group logs by IP
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
    totalTimeSpent: number;
    pagesVisited: { page: string; timestamp: string; timeSpent: number }[];
  }> = {};

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

    if (user.pagesVisited.length > 0) {
      const prevPage = user.pagesVisited[user.pagesVisited.length - 1];
      const prevTime = new Date(prevPage.timestamp).getTime();
      const currTime = new Date(log.timestamp).getTime();
      const diff = Math.floor((currTime - prevTime) / 1000);
      prevPage.timeSpent = diff <= 1800 ? diff : 0;
    }

    user.pagesVisited.push({
      page: log.page,
      timestamp: log.timestamp,
      timeSpent: 0,
    });

    user.totalTimeSpent = user.pagesVisited.reduce((sum, p) => sum + p.timeSpent, 0);
  }

  return Object.values(grouped);
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const key = request.nextUrl.searchParams.get("key");
  if (key !== process.env.ADMIN_PASS && key !== "thyleads2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders(origin) });
  }

  const logs = await getVisitorLogs();
  const users = groupByVisitor(logs);

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

  return NextResponse.json({ summary, users }, { headers: corsHeaders(origin) });
}
