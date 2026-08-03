"use client"
import { motion, type Variants } from 'framer-motion';
import { Mic, Radar, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

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

const steps = [
  {
    num: '01',
    kicker: 'Capture',
    icon: Mic,
    day: 'Day 30',
    title: 'Meeting happens',
    body: 'A VP Marketing at Razorpay mentions integration time vs Amplitude as a concern. Meeting Intelligence Agent extracts the objection, competitor named, and verbatim phrasing within 5 minutes of the call ending.',
  },
  {
    num: '02',
    kicker: 'Detect',
    icon: Radar,
    day: 'Nightly run',
    title: 'Pattern surfaces',
    body: 'Targeting Feedback Agent runs nightly. It sees the same objection in 6 of the last 12 meetings. It surfaces an insight: integration time vs Amplitude is a top-3 objection — currently not addressed in any first-touch variant.',
  },
  {
    num: '03',
    kicker: 'Adapt',
    icon: Sparkles,
    day: 'Next run',
    title: 'Content Agent updates',
    body: 'A recommendation is pushed to Content Agent’s system prompt for the next generation run: “When targeting MarTech VP Marketing, address integration time relative to Amplitude. Use phrasing close to ‘while they take 4+ weeks, our standard is 7 days.’”',
  },
  {
    num: '04',
    kicker: 'Compound',
    icon: TrendingUp,
    day: 'Day 35',
    title: 'Reply rate improves 1.7×',
    body: 'New variants go out on Day 35 with the updated angle. Reply rate on the new variants is 1.7× the prior baseline. That pattern is stored. If 3+ clients show the same dynamic, it gets promoted to the Repository.',
    highlight: true,
  },
];

export default function AgentsLearning() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-[#f7f3eb] font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block px-3 py-1 rounded-full bg-white border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              How the Learning Works
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            A deal on Day 30 makes{' '}
            <span className="text-primary-700 bg-primary-100 box-decoration-clone px-2 py-0.5 rounded-md">
              Day 90 campaigns better.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            This is a real example of how one meeting outcome flows through the
            system and improves the next campaign — automatically, with no
            manual intervention.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.1, ease: easeOut }}
                className={`group relative flex flex-col rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${
                  step.highlight
                    ? 'border border-primary-300 ring-1 ring-primary-100/70 shadow-[0_18px_44px_-22px_rgba(132,92,245,0.30)] hover:shadow-[0_28px_60px_-24px_rgba(132,92,245,0.40)]'
                    : 'border border-slate-200 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_52px_-24px_rgba(15,23,42,0.14)]'
                }`}
              >
                {/* top hairline accent */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                />

                {/* faint step-number watermark */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-5 text-4xl font-black leading-none text-primary-100 select-none pointer-events-none"
                >
                  {step.num}
                </span>

                {/* icon well */}
                <div
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center ${
                    step.highlight
                      ? 'bg-primary-600 text-white shadow-[0_8px_20px_-6px_rgba(132,92,245,0.55)]'
                      : 'bg-primary-50 border border-primary-100 text-primary-600'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>

                <div className="relative mt-4 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-700">
                    {step.kicker}
                  </span>
                  <span aria-hidden="true" className="h-3 w-px bg-slate-200" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {step.day}
                  </span>
                </div>

                <h3 className="relative mt-1.5 text-[16px] font-extrabold text-neutral-900 leading-snug tracking-tight">
                  {step.title}
                </h3>

                <p className="relative mt-2.5 text-[12.5px] text-slate-600 leading-relaxed">
                  {step.body}
                </p>

                {/* flow connector between cards (desktop single-row only) */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:flex absolute top-9 -right-[15px] z-10 h-7 w-7 items-center justify-center rounded-full bg-white border border-slate-200 shadow-[0_4px_10px_-4px_rgba(15,23,42,0.18)]"
                  >
                    <ChevronRight className="w-4 h-4 text-primary-500" strokeWidth={2.5} />
                  </span>
                )}
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
