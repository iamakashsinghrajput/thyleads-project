"use client"
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

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

type CaseStudy = {
  brand: string;
  logo: string;
  meta: string;
  headline: string;
  description: string;
  stats: { value: string; label: string }[];
  engagement: string;
};

const caseStudies: CaseStudy[] = [
  {
    brand: 'CleverTap',
    logo: '/images/CleverTap.svg',
    meta: 'India GTM · MarTech',
    headline: '90+ qualified appointments in 3 months',
    description:
      'CleverTap needed to expand into India enterprise accounts without diluting brand positioning. Thyleads rebuilt the ICP, ran vertical-trained outbound, and delivered a 3× surge in appointment volume with a 30% SQL-to-closed-won rate.',
    stats: [
      { value: '90+', label: 'Qualified meetings in 90 days' },
      { value: '3×', label: 'Appointment volume' },
      { value: '30%', label: 'SQL to closed-won' },
    ],
    engagement: '3-month engagement · India · 2024',
  },
  {
    brand: 'VWO',
    logo: '/images/VWO.svg',
    meta: 'Enterprise Expansion · MarTech',
    headline: '40+ net-new appointments in 90 days',
    description:
      'VWO needed an outbound that matched their product’s sophistication. Thyleads ran a dedicated enterprise motion, revived 11 dormant accounts, and launched 6 pilot programs inside the first quarter of partnership.',
    stats: [
      { value: '40+', label: 'Net-new appointments' },
      { value: '11', label: 'Dormant accounts revived' },
      { value: '6', label: 'Pilot programs launched' },
    ],
    engagement: '90-day engagement · Enterprise · 2024',
  },
];

export default function GtmImpact() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      {/* Ambient glow */}
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
        <div className="text-center max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              <Sparkles className="w-3 h-3" strokeWidth={2.5} />
              The Impact
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            What this system delivered for
            <br />
            <span className="relative inline-block px-3 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                CleverTap and VWO.
              </span>
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            These numbers come from real client engagements, not projections.
          </motion.p>
        </div>

        {/* Case study cards */}
        <div className="mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {caseStudies.map((cs, i) => (
            <motion.article
              key={cs.brand}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: easeOut }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-gradient-to-br from-white via-white to-primary-50/40 border border-slate-200 hover:border-primary-200 p-6 sm:p-8 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_56px_-22px_rgba(132,92,245,0.32)] transition-all overflow-hidden"
            >
              {/* Top gradient hairline */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
              />

              {/* Top-right dot grid texture */}
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

              {/* === Brand identity row === */}
              <div className="relative flex items-start gap-4">
                {/* Logo avatar */}
                <div className="relative shrink-0">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-1 bg-primary-300/40 blur-md rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 ring-1 ring-white shadow-[0_8px_22px_-8px_rgba(132,92,245,0.30)] flex items-center justify-center overflow-hidden p-2">
                    <Image
                      src={cs.logo}
                      alt={cs.brand}
                      width={44}
                      height={44}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                {/* Brand + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold tracking-tight text-neutral-900">
                      {cs.brand}
                    </h3>
                    <span
                      className="relative flex h-1.5 w-1.5"
                      aria-hidden="true"
                    >
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-700/90">
                    {cs.meta}
                  </p>
                </div>

                {/* Case study pill */}
                <span className="hidden sm:inline-flex shrink-0 items-center gap-1 px-2.5 py-1 rounded-full border border-primary-200 bg-white text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">
                  Case Study
                </span>
              </div>

              {/* === Headline === */}
              <h4 className="mt-7 text-2xl sm:text-[26px] font-extrabold tracking-[-0.01em] leading-[1.2] text-neutral-900">
                {cs.headline}
              </h4>

              {/* === Description === */}
              <p className="mt-4 text-[14.5px] text-slate-600 leading-relaxed">
                {cs.description}
              </p>

              {/* Divider */}
              <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* === Stats === */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {cs.stats.map((stat, j) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + j * 0.08,
                      ease: easeOut,
                    }}
                    className="relative"
                  >
                    {/* Subtle vertical divider between cells */}
                    {j > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[-8px] top-1 bottom-2 w-px bg-slate-200/70"
                      />
                    )}
                    {/* Gradient stat number */}
                    <div className="text-4xl sm:text-[38px] font-black tracking-[-0.03em] tabular-nums leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-800">
                      {stat.value}
                    </div>
                    {/* Underline accent */}
                    <span
                      aria-hidden="true"
                      className="block mt-2.5 h-[2px] w-7 bg-primary-300 rounded-full origin-left transition-all duration-300 group-hover:scale-x-[1.6] group-hover:bg-primary-600"
                    />
                    <div className="mt-2.5 text-[11px] sm:text-[12px] text-slate-500 font-medium leading-snug">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* === Footer meta === */}
              <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {cs.engagement}
                </span>
                <a
                  href="#"
                  className="group/link inline-flex items-center gap-1 text-[12px] font-bold text-primary-700 hover:text-primary-800 transition-colors"
                >
                  Read case study
                  <ArrowUpRight
                    className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    strokeWidth={2.5}
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
