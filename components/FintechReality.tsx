"use client"
import { motion, type Variants } from 'framer-motion';
import { Search, MessageSquare, Users } from 'lucide-react';

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

type Wall = {
  number: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
};

const walls: Wall[] = [
  {
    number: '01',
    icon: Search,
    title: 'Compliance Slows Every Deal Down',
    desc: 'FinTech deals move through risk, legal, security, and procurement, each layer adding weeks to the cycle. Without sustained follow-ups, most outbound loses momentum long before reaching the CFO.',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Finding the Right ICP Feels Impossible',
    desc: 'Different segments, regulations, and use cases make FinTech ICPs hard to define clearly. Without precision, outreach goes to the wrong accounts which will likely not convert.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Long Sales Cycles and Multiple Stakeholders',
    desc: 'A single FinTech SaaS deal touches CFO, CIO, Chief Risk Officer, Head of Compliance, Legal, and Procurement, each with different priorities. Buyers are demo-fatigued, decisions drag, and single-threaded outreach dies in the approval chain.',
  },
];

export default function FintechReality() {
  const featured = walls[0];
  const smaller = walls.slice(1);
  const FeaturedIcon = featured.icon;

  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14 max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              The FinTech Reality
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            Three walls every{' '}
            <span className="relative inline-block px-3 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">FinTech SaaS</span>
            </span>{' '}
            company hits in India.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            The buying committee is bigger, the compliance bar is higher, and
            the cycle drags past 12 months. Generic SaaS outbound playbooks
            don&apos;t survive contact with a risk officer.
          </motion.p>
        </div>

        {/* === BENTO GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 lg:auto-rows-[1fr]">
          {/* === FEATURED WALL 01 === */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
            whileHover={{ y: -4 }}
            className="group relative lg:row-span-2 rounded-3xl bg-gradient-to-br from-primary-50 via-white to-primary-50/40 border-2 border-primary-200 p-7 lg:p-9 overflow-hidden shadow-[0_20px_50px_-25px_rgba(132,92,245,0.25)] hover:shadow-[0_30px_70px_-25px_rgba(132,92,245,0.35)] transition-all"
          >
            {/* Subtle dot grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(132,92,245,0.12) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
                mask: 'radial-gradient(ellipse 90% 80% at center, black 30%, transparent 80%)',
                WebkitMask:
                  'radial-gradient(ellipse 90% 80% at center, black 30%, transparent 80%)',
              }}
            />

            {/* Glow blob */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-200/35 blur-3xl pointer-events-none"
            />

            <div className="relative flex flex-col h-full">
              {/* Top row: badge + icon */}
              <div className="flex items-start justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-primary-200 text-[9px] font-bold uppercase tracking-[0.22em] text-primary-700 shadow-sm">
                  Featured wall
                </span>
                <div className="w-12 h-12 rounded-xl bg-white border border-primary-200 flex items-center justify-center text-primary-700 shadow-sm group-hover:bg-primary-50 transition-colors">
                  <FeaturedIcon className="w-5 h-5" strokeWidth={2} />
                </div>
              </div>

              {/* Big editorial numeral */}
              <div className="text-7xl lg:text-[110px] font-extrabold leading-none tracking-tighter tabular-nums bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent mb-5">
                {featured.number}
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-[28px] font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
                {featured.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-slate-700 leading-relaxed mt-auto">
                {featured.desc}
              </p>
            </div>
          </motion.article>

          {/* === Smaller walls 02 & 03 === */}
          {smaller.map((wall, i) => {
            const Icon = wall.icon;
            return (
              <motion.article
                key={wall.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: 0.3 + i * 0.12,
                  ease: easeOut,
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl bg-white border border-slate-200 p-6 lg:p-7 hover:border-primary-200 hover:shadow-[0_20px_50px_-22px_rgba(132,92,245,0.25)] transition-all overflow-hidden"
              >
                {/* Tiny corner watermark numeral */}
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-1 text-[80px] font-extrabold leading-none tracking-tighter tabular-nums text-primary-50 select-none pointer-events-none group-hover:text-primary-100 transition-colors"
                >
                  {wall.number}
                </span>

                <div className="relative flex flex-col h-full">
                  {/* Top: icon + number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-100 transition-colors">
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className="text-2xl font-extrabold leading-none tabular-nums bg-gradient-to-br from-primary-400 to-primary-700 bg-clip-text text-transparent">
                      {wall.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-2">
                    {wall.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                    {wall.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
