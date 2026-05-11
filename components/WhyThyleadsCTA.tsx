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

const highlightVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.5, ease: easeOut },
  },
};

export default function WhyThyleadsCTA() {
  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 max-w-6xl mx-auto"
      >

        <motion.div
          variants={itemVariants}
          className="relative rounded-4xl bg-gradient-to-br from-primary-50 via-white to-primary-50 ring-1 ring-primary-200/60 overflow-hidden shadow-[0_30px_80px_-30px_rgba(132,92,245,0.22)]"
        >

          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-xl h-144 rounded-full bg-primary-200/40 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-32 w-xl h-144 rounded-full bg-primary-100/55 blur-3xl pointer-events-none"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.30] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(132,92,245,0.20) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              mask: 'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%)',
              WebkitMask:
                'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%)',
            }}
          />

          <div className="relative px-6 sm:px-10 lg:px-16 py-16 lg:py-24 text-center">

            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700 shadow-sm">
                Ready to scale
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900 max-w-3xl mx-auto"
            >
              Your next pipeline is{' '}
              <span className="relative inline-block px-4 py-1 mt-2">
                <motion.span
                  aria-hidden="true"
                  variants={highlightVariants}
                  className="absolute inset-0 bg-primary-100 rounded-md origin-left"
                />
                <span className="relative text-primary-700">one meeting</span>
              </span>{' '}
              away.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-slate-700 leading-relaxed"
            >
              Join the SaaS teams already building predictable revenue with
              Thyleads. We&apos;ll tailor a plan to your stage — no scripts,
              no commitments.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
            >
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.55)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Book a meeting
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  strokeWidth={2.5}
                />
              </a>
              <a
                href="#case-studies"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 text-primary-800 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                See case studies
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
