"use client"
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

const roles = [
  { letter: 'S', name: 'Strategist' },
  { letter: 'R', name: 'Researcher' },
  { letter: 'A', name: 'Account Manager' },
];

export default function AgentsHumanLayer() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white font-sans">
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="mb-5">
          <span className="inline-block px-3 py-1 rounded-full bg-white border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
            The Human Layer
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
        >
          Behind every agent,{' '}
          <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
            there&apos;s a human.
          </span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {roles.map((role, i) => (
            <div key={role.name} className="flex items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-primary-200 shadow-[0_6px_18px_-8px_rgba(132,92,245,0.30)]">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-extrabold flex items-center justify-center">
                  {role.letter}
                </span>
                <span className="text-[13px] font-bold text-neutral-900">
                  {role.name}
                </span>
              </div>
              {i < roles.length - 1 && (
                <span
                  aria-hidden="true"
                  className="text-primary-300 text-base font-bold"
                >
                  +
                </span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed"
        >
          Every agent is supervised by our GTM pod: strategists, researchers,
          and account managers who shape the playbook, approve every message,
          and step in where AI can&apos;t judge context. The result is outbound
          that scales like a system and sounds like your best AE.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-9">
          <a
            href="/howitworks"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_14px_34px_-10px_rgba(132,92,245,0.55)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            See how we work
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={2.5}
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
