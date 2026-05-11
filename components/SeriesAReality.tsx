"use client"
import { motion, type Variants } from 'framer-motion';
import { UserX, Flame, Clock } from 'lucide-react';

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

const struggles = [
  {
    icon: UserX,
    title: 'No dedicated sales team',
    description:
      "You're stuck doing sales yourself: late nights, constant follow-ups, and limited traction. Building an SDR team only adds more time, cost, and complexity.",
  },
  {
    icon: Flame,
    title: 'Burning runway on experiments',
    description:
      "Trying to land your first 10 accounts through ads or referrals feels obvious, but it doesn't bring the right buyers. You burn money on leads that don't convert or stay long-term.",
  },
  {
    icon: Clock,
    title: 'Early Deals Take Too Long',
    description:
      'Without a clear follow-up system, early deals take longer to close, lose momentum, and often never convert into revenue.',
  },
];

export default function SeriesAReality() {
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
              The Early-Stage Struggle
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            Three points where{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              early-stage SaaS pipeline breaks
            </span>
          </motion.h2>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {struggles.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.08,
                  ease: easeOut,
                }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-primary-200 p-6 sm:p-7 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_48px_-22px_rgba(132,92,245,0.32)] transition-all overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                />

                <div className="relative mb-5">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -m-1 bg-primary-200/40 blur-md rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative w-11 h-11 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-100 group-hover:border-primary-200 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>

                <h3 className="text-[17px] font-extrabold text-neutral-900 leading-snug">
                  {s.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="block mt-3 h-[2px] w-7 bg-primary-600 rounded-full origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
                />

                <p className="mt-4 text-[13.5px] text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
