"use client";

import { useState, useEffect } from "react";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const consent = getCookie("thy_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie("thy_consent", "accepted", 365);
    setClosing(true);
    setTimeout(() => setShow(false), 400);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-400 ${
        closing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="bg-[#111111] border-t border-[#2a2a2a] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm">
                We use cookies to enhance your browsing experience and analyze site traffic.
              </p>
              <a href="/privacy-policy" className="text-xs text-gray-500 hover:text-indigo-400 transition">
                Privacy Policy
              </a>
            </div>
          </div>
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:opacity-90 transition shrink-0"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
