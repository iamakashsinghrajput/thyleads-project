"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mail,
  MessagesSquare,
  Linkedin,
  Calendar,
  Phone,
  FileSpreadsheet,
  MessageSquare,
  Search,
  Send,
  Filter,
  CalendarCheck,
  TrendingUp,
} from 'lucide-react';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeInOut: [number, number, number, number] = [0.45, 0, 0.55, 1];

function ClaudeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5L13.6 9.4L21 11L13.6 12.6L12 19.5L10.4 12.6L3 11L10.4 9.4L12 2.5Z" />
    </svg>
  );
}

export default function HeroShowcase() {
  return (
    <div className="relative w-full max-w-6xl mx-auto">

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 bottom-0 flex justify-between pointer-events-none px-12"
      >
        <span className="block w-px h-full bg-gradient-to-b from-transparent via-slate-200/70 to-transparent" />
        <span className="block w-px h-full bg-gradient-to-b from-transparent via-slate-200/70 to-transparent" />
      </div>

      <div className="relative grid lg:grid-cols-[1.25fr_1fr_1.15fr] gap-6 items-center">

        <AgentConsole />

        <CenterFlow />

        <ActivityCard />
      </div>
    </div>
  );
}

const AGENTS = [
  { Icon: Search,        name: 'Research',  role: 'Account intel · ICP fit' },
  { Icon: Send,          name: 'Outreach',  role: 'Multi-channel sequence' },
  { Icon: MessageSquare, name: 'Engage',    role: 'In-context reply handling' },
  { Icon: Filter,        name: 'Qualify',   role: 'Intent + fit scoring' },
  { Icon: CalendarCheck, name: 'Handoff',   role: 'Meeting booked · routed' },
] as const;

const FLOW_DURATION = 8;
const STEP_TIMES = [0.06, 0.22, 0.38, 0.54, 0.70];

function AgentConsole() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: 0.5, ease: easeOut }}
      className="relative rounded-2xl bg-white border border-slate-200 shadow-[0_24px_60px_-22px_rgba(15,23,42,0.20)] overflow-hidden hidden lg:flex flex-col h-[460px]"
    >

      <div aria-hidden="true" className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-primary-100/55 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-primary-100/45 blur-3xl pointer-events-none" />

      <div className="relative z-10 px-5 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
            <ClaudeIcon className="w-3 h-3 text-primary-600" />
            Claude Agents
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[9.5px] font-bold uppercase tracking-[0.18em] text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
          </span>
          Live
        </span>
      </div>

      <div className="relative z-10 flex-1 p-3 flex flex-col gap-1.5">
        {AGENTS.map((a, i) => {
          const activeAt = STEP_TIMES[i];
          const before = Math.max(0, activeAt - 0.04);
          const peak = activeAt;
          const exit = Math.min(0.95, activeAt + 0.10);
          const after = Math.min(0.99, activeAt + 0.18);

          return (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.07, ease: easeOut }}
              className="relative flex-1 min-h-0"
            >
              <motion.div
                className="relative h-full rounded-xl border px-3 flex items-center gap-3 overflow-hidden"
                animate={{
                  borderColor: [
                    'rgb(226,232,240)',
                    'rgb(226,232,240)',
                    'rgb(124,58,237)',
                    'rgb(221,214,254)',
                    'rgb(226,232,240)',
                  ],
                  backgroundColor: [
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                    'rgba(245,243,255,0.65)',
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                  ],
                }}
                transition={{
                  duration: FLOW_DURATION,
                  times: [0, before, peak, exit, 1],
                  repeat: Infinity,
                  ease: easeInOut,
                }}
              >

                <span className="shrink-0 text-[9px] font-bold tabular-nums text-slate-300">
                  0{i + 1}
                </span>

                <motion.div
                  className="shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center"
                  animate={{
                    backgroundColor: [
                      'rgb(245,243,255)',
                      'rgb(245,243,255)',
                      'rgb(124,58,237)',
                      'rgb(245,243,255)',
                      'rgb(245,243,255)',
                    ],
                    borderColor: [
                      'rgb(237,233,254)',
                      'rgb(237,233,254)',
                      'rgb(124,58,237)',
                      'rgb(237,233,254)',
                      'rgb(237,233,254)',
                    ],
                    color: [
                      'rgb(109,40,217)',
                      'rgb(109,40,217)',
                      'rgb(255,255,255)',
                      'rgb(109,40,217)',
                      'rgb(109,40,217)',
                    ],
                  }}
                  transition={{
                    duration: FLOW_DURATION,
                    times: [0, before, peak, exit, 1],
                    repeat: Infinity,
                    ease: easeInOut,
                  }}
                >
                  <a.Icon className="w-4 h-4" strokeWidth={2.2} />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-extrabold text-neutral-900 leading-tight truncate">
                    {a.name}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
                    {a.role}
                  </div>
                </div>

                <div className="shrink-0 relative w-[58px] h-[18px]">

                  <motion.span
                    className="absolute inset-0 inline-flex items-center justify-center gap-1 px-1.5 rounded-full bg-slate-50 text-slate-500 text-[9px] font-bold uppercase tracking-[0.12em]"
                    animate={{ opacity: [1, 1, 0, 0, 1] }}
                    transition={{
                      duration: FLOW_DURATION,
                      times: [0, before, peak, exit, 1],
                      repeat: Infinity,
                      ease: easeInOut,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    Idle
                  </motion.span>

                  <motion.span
                    className="absolute inset-0 inline-flex items-center justify-center gap-1 px-1.5 rounded-full bg-primary-100 text-primary-700 text-[9px] font-bold uppercase tracking-[0.12em]"
                    animate={{ opacity: [0, 0, 1, 0, 0] }}
                    transition={{
                      duration: FLOW_DURATION,
                      times: [0, before, peak, exit, 1],
                      repeat: Infinity,
                      ease: easeInOut,
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                    </span>
                    Running
                  </motion.span>

                  <motion.span
                    className="absolute inset-0 inline-flex items-center justify-center gap-1 px-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-[0.12em]"
                    animate={{ opacity: [0, 0, 0, 1, 0] }}
                    transition={{
                      duration: FLOW_DURATION,
                      times: [0, before, peak, exit, 1],
                      repeat: Infinity,
                      ease: easeInOut,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Done
                  </motion.span>
                </div>

                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-300 via-primary-600 to-primary-300 origin-left"
                  animate={{ scaleX: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.5, 0] }}
                  transition={{
                    duration: FLOW_DURATION,
                    times: [0, before, peak, exit, after],
                    repeat: Infinity,
                    ease: easeInOut,
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-bold uppercase tracking-[0.18em]">
        <span className="inline-flex items-center gap-1.5 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          5 / 5 healthy
        </span>
        <span className="inline-flex items-center gap-1.5 text-primary-700">
          <ClaudeIcon className="w-3 h-3" />
          Opus 4.7
        </span>
      </div>
    </motion.div>
  );
}

const inboundChannels = [
  { Icon: Mail, tint: 'rose' as const },
  { Icon: MessagesSquare, tint: 'violet' as const },
  { Icon: Linkedin, tint: 'emerald' as const },
];

const outboundChannels = [
  { Icon: Calendar, tint: 'sky' as const },
  { Icon: Phone, tint: 'violet' as const },
  { Icon: FileSpreadsheet, tint: 'emerald' as const },
];

const tintBg: Record<string, string> = {
  rose: 'bg-rose-50 text-rose-500',
  violet: 'bg-primary-50 text-primary-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  sky: 'bg-sky-50 text-sky-600',
};

function CenterFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
      className="relative h-[300px] hidden lg:flex items-center justify-center"
    >
      <svg
        viewBox="0 0 360 240"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="hs-flow-l" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="hs-flow-r" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {[60, 120, 180].map((y, i) => (
          <motion.path
            key={`l-${i}`}
            d={`M 50 ${y} C 110 ${y}, 130 120, 180 120`}
            stroke="url(#hs-flow-l)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 + i * 0.1, ease: easeOut }}
          />
        ))}

        {[60, 120, 180].map((y, i) => (
          <motion.path
            key={`r-${i}`}
            d={`M 180 120 C 230 120, 250 ${y}, 310 ${y}`}
            stroke="url(#hs-flow-r)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 + i * 0.1, ease: easeOut }}
          />
        ))}

        {[60, 120, 180].map((y, i) => (
          <motion.circle
            key={`pl-${i}`}
            r="2.4"
            fill="#7c3aed"
            initial={{ cx: 50, cy: y, opacity: 0 }}
            animate={{
              cx: [50, 110, 130, 180],
              cy: [y, y, 120, 120],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.6,
              delay: 1.6 + i * 0.5,
              repeat: Infinity,
              repeatDelay: 1.5 + i * 0.3,
              ease: easeInOut,
              times: [0, 0.3, 0.7, 1],
            }}
          />
        ))}

        {[60, 120, 180].map((y, i) => (
          <motion.circle
            key={`pr-${i}`}
            r="2.4"
            fill="#7c3aed"
            initial={{ cx: 180, cy: 120, opacity: 0 }}
            animate={{
              cx: [180, 230, 250, 310],
              cy: [120, 120, y, y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.6,
              delay: 2.4 + i * 0.5,
              repeat: Infinity,
              repeatDelay: 1.5 + i * 0.3,
              ease: easeInOut,
              times: [0, 0.3, 0.7, 1],
            }}
          />
        ))}
      </svg>

      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center justify-around">
        {inboundChannels.map(({ Icon, tint }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: easeOut }}
            className={`w-10 h-10 rounded-xl ${tintBg[tint]} border border-white shadow-[0_8px_22px_-10px_rgba(15,23,42,0.18)] flex items-center justify-center`}
          >
            <Icon className="w-4 h-4" strokeWidth={2.2} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.85, ease: easeOut }}
        className="relative z-10"
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-2 rounded-2xl bg-primary-300/40 blur-xl pointer-events-none"
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative px-5 py-2.5 rounded-full bg-neutral-900 text-white shadow-[0_14px_30px_-10px_rgba(15,23,42,0.45)]">
          <span className="text-[13px] font-bold tracking-tight">Thyleads</span>
        </div>
      </motion.div>

      <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col items-center justify-around">
        {outboundChannels.map(({ Icon, tint }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: easeOut }}
            className={`w-10 h-10 rounded-xl ${tintBg[tint]} border border-white shadow-[0_8px_22px_-10px_rgba(15,23,42,0.18)] flex items-center justify-center`}
          >
            <Icon className="w-4 h-4" strokeWidth={2.2} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

type ActivityTone = 'emerald' | 'primary' | 'sky' | 'amber';

const ACTIVITY: { company: string; logo: string; action: string; time: string; tone: ActivityTone }[] = [
  { company: 'Tazapay',   logo: '/images/Tazapay.svg',    action: 'Meeting booked',          time: '2m',  tone: 'emerald' },
  { company: 'CleverTap', logo: '/images/CleverTap.svg',  action: 'Reply received',          time: '12m', tone: 'primary' },
  { company: 'VWO',       logo: '/images/VWO.svg',        action: 'Discovery call done',     time: '34m', tone: 'sky' },
  { company: 'Airmeet',   logo: '/images/Airmeet.svg',    action: 'Demo scheduled',          time: '1h',  tone: 'amber' },
];

const TONE_TEXT: Record<ActivityTone, string> = {
  emerald: 'text-emerald-700',
  primary: 'text-primary-700',
  sky:     'text-sky-700',
  amber:   'text-amber-700',
};

const SPARK_BARS = [0.35, 0.5, 0.45, 0.62, 0.55, 0.72, 0.65, 0.82, 0.78, 0.92, 0.88, 1.0];

function ActivityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: 0.7, ease: easeOut }}
      className="relative rounded-2xl bg-white border border-slate-200 shadow-[0_24px_60px_-22px_rgba(15,23,42,0.20)] overflow-hidden hidden lg:flex flex-col h-[460px]"
    >

      <div aria-hidden="true" className="absolute -top-20 -left-10 w-60 h-60 rounded-full bg-primary-100/50 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-20 -right-12 w-60 h-60 rounded-full bg-primary-100/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 px-5 pt-5 pb-3 border-b border-slate-100 flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-1">
            Today
          </div>
          <h4 className="text-sm font-extrabold tracking-tight text-neutral-900 leading-tight">
            Pipeline activity
          </h4>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[9.5px] font-bold uppercase tracking-[0.18em] text-emerald-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
          </span>
          Live
        </span>
      </div>

      <div className="relative z-10 px-5 py-4 border-b border-slate-100">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[26px] font-black tracking-tight text-neutral-900 tabular-nums leading-none">
                127
              </span>
              <span className="text-[12px] font-bold text-slate-400 tabular-nums leading-none">
                / 850
              </span>
            </div>
            <div className="text-[10.5px] text-slate-500 leading-tight mt-1.5">
              qualified leads · this week
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
            <TrendingUp className="w-3 h-3" strokeWidth={2.5} /> +18%
          </span>
        </div>

        <div className="mt-3 flex items-end gap-1 h-7">
          {SPARK_BARS.map((h, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-sm ${i >= SPARK_BARS.length - 3 ? 'bg-primary-500' : 'bg-primary-200'}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: h }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.04, ease: easeOut }}
              style={{ transformOrigin: 'bottom' }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex-1 px-3 pt-3 overflow-hidden">
        <div className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-400 px-2 mb-2">
          Recent
        </div>
        <div className="space-y-1">
          {ACTIVITY.map((a, i) => (
            <motion.div
              key={a.company}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 1.2 + i * 0.08, ease: easeOut }}
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >

              <span className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center">
                <Image
                  src={a.logo}
                  alt={a.company}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </span>

              <div className="min-w-0 flex-1">
                <div className="text-[11.5px] font-bold text-neutral-900 leading-tight truncate">
                  {a.company}
                </div>
                <div className={`text-[10px] font-semibold leading-tight mt-0.5 truncate ${TONE_TEXT[a.tone]}`}>
                  {a.action}
                </div>
              </div>

              <div className="shrink-0 text-[10px] font-bold text-slate-400 tabular-nums">
                {a.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-5 py-3 border-t border-slate-100 flex items-center justify-center text-[9.5px] font-bold uppercase tracking-[0.18em]">
        <span className="text-slate-500">
          <span className="text-neutral-900 font-extrabold">34</span> meetings today
        </span>
      </div>
    </motion.div>
  );
}
