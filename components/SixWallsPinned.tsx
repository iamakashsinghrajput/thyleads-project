"use client";

import { useRef, useState } from "react";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";

/**
 * SixWalls — "sound familiar?" objection section, in the Jasper editorial world.
 *
 * Scroll-pinned narrative (matched to the reference recording): the section
 * pins to the viewport while a tall scroll runway advances the active wall one
 * by one. The heading stays put, the active row expands into its themed wash,
 * and a STATIC flat monochrome mockup (pinned top-right over a faint grid) swaps
 * to the active wall. Scroll progress drives the active index via framer's
 * useScroll (no scroll listeners). Desktop pins; mobile falls back to a normal
 * click accordion; reduced-motion drops the pin entirely.
 *
 * Tokens + serif face are scoped to `.jasper-sw`; the rest of the site is
 * untouched.
 */

const serif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--sw-serif", display: "swap" });
const sans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--sw-sans", display: "swap" });

const STYLE = `
.jasper-sw{ --ink:#00063d; background:#fff; color:var(--ink);
  font-family:var(--sw-sans), ui-sans-serif, system-ui, sans-serif; -webkit-font-smoothing:antialiased; }
.jasper-sw .serif{ font-family:var(--sw-serif), Georgia, serif; font-weight:400; }
.jasper-sw .grid-tex{
  background-image:
    linear-gradient(rgba(0,6,61,.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,6,61,.07) 1px, transparent 1px);
  background-size:76px 76px; }
`;

type Theme = { wash: string; panel: string; line: string; head: string };
type MockRow = { i: string; a: number; b?: number; pill?: string; ok?: boolean };
type Mock = {
  title: string; badge: string; rows: MockRow[];
  card: { title: string; big: string; sub: string; chips?: string[]; bar?: number };
};
type Wall = { title: string; desc: string; link: string; tag?: string; theme: Theme; mock: Mock };

const walls: Wall[] = [
  {
    title: "Deals stall after the first call",
    desc: "There is a 70% chance of converting on the second call, yet most prospects never get there. Momentum dies instantly.",
    link: "See how we fix it", tag: "MOST COMMON",
    theme: { wash: "#ffe8e2", panel: "#ffd2c7", line: "#fa4028", head: "#ffc2b4" },
    mock: {
      title: "CALL LOG", badge: "STALLED",
      rows: [
        { i: "01", a: 70, pill: "Connected", ok: true },
        { i: "02", a: 50, pill: "No answer", ok: false },
        { i: "03", a: 40, pill: "Never dialed", ok: false },
      ],
      card: { title: "DEAL STATUS", big: "70%", sub: "convert on the 2nd call", bar: 70 },
    },
  },
  {
    title: "Inbound filled with noise",
    desc: "Your team wastes 40% of its time filtering unqualified inbound leads instead of actually selling.",
    link: "See how we fix it",
    theme: { wash: "#ceebff", panel: "#a8d8ff", line: "#0060df", head: "#8fccff" },
    mock: {
      title: "INBOUND QUEUE", badge: "40% NOISE",
      rows: [
        { i: "01", a: 62, b: 30, pill: "Junk" },
        { i: "02", a: 84, b: 46, pill: "Qualified", ok: true },
        { i: "03", a: 50, b: 24, pill: "Junk" },
        { i: "04", a: 72, b: 38, pill: "Junk" },
      ],
      card: { title: "FILTER", big: "40%", sub: "of selling time lost", chips: ["spam", "no fit", "no budget"] },
    },
  },
  {
    title: "Hard to tell interest from intent",
    desc: "Interest is easy to find. Real intent is not, so your team spends hours deciding who is actually serious.",
    link: "See how we fix it",
    theme: { wash: "#ffe6f3", panel: "#ffc2e0", line: "#c81e78", head: "#ffb3de" },
    mock: {
      title: "SIGNAL ANALYSIS", badge: "SCORING",
      rows: [
        { i: "01", a: 40, b: 60, pill: "Low" },
        { i: "02", a: 88, b: 92, pill: "High", ok: true },
        { i: "03", a: 55, b: 34, pill: "Low" },
      ],
      card: { title: "INTENT SCORE", big: "84", sub: "in-market probability", bar: 84 },
    },
  },
  {
    title: "Losing leads to delays",
    desc: "Multi-layer approval delays slow decisions, causing even high-intent deals to drop off the pipeline.",
    link: "See how we fix it",
    theme: { wash: "#e6ffd9", panel: "#c2f0a8", line: "#2f7d0e", head: "#b6ec98" },
    mock: {
      title: "PIPELINE", badge: "+5 DAYS LAG",
      rows: [
        { i: "01", a: 90, pill: "Sourced", ok: true },
        { i: "02", a: 55, pill: "Approval" },
        { i: "03", a: 20, pill: "Closed" },
      ],
      card: { title: "APPROVAL", big: "PENDING", sub: "waiting 5 days", chips: ["legal", "finance", "vp"] },
    },
  },
  {
    title: "SDR attrition kills pipeline",
    desc: "SDR attrition averages 14 months. It costs 3 months of ramp time and vast institutional knowledge.",
    link: "See how we fix it",
    theme: { wash: "#fffbb7", panel: "#fff086", line: "#8a6d00", head: "#ffec6b" },
    mock: {
      title: "SDR BENCH", badge: "14MO AVG",
      rows: [
        { i: "01", a: 80, pill: "Ramped", ok: true },
        { i: "02", a: 60, pill: "Ramping" },
        { i: "03", a: 30, pill: "Left", ok: false },
        { i: "04", a: 15, pill: "New hire" },
      ],
      card: { title: "NEW HIRE RAMP", big: "3 mo", sub: "before productive", bar: 30 },
    },
  },
  {
    title: "Outbound is expensive",
    desc: "From hiring SDRs to continuous training and execution, building outbound is resource-heavy and slow.",
    link: "See how we fix it",
    theme: { wash: "#e7e3f7", panel: "#cfc4ee", line: "#5b3ea3", head: "#c3b6e9" },
    mock: {
      title: "COST BREAKDOWN", badge: "3X COST",
      rows: [
        { i: "01", a: 90, pill: "Hiring" },
        { i: "02", a: 70, pill: "Ramp" },
        { i: "03", a: 55, pill: "Tooling" },
      ],
      card: { title: "TOTAL", big: "3x", sub: "vs. Thyleads", bar: 100 },
    },
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function Mockup({ t, m }: { t: Theme; m: Mock }) {
  return (
    <div className="relative h-full w-full">
      <div className="w-[80%] border" style={{ borderColor: t.line, background: t.wash }}>
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: t.line, background: t.head }}>
          <span className="font-mono text-[12px] font-bold tracking-wide" style={{ color: t.line }}>{m.title}</span>
          <span className="font-mono text-[10px] tracking-wider" style={{ color: t.line }}>{m.badge}</span>
        </div>
        <div className="space-y-2.5 p-4">
          {m.rows.map((r) => (
            <div key={r.i} className="flex items-center gap-3">
              <span className="font-mono text-[11px]" style={{ color: t.line, opacity: 0.7 }}>{r.i}</span>
              <span className="h-2.5 rounded-[2px]" style={{ width: `${r.a}%`, maxWidth: "46%", background: t.panel }} />
              {r.b !== undefined && <span className="h-2.5 rounded-[2px]" style={{ width: `${r.b / 3}%`, background: t.panel, opacity: 0.6 }} />}
              {r.pill && (
                <span className="ml-auto rounded-[2px] px-2 py-0.5 font-mono text-[10px]" style={{ color: r.ok ? "#fff" : t.line, background: r.ok ? t.line : t.head }}>
                  {r.pill}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-[34%] w-[56%] border" style={{ borderColor: t.line, background: t.wash }}>
        <div className="border-b px-3 py-2" style={{ borderColor: t.line, background: t.head }}>
          <span className="font-mono text-[11px] font-bold tracking-wide" style={{ color: t.line }}>{m.card.title}</span>
        </div>
        <div className="p-3">
          <span className="serif text-[34px] leading-none" style={{ color: "var(--ink)" }}>{m.card.big}</span>
          <p className="mt-1 text-[12px]" style={{ color: t.line }}>{m.card.sub}</p>
          {m.card.bar !== undefined && (
            <div className="mt-3 h-2 w-full rounded-[2px]" style={{ background: t.head }}>
              <div className="h-full rounded-[2px]" style={{ width: `${m.card.bar}%`, background: t.line }} />
            </div>
          )}
          {m.card.chips && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.card.chips.map((c) => (
                <span key={c} className="rounded-[2px] px-2 py-0.5 font-mono text-[10px]" style={{ color: t.line, background: t.head }}>{c}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SixWallsPinned = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLElement>(null);

  // Scroll runway → active index (desktop pin only; efficient, no scroll listener).
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    if (typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches) return;
    const idx = Math.min(walls.length - 1, Math.max(0, Math.floor(p * walls.length)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const t = walls[active].theme;
  // Tall runway creates the pin; ~64vh of scroll per wall. Off for reduced motion.
  const runway = reduce ? "" : "lg:h-[420vh]";
  const pin = reduce ? "" : "lg:sticky lg:top-0 lg:h-[100svh]";

  return (
    <section ref={wrapRef} className={`jasper-sw ${serif.variable} ${sans.variable} relative w-full ${runway}`}>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />

      <div className={`${pin} flex items-start overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-12 lg:pt-[120px]`}>
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 lg:grid-cols-[1fr_1.04fr] lg:gap-16">
          {/* LEFT — heading + accordion */}
          <div className="order-2 lg:order-1">
            <div className="max-w-[520px]">
              <h2 className="serif text-[38px] leading-[1.02] tracking-[-1px] text-[var(--ink)] sm:text-[50px] sm:tracking-[-1.6px]">
                Every SaaS team hits the same six walls while scaling.
              </h2>
              <p className="mt-5 max-w-[460px] text-[16px] leading-[1.45] tracking-[-0.16px] text-[var(--ink)]/70">
                Identify the hidden bottlenecks leaking revenue and slowing your sales cycles
                before they reach your bottom line.
              </p>
            </div>

            <ol className="mt-8">
              {walls.map((w, i) => {
                const on = i === active;
                const wt = w.theme;
                return (
                  <li key={w.title} className="border-t border-[var(--ink)]/12 last:border-b last:border-[var(--ink)]/12">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on ? "true" : undefined}
                      className="relative block w-full py-4 text-left"
                    >
                      {on && <span aria-hidden className="absolute inset-y-0 -left-6 -right-6 -z-0" style={{ background: wt.wash }} />}
                      <div className="relative z-10">
                        <div className="flex items-center gap-3">
                          <h3 className={`serif text-[24px] leading-[1.05] tracking-[-0.4px] text-[var(--ink)] sm:text-[28px] transition-opacity ${on ? "opacity-100" : "opacity-90"}`}>
                            {w.title}
                          </h3>
                          {w.tag && (
                            <span className="rounded-[2px] px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider" style={{ color: wt.line, background: wt.head }}>
                              {w.tag}
                            </span>
                          )}
                        </div>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              initial={reduce ? undefined : { height: 0, opacity: 0 }}
                              animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                              exit={reduce ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2.5 text-[15px] leading-[1.5] tracking-[-0.15px] text-[var(--ink)]/80">{w.desc}</p>
                              <span className="mt-3.5 inline-flex items-center gap-2 border-b pb-0.5 text-[14px] font-medium" style={{ color: wt.line, borderColor: wt.line }}>
                                {w.link} <span aria-hidden>&rarr;</span>
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* RIGHT — static mockup over the faint grid (pinned with the section) */}
          <div className="order-1 lg:order-2">
            <div className="grid-tex relative h-[300px] w-full lg:h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex h-full w-full items-center"
                >
                  <div className="w-full">
                    <Mockup t={t} m={walls[active].mock} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixWallsPinned;
