"use client"
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

export default function FintechCTA() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-white via-primary-50/60 to-primary-50 font-sans">

      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-160 h-160 rounded-full bg-primary-200/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-1/4 w-160 h-160 rounded-full bg-primary-100/60 blur-3xl pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(132,92,245,0.12) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          mask: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
          WebkitMask:
            'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold tracking-[-0.02em] leading-[1.1] text-neutral-900"
        >
          Your next 15 qualified Indian enterprise meetings are{' '}
          <span className="relative inline-block px-3 py-1 mt-2">
            <motion.span
              aria-hidden="true"
              variants={highlightVariants}
              className="absolute inset-0 bg-primary-200/80 rounded-md origin-left"
            />
            <span className="relative text-primary-700">
              closer than you think.
            </span>
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed"
        >
          Join 70+ SaaS companies using Thyleads to scale their revenue with
          AI-powered outbound.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_14px_34px_-10px_rgba(132,92,245,0.55)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Book a Meeting
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={2.5}
            />
          </Link>

          <span className="text-[12px] text-slate-500 font-semibold">
            Trusted by{' '}
            <span className="text-neutral-900 font-bold tabular-nums">70+</span>{' '}
            SaaS teams
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
