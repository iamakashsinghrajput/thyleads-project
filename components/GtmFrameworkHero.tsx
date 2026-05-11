"use client"
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp } from 'lucide-react';

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

const highlightVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.85, delay: 0.4, ease: easeOut },
  },
};

const stats = [
  { value: '70+', label: 'Revenue Partnerships' },
  { value: '2.5X', label: 'Qualified Meetings' },
  { value: '3X', label: 'Higher Response Rates' },
  { value: '40%', label: 'Shorter Sales Cycle' },
];

export default function GtmFrameworkHero() {
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
        className="relative z-10 max-w-6xl mx-auto"
      >

        <div className="text-center max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
              </span>
              GTM Framework
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold tracking-[-0.02em] leading-[1.08] text-neutral-900"
          >
            How Thyleads Runs{' '}
            <span className="relative inline-block px-4 py-1 mt-1">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                Your GTM
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            A 5-step operating system for building a predictable pipeline.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm sm:text-base text-slate-500"
          >
            Built for SaaS teams targeting{' '}
            <span className="font-semibold text-primary-700">
              India-first growth.
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_14px_34px_-10px_rgba(132,92,245,0.55)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Talk to us
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
            <a
              href="#framework"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 text-primary-800 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              See the Framework
              <Zap
                className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform"
                strokeWidth={2.5}
                fill="currentColor"
              />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative mt-14 lg:mt-20"
        >

          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[80px] bg-slate-200"
            />
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
              <TrendingUp
                className="w-3 h-3 text-primary-600"
                strokeWidth={2.5}
              />
              Outcomes our clients see
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[80px] bg-slate-200"
            />
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.08,
                  ease: easeOut,
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-primary-200 px-5 py-6 sm:px-6 sm:py-7 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_-16px_rgba(132,92,245,0.28)] transition-all overflow-hidden"
              >

                <span
                  aria-hidden="true"
                  className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                />

                <div className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-neutral-900 tabular-nums leading-none">
                  {stat.value}
                </div>

                <span
                  aria-hidden="true"
                  className="block mt-3 h-[2px] w-8 bg-primary-600 rounded-full origin-left transition-transform duration-300 group-hover:scale-x-150"
                />

                <div className="mt-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
