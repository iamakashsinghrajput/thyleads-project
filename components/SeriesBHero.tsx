"use client"
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';

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

export default function SeriesBHero() {
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
              For Scaling SaaS Teams · Series B and Beyond
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.025em] leading-[1.4] text-neutral-900"
          >
            Scaling SaaS Outbound{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              without Scaling Headcount
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            You&apos;ve raised the round. You&apos;ve hit product-market fit.
            Now you need a pipeline that scales faster than headcount, without
            burning your AEs or your burn multiple. Thyleads plugs in as an
            outbound engine built for SaaS teams scaling beyond Series B in
            India.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Scale your Growth
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

        {/* === RIGHT: Scaling-divergence chart === */}
        <motion.div variants={itemVariants} className="relative">
          <ScalingChart />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Scaling divergence chart — Pipeline ↑ vs Headcount → flat
   ============================================================ */

function ScalingChart() {
  // Pipeline curve waypoints (ARR / pipeline value scaling up)
  // x: 0–520, y: chart bottom 270 to top 70
  const pipelinePoints = [
    { x: 60, y: 245 },
    { x: 130, y: 220 },
    { x: 200, y: 195 },
    { x: 270, y: 160 },
    { x: 340, y: 120 },
    { x: 410, y: 90 },
    { x: 480, y: 70 },
  ];
  // Headcount line stays roughly flat (slight rise)
  const headcountPoints = [
    { x: 60, y: 250 },
    { x: 130, y: 248 },
    { x: 200, y: 245 },
    { x: 270, y: 242 },
    { x: 340, y: 240 },
    { x: 410, y: 238 },
    { x: 480, y: 236 },
  ];

  const pipelineD = `M ${pipelinePoints[0].x} ${pipelinePoints[0].y} ` +
    pipelinePoints.slice(1).map((p, i) => {
      const prev = pipelinePoints[i];
      const cx1 = prev.x + (p.x - prev.x) * 0.5;
      const cy1 = prev.y;
      const cx2 = p.x - (p.x - prev.x) * 0.5;
      const cy2 = p.y;
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
    }).join(' ');
  const pipelineAreaD = `${pipelineD} L ${pipelinePoints[pipelinePoints.length - 1].x} 290 L ${pipelinePoints[0].x} 290 Z`;

  const headcountD = `M ${headcountPoints[0].x} ${headcountPoints[0].y} ` +
    headcountPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');

  const xLabels = ['Series A', 'Series B', 'Series B+', 'Series C'];

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Atmospheric halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 bg-primary-200/30 blur-3xl rounded-[40px] pointer-events-none"
      />

      {/* Chart card */}
      <div className="relative rounded-3xl bg-white border border-slate-200 shadow-[0_28px_70px_-30px_rgba(132,92,245,0.32)] overflow-hidden">
        {/* Top gradient hairline */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
        />

        {/* === Header === */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
              Growth Snapshot
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Series A → C
          </span>
        </div>

        {/* === Chart === */}
        <div className="relative px-6 py-5">
          <svg
            viewBox="0 0 540 320"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="sb-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="sb-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#5b34d9" />
              </linearGradient>
            </defs>

            {/* Y-axis grid lines */}
            {[80, 140, 200, 260].map(y => (
              <line
                key={y}
                x1="55"
                y1={y}
                x2="490"
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis tick labels */}
            {[
              { y: 80, label: '5x' },
              { y: 140, label: '3x' },
              { y: 200, label: '1.5x' },
              { y: 260, label: '1x' },
            ].map(t => (
              <text
                key={t.label}
                x="44"
                y={t.y + 3}
                textAnchor="end"
                className="fill-slate-400"
                fontSize="8.5"
                fontWeight="700"
                fontFamily="ui-sans-serif, system-ui"
              >
                {t.label}
              </text>
            ))}

            {/* Pipeline area fill */}
            <motion.path
              d={pipelineAreaD}
              fill="url(#sb-area-grad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6, ease: easeOut }}
            />

            {/* Pipeline curve */}
            <motion.path
              d={pipelineD}
              fill="none"
              stroke="url(#sb-line-grad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.4, ease: easeInOut }}
            />

            {/* Pipeline data dots */}
            {pipelinePoints.map((p, i) => (
              <motion.g key={`p-${i}`}>
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill="rgba(132,92,245,0.20)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.18,
                    ease: easeOut,
                  }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="3.2"
                  fill="#5b34d9"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.55 + i * 0.18,
                    ease: easeOut,
                  }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              </motion.g>
            ))}

            {/* Headcount line (flat) */}
            <motion.path
              d={headcountD}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.6"
              strokeDasharray="4 5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: easeOut }}
            />

            {/* Headcount data dots */}
            {headcountPoints.map((p, i) => (
              <motion.circle
                key={`h-${i}`}
                cx={p.x}
                cy={p.y}
                r="2.2"
                fill="#94a3b8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.9 + i * 0.1,
                  ease: easeOut,
                }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            ))}

            {/* Pipeline end-point pulse halo */}
            <motion.circle
              cx={pipelinePoints[pipelinePoints.length - 1].x}
              cy={pipelinePoints[pipelinePoints.length - 1].y}
              r="6"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="1.4"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
              transition={{
                duration: 2.2,
                delay: 2.4,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                transformOrigin: `${pipelinePoints[pipelinePoints.length - 1].x}px ${pipelinePoints[pipelinePoints.length - 1].y}px`,
              }}
            />

            {/* X-axis */}
            <line
              x1="55"
              y1="290"
              x2="490"
              y2="290"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            {/* X-axis labels */}
            {xLabels.map((label, i) => (
              <text
                key={label}
                x={60 + i * 140}
                y="306"
                textAnchor="start"
                className="fill-slate-500"
                fontSize="9"
                fontWeight="700"
                fontFamily="ui-sans-serif, system-ui"
                letterSpacing="0.4"
              >
                {label.toUpperCase()}
              </text>
            ))}

            {/* Annotation: divergence callout */}
            <motion.g
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4, ease: easeOut }}
            >
              {/* Connector dotted line */}
              <line
                x1={pipelinePoints[5].x}
                y1={pipelinePoints[5].y}
                x2={pipelinePoints[5].x + 30}
                y2={pipelinePoints[5].y - 28}
                stroke="#c4b5fd"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <rect
                x={pipelinePoints[5].x + 20}
                y={pipelinePoints[5].y - 52}
                width="84"
                height="24"
                rx="6"
                fill="#5b34d9"
              />
              <text
                x={pipelinePoints[5].x + 62}
                y={pipelinePoints[5].y - 36}
                textAnchor="middle"
                className="fill-white"
                fontSize="9"
                fontWeight="800"
                fontFamily="ui-sans-serif, system-ui"
                letterSpacing="0.4"
              >
                +312% pipeline
              </text>
            </motion.g>
          </svg>
        </div>

        {/* === Legend / footer === */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-gradient-to-br from-primary-50/40 to-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="w-3 h-0.5 rounded-full bg-gradient-to-r from-primary-400 to-primary-700"
              />
              <span className="text-[11px] font-bold text-neutral-900">
                Pipeline
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="w-3 h-0.5 rounded-full bg-slate-400"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg,#94a3b8 0 2px,transparent 2px 4px)',
                }}
              />
              <span className="text-[11px] font-bold text-slate-500">
                Headcount
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-50 border border-primary-100 text-[10px] font-bold text-primary-700">
            <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
            <span className="tabular-nums">3.1x</span>
            <span className="text-primary-400">·</span>
            <Users className="w-3 h-3" strokeWidth={2.5} />
            <span className="tabular-nums">1.0x</span>
          </div>
        </div>
      </div>
    </div>
  );
}
