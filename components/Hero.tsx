"use client"
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Users,
  CreditCard,
  MessageCircle,
  Bot,
  Mail,
  Sparkles,
  MessageSquare,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Search,
  Send,
  BarChart3,
  Filter,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import HeroShowcase from './HeroShowcase';

const verticals = [
  { name: 'HRTech', Icon: Users },
  { name: 'FinTech', Icon: CreditCard },
  { name: 'MarTech', Icon: MessageCircle },
  { name: 'AI Agents', Icon: Bot },
];

/* === Floating ambient icons scattered across the hero background === */
type FloatingIcon = {
  Icon: LucideIcon;
  top: string;
  left?: string;
  right?: string;
  size: string;
  tint: string;
  rot: number;
  delay: number;
  drift: number;
};

const FLOATING_ICONS: FloatingIcon[] = [
  { Icon: Mail,          top: '12%', left:  '4%',  size: 'w-7 h-7', tint: 'text-rose-300',     rot: -10, delay: 0.2, drift: 10 },
  { Icon: Sparkles,      top: '9%',  right: '6%',  size: 'w-9 h-9', tint: 'text-primary-300',  rot:  12, delay: 0.6, drift: 12 },
  { Icon: MessageSquare, top: '26%', left:  '2%',  size: 'w-8 h-8', tint: 'text-emerald-300',  rot:   8, delay: 1.0, drift: 14 },
  { Icon: Target,        top: '24%', right: '3%',  size: 'w-9 h-9', tint: 'text-amber-300',    rot: -14, delay: 0.4, drift: 9  },
  { Icon: Send,          top: '46%', left:  '5%',  size: 'w-6 h-6', tint: 'text-sky-300',      rot:  18, delay: 1.4, drift: 11 },
  { Icon: BarChart3,     top: '44%', right: '4%',  size: 'w-7 h-7', tint: 'text-violet-300',   rot:  -6, delay: 0.8, drift: 13 },
  { Icon: Zap,           top: '66%', left:  '3%',  size: 'w-8 h-8', tint: 'text-orange-300',   rot: -16, delay: 1.6, drift: 10 },
  { Icon: TrendingUp,    top: '63%', right: '6%',  size: 'w-7 h-7', tint: 'text-primary-400',  rot:   6, delay: 1.1, drift: 12 },
  { Icon: Calendar,      top: '84%', left:  '8%',  size: 'w-6 h-6', tint: 'text-fuchsia-300',  rot:  10, delay: 1.9, drift: 9  },
  { Icon: Search,        top: '88%', right: '10%', size: 'w-7 h-7', tint: 'text-sky-300',      rot: -10, delay: 1.3, drift: 11 },
  { Icon: Filter,        top: '78%', left:  '46%', size: 'w-6 h-6', tint: 'text-slate-300',    rot:  20, delay: 2.1, drift: 8  },
  { Icon: Bot,           top: '14%', left:  '46%', size: 'w-6 h-6', tint: 'text-emerald-300',  rot:  -8, delay: 0.9, drift: 7  },
];

function FloatingIcons() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {FLOATING_ICONS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: f.top, left: f.left, right: f.right }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.4, delay: f.delay, ease: 'easeOut' }}
        >
          <motion.div
            animate={{
              y: [0, -f.drift, 0, f.drift * 0.6, 0],
              rotate: [f.rot - 4, f.rot + 4, f.rot - 2, f.rot + 2, f.rot - 4],
            }}
            transition={{
              y: { duration: 7 + (i % 4) * 0.6, delay: f.delay, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 9 + (i % 3) * 0.7, delay: f.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <f.Icon className={`${f.size} ${f.tint}`} strokeWidth={1.6} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const highlightVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 1.0, ease: easeOut },
  },
};

export default function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-44 pb-10 lg:pb-16 px-6 sm:px-12 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 font-sans">
      {/* Soft gradient backdrops */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-primary-200/35 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-primary-100/55 blur-3xl pointer-events-none"
      />

      {/* Subtle dot-grid background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(132,92,245,0.10) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          mask: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 90%)',
          WebkitMask:
            'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 90%)',
        }}
      />

      {/* Floating ambient icons */}
      <FloatingIcons />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* === Centered hero content === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Announcement Pill */}
          <motion.div
            variants={badgeVariants}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-600 group-hover:scale-110 transition-transform">
              <Bot className="w-3 h-3" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-medium text-slate-700">
              End-to-End Outbound for SaaS in India
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] xl:text-[64px] font-extrabold tracking-tight leading-[1.1] text-neutral-900 max-w-4xl"
          >
            Focused in India,{' '}
            <span className="relative inline-block px-3 py-0.5">
              <motion.span
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                Engineered for SaaS.
              </span>
            </span>
            <br />
            <span className="relative inline-block px-3 py-0.5 mt-2">
              <motion.span
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                Driven by Revenue.
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium"
          >
            We help Global SaaS companies build and convert demand in India.
            Automate outbound, qualify inbound, and accelerate deal momentum.
          </motion.p>

          {/* Email Capture & CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col w-full max-w-md gap-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full bg-white p-2 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10 transition-all">
              <div className="flex-1 w-full relative">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none"
                />
              </div>
              <button className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/25 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 group active:scale-[0.98]">
                Book a Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* === Visual showcase below centered text === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: easeOut }}
          className="relative mt-12 lg:mt-16 w-full"
        >
          <HeroShowcase />
        </motion.div>

        {/* === Verticals We Serve === */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 1.4,
              },
            },
          }}
          className="w-full mt-10 lg:mt-12 z-10 shrink-0"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <motion.span
              variants={badgeVariants}
              className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.25em] text-neutral-500"
            >
              Verticals We Serve:
            </motion.span>
            {verticals.map(({ name, Icon }) => (
              <motion.div
                key={name}
                variants={badgeVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-primary-300 hover:shadow-md transition-all cursor-default"
              >
                <Icon
                  className="w-4 h-4 text-neutral-700"
                  strokeWidth={1.75}
                />
                <span className="text-sm font-semibold text-neutral-900">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
