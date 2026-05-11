"use client"
import { motion, type Variants } from 'framer-motion';

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
    title: 'We extend your team, not replace it',
    description:
      'We work alongside your SDRs and AEs as an India-specialist layer, handling the nuance, timing, and multi-stakeholder complexity others miss.',
  },
  {
    title: 'Knowledge that compounds over time',
    description:
      'We learn your ICP, messaging, and what converts, and that knowledge stays with us, not lost to attrition or ramp cycles.',
  },
  {
    title: 'Complete visibility, always',
    description:
      'You get full transparency with dashboards, shared pipeline views, and real-time updates, so you always know what’s working.',
  },
];

export default function SeriesBWhyUs() {
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Why Thyleads
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            Outbound partner you can{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              rely on to deliver.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            You get a full outbound system designed for scaling SaaS outbound
            without breaking your existing GTM motion, owned end-to-end by one
            pod that learns your market and stays with you.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.15 + i * 0.08,
                ease: easeOut,
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-white border border-slate-200 hover:border-primary-200 p-6 sm:p-7 pl-7 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_48px_-22px_rgba(132,92,245,0.32)] transition-all overflow-hidden"
            >
              {/* Left accent bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b from-primary-500 to-primary-700"
              />

              {/* Top hairline */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
              />

              <h3 className="text-[16px] font-extrabold text-neutral-900 leading-snug tracking-tight">
                {feature.title}
              </h3>

              <span
                aria-hidden="true"
                className="block mt-3 h-[2px] w-7 bg-primary-400 rounded-full origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
              />

              <p className="mt-4 text-[13.5px] text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
