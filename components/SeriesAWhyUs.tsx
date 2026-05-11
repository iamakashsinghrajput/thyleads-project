"use client"
import { motion, type Variants } from 'framer-motion';
import { Zap, Cpu, Settings, Globe } from 'lucide-react';

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

const features = [
  {
    icon: Zap,
    title: '4 weeks to velocity',
    description:
      'We get you live in weeks, not months. Every conversation compounds into knowledge inside our 5-step GTM Engine.',
  },
  {
    icon: Cpu,
    title: 'AI Execution. Human Intelligence.',
    description:
      'We use AI to find, enrich, and engage the right buyers, backed by GTM engineers, account managers, and content experts who drive real conversions.',
  },
  {
    icon: Settings,
    title: 'No One-Size-Fits-All Approach',
    description:
      'We tailor strategy, messaging, and targeting for your product, continuously testing and refining what works for your market.',
  },
  {
    icon: Globe,
    title: 'Built for Selling SaaS in India',
    description:
      'We understand how Indian buyers think, evaluate, and decide, so your outreach actually lands and converts.',
  },
];

export default function SeriesAWhyUs() {
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
              Why Thyleads
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            Built for the speed and constraints{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              of early-stage teams.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We&apos;re not a generic agency. Everything we do is tuned for
            early-stage teams building their first pipeline and scaling towards
            Series A SaaS Growth.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.08,
                  ease: easeOut,
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-gradient-to-br from-primary-50/70 via-primary-50/40 to-white border border-primary-100 hover:border-primary-200 p-7 sm:p-8 shadow-[0_4px_18px_-10px_rgba(132,92,245,0.18)] hover:shadow-[0_24px_52px_-22px_rgba(132,92,245,0.40)] transition-all overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                />

                <div className="relative mb-5">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -m-1 bg-primary-300/35 blur-md rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative w-11 h-11 rounded-xl bg-white border border-primary-200 flex items-center justify-center text-primary-700 group-hover:border-primary-300 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                </div>

                <h3 className="text-[18px] sm:text-[19px] font-extrabold text-neutral-900 leading-snug tracking-tight">
                  {f.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="block mt-3 h-[2px] w-8 bg-primary-400 rounded-full origin-left transition-all duration-300 group-hover:scale-x-[1.6] group-hover:bg-primary-600"
                />

                <p className="mt-4 text-[14px] text-slate-700 leading-relaxed">
                  {f.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
