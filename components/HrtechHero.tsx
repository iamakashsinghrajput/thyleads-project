"use client"
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeInOut: [number, number, number, number] = [0.45, 0, 0.55, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function HrtechHero() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary-50/40 via-white to-white pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/4 w-160 h-160 rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center"
      >
        {/* === LEFT: Copy === */}
        <div>
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
              </span>
              For HRTech SaaS in India
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.025em] leading-[1.4] text-neutral-900"
          >
            You built HRTech.{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              We&apos;ll get it in front of the right buyers.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We run specialized outbound for HRTech that lands right in the CHRO
            inboxes and keeps multi-stakeholder deals moving.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Talk to us
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
            <a
              href="/howitworks"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 text-primary-800 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* === RIGHT: Buying committee diagram === */}
        <motion.div variants={itemVariants} className="relative">
          <BuyingCommittee />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Buying-committee orchestration — restrained, smooth motion
   ============================================================ */

type Stakeholder = {
  initials: string;
  role: string;
  sub: string;
  // Card position in CSS percentages
  pos: { top: string; left?: string; right?: string };
  // SVG anchor where the connection path starts
  anchor: { x: number; y: number };
  // Bezier control offset direction (used to compute the curve's bend)
  bend: number;
  delay: number;
};

const SVG_W = 660;
const SVG_H = 420;
const CENTER = { x: 330, y: 210 };

const stakeholders: Stakeholder[] = [
  {
    initials: 'CH',
    role: 'CHRO',
    sub: 'Budget holder',
    pos: { top: '4%', left: '0%' },
    anchor: { x: 195, y: 100 },
    bend: -36,
    delay: 0.55,
  },
  {
    initials: 'VP',
    role: 'VP People',
    sub: 'Process owner',
    pos: { top: '4%', right: '0%' },
    anchor: { x: 465, y: 100 },
    bend: -36,
    delay: 0.7,
  },
  {
    initials: 'CF',
    role: 'CFO',
    sub: 'ROI approver',
    pos: { top: '62%', left: '0%' },
    anchor: { x: 195, y: 320 },
    bend: 36,
    delay: 0.85,
  },
  {
    initials: 'CI',
    role: 'CIO',
    sub: 'Security check',
    pos: { top: '62%', right: '0%' },
    anchor: { x: 465, y: 320 },
    bend: 36,
    delay: 1.0,
  },
];

/** Quadratic bezier point at parameter t (0..1) */
function bezierAt(t: number, p0: number, p1: number, p2: number) {
  const u = 1 - t;
  return u * u * p0 + 2 * u * t * p1 + t * t * p2;
}

function BuyingCommittee() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square">
      {/* Atmospheric halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 bg-primary-200/30 blur-3xl rounded-[48px] pointer-events-none"
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(132,92,245,0.14) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          mask: 'radial-gradient(ellipse 75% 75% at center, black 25%, transparent 80%)',
          WebkitMask:
            'radial-gradient(ellipse 75% 75% at center, black 25%, transparent 80%)',
        }}
      />

      {/* Connection paths */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="hr-path-bright"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#5b34d9" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {stakeholders.map(s => {
          const x1 = s.anchor.x;
          const y1 = s.anchor.y;
          const x2 = CENTER.x;
          const y2 = CENTER.y;
          const cx = (x1 + x2) / 2;
          const cy = (y1 + y2) / 2 + s.bend;
          const d = `M ${x1} ${y1} Q ${cx} ${cy}, ${x2} ${y2}`;

          // Pre-compute waypoints along the bezier for smooth cx/cy keyframes
          const steps = [0, 0.2, 0.4, 0.6, 0.8, 1];
          const xs = steps.map(t => bezierAt(t, x1, cx, x2));
          const ys = steps.map(t => bezierAt(t, y1, cy, y2));

          return (
            <g key={s.role}>
              {/* Resting dim path */}
              <path
                d={d}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2 5"
                opacity="0.65"
              />
              {/* Animated bright path — draws in once */}
              <motion.path
                d={d}
                fill="none"
                stroke="url(#hr-path-bright)"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{
                  duration: 1.1,
                  delay: s.delay,
                  ease: easeOut,
                }}
              />
              {/* Traveling pulse dot — smooth cx/cy keyframes along bezier */}
              <motion.circle
                r="2.6"
                fill="#7c3aed"
                initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
                animate={{
                  cx: xs,
                  cy: ys,
                  opacity: [0, 1, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 2.8,
                  delay: s.delay + 0.9,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                  ease: easeInOut,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Stakeholder cards */}
      {stakeholders.map(s => (
        <motion.div
          key={`card-${s.role}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: s.delay,
            ease: easeOut,
          }}
          className="absolute"
          style={{
            top: s.pos.top,
            left: s.pos.left,
            right: s.pos.right,
          }}
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -inset-1.5 bg-primary-300/25 blur-md rounded-2xl pointer-events-none"
            />

            <div className="relative w-[150px] rounded-2xl bg-white border border-slate-200 px-3.5 py-3 shadow-[0_12px_30px_-14px_rgba(15,23,42,0.18)]">
              <span
                aria-hidden="true"
                className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
              />

              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white text-[10px] font-extrabold flex items-center justify-center tracking-wide ring-2 ring-white shadow-[0_4px_12px_-4px_rgba(132,92,245,0.55)]">
                    {s.initials}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-extrabold text-neutral-900 leading-tight tracking-tight">
                    {s.role}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    {s.sub}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <span
                  className="relative flex h-1.5 w-1.5"
                  aria-hidden="true"
                >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-primary-700">
                  Engaged
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* === Center: Thyleads logo hub === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative will-change-transform">
          {/* Soft breathing halo (single, smooth) */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-5 bg-primary-300/35 blur-2xl rounded-full pointer-events-none"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: easeInOut,
            }}
          />

          {/* Single slow-rotating dashed ring */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-3 rounded-full border border-dashed border-primary-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            style={{ willChange: 'transform' }}
          />

          {/* Logo disc */}
          <div className="relative w-[112px] h-[112px] rounded-full bg-white ring-4 ring-white shadow-[0_22px_44px_-14px_rgba(132,92,245,0.55)] flex items-center justify-center overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute inset-1 rounded-full bg-gradient-to-br from-primary-50 via-white to-primary-50"
            />
            <Image
              src="/thylead.svg"
              alt="Thyleads"
              width={72}
              height={72}
              className="relative w-[70px] h-auto"
              priority
            />
          </div>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3, ease: easeOut }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-700 text-white text-[9px] font-bold uppercase tracking-[0.18em] shadow-[0_8px_22px_-8px_rgba(132,92,245,0.55)] whitespace-nowrap ring-2 ring-white"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Orchestrating
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
