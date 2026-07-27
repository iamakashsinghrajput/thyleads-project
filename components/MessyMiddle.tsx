'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Check,
  Radio,
  Filter,
  Zap,
  CheckCircle2,
  ArrowRight,
  User,
  type LucideIcon,
} from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

type Step = {
  num: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  points: string[];
  featured?: boolean;
  badge?: string;
  href?: string;
};

const steps: Step[] = [
  {
    num: '01',
    icon: Radio,
    tag: 'Signal > Spam',
    title: 'Signal-Led Outbound',
    desc: 'Signal-led conversations that convert',
    points: ['Vertical-focused GTM Pods', 'Multichannel Outreach', 'Pre-qualified meetings'],
  },
  {
    num: '02',
    icon: Filter,
    tag: 'Systematic Control',
    title: 'Inbound Qualification',
    desc: 'Turn inbound into pipeline from noise.',
    points: ['Speed-to-lead execution', 'Fit + Intent Qualification', 'Only sales-ready leads'],
  },
  {
    num: '03',
    icon: Zap,
    tag: 'The Deal Assist Pod',
    title: 'Deal Momentum',
    desc: 'Keep deals moving, with consistent momentum',
    points: ['Structured follow-ups', 'Multi-threading across stakeholders', 'Post-demo pipeline acceleration'],
    featured: true,
    href: '/howitworks#deal-assist',
  },
];

const outcomes = [
  { metric: '40%', label: 'Shorter sales cycles' },
  { metric: '2X', label: 'Higher deal control' },
  { metric: '1/3rd', label: 'of in-house cost' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ── Flat visual panels, one per step ────────────────────────────────── */

// 01 — Signal-led outbound: a radar reaching the right contacts.
function RadarViz() {
  const chips = [
    { top: '10%', left: '24%' },
    { top: '6%', left: '66%' },
    { top: '34%', left: '86%' },
    { top: '72%', left: '80%' },
    { top: '82%', left: '40%' },
    { top: '44%', left: '8%' },
  ];
  return (
    <div className="relative grid h-full w-full place-items-center">
      {[190, 140, 92].map((s, i) => (
        <span key={i} className="absolute rounded-full border-2 border-primary-300/55" style={{ width: s, height: s }} />
      ))}
      <span className="relative z-10 grid h-12 w-12 place-items-center rounded-xl bg-primary-500 text-white shadow-[0_10px_22px_-8px_rgba(150,132,96,0.7)]">
        <Radio className="h-5 w-5" strokeWidth={2} />
      </span>
      {chips.map((c, i) => (
        <span
          key={i}
          className="absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-primary-100 bg-white text-primary-600 shadow-sm"
          style={{ top: c.top, left: c.left }}
        >
          <User className="h-4 w-4" strokeWidth={2} />
        </span>
      ))}
    </div>
  );
}

// 02 — Inbound qualification: rows scored qualified vs filtered.
function FilterViz() {
  const rows = [
    { w: 78, ok: true },
    { w: 60, ok: false },
    { w: 84, ok: true },
    { w: 52, ok: false },
  ];
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="w-[78%] rounded-xl border border-neutral-200 bg-white p-3.5 shadow-[0_10px_28px_-16px_rgba(15,23,42,0.25)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-800">Inbound queue</span>
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-600">Fit + Intent</span>
        </div>
        <div className="space-y-2.5">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className={`h-6 w-6 shrink-0 rounded-md ${r.ok ? 'bg-primary-500' : 'bg-neutral-200'}`} />
              <span className="h-2 rounded-full bg-neutral-100" style={{ width: `${r.w}%` }} />
              <span
                className={`ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full text-white ${r.ok ? 'bg-primary-500' : 'bg-neutral-300'}`}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 03 — Deal momentum: a deal accelerating up the stages.
function MomentumViz() {
  const bars = [40, 58, 74, 100];
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="relative flex h-[150px] items-end gap-3">
        {bars.map((h, i) => (
          <div key={i} className="flex w-10 flex-col items-center justify-end">
            <div
              className={`w-full rounded-t-lg ${i === bars.length - 1 ? 'bg-primary-500' : 'bg-primary-300'}`}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
        <svg viewBox="0 0 200 120" className="pointer-events-none absolute inset-0 h-full w-full">
          <path d="M14 96 L70 74 L126 54 L182 20" fill="none" className="stroke-primary-600" strokeWidth="3" strokeLinecap="round" />
          <path d="M182 20 l-13 3 l6 -11 z" className="fill-primary-600" />
        </svg>
        <span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-primary-500 text-white shadow-[0_10px_22px_-8px_rgba(150,132,96,0.7)]">
          <Zap className="h-4 w-4 fill-current" />
        </span>
      </div>
    </div>
  );
}

const VIZ = [RadarViz, FilterViz, MomentumViz];

// Visual for each card. 3rd reuses the inbound image for now.
const IMAGES = ['/images/outbound.jpg', '/images/inbound.jpg', '/images/dealmomentum3.png'];

const MessyMiddle = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f3eb] px-6 py-20 font-sans sm:px-12 lg:py-18">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-5xl">
          Stop Hunting, Start Closing with our{' '}
          <span className="mt-2 inline-block rounded-md bg-primary-100 px-4 py-1 text-primary-700">
            3-Step SaaS Revenue Engine
          </span>
        </h2>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-neutral-500 md:text-lg">
          We focus on the &quot;messy middle&quot; between a prospect&apos;s first interest and the
          final close. So AEs only enter when revenue conversations are real.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
          {outcomes.map((o) => (
            <div
              key={o.label}
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm"
            >
              <Check className="h-3.5 w-3.5 text-primary-500" strokeWidth={2.5} />
              <span className="text-xs font-medium text-neutral-700 md:text-sm">
                <span className="font-bold text-primary-600">{o.metric}</span> {o.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Cards ──────────────────────────────────────────────────────── */}
      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="relative z-10 mx-auto mt-16 grid w-full max-w-7xl gap-6 md:grid-cols-3 lg:gap-8"
      >
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.num}
              variants={reduce ? undefined : rise}
              className={`group flex flex-col overflow-hidden rounded-[1.75rem] p-3 transition-all duration-500 hover:-translate-y-1 ${
                s.featured
                  ? 'bg-primary-50/60 ring-2 ring-primary-200'
                  : 'bg-neutral-50 ring-1 ring-neutral-200/70'
              }`}
            >
              {/* Visual panel */}
              <div className="relative h-[260px] overflow-hidden rounded-[1.4rem] bg-[#f1efe8]">
                <Image
                  src={IMAGES[i]}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative flex flex-1 flex-col px-4 pb-5 pt-6">
                {s.href && (
                  <Link
                    href={s.href}
                    aria-label="See the Deal Assist Pod on the How We Work page"
                    className="absolute inset-0 z-10 rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  />
                )}

                <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-600">
                  <Icon className="h-3 w-3" strokeWidth={2.4} />
                  {s.tag}
                </div>

                <h4 className="text-2xl font-bold tracking-tight text-neutral-900">{s.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">{s.desc}</p>

                <div className="mt-5 space-y-3">
                  {s.points.map((p) => (
                    <div key={p} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-500" strokeWidth={1.8} />
                      <span className="text-sm text-neutral-700">{p}</span>
                    </div>
                  ))}
                </div>

                {s.href && (
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                    See the Deal Assist Pod
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default MessyMiddle;
