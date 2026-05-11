"use client"
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';

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

const stats = [
  { value: '30', label: 'Days to first sales-qualified leads' },
  { value: '100%', label: 'Of target regions covered' },
  { value: 'Multi', label: 'Region active pipeline' },
];

const testimonials = [
  {
    initials: 'US',
    name: 'Umar Salman',
    role: 'Head of Marketing, Tazapay',
    quote:
      'Thyleads qualify, set context, and make sure our sales team walks into calls knowing why the prospect is there and what problem they’re trying to solve.',
  },
  {
    initials: 'AK',
    name: 'Argha Karmakar',
    role: 'GM Marketing, MYND',
    quote:
      'In over a decade of experience in Strategy & Marketing, I have worked with several “Lead Agencies” across a wide spectrum of premium price points. Thyleads has outperformed them all in terms of value for money.',
  },
];

export default function FintechSocialProof() {
  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
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
        <div className="text-center mb-12 lg:mb-14 max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Stats &amp; Testimonials
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            FinTech leaders trust Thyleads to{' '}
            <span className="relative inline-block px-3 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                open the right doors.
              </span>
            </span>
          </motion.h2>
        </div>

        {/* === Two-column: case study + testimonials === */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 lg:gap-6 items-start">
          {/* === LEFT — Case study === */}
          <motion.article
            variants={itemVariants}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-3xl bg-white border border-slate-200 p-6 lg:p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.12)] hover:shadow-[0_30px_70px_-30px_rgba(132,92,245,0.20)] hover:border-primary-200 transition-all"
          >
            {/* Tag */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700 mb-5">
              FinTech &middot; Dice
            </span>

            {/* Title */}
            <h3 className="text-xl lg:text-[26px] font-extrabold text-neutral-900 tracking-tight leading-tight mb-3">
              Helped Dice land sales-qualified leads from month one
            </h3>

            {/* Description */}
            <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed mb-6">
              Dice needed to reach decision-makers across specific target
              regions without losing the first 90 days to ramp-up. Thyleads ran
              vertical-trained outbound calibrated to Dice&rsquo;s ICP,
              delivering sales-qualified leads inside the first month of
              partnership and holding that pace through the engagement.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-5 border-t border-slate-100">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                    ease: easeOut,
                  }}
                >
                  <div className="text-3xl lg:text-[36px] font-extrabold leading-none tracking-tight tabular-nums bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-[11px] sm:text-[12px] text-slate-600 font-medium leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Read story link */}
            <a
              href="#"
              className="group/link inline-flex items-center gap-1.5 mt-6 text-[13px] font-bold text-primary-700 hover:text-primary-800 transition-colors"
            >
              Read the full story
              <ArrowRight
                className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
          </motion.article>

          {/* === RIGHT — Testimonials stack === */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {testimonials.map((t, i) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + i * 0.12,
                  ease: easeOut,
                }}
                whileHover={{ y: -3 }}
                className="group relative rounded-2xl bg-white border border-slate-200 p-5 lg:p-6 hover:border-primary-200 hover:shadow-[0_18px_40px_-20px_rgba(132,92,245,0.20)] transition-all"
              >
                {/* Quote glyph */}
                <Quote
                  aria-hidden="true"
                  className="w-5 h-5 text-primary-300 mb-3 group-hover:text-primary-400 transition-colors"
                  strokeWidth={2}
                  fill="currentColor"
                />

                {/* Quote text */}
                <blockquote className="text-[13px] sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {t.quote}
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-3" aria-hidden="true" />

                {/* Author */}
                <footer className="flex items-center gap-2.5">
                  <div
                    aria-hidden="true"
                    className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center text-[11px] font-bold ring-2 ring-white shadow-[0_4px_12px_-4px_rgba(132,92,245,0.45)]"
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-[13px] font-bold text-neutral-900">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {t.role}
                    </div>
                  </div>
                </footer>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
