"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function generateVisitorId(): string {
  return "v_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getBrowserInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Other";
}

function getOSInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Other";
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Mobi") || ua.includes("Android")) return "Mobile";
  if (ua.includes("Tablet") || ua.includes("iPad")) return "Tablet";
  return "Desktop";
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Don't track bots
    if (navigator.webdriver) return;

    // Get or create visitor cookie
    let visitorId = getCookie("thy_vid");
    let visitCount = parseInt(getCookie("thy_vc") || "0");
    let firstVisit = getCookie("thy_fv");

    if (!visitorId) {
      visitorId = generateVisitorId();
      firstVisit = new Date().toISOString();
      setCookie("thy_vid", visitorId, 365);
      setCookie("thy_fv", firstVisit, 365);
    }

    visitCount++;
    setCookie("thy_vc", visitCount.toString(), 365);

    const payload = {
      browser: getBrowserInfo(),
      os: getOSInfo(),
      device: getDeviceType(),
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      page: pathname,
      referrer: document.referrer || "Direct",
      utmSource: searchParams.get("utm_source") || "",
      utmMedium: searchParams.get("utm_medium") || "",
      utmCampaign: searchParams.get("utm_campaign") || "",
      utmTerm: searchParams.get("utm_term") || "",
      visitorId,
      visitCount,
      firstVisit,
    };

    // Send tracking data
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
}
