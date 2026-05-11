"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
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

const highlightVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.85, delay: 0.4, ease: easeOut },
  },
};

type Stage = {
  id: string;
  label: string;
  shortTitle: string;
  shortDesc: string;
  title: string;
  description: string;
  bullets: string[];
};

const stages: Stage[] = [
  {
    id: 'foundation',
    label: 'Stage 01 · Foundation',
    shortTitle: 'Lock your ICP and build the foundation',
    shortDesc: 'Get the base right before outreach begins',
    title: 'Lock your ICP and build the foundation',
    description:
      'Before a single email is sent, we map your ideal customer profile and build high-quality account and contact data. We also set up content, email infrastructure, and LinkedIn profiles so campaigns land in inboxes, not spam folders.',
    bullets: [
      'ICP refinement from your last 10 closed deals',
      'Account and contact data building',
      'Content creation for outreach sequences',
      'Email and LinkedIn infrastructure setup',
    ],
  },
  {
    id: 'activation',
    label: 'Stage 02 · Activation',
    shortTitle: 'Reach buyers when they’re already looking',
    shortDesc: 'Start conversations only when timing is right',
    title: 'Reach buyers when they’re already looking',
    description:
      'We layer intent data and engagement triggers to time outreach precisely. Buyers hear from you when they’re already exploring the problem you solve. No early interest gets lost between the first reply and the first meeting.',
    bullets: [
      'Campaign launch with signal-based timing',
      'Intent-triggered outreach sequences',
      'Response management and routing',
      'First appointment setup and confirmation',
    ],
  },
  {
    id: 'qualification',
    label: 'Stage 03 · Qualification',
    shortTitle: 'Qualify before your AE’s calendar fills up',
    shortDesc: 'Protect AE time with revenue-grade filtering',
    title: 'Qualify before your AE’s calendar fills up',
    description:
      'Before an AE ever steps in, we qualify for fit, intent, and urgency. Each meeting is backed by pre-meeting intelligence, so AEs walk in informed. Low-quality meetings never hit the calendar.',
    bullets: [
      'Fit, intent, and urgency qualification',
      'Pre-assessment notes for every meeting',
      'Pre-meeting account intelligence briefing',
      'Calendar management and no-show reduction',
    ],
  },
  {
    id: 'momentum',
    label: 'Stage 04 · Deal Momentum',
    shortTitle: 'Keep deals moving through the messy middle',
    shortDesc: 'Move deals forward consistently',
    title: 'Keep deals moving through the messy middle',
    description:
      'We manage demo follow-ups, stakeholder mapping, and multi-touch sequences. This is where complex SaaS cycles usually stall, after early interest but before internal consensus. We make sure momentum never drops.',
    bullets: [
      'Demo follow-up and post-demo alignment',
      'Buying committee mapping',
      'Multi-touch follow-ups across channels',
      'Next-step alignment with all stakeholders',
    ],
  },
  {
    id: 'close-learn',
    label: 'Stage 05 · Close + Learn',
    shortTitle: 'Close, learn, and sharpen the next cycle',
    shortDesc: 'Turn wins into repeatable growth',
    title: 'Close, learn, and sharpen the next cycle',
    description:
      'Closing isn’t the finish line. We feed deal learnings back into targeting, messaging, and campaigns. Every cycle sharpens the ICP and improves conversion for the next one.',
    bullets: [
      'Close support and deal tracking',
      'Performance reporting with pipeline attribution',
      'CRM updates and data hygiene',
      'Insight-driven iteration on ICP and messaging',
    ],
  },
];

const AUTO_ADVANCE_MS = 6500;

export default function GtmFiveStageSystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % stages.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, paused]);

  const active = stages[activeIndex];

  return (
    <section
      id="framework"
      className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-white font-sans"
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              The five-stage system
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            One system that runs{' '}
            <span className="relative inline-block px-3 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                ICP to close.
              </span>
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Each stage feeds the next. Nothing runs in isolation, nothing falls
            through the cracks.
          </motion.p>
        </div>

        {/* === BODY === */}
        <motion.div
          variants={itemVariants}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5"
        >
          {/* === LEFT — stage selector === */}
          <div className="lg:col-span-3 rounded-2xl bg-white border border-slate-200 p-2.5 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.06)]">
            <ul className="flex flex-col">
              {stages.map((stage, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={stage.id} className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`relative w-full text-left px-3.5 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-primary-50'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`text-[13px] font-bold leading-snug transition-colors ${
                          isActive ? 'text-neutral-900' : 'text-slate-700'
                        }`}
                      >
                        {stage.shortTitle}
                      </div>
                      <div
                        className={`mt-1 text-[11px] leading-snug transition-colors ${
                          isActive ? 'text-primary-700' : 'text-slate-500'
                        }`}
                      >
                        {stage.shortDesc}
                      </div>

                      {/* Auto-advance progress (active only) */}
                      {isActive && !paused && (
                        <motion.span
                          aria-hidden="true"
                          key={`progress-${i}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: AUTO_ADVANCE_MS / 1000,
                            ease: 'linear',
                          }}
                          className="absolute left-3.5 right-3.5 bottom-1 h-[2px] rounded-full bg-primary-300/70 origin-left"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* === MIDDLE — live animation panel === */}
          <div className="lg:col-span-4">
            <div className="relative h-full min-h-[320px] rounded-2xl bg-gradient-to-br from-primary-50 via-primary-50/60 to-white border border-primary-100 overflow-hidden">
              {/* Subtle dot grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(132,92,245,0.10) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                  mask: 'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%)',
                  WebkitMask:
                    'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%)',
                }}
              />

              {/* Inner soft glow */}
              <div
                aria-hidden="true"
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary-200/50 blur-3xl pointer-events-none"
              />

              {/* Stage caption */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur border border-primary-100 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700 shadow-sm">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                </span>
                Live
              </div>

              {/* Animation slot */}
              <div className="relative h-full w-full flex items-center justify-center p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <StageAnimation id={active.id} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* === RIGHT — content panel === */}
          <div className="lg:col-span-5">
            <div className="relative h-full rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.06)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary-700 mb-3">
                    {active.label}
                  </div>

                  <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-extrabold tracking-[-0.01em] leading-[1.2] text-neutral-900">
                    {active.title}
                  </h3>

                  <p className="mt-4 text-[15px] text-slate-600 leading-relaxed">
                    {active.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {active.bullets.map((bullet, i) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 + i * 0.06,
                          ease: easeOut,
                        }}
                        className="flex items-start gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-primary-300 bg-primary-50 flex items-center justify-center text-primary-700"
                        >
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className="text-[14px] text-slate-700 leading-relaxed">
                          {bullet}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Stage animations — unique per stage, all SVG-based
   ============================================================ */

function StageAnimation({ id }: { id: string }) {
  switch (id) {
    case 'foundation':
      return <FoundationAnimation />;
    case 'activation':
      return <ActivationAnimation />;
    case 'qualification':
      return <QualificationAnimation />;
    case 'momentum':
      return <MomentumAnimation />;
    case 'close-learn':
      return <CloseLearnAnimation />;
    default:
      return null;
  }
}

/* Shared SVG defs — soft glow + gradients */
function SharedDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#5b34d9" />
      </linearGradient>
      <radialGradient id={`${id}-radial`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* ─── Stage 01 — Foundation: ICP target with attributes locking in ── */
function FoundationAnimation() {
  // Four attribute tags that orbit and snap to anchor positions on the rings
  const attrs = [
    { label: 'ICP', x: 30, y: 60, color: 'fill-primary-700' },
    { label: 'Email', x: 196, y: 70, color: 'fill-primary-600' },
    { label: 'Content', x: 36, y: 184, color: 'fill-primary-600' },
    { label: 'LinkedIn', x: 196, y: 184, color: 'fill-primary-700' },
  ];

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[280px] h-auto">
      <SharedDefs id="found" />

      {/* Soft radial halo */}
      <circle cx="120" cy="120" r="100" fill="url(#found-radial)" />

      {/* Blueprint grid (subtle) */}
      <g className="text-primary-300" stroke="currentColor" strokeWidth="0.5" opacity={0.35}>
        {[40, 80, 120, 160, 200].map(v => (
          <g key={v}>
            <line x1={v} y1="20" x2={v} y2="220" />
            <line x1="20" y1={v} x2="220" y2={v} />
          </g>
        ))}
      </g>

      {/* Outer ring (slow rotate) */}
      <motion.circle
        cx="120"
        cy="120"
        r="92"
        fill="none"
        className="stroke-primary-300"
        strokeWidth="1.4"
        strokeDasharray="2 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '120px 120px' }}
      />

      {/* Mid ring (pulse) */}
      <motion.circle
        cx="120"
        cy="120"
        r="68"
        fill="none"
        className="stroke-primary-400"
        strokeWidth="1.4"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '120px 120px' }}
      />

      {/* Inner ring */}
      <circle
        cx="120"
        cy="120"
        r="40"
        fill="none"
        className="stroke-primary-500"
        strokeWidth="1.6"
      />

      {/* Crosshair ticks */}
      <g className="stroke-primary-600" strokeWidth="1.4" strokeLinecap="round">
        <line x1="120" y1="14" x2="120" y2="26" />
        <line x1="120" y1="214" x2="120" y2="226" />
        <line x1="14" y1="120" x2="26" y2="120" />
        <line x1="214" y1="120" x2="226" y2="120" />
      </g>

      {/* Connector lines from center to each attribute (drawn) */}
      {attrs.map((a, i) => (
        <motion.line
          key={`line-${i}`}
          x1="120"
          y1="120"
          x2={a.x}
          y2={a.y}
          className="stroke-primary-300"
          strokeWidth="1"
          strokeDasharray="2 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: easeOut }}
        />
      ))}

      {/* Attribute chips that drop in and lock */}
      {attrs.map((a, i) => (
        <motion.g
          key={a.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.5 + i * 0.2,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{ transformOrigin: `${a.x}px ${a.y}px` }}
        >
          {/* Card */}
          <rect
            x={a.x - 26}
            y={a.y - 9}
            width="52"
            height="18"
            rx="6"
            className="fill-white stroke-primary-200"
            strokeWidth="1"
          />
          {/* Dot */}
          <circle cx={a.x - 18} cy={a.y} r="2.5" className={a.color} />
          {/* Label */}
          <text
            x={a.x - 11}
            y={a.y + 3}
            className="fill-primary-800"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui"
          >
            {a.label}
          </text>
        </motion.g>
      ))}

      {/* Center "locked" core — concentric pulse */}
      <motion.circle
        cx="120"
        cy="120"
        r="22"
        className="fill-primary-100"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '120px 120px' }}
      />
      <circle cx="120" cy="120" r="14" fill="url(#found-grad)" filter="url(#found-glow)" />
      {/* Locked check */}
      <motion.path
        d="M114 120 L119 125 L128 115"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.4, ease: easeOut }}
      />
    </svg>
  );
}

/* ─── Stage 02 — Activation: intent rises → trigger → outreach → reply ── */
function ActivationAnimation() {
  // Sparkline points showing buyer intent rising over time
  const points = [
    { x: 30, y: 158 },
    { x: 56, y: 150 },
    { x: 82, y: 138 },
    { x: 108, y: 132 },
    { x: 134, y: 116 },
    { x: 160, y: 96 },
    { x: 186, y: 70 },
    { x: 210, y: 60 },
  ];
  const lineD =
    `M ${points[0].x} ${points[0].y} ` +
    points
      .slice(1)
      .map(p => `L ${p.x} ${p.y}`)
      .join(' ');
  const areaD = `${lineD} L ${points[points.length - 1].x} 180 L ${points[0].x} 180 Z`;
  // Trigger point — moment intent crosses threshold
  const trigger = { x: 160, y: 96 };

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[280px] h-auto">
      <SharedDefs id="act" />
      <defs>
        <linearGradient id="act-area" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5b34d9" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#5b34d9" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Chart frame */}
      <rect
        x="20"
        y="36"
        width="200"
        height="156"
        rx="10"
        className="fill-white stroke-primary-200"
        strokeWidth="1"
      />

      {/* Y-grid */}
      <g className="stroke-primary-100" strokeWidth="0.8">
        <line x1="20" y1="76" x2="220" y2="76" />
        <line x1="20" y1="116" x2="220" y2="116" />
        <line x1="20" y1="156" x2="220" y2="156" />
      </g>

      {/* Y-axis label */}
      <text
        x="28"
        y="48"
        className="fill-slate-400"
        fontSize="7"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui"
        letterSpacing="0.5"
      >
        INTENT
      </text>

      {/* Threshold line */}
      <line
        x1="20"
        y1="110"
        x2="160"
        y2="110"
        className="stroke-primary-400"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <rect x="166" y="103" width="50" height="14" rx="3" className="fill-primary-50 stroke-primary-300" strokeWidth="0.8" />
      <text
        x="191"
        y="113"
        textAnchor="middle"
        className="fill-primary-700"
        fontSize="6.5"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui"
        letterSpacing="0.5"
      >
        THRESHOLD
      </text>

      {/* Filled area under the curve — fades in/out */}
      <motion.path
        d={areaD}
        fill="url(#act-area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 0.9, 1],
        }}
      />

      {/* Sparkline drawing in across the cycle */}
      <motion.path
        d={lineD}
        fill="none"
        className="stroke-primary-700"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 0.9, 1],
        }}
      />

      {/* Activity tracker dot — follows the line, then settles at trigger */}
      <motion.circle
        r="4"
        fill="url(#act-grad)"
        filter="url(#act-glow)"
        initial={{ cx: points[0].x, cy: points[0].y, opacity: 0 }}
        animate={{
          cx: points.map(p => p.x),
          cy: points.map(p => p.y),
          opacity: [0, 1, 1, 1, 1, 1, 1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: 'easeInOut',
        }}
      />

      {/* SEND NOW pill — fires when line crosses threshold */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0, 1, 1, 0],
          scale: [0.6, 0.6, 1.05, 1, 0.9],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeOut',
          times: [0, 0.42, 0.5, 0.85, 1],
        }}
        style={{ transformOrigin: `${trigger.x}px ${trigger.y - 24}px` }}
      >
        {/* Pulse ring at the trigger */}
        <motion.circle
          cx={trigger.x}
          cy={trigger.y}
          r="6"
          fill="none"
          className="stroke-primary-500"
          strokeWidth="1.4"
          animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: `${trigger.x}px ${trigger.y}px` }}
        />
        <circle cx={trigger.x} cy={trigger.y} r="6" fill="url(#act-grad)" filter="url(#act-glow)" />
        <circle cx={trigger.x} cy={trigger.y} r="2.5" className="fill-white" />
        {/* Pill */}
        <rect x={trigger.x - 30} y={trigger.y - 32} width="60" height="14" rx="4" className="fill-primary-700" />
        <text
          x={trigger.x}
          y={trigger.y - 22}
          textAnchor="middle"
          className="fill-white"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="0.6"
        >
          SEND NOW
        </text>
        <line
          x1={trigger.x}
          y1={trigger.y - 18}
          x2={trigger.x}
          y2={trigger.y - 8}
          className="stroke-primary-700"
          strokeWidth="1.2"
        />
      </motion.g>

      {/* Outbound email envelope — flies up-and-out from the trigger */}
      <motion.g
        initial={{ x: trigger.x, y: trigger.y, opacity: 0, scale: 0.6 }}
        animate={{
          x: [trigger.x, trigger.x, trigger.x + 14, trigger.x + 30],
          y: [trigger.y, trigger.y - 4, trigger.y - 18, trigger.y - 38],
          opacity: [0, 0, 1, 1, 0],
          scale: [0.6, 0.6, 1, 1, 0.7],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeOut',
          times: [0, 0.55, 0.62, 0.82, 1],
        }}
      >
        <rect x="-9" y="-6" width="18" height="12" rx="2" className="fill-white stroke-primary-700" strokeWidth="1.4" />
        <path
          d="M -9 -6 L 0 1 L 9 -6"
          fill="none"
          className="stroke-primary-700"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* REPLIED chip in the top-left of the chart */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, -2] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: easeOut,
          times: [0, 0.7, 0.78, 0.92, 1],
        }}
      >
        <rect x="34" y="46" width="58" height="16" rx="4" className="fill-white stroke-primary-300" strokeWidth="1" />
        <circle cx="44" cy="54" r="3.4" className="fill-primary-600" />
        <path d="M40.2 54 L43.4 56.6 L48.6 51.4" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text
          x="86"
          y="58"
          textAnchor="end"
          className="fill-primary-800"
          fontSize="8"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="0.4"
        >
          REPLIED
        </text>
      </motion.g>

      {/* Time-axis baseline & day labels */}
      <line x1="20" y1="180" x2="220" y2="180" className="stroke-primary-300" strokeWidth="1" />
      <g
        className="fill-slate-400"
        fontSize="6.5"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui"
        letterSpacing="0.4"
      >
        <text x="40" y="194" textAnchor="middle">MON</text>
        <text x="86" y="194" textAnchor="middle">TUE</text>
        <text x="134" y="194" textAnchor="middle">WED</text>
        <text x="186" y="194" textAnchor="middle">THU</text>
      </g>

      {/* MEETING BOOKED ribbon at the bottom */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, -3] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: easeOut,
          times: [0, 0.82, 0.88, 0.96, 1],
        }}
      >
        <rect x="60" y="206" width="120" height="20" rx="6" fill="url(#act-grad)" />
        <path
          d="M76 216 L82 222 L94 210"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="132"
          y="220"
          textAnchor="middle"
          className="fill-white"
          fontSize="8.5"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="0.5"
        >
          MEETING BOOKED
        </text>
      </motion.g>
    </svg>
  );
}

/* ─── Stage 03 — Qualification: funnel filtering leads → calendar slot ── */
function QualificationAnimation() {
  // Lead dots cascading; some pass through funnel (qualified), others get filtered (X)
  const leads = [
    { x: 60, delay: 0, qualified: true },
    { x: 96, delay: 0.4, qualified: false },
    { x: 120, delay: 0.8, qualified: true },
    { x: 144, delay: 1.2, qualified: false },
    { x: 180, delay: 1.6, qualified: true },
  ];

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[280px] h-auto">
      <SharedDefs id="qual" />

      {/* Funnel shape */}
      <motion.path
        d="M 50 60 L 190 60 L 144 132 L 144 168 L 96 168 L 96 132 Z"
        fill="url(#qual-radial)"
        className="stroke-primary-400"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        style={{ transformOrigin: '120px 110px' }}
      />

      {/* Funnel inner divider line */}
      <line
        x1="50"
        y1="60"
        x2="190"
        y2="60"
        className="stroke-primary-500"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Top label */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <rect x="86" y="28" width="68" height="16" rx="8" className="fill-white stroke-primary-200" strokeWidth="1" />
        <text
          x="120"
          y="39"
          textAnchor="middle"
          className="fill-primary-700"
          fontSize="9"
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="0.6"
        >
          ALL LEADS
        </text>
      </motion.g>

      {/* Cascading lead dots */}
      {leads.map((lead, i) => (
        <motion.g key={i}>
          <motion.circle
            r="4"
            className={lead.qualified ? 'fill-primary-700' : 'fill-slate-300'}
            initial={{ cx: lead.x, cy: 50, opacity: 0 }}
            animate={
              lead.qualified
                ? {
                    cx: [lead.x, 120, 120],
                    cy: [50, 130, 168],
                    opacity: [0, 1, 1, 0],
                  }
                : {
                    cx: [lead.x, lead.x, lead.x + (lead.x < 120 ? -30 : 30)],
                    cy: [50, 78, 92],
                    opacity: [0, 1, 0],
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: lead.delay,
              ease: 'easeIn',
              times: lead.qualified ? [0, 0.5, 0.85, 1] : [0, 0.5, 1],
            }}
          />
          {/* X mark for rejected — pops at the deflection point */}
          {!lead.qualified && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: lead.delay,
                times: [0.5, 0.65, 1],
                ease: 'easeOut',
              }}
              style={{
                transformOrigin: `${lead.x + (lead.x < 120 ? -30 : 30)}px 92px`,
              }}
            >
              <line
                x1={lead.x + (lead.x < 120 ? -34 : 26)}
                y1={88}
                x2={lead.x + (lead.x < 120 ? -26 : 34)}
                y2={96}
                className="stroke-slate-400"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1={lead.x + (lead.x < 120 ? -34 : 26)}
                y1={96}
                x2={lead.x + (lead.x < 120 ? -26 : 34)}
                y2={88}
                className="stroke-slate-400"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.g>
          )}
        </motion.g>
      ))}

      {/* Calendar slot at the bottom */}
      <g>
        <rect
          x="80"
          y="174"
          width="80"
          height="42"
          rx="6"
          className="fill-white stroke-primary-300"
          strokeWidth="1.4"
        />
        {/* Calendar header bar */}
        <rect
          x="80"
          y="174"
          width="80"
          height="10"
          rx="6"
          className="fill-primary-700"
        />
        {/* Calendar dots (pegs) */}
        <circle cx="92" cy="179" r="1.6" className="fill-white" />
        <circle cx="148" cy="179" r="1.6" className="fill-white" />
        {/* Calendar grid lines */}
        <line x1="100" y1="195" x2="140" y2="195" className="stroke-primary-200" strokeWidth="0.8" />
        <line x1="100" y1="203" x2="140" y2="203" className="stroke-primary-200" strokeWidth="0.8" />

        {/* Booked slot — fills when qualified lead lands */}
        <motion.rect
          x="100"
          y="190"
          width="40"
          height="8"
          rx="2"
          className="fill-primary-100"
          animate={{ opacity: [0.5, 1, 1, 0.5] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.6, 0.85, 1],
          }}
        />
        {/* Booked check */}
        <motion.path
          d="M104 194 L108 198 L116 190"
          fill="none"
          className="stroke-primary-700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: easeOut,
            times: [0, 0.65, 0.9, 1],
          }}
        />
      </g>

      {/* "Qualified" label */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.65, 0.9, 1],
        }}
      >
        <rect x="166" y="186" width="56" height="14" rx="4" className="fill-primary-700" />
        <text
          x="194"
          y="196"
          textAnchor="middle"
          className="fill-white"
          fontSize="8"
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="0.4"
        >
          BOOKED
        </text>
      </motion.g>
    </svg>
  );
}

/* ─── Stage 04 — Deal momentum: stakeholder network with traveling messages ── */
function MomentumAnimation() {
  // Named stakeholders around a central deal — buying committee mapping
  const nodes = [
    { id: 'cfo', label: 'CFO', x: 50, y: 70 },
    { id: 'cio', label: 'CIO', x: 190, y: 70 },
    { id: 'risk', label: 'Risk', x: 30, y: 170 },
    { id: 'legal', label: 'Legal', x: 210, y: 170 },
  ];

  const center = { x: 120, y: 120 };

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[280px] h-auto">
      <SharedDefs id="mom" />

      {/* Soft halo */}
      <circle cx={center.x} cy={center.y} r="80" fill="url(#mom-radial)" />

      {/* Connection lines */}
      {nodes.map(n => (
        <line
          key={n.id}
          x1={center.x}
          y1={center.y}
          x2={n.x}
          y2={n.y}
          className="stroke-primary-300"
          strokeWidth="1.2"
          strokeDasharray="2 4"
          opacity={0.7}
        />
      ))}

      {/* Traveling message dots — each follows its own path */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`msg-${n.id}`}
          r="3.5"
          className="fill-primary-700"
          filter="url(#mom-glow)"
          initial={{ cx: center.x, cy: center.y }}
          animate={{ cx: [center.x, n.x, center.x], cy: [center.y, n.y, center.y] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          }}
        />
      ))}

      {/* Stakeholder nodes */}
      {nodes.map((n, i) => (
        <g key={n.id}>
          {/* Outer pulse */}
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="14"
            fill="none"
            className="stroke-primary-400"
            strokeWidth="1.2"
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: 0.3 + i * 0.3,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
          {/* Node bg */}
          <circle cx={n.x} cy={n.y} r="14" className="fill-white stroke-primary-300" strokeWidth="1.4" />
          {/* Inner */}
          <circle cx={n.x} cy={n.y} r="9" className="fill-primary-100" />
          {/* Label */}
          <text
            x={n.x}
            y={n.y + 3}
            textAnchor="middle"
            className="fill-primary-800"
            fontSize="7.5"
            fontWeight="800"
            fontFamily="ui-sans-serif, system-ui"
            letterSpacing="0.3"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Center "deal" tile */}
      <g>
        <rect
          x="92"
          y="100"
          width="56"
          height="40"
          rx="6"
          className="fill-white stroke-primary-300"
          strokeWidth="1.4"
        />
        {/* Deal bar */}
        <rect x="92" y="100" width="56" height="10" rx="6" fill="url(#mom-grad)" />
        {/* Progress fill */}
        <rect x="98" y="118" width="44" height="4" rx="2" className="fill-primary-100" />
        <motion.rect
          x="98"
          y="118"
          height="4"
          rx="2"
          className="fill-primary-700"
          animate={{ width: [4, 44, 4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Sub line */}
        <rect x="98" y="128" width="28" height="3" rx="1.5" className="fill-primary-200" />
        {/* Deal label */}
        <text
          x="120"
          y="108"
          textAnchor="middle"
          className="fill-white"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="0.5"
        >
          DEAL
        </text>
      </g>
    </svg>
  );
}

/* ─── Stage 05 — Close + Learn: refined compounding flywheel ── */
function CloseLearnAnimation() {
  const cx = 120;
  const cy = 120;
  const ringR = 60;
  const cycle = 4;

  const phases = [
    { id: 'close', label: 'CLOSE', angle: 270, t: 0 },
    { id: 'learn', label: 'LEARN', angle: 0, t: 0.25 },
    { id: 'sharpen', label: 'SHARPEN', angle: 90, t: 0.5 },
    { id: 'launch', label: 'LAUNCH', angle: 180, t: 0.75 },
  ];

  // Win-rate progression — climbs each phase, telling the compounding story
  const rates = [28, 32, 36, 41];
  // Cycle counter values
  const cycleNumbers = ['C 01', 'C 02', 'C 03', 'C 04'];

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[280px] h-auto">
      <SharedDefs id="cl" />
      <defs>
        <linearGradient id="cl-arc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#5b34d9" />
        </linearGradient>
      </defs>

      {/* Soft radial halo */}
      <circle cx={cx} cy={cy} r="104" fill="url(#cl-radial)" />

      {/* Compounding rings — expand outward at end of each cycle */}
      {[0, 0.18].map((d, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="74"
          fill="none"
          className="stroke-primary-300"
          strokeWidth="1"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: [0.94, 1.1, 1.1], opacity: [0.55, 0, 0] }}
          transition={{
            duration: 1.6,
            delay: cycle - 0.6 + d,
            repeat: Infinity,
            repeatDelay: cycle - 1.6,
            ease: 'easeOut',
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Outer slow-rotating dashed accent */}
      <motion.circle
        cx={cx}
        cy={cy}
        r="84"
        fill="none"
        className="stroke-primary-200"
        strokeWidth="1"
        strokeDasharray="2 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Track ring (background of the gauge) */}
      <circle
        cx={cx}
        cy={cy}
        r={ringR}
        fill="none"
        className="stroke-primary-100"
        strokeWidth="6"
      />

      {/* Tick marks at cardinal points */}
      {[270, 0, 90, 180].map(deg => {
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + (ringR - 9) * Math.cos(rad);
        const y1 = cy + (ringR - 9) * Math.sin(rad);
        const x2 = cx + (ringR + 9) * Math.cos(rad);
        const y2 = cy + (ringR + 9) * Math.sin(rad);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="stroke-primary-200"
            strokeWidth="1"
          />
        );
      })}

      {/* Progress arc — fills clockwise as the comet orbits */}
      <motion.path
        d={`M ${cx} ${cy - ringR} A ${ringR} ${ringR} 0 1 1 ${cx - 0.01} ${cy - ringR}`}
        fill="none"
        stroke="url(#cl-arc)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }}
        transition={{
          duration: cycle,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.88, 0.96, 1],
        }}
      />

      {/* Comet — orbits the gauge synchronously */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: cycle, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* Outer glow */}
        <circle
          cx={cx}
          cy={cy - ringR}
          r="13"
          fill="url(#cl-grad)"
          filter="url(#cl-glow)"
          opacity="0.35"
        />
        {/* Disc */}
        <circle
          cx={cx}
          cy={cy - ringR}
          r="7"
          fill="url(#cl-grad)"
          filter="url(#cl-glow)"
        />
        {/* Bright core */}
        <circle cx={cx} cy={cy - ringR} r="2.6" fill="white" />
      </motion.g>

      {/* Phase nodes — refined */}
      {phases.map(p => {
        const rad = (p.angle * Math.PI) / 180;
        const x = cx + ringR * Math.cos(rad);
        const y = cy + ringR * Math.sin(rad);
        // Push left/right labels enough to clear the node, but keep them inside the viewBox
        const lblDist = p.angle === 0 || p.angle === 180 ? 14 : 22;
        const lblX = cx + (ringR + lblDist) * Math.cos(rad);
        const lblY = cy + (ringR + lblDist) * Math.sin(rad);
        const anchor =
          p.angle === 0 ? 'start' : p.angle === 180 ? 'end' : 'middle';
        const transformOrigin = `${x}px ${y}px`;

        return (
          <g key={p.id}>
            {/* Pulse halo */}
            <motion.circle
              cx={x}
              cy={y}
              r="9"
              fill="none"
              className="stroke-primary-500"
              strokeWidth="1.5"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.6, 2.6], opacity: [0, 0.65, 0] }}
              transition={{
                duration: 1.1,
                delay: p.t * cycle,
                repeat: Infinity,
                repeatDelay: cycle - 1.1,
                ease: 'easeOut',
              }}
              style={{ transformOrigin }}
            />

            {/* Base node */}
            <circle
              cx={x}
              cy={y}
              r="9"
              className="fill-white stroke-primary-300"
              strokeWidth="1.4"
            />
            <PhaseIcon id={p.id} x={x} y={y} color="#5b34d9" />

            {/* Highlight overlay */}
            <motion.circle
              cx={x}
              cy={y}
              r="9"
              fill="url(#cl-grad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 0.9,
                delay: p.t * cycle,
                repeat: Infinity,
                repeatDelay: cycle - 0.9,
                ease: 'easeOut',
                times: [0, 0.2, 0.8, 1],
              }}
            />
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 0.9,
                delay: p.t * cycle,
                repeat: Infinity,
                repeatDelay: cycle - 0.9,
                ease: 'easeOut',
                times: [0, 0.2, 0.8, 1],
              }}
            >
              <PhaseIcon id={p.id} x={x} y={y} color="white" />
            </motion.g>

            {/* Label — tracked-out caps, refined */}
            <text
              x={lblX}
              y={lblY + 3}
              textAnchor={anchor}
              className="fill-primary-700"
              fontSize="8"
              fontWeight="800"
              fontFamily="ui-sans-serif, system-ui"
              letterSpacing="1"
            >
              {p.label}
            </text>
          </g>
        );
      })}

      {/* Top-right cycle counter — increments each cycle */}
      <g>
        <rect
          x={188}
          y={20}
          width={32}
          height={14}
          rx="3"
          className="fill-white stroke-primary-200"
          strokeWidth="1"
        />
        {cycleNumbers.map((n, i) => (
          <motion.g
            key={n}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1,
              delay: i,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
              times: [0, 0.18, 0.85, 1],
            }}
          >
            <text
              x={204}
              y={30}
              textAnchor="middle"
              className="fill-primary-700"
              fontSize="7.5"
              fontWeight="900"
              fontFamily="ui-sans-serif, system-ui"
              letterSpacing="0.5"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {n}
            </text>
          </motion.g>
        ))}
      </g>

      {/* Center KPI card — refined hero */}
      <g>
        {/* Card backdrop (filled) */}
        <rect
          x={cx - 40}
          y={cy - 26}
          width="80"
          height="54"
          rx="9"
          className="fill-white"
        />
        {/* Card border */}
        <rect
          x={cx - 40}
          y={cy - 26}
          width="80"
          height="54"
          rx="9"
          fill="none"
          className="stroke-primary-200"
          strokeWidth="1.2"
        />
        {/* Top hairline accent */}
        <rect
          x={cx - 28}
          y={cy - 26}
          width="56"
          height="1"
          className="fill-primary-300"
        />

        {/* Eyebrow */}
        <text
          x={cx}
          y={cy - 13}
          textAnchor="middle"
          className="fill-slate-400"
          fontSize="6.5"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="1.4"
        >
          WIN RATE
        </text>

        {/* Animated counter — climbs with each phase */}
        {rates.map((rate, i) => (
          <motion.g
            key={rate}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: [0, 1, 1, 0], y: [4, 0, 0, -3] }}
            transition={{
              duration: 1,
              delay: i,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeOut',
              times: [0, 0.2, 0.85, 1],
            }}
          >
            <text
              x={cx - 2}
              y={cy + 7}
              textAnchor="end"
              className="fill-primary-800"
              fontSize="22"
              fontWeight="900"
              fontFamily="ui-sans-serif, system-ui"
              style={{
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.04em',
              }}
            >
              {rate}
            </text>
            <text
              x={cx + 1}
              y={cy + 7}
              textAnchor="start"
              className="fill-primary-500"
              fontSize="11"
              fontWeight="800"
              fontFamily="ui-sans-serif, system-ui"
            >
              %
            </text>
          </motion.g>
        ))}

        {/* Delta pill */}
        <rect
          x={cx - 28}
          y={cy + 14}
          width="56"
          height="11"
          rx="3"
          className="fill-primary-50"
        />
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          className="fill-primary-700"
          fontSize="6"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui"
          letterSpacing="0.8"
        >
          ↑ +13pp · 4 CYCLES
        </text>
      </g>
    </svg>
  );
}

function PhaseIcon({
  id,
  x,
  y,
  color,
}: {
  id: string;
  x: number;
  y: number;
  color: string;
}) {
  if (id === 'close') {
    return (
      <path
        d={`M ${x - 4} ${y} L ${x - 1} ${y + 3} L ${x + 5} ${y - 3}`}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  if (id === 'learn') {
    return (
      <g stroke={color} strokeWidth="1.8" strokeLinecap="round">
        <line x1={x - 4} y1={y + 3} x2={x - 4} y2={y + 1} />
        <line x1={x} y1={y + 3} x2={x} y2={y - 1} />
        <line x1={x + 4} y1={y + 3} x2={x + 4} y2={y - 3} />
      </g>
    );
  }
  if (id === 'sharpen') {
    return (
      <g>
        <circle cx={x} cy={y} r="4" fill="none" stroke={color} strokeWidth="1.4" />
        <circle cx={x} cy={y} r="1.6" fill={color} />
      </g>
    );
  }
  if (id === 'launch') {
    return (
      <path
        d={`M ${x - 3} ${y - 4} L ${x + 5} ${y} L ${x - 3} ${y + 4} Z`}
        fill={color}
      />
    );
  }
  return null;
}
