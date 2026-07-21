"use client"
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, ChevronDown, Bot } from 'lucide-react';
import Link from 'next/link';
import HeroFluid from './HeroFluid';

const SLIDE_MS = 7000;

type Slide = {
  /** Short label shown in the bottom tab strip. */
  tab: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  cta: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    tab: 'Outbound Engine',
    eyebrow: 'End-to-End Outbound for SaaS',
    title: (
      <>
        AI-Powered Lead Generation
        <br />
        <span className="relative inline-block">
          <span
            aria-hidden="true"
            className="absolute inset-x-[-0.35em] inset-y-[0.06em] -z-10 rounded-lg bg-primary-500/25"
          />
          <span className="text-primary-300">Engineered for SaaS.</span>
        </span>
      </>
    ),
    body: 'We help SaaS companies sell into the accounts that matter most. Automate Outbound, qualify inbound, and accelerate post-meeting follow-ups from one single place.',
    cta: { label: 'See how it works', href: '/howitworks' },
  },
  {
    tab: 'Meetings Booked',
    eyebrow: 'Human + AI layer',
    title: (
      <>
        Meetings with the accounts
        <br />
        that actually matter
      </>
    ),
    body: 'AI does the sourcing, sequencing and research. Our SDR pod makes the judgement calls, so every meeting on your calendar is worth taking.',
    cta: { label: 'Meet the human layer', href: '/howitworks#human-layer' },
  },
  {
    tab: 'GTM Framework',
    eyebrow: 'The 5-step GTM framework',
    title: (
      <>
        From cold market to
        <br />
        booked revenue, in five steps
      </>
    ),
    body: 'The operating system we run for every client. ICP definition, signal-led targeting, messaging, orchestration and pipeline review.',
    cta: { label: 'Read the framework', href: '/gtm-framework' },
  },
  {
    tab: 'Proven Results',
    eyebrow: 'Trusted by operators',
    title: (
      <>
        Real pipeline, built for
        <br />
        teams like yours
      </>
    ),
    body: 'HRTech, FinTech, MarTech and RetailTech companies use Thyleads to turn flat quarters into predictable, repeatable pipeline.',
    cta: { label: 'See the case studies', href: '/casestudies' },
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const copyVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, staggerChildren: 0.09 },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.35, ease: 'easeIn' },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.3 } },
};

export default function Hero() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = SLIDES[active];

  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);

  const goTo = useCallback((i: number) => {
    elapsedRef.current = 0;
    setActive(i);
  }, []);

  /**
   * One clock drives both the auto-advance and the progress bar, so the bar
   * always reflects the real time remaining. The bar is written straight to
   * the DOM — animating it through state would re-render the hero every frame.
   */
  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Clamp so a backgrounded tab doesn't bank a huge delta and skip a slide.
      const dt = Math.min(120, now - last);
      last = now;

      if (!pausedRef.current && !document.hidden) elapsedRef.current += dt;

      if (elapsedRef.current >= SLIDE_MS) {
        elapsedRef.current = 0;
        setActive((i) => (i + 1) % SLIDES.length);
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${elapsedRef.current / SLIDE_MS})`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const scrollToNext = useCallback(() => {
    const next = sectionRef.current?.nextElementSibling;
    if (next) {
      next.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    }
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#07060d] text-white font-sans"
    >
      {/* Static gradient underlay — also the fallback if WebGL is unavailable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_45%,#1b0f3a_0%,#0d0722_45%,#07060d_100%)]"
      />
      <HeroFluid slide={active} reduceMotion={Boolean(reduceMotion)} />

      {/* Just enough scrim for text contrast — the ribbons stay visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(50%_44%_at_50%_50%,rgba(7,6,13,0.80)_0%,rgba(7,6,13,0.42)_60%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#07060d] via-[#07060d]/60 to-transparent"
      />
      {/* Fine grain, keeps the large gradients from banding. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-32 pb-16 sm:px-12 lg:pt-40">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={copyVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex w-full flex-col items-center"
            >
              <motion.p
                variants={lineVariants}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-4 backdrop-blur-md"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-500/30 text-primary-200">
                  <Bot className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-[14px] font-medium tracking-[-0.01em] text-white/90">
                  {slide.eyebrow}
                </span>
              </motion.p>

              <motion.h1
                variants={lineVariants}
                className="mt-4 max-w-4xl text-[2.35rem] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-5xl lg:text-[4rem]"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                variants={lineVariants}
                className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/65 md:text-lg"
              >
                {slide.body}
              </motion.p>

              <motion.div variants={lineVariants} className="mt-8">
                <Link
                  href={slide.cta.href}
                  className="group inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white"
                >
                  {slide.cta.label}
                  <span className="relative block h-px w-10 bg-white/50 transition-all duration-300 group-hover:w-16 group-hover:bg-white">
                    <ArrowRight
                      className="absolute -right-1 -top-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Conversion path stays put across slides. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
            className="mt-10 w-full max-w-md"
          >
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-2 backdrop-blur-md transition-all focus-within:border-primary-400/70 focus-within:ring-4 focus-within:ring-primary-500/20 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your work email"
                aria-label="Work email"
                className="w-full flex-1 bg-transparent px-4 py-3 text-sm font-medium text-white placeholder:text-white/45 focus:outline-none"
              />
              <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary-500 hover:text-white active:scale-[0.98] sm:w-auto">
                Book a Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide tabs + scroll cue */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 sm:px-12">
        <div className="flex items-end justify-between gap-6">
          {/* Only the tab strip pauses rotation — hovering the hero at large
              would stop it almost permanently. */}
          <div
            className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 sm:gap-x-4"
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
          >
            {SLIDES.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.tab}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={on}
                  className="group relative pt-3 text-left"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-white/15" />
                  {on && (
                    <span
                      ref={barRef}
                      style={{ transform: `scaleX(${reduceMotion ? 1 : 0})` }}
                      className="absolute inset-x-0 top-0 h-[2px] origin-left bg-primary-400"
                    />
                  )}
                  <span
                    className={`block text-[13px] font-medium transition-colors duration-300 sm:text-[15px] ${
                      on ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    {s.tab}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            className="group hidden shrink-0 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white sm:flex"
          >
            <span className="text-[11px] font-medium">Scroll</span>
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-white/70 group-hover:bg-white/10"
            >
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
            </motion.span>
          </button>
        </div>
      </div>
    </section>
  );
}
