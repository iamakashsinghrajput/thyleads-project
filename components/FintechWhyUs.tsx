"use client"
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  Wrench,
  Handshake,
  PenLine,
} from 'lucide-react';

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

type Role = {
  initials: string;
  role: string;
  focus: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  ai?: boolean;
};

const roles: Role[] = [
  {
    initials: 'GE',
    role: 'GTM Engineer',
    focus: 'Pipeline architecture',
    tags: ['Sequencing', 'Routing'],
    icon: Wrench,
  },
  {
    initials: 'AM',
    role: 'Account Manager',
    focus: 'Deal momentum',
    tags: ['Stakeholder map', 'Follow-ups'],
    icon: Handshake,
  },
  {
    initials: 'CR',
    role: 'Content Researcher',
    focus: 'Buyer-grade messaging',
    tags: ['ICP signals', 'Voice match'],
    icon: PenLine,
  },
  {
    initials: 'AI',
    role: 'AI Engine',
    focus: 'Targeting + intent',
    tags: ['Always-on', '24/7 signals'],
    icon: Cpu,
    ai: true,
  },
];

export default function FintechWhyUs() {
  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center"
      >
        {/* === LEFT — Copy === */}
        <div>
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Why Thyleads
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            The outbound partner that learns your{' '}
            <span className="relative inline-block px-3 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                FinTech category first.
              </span>
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We&apos;ve been on the other side of the table. We combine
            AI-powered targeting with GTM Engineers, Account Managers, and
            Content Researchers, and we invest in learning your product, ICP,
            and goals so our growth is tied to yours.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Why Thyleads
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
            <span className="text-[12px] text-slate-500 font-semibold">
              Trusted by{' '}
              <span className="text-neutral-900 font-bold tabular-nums">70+</span>{' '}
              FinTech teams
            </span>
          </motion.div>
        </div>

        {/* === RIGHT — Team blueprint === */}
        <motion.div variants={itemVariants} className="relative">
          {/* Outer panel — light primary wash */}
          <div className="relative rounded-3xl bg-gradient-to-br from-primary-50 via-white to-primary-50/40 border border-primary-100 p-5 sm:p-6 overflow-hidden shadow-[0_24px_60px_-30px_rgba(132,92,245,0.22)]">
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

            {/* Header */}
            <div className="relative flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
                  Your dedicated team
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                AI + Human
              </span>
            </div>

            {/* Role grid */}
            <div className="relative grid grid-cols-2 gap-3">
              {roles.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.role}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + i * 0.08,
                      ease: easeOut,
                    }}
                    whileHover={{ y: -3 }}
                    className="group relative rounded-2xl bg-white border border-primary-100 px-3.5 py-3.5 hover:border-primary-200 hover:shadow-[0_10px_26px_-12px_rgba(132,92,245,0.28)] transition-all"
                  >
                    {/* Avatar + AI indicator */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="relative">
                        <div
                          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ring-2 ring-white shadow-[0_4px_12px_-4px_rgba(132,92,245,0.40)] ${
                            r.ai
                              ? 'bg-slate-900 text-white'
                              : 'bg-gradient-to-br from-primary-500 to-primary-700 text-white'
                          }`}
                        >
                          {r.initials}
                        </div>
                        {/* Mini icon badge */}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-primary-100 flex items-center justify-center text-primary-700 shadow-sm"
                        >
                          <Icon className="w-2.5 h-2.5" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>

                    {/* Role + focus */}
                    <div className="text-[13px] font-extrabold text-neutral-900 leading-tight">
                      {r.role}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 mb-2">
                      {r.focus}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {r.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-block px-1.5 py-0.5 rounded bg-primary-50 border border-primary-100 text-[9px] font-bold text-primary-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer connector — "→ Tied to your growth" */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7, ease: easeOut }}
              className="relative mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-primary-100"
            >
              <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-bold text-neutral-900">
                Aligned to{' '}
                <span className="text-primary-700">your revenue outcomes</span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
