"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useAnimationFrame
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Cpu,
  MessageCircle,
  Radar,
  Users,
  Activity,
  Zap,
  BarChart3,
  Search,
  Lock,
  Database,
  Filter,
  Layers,
  ArrowDown,
  Target,
  Sparkles,
  UserRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const systemStages = [
  {
    title: "Signal Capture",
    description: "Identify high-intent buyers before they raise a hand",
  },
  {
    title: "Intake & Qualification Engine",
    description: "Filter noise. Focus only on real opportunities",
  },
  {
    title: "Conversation Activation",
    description: "Start relevant, personalized outreach across channels",
  },
  {
    title: "Sales-Ready Meetings",
    description: "Only qualified conversations reach your calendar",
  },
  {
    title: "Deal Momentum",
    description:
      "Follow-ups, nudges, and stakeholder alignment to move deals forward",
  },
];

const weeklyTimeline = [
  {
    title: "Week 1 — Foundation & Intake Engine Setup",
    subtitle: "Signals → Intake & Qualification",
    goal: "Build a Zero-Waste intake engine. In Week 1, we design the technical and strategic base of your campaign.",
    whatWeDo: [
      "Blueprinting: Defining ICP, persona nuances, and success benchmarks",
      "Omni-channel approach (Email, LinkedIn, Calls, etc.)",
      "Competitor & account-based targeting analysis",
      "CRM integration & automation workflows",
      "Domain setup + deliverability configuration",
      "Initiating a 3-week email warm-up",
      "Intake Engine configuration: Intent rules, ICP filters, Fit & priority scoring"
    ],
    whatYouDo: [
      "Submit onboarding questionnaire",
      "Share sales collateral & calendars",
      "Align on success metrics"
    ],
    outcome: "A fully synchronized CRM and a hardened domain infrastructure ready for high-deliverability outreach.",
  },
  {
    title: "Week 2 — Data Intelligence & Outreach Preparation",
    subtitle: "Intake Engine → Outreach Activation",
    goal: "Turning data into high-relevance messaging. Standard templates are ignored. We use account-based data scraping and AI-fueled personalization to ensure every touchpoint feels 1-to-1.",
    whatWeDo: [
      "Monitor real buying signals: Website visitors, New hires & job posts, Funding rounds, Expansion news, Competitor engagement",
      "Aggregating raw intelligence from company websites, published articles, and prospect LinkedIn profiles",
      "ICP-based data scraping & enrichment",
      "Intent scoring & account prioritization",
      "Buyer & account context mapping",
      "Messaging creation: Email sequences, LinkedIn flows, Call talk tracks",
      "Using these signals to fuel hyper-personalised AI-powered outreach",
      "A/B testing framework creation",
      "LinkedIn & email automation testing",
      "Continue email warm-up"
    ],
    whatYouDo: [
      "Review & approve: Targeting logic",
      "Review & approve: Lead segments",
      "Review & approve: Messaging frameworks"
    ],
    outcome: "A library of A/B tested, high-intent sequences across all primary channels.",
  },
  {
    title: "Week 3 — Campaign Launch & Conversation Generation",
    subtitle: "Outreach → Sales-Ready Conversations",
    goal: "Aggressive, multi-channel engagement.",
    whatWeDo: [
      "Launch multi-channel outreach",
      "Monitor replies, bounces & engagement",
      "Daily optimisation of: Copy, Timing, Channel mix",
      "Appointment booking & reminders",
      "No-show handling workflows",
      "Warm transfer to AEs with context",
      "Complete email warm-up"
    ],
    whatYouDo: [
      "Join quick alignment check-ins",
      "Share feedback on meeting quality"
    ],
    outcome: "A consistent flow of high-value meetings appearing directly on your calendar.",
  },
  {
    title: "Week 4 — Review, Optimisation & Scaling",
    subtitle: "Post-Demo Momentum + Reporting",
    goal: "Optimizing for ROI and expanding the pipeline.",
    whatWeDo: [
      "Activate Post-Demo Momentum: Stakeholder nurture starts the moment a call ends",
      "Weekly performance review & Funnel analysis",
      "Identify high-performing segments & messages",
      "Optimise subject lines, hooks & scripts",
      "Safely increase sending volumes",
      "Align LinkedIn posting with DM outreach",
      "Activate post-demo momentum workflows: Follow-ups, 2nd & 3rd meeting coordination, Multi-threading"
    ],
    whatYouDo: [
      "Share AE feedback on call quality",
      "Align on scaling priorities"
    ],
    outcome: "A predictable, scalable revenue engine that matures and improves every week.",
  },
];

const signalIntelligence = [
  {
    name: "The Mirror (Look-Alikes)",
    reason: "We study your best customers and go looking for their twins. With that, we replicate your past successes with them",
    icon: Zap
  },
  {
    name: "The Alumni (Past Champions)",
    reason: "When a champion leaves one organization for another, the door is already open. We track your fans as they change roles, turning their career growth into your expansion.",
    icon: Users
  },
  {
    name: "The Semantic Pulse (Keywords)",
    reason: "We tune in to the online discourse. By identifying individuals engaging with specific topics on LinkedIn and X, we find the people who are currently vocalizing their pain points.",
    icon: Cpu
  },
  {
    name: "The Ad-Spenders (B2B2C)",
    reason: "We identify companies aggressively spending on Meta/Instagram. If they are investing in growth, they are primed for tools that optimize that spend or handle the resulting scale.",
    icon: Radar
  },
  {
    name: "The Momentum Trigger (News/RSS)",
    reason: "Funding rounds, new store launches, and expansions aren't just news; they are Capacity Gaps. We strike when a company has the budget and the immediate need to scale.",
    icon: Users
  },
  {
    name: "The Hiring Signal (Job Postings)",
    reason: "A job post is a public admission of a problem. If they are hiring for a role your software replaces or augments, we present your solution as the faster, more scalable hire.",
    icon: Activity
  },
  {
    name: "The Fresh Start (Job Changes)",
    reason: "New leaders have the 90-Day Mandate to make an impact. We catch them in their first weeks, before they’ve settled for the status quo or locked in a competitor.",
    icon: BarChart3
  },
  {
    name: "The Rivalry (Competitor Engagement)",
    reason: "We monitor your competitors' social feeds. When a lead engages with their content, they are officially in-market. We ensure your brand is the alternative they see next.",
    icon: Search
  },
  {
    name: "The Ecosystem (Indirect Competitors)",
    reason: "We identify leads buying from Adjacent services, tools that serve the same ICP but don't compete with you. This creates a high-relevance, collaborative entry point.",
    icon: MessageCircle
  },
  {
    name: "The Gathering (Event Attendees)",
    reason: "Digital and physical events are high-intent hubs. We connect the gap between just attending and actively solving, engaging prospects while the event themes are still top-of-mind.",
    icon: Lock
  },
  {
    name: "The Digital Footprint (Website Visitors)",
    reason: "When an account visits your site, they’ve already self-identified. We de-anonymize that traffic and route the high-value intent directly to GTM Engineers for immediate activation.",
    icon: Activity
  },
];

type HumanLayerCard = {
    title: string;
    tagline: string;
    quote: string;
    subheader: string;
    items: string[];
    numbered: boolean;
};

const humanLayerCards: HumanLayerCard[] = [
    {
        title: "Account Managers",
        tagline: "Dedicated to your success",
        quote:
            "Dedicated Account Manager trained on your product, ICP and sales motion. They keep momentum alive so your AEs focus on closing.",
        subheader: "Their Mandate Spans",
        items: [
            "Owning and qualifying every positive response",
            "Pre-qualifying leads for fit and urgency",
            "Sharing structured notes before meetings",
            "Managing all scheduling and rescheduling",
            "Handling objections with context-aware responses",
        ],
        numbered: true,
    },
    {
        title: "GTM Engineers",
        tagline: "Instead of SDRs",
        quote:
            "They understand SaaS deeply enough to know why a deal should exist, not just how to book one.",
        subheader: "What They Do Inside Your GTM",
        items: [
            "Decoding ICP pain, not just personas",
            "Signal precision over noise",
            "AI as precision instrument",
            "Account-level workflows",
        ],
        numbered: true,
    },
    {
        title: "Content Researchers",
        tagline: "Strategic messaging",
        quote:
            "They write the messaging that bypasses the C-suite’s sales filters and triggers internal consensus.",
        subheader: "How they Write",
        items: [
            "Intelligence-led ICP research",
            "LinkedIn-native personalization",
            "Proof-backed ROI narratives",
        ],
        numbered: false,
    },
];

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,_rgba(99,102,241,0.14),transparent_50%),linear-gradient(180deg,_#ffffff_0%,_#faf8ff_45%,_#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_120deg_at_60%_40%,_rgba(168,85,247,0.10),_rgba(99,102,241,0.08),_transparent_60%)] opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(132,92,245,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(132,92,245,0.06)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} seed={i} delay={i * 0.2} />
        ))}
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-5xl text-center">

        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
          <span className="block text-neutral-900">How we build</span>
          <span className="relative inline-block px-4 py-1 mt-2">
            <motion.span
              aria-hidden="true"
              variants={highlightVariants}
              className="absolute inset-0 bg-primary-200/80 rounded-md origin-left"
            />
            <span className="relative text-primary-700">
              Predictable Pipeline
            </span>
          </span>
          <span className="block text-neutral-900 mt-2">for SaaS Companies</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          For SaaS teams who rely on revenue mobility, we developed a reliable system that turns cold outbound into qualified pipeline in weeks, not quarters.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="/contact"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary-700 px-8 font-medium text-white transition-all hover:bg-primary-800 hover:scale-105 shadow-[0_18px_40px_-14px_rgba(132,92,245,0.55)]"
          >
            <span className="mr-2 uppercase tracking-widest text-xs font-bold">Book a Meeting</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 transition-opacity group-hover:opacity-10" />
          </a>
          <a href="#system" className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-600 hover:text-neutral-900 transition-colors">
            See the Process <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FloatingParticle = ({ delay, seed }: { delay: number; seed: number }) => {
    const seededRandom = (value: number) => {
        const next = (value * 9301 + 49297) % 233280;
        return next / 233280;
    };
    const { randomX, randomY, duration } = useMemo(() => {
        const x = seededRandom(seed + 1) * 100;
        const y = seededRandom(seed + 2) * 100;
        const d = 10 + seededRandom(seed + 3) * 20;
        return {
            randomX: Number(x.toFixed(3)),
            randomY: Number(y.toFixed(3)),
            duration: Number(d.toFixed(3)),
        };
    }, [seed]);

    return (
        <motion.div
            className="absolute w-1 h-1 bg-slate-100 rounded-full"
            initial={{ x: `${randomX}vw`, y: `${randomY}vh`, opacity: 0 }}
            animate={{
                y: [`${randomY}vh`, `${randomY - 20}vh`],
                opacity: [0, 0.5, 0]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
        />
    )
}

const SystemLayerSection = () => {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: true });

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % systemStages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <motion.section
      id="system"
      ref={sectionRef}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="relative py-16 lg:py-20 px-6"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.45fr] gap-10 lg:gap-12 items-center">
            <motion.div variants={staggerContainer} className="relative z-10">
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-primary-500" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-700">Layer 1</p>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-neutral-900">
                    From{' '}
                    <span className="relative inline-block px-2 py-0.5">
                        <motion.span
                            aria-hidden="true"
                            variants={highlightVariants}
                            className="absolute inset-0 bg-primary-200/80 rounded-md origin-left"
                        />
                        <span className="relative text-primary-700">
                            Signal to Revenue
                        </span>
                    </span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-slate-600 text-base leading-relaxed mb-6">
                    Every deal starts as a signal. We catch the signal, qualify the buyer, and keep the deal moving until it closes.
                </motion.p>

                <motion.div variants={fadeUp} className="space-y-1">
                    {systemStages.map((stage, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`flex items-start gap-3 px-3.5 py-2.5 rounded-xl bg-white border transition-all duration-500 ${
                                    activeStage === index
                                        ? "border-primary-200 shadow-[0_14px_36px_-20px_rgba(132,92,245,0.40)] -translate-y-0.5"
                                        : "border-slate-200"
                                }`}
                            >
                                <div
                                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white transition-all ${
                                        activeStage === index
                                            ? "bg-primary-700 shadow-[0_5px_14px_-3px_rgba(132,92,245,0.55)] scale-105"
                                            : "bg-primary-600"
                                    }`}
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className={`text-[13px] font-bold leading-tight transition-colors ${
                                            activeStage === index
                                                ? "text-primary-700"
                                                : "text-neutral-900"
                                        }`}
                                    >
                                        {stage.title}
                                    </h3>
                                    <p className="mt-0.5 text-[12px] text-slate-600 leading-snug">
                                        {stage.description}
                                    </p>
                                </div>
                            </div>
                            {index < systemStages.length - 1 && (
                                <div
                                    className="flex justify-center py-0.5"
                                    aria-hidden="true"
                                >
                                    <ArrowDown
                                        className={`w-3.5 h-3.5 transition-colors ${
                                            activeStage === index
                                                ? "text-primary-600"
                                                : "text-primary-300"
                                        }`}
                                        strokeWidth={2.5}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                variants={fadeUp}
                className="relative aspect-[4/3] rounded-3xl border border-slate-200 bg-white overflow-hidden flex flex-col shadow-2xl"
            >
                <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                        SYS.MONITOR.V2
                    </div>
                </div>

                <div className="relative flex-1 bg-gradient-to-br from-white via-primary-50/40 to-white">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(132,92,245,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(132,92,245,0.06)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,92,245,0.18),transparent_70%)]" />

                    <div className="absolute inset-0 w-full h-full">

                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                            <ConnectionPath d="M 90 100 C 180 100, 180 200, 300 200" active={activeStage <= 1} />
                            <ConnectionPath d="M 90 300 C 180 300, 180 200, 300 200" active={activeStage <= 1} delay={0.1} />

                            <ConnectionPath d="M 300 200 C 300 160, 300 100, 300 90" active={activeStage >= 1 && activeStage <= 3} />
                            <ConnectionPath d="M 300 200 C 300 240, 300 300, 300 310" active={activeStage >= 1 && activeStage <= 3} />

                            <ConnectionPath d="M 300 200 C 420 200, 420 100, 510 100" active={activeStage >= 3} color="#5b34d9" />
                            <ConnectionPath d="M 300 200 C 420 200, 420 300, 510 300" active={activeStage >= 4} color="#5b34d9" />
                        </svg>

                        <div className="absolute top-[25%] left-[15%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Signal" icon={Radar} active={activeStage === 0} success={undefined} compact={undefined} />
                        </div>
                        <div className="absolute top-[75%] left-[15%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Data" icon={Database} active={activeStage === 0 || activeStage === 1} success={undefined} compact={undefined} />
                        </div>

                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className={`absolute inset-[-40px] rounded-full border border-dashed transition-colors duration-500 ${activeStage >= 1 && activeStage <= 4 ? "border-primary-500/40" : "border-slate-200"}`}
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className={`absolute inset-[-25px] rounded-full border border-dotted transition-colors duration-500 ${activeStage >= 1 && activeStage <= 4 ? "border-primary-300/60" : "border-slate-200"}`}
                                />
                                <div className="h-24 w-24 rounded-full bg-white border border-primary-200 flex items-center justify-center shadow-[0_18px_44px_-18px_rgba(132,92,245,0.45)] relative z-20">
                                    <div className={`absolute inset-0 rounded-full bg-primary-300/30 blur-xl transition-opacity duration-300 ${activeStage >= 1 && activeStage <= 4 ? "opacity-100" : "opacity-0"}`} />
                                    <Cpu className={`w-8 h-8 transition-all duration-300 ${activeStage >= 1 && activeStage <= 4 ? "text-primary-700 drop-shadow-[0_0_10px_rgba(132,92,245,0.55)]" : "text-slate-300"}`} />
                                    {activeStage >= 1 && activeStage <= 4 && (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 rounded-full"
                                        >
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_10px_rgba(132,92,245,0.9)]" />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[18%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Filter" icon={Filter} active={activeStage >= 1 && activeStage <= 3} compact success={undefined} />
                        </div>
                        <div className="absolute top-[82%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Enrich" icon={Layers} active={activeStage >= 1 && activeStage <= 3} compact success={undefined} />
                        </div>

                        <div className="absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2">
                             <SystemNode label="Meeting" icon={CheckCircle2} active={activeStage >= 3} success compact={undefined} />
                        </div>
                        <div className="absolute top-[75%] left-[85%] -translate-x-1/2 -translate-y-1/2">
                             <SystemNode label="Revenue" icon={BarChart3} active={activeStage >= 4} success compact={undefined} />
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ConnectionPath = ({
  d,
  active,
  delay = 0,
  color = "#7c3aed",
}: {
  d: string;
  active: boolean;
  delay?: number;
  color?: string;
}) => (
    <>
        <path d={d} stroke="rgba(132,92,245,0.14)" strokeWidth="2" fill="none" />
        <motion.path
            d={d}
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: active ? 1 : 0,
                opacity: active ? 1 : 0
            }}
            transition={{ duration: 1, ease: "easeInOut", delay }}
        />
    </>
)

const SystemNode = ({
  label,
  active,
  icon: Icon,
  success,
  compact,
}: {
  label: string;
  active: boolean;
  icon?: React.ElementType;
  success?: boolean;
  compact?: boolean;
}) => (
    <motion.div
        animate={{
            borderColor: active
                ? (success ? "rgba(91, 52, 217, 0.55)" : "rgba(132, 92, 245, 0.45)")
                : "rgba(132, 92, 245, 0.18)",
            backgroundColor: active
                ? (success ? "rgba(243, 240, 255, 0.95)" : "rgba(255, 255, 255, 0.98)")
                : "rgba(255, 255, 255, 0.92)",
            scale: active ? 1.05 : 1,
            boxShadow: active
                ? (success
                    ? "0 14px 30px -14px rgba(91, 52, 217, 0.45)"
                    : "0 14px 30px -14px rgba(132, 92, 245, 0.40)")
                : "0 2px 8px -4px rgba(15, 23, 42, 0.08)"
        }}
        className={`relative ${compact ? "px-4 py-2" : "px-5 py-4"} rounded-lg border backdrop-blur-sm flex items-center gap-3 transition-all duration-500 z-20 min-w-[120px] justify-center whitespace-nowrap`}
    >
        {Icon && <Icon className={`w-4 h-4 ${active ? (success ? "text-primary-700" : "text-primary-600") : "text-slate-400"}`} />}
        <span className={`text-[11px] uppercase tracking-wider font-bold ${active ? (success ? "text-primary-800" : "text-primary-700") : "text-slate-500"}`}>{label}</span>

        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${active ? (success ? "border-primary-700" : "border-primary-500") : "border-transparent"} rounded-tl-sm transition-colors duration-500`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${active ? (success ? "border-primary-700" : "border-primary-500") : "border-transparent"} rounded-br-sm transition-colors duration-500`} />
    </motion.div>
)

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentWeek = weeklyTimeline[activeIndex];
  const execBrief = currentWeek.whatWeDo;
  const youBrief = currentWeek.whatYouDo;

  return (
    <section className="relative py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-700 mb-4">Layer 2</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            4 Weeks to{' '}
            <span className="relative inline-block px-3 py-1">
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-primary-200/80 rounded-md origin-left"
              />
              <span className="relative text-primary-700">Velocity</span>
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-5 h-full">
                <ol className="flex flex-col h-full gap-3">
                    {weeklyTimeline.map((week, index) => {
                        const isActive = activeIndex === index;
                        const isPast = activeIndex > index;
                        return (
                            <li
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`group cursor-pointer relative flex-1 flex items-center gap-5 rounded-2xl border bg-white px-6 transition-all duration-300 overflow-hidden ${
                                    isActive
                                        ? "border-primary-300 shadow-[0_18px_44px_-22px_rgba(132,92,245,0.45)]"
                                        : "border-slate-200 hover:border-primary-200 hover:shadow-[0_14px_36px_-22px_rgba(132,92,245,0.28)]"
                                }`}
                            >

                                <span
                                    aria-hidden="true"
                                    className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-all ${
                                        isActive
                                            ? "bg-gradient-to-b from-primary-500 to-primary-700 opacity-100"
                                            : "bg-primary-200 opacity-0 group-hover:opacity-100"
                                    }`}
                                />

                                <div className="relative shrink-0">
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -inset-1.5 rounded-full bg-primary-300/35 blur-md transition-opacity ${
                                            isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                    <div
                                        className={`relative flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-extrabold transition-all ${
                                            isActive
                                                ? "bg-gradient-to-br from-primary-600 to-primary-800 text-white ring-4 ring-primary-100 scale-105"
                                                : isPast
                                                    ? "bg-primary-100 text-primary-700 ring-2 ring-primary-100"
                                                    : "bg-primary-50 text-primary-700 border border-primary-100 group-hover:bg-primary-100"
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                </div>

                                <h3
                                    className={`flex-1 min-w-0 font-bold text-[15px] lg:text-base leading-snug tracking-tight transition-colors ${
                                        isActive
                                            ? "text-primary-700"
                                            : "text-neutral-900 group-hover:text-primary-700"
                                    }`}
                                >
                                    {week.title}
                                </h3>

                                <ArrowRight
                                    aria-hidden="true"
                                    className={`shrink-0 w-4 h-4 transition-all ${
                                        isActive
                                            ? "text-primary-700 translate-x-0 opacity-100"
                                            : "text-primary-400 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                    }`}
                                    strokeWidth={2.5}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>

            <div className="lg:col-span-7 h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative h-full flex flex-col rounded-3xl border border-slate-200 bg-white shadow-[0_28px_70px_-32px_rgba(132,92,245,0.22)] overflow-hidden"
                    >

                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" aria-hidden="true" />

                        <div
                            aria-hidden="true"
                            className="absolute -top-2 -right-2 w-40 h-40 opacity-60 pointer-events-none"
                            style={{
                                backgroundImage:
                                    'radial-gradient(rgba(132,92,245,0.18) 1px, transparent 1px)',
                                backgroundSize: '14px 14px',
                                mask: 'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
                                WebkitMask:
                                    'radial-gradient(ellipse 80% 80% at top right, black 20%, transparent 70%)',
                            }}
                        />

                        <div className="relative p-6 lg:p-7 flex-1 flex flex-col min-h-0">

                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
                                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-600" />
                                    </span>
                                    Week {String(activeIndex + 1).padStart(2, '0')}
                                </div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                    {currentWeek.subtitle}
                                </div>
                            </div>

                            <h3 className="text-xl lg:text-[24px] font-extrabold tracking-tight leading-[1.2] text-neutral-900">
                                {currentWeek.title.replace(/^Week\s*\d+\s*[—–-]\s*/i, '')}
                            </h3>

                            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                            <div className="mb-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700">
                                        <UserRound className="w-3 h-3" strokeWidth={2.5} />
                                    </span>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
                                        What you do
                                    </h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {youBrief.map((item, i) => (
                                        <motion.div
                                            key={`you-${activeIndex}-${i}`}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.12 + i * 0.05,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-slate-200 text-[11.5px] text-slate-700 font-medium"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="w-1 h-1 rounded-full bg-primary-500 shrink-0"
                                            />
                                            <span>{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-md bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700">
                                        <Sparkles className="w-3 h-3" strokeWidth={2.5} fill="currentColor" />
                                    </span>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700">
                                        What Thyleads does
                                    </h4>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {execBrief.map((item, i) => (
                                        <motion.div
                                            key={`we-${activeIndex}-${i}`}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.2 + i * 0.04,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="inline-flex items-start gap-2 px-3 py-2 rounded-lg bg-white border border-primary-100 text-[12px] text-slate-700 leading-snug"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-0.5 shrink-0 w-3.5 h-3.5 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-primary-600" />
                                            </span>
                                            <span>{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative mx-6 lg:mx-7 mb-6 lg:mb-7 rounded-xl bg-primary-50/70 border border-primary-200 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="shrink-0 w-9 h-9 rounded-lg bg-white border border-primary-200 flex items-center justify-center text-primary-700 shadow-[0_4px_10px_-4px_rgba(132,92,245,0.30)]">
                                    <Target className="w-4 h-4" strokeWidth={2.5} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-0.5">
                                        Target Outcome
                                    </h4>
                                    <p className="text-[12.5px] text-slate-700 font-medium leading-snug">
                                        {currentWeek.outcome}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
};

const Layer2CTASection = () => (
    <section className="relative py-20 lg:py-28 px-6 sm:px-12 overflow-hidden bg-primary-700 font-sans">

        <div
            aria-hidden="true"
            className="absolute -top-40 left-1/4 w-160 h-160 rounded-full bg-primary-500/40 blur-3xl pointer-events-none"
        />
        <div
            aria-hidden="true"
            className="absolute -bottom-40 right-1/4 w-160 h-160 rounded-full bg-primary-800/50 blur-3xl pointer-events-none"
        />

        <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
                backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
                mask:
                    'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
                WebkitMask:
                    'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
            }}
        />

        <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] h-56 bg-white/10 blur-3xl pointer-events-none"
        />

        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="relative z-10 max-w-4xl mx-auto text-center"
        >
            <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-[-0.02em] leading-[1.08] text-white"
            >
                Start building your pipeline in just{' '}
                <span className="text-primary-100">4 weeks.</span>
            </motion.h2>

            <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <a
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-primary-50 text-primary-700 text-base font-bold shadow-[0_18px_40px_-14px_rgba(0,0,0,0.35)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-700"
                >
                    Book a Meeting
                    <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                        strokeWidth={2.5}
                    />
                </a>
            </motion.div>
        </motion.div>
    </section>
);

const DealAssistSection = () => {
    const features = [
        {
            title: "Rapport-first connections",
            description: "We connect right after the demo, while context is fresh."
        },
        {
            title: "Echo-chamber content",
            description: "We publish content around your prospect's problems, so you stay top-of-mind."
        },
        {
            title: "High value engagement",
            description: "We engage with thoughtful comments that signal real intent, not empty likes."
        },
        {
            title: "Intentional presence",
            description: "We use subtle interactions to stay visible without feeling pushy."
        },
        {
            title: "Multi-node visibility",
            description: "You show up across channels, not only in the inbox."
        }
    ];

    return (
        <section id="deal-assist" className="py-24 px-6 overflow-hidden scroll-mt-28">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                        Deal Assist {" "}
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-slate-600 text-base mb-6 leading-relaxed">
                        Open enterprise deals stall when prospects stop seeing you. Deal Assist keeps you visible across LinkedIn and their news feed until they close.
                    </motion.p>
                    <motion.ul variants={fadeUp} className="space-y-4">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <span className="text-neutral-900 font-medium block">{feature.title}</span>
                                    <span className="text-slate-500 text-sm">{feature.description}</span>
                                </div>
                            </li>
                        ))}
                    </motion.ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -inset-8 bg-blue-500/20 blur-[60px] rounded-full opacity-30" />

                    <div className="relative bg-white border border-slate-200 rounded-xl shadow-2xl max-w-md mx-auto overflow-hidden">
                         <div className="p-4 pb-3">
                             <div className="flex gap-3">
                                 <div className="relative">
                                     <img
                                         src="/images/ss.png"
                                         alt="Rahul Dev"
                                         className="w-12 h-12 rounded-full object-cover"
                                     />
                                     <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#C4A052] rounded-[4px] border-2 border-white flex items-center justify-center">
                                         <span className="text-white font-bold text-[15px] leading-none">in</span>
                                     </div>
                                 </div>

                                 <div className="flex-1">
                                     <div className="flex items-center gap-2">
                                         <span className="text-neutral-900 font-semibold text-sm">Rahul Dev</span>
                                         <span className="text-slate-500 text-xs">• 1st</span>
                                     </div>
                                     <p className="text-slate-500 text-xs leading-tight">CEO at Thyleads • GTM for SaaS</p>
                                     <div className="flex items-center gap-1 mt-0.5">
                                         <span className="text-slate-500 text-xs">2h</span>
                                         <span className="text-slate-500 text-xs">•</span>
                                         <svg className="w-3 h-3 text-slate-500" fill="currentColor" viewBox="0 0 16 16">
                                             <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 11V5l5 3-5 3z"/>
                                         </svg>
                                     </div>
                                 </div>

                                 <button className="text-slate-500 hover:text-slate-600 self-start">
                                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                         <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                     </svg>
                                 </button>
                             </div>
                         </div>

                         <div className="px-4 pb-3">
                             <p className="text-slate-900 text-sm leading-relaxed">
                                 <span className="text-neutral-900">3 things I learned scaling from $1M to $10M ARR:</span>
                                 <br/><br/>
                                 1️⃣ Outbound isn&apos;t dead—your targeting is<br/>
                                 2️⃣ AE time is your scarcest resource<br/>
                                 3️⃣ Intent signals beat spray-and-pray
                                 <br/><br/>
                                 <span className="text-primary-600">#SaaS #B2BSales #GrowthStrategy</span>
                             </p>
                         </div>

                         <div className="mx-4 mb-3 rounded-lg overflow-hidden border border-slate-200">
                             <div className="aspect-[1.91/1] bg-gradient-to-br from-primary-100 via-primary-50 to-primary-100 flex items-center justify-center relative">
                                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%)] bg-[length:20px_20px]" />
                                 <div className="text-center z-10">
                                     <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-slate-100 backdrop-blur-sm flex items-center justify-center">
                                         <BarChart3 className="w-8 h-8 text-blue-400" />
                                     </div>
                                     <span className="text-slate-700 text-sm font-medium">The Revenue Playbook 2024</span>
                                 </div>
                             </div>
                             <div className="bg-slate-50 p-3">
                                 <p className="text-slate-600 text-xs mb-1">thyleads.com</p>
                                 <p className="text-slate-900 text-sm font-medium leading-tight">How Top SaaS Companies Scale Pipeline Without Adding Headcount</p>
                             </div>
                         </div>

                         <div className="px-4 py-3 flex items-center justify-between text-xs text-slate-500">
                             <div className="flex items-center gap-2">
                                 <div className="flex -space-x-1">
                                     <div className="w-5 h-5 rounded-full bg-[#0A66C2] flex items-center justify-center border border-white">
                                         <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                             <path d="M2 8.5c0-3.5 2.9-6.5 6.5-6.5 2.5 0 4.6 1.3 5.5 3.2.9-1.9 3-3.2 5.5-3.2 3.6 0 6.5 3 6.5 6.5 0 4.6-5.1 8.5-12 14.5-6.9-6-12-9.9-12-14.5z"/>
                                         </svg>
                                     </div>
                                     <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border border-white">
                                         <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                         </svg>
                                     </div>
                                     <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center border border-white">
                                         <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                             <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM10 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/>
                                         </svg>
                                     </div>
                                 </div>
                                 <span>247</span>
                             </div>
                             <div className="flex items-center gap-3">
                                 <span>38 comments</span>
                                 <span>•</span>
                                 <span>12 reposts</span>
                             </div>
                         </div>

                         <div className="border-t border-slate-200 px-2 py-1 flex justify-between">
                             {[
                                 { icon: "M19.46 11l-3.91-3.91a7 7 0 1 0-1.69 1.69L17.87 13H19z", label: "Like", offset: "translate(0, 8)" },
                                 { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", label: "Comment", offset: "" },
                                 { icon: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3", label: "Repost", offset: "" },
                                 { icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z", label: "Send", offset: "" }
                             ].map((action, i) => (
                                 <button key={i} className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} transform={action.offset}/>
                                     </svg>
                                     <span className="text-xs font-medium hidden sm:inline">{action.label}</span>
                                 </button>
                             ))}
                         </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

const SignalIntelligenceSection = () => {
    const [paused, setPaused] = useState(false);
    const [activeSignal, setActiveSignal] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const radius = 220;
    const [rotation, setRotation] = useState(0);
    const [innerRingRotation, setInnerRingRotation] = useState(0);
    const [outerRingRotation, setOuterRingRotation] = useState(0);

    useAnimationFrame((_, delta) => {
      if (!paused) {
        setRotation(prev => (prev + (delta * 0.008)) % 360);
        setInnerRingRotation(prev => (prev + (delta * 0.005)) % 360);
        setOuterRingRotation(prev => (prev - (delta * 0.003)) % 360);
      }
    });

    useEffect(() => {
      if (paused) return;
      const interval = setInterval(() => {
        setActiveSignal(prev => (prev + 1) % signalIntelligence.length);
      }, 8000);
      return () => clearInterval(interval);
    }, [paused]);

    const active = signalIntelligence[activeSignal];

    return (
      <section className="relative py-16 md:py-20 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <div className="lg:hidden max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 mb-4">Signal Intelligence</p>
            <h2 className="text-3xl font-bold mb-4">We track 11 buying signals before we send a single email.</h2>
            <p className="text-slate-600 text-sm">
              You only hear from us about accounts that are in-market today, not accounts that match your ICP on paper.
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 via-white to-primary-50 border-2 border-indigo-500/50 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(129,140,248,0.3)]">
              <span className="text-xl font-bold text-neutral-900">ICP</span>
              <span className="text-[8px] uppercase tracking-widest text-indigo-400">Core</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {signalIntelligence.map((signal, index) => {
              const isActive = index === activeSignal;
              return (
                <button
                  key={index}
                  onClick={() => { setActiveSignal(index); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
                  className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_20px_rgba(129,140,248,0.3)]'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-50 text-slate-500'
                  }`}>
                    <signal.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-medium text-center leading-tight transition-colors ${
                    isActive ? 'text-neutral-900' : 'text-slate-500'
                  }`}>
                    {signal.name}
                  </span>
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-50 border border-indigo-500/30 p-5 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <active.icon className="w-20 h-20 text-neutral-900" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <active.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-base font-semibold">{active.name}</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  {active.reason}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full text-[9px] uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-500">High Intent</span>
                  <span className="px-2 py-1 rounded-full text-[9px] uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-500">Real-time</span>
                </div>
              </div>
              {paused && (
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-1 bg-indigo-500 rounded-b-2xl"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:grid max-w-7xl mx-auto lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
            <div className="relative h-[520px] flex items-center justify-center will-change-transform">
                <div className="absolute w-[550px] h-[550px] rounded-full bg-indigo-500/5 blur-[80px]" />

                <div
                    className="absolute w-[520px] h-[520px] rounded-full will-change-transform"
                    style={{ transform: `rotate(${outerRingRotation}deg) translateZ(0)` }}
                >
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/40"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 45}deg) translateX(260px) translateY(-50%)`,
                            }}
                        />
                    ))}
                </div>

                <div
                    className="absolute w-[360px] h-[360px] rounded-full border-2 border-transparent will-change-transform"
                    style={{
                        transform: `rotate(${innerRingRotation}deg) translateZ(0)`,
                        background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(129,140,248,0.5), rgba(168,85,247,0.5), rgba(34,211,238,0.2)) border-box'
                    }}
                />

                <div className="absolute w-[440px] h-[440px] rounded-full border border-indigo-500/20 shadow-[0_0_30px_rgba(129,140,248,0.1)]" />

                <div
                    className="absolute w-[500px] h-[500px] rounded-full border border-slate-200 border-dashed will-change-transform"
                    style={{ transform: `rotate(${outerRingRotation * 0.5}deg) translateZ(0)` }}
                />

                <svg className="absolute w-[480px] h-[480px] will-change-transform" style={{ transform: `rotate(${rotation * 0.3}deg) translateZ(0)` }}>
                    <defs>
                        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                            <stop offset="50%" stopColor="rgba(129,140,248,0.5)" />
                            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                        </linearGradient>
                    </defs>
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#arcGradient)" strokeWidth="2" strokeDasharray="100 200" />
                </svg>

                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-primary-100 via-white to-primary-50 border-2 border-indigo-500/50 backdrop-blur-md z-20 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(129,140,248,0.3)]">
                    <div className="absolute inset-2 rounded-full border border-indigo-400/30" />
                    <span className="text-4xl font-bold text-neutral-900">ICP</span>
                    <span className="text-[11px] uppercase tracking-widest text-indigo-400 mt-1">Core</span>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-500 text-xs">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Click any signal to explore
                </div>

                <div className="absolute inset-0 z-30 will-change-transform" ref={containerRef}>
                    {signalIntelligence.map((signal, index) => {
                        const offsetAngle = (360 / signalIntelligence.length) * index;
                        const currentAngle = rotation + offsetAngle;
                        const radian = (currentAngle * Math.PI) / 180;

                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;

                        const isActive = index === activeSignal;

                        return (
                            <React.Fragment key={index}>
                                <div
                                    className={`absolute left-1/2 top-1/2 h-[1px] origin-left will-change-transform ${isActive ? "opacity-60" : "opacity-20"}`}
                                    style={{
                                        width: radius - 30,
                                        transform: `rotate(${currentAngle}deg) translateZ(0)`,
                                        background: isActive
                                            ? 'linear-gradient(90deg, rgba(129,140,248,0.5), rgba(129,140,248,0.1))'
                                            : 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)'
                                   }}
                                />

                                <button
                                    onClick={() => { setActiveSignal(index); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
                                    className={`absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 rounded-full border-2 flex items-center justify-center group cursor-pointer z-20 will-change-transform transition-all
                                        ${isActive
                                            ? "bg-gradient-to-br from-primary-500 to-primary-700 border-primary-300 shadow-[0_0_30px_rgba(132,92,245,0.55)] scale-110 z-30"
                                            : "bg-white border-slate-200 hover:border-primary-400 hover:bg-primary-50"
                                        }`}
                                    style={{
                                        transform: `translate(${x}px, ${y}px) translateZ(0)`
                                    }}
                                >
                                    <signal.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-700 group-hover:text-primary-700"}`} />

                                    <div className={`absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white border rounded-md text-[10px] whitespace-nowrap pointer-events-none font-bold tracking-wide transition-all
                                        ${isActive
                                            ? "opacity-100 border-primary-500 text-primary-700 shadow-[0_8px_22px_-8px_rgba(132,92,245,0.55)]"
                                            : "opacity-0 group-hover:opacity-100 border-primary-200 text-primary-700"
                                        }
                                    `}>
                                        {signal.name}
                                    </div>

                                    {isActive && (
                                        <span className="absolute inset-0 rounded-full border-2 border-primary-500 animate-ping opacity-40" style={{ animationDuration: '1.5s' }} />
                                    )}
                                </button>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-700 mb-4">Signal Intelligence</p>
                <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
                    We track 11 buying signals before we send a single email.
                </h2>
                <p className="text-slate-600 mb-6">
                    You only hear from us about accounts that are in-market today, not accounts that match your ICP on paper.
                </p>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.name}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="bg-slate-50 border border-slate-200 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden mb-6"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <active.icon className="w-24 h-24 text-neutral-900" />
                        </div>
                        <div className="relative z-10">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <active.icon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-semibold">{active.name}</h3>
                             </div>
                             <p className="text-base text-slate-700 leading-relaxed mb-4">
                                {active.reason}
                             </p>
                             <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-500">High Intent</span>
                                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-500">Real-time</span>
                             </div>
                        </div>
                        {paused && (
                             <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="absolute bottom-0 left-0 h-1 bg-indigo-500"
                             />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </section>
    );
};

const TeamSection = () => {
    return (
        <section id="human-layer" className="py-24 px-6 bg-white relative overflow-hidden scroll-mt-28">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />

            <div className="max-w-[1500px] mx-auto relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-700 mb-4">The Human Layer</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
                        Your Extended{' '}
                        <span className="relative inline-block px-3 py-1">
                            <motion.span
                                aria-hidden="true"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-primary-200/80 rounded-md origin-left"
                            />
                            <span className="relative text-primary-700">Revenue Team</span>
                        </span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        AI handles the volume. Our pod handles the strategy and the judgement calls.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-5">
                    {humanLayerCards.map((card, idx) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4 }}
                            className="group relative rounded-3xl bg-gradient-to-br from-primary-50/70 via-primary-50/40 to-white border border-primary-100 p-7 lg:p-8 transition-all hover:border-primary-300 hover:shadow-[0_22px_56px_-26px_rgba(132,92,245,0.40)] overflow-hidden"
                        >

                            <span
                                aria-hidden="true"
                                className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                            />

                            <h3 className="text-xl font-extrabold tracking-tight text-neutral-900">
                                {card.title}
                            </h3>
                            <p className="mt-1 text-[13px] font-bold text-primary-700">
                                {card.tagline}
                            </p>

                            <p className="mt-5 text-[14px] italic text-slate-600 leading-relaxed">
                                &ldquo;{card.quote}&rdquo;
                            </p>

                            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                            <h4 className="text-[13.5px] font-bold text-neutral-900 mb-3">
                                {card.subheader}
                            </h4>

                            <ul className="space-y-2">
                                {card.items.map((item, i) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 text-[13.5px] text-slate-700 leading-relaxed"
                                    >
                                        {card.numbered ? (
                                            <span className="shrink-0 font-bold text-primary-700 tabular-nums">
                                                {i + 1}.
                                            </span>
                                        ) : (
                                            <span
                                                aria-hidden="true"
                                                className="mt-[9px] w-1 h-1 rounded-full bg-primary-500 shrink-0"
                                            />
                                        )}
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCTASection = () => (
    <section className="py-20 lg:py-28 px-6 sm:px-12 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto">

            <div
                aria-hidden="true"
                className="absolute -inset-6 bg-primary-300/30 blur-3xl rounded-[40px] pointer-events-none"
            />

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-primary-50/60 to-primary-50 border border-primary-100 shadow-[0_30px_80px_-30px_rgba(132,92,245,0.30)]">

                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-50 pointer-events-none"
                    style={{
                        backgroundImage:
                            'radial-gradient(rgba(132,92,245,0.14) 1px, transparent 1px)',
                        backgroundSize: '26px 26px',
                        mask: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
                        WebkitMask:
                            'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
                    }}
                />

                <div
                    aria-hidden="true"
                    className="absolute -top-32 -left-16 w-72 h-72 rounded-full bg-primary-200/50 blur-3xl pointer-events-none"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-32 -right-16 w-72 h-72 rounded-full bg-primary-100/70 blur-3xl pointer-events-none"
                />

                <div className="relative px-6 sm:px-12 lg:px-16 py-16 lg:py-20 text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-neutral-900">
                        Ready to change{' '}
                        <span className="relative inline-block px-3 py-1">
                            <motion.span
                                aria-hidden="true"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-primary-200/80 rounded-md origin-left"
                            />
                            <span className="relative text-primary-700">
                                meetings into closed wons?
                            </span>
                        </span>
                    </h2>
                    <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Stop relying on luck. Start engineering your revenue with a system built for the modern SaaS landscape.
                    </p>
                    <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/contact"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-base font-bold shadow-[0_18px_40px_-14px_rgba(132,92,245,0.55)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        >
                            Book a Demo
                            <ArrowRight
                                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                                strokeWidth={2.5}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const sectionVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
} as const;

const highlightVariants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

const GlobalStyles = () => (
    <style>{`
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 3s ease infinite;
      }

      .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
        opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }

      .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.04);
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(132, 92, 245, 0.25);
          border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(132, 92, 245, 0.4);
      }
    `}</style>
);

const HowItWorksPage = () => {
  return (
    <div className="bg-white text-neutral-900 font-sans selection:bg-primary-200 selection:text-primary-900">
      <GlobalStyles />
      <Navbar />
      <div className="noise-overlay" />
      <main className="relative overflow-hidden">
        <HeroSection />
        <SystemLayerSection />
        <TimelineSection />
        <Layer2CTASection />
        <DealAssistSection />
        <SignalIntelligenceSection />
        <TeamSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;