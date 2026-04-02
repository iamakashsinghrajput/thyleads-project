import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import VisitorTracker from "@/components/VisitorTracker";
import CookieConsent from "@/components/CookieConsent";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thyleads.com'),
  title: "Thyleads - Outbound for SaaS That Drives Revenue",
  description: "Scalable, AI-powered outbound systems for SaaS companies. Get responses, book meetings, and win logos with personalized, data-backed outreach.",
  icons: {
    icon: '/thyleads.svg',
    apple: '/thyleads.svg',
  },
  openGraph: {
    title: "Thyleads - Outbound for SaaS That Drives Revenue",
    description: "Scalable, AI-powered outbound systems for SaaS companies. Get responses, book meetings, and win logos with personalized, data-backed outreach.",
    url: 'https://thyleads.com',
    siteName: 'Thyleads',
    images: [
      {
        url: '/thyleads.svg',
        alt: 'Thyleads - Outbound for SaaS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Thyleads - Outbound for SaaS That Drives Revenue",
    description: "Scalable, AI-powered outbound systems for SaaS companies. Get responses, book meetings, and win logos with personalized, data-backed outreach.",
    images: ['/thyleads.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18052879052"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18052879052');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w4d9qazj69");
          `}
        </Script>
        <Script id="trafficguard" strategy="afterInteractive">
          {`
            var dataTrafficGuard = dataTrafficGuard || [];
            dataTrafficGuard.push(['property_group_id', 'tg-g-023752-001']);
            dataTrafficGuard.push(['event','pageview']);
            (function() {var tg = document.createElement('script'); tg.type = 'text/javascript'; tg.async = true; tg.src = '//p.tgtag.io/tg.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tg, s);})();
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="//p.tgtag.io/event?property_group_id=tg-g-023752-001&event_name=pageview&no_script=1" width="1" height="1" style={{ display: 'none' }} alt="" />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Suspense fallback={null}>
          <VisitorTracker />
        </Suspense>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
