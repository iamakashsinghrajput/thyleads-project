"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  User,
  Target,
  Search,
  FileText,
  Send,
  Inbox,
  CheckCircle2,
  RefreshCw,
  Brain,
  Zap,
  Activity,
} from 'lucide-react';

type Role = 'human' | 'ai';

type Step = {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  roles: { type: Role; label: string }[];
  microcopy: string[];
};

const steps: Step[] = [
  {
    id: '01',
    icon: Target,
    title: 'Define ICP',
    desc: 'Targeting from intent signals',
    roles: [
      { type: 'human', label: 'Strategist' },
      { type: 'ai', label: 'Targeting AI' },
    ],
    microcopy: ['Mapping intent signals', 'Refining persona fit', 'Scoring 12 segments'],
  },
  {
    id: '02',
    icon: Search,
    title: 'Find Prospects',
    desc: 'Source and enrich verified contacts',
    roles: [
      { type: 'ai', label: 'Research AI' },
      { type: 'ai', label: 'Enrichment AI' },
    ],
    microcopy: ['Pulling 240 profiles', 'Verifying work emails', 'Enriching tech stack'],
  },
  {
    id: '03',
    icon: FileText,
    title: 'Personalize Copy',
    desc: 'Tailored variants at scale',
    roles: [
      { type: 'ai', label: 'Copy AI' },
      { type: 'human', label: 'Reviewer' },
    ],
    microcopy: ['Drafting variants A / B', 'Aligning brand tone', 'Approving 18 messages'],
  },
  {
    id: '04',
    icon: Send,
    title: 'Multi-Channel Outreach',
    desc: 'Sequenced delivery across channels',
    roles: [{ type: 'ai', label: 'Sequencer AI' }],
    microcopy: ['124 sequences live', 'Email + LinkedIn synced', 'Throttling for safety'],
  },
  {
    id: '05',
    icon: Inbox,
    title: 'Triage Replies',
    desc: 'Classify and route every response',
    roles: [
      { type: 'ai', label: 'Intent AI' },
      { type: 'human', label: 'SDR' },
    ],
    microcopy: ['36 replies classified', '8 hot leads routed', 'Drafting follow-ups'],
  },
  {
    id: '06',
    icon: CheckCircle2,
    title: 'Book Meetings',
    desc: 'Auto-schedule qualified demos',
    roles: [
      { type: 'human', label: 'AE' },
      { type: 'ai', label: 'Scheduler AI' },
    ],
    microcopy: ['3 demos confirmed', 'Calendars synced', 'AE briefed'],
  },
];

const liveEvents = [
  'Acme Corp · demo booked for Tue 11:00',
  'TechFlow · 18 prospects added',
  'Northwind · reply marked hot lead',
  'Globex · 240 profiles enriched',
  'Initech · variant B beat A by 31%',
];

export default function HumanAIFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [microIndex, setMicroIndex] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const [counter, setCounter] = useState(1284);
  const [patterns, setPatterns] = useState(847);

  useEffect(() => {
    const t = setInterval(() => setActiveIndex(i => (i + 1) % steps.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setMicroIndex(i => i + 1), 1800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setEventIndex(i => (i + 1) % liveEvents.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setCounter(c => c + Math.floor(Math.random() * 3) + 1),
      2000
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setPatterns(p => p + Math.floor(Math.random() * 2) + 1),
      4000
    );
    return () => clearInterval(t);
  }, []);

  const activeStep = steps[activeIndex];
  const microcopy = activeStep.microcopy[microIndex % activeStep.microcopy.length];
  const ActiveIcon = activeStep.icon;
  const progressPct = (activeIndex / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col gap-3">
      {/* 1. ORCHESTRATOR STRIP */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 ring-1 ring-slate-700/60 shadow-[0_12px_30px_rgba(15,23,42,0.18)] px-4 py-3 flex items-center justify-between text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur">
            <Bot className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                Orchestrator · Live
              </span>
            </div>
            <div className="text-base font-extrabold">Claude Opus 4</div>
          </div>
        </div>
        <div className="text-right z-10">
          <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Deals influenced
          </div>
          <motion.div
            key={counter}
            initial={{ y: -2, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-extrabold tabular-nums"
          >
            {counter.toLocaleString()}
          </motion.div>
        </div>
      </div>

      {/* 2. PIPELINE STEPPER */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-4 py-3.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Pipeline · Step {activeStep.id} of 06
          </span>
          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-600">
            <Activity className="w-2.5 h-2.5" strokeWidth={2.5} />
            Running
          </span>
        </div>

        <div className="relative">
          {/* base line */}
          <div className="absolute left-3.5 right-3.5 top-3.5 h-[2px] bg-slate-200 rounded-full" aria-hidden="true" />
          {/* progress line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-3.5 top-3.5 h-[2px] bg-emerald-500 rounded-full origin-left"
            initial={false}
            animate={{ width: `calc((100% - 28px) * ${progressPct / 100})` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          <div className="relative flex items-start justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeIndex === i;
              const isPast = i < activeIndex;
              return (
                <div key={step.id} className="flex flex-col items-center gap-1.5 relative z-10" style={{ width: '14%' }}>
                  <motion.div
                    animate={{ scale: isActive ? 1.18 : 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className={`relative w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                      isActive
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : isPast
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                    ) : (
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
                    )}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full ring-2 ring-emerald-400/60 animate-ping"
                      />
                    )}
                  </motion.div>
                  <span
                    className={`text-[9px] font-bold text-center leading-tight transition-colors duration-300 ${
                      isActive ? 'text-emerald-700' : isPast ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. FOCAL "NOW RUNNING" CARD */}
      <div className="rounded-2xl bg-white border-2 border-primary-200 shadow-[0_18px_40px_rgba(132,92,245,0.14)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-primary-50 via-white to-primary-50 border-b border-primary-100">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary-700">
            Now running
          </span>
          <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Live
          </span>
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-md shrink-0">
                  <ActiveIcon className="w-6 h-6" strokeWidth={1.75} />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl ring-2 ring-primary-300/50 animate-ping"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                    {activeStep.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-snug mt-0.5">
                    {activeStep.desc}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-1.5">
                  Who&apos;s doing it
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.roles.map(role => (
                    <span
                      key={role.label}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border ${
                        role.type === 'human'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-primary-50 text-primary-700 border-primary-100'
                      }`}
                    >
                      {role.type === 'human' ? (
                        <User className="w-3 h-3" strokeWidth={2.25} />
                      ) : (
                        <Bot className="w-3 h-3" strokeWidth={2.25} />
                      )}
                      {role.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-1.5">
                  Right now
                </div>
                <div className="rounded-lg bg-slate-900 px-3 py-2 flex items-center gap-2 overflow-hidden h-9">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={2.5} />
                  <div className="overflow-hidden h-4 flex-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${activeIndex}-${microIndex % activeStep.microcopy.length}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="block text-[13px] font-semibold text-emerald-300"
                      >
                        {microcopy}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. LIVE ACTIVITY TICKER */}
      <div className="rounded-2xl bg-white border border-slate-200 px-4 py-2.5 flex items-center gap-3 shadow-sm">
        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-600 shrink-0">
          <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
          Just now
        </span>
        <div className="overflow-hidden h-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={eventIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="block text-xs font-semibold text-slate-700 truncate"
            >
              {liveEvents[eventIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* 5. FOOTER: feedback loop + learning engine */}
      <div className="relative rounded-2xl bg-slate-900 text-white px-4 py-3 flex items-center justify-between overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.18)]">
        <motion.div
          aria-hidden="true"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
        />
        <div className="flex items-center gap-2 z-10">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="text-emerald-400 inline-flex"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </motion.span>
          <span className="text-[11px] font-semibold">
            Improves every campaign automatically
          </span>
        </div>
        <div className="flex items-center gap-1.5 z-10 px-2 py-1 rounded-md bg-white/5 border border-white/10">
          <Brain className="w-3 h-3 text-primary-300" strokeWidth={2} />
          <motion.span
            key={patterns}
            initial={{ y: -2, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[11px] font-bold tabular-nums"
          >
            {patterns}
          </motion.span>
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
            patterns
          </span>
        </div>
      </div>
    </div>
  );
}
