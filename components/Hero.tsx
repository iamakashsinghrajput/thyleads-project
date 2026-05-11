"use client"
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Users,
  CreditCard,
  MessageCircle,
  Bot,
} from 'lucide-react';
import HeroShowcase from './HeroShowcase';

const verticals = [
  { name: 'HRTech', Icon: Users },
  { name: 'FinTech', Icon: CreditCard },
  { name: 'MarTech', Icon: MessageCircle },
  { name: 'AI Agents', Icon: Bot },
];

type FloatingWord = {
  label: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
  drift: number;
};

const FLOATING_WORDS: FloatingWord[] = [
  { label: 'Account-Based',   top: '11%', left:  '4%',  delay: 0.3, drift: 8 },
  { label: 'ICP',             top: '22%', left: '3%',  delay: 0.4, drift: 9  },
  { label: 'Cold Email',      top: '34%', left:  '2%',  delay: 1.0, drift: 11 },
  { label: 'Discovery Call',  top: '48%', left:  '3%',  delay: 1.4, drift: 10 },
  { label: 'Demo Booked',     top: '63%', left:  '2%',  delay: 1.6, drift: 9  },
  { label: 'Closed Won',      top: '42%', right: '4%',  delay: 0.8, drift: 11 },

  { label: 'Pipeline',        top: '18%', right:  '4%',  delay: 0.2, drift: 8 },
  { label: 'Outbound',        top: '8%',  right: '5%',  delay: 0.5, drift: 10 },
  { label: 'Reply Rate',      top: '28%', right: '5%',  delay: 1.1, drift: 10 },
  { label: 'Cadence',         top: '82%', right:  '4%',  delay: 1.9, drift: 9  },
  { label: 'Sales Velocity',  top: '76%', right:  '46%', delay: 2.1, drift: 8  },
  { label: 'Decision Maker',  top: '13%', right:  '44%', delay: 0.9, drift: 7  },
];

function FloatingWords() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {FLOATING_WORDS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: f.top, left: f.left, right: f.right, opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: f.delay, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.28em] text-slate-400/55 whitespace-nowrap"
            animate={{ y: [0, -f.drift, 0, f.drift * 0.55, 0] }}
            transition={{
              duration: 8 + (i % 4) * 0.7,
              delay: f.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="block w-1 h-1 rounded-full bg-primary-300/50" aria-hidden="true" />
            {f.label}
          </motion.span>
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

      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-primary-200/35 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-primary-100/55 blur-3xl pointer-events-none"
      />

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

      <FloatingWords />

      <div className="relative z-10 max-w-6xl mx-auto">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >

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

          <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] xl:text-[64px] font-extrabold tracking-tight leading-[1.1] text-neutral-900 max-w-4xl">
            Focused in India,{' '}
            <span className="relative inline-block px-3 py-0.5">
              <motion.span
                aria-hidden="true"
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
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                Driven by Revenue.
              </span>
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
            We help Global SaaS companies build and convert demand in India.
            Automate outbound, qualify inbound, and accelerate deal momentum.
          </p>

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: easeOut }}
          className="relative mt-12 lg:mt-16 w-full"
        >
          <HeroShowcase />
        </motion.div>

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
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-4">
            <motion.span
              variants={badgeVariants}
              className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.25em] text-neutral-500"
            >
              Verticals We Serve:
            </motion.span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              {verticals.map(({ name, Icon }) => (
                <motion.div
                  key={name}
                  variants={badgeVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-primary-300 hover:shadow-md transition-all cursor-default"
                >
                  <Icon
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700"
                    strokeWidth={1.75}
                  />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
