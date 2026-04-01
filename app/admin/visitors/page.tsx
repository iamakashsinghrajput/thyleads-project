"use client";

import { useState, useEffect } from "react";

interface PageVisit {
  page: string;
  timestamp: string;
  timeSpent: number;
}

interface User {
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
  pagesVisited: PageVisit[];
}

interface Summary {
  totalPageViews: number;
  uniqueUsers: number;
  topCities: [string, number][];
  topPages: [string, number][];
  googleAdsUsers: number;
}

interface TrackData {
  summary: Summary;
  users: User[];
}

function formatDuration(seconds: number): string {
  if (seconds === 0) return "< 1s";
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return `${mins}m ${secs}s`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}

export default function VisitorDashboard() {
  const [data, setData] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [key, setKey] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const login = () => {
    if (key.trim()) {
      setAuthenticated(true);
      fetchData(key.trim());
    }
  };

  const fetchData = async (authKey: string) => {
    setLoading(true);
    try {
      const TRACK_URL = process.env.NEXT_PUBLIC_TRACK_URL || "https://thyleads-project-production.up.railway.app/api/track";
      const res = await fetch(`${TRACK_URL}?key=${authKey}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setAuthenticated(false);
        alert("Invalid key");
      }
    } catch {
      alert("Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated && key) {
      const interval = setInterval(() => fetchData(key), 30000);
      return () => clearInterval(interval);
    }
  }, [authenticated, key]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / 1000
    );
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getSourceBadge = (user: User) => {
    if (
      user.utmSource === "google" ||
      user.utmMedium === "cpc" ||
      user.referrer.includes("googleads")
    ) {
      return { label: "Google Ads", color: "bg-blue-500/20 text-blue-400" };
    }
    if (user.referrer.includes("linkedin")) {
      return { label: "LinkedIn", color: "bg-sky-500/20 text-sky-400" };
    }
    if (user.referrer.includes("google")) {
      return {
        label: "Google Organic",
        color: "bg-green-500/20 text-green-400",
      };
    }
    if (user.referrer === "Direct" || user.referrer === "") {
      return { label: "Direct", color: "bg-gray-500/20 text-gray-400" };
    }
    return { label: "Referral", color: "bg-purple-500/20 text-purple-400" };
  };

  const getDeviceIcon = (device: string) => {
    if (device === "Mobile") return "📱";
    if (device === "Tablet") return "📟";
    return "💻";
  };

  const filteredUsers =
    data?.users.filter((u) => {
      if (filter === "all") return true;
      if (filter === "google-ads")
        return (
          u.utmSource === "google" ||
          u.utmMedium === "cpc" ||
          u.referrer.includes("googleads")
        );
      if (filter === "contact")
        return u.pagesVisited.some((p) => p.page === "/contact");
      if (filter === "multi-page") return u.pagesVisited.length > 1;
      return true;
    }) || [];

  // --- Login Screen ---
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Visitor Dashboard</h1>
            <p className="text-gray-500 text-sm">Enter admin key to view analytics</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Admin key"
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              onClick={login}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!data) return null;

  // --- Main Dashboard ---
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#222] bg-[#0a0a0a] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold">Thyleads Visitors</h1>
              <p className="text-xs text-gray-500">Live tracking · Auto-refreshes every 30s</p>
            </div>
          </div>
          <button
            onClick={() => fetchData(key)}
            className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-sm text-gray-300 hover:bg-[#222] transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Users</p>
            <p className="text-3xl font-bold text-white">{data.summary.uniqueUsers}</p>
          </div>
          <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Page Views</p>
            <p className="text-3xl font-bold text-indigo-400">{data.summary.totalPageViews}</p>
          </div>
          <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Google Ads</p>
            <p className="text-3xl font-bold text-blue-400">{data.summary.googleAdsUsers}</p>
            <p className="text-xs text-gray-600 mt-1">users from ads</p>
          </div>
          <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Top City</p>
            <p className="text-2xl font-bold text-green-400">{data.summary.topCities[0]?.[0] || "—"}</p>
            <p className="text-xs text-gray-600 mt-1">{data.summary.topCities[0]?.[1] || 0} users</p>
          </div>
          <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg Pages/User</p>
            <p className="text-3xl font-bold text-purple-400">
              {data.summary.uniqueUsers > 0
                ? (data.summary.totalPageViews / data.summary.uniqueUsers).toFixed(1)
                : "0"}
            </p>
          </div>
        </div>

        {/* Top Cities & Pages */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Top Cities</h3>
            <div className="space-y-3">
              {data.summary.topCities.map(([city, count], i) => (
                <div key={city} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-5">{i + 1}</span>
                    <span className="text-sm text-white">{city}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-[#222] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${(count / (data.summary.topCities[0]?.[1] || 1)) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
              {data.summary.topCities.length === 0 && <p className="text-sm text-gray-600">No data yet</p>}
            </div>
          </div>
          <div className="bg-[#141414] border border-[#222] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Top Pages</h3>
            <div className="space-y-3">
              {data.summary.topPages.map(([page, count], i) => (
                <div key={page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-5">{i + 1}</span>
                    <span className="text-sm text-white font-mono">{page}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-[#222] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${(count / (data.summary.topPages[0]?.[1] || 1)) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
              {data.summary.topPages.length === 0 && <p className="text-sm text-gray-600">No data yet</p>}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "all", label: "All Users" },
            { key: "google-ads", label: "Google Ads" },
            { key: "contact", label: "Visited Contact" },
            { key: "multi-page", label: "Multi-page" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f.key
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "bg-[#141414] text-gray-400 border border-[#222] hover:border-[#333]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* User List */}
        <div className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#222]">
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Pages</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Time Spent</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const source = getSourceBadge(user);
                  return (
                    <tr
                      key={user.ip}
                      onClick={() => setSelectedUser(user)}
                      className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] cursor-pointer transition"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm text-white font-mono">{user.ip}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-white">{user.city}</p>
                        <p className="text-xs text-gray-500">{user.region}, {user.country}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-indigo-400">{user.pagesVisited.length}</span>
                        <span className="text-xs text-gray-500 ml-1">pages</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-white">{formatDuration(user.totalTimeSpent)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${source.color}`}>
                          {source.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-lg" title={`${user.browser} / ${user.os}`}>
                          {getDeviceIcon(user.device)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-300">{timeAgo(user.lastSeen)}</p>
                        <p className="text-xs text-gray-600">{formatTime(user.lastSeen)}</p>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-600">
                      No users found for this filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-[#141414] border border-[#222] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[#222] flex items-center justify-between sticky top-0 bg-[#141414] rounded-t-2xl z-10">
              <div>
                <h3 className="text-lg font-bold text-white">User Details</h3>
                <p className="text-sm text-gray-500 font-mono">{selectedUser.ip}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-white transition p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#0a0a0a] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-indigo-400">{selectedUser.pagesVisited.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Pages Viewed</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-400">{formatDuration(selectedUser.totalTimeSpent)}</p>
                  <p className="text-xs text-gray-500 mt-1">Total Time</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-purple-400">
                    {getSourceBadge(selectedUser).label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Source</p>
                </div>
              </div>

              {/* Page Journey */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Page Journey</p>
                <div className="bg-[#0a0a0a] rounded-xl p-4">
                  <div className="space-y-0">
                    {selectedUser.pagesVisited.map((pv, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mt-1.5 ${
                            i === 0 ? "bg-green-500" :
                            i === selectedUser.pagesVisited.length - 1 ? "bg-red-500" :
                            "bg-indigo-500"
                          }`} />
                          {i < selectedUser.pagesVisited.length - 1 && (
                            <div className="w-0.5 h-12 bg-[#222]" />
                          )}
                        </div>
                        {/* Content */}
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white font-mono bg-[#141414] px-2 py-0.5 rounded">
                              {pv.page}
                            </span>
                            {pv.timeSpent > 0 && (
                              <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                                {formatDuration(pv.timeSpent)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {formatTime(pv.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Location</p>
                <div className="bg-[#0a0a0a] rounded-xl p-4 grid grid-cols-2 gap-y-3 gap-x-6">
                  <div>
                    <p className="text-xs text-gray-600">City</p>
                    <p className="text-sm text-white">{selectedUser.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Region</p>
                    <p className="text-sm text-white">{selectedUser.region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Country</p>
                    <p className="text-sm text-white">{selectedUser.country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">ISP</p>
                    <p className="text-sm text-white">{selectedUser.isp}</p>
                  </div>
                </div>
              </div>

              {/* System */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">System Info</p>
                <div className="bg-[#0a0a0a] rounded-xl p-4 grid grid-cols-2 gap-y-3 gap-x-6">
                  <div>
                    <p className="text-xs text-gray-600">Browser</p>
                    <p className="text-sm text-white">{selectedUser.browser}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">OS</p>
                    <p className="text-sm text-white">{selectedUser.os}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Device</p>
                    <p className="text-sm text-white">{getDeviceIcon(selectedUser.device)} {selectedUser.device}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Screen</p>
                    <p className="text-sm text-white">{selectedUser.screenResolution}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Language</p>
                    <p className="text-sm text-white">{selectedUser.language}</p>
                  </div>
                </div>
              </div>

              {/* Traffic Source */}
              {(selectedUser.utmSource || selectedUser.utmMedium || selectedUser.utmCampaign || selectedUser.referrer) && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Traffic Source</p>
                  <div className="bg-[#0a0a0a] rounded-xl p-4 grid grid-cols-2 gap-y-3 gap-x-6">
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600">Referrer</p>
                      <p className="text-sm text-white break-all">{selectedUser.referrer || "Direct"}</p>
                    </div>
                    {selectedUser.utmSource && (
                      <div>
                        <p className="text-xs text-gray-600">UTM Source</p>
                        <p className="text-sm text-blue-400">{selectedUser.utmSource}</p>
                      </div>
                    )}
                    {selectedUser.utmMedium && (
                      <div>
                        <p className="text-xs text-gray-600">UTM Medium</p>
                        <p className="text-sm text-blue-400">{selectedUser.utmMedium}</p>
                      </div>
                    )}
                    {selectedUser.utmCampaign && (
                      <div>
                        <p className="text-xs text-gray-600">UTM Campaign</p>
                        <p className="text-sm text-blue-400">{selectedUser.utmCampaign}</p>
                      </div>
                    )}
                    {selectedUser.utmTerm && (
                      <div>
                        <p className="text-xs text-gray-600">UTM Term</p>
                        <p className="text-sm text-blue-400">{selectedUser.utmTerm}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timing */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Timing</p>
                <div className="bg-[#0a0a0a] rounded-xl p-4 grid grid-cols-2 gap-y-3 gap-x-6">
                  <div>
                    <p className="text-xs text-gray-600">First Seen</p>
                    <p className="text-sm text-white">{formatTime(selectedUser.firstSeen)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Last Active</p>
                    <p className="text-sm text-white">{formatTime(selectedUser.lastSeen)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
