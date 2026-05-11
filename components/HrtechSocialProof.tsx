"use client"
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';

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

const stats = [
  { value: '55+', label: 'Enterprise TA conversations in 90 days' },
  { value: '4X', label: 'Reply rate vs prior in-house' },
  { value: '14', label: 'Active pilots in pipeline' },
];

const testimonials = [
  {
    initials: 'AR',
    name: 'Aman R.',
    role: 'Co-founder, HRTech SaaS',
    quote:
      'Thyleads understood our HRTech buyer from day one, the messaging landed with CHROs in a way our in-house SDRs never managed. Within two months we had pilots running at accounts we’d been chasing for a year.',
  },
  {
    initials: 'PS',
    name: 'Priya S.',
    role: 'VP Revenue, Payroll SaaS',
    quote:
      'They run a full GTM motion: strategy, copy, intent, follow-ups, and show up to weekly reviews like an in-house team. Easily the best outbound partner we’ve made.',
  },
];

export default function HrtechSocialProof() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-white font-sans">
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
        <div className="text-center max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Stats &amp; Testimonials
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            HRTech SaaS leaders trust Thyleads to{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              open the right doors.
            </span>
          </motion.h2>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5">
          {/* Case study card */}
          <motion.article
            variants={itemVariants}
            className="group relative rounded-3xl bg-gradient-to-br from-white via-white to-primary-50/40 border border-slate-200 p-7 sm:p-8 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_52px_-22px_rgba(132,92,245,0.32)] transition-all overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
            />

            <div
              aria-hidden="true"
              className="absolute -top-2 -right-2 w-32 h-32 opacity-60 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(132,92,245,0.18) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
                mask: 'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
                WebkitMask:
                  'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
              }}
            />

            <div className="relative flex items-start gap-4">
              <div className="relative shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute -inset-1 bg-primary-300/40 blur-md rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 ring-1 ring-white shadow-[0_8px_22px_-8px_rgba(132,92,245,0.30)] flex items-center justify-center overflow-hidden p-2">
                  <Image
                    src="/images/teamlease.png"
                    alt="TeamLease"
                    width={44}
                    height={44}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold tracking-tight text-neutral-900">
                    TeamLease
                  </h3>
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-700/90">
                  Talent Acquisition · India
                </p>
              </div>

              <span className="hidden sm:inline-flex shrink-0 items-center gap-1 px-2.5 py-1 rounded-full border border-primary-200 bg-white text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">
                Case Study
              </span>
            </div>

            <h4 className="relative mt-6 text-2xl font-extrabold tracking-tight leading-[1.2] text-neutral-900">
              Cracked enterprise TA leaders without a single cold-list blast
            </h4>

            <p className="relative mt-4 text-[14.5px] text-slate-600 leading-relaxed">
              A talent-acquisition platform needed to land conversations with TA
              heads at 1,000+ employee firms. Thyleads built an intent layer
              around hiring spikes and req volume, then ran multi-channel
              outreach calibrated to each account&apos;s hiring season.
            </p>

            <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="relative mt-6 grid grid-cols-3 gap-4">
              {stats.map((stat, j) => (
                <div key={stat.label} className="relative">
                  {j > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[-8px] top-1 bottom-2 w-px bg-slate-200/70"
                    />
                  )}
                  <div className="text-3xl sm:text-[34px] font-black tracking-[-0.03em] tabular-nums leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-800">
                    {stat.value}
                  </div>
                  <span
                    aria-hidden="true"
                    className="block mt-2 h-[2px] w-6 bg-primary-300 rounded-full origin-left transition-all duration-300 group-hover:scale-x-[1.5] group-hover:bg-primary-500"
                  />
                  <div className="mt-2 text-[11px] sm:text-[12px] text-slate-500 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-7 pt-5 border-t border-slate-100">
              <a
                href="/casestudies"
                className="group/link inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Read the full story
                <ArrowUpRight
                  className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </motion.article>

          {/* Testimonials */}
          <div className="flex flex-col gap-5">
            {testimonials.map((t, i) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + i * 0.1,
                  ease: easeOut,
                }}
                whileHover={{ y: -3 }}
                className="group relative flex-1 rounded-3xl bg-white border border-slate-200 hover:border-primary-200 p-6 sm:p-7 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_44px_-22px_rgba(132,92,245,0.28)] transition-all overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                />

                <Quote
                  className="w-7 h-7 text-primary-300"
                  strokeWidth={2.5}
                  fill="currentColor"
                />

                <p className="mt-3 text-[14px] text-slate-700 leading-relaxed">
                  {t.quote}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white text-[11px] font-extrabold flex items-center justify-center tracking-wide ring-2 ring-white shadow-[0_4px_12px_-4px_rgba(132,92,245,0.55)]">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-neutral-900 leading-tight">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
