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

export default function AgentsCTA() {
  return (
    <section className="relative py-20 lg:py-28 px-6 sm:px-12 overflow-hidden bg-primary-700 font-sans">
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/4 w-160 h-160 rounded-full bg-primary-500/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-1/4 w-160 h-160 rounded-full bg-primary-800/50 blur-3xl pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          mask: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
          WebkitMask:
            'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] h-56 bg-white/10 blur-3xl pointer-events-none"
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
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-[-0.02em] leading-[1.08] text-white"
        >
          Stop sending outbound that{' '}
          <span className="text-primary-100">sounds like outbound.</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-primary-100 leading-relaxed"
        >
          See what a 15-agent system built on Claude can book in your calendar
          inside the first 30 days.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-primary-50 text-primary-700 text-base font-bold shadow-[0_18px_40px_-14px_rgba(0,0,0,0.35)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-700"
          >
            Book a Meeting
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={2.5}
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
