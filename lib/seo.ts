import type { Metadata } from "next";

/**
 * Centralized SEO metadata for the Thyleads website.
 *
 * Source of truth: seo-tags.xlsx (Title Tag + Meta Description columns).
 * Every value below is kept verbatim from that sheet so titles and
 * descriptions stay unique and easy to maintain in one place.
 *
 * - `pageSeo`  -> static routes (keyed by a stable page id)
 * - `blogSeo`  -> dynamic blog routes (keyed by blog slug)
 */

export interface SeoEntry {
  title: string;
  description: string;
}

const SITE_URL = "https://thyleads.com";

/** Build a Next.js Metadata object from an SeoEntry, with canonical + OG/Twitter mirrored. */
export function buildMetadata(entry: SeoEntry, path: string = "/"): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      siteName: "Thyleads",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

/** Static page metadata, keyed by page id. */
export const pageSeo = {
  home: {
    title: "Thyleads |Lead Generation Agency for SaaS in India",
    description:
      "Thyleads is India's end-to-end outbound partner for SaaS. We generate predictable pipeline, qualify leads, and maintain the deal momentum.",
  },
  about: {
    title: "About Thyleads | India's Outbound Partner for SaaS",
    description:
      "Founded in 2021, Thyleads has helped 70+ SaaS companies build predictable pipeline in India. Meet our founders, team, and mission.",
  },
  whyThyleads: {
    title: "Thyleads | Why Choose Thyleads: SaaS Outbound Partner vs In-House SDR",
    description:
      "In-house SDRs vs outsourced outbound: see why 70+ SaaS companies chose Thyleads for predictable pipeline and faster deal velocity.",
  },
  howWeWork: {
    title: "Thyleads |How Our Outbound Pipeline Engine Works",
    description:
      "From signal detection to booked meetings in weeks. See Thyleads' 4-week outbound process for SaaS pipeline generation in India.",
  },
  seriesA: {
    title: "Thyleads |B2B Lead Generation Agency for SaaS Startups | Seed-Series A",
    description:
      "Land your first 10 B2B deals without running ads or waiting on referrals. We build a predictable outbound pipeline for your SaaS in India.",
  },
  seriesB: {
    title: "Thyleads |B2B Lead Generation Agency at Scale for Series B+ SaaS",
    description:
      "Pipeline not keeping up with your growth targets? Thyleads delivers 90+ qualified meetings per quarter for scaling SaaS teams in India.",
  },
  hrtech: {
    title: "Thyleads | HRTech B2B Lead Generation Agency in India",
    description:
      "Outbound for HRTech SaaS in India. We generate pipeline, engage CHROs, and scale enterprise sales with our proven HRTech specialized playbook.",
  },
  martech: {
    title: "Thyleads | MarTech B2B Lead Generation Agency in India",
    description:
      "Outbound for MarTech SaaS in India. We engage CMOs, cut through noise, and build high-intent pipeline with our proven MarTech specialized playbook.",
  },
  fintech: {
    title: "Thyleads | FinTech B2B Lead Generation Agency in India",
    description:
      "Outbound for FinTech SaaS In India. We engage decision-makers, move through compliance gates with our proven FinTech specialized playbook.",
  },
  gtmFramework: {
    title: "Thyleads |5-Step SaaS GTM Framework for India",
    description:
      "A proven 5-step go-to-market framework for SaaS companies targeting India. From ICP mapping to deal closure. See the playbook.",
  },
  aiSystem: {
    title: "Thyleads |AI Lead Generation Sytem for SaaS",
    description:
      "AI GTM agents for account intelligence, signal detection, outbound automation, meeting booking, and pipeline growth.",
  },
} satisfies Record<string, SeoEntry>;

/** Blog metadata, keyed by blog slug (matches data/blogs.ts). */
export const blogSeo: Record<string, SeoEntry> = {
  "5-best-email-outreach-service-providers-2026-edition": {
    title: "Thyleads | 5 Best Email Outreach Services for 2026",
    description:
      "Compare the top email outreach service providers for 2026 based on deliverability, personalization, pricing, and B2B lead generation results.",
  },
  "top-5-lead-generation-companies-for-2026": {
    title: "Thyleads | Top Lead Generation Companies in 2026",
    description:
      "Discover the top lead generation companies for 2026 helping SaaS and B2B brands generate qualified pipeline, meetings, and revenue growth.",
  },
  "5-best-data-enrichment-service-providers-2026-edition": {
    title: "Thyleads | Best Data Enrichment Providers for 2026",
    description:
      "Compare the 5 best data enrichment providers for 2026: Thyleads, Clearbit, Apollo, ZoomInfo, and Lusha. Pros, cons, and which fits your team.",
  },
  "5-best-appointment-scheduling-service-agencies-2026": {
    title: "Thyleads | Best Appointment Setting Agencies 2026",
    description:
      "Find the best appointment setting agencies for 2026 that help B2B companies book qualified sales meetings and grow faster.",
  },
  "every-job-posting-hiring-signals-gtm-pro": {
    title: "Thyleads | How to Read GTM Signals from Job Posts",
    description:
      "Learn how to decode hiring signals from job postings to uncover GTM priorities, expansion plans, budget shifts, and buying intent.",
  },
  "waterfall-enrichment-2026-playbook": {
    title: "Thyleads | Waterfall Enrichment Playbook for 2025",
    description:
      "Master waterfall enrichment strategies to improve lead coverage, enrich prospect data, and maximize outbound campaign performance.",
  },
  "reddit-for-b2b-lead-generation-untapped-goldmine": {
    title: "Thyleads | Reddit Strategies for B2B Lead Generation",
    description:
      "Learn how B2B companies use Reddit communities to uncover buyer pain points, source leads, and improve outbound messaging.",
  },
  "10-data-driven-outbound-campaigns-gtm-strategy": {
    title: "Thyleads | 10 Outbound Campaigns to Boost GTM Growth",
    description:
      "Discover 10 proven outbound campaign ideas backed by data to improve response rates, pipeline generation, and GTM execution.",
  },
  "winning-in-us-retailtech-2024": {
    title: "Thyleads | US RetailTech GTM Playbook for 2024",
    description:
      "Explore key GTM strategies, buyer insights, and outbound tactics helping RetailTech companies win and scale in the US market.",
  },
  "10-hard-earned-outreach-lessons-2024": {
    title: "Thyleads | 10 Outreach Lessons That Worked in 2024",
    description:
      "Discover 10 practical outreach lessons from 2024 covering personalization, deliverability, messaging, and pipeline generation.",
  },
  "ultimate-guide-automated-hyper-targeted-outreach-clay-rss": {
    title: "Thyleads | Hyper-Targeted Outreach with Clay & RSS",
    description:
      "Learn how to automate hyper-targeted outreach workflows using Clay and RSS feeds to generate scalable, high-quality B2B pipeline.",
  },
  "india-gtm-playbook-how-saas-companies-like-clevertap-and-vwo-built-pipeline-from-zero": {
    title: "Thyleads | India SaaS GTM Playbook for Pipeline Growth",
    description:
      "See how SaaS companies like CleverTap and VWO built pipeline in India using localized GTM strategies and outbound execution.",
  },
  "outsourced-sdr-vs-in-house-sales-team-in-india-cost-and-performance-comparison": {
    title: "Thyleads | Outsourced SDR vs In-House Sales in India",
    description:
      "Compare outsourced SDR teams and in-house sales teams in India across cost, scalability, performance, hiring, and pipeline impact.",
  },
  "how-fintech-saas-companies-are-winning-enterprise-deals-in-india": {
    title: "Thyleads | How Fintech SaaS Wins Enterprise Deals",
    description:
      "Learn how Fintech SaaS companies in India close enterprise deals through sharper positioning, outbound strategy, and GTM alignment.",
  },
  "the-martech-opportunity-in-india-why-2026-is-the-year-to-move": {
    title: "Thyleads | Why India's Martech Market Booms in 2026",
    description:
      "Explore why India's Martech market is growing rapidly in 2026 and what SaaS companies must do to capture the opportunity.",
  },
};
