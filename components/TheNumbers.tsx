"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { TrendingUp, Calendar, Target, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

type Stat = {
  value: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const stats: Stat[] = [
  {
    value: 70,
    decimals: 0,
    suffix: '+',
    label: 'Revenue partnerships',
    context: 'B2B SaaS clients across 6 verticals',
    icon: Target,
  },
  {
    value: 2.5,
    decimals: 1,
    suffix: 'X',
    label: 'Qualified meetings',
    context: 'vs in-house SDR baseline',
    icon: Calendar,
  },
  {
    value: 3,
    decimals: 0,
    suffix: 'X',
    label: 'Higher response rates',
    context: 'on first-touch outreach',
    icon: MessageCircle,
  },
  {
    value: 40,
    decimals: 0,
    suffix: '%',
    label: 'Shorter sales cycle',
    context: 'from first reply to closed-won',
    icon: TrendingUp,
  },
];

export default function TheNumbers() {
  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      {/* Soft accents */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 left-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-5"
          >
            <Badge>
              <span
                className="w-1 h-1 rounded-full bg-primary-500 animate-pulse"
                aria-hidden="true"
              />
              By the Numbers
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold tracking-tight leading-[1.15] text-center text-neutral-900"
          >
            Results that speak{' '}
            <span className="bg-primary-100 text-primary-700 px-3 py-1 inline-block rounded-md">
              louder than promises
            </span>
          </motion.h2>
        </div>

        {/* === STATS STRIP === */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl bg-gradient-to-b from-primary-50/40 via-white to-white border border-primary-100 shadow-[0_24px_60px_-30px_rgba(132,92,245,0.20),0_8px_24px_-12px_rgba(132,92,245,0.08)] overflow-hidden"
        >
          {/* Decorative SVG sparkline across the whole strip */}
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 w-full h-32 opacity-[0.10] pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 800 120"
          >
            <defs>
              <linearGradient id="numbers-spark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#845cf5" stopOpacity="0" />
                <stop offset="50%" stopColor="#845cf5" stopOpacity="1" />
                <stop offset="100%" stopColor="#845cf5" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 90 Q 100 70, 200 75 T 400 50 T 600 35 T 800 20"
              fill="none"
              stroke="url(#numbers-spark)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Subtle dotted backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(132,92,245,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              mask: 'radial-gradient(ellipse 90% 80% at center, black 50%, transparent 100%)',
              WebkitMask:
                'radial-gradient(ellipse 90% 80% at center, black 50%, transparent 100%)',
            }}
          />

          <div className="relative grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-primary-100/80">
            {stats.map((stat, i) => (
              <StatCell key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-[12px] sm:text-sm text-slate-500 font-medium"
        >
          Across <span className="font-bold text-neutral-900">70+</span>{' '}
          B2B SaaS partnerships in HRTech, FinTech, MarTech &amp; AI Agents.
        </motion.p>
      </motion.div>
    </section>
  );
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: easeOut }}
      whileHover={{ y: -2 }}
      className="group relative px-6 py-8 lg:px-8 lg:py-10 flex flex-col items-center text-center transition-colors hover:bg-primary-50/30"
    >
      {/* Icon */}
      <div className="mb-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-primary-100 text-primary-600 shadow-sm group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors">
        <Icon className="w-4 h-4" strokeWidth={2} />
      </div>

      {/* Big number — gradient + count-up */}
      <div className="relative">
        <span className="block text-[44px] sm:text-[52px] lg:text-[64px] font-extrabold tracking-tight leading-none tabular-nums bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent">
          <AnimatedNumber
            value={stat.value}
            decimals={stat.decimals}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
        </span>
        {/* Soft glow under the number */}
        <span
          aria-hidden="true"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-primary-300/40 blur-md rounded-full"
        />
      </div>

      {/* Label */}
      <span className="mt-4 block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
        {stat.label}
      </span>

      {/* Context micro-line */}
      <span className="mt-1.5 block text-[11px] text-slate-500 font-medium leading-snug max-w-[180px]">
        {stat.context}
      </span>
    </motion.div>
  );
}

function AnimatedNumber({
  value,
  decimals,
  prefix = '',
  suffix = '',
}: {
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();

  const motionValue = useMotionValue(reducedMotion ? value : 0);
  const rounded = useTransform(motionValue, latest =>
    latest.toFixed(decimals)
  );
  const [display, setDisplay] = useState(
    (reducedMotion ? value : 0).toFixed(decimals)
  );

  useEffect(() => {
    const unsub = rounded.on('change', v => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, value, motionValue, reducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
