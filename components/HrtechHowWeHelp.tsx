"use client"
import { motion, type Variants } from 'framer-motion';

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

const moves = [
  {
    tag: 'HR-specialist pods',
    number: '01',
    title: 'Vertical Pods That Speak HR',
    description:
      'Dedicated GTM teams trained on HRTech buyer language: compliance pain, hiring freezes, attrition spikes. Your outbound sounds like a peer, not a pitch.',
  },
  {
    tag: 'Intent-led targeting',
    number: '02',
    title: 'Hiring & Tech Signals as Intent',
    description:
      'We track various growth signals like leadership changes, funding rounds, and tech-stack shifts to find your "why now" moment to trigger outreach.',
  },
  {
    tag: 'Multi-threaded outreach',
    number: '03',
    title: 'Reach the Whole Buying Committee',
    description:
      'CHRO, VP People, CFO, CIO: we run coordinated multi-channel sequences across the full buying group, so deals don’t stall when one stakeholder goes silent.',
  },
];

export default function HrtechHowWeHelp() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white font-sans">
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
        <div className="text-center max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
              </span>
              How Thyleads Helps
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            An HRTech-native outbound engine,{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              built around your buyer.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We&apos;ve run outbound for HRTech companies across performance,
            talent acquisition, and L&amp;D. The messaging earns replies from
            CHROs and VPs of People.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {moves.map((move, i) => (
            <motion.article
              key={move.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.15 + i * 0.08,
                ease: easeOut,
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-gradient-to-br from-primary-50/80 via-primary-50/50 to-white border border-primary-100 hover:border-primary-200 p-7 sm:p-8 shadow-[0_4px_18px_-10px_rgba(132,92,245,0.18)] hover:shadow-[0_24px_52px_-22px_rgba(132,92,245,0.40)] transition-all overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
              />

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary-200 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-6">
                {move.tag}
              </div>

              <div className="text-5xl sm:text-[56px] font-black tracking-[-0.04em] leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-800 tabular-nums">
                {move.number}
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-neutral-900 leading-snug tracking-tight">
                {move.title}
              </h3>

              <span
                aria-hidden="true"
                className="block mt-3 h-[2px] w-8 bg-primary-400 rounded-full origin-left transition-all duration-300 group-hover:scale-x-[1.6] group-hover:bg-primary-600"
              />

              <p className="mt-4 text-[14px] text-slate-700 leading-relaxed">
                {move.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
