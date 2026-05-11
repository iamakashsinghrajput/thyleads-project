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

const highlightVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.85, delay: 0.4, ease: easeOut },
  },
};

type Pillar = {
  eyebrow: string;
  number: string;
  title: string;
  desc: string;
};

const pillars: Pillar[] = [
  {
    eyebrow: 'FinTech-Specialist Pods',
    number: '01',
    title: 'Vertical Pods That Speak Finance',
    desc: 'Dedicated GTM teams trained on FinTech buyer language: settlement risk, fraud loss, audit cycles, RBI compliance, AML/KYC, reconciliation pain. Your outbound sounds like a peer, not a pitch.',
  },
  {
    eyebrow: 'Intent-Led Targeting',
    number: '02',
    title: 'Intent-Led Prospecting, Not Cold Lists',
    desc: 'We follow real intent signals to spot when an account moves from just exploring to actively looking, so we reach out when it actually matters.',
  },
  {
    eyebrow: 'Multi-Threaded Outreach',
    number: '03',
    title: 'Reach the Whole Buying Committee',
    desc: 'CFO, CIO, CRO, Head of Compliance, Procurement: we run coordinated multi-channel sequences across the full committee, so the deal keeps moving when one stakeholder goes silent or a new one joins late.',
  },
];

export default function FintechHowWeHelp() {
  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">

      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto"
      >

        <div className="text-center mb-12 lg:mb-14 max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              How Thyleads Helps
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.15] text-neutral-900"
          >
            A FinTech-native outbound engine,
            <br />
            <span className="relative inline-block px-3 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                built around your buyer.
              </span>
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We&apos;ve run outbound for FinTech companies across payments,
            lending, RegTech, and core banking. The messaging earns replies
            from CFOs, CIOs, and Heads of Risk.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: 0.15 + i * 0.1,
                ease: easeOut,
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-gradient-to-br from-primary-50 via-primary-50/60 to-white border border-primary-100 px-6 py-7 hover:border-primary-300 hover:shadow-[0_20px_50px_-20px_rgba(132,92,245,0.30),0_8px_20px_-12px_rgba(132,92,245,0.10)] transition-all overflow-hidden"
            >

              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-primary-200 text-[9px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-5 shadow-sm">
                {pillar.eyebrow}
              </span>

              <div className="text-5xl sm:text-[52px] font-extrabold leading-none tracking-tighter tabular-nums bg-gradient-to-br from-primary-400 to-primary-700 bg-clip-text text-transparent mb-3">
                {pillar.number}
              </div>

              <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight leading-tight mb-3">
                {pillar.title}
              </h3>

              <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
