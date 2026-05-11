"use client"
import { motion, type Variants } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

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

const highlightVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.4, ease: easeOut },
  },
};

type Testimonial = {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    initials: 'SK',
    name: 'Sharma Kumar',
    role: 'CEO',
    company: 'CleverTap',
    quote:
      'Thyleads transformed our outbound process. We went from struggling to hit $1M ARR to closing 3× more deals in 6 months. The qualification process alone saved us countless hours.',
  },
  {
    initials: 'RP',
    name: 'Ravi Patel',
    role: 'VP Sales',
    company: 'Dice',
    quote:
      'The AI-powered follow-ups are incredible. Our AEs used to spend 40% of their time on manual follow-ups. Now it\'s automated and smarter — our deal velocity increased by 2.5×.',
  },
  {
    initials: 'MJ',
    name: 'Maya Johnson',
    role: 'Head of GTM',
    company: 'Pazo',
    quote:
      'Every high-intent opportunity gets captured now. We implemented Thyleads\' system and immediately saw 40% better conversion rates. This is predictable revenue done right.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      {/* Subtle ambient backdrop */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14 max-w-2xl mx-auto">
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Social Proof
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            What{' '}
            <span className="relative inline-block px-3 py-1">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">Our Customers</span>
            </span>{' '}
            Say
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Hear from the teams that are already scaling revenue with Thyleads.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="group relative flex flex-col rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-primary-200 hover:shadow-[0_24px_60px_-30px_rgba(132,92,245,0.22),0_8px_20px_-12px_rgba(132,92,245,0.10)] transition-all p-6 lg:p-7"
            >
              {/* Decorative quote glyph */}
              <Quote
                aria-hidden="true"
                className="absolute top-6 right-6 w-7 h-7 text-primary-100 group-hover:text-primary-200 transition-colors"
                strokeWidth={1.5}
              />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-[14px] sm:text-[15px] text-slate-700 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="my-5 h-px bg-slate-100" aria-hidden="true" />

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center text-[12px] font-bold shadow-[0_6px_16px_-6px_rgba(132,92,245,0.5)] ring-2 ring-white"
                  style={{
                    transform: `translateZ(0)`,
                  }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="text-sm font-bold text-neutral-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {t.role}, {t.company}
                  </div>
                </div>
              </footer>

              {/* Index badge for choreography */}
              <span className="sr-only">Testimonial {i + 1} of 3</span>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
