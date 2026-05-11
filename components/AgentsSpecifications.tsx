"use client"
import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Search,
  Target,
  FileText,
  Send,
  CalendarCheck,
  RotateCw,
  ChevronDown,
} from 'lucide-react';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
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

type Agent = {
  name: string;
  model: string;
  description: string;
  outputs: string[];
};

type AgentCluster = {
  num: string;
  label: string;
  title: string;
  icon: typeof Search;
  agents: Agent[];
};

const clusters: AgentCluster[] = [
  {
    num: '01',
    label: 'Discovery',
    title: 'Finding and structuring your ideal customer profile',
    icon: Search,
    agents: [
      {
        name: 'Discovery Agent',
        model: 'Opus 4 · Tier 1',
        description:
          'Helps GTM engineers run better client discovery. Suggests category-specific interview questions, transcribes and structures customer conversations, and extracts the language bank — the verbatim phrases from real customer interviews that show up in replies later.',
        outputs: ['Structured interview summary', 'Language bank', 'Draft ICP brief'],
      },
    ],
  },
  {
    num: '02',
    label: 'Targeting',
    title: 'Researching, scoring, and monitoring accounts',
    icon: Target,
    agents: [
      {
        name: 'Research Agent',
        model: 'Opus 4 · Synthesis · Tier 1',
        description:
          'Pulls company-level and contact-level intelligence. For each account it generates a "why now" snippet — 1–2 sentences explaining the current trigger that makes outreach relevant today (raise, hire, expansion, RFP cycle).',
        outputs: ['Why-now snippet', 'Account intel', 'Suggested angle'],
      },
      {
        name: 'Account Scoring Agent',
        model: 'Haiku · Tier 4',
        description:
          'Applies the Thyleads scoring rubric. Grade fit (ICP fit), signals (recent signals), engagement (10pts), tools (the way new SDRs ramp). Accounts above 70 priority, active, scored. Accounts that don\'t respond well move down. Drops false positives.',
        outputs: ['Scored account list', 'Priority ranking', 'Auto-tiering decisions'],
      },
      {
        name: 'Signal Detection Agent',
        model: 'Haiku · Tier 4 · Bulk Continuous',
        description:
          'Monitors LinkedIn jobs, news scans across various sources for "new" hires (new VPs/Heads). New job listings, news, blog posts, funding announcements, and leadership changes. Surfaces accounts that should be re-prioritized or moved into reactivation.',
        outputs: ['Daily signal report', 'Re-activation queue', 'New triggers'],
      },
      {
        name: 'Stakeholder Mapping Agent',
        model: 'Haiku · Tier 4',
        description:
          'Verifies that mapped stakeholders actually hold the title at the company today. Catches the wrong person showing up at scale. Inactive contacts, exited contacts, and missed contacts. The output is a verified contact graph, with reporting line, account function, and lights to verify or skip.',
        outputs: ['Verification status', 'Reporting line', 'Active vs inactive flags'],
      },
    ],
  },
  {
    num: '03',
    label: 'Content',
    title: 'Writing variants, scoring quality, enforcing compliance',
    icon: FileText,
    agents: [
      {
        name: 'Content Agent',
        model: 'Opus 4 · Tier 1',
        description:
          'Drafts email and LinkedIn variants for each persona × use case × industry × signal combination. Reads the language bank (verbatim phrases from real customer interviews) so the output sounds like the prospect, not like an outreach template. Versions are tracked and surfaced to the QA Agent.',
        outputs: ['Email variants', 'LinkedIn variants', 'Subject lines'],
      },
      {
        name: 'QA Agent',
        model: 'Haiku · Tier 4',
        description:
          'Scores every drafted variant before it leaves a human reviewer. Reduces first-pass review time from 1 hour. Catches "too salesy" or "too formal" density, mobile readability, framework compliance, length, placement vibility, and brand on tone fit.',
        outputs: ['QA score', 'Pass/fail flags', 'Specific revisions'],
      },
      {
        name: 'Compliance Agent',
        model: 'Haiku · Tier 4 · Bulk Auto',
        description:
          'A hard gate before any send. Validates RFC 5322 email standards, headers, claim visible to ISPs, CAN-SPAM compliance, and GDPR signals. The agent is deterministic — not learning. So no false sends. Approves auto-block on a compliance fail. Notifies you when sees a hard error.',
        outputs: ['Compliance status', 'Block reasons', 'Sending suspension hold'],
      },
    ],
  },
  {
    num: '04',
    label: 'Execution',
    title: 'Sending, deliverability, and reply handling',
    icon: Send,
    agents: [
      {
        name: 'Reply Triage Agent',
        model: 'Haiku · Tier 4',
        description:
          'Classifies every inbound reply within minutes. Eliminates the human bottleneck on the 4-hour reply SLA. Categorizes: positive, soft positive, objection (resolvable), out-of-office, wrong contact, unsubscribe. Includes a snippet from the last touch and a suggested action.',
        outputs: ['Reply category', 'Confidence score', 'Suggested response'],
      },
      {
        name: 'Deliverability Monitor Agent',
        model: 'Haiku · Tier 4 · Daily Cron',
        description:
          'Continuous monitoring of mailbox health across Smartlead, Postmaster, and MXToolbox. Auto-pauses mailboxes hitting damage threshold reputation damage (Smartlead score below 90, reputation drops, spam-rate spikes, soft bounces). Detected = no false negatives in delivery.',
        outputs: ['Health-score baseline', 'Hourly inbox drift', 'Auto-pause status'],
      },
    ],
  },
  {
    num: '05',
    label: 'Meeting',
    title: 'Processing meetings and keeping deals moving',
    icon: CalendarCheck,
    agents: [
      {
        name: 'Meeting Intelligence Agent',
        model: 'Opus 4 · Tier 1',
        description:
          'Processes Fireflies transcripts within 5 minutes of a meeting ending. Extracts structured intelligence: pain mentioned, competitors named, outcome stakeholders, objections raised, sequence pricing, and verbatim phrasing. Adds a 2-bullet summary card for the next mentioned, and verbatim attendee. AE inherits the data on the next-day check-in note.',
        outputs: ['Structured meeting brief', 'Objection list', 'Stakeholder map update'],
      },
      {
        name: 'Deal Momentum Agent',
        model: 'Opus 4 · Tier 1',
        description:
          'Tracks every post-meeting moment. Listens to the AE\'s state, based on meeting context. The agent does not send/draft. It generates 7–14 day follow-up timelines depending on stakeholder cycle. Pushes a WhatsApp template or email follow-up when the meeting opportunity needs to drop. AE controls all outbound, but never misses a window.',
        outputs: ['7-day post-meeting plan', 'Follow-up timeline', 'AE nudges'],
      },
    ],
  },
  {
    num: '06',
    label: 'Learning · The Compounding Moat',
    title: 'The agents that make every future campaign better',
    icon: RotateCw,
    agents: [
      {
        name: 'Targeting Feedback Agent',
        model: 'Opus 4 · Nightly Cron',
        description:
          'Continuously analyzes campaign, meeting, and deal data to surface patterns that should change targeting, messaging, or content. Routes recommendations to Content Agent, Research Agent, and Stakeholder Mapping Agent. Patterns are stored in Project Memory so every future client starts from this lesson, not the previous 17.',
        outputs: ['Nightly insight feed', 'Suggested prompt updates', 'New variant briefs'],
      },
      {
        name: 'Repository Agent',
        model: 'Opus 4 · Quarterly Cron',
        description:
          'Promotes patterns from individual client Project Memories to the Cross-Client Repository when they appear across 3+ clients. Maintains anonymization. The Repository is what makes Thyleads compounding — every new client benefits from everything the system has learned across past campaigns, in the prevailing 17 months.',
        outputs: ['Repository merges', 'Promoted insights', 'Cross-vertical patterns'],
      },
    ],
  },
];

export default function AgentsSpecifications() {
  const [openIndex, setOpenIndex] = useState<number>(0);

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
        className="relative z-10 max-w-5xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-700">
              Agent Specifications
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.4] text-neutral-900"
          >
            What each agent{' '}
            <span className="text-primary-700 bg-primary-200/80 box-decoration-clone px-2 py-0.5 rounded-md">
              actually does.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            15 agents. Each with a single job, a model tier matched to the task,
            and a defined learning loop. Haiku handles high-volume
            classification cheaply. Opus handles judgment, generation, and
            synthesis.
          </motion.p>
        </div>

        <div className="space-y-3">
          {clusters.map((cluster, i) => {
            const isOpen = openIndex === i;
            return (
              <ClusterSection
                key={cluster.num}
                cluster={cluster}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? -1 : i)}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function ClusterSection({
  cluster,
  isOpen,
  onToggle,
}: {
  cluster: AgentCluster;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = cluster.icon;
  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-2xl border bg-white transition-all overflow-hidden ${
        isOpen
          ? 'border-primary-200 shadow-[0_24px_60px_-30px_rgba(132,92,245,0.32)]'
          : 'border-slate-200 hover:border-primary-200'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full gap-4 px-5 sm:px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-2xl"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isOpen
                ? 'bg-primary-700 text-white shadow-[0_8px_18px_-6px_rgba(132,92,245,0.55)]'
                : 'bg-primary-50 border border-primary-100 text-primary-700'
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
              Cluster {cluster.num} · {cluster.label}
            </div>
            <div className="mt-0.5 text-[15px] font-extrabold text-neutral-900 leading-snug tracking-tight truncate">
              {cluster.title}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.14em]">
            {cluster.agents.length} {cluster.agents.length === 1 ? 'agent' : 'agents'}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isOpen
                ? 'bg-primary-700 text-white rotate-180'
                : 'bg-primary-50 text-primary-700 border border-primary-100'
            }`}
          >
            <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="agents"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cluster.agents.map(a => (
                  <article
                    key={a.name}
                    className="relative rounded-xl bg-gradient-to-br from-primary-50/70 via-primary-50/30 to-white border border-primary-100 p-4 sm:p-5 overflow-hidden"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[14px] font-extrabold text-neutral-900 tracking-tight">
                        {a.name}
                      </h4>
                    </div>
                    <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-md bg-primary-700 text-white text-[9.5px] font-bold uppercase tracking-[0.14em]">
                      {a.model}
                    </div>
                    <p className="mt-3 text-[12.5px] text-slate-600 leading-relaxed">
                      {a.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {a.outputs.map(o => (
                        <span
                          key={o}
                          className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-primary-200 text-primary-700 text-[10px] font-semibold"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
