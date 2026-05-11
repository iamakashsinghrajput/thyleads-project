"use client"
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Check, Minus } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
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
    transition: { duration: 0.8, delay: 0.5, ease: easeOut },
  },
};

type Row = {
  category: string;
  before: string;
  after: string;
};

const rows: Row[] = [
  {
    category: 'Pipeline',
    before: 'Inbound leads lost in messy handovers',
    after: 'Real-time visibility · disciplined CRM ownership',
  },
  {
    category: 'Lead quality',
    before: 'AEs wasting cycles on low-quality leads',
    after: 'Only high-intent, pre-qualified conversations',
  },
  {
    category: 'Capacity',
    before: 'Hiring more AEs to fix pipeline gaps',
    after: '1 AE handles the workload of 10',
  },
  {
    category: 'Momentum',
    before: 'Deals lose steam after the first call',
    after: 'Intent-based follow-ups · stakeholder mapping',
  },
  {
    category: 'Coverage',
    before: 'Follow-ups entirely dependent on AEs',
    after: 'Every high-intent opportunity captured',
  },
];

export default function WhyThyleadsHero() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 lg:pb-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto"
      >

        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Why Thyleads
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            What Makes{' '}
            <span className="relative inline-block px-4 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                Thyleads the Right
              </span>
            </span>
            <br />
            <span className="relative inline-block px-4 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">Choice</span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We turn your pipeline into a predictable revenue outbound system —
            qualified leads, consistent follow-ups, and real deal momentum.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-[0_8px_24px_-8px_rgba(132,92,245,0.45)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl bg-white ring-1 ring-slate-200 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)] overflow-hidden"
        >

          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-b from-primary-50/40 to-transparent pointer-events-none"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] border-b border-slate-200 bg-slate-50/60">
            <div className="hidden md:block px-6 py-4 border-r border-slate-200" />
            <div className="px-5 py-4 md:border-r border-slate-200">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 mb-1">
                Without Thyleads
              </span>
              <span className="block text-[15px] font-bold text-slate-700">
                In-house SDRs
              </span>
            </div>
            <div className="px-5 py-4">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-600 mb-1">
                With Thyleads
              </span>
              <span className="block text-[15px] font-bold text-neutral-900">
                Outsourced outbound engine
              </span>
            </div>
          </div>

          <ul className="relative">
            {rows.map((row, i) => (
              <motion.li
                key={row.category}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: easeOut }}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] border-b border-slate-100 last:border-b-0"
              >
                <div className="hidden md:flex items-center px-6 py-4 border-r border-slate-100 bg-white/60">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {row.category}
                  </span>
                </div>

                <div className="md:hidden px-5 pt-3 pb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {row.category}
                  </span>
                </div>

                <div className="px-5 pb-3 md:py-4 md:border-r border-slate-100 flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Minus className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="text-[13px] sm:text-sm text-slate-500 leading-snug">
                    {row.before}
                  </span>
                </div>

                <div className="px-5 pb-4 md:py-4 flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  <span className="text-[13px] sm:text-sm text-neutral-900 font-medium leading-snug">
                    {row.after}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mt-10 lg:mt-12 text-center text-sm sm:text-base text-slate-600 max-w-2xl mx-auto"
        >
          We get you{' '}
          <span className="font-semibold text-neutral-900">
            meetings on the calendar
          </span>{' '}
          and{' '}
          <span className="font-semibold text-neutral-900">
            deals in the pipeline
          </span>
          .
        </motion.p>
      </motion.div>
    </section>
  );
}
