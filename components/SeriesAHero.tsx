"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  Reply,
  Video,
  TrendingUp,
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

export default function SeriesAHero() {
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
        className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center"
      >

        <div>
          <motion.div variants={itemVariants} className="mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Seed — Series A
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.025em] leading-[1.1] text-neutral-900">
            You Don&apos;t Need an SDR Team{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              to Grow
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
            We plug in as your extended revenue team, find the right buyers, and
            turn cold outreach into real conversations.
          </p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Start your Growth
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
            <a
              href="/howitworks"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 text-primary-800 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              See how it works
            </a>
          </motion.div>

          <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Built for seed stage SaaS pipeline and early traction
          </p>
        </div>

        <motion.div variants={itemVariants} className="relative">
          <PipelineTimeline />
        </motion.div>
      </motion.div>
    </section>
  );
}

type Status = 'booked' | 'replied' | 'demo';

type Activity = {
  logo: string;
  name: string;
  role: string;
  company: string;
  status: Status;
  time: string;
};

const POOL: Activity[] = [
  { logo: '/images/CleverTap.svg', name: 'Rahul Verma', role: 'CMO', company: 'CleverTap', status: 'booked', time: 'just now' },
  { logo: '/images/onecap.png', name: 'Aman Mehra', role: 'VP Sales', company: 'OneCap', status: 'replied', time: '2m ago' },
  { logo: '/images/zigital.png', name: 'Priya Sharma', role: 'Founder', company: 'Zigital', status: 'demo', time: '8m ago' },
  { logo: '/images/VWO.svg', name: 'Karan Patel', role: 'CRO', company: 'VWO', status: 'booked', time: '14m ago' },
  { logo: '/images/Airmeet.svg', name: 'Neha Singh', role: 'Head of Growth', company: 'Airmeet', status: 'replied', time: '22m ago' },
  { logo: '/images/Tazapay.svg', name: 'Arjun Rao', role: 'VP Marketing', company: 'Tazapay', status: 'booked', time: '35m ago' },
  { logo: '/images/mynd.svg', name: 'Divya Krishnan', role: 'CMO', company: 'Mynd', status: 'demo', time: '47m ago' },
  { logo: '/images/Nurix.svg', name: 'Vikram Goel', role: 'Founder', company: 'Nurix', status: 'booked', time: '1h ago' },
];

const VISIBLE = 4;
const ROTATE_MS = 3500;
const easeSmooth: [number, number, number, number] = [0.32, 0.72, 0, 1];

function statusMeta(s: Status): {
  label: string;
  Icon: typeof CalendarCheck;
  tone: 'primary' | 'slate' | 'fuchsia';
} {
  if (s === 'booked') return { label: 'Meeting booked', Icon: CalendarCheck, tone: 'primary' };
  if (s === 'replied') return { label: 'Reply received', Icon: Reply, tone: 'fuchsia' };
  return { label: 'Demo scheduled', Icon: Video, tone: 'slate' };
}

function PipelineTimeline() {
  const [head, setHead] = useState(0);
  const [count, setCount] = useState(47);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHead(prev => (prev + 1) % POOL.length);
      setCount(prev => prev + 1);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const visible: Activity[] = Array.from({ length: VISIBLE }, (_, i) => POOL[(head + i) % POOL.length]);

  return (
    <div className="relative w-full max-w-[480px] mx-auto">

      <div
        aria-hidden="true"
        className="absolute -inset-6 bg-primary-300/30 blur-3xl rounded-[40px] pointer-events-none"
      />

      <div className="relative flex items-center justify-between mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-100 shadow-[0_6px_18px_-8px_rgba(132,92,245,0.30)]">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
            Live Pipeline
          </span>
        </div>

        <div className="inline-flex items-baseline gap-1">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="text-[28px] font-black tracking-[-0.03em] tabular-nums leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-800"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            this Qtr
          </span>
        </div>
      </div>

      <div className="relative pl-7 sm:pl-8">

        <span
          aria-hidden="true"
          className="absolute left-2 top-3 bottom-3 w-px bg-gradient-to-b from-primary-300 via-primary-200 to-transparent"
        />

        <ul className="flex flex-col gap-4">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((a, i) => (
              <TimelineRow
                key={a.name}
                activity={a}
                index={i}
              />
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Booked this quarter
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-700 text-white text-[10px] font-bold uppercase tracking-[0.18em] shadow-[0_6px_18px_-6px_rgba(132,92,245,0.55)]">
          <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
          3X month-over-month
        </span>
      </div>
    </div>
  );
}

function TimelineRow({
  activity,
  index,
}: {
  activity: Activity;
  index: number;
}) {
  const { label, Icon, tone } = statusMeta(activity.status);
  const isTop = index === 0;

  const toneClasses =
    tone === 'primary'
      ? 'text-primary-700'
      : tone === 'fuchsia'
        ? 'text-fuchsia-600'
        : 'text-slate-600';

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{
        opacity: { duration: 0.55, ease: easeSmooth },
        x: { duration: 0.55, ease: easeSmooth },
        layout: { duration: 0.7, ease: easeSmooth },
      }}
      className="relative"
    >

      <span
        aria-hidden="true"
        className="absolute -left-[28px] sm:-left-[32px] top-1 w-3 h-3 rounded-full ring-4 ring-white bg-gradient-to-br from-primary-500 to-primary-700"
      >
        {isTop && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-primary-500"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 2.2, 2.2], opacity: [0.65, 0, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: '50% 50%' }}
          />
        )}
      </span>

      <div className="flex items-center gap-3.5">

        <div className="relative shrink-0">
          <div className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 ring-2 ring-white shadow-[0_5px_14px_-4px_rgba(132,92,245,0.20)] flex items-center justify-center overflow-hidden p-1.5">
            <Image
              src={activity.logo}
              alt={activity.company}
              width={36}
              height={36}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-[14px] font-bold truncate ${
                isTop ? 'text-neutral-900' : 'text-slate-800'
              }`}
            >
              {activity.name}
            </span>
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 tabular-nums">
              {activity.time}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 min-w-0">
            <Icon className={`shrink-0 w-3 h-3 ${toneClasses}`} strokeWidth={2.5} />
            <span className={`text-[11.5px] font-semibold ${toneClasses} truncate`}>
              {label}
            </span>
            <span className="text-[10px] text-slate-300 shrink-0">·</span>
            <span className="text-[11px] text-slate-500 truncate">
              {activity.company}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

