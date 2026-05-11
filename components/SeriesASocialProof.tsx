"use client"
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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

type CaseStudy = {
  brand: string;
  logo: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
};

const caseStudies: CaseStudy[] = [
  {
    brand: 'OneCap',
    logo: '/images/onecap.png',
    title: 'From 0 to 47 qualified meetings in 90 days',
    description:
      'A pre-revenue HRTech startup needed pipeline fast before their runway ran out. We built their entire outbound motion from scratch.',
    stats: [
      { value: '47', label: 'Qualified meetings in 90 days' },
      { value: '3X', label: 'Pipeline growth' },
      { value: '30%', label: 'SQL to close rate' },
    ],
  },
  {
    brand: 'Zigtal',
    logo: '/images/zigital.png',
    title: '3x pipeline in 60 days post-fundraise',
    description:
      'After closing their Series A, this FinTech needed to prove traction immediately. We delivered a repeatable outbound system that scaled.',
    stats: [
      { value: '3X', label: 'Pipeline in 60 days' },
      { value: '40+', label: 'Net-new appointments' },
      { value: '6', label: 'Pilot programs launched' },
    ],
  },
];

export default function SeriesASocialProof() {
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
            Startups we&apos;ve{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              helped scale
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Real results from real early-stage SaaS companies.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {caseStudies.map((cs, i) => (
            <motion.article
              key={cs.brand}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.1,
                ease: easeOut,
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl bg-gradient-to-br from-white via-white to-primary-50/40 border border-slate-200 hover:border-primary-200 p-7 sm:p-8 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_56px_-22px_rgba(132,92,245,0.32)] transition-all overflow-hidden"
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

              <div className="relative flex items-start gap-3">
                <div className="relative shrink-0">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1 bg-primary-300/40 blur-md rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 ring-1 ring-white shadow-[0_8px_22px_-8px_rgba(132,92,245,0.30)] flex items-center justify-center overflow-hidden p-1.5">
                    <Image
                      src={cs.logo}
                      alt={cs.brand}
                      width={40}
                      height={40}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">
                    {cs.brand}
                  </div>
                </div>
              </div>

              <h3 className="relative mt-5 text-[22px] sm:text-[24px] font-extrabold tracking-tight leading-[1.2] text-neutral-900">
                {cs.title}
              </h3>

              <p className="relative mt-4 text-[14px] text-slate-600 leading-relaxed">
                {cs.description}
              </p>

              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="relative mt-6 grid grid-cols-3 gap-4">
                {cs.stats.map((stat, j) => (
                  <div key={stat.label} className="relative">
                    {j > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[-8px] top-1 bottom-2 w-px bg-slate-200/70"
                      />
                    )}
                    <div className="text-3xl sm:text-[32px] font-black tracking-[-0.03em] tabular-nums leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-800">
                      {stat.value}
                    </div>
                    <span
                      aria-hidden="true"
                      className="block mt-2 h-[2px] w-6 bg-primary-300 rounded-full origin-left transition-all duration-300 group-hover:scale-x-[1.5] group-hover:bg-primary-500"
                    />
                    <div className="mt-2 text-[10.5px] sm:text-[11.5px] text-slate-500 font-medium leading-snug">
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
          ))}
        </div>
      </motion.div>
    </section>
  );
}
