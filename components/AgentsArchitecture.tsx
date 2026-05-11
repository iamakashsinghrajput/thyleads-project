"use client"
import { motion, type Variants } from 'framer-motion';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
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

type Cluster = {
  num: string;
  label: string;
  title: string;
  agents: string[];
};

const clusters: Cluster[] = [
  {
    num: '01',
    label: 'Discovery',
    title: 'Finding your best buyers',
    agents: ['Discovery Agent'],
  },
  {
    num: '02',
    label: 'Targeting',
    title: 'Scoring & researching accounts',
    agents: ['Research Agent', 'Account Scoring', 'Signal Detection', 'Stakeholder Mapping'],
  },
  {
    num: '03',
    label: 'Content',
    title: 'Writing and quality control',
    agents: ['Content Agent', 'QA Agent', 'Compliance Agent'],
  },
  {
    num: '04',
    label: 'Execution',
    title: 'Sending and reply handling',
    agents: ['Reply Triage', 'Deliverability Monitor'],
  },
  {
    num: '05',
    label: 'Meeting',
    title: 'Post-meeting intelligence & momentum',
    agents: ['Meeting Intelligence', 'Deal Momentum'],
  },
  {
    num: '06',
    label: 'Inbound',
    title: 'Qualifying inbound leads',
    agents: ['Inbound Triage'],
  },
];

const learningCluster: Cluster = {
  num: '07',
  label: 'Learning · The Compounding Moat',
  title: 'Patterns that improve every campaign',
  agents: ['Targeting Feedback Agent', 'Repository Agent'],
};

export default function AgentsArchitecture() {
  return (
    <section
      id="system"
      className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white font-sans"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block px-3 py-1 rounded-full bg-white border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              How the System is Built
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            One orchestrator.{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              Six clusters. 15 agents.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Claude Opus 4 sits at the top, routing every task to the right
            specialist agent. Each agent has a single job, its own tools, and
            its own memory access. Adding a new capability means adding a new
            agent — not rebuilding something that already works.
          </motion.p>
        </div>

        {/* === Orchestrator with breathing glow === */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto max-w-3xl"
        >
          {/* Continuous breathing halo — smooth, not pulsing */}
          <motion.span
            aria-hidden="true"
            className="absolute -inset-4 rounded-[36px] bg-primary-300/30 blur-3xl pointer-events-none"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/60 border border-primary-200 px-8 py-6 text-center shadow-[0_22px_56px_-22px_rgba(132,92,245,0.30)]">
            {/* Top hairline */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            />
            {/* Dot grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(132,92,245,0.14) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                mask: 'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
                WebkitMask:
                  'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-primary-700">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                </span>
                Orchestrator
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Claude Opus 4
              </h3>
              <p className="mt-2 text-[12.5px] text-slate-600">
                Routes every task to the right agent · judges, synthesizes, and
                delegates
              </p>
            </div>
          </div>
        </motion.div>

        {/* === Power dispatch connector with traveling pulse === */}
        <DispatchConnector />

        {/* === 6 cluster grid (powers up in cascade) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {clusters.map((c, i) => (
            <ClusterCard key={c.num} cluster={c} index={i} />
          ))}
        </div>

        {/* Connector down */}
        <DispatchConnector />

        {/* === Learning cluster === */}
        <motion.div
          variants={itemVariants}
          className="mx-auto max-w-2xl relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-white border border-primary-300 px-6 py-5 shadow-[0_18px_44px_-20px_rgba(132,92,245,0.45)]"
        >
          <span
            aria-hidden="true"
            className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
          />
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
                {learningCluster.num} · {learningCluster.label}
              </div>
              <h3 className="mt-1.5 text-base sm:text-lg font-extrabold text-neutral-900 leading-snug">
                {learningCluster.title}
              </h3>
            </div>
            <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md bg-primary-700 text-white text-[9.5px] font-bold uppercase tracking-[0.14em]">
              {learningCluster.agents.length} agents
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {learningCluster.agents.map(a => (
              <span
                key={a}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary-100 text-primary-700 text-[10px] font-bold border border-primary-200"
              >
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ClusterCard({ cluster, index }: { cluster: Cluster; index: number }) {
  // Each cluster receives power on its own staggered breath cycle — never in sync.
  const breathDuration = 4.2 + (index % 3) * 0.6;
  const breathDelay = index * 0.7;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: 0.4 + index * 0.08,
        ease: easeOut,
      }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl bg-white border border-slate-200 hover:border-primary-200 p-5 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_-20px_rgba(132,92,245,0.32)] transition-shadow overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
      />

      {/* Continuous "receiving power" glow — soft inner wash, breathes smoothly */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-primary-100/40 pointer-events-none"
        animate={{ opacity: [0.15, 0.55, 0.15] }}
        transition={{
          duration: breathDuration,
          delay: breathDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Continuous border glow — softly breathes, syncs with the inner wash */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl ring-1 ring-primary-300 pointer-events-none"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{
          duration: breathDuration,
          delay: breathDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle corner "powered" dot — gentle opacity-only */}
      <motion.span
        aria-hidden="true"
        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-primary-500"
        animate={{ opacity: [0.35, 0.9, 0.35] }}
        transition={{
          duration: 3.4,
          delay: 0.4 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
            {cluster.num} · {cluster.label}
          </div>
          <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[9.5px] font-bold uppercase tracking-[0.14em] mr-3">
            {cluster.agents.length} {cluster.agents.length === 1 ? 'agent' : 'agents'}
          </span>
        </div>
        <h3 className="mt-2 text-[15px] font-extrabold text-neutral-900 leading-snug">
          {cluster.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cluster.agents.map(a => (
            <span
              key={a}
              className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 text-[10px] font-semibold border border-primary-100"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* === Vertical "power dispatch" connector with traveling pulse === */
function DispatchConnector() {
  return (
    <div className="relative flex justify-center py-6" aria-hidden="true">
      <svg
        viewBox="0 0 24 64"
        className="h-16 w-6"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arch-flow-line" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5b34d9" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Resting dashed track */}
        <line
          x1="12"
          y1="4"
          x2="12"
          y2="52"
          stroke="#c4b5fd"
          strokeWidth="1.4"
          strokeDasharray="3 5"
        />

        {/* Bright path-draw on entry */}
        <motion.line
          x1="12"
          y1="4"
          x2="12"
          y2="52"
          stroke="url(#arch-flow-line)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
        />

        {/* Continuous power-stream — 3 staggered dots gliding top → bottom */}
        {[0, 1.4, 2.8].map(offset => (
          <motion.circle
            key={offset}
            cx="12"
            r="2.4"
            fill="#7c3aed"
            initial={{ cy: 4, opacity: 0 }}
            animate={{ cy: [4, 52], opacity: [0, 0.85, 0.85, 0] }}
            transition={{
              duration: 3.6,
              delay: 1 + offset,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              times: [0, 0.15, 0.85, 1],
            }}
          />
        ))}

        {/* Arrowhead */}
        <path
          d="M 6 50 L 12 58 L 18 50"
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
