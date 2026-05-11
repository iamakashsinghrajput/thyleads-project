"use client"
import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Plus } from 'lucide-react';

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

type FAQ = { question: string; answer: string };

const faqs: FAQ[] = [
  {
    question: 'How do you stand out in a saturated HRTech market with outbound?',
    answer:
      'We start by deeply understanding your ICP, their intent signals, and when they’re actually ready to engage. Then we combine AI agents and dedicated GTM engineers to craft hyper-personalized messaging tailored to your product and audience that stands out from generic outreach.',
  },
  {
    question: 'Do you guarantee exclusivity within HRTech sub-categories?',
    answer:
      'Yes. We don’t run outbound for two directly competing HRTech products at the same time. If we’re working with you on payroll, we won’t take on a competing payroll SaaS. This is core to how we operate across all verticals.',
  },
  {
    question: 'How do you ensure we get qualified, high-intent leads?',
    answer:
      'We qualify leads using a multi-channel approach, combining intent signals, market research, and deep ICP understanding. Our HRTech-focused pods know how HR Leaders behave, so only relevant, high-fit opportunities reach your pipeline.',
  },
];

export default function HrtechFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

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
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            What HRTech SaaS Founders{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              ask us first.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            The questions that come up on every HRTech discovery call.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className={`group rounded-2xl border bg-white transition-all ${
                  isOpen
                    ? 'border-primary-200 shadow-[0_24px_60px_-30px_rgba(132,92,245,0.32)]'
                    : 'border-primary-100/70 hover:border-primary-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-2xl"
                >
                  <span
                    className={`text-[15px] sm:text-base font-bold leading-snug transition-colors ${
                      isOpen
                        ? 'text-neutral-900'
                        : 'text-neutral-900 group-hover:text-primary-700'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isOpen
                        ? 'bg-primary-700 text-white rotate-45'
                        : 'bg-primary-50 text-primary-700 border border-primary-100'
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
