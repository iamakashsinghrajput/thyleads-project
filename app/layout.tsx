import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
