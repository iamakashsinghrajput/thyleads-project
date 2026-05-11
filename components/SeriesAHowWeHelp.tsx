"use client"
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

const pillars = [
  {
    number: '01',
    title: 'Find the Right Buyers in India',
    description:
      'We understand your product and your ICP, then map high-intent accounts using real signals, so you don’t waste time on prospecting through Ads.',
  },
  {
    number: '02',
    title: 'Run Outbound That Converts',
    description:
      'We handle multi-channel outreach, qualification, and meeting scheduling, so only sales-ready conversations reach your calendar.',
  },
  {
    number: '03',
    title: 'Keep Deals Moving to Close',
    description:
      'We manage follow-ups across stakeholders, keep the context alive, so deals stay warm and don’t get lost in long buying cycles.',
  },
];

export default function SeriesAHowWeHelp() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white font-sans">
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
              How Thyleads Helps
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            Three pillars for{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              Early-Stage Growth
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We build the outbound engine your startup needs to land the first 50
            customers for your SaaS.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.15 + i * 0.08,
                ease: easeOut,
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-gradient-to-br from-primary-50/80 via-primary-50/50 to-white border border-primary-100 hover:border-primary-200 p-7 sm:p-8 shadow-[0_4px_18px_-10px_rgba(132,92,245,0.18)] hover:shadow-[0_24px_52px_-22px_rgba(132,92,245,0.40)] transition-all overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
              />

              <div className="text-5xl sm:text-[56px] font-black tracking-[-0.04em] leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-800 tabular-nums">
                {pillar.number}
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-neutral-900 leading-snug tracking-tight">
                {pillar.title}
              </h3>

              <span
                aria-hidden="true"
                className="block mt-3 h-[2px] w-8 bg-primary-400 rounded-full origin-left transition-all duration-300 group-hover:scale-x-[1.6] group-hover:bg-primary-600"
              />

              <p className="mt-4 text-[14px] text-slate-700 leading-relaxed">
                {pillar.description}
              </p>

              <a
                href="/howitworks"
                className="group/link mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-700 hover:text-primary-800 transition-colors"
              >
                Know more
                <ArrowUpRight
                  className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                  strokeWidth={2.5}
                />
              </a>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
