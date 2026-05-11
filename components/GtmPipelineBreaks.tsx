"use client"
import { motion, type Variants } from 'framer-motion';
import {
  Crosshair,
  AlarmClock,
  UserX,
  TrendingDown,
  RefreshCw,
  ArrowRight,
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

type Gap = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
};

const gaps: Gap[] = [
  {
    icon: Crosshair,
    title: 'Weak targeting',
    desc:
      'No defined ICP means SDRs chase every lead and AEs get accounts that won’t close.',
  },
  {
    icon: AlarmClock,
    title: 'Poorly-timed outreach',
    desc:
      'Reaching buyers before they’re ready wastes the message and burns the domain.',
  },
  {
    icon: UserX,
    title: 'Unqualified meetings',
    desc:
      'Every bad demo costs 45 minutes of your best closer’s time for zero return.',
  },
  {
    icon: TrendingDown,
    title: 'Stalled deals',
    desc:
      'Interest dies in the messy middle when follow-ups stop and stakeholders drop off.',
  },
  {
    icon: RefreshCw,
    title: 'No learning loop',
    desc:
      'Wins and losses don’t feed back into targeting. The next campaign starts from scratch.',
  },
];

export default function GtmPipelineBreaks() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      {/* Ambient glow */}
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
        <div className="text-center max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Where pipeline breaks
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            Pipeline doesn’t break in one place.{' '}
            <span className="relative inline-block px-3 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                It breaks in five.
              </span>
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Each gap compounds the one before it. Fix one and the next one
            leaks. The only way to stop pipeline loss is to close all five at
            once.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {gaps.map((gap, i) => {
            const Icon = gap.icon;
            return (
              <motion.div
                key={gap.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.08,
                  ease: easeOut,
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-primary-200 px-5 py-6 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_-16px_rgba(132,92,245,0.28)] transition-all overflow-hidden"
              >
                {/* Top hairline */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                />

                {/* Icon tile */}
                <div className="relative mb-4">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -m-1 bg-primary-200/40 blur-md rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative w-11 h-11 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-100 group-hover:border-primary-200 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>

                {/* Title */}
                <div className="text-[15px] font-extrabold text-neutral-900 leading-tight">
                  {gap.title}
                </div>

                {/* Underline accent */}
                <span
                  aria-hidden="true"
                  className="block mt-2.5 h-[2px] w-7 bg-primary-600 rounded-full origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
                />

                {/* Description */}
                <p className="mt-3 text-[13px] text-slate-600 leading-relaxed">
                  {gap.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Footer line */}
        <motion.div
          variants={itemVariants}
          className="mt-12 lg:mt-14 flex justify-center"
        >
          <a
            href="#framework"
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-primary-700 hover:text-primary-800 transition-colors"
          >
            <span className="relative">
              We close all five gaps in one connected system.
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary-300 origin-left scale-x-100 group-hover:bg-primary-600 transition-colors"
              />
            </span>
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
