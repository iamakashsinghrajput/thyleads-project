"use client"
import { motion, type Variants } from 'framer-motion';
import { Database, Layers, ArrowRight } from 'lucide-react';

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

const projectMemoryItems = [
  'Kickoff brief & ICP brief (all agents read this)',
  'Customer interview transcripts + language bank',
  'Account universe with scores and signals',
  'Won/lost deal analysis',
  'Campaign variants + reply performance',
  'Meeting outcomes, objections raised, competitors named',
];

const crossClientItems = [
  'Skeleton performance by ICP type and industry',
  'Best send-time patterns by persona (day + hour)',
  'Subject line patterns that consistently pull replies',
  'Objection patterns by industry (e.g. FinTech vs HRTech)',
  'Channel mix data — when WhatsApp lifts conversion',
  'Patterns promoted only when seen across 3+ clients',
];

export default function AgentsMemory() {
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
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Memory Architecture
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            Most agencies keep learning{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              in people&apos;s heads.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            When someone leaves, the memory leaves. Thyleads&apos; memory lives
            in the system — per-client knowledge that compounds over every
            engagement, and cross-client patterns that every new client
            inherits from day one.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

          <motion.article
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/40 border border-primary-200 p-7 sm:p-8 shadow-[0_18px_44px_-22px_rgba(132,92,245,0.32)] transition-shadow hover:shadow-[0_28px_56px_-22px_rgba(132,92,245,0.44)]"
          >

            <span
              aria-hidden="true"
              className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(132,92,245,0.16) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
                mask: 'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
                WebkitMask:
                  'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-primary-200 text-primary-700 shadow-[0_6px_16px_-6px_rgba(132,92,245,0.30)]">
                <Database className="w-5 h-5" strokeWidth={2} />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold text-neutral-900 tracking-tight">
                Project Memory
              </h3>

              <p className="mt-3 text-[14.5px] text-slate-600 leading-relaxed">
                A persistent knowledge graph specific to each client. Every
                agent that runs on your campaign has read access to what&apos;s
                been learned — ICP briefs, customer interview transcripts,
                stakeholder maps, campaign results, meeting outcomes.
              </p>

              <ul className="mt-6 space-y-2.5">
                {projectMemoryItems.map(item => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-relaxed"
                  >
                    <ArrowRight
                      className="mt-0.5 w-3.5 h-3.5 shrink-0 text-primary-600"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <motion.article
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-primary-200 p-7 sm:p-8 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.08)] hover:shadow-[0_28px_56px_-22px_rgba(132,92,245,0.32)] transition-all"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
            />

            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 border border-primary-100 text-primary-700">
              <Layers className="w-5 h-5" strokeWidth={2} />
            </div>

            <h3 className="mt-5 text-2xl font-extrabold text-neutral-900 tracking-tight">
              Cross-Client Repository
            </h3>

            <p className="mt-3 text-[14.5px] text-slate-600 leading-relaxed">
              Anonymized patterns aggregated across all clients. A client
              onboarded in month 18 benefits from 17 months of learning —
              without anyone manually telling the system what works. This is
              what turns operations into a compounding competitive advantage.
            </p>

            <ul className="mt-6 space-y-2.5">
              {crossClientItems.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-relaxed"
                >
                  <ArrowRight
                    className="mt-0.5 w-3.5 h-3.5 shrink-0 text-primary-500"
                    strokeWidth={2.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </motion.div>
    </section>
  );
}
