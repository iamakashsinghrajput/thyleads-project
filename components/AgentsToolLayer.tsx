"use client"
import { motion, type Variants } from 'framer-motion';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
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

type Mcp = {
  category: string;
  name: string;
  description: string;
};

const mcps: Mcp[] = [

  { category: 'Prospecting', name: 'Apollo MCP', description: 'Contact and company database used by Research and Stakeholder agents.' },
  { category: 'Prospecting', name: 'Crustdata MCP', description: 'India-strong B2B data and hiring signals for Research and Signal Detection.' },
  { category: 'Inbound', name: 'Apify MCP', description: 'Web scraping across LinkedIn, news, job boards, and filings.' },
  { category: 'Enrichment', name: 'Cosy MCP', description: 'Enrichment orchestration with AI columns used by Research and Content.' },

  { category: 'Research', name: 'Sales Navigator MCP', description: 'Deep LinkedIn search for Research and Stakeholder Mapping agents.' },
  { category: 'Verification', name: 'ZeroBounce MCP', description: 'Email verification before any contact is added to a sequence.' },
  { category: 'Email Ops', name: 'Smartlead MCP', description: 'Campaign metrics and mailbox health for Deliverability and Reply Triage.' },
  { category: 'LinkedIn Ops', name: 'HeyReach MCP', description: 'LinkedIn campaign metrics plus cadence for Deliverability and Reply Triage.' },

  { category: 'Meetings', name: 'Fireflies MCP', description: 'Transcript ingestion for Meeting Intelligence Agent.' },
  { category: 'Scheduling', name: 'Google Calendar MCP', description: 'Meeting scheduling and event creation for Deal Momentum Agent.' },
  { category: 'Deliverability', name: 'Postmaster Tools MCP', description: 'Domain reputation and spam-rate monitoring.' },
  { category: 'Deliverability', name: 'MXToolbox MCP', description: 'Records and DNS checks for Deliverability Monitor Agent.' },

  { category: 'Outreach', name: 'Gupshup MCP', description: 'WhatsApp template sends for Deal Momentum Agent (India).' },
  { category: 'Verification', name: 'Gmail / Outlook MCP', description: '1-to-1 email tools for AE assist after handover.' },
  { category: 'Sourcing', name: 'Hunter / LeadMagic MCP', description: 'Email-finding fallback for Stakeholder Mapping.' },
  { category: 'Memory', name: 'Thyleads Dashboard MCP', description: 'Read/write to Project Memory — used by all agents.' },
];

export default function AgentsToolLayer() {
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
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Tool Layer
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            16 MCP integrations.{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              One clean interface.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Agents access external tools through MCP servers — one per tool,
            one clean schema. Agents call MCPs, MCPs handle auth, rate limits,
            and response normalization. Your campaign never breaks because a
            rate limit was missed.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {mcps.map((mcp, i) => (
            <motion.article
              key={mcp.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.1 + (i % 4) * 0.04 + Math.floor(i / 4) * 0.06,
                ease: easeOut,
              }}
              whileHover={{ y: -3 }}
              className="group relative rounded-2xl bg-white border border-slate-200 hover:border-primary-200 p-4 shadow-[0_4px_14px_-8px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_36px_-22px_rgba(132,92,245,0.32)] transition-all overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary-700">
                {mcp.category}
              </div>
              <h3 className="mt-1.5 text-[13.5px] font-extrabold text-neutral-900 leading-tight tracking-tight">
                {mcp.name}
              </h3>
              <p className="mt-2.5 text-[11.5px] text-slate-500 leading-snug">
                {mcp.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
