import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock imagery for the SixWalls section is served from Unsplash's CDN.
    // next/image refuses remote hosts unless they are allowlisted here.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};


export default nextConfig;
