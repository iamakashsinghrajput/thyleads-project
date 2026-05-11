"use client"
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Trophy, Cpu, HeartHandshake } from 'lucide-react';

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

const pills = [
  { icon: Trophy, label: 'Experience that drives better sales' },
  { icon: Cpu, label: 'AI-powered, human-led outbound' },
  { icon: HeartHandshake, label: 'We grow when you grow' },
];

export default function MartechWhyUs() {
  return (
    <section className="relative py-16 lg:py-24 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/4 w-160 h-160 rounded-full bg-primary-100/30 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center"
      >
        {/* === LEFT — Copy === */}
        <div>
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Why Thyleads
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            The outbound partner that learns your{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              MarTech category first.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            We&apos;ve been on the other side of the table. We combine
            AI-powered targeting with GTM Engineers, Account Managers, and
            Content Researchers, and we invest in learning your product, ICP,
            and goals so our growth is tied to yours. See the full story of how
            we&apos;re built differently.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <a
              href="/why-thyleads"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-sm font-bold shadow-[0_10px_28px_-8px_rgba(132,92,245,0.50)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Why Thyleads
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </a>
          </motion.div>
        </div>

        {/* === RIGHT — Feature pills === */}
        <motion.div variants={itemVariants} className="relative">
          {/* Soft halo */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 bg-primary-200/30 blur-3xl rounded-[40px] pointer-events-none"
          />

          {/* Pills container */}
          <div className="relative rounded-3xl bg-gradient-to-br from-primary-50/60 via-white to-primary-50/30 border border-primary-100 p-5 sm:p-6 shadow-[0_22px_56px_-26px_rgba(132,92,245,0.32)]">
            {/* Top hairline */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
            />

            <ul className="flex flex-col gap-3">
              {pills.map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <motion.li
                    key={pill.label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + i * 0.1,
                      ease: easeOut,
                    }}
                    whileHover={{ x: 4 }}
                    className="group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-primary-200 hover:shadow-[0_10px_28px_-14px_rgba(132,92,245,0.32)] transition-all overflow-hidden"
                  >
                    {/* Active accent bar */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-primary-500 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Icon tile */}
                    <div className="relative shrink-0">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-1 bg-primary-300/35 blur-md rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="relative w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-100 transition-colors">
                        <Icon className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                    </div>

                    {/* Label */}
                    <span className="flex-1 text-[14px] font-bold text-neutral-900 leading-snug">
                      {pill.label}
                    </span>

                    {/* Chevron */}
                    <ArrowRight
                      className="shrink-0 w-4 h-4 text-primary-400 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      strokeWidth={2.5}
                    />
                  </motion.li>
                );
              })}
            </ul>

            {/* Bottom meta */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Built differently
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-700">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                </span>
                Active partnership
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
