"use client";

/**
 * Thyleads — "Jasper" style world.
 *
 * A complete, self-contained landing page built to the Jasper style reference
 * in design.md: pure-white editorial canvas, high-contrast serif display over
 * Midnight Ink (#00063d), pastel category cards (coral / mint / sky / butter /
 * lilac), flat by conviction (no shadows, no gradients), sharp 4px radius
 * everywhere, small-caps eyebrows, and paired two-button CTAs. Content is
 * Thyleads (GTM / outbound); the look is Jasper.
 *
 * Tokens are scoped to `.jasper` here so the live site and globals.css are
 * untouched. Fonts substitute the reference faces per design.md: DM Serif
 * Display for "Feature", DM Sans for "ABC ROM".
 */

import Image from "next/image";
import Link from "next/link";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const feature = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-feature",
  display: "swap",
});
const abc = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-abc-rom",
  display: "swap",
});

/* Scoped tokens + the two flat textures the reference calls for. */
const TOKENS = `
.jasper{
  --ink:#00063d; --coral:#fa4028; --merlot:#5a003c; --forest:#103a00; --ember:#fa7560;
  --coral-mist:#ffe8e2; --sky:#0095ff; --sky-mist:#ceebff; --mint:#45ff00; --mint-mist:#e6ffd9;
  --butter:#fff67d; --buttercream:#fffbb7; --lilac:#7c5ac4; --lilac-mist:#e7e3f7;
  --blush:#ffb3de; --blush-veil:#ffe6f3; --paper:#fff; --bone:#f9f9f9; --shell:#fff7f5;
  --graphite:#5e5d5f; --cream:#fffdd9;
  background:var(--paper); color:var(--ink);
  font-family:var(--font-abc-rom), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing:antialiased;
}
.jasper .ff{ font-family:var(--font-feature), Georgia, serif; font-weight:400; }
.jasper-grid{
  background-image:
    linear-gradient(rgba(0,6,61,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,6,61,.05) 1px, transparent 1px);
  background-size:22px 22px;
}
`;

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ── Buttons ─────────────────────────────────────────────────────────── */
function Filled({ children, href = "/contact" }: { children: ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-[4px] bg-[var(--ink)] px-6 py-3 text-[16px] font-medium tracking-[-0.16px] text-white transition-opacity duration-200 hover:opacity-90"
    >
      {children}
    </Link>
  );
}
function Outline({ children, href = "/howitworks" }: { children: ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-[4px] border border-[var(--ink)] bg-white px-6 py-3 text-[16px] font-medium tracking-[-0.16px] text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white"
    >
      {children}
    </Link>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-[var(--ink)]">
      {children}
    </span>
  );
}

/* ── Flat geometric illustrations (per the reference's card motif) ───── */
function OutboundArt() {
  return (
    <svg viewBox="0 0 200 120" className="h-auto w-full" role="img" aria-label="Signal broadcasting to nodes">
      <circle cx="40" cy="60" r="16" fill="var(--mint)" stroke="var(--forest)" strokeWidth="2" />
      {[[150, 26], [168, 60], [150, 94]].map(([x, y], i) => (
        <g key={i}>
          <line x1="56" y1="60" x2={x} y2={y} stroke="var(--forest)" strokeWidth="2" />
          <rect x={x - 12} y={y - 10} width="24" height="20" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        </g>
      ))}
      <circle cx="40" cy="60" r="6" fill="var(--forest)" />
    </svg>
  );
}
function QualifyArt() {
  return (
    <svg viewBox="0 0 200 120" className="h-auto w-full" role="img" aria-label="Leads filtered through a funnel">
      {[26, 50, 74, 98, 122, 146, 170].map((x, i) => (
        <circle key={i} cx={x} cy="20" r="5" fill={i % 2 ? "var(--ember)" : "var(--coral)"} />
      ))}
      <path d="M40 40 L160 40 L118 80 L118 104 L82 104 L82 80 Z" fill="var(--coral-mist)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="100" cy="104" r="5" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}
function MomentumArt() {
  return (
    <svg viewBox="0 0 200 120" className="h-auto w-full" role="img" aria-label="Deals accelerating up a step path">
      {[[34, 92], [78, 74], [122, 52], [166, 26]].map(([x, y], i) => (
        <rect key={i} x={x - 14} y={y} width="28" height={100 - y} fill={i === 3 ? "var(--sky)" : "var(--sky-mist)"} stroke="var(--ink)" strokeWidth="2" />
      ))}
      <path d="M28 96 L170 22" stroke="var(--ink)" strokeWidth="2" fill="none" />
      <path d="M170 22 l-13 2 l6 -11 z" fill="var(--ink)" />
    </svg>
  );
}

type Cat = { wash: string; art: ReactNode; title: string; body: string };
const categories: Cat[] = [
  {
    wash: "var(--mint-mist)",
    art: <OutboundArt />,
    title: "AI-Powered Outbound",
    body: "Signal-led conversations that reach the right buyer on the right channel, week after week, without the SDR overhead.",
  },
  {
    wash: "var(--coral-mist)",
    art: <QualifyArt />,
    title: "Inbound Qualification",
    body: "Raw inbound becomes sales-ready pipeline. Fit and intent are scored before an AE ever spends a minute on the call.",
  },
  {
    wash: "var(--sky-mist)",
    art: <MomentumArt />,
    title: "Deal Momentum",
    body: "Structured follow-ups and multi-threading keep deals moving after the first call, so nothing stalls in the middle.",
  },
];

const logos = [
  "/images/CleverTap.svg",
  "/images/VWO.svg",
  "/images/Increff.svg",
  "/images/Tazapay.svg",
  "/images/Airmeet.svg",
  "/images/Nurix.svg",
];

/* A fixed pastel-tile pattern (deterministic, no hydration drift). */
const TILE = [
  "var(--coral-mist)", "transparent", "var(--butter)", "transparent", "var(--coral-mist)", "var(--mint-mist)",
  "transparent", "var(--coral)", "transparent", "var(--sky-mist)", "transparent", "transparent",
  "var(--butter)", "transparent", "transparent", "transparent", "var(--ember)", "transparent",
  "transparent", "var(--mint-mist)", "transparent", "var(--butter)", "transparent", "var(--coral-mist)",
];

export default function RedesignPage() {
  return (
    <div className={`jasper ${feature.variable} ${abc.variable} min-h-screen`}>
      <style dangerouslySetInnerHTML={{ __html: TOKENS }} />

      {/* Announcement banner */}
      <div className="w-full border-b border-[var(--ink)]/10 bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-6 py-2.5 text-center text-[15px]">
          <span className="rounded-[4px] bg-[var(--mint-mist)] px-2 py-0.5 text-[13px] font-medium text-[var(--forest)]">
            New
          </span>
          <span className="text-[var(--ink)]">
            The 2026 State of B2B Outbound is here.{" "}
            <Link href="/blog" className="font-medium text-[var(--coral)] hover:underline">
              Read the report &rarr;
            </Link>
          </span>
        </div>
      </div>

      {/* Nav */}
      <header className="w-full bg-white">
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link href="/redesign" className="ff text-[24px] leading-none text-[var(--coral)]">
            Thyleads
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {["Platform", "How We Work", "Solutions", "Resources"].map((l) => (
              <Link key={l} href="#" className="text-[14px] font-medium tracking-[-0.14px] text-[var(--ink)] hover:text-[var(--coral)]">
                {l}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hidden text-[14px] font-medium text-[var(--ink)] hover:text-[var(--coral)] sm:block">
              Log In
            </Link>
            <Filled>Get A Demo</Filled>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 pt-20 text-center lg:pt-24">
          <Reveal>
            <Eyebrow>The Thyleads Revenue Engine</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="ff mx-auto mt-5 max-w-[900px] text-[44px] leading-[1.02] tracking-[-1.6px] text-[var(--ink)] sm:text-[64px] sm:tracking-[-2px] lg:text-[80px] lg:tracking-[-2.4px]">
              Turn cold markets into booked revenue.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-[1.4] tracking-[-0.18px] text-[var(--ink)]/80">
              Thyleads runs the messy middle between first interest and closed deal, so your
              AEs only step in when the revenue conversation is real.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Outline>How We Work</Outline>
              <Filled>Get A Demo</Filled>
            </div>
          </Reveal>

          {/* Illustrated hero: portrait over a pastel tile field */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto mt-16 w-full max-w-[880px]">
              <div className="jasper-grid absolute inset-0 grid grid-cols-6 grid-rows-4 rounded-[4px] border border-[var(--ink)]/10">
                {TILE.map((c, i) => (
                  <div key={i} style={{ background: c }} className="border-[0.5px] border-[var(--ink)]/5" />
                ))}
              </div>
              <div className="relative mx-auto aspect-[16/10] w-[calc(100%-64px)] overflow-hidden rounded-[4px] border border-[var(--ink)] sm:w-[calc(100%-96px)]">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80"
                  alt="A marketing leader at work"
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 780px"
                  className="object-cover"
                />
              </div>
              {/* Flat stat pills */}
              <div className="absolute -left-2 top-8 rounded-[4px] border border-[var(--ink)] bg-white px-3 py-2 text-[14px] font-medium text-[var(--ink)] sm:left-4">
                <span className="text-[var(--coral)]">+35%</span> Pipeline
              </div>
              <div className="absolute -right-2 bottom-10 rounded-[4px] border border-[var(--ink)] bg-white px-3 py-2 text-[14px] font-medium text-[var(--ink)] sm:right-4">
                <span className="text-[var(--coral)]">2&times;</span> Deal control
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Logo strip ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 py-20">
          <Reveal>
            <p className="text-center text-[16px] font-medium tracking-[-0.16px] text-[var(--ink)]">
              The GTM teams building category leaders trust Thyleads
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {logos.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={120}
                  height={28}
                  className="h-6 w-auto object-contain opacity-60 grayscale"
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Category cards ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 py-4">
          <Reveal className="mx-auto max-w-[700px] text-center">
            <Eyebrow>The Platform</Eyebrow>
            <h2 className="ff mt-4 text-[38px] leading-[1.05] tracking-[-0.76px] text-[var(--ink)] sm:text-[54px] sm:tracking-[-1.08px]">
              One engine for the whole middle.
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-[1.4] tracking-[-0.18px] text-[var(--ink)]/80">
              Three connected motions that carry a prospect from first signal to a deal your
              team can close.
            </p>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {categories.map((c) => (
              <motion.article
                key={c.title}
                variants={item}
                style={{ background: c.wash }}
                className="jasper-grid group flex flex-col rounded-[4px] p-8"
              >
                <div className="mb-6">{c.art}</div>
                <h3 className="ff text-[24px] leading-[1.1] tracking-[-0.24px] text-[var(--ink)]">{c.title}</h3>
                <p className="mt-3 flex-1 text-[16px] leading-[1.4] tracking-[-0.16px] text-[var(--ink)]/80">{c.body}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink)]">
                  Explore
                  <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ── Split content ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow>Why Thyleads</Eyebrow>
              <h2 className="ff mt-4 text-[38px] leading-[1.1] tracking-[-0.76px] text-[var(--ink)]">
                Built for modern GTM teams.
              </h2>
              <p className="mt-5 max-w-[460px] text-[18px] leading-[1.4] tracking-[-0.18px] text-[var(--ink)]/80">
                Stop paying for ramp, attrition, and the guesswork between interest and intent.
                Thyleads runs the motion as a system and hands your closers only the conversations
                worth having.
              </p>
              <ul className="mt-6 space-y-3">
                {["40% shorter sales cycles", "2x higher deal control", "One third the cost of building in-house"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[16px] tracking-[-0.16px] text-[var(--ink)]">
                    <span className="grid h-5 w-5 place-items-center rounded-[4px] bg-[var(--mint-mist)] text-[var(--forest)]">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Filled>Get A Demo</Filled>
                <Outline>See case studies</Outline>
              </div>
            </Reveal>

            {/* Flat UI mockup — 1px ink border, no shadow */}
            <Reveal delay={0.1}>
              <div className="rounded-[4px] border border-[var(--ink)] bg-white p-5">
                <div className="flex items-center justify-between border-b border-[var(--ink)]/10 pb-3">
                  <span className="text-[14px] font-medium text-[var(--ink)]">Pipeline this quarter</span>
                  <span className="rounded-[4px] bg-[var(--mint-mist)] px-2 py-0.5 text-[13px] font-medium text-[var(--forest)]">Live</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    { k: "Sourced", v: "312", w: "var(--coral-mist)" },
                    { k: "Qualified", v: "148", w: "var(--sky-mist)" },
                    { k: "In deal", v: "63", w: "var(--butter)" },
                    { k: "Closed won", v: "21", w: "var(--mint-mist)" },
                  ].map((s) => (
                    <div key={s.k} style={{ background: s.w }} className="rounded-[4px] p-4">
                      <div className="ff text-[28px] leading-none tracking-[-0.4px] text-[var(--ink)]">{s.v}</div>
                      <div className="mt-1 text-[13px] tracking-[-0.13px] text-[var(--ink)]/70">{s.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {[82, 60, 34].map((w, i) => (
                    <div key={i} className="h-2 rounded-[4px] border border-[var(--ink)]/15" style={{ width: `${w}%`, background: i === 0 ? "var(--coral)" : i === 1 ? "var(--sky)" : "var(--ink)" }} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Stats band (cream wash contained, not full-bleed rule) ──── */}
        <section className="mx-auto max-w-[1200px] px-6 pb-24">
          <Reveal>
            <div className="jasper-grid rounded-[4px] border border-[var(--ink)]/10 bg-[var(--cream)] px-8 py-14">
              <div className="grid gap-10 text-center sm:grid-cols-3">
                {[
                  { n: "70%", l: "of deals convert on the second call, if it ever happens" },
                  { n: "40%", l: "of selling time is lost filtering unqualified inbound" },
                  { n: "14mo", l: "average SDR tenure before the ramp starts over" },
                ].map((s) => (
                  <div key={s.n}>
                    <div className="ff text-[54px] leading-[1] tracking-[-1.08px] text-[var(--ink)] sm:text-[64px]">{s.n}</div>
                    <p className="mx-auto mt-3 max-w-[240px] text-[15px] leading-[1.35] tracking-[-0.15px] text-[var(--ink)]/70">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 pb-28 text-center">
          <Reveal>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="ff mx-auto mt-4 max-w-[760px] text-[38px] leading-[1.05] tracking-[-0.76px] text-[var(--ink)] sm:text-[54px] sm:tracking-[-1.08px]">
              Ready to build predictable pipeline?
            </h2>
            <p className="mx-auto mt-5 max-w-[520px] text-[18px] leading-[1.4] tracking-[-0.18px] text-[var(--ink)]/80">
              See the engine mapped to your market on a 30-minute call.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Outline>How We Work</Outline>
              <Filled>Get A Demo</Filled>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--ink)]/10 bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="ff text-[24px] leading-none text-[var(--coral)]">Thyleads</div>
            <p className="mt-4 max-w-[280px] text-[15px] leading-[1.4] tracking-[-0.15px] text-[var(--ink)]/70">
              The revenue engine for the messy middle. From first signal to signed.
            </p>
          </div>
          {[
            { h: "Platform", items: ["Outbound", "Qualification", "Deal Momentum"] },
            { h: "Company", items: ["How We Work", "Case Studies", "About"] },
            { h: "Resources", items: ["Blog", "Report 2026", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--ink)]">{col.h}</div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <Link href="#" className="text-[15px] tracking-[-0.15px] text-[var(--ink)]/70 hover:text-[var(--coral)]">{it}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--ink)]/10">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6 text-[14px] text-[var(--ink)]/60">
            <span>&copy; 2026 Thyleads</span>
            <span>Built on the Jasper style system</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
