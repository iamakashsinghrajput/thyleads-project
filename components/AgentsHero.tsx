"use client"
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

export default function AgentsHero() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 lg:pb-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
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
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">

          <div>
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                </span>
                Our AI System
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-[-0.025em] leading-[1.4] text-neutral-900"
            >
              Your pipeline runs on{' '}
              <span className="text-primary-700 bg-primary-100 box-decoration-clone px-2 py-0.5 rounded-md">
                15 agents built on Claude.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              We didn&apos;t wire together a stack of SaaS tools and call it AI.
              We built a multi-agent system on Anthropic&apos;s Claude that
              researches accounts, writes content, monitors deliverability, and
              learns — improving every campaign with everything it&apos;s seen
              before.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Book a Call
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  strokeWidth={2.5}
                />
              </a>
              <a
                href="#system"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 text-primary-800 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                See the System
              </a>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <LiveProcessFlow />
          </motion.div>
        </div>

        <StatsBar />
      </motion.div>
    </section>
  );
}

const STAGES: {
  id: string;
  title: string;
  meta?: string;
  variant: 'hero' | 'grid' | 'pill' | 'memory';
  items?: { name: string; count: string }[];
  memory?: string[];
}[] = [
  {
    id: 'orchestrator',
    title: 'Claude Opus 4',
    meta: 'Orchestrator',
    variant: 'hero',
  },
  {
    id: 'clusters',
    title: 'Six specialist clusters',
    variant: 'grid',
    items: [
      { name: 'Discovery', count: '1' },
      { name: 'Targeting', count: '4' },
      { name: 'Content', count: '3' },
      { name: 'Execution', count: '3' },
      { name: 'Meeting', count: '2' },
      { name: 'Inbound', count: '1' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning · The compounding moat',
    meta: '2 agents · always-on',
    variant: 'pill',
  },
  {
    id: 'memory',
    title: 'Memory',
    variant: 'memory',
    memory: ['Project Memory', 'Cross-Client Repository'],
  },
];

function LiveProcessFlow() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto">

      <div
        aria-hidden="true"
        className="absolute -inset-6 bg-primary-200/30 blur-3xl rounded-[40px] pointer-events-none"
      />

      <div className="relative flex flex-col gap-0">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="relative">
            <StageCard stage={stage} index={i} />
            {i < STAGES.length - 1 && <FlowArrow index={i} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function OrchestratorBroadcast() {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute -inset-3 rounded-3xl bg-primary-300/35 blur-2xl pointer-events-none"
      initial={{ opacity: 0.35 }}
      animate={{ opacity: [0.35, 0.65, 0.35] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function ClusterActiveDot({ index }: { index: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-primary-500"
      animate={{ opacity: [0.35, 0.85, 0.35] }}
      transition={{
        duration: 3.6,
        delay: index * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function StageCard({
  stage,
  index,
}: {
  stage: (typeof STAGES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.18, ease: easeOut }}
    >
      {stage.variant === 'hero' && (
        <div className="relative">

          <OrchestratorBroadcast />
          <div className="relative rounded-2xl overflow-hidden bg-white border border-primary-200 px-5 py-4 shadow-[0_18px_44px_-22px_rgba(132,92,245,0.40)]">

            <span
              aria-hidden="true"
              className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            />
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-primary-700">
                  {stage.meta}
                </div>
                <h3 className="mt-1 text-[17px] font-extrabold text-neutral-900 tracking-tight">
                  {stage.title}
                </h3>
              </div>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
              </span>
            </div>
          </div>
        </div>
      )}

      {stage.variant === 'grid' && (
        <div className="rounded-2xl bg-primary-50/60 border border-primary-100 p-3">
          <div className="grid grid-cols-3 gap-2">
            {stage.items?.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    delay: 0.55 + idx * 0.09,
                    ease: easeOut,
                  },
                }}
                viewport={{ once: true }}
                className="relative rounded-xl bg-white border border-primary-100 px-2.5 py-2 text-center"
              >
                <ClusterActiveDot index={idx} />
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary-700">
                  {item.name}
                </div>
                <div className="mt-0.5 text-[10.5px] text-slate-500 font-medium tabular-nums">
                  {item.count} {item.count === '1' ? 'agent' : 'agents'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {stage.variant === 'pill' && (
        <div className="relative rounded-2xl bg-primary-100/70 border border-primary-200 px-5 py-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
            Learning
          </div>
          <div className="mt-0.5 text-[12px] text-primary-900 font-bold">
            The compounding moat
          </div>
          <div className="mt-1 text-[10px] text-primary-700/80 font-semibold">
            {stage.meta}
          </div>
        </div>
      )}

      {stage.variant === 'memory' && (
        <div className="grid grid-cols-2 gap-2">
          {stage.memory?.map(m => (
            <div
              key={m}
              className="rounded-xl bg-white border border-dashed border-primary-300 px-3 py-2.5 text-center"
            >
              <div className="text-[11px] font-bold text-neutral-900 leading-tight">
                {m}
              </div>
              <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary-700">
                {m === 'Project Memory' ? 'per client' : 'all clients'}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function FlowArrow({ index }: { index: number }) {
  return (
    <div className="relative my-3 h-10 flex items-center justify-center">
      <svg
        viewBox="0 0 24 40"
        className="h-10 w-6"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`flow-line-${index}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#5b34d9" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <line
          x1="12"
          y1="3"
          x2="12"
          y2="32"
          stroke="#c4b5fd"
          strokeWidth="1.4"
          strokeDasharray="2 4"
        />

        <motion.line
          x1="12"
          y1="3"
          x2="12"
          y2="32"
          stroke={`url(#flow-line-${index})`}
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.18, ease: easeOut }}
        />

        <motion.circle
          cx="12"
          r="2.8"
          fill="#5b34d9"
          initial={{ cy: 3, opacity: 0 }}
          animate={{
            cy: [3, 32],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.8,
            delay: 1 + index * 0.2,
            repeat: Infinity,
            repeatDelay: 1.4 + index * 0.3,
            ease: [0.45, 0, 0.55, 1],
            times: [0, 0.1, 0.85, 1],
          }}
        />

        <path
          d="M 6 30 L 12 36 L 18 30"
          stroke="#5b34d9"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

const stats = [
  { value: '15', label: 'Specialized AI agents' },
  { value: '16', label: 'MCP tool integrations' },
  { value: '2.4×', label: 'Better campaigns from learning loops' },
  { value: 'Day 1', label: 'New clients benefit from prior learning' },
];

function StatsBar() {
  return (
    <motion.div
      variants={itemVariants}
      className="relative mt-12 lg:mt-16 rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/60 border border-primary-100 shadow-[0_24px_60px_-30px_rgba(132,92,245,0.30)]"
    >

      <span
        aria-hidden="true"
        className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(132,92,245,0.14) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          mask: 'radial-gradient(ellipse 80% 90% at center, black 30%, transparent 85%)',
          WebkitMask:
            'radial-gradient(ellipse 80% 90% at center, black 30%, transparent 85%)',
        }}
      />

      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 px-6 sm:px-10 py-9">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.15 + i * 0.08,
              ease: easeOut,
            }}
            className="relative text-center"
          >
            {i < stats.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 h-12 w-px bg-primary-200/70"
              />
            )}
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] tabular-nums bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-800">
              {s.value}
            </div>
            <div className="mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
