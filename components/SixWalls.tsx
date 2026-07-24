"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle } from "lucide-react";

/**
 * SixWalls — "sound familiar?" objection section.
 *
 * Horizontal alternating timeline: a segmented pastel bar with six numbered
 * circles that alternate above and below it, each connected to the bar, with a
 * title (underlined) and description on the opposite side. Collapses to a
 * vertical timeline on mobile. Beige (#f7f3eb) background, reduced-motion safe.
 * The scroll-pinned Jasper variant lives in components/SixWallsPinned.tsx.
 */

type Wall = { title: string; desc: string };

const walls: Wall[] = [
  { title: "Deals stall after the 1st call", desc: "There is a 70% chance of converting at the 2nd call, yet most prospects never get there. Momentum dies instantly." },
  { title: "Inbound filled with noise", desc: "Your team is wasting 40% of their time filtering unqualified inbound leads instead of actually selling." },
  { title: "Outbound is expensive", desc: "From hiring SDRs to continuous training and execution, building outbound is a resource-heavy and slow process." },
  { title: "Losing leads to delays", desc: "Multi-layer approval delays slow down decisions, causing even high-intent deals to drop off the pipeline." },
  { title: "SDR attrition", desc: "SDR attrition averages 14 months. It costs 3 months of ramp time and massive amounts of institutional knowledge." },
  { title: "Interest vs. intent", desc: "Interest is easy to find. Real intent isn't, yet your team spends hours figuring out who is actually serious." },
];

// All nodes stay in the brand-purple family — a subtle light-to-deep gradient
// across the six, so the section reads cohesive rather than multicoloured.
type Theme = { ring: string; num: string; bar: string; line: string };
const THEMES: Theme[] = [
  { ring: "border-primary-300", num: "text-primary-800", bar: "bg-primary-300", line: "bg-primary-300" },
  { ring: "border-primary-400", num: "text-primary-800", bar: "bg-primary-300", line: "bg-primary-400" },
  { ring: "border-primary-300", num: "text-primary-800", bar: "bg-primary-300", line: "bg-primary-300" },
  { ring: "border-primary-400", num: "text-primary-800", bar: "bg-primary-300", line: "bg-primary-400" },
  { ring: "border-primary-300", num: "text-primary-800", bar: "bg-primary-300", line: "bg-primary-300" },
  { ring: "border-primary-400", num: "text-primary-800", bar: "bg-primary-300", line: "bg-primary-400" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Small, quiet number badge — the content, not the number, is the focus. */
function Node({ n, t }: { n: number; t: Theme }) {
  return (
    <div className={`grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full border-2 bg-[#f7f3eb] ${t.ring}`}>
      <span className={`text-[20px] font-bold ${t.num}`}>{n}</span>
    </div>
  );
}

/** Wall content in a wide, readable card with a raised 3D purple border. */
function Info({ w }: { w: Wall }) {
  return (
    <div className="mx-auto w-full max-w-[360px] text-left">
      <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-[inset_0_1px_0_0_#ffffff,0_5px_0_0_#d4c5fd,0_16px_26px_-12px_rgba(94,48,208,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_0_#ffffff,0_8px_0_0_#b89afb,0_24px_36px_-14px_rgba(94,48,208,0.34)]">
        <h3 className="text-[19px] font-bold leading-snug tracking-tight text-neutral-900">{w.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-neutral-600">{w.desc}</p>
      </div>
    </div>
  );
}

const SixWalls = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#f7f3eb] px-6 pb-12 pt-14 font-sans sm:px-12">
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 shadow-sm">
            <AlertCircle className="h-3.5 w-3.5" strokeWidth={2} />
            Sound Familiar?
          </div>
          <h2 className="text-[32px] font-extrabold leading-[1.20] tracking-tight text-neutral-900 sm:text-[42px] lg:text-[48px]">
            Every SaaS team hits the same{" "}
            <span className="rounded-md bg-primary-100 px-2.5 py-0.5 text-primary-700">six walls</span>{" "}
            while scaling.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 lg:text-base">
            Identify the hidden bottlenecks that are leaking revenue and slowing down your sales cycles before they impact your bottom line.
          </p>
        </motion.div>

        {/* ── Desktop: horizontal alternating timeline ─────────────────── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-16 hidden lg:block"
        >
          {/* Same alternating look (numbers above/below, boxes opposite), but the
              boxes are positioned absolutely so they can be wider than a grid
              column without moving the numbers. */}
          <div className="relative h-[430px]">
            {/* Segmented bar, centred */}
            <div className="absolute inset-x-0 top-1/2 grid -translate-y-1/2 grid-cols-6">
              {walls.map((w, i) => {
                const t = THEMES[i];
                return (
                  <div
                    key={w.title}
                    className={`h-1.5 ${t.bar} ${i === 0 ? "rounded-l-full" : ""} ${i === 5 ? "rounded-r-full" : ""}`}
                  />
                );
              })}
            </div>

            {/* Wide content boxes — opposite each number */}
            {walls.map((w, i) => {
              const boxAbove = i % 2 !== 0;
              const x = ((i + 0.5) / 6) * 100;
              return (
                <div
                  key={`box-${w.title}`}
                  className="absolute w-[21%] max-w-[400px] -translate-x-1/2"
                  style={{ left: `${x}%`, [boxAbove ? "bottom" : "top"]: "calc(50% + 16px)" } as CSSProperties}
                >
                  <Info w={w} />
                </div>
              );
            })}

            {/* Small number badges + connectors — same alternating positions */}
            {walls.map((w, i) => {
              const t = THEMES[i];
              const circleTop = i % 2 === 0;
              const x = ((i + 0.5) / 6) * 100;
              return (
                <div
                  key={`node-${w.title}`}
                  className="absolute z-10 flex -translate-x-1/2 flex-col items-center"
                  style={{ left: `${x}%`, [circleTop ? "bottom" : "top"]: "50%" } as CSSProperties}
                >
                  {circleTop ? (
                    <>
                      <Node n={i + 1} t={t} />
                      <div className={`h-[52px] w-[2px] ${t.line}`} />
                    </>
                  ) : (
                    <>
                      <div className={`h-[52px] w-[2px] ${t.line}`} />
                      <Node n={i + 1} t={t} />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Mobile: vertical timeline ────────────────────────────────── */}
        <div className="mt-10 lg:hidden">
          {walls.map((w, i) => {
            const t = THEMES[i];
            return (
              <div key={w.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 bg-[#f7f3eb] ${t.ring}`}>
                    <span className={`text-base font-bold ${t.num}`}>{i + 1}</span>
                  </div>
                  {i < walls.length - 1 && <div className={`mt-1 w-[2px] flex-1 ${t.line}`} />}
                </div>
                <div className="mb-7 flex-1 rounded-2xl border border-primary-100 bg-white p-4 shadow-[inset_0_1px_0_0_#ffffff,0_4px_0_0_#d4c5fd,0_14px_22px_-12px_rgba(94,48,208,0.28)]">
                  <h3 className="text-[15px] font-bold text-neutral-900">{w.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">{w.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SixWalls;
