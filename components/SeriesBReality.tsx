"use client"
import { motion, type Variants } from 'framer-motion';
import { BarChart3, TrendingDown, Hourglass } from 'lucide-react';

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

const traps = [
  {
    icon: BarChart3,
    eyebrow: 'Trap 01',
    title: 'Pipeline Coverage Keeps Slipping',
    description:
      'You need consistent pipeline coverage but SDR ramp time and churn keep breaking momentum. Instead of compounding, your pipeline resets every few months, slowing growth when you need to scale.',
    accent: 'Coverage gap: 3–4 months',
    footnote: null,
  },
  {
    icon: TrendingDown,
    eyebrow: 'Trap 02',
    title: 'CAC Is Climbing, Efficiency Isn’t',
    description:
      'Board asks for magic number improvement. But scaled outbound means more SDRs, more tools, more managers, and CAC* payback keeps stretching past 18 months.',
    accent: 'CAC payback > 18 mo',
    footnote: '*CAC: Customer Acquisition Cost',
  },
  {
    icon: Hourglass,
    eyebrow: 'Trap 03',
    title: 'Deals Drag in the Messy Middle',
    description:
      'Enterprise cycles stretch 6–9 months. AEs get stuck multi-threading manually, deals go dark between stages, and forecasts become guesswork.',
    accent: 'Cycle: 6–9 months',
    footnote: null,
  },
];

export default function SeriesBReality() {
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
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
              </span>
              The Scaling Trap
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            At Series B+, the old outbound playbook{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              quietly breaks.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            What got you to Series A won&apos;t get you to Series C. Founder-led
            selling stalls, SDR hiring can&apos;t keep up, and pipeline becomes
            unpredictable, creating real Series B pipeline challenges right when
            investors expect the opposite.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {traps.map((trap, i) => {
            const Icon = trap.icon;
            return (
              <motion.article
                key={trap.title}
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

                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-2.5">
                  {trap.eyebrow}
                </div>

                <h3 className="text-[17px] font-extrabold text-neutral-900 leading-snug">
                  {trap.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="block mt-3 h-[2px] w-7 bg-primary-600 rounded-full origin-left transition-transform duration-300 group-hover:scale-x-[1.6]"
                />

                <p className="mt-4 text-[13.5px] text-slate-600 leading-relaxed">
                  {trap.description}
                </p>

                {trap.footnote && (
                  <p className="mt-2 text-[10.5px] text-slate-400 italic">
                    {trap.footnote}
                  </p>
                )}

                <div className="mt-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">
                  <span className="w-1 h-1 rounded-full bg-primary-600" />
                  {trap.accent}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
