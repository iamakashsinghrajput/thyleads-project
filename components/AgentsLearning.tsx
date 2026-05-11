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

const steps = [
  {
    num: '1',
    title: 'Meeting happens',
    body: 'A VP Marketing at Razorpay mentions integration time vs Amplitude as a concern. Meeting Intelligence Agent extracts the objection, competitor named, and verbatim phrasing within 5 minutes of the call ending.',
  },
  {
    num: '2',
    title: 'Pattern surfaces',
    body: 'Targeting Feedback Agent runs nightly. It sees the same objection in 6 of the last 12 meetings. It surfaces an insight: integration time vs Amplitude is a top-3 objection — currently not addressed in any first-touch variant.',
  },
  {
    num: '3',
    title: 'Content Agent updates',
    body: 'A recommendation is pushed to Content Agent’s system prompt for the next generation run: “When targeting MarTech VP Marketing, address integration time relative to Amplitude. Use phrasing close to ‘while they take 4+ weeks, our standard is 7 days.’”',
  },
  {
    num: '4',
    title: 'Reply rate improves 1.7×',
    body: 'New variants go out on Day 35 with the updated angle. Reply rate on the new variants is 1.7× the prior baseline. That pattern is stored. If 3+ clients show the same dynamic, it gets promoted to the Repository.',
  },
];

export default function AgentsLearning() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white font-sans">
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
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
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
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
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

        {/* === Horizontal flow with connectors === */}
        <div className="relative">
          {/* Desktop horizontal connector line */}
          <span
            aria-hidden="true"
            className="hidden lg:block absolute left-[12%] right-[12%] top-7 h-px bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.1,
                  ease: easeOut,
                }}
                className="relative text-center px-2"
              >
                {/* Numbered circle */}
                <div className="relative mx-auto w-14 h-14">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1.5 bg-primary-300/30 blur-md rounded-full pointer-events-none"
                  />
                  {/* Two smoothly-staggered pulse rings */}
                  {[0, 1.6].map(offset => (
                    <motion.span
                      key={offset}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-primary-400"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: [1, 1.9], opacity: [0.45, 0] }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        delay: i * 0.45 + offset,
                        ease: 'easeOut',
                      }}
                      style={{ transformOrigin: '50% 50%' }}
                    />
                  ))}
                  <div className="relative w-14 h-14 rounded-full bg-white border-2 border-primary-300 flex items-center justify-center text-primary-700 text-xl font-extrabold shadow-[0_8px_22px_-6px_rgba(132,92,245,0.35)]">
                    {step.num}
                  </div>
                </div>

                <h3 className="mt-5 text-[15px] font-extrabold text-neutral-900 leading-snug tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-[12.5px] text-slate-600 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
