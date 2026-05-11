"use client"
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Briefcase,
  TrendingUp,
  Check,
} from 'lucide-react';

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

export default function MartechHero() {
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
        className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center"
      >

        <div>
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
              </span>
              For MarTech SaaS in India
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.025em] leading-[1.4] text-neutral-900"
          >
            You built MarTech.{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              We&apos;ll get past the noise to the right CMOs.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We run specialized outbound for MarTech using vertical-trained pods,
            signal-driven targeting, and messaging that earns replies from CMOs
            and growth founders.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Talk to us
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
            <a
              href="/howitworks"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 text-primary-800 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative">
          <CmoLeadCard />
        </motion.div>
      </motion.div>
    </section>
  );
}

const signals = [
  {
    icon: TrendingUp,
    label: 'Funding raised · Series C',
    timestamp: '14d ago',
  },
  {
    icon: Briefcase,
    label: 'Hiring marketing ops lead',
    timestamp: '7d ago',
  },
  {
    icon: Zap,
    label: 'Visited pricing page',
    timestamp: '2h ago',
  },
];

function CmoLeadCard() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto">

      <div
        aria-hidden="true"
        className="absolute -inset-8 bg-primary-300/25 blur-3xl rounded-[48px] pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-8 -bottom-3 h-3/4 rounded-3xl bg-white border border-slate-200 shadow-[0_10px_24px_-12px_rgba(15,23,42,0.10)] pointer-events-none scale-[0.92] -translate-y-3"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-4 -bottom-1.5 h-3/4 rounded-3xl bg-white border border-slate-200 shadow-[0_14px_28px_-12px_rgba(15,23,42,0.12)] pointer-events-none scale-[0.96] -translate-y-1.5"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
        className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-[0_30px_70px_-30px_rgba(132,92,245,0.40)]"
      >

        <div className="relative h-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.32) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
              mask: 'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
              WebkitMask:
                'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
            }}
          />

          <div
            aria-hidden="true"
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-32 bg-white/20 blur-3xl pointer-events-none"
          />

          <div className="absolute top-4 left-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-[9.5px] font-bold uppercase tracking-[0.22em] text-white">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Reply received
          </div>

          <span className="absolute top-4 right-5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-100">
            2h ago
          </span>
        </div>

        <div className="relative px-6 -mt-10">
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute -inset-1.5 bg-primary-300/40 blur-md rounded-2xl pointer-events-none"
            />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 ring-4 ring-white text-white flex items-center justify-center text-xl font-extrabold tracking-[0.04em] shadow-[0_14px_30px_-10px_rgba(132,92,245,0.55)]">
              RV
            </div>

            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white ring-2 ring-white flex items-center justify-center shadow-md">
              <span className="w-full h-full rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pt-3">
          <h3 className="text-[20px] font-extrabold tracking-tight text-neutral-900 leading-tight">
            Rahul Verma
          </h3>
          <p className="mt-0.5 text-[13px] text-slate-500">
            Chief Marketing Officer ·{' '}
            <span className="font-semibold text-neutral-900">NorthStar HQ</span>
          </p>
        </div>

        <div className="mx-6 my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="px-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Buying signals
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
              Hot
            </span>
          </div>
          <ul className="space-y-2">
            {signals.map((signal, i) => {
              const Icon = signal.icon;
              return (
                <motion.li
                  key={signal.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.8 + i * 0.08,
                    ease: easeOut,
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700">
                    <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="flex-1 text-[12.5px] text-slate-700">
                    {signal.label}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 tabular-nums">
                    {signal.timestamp}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mx-6 mt-5 mb-6 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 px-4 py-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Intent score
            </span>
            <span className="text-[18px] font-extrabold tracking-tight text-primary-700 tabular-nums leading-none">
              92<span className="text-[11px] text-primary-400">/100</span>
            </span>
          </div>

          <div className="relative h-1.5 rounded-full bg-primary-100 overflow-hidden">
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-700"
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1.2, delay: 1.2, ease: easeOut }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] font-semibold">
            <span className="text-slate-500">
              328 accounts scanned ·{' '}
              <span className="text-neutral-900">3 qualified</span>
            </span>
            <span className="text-primary-700">In-market</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
