"use client"
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Shield,
  Scale,
  FileSignature,
  Crown,
} from 'lucide-react';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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

const stages = [
  {
    icon: Shield,
    title: 'Risk Review',
    desc: 'Vendor risk committee cleared',
  },
  {
    icon: Scale,
    title: 'Legal & Compliance',
    desc: 'SOC 2, RBI, data residency',
  },
  {
    icon: FileSignature,
    title: 'Procurement',
    desc: 'Contract & SLA approved',
  },
];

const heroToFlowGap = 1.0;
const stagePerStep = 0.5;

export default function FintechHero() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 lg:pb-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary-50/40 via-white to-white pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/4 w-160 h-160 rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto"
      >

        <div className="text-center max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              For FinTech SaaS in India
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-[-0.02em] leading-[1.1] text-neutral-900"
          >
            You built FinTech.
            <br />
            <span className="relative inline-block px-4 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                We&apos;ll get you past
              </span>
            </span>
            <br />
            <span className="relative inline-block px-4 py-1 mt-2">
              <motion.span
                aria-hidden="true"
                variants={highlightVariants}
                className="absolute inset-0 bg-primary-100 rounded-md origin-left"
              />
              <span className="relative text-primary-700">
                compliance checks.
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Specialized outbound for FinTech that earns replies from CFOs,
            Heads of Risk, and CIOs — then keeps the deal alive through legal,
            procurement, and security review.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Talk to us
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
            <a
              href="/howitworks"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-primary-50 border border-primary-200 hover:border-primary-300 text-primary-800 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        <div className="relative mt-16 lg:mt-20">

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: heroToFlowGap - 0.3, ease: easeOut }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px flex-1 max-w-[80px] bg-slate-200" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
              How a FinTech deal closes
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-slate-200" aria-hidden="true" />
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-3">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const stageDelay = heroToFlowGap + i * stagePerStep;
              return (
                <div key={stage.title} className="relative">

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: stageDelay,
                      ease: easeOut,
                    }}
                    whileHover={{ y: -4 }}
                    className="relative h-full rounded-2xl bg-white border border-slate-200 px-4 py-5 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.10)] hover:border-primary-200 hover:shadow-[0_12px_28px_-12px_rgba(132,92,245,0.20)] transition-all"
                  >

                    <span className="absolute top-3 right-3 text-[10px] font-bold tabular-nums text-slate-300">
                      0{i + 1}
                    </span>

                    <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 mb-3">
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>

                    <div className="text-[14px] font-extrabold text-neutral-900 leading-tight">
                      {stage.title}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium leading-snug mt-1">
                      {stage.desc}
                    </div>

                    <motion.span
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: stageDelay + 0.25,
                        ease: easeOut,
                      }}
                      className="inline-flex items-center gap-1 mt-3 px-2 py-0.5 rounded-md bg-primary-50 border border-primary-100 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-700"
                    >
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      Cleared
                    </motion.span>
                  </motion.div>

                  {i < stages.length && (
                    <div
                      aria-hidden="true"
                      className="hidden md:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 items-center justify-center"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: stageDelay + 0.4,
                          ease: easeOut,
                        }}
                        className="w-6 h-6 rounded-full bg-white border border-primary-200 flex items-center justify-center text-primary-600 shadow-sm"
                      >
                        <ArrowRight
                          className="w-3 h-3"
                          strokeWidth={2.75}
                        />
                      </motion.div>
                    </div>
                  )}

                  <div
                    aria-hidden="true"
                    className="md:hidden flex justify-center py-1"
                  >
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: stageDelay + 0.4,
                        ease: easeOut,
                      }}
                      style={{ transformOrigin: 'top center' }}
                      className="w-px h-4 bg-primary-200"
                    />
                  </div>
                </div>
              );
            })}

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: heroToFlowGap + stages.length * stagePerStep,
                  ease: easeOut,
                }}
                className="relative h-full"
              >

                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: heroToFlowGap + stages.length * stagePerStep + 0.1,
                  }}
                  className="absolute -inset-2 bg-primary-300/35 blur-2xl rounded-3xl pointer-events-none"
                />

                <div className="relative h-full rounded-2xl bg-gradient-to-br from-primary-100 via-primary-50 to-primary-100 border-2 border-primary-300 text-primary-900 px-4 py-5 shadow-[0_18px_40px_-12px_rgba(132,92,245,0.25)] overflow-hidden">

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-50 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(rgba(132,92,245,0.12) 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                      mask: 'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%)',
                      WebkitMask:
                        'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 80%)',
                    }}
                  />

                  <span className="absolute top-3 right-3 text-[10px] font-bold tabular-nums text-primary-400">
                    04
                  </span>

                  <div className="relative w-10 h-10 rounded-xl bg-white border border-primary-200 flex items-center justify-center text-primary-700 shadow-sm mb-3">
                    <Crown className="w-4 h-4" strokeWidth={2} />
                  </div>

                  <div className="relative text-[14px] font-extrabold text-primary-900 leading-tight">
                    CFO Signs
                  </div>
                  <div className="relative text-[12px] text-primary-700 font-medium leading-snug mt-1">
                    Deal closed · contract live
                  </div>

                  <motion.span
                    initial={{ opacity: 0, scale: 0.85, y: 4 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay:
                        heroToFlowGap + stages.length * stagePerStep + 0.4,
                      ease: easeOut,
                    }}
                    className="relative inline-flex items-center gap-1 mt-3 px-2 py-0.5 rounded-md bg-primary-700 text-white text-[9px] font-bold uppercase tracking-[0.18em] shadow-[0_4px_12px_-4px_rgba(132,92,245,0.50)]"
                  >
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    Approved
                  </motion.span>

                  <span
                    aria-hidden="true"
                    className="absolute top-3 left-3 flex h-2 w-2"
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
