"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
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
  Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Data Constants ---

const systemStages = [
  "Signals (Inbound + Outbound)",
  "Intake & Qualification Engine",
  "Outreach & Conversation Activation",
  "Sales-Ready Meetings",
  "Post-Demo Momentum",
  "Nurture + Reporting",
];

const weeklyTimeline = [
  {
    title: "Week 1 — Foundation & Intake Engine Setup",
    subtitle: "Signals → Intake & Qualification",
    goal: "Build a Zero-Waste intake engine. We design the technical and strategic base of your campaign.",
    whatWeDo: [
      "Blueprinting: Defining ICP, persona nuances, and success benchmarks",
      "Channel selection (Email, LinkedIn, Calls, etc.)",
      "Competitor & account-based targeting analysis",
      "CRM integration & automation workflows",
      "Domain setup + deliverability configuration",
      "Initiating a 3-week email warm-up",
      "Intake Engine configuration: Intent rules, ICP filters, Fit & priority scoring",
    ],
    whatYouDo: [
      "Submit onboarding questionnaire",
      "Share sales collateral & calendars",
      "Align on success metrics",
    ],
    outcome: "A fully synchronized CRM and a hardened domain infrastructure ready for high-deliverability outreach.",
  },
  {
    title: "Week 2 — Data Intelligence & Outreach Preparation",
    subtitle: "Intake Engine → Outreach Activation",
    goal: "Turning data into high-relevance messaging. We use account-based data scraping and AI-fueled personalization to ensure every touchpoint feels 1-to-1.",
    whatWeDo: [
      "Monitor real buying signals: Website visitors, New hires & job posts, Funding rounds, Expansion news, Competitor engagement, Social signals",
      "Aggregating raw intelligence from company websites, articles, and LinkedIn profiles",
      "ICP-based data scraping & enrichment",
      "Intent scoring & account prioritization",
      "Buyer & account context mapping",
      "Messaging creation: Email sequences, LinkedIn flows, Call talk tracks",
      "Using signals to fuel hyper-personalized AI-powered outreach",
      "A/B testing framework creation",
      "LinkedIn & email automation testing",
      "Continue email warm-up",
    ],
    whatYouDo: [
      "Review & approve targeting logic",
      "Review & approve lead segments",
      "Review & approve messaging frameworks",
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
      "Daily optimization of copy, timing, and channel mix",
      "Appointment booking & reminders",
      "No-show handling workflows",
      "Warm transfer to AEs with context",
      "Complete email warm-up",
    ],
    whatYouDo: [
      "Join quick alignment check-ins",
      "Share feedback on meeting quality",
    ],
    outcome: "A consistent flow of high-value meetings appearing directly on your calendar.",
  },
  {
    title: "Week 4 — Review, Optimization & Scaling",
    subtitle: "Post-Demo Momentum + Reporting",
    goal: "Optimizing for ROI and expanding the pipeline.",
    whatWeDo: [
      "Activate Post-Demo Momentum — the Thyleads edge: Stakeholder nurture starts the moment a call ends",
      "Follow-ups, consensus building, and multi-threading kick in automatically",
      "Weekly performance review",
      "Funnel analysis: Signal → Reply → Meeting → Opportunity",
      "Identify high-performing segments & messages",
      "Optimize subject lines, hooks & scripts",
      "Safely increase sending volumes",
      "Align LinkedIn posting with DM outreach",
      "Post-demo momentum workflows: Follow-ups, 2nd & 3rd meeting coordination, Multi-threading",
    ],
    whatYouDo: [
      "Share AE feedback on call quality",
      "Align on scaling priorities",
    ],
    outcome: "A predictable, scalable revenue engine that matures and improves every week.",
  },
];

const signalIntelligence = [
  {
    name: "Funding Events",
    reason: "Capital unlocks urgency and budget alignment windows.",
    icon: Zap
  },
  {
    name: "Hiring Velocity",
    reason: "Hiring spikes reveal operational strain and growth intent.",
    icon: Users
  },
  {
    name: "Tech Stack Shifts",
    reason: "Stack changes signal evaluation cycles and replacement risk.",
    icon: Cpu
  },
  {
    name: "ICP Expansion",
    reason: "New geo or segment launches widen pain points you can solve.",
    icon: Radar
  },
  {
    name: "Leadership Changes",
    reason: "New leaders create new priorities and reset vendor decisions.",
    icon: Users
  },
  {
    name: "Website Surge",
    reason: "Repeated visits show active research before demo requests.",
    icon: Activity
  },
  {
    name: "Pricing Page Visits",
    reason: "Pricing intent is a near-term buying signal.",
    icon: BarChart3
  },
  {
    name: "Competitor Comparisons",
    reason: "Side-by-side research means the shortlist is forming.",
    icon: Search
  },
  {
    name: "Product Review Signals",
    reason: "Review activity reveals category exploration and urgency.",
    icon: MessageCircle
  },
  {
    name: "Compliance Triggers",
    reason: "Security and governance events force tooling changes.",
    icon: Lock
  },
  {
    name: "Intent Keyword Spikes",
    reason: "Sudden topic spikes show timing that can be actioned.",
    icon: Activity
  },
];

const talentPillars = [
  {
    title: "GTM Engineers",
    description:
      "Architect the operating system, tune signals, and maintain mechanical precision.",
    icon: Cpu,
  },
  {
    title: "Account Managers",
    description:
      "Keep sequencing, cadence, and stakeholder context accurate and aligned.",
    icon: Users,
  },
  {
    title: "Content Writers",
    description:
      "Translate intent into credible, contextual messaging at scale.",
    icon: MessageCircle,
  },
];

// --- Main Page Component ---

const HowItWorksPage = () => {
  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-purple-500/30 selection:text-purple-100">
      <GlobalStyles />
      <Navbar />
      <div className="noise-overlay" />
      <main className="relative overflow-hidden">
        <HeroSection />
        <SystemLayerSection />
        <TimelineSection />
        <DealAssistSection />
        <SignalIntelligenceSection />
        <TalentSection />
        <PerformancePhilosophySection />
        <TestimonialSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

// --- Sections ---

const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.2),transparent_45%),radial-gradient(circle_at_80%_30%,_rgba(99,102,241,0.16),transparent_50%),linear-gradient(180deg,_#050608_0%,_#080610_45%,_#020306_100%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_120deg_at_60%_40%,_rgba(168,85,247,0.14),_rgba(99,102,241,0.1),_transparent_60%)] mix-blend-screen opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Animated Grid Lines */}
        {/* Lines removed as requested */}
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} seed={i} delay={i * 0.2} />
        ))}
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-5xl text-center">
        
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
          <span className="block text-white">Thyleads Pipeline</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 animate-gradient-x pb-4">Operating System</span>
        </motion.h1>
        
        <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Most systems look busy, but book nothing. We built a core GTM function engineered for SaaS teams that need <span className="text-white font-medium">revenue movement</span>, not activity theatre.
        </motion.p>
        
        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/contact"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-white/90 hover:scale-105"
          >
            <span className="mr-2 uppercase tracking-widest text-xs font-bold">Start Building</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 transition-opacity group-hover:opacity-10" />
          </Link>
          <a href="#system" className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors">
            See the logic <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
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
            className="absolute w-1 h-1 bg-white/20 rounded-full"
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
    }, 2000); // Slower cycle to appreciate animation
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
      className="relative py-32 px-6"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-center">
            {/* Left Column: Text & Progress */}
            <motion.div variants={staggerContainer} className="relative z-10">
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-indigo-500" />
                    <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Layer 1: Architecture</p>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                    The Engine Runs <br/>
                    <span className="text-white/40">Continuously.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed mb-10">
                    Once live, signals trigger a cascade of actions. From intake to reporting, every step is automated yet strictly qualified.
                </motion.p>
                
                <motion.div variants={fadeUp} className="space-y-3 relative">
                     {/* Connecting Line for List */}
                     <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-white/5 rounded-full" />
                     
                    {systemStages.map((stage, index) => (
                        <div 
                            key={index} 
                            className={`relative flex items-center gap-5 p-4 rounded-xl transition-all duration-500 border ${activeStage === index ? "bg-white/5 border-white/10 translate-x-4 shadow-xl" : "border-transparent opacity-40"}`}
                        >
                            <div className={`relative z-10 h-3 w-3 rounded-full border-2 transition-all duration-300 ${activeStage === index ? "bg-indigo-500 border-indigo-200 shadow-[0_0_15px_rgba(168,85,247,0.8)] scale-125" : "bg-black border-white/20"}`} />
                            <span className={`text-sm tracking-wide font-medium ${activeStage === index ? "text-white" : "text-white"}`}>{stage}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Right Column: The Visual Monitor */}
            <motion.div 
                variants={fadeUp} 
                className="relative aspect-[4/3] rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Header Bar */}
                <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                        SYS.MONITOR.V2 // {activeStage < 3 ? "INGESTION" : activeStage < 5 ? "PROCESSING" : "OUTPUT"}
                    </div>
                </div>

                {/* Monitor Content */}
                <div className="relative flex-1 bg-black/50">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />

                    {/* Unified Coordinate System Container */}
                    {/* SVG and Nodes share 600x400 coordinate space */}
                    <div className="absolute inset-0 w-full h-full">
                        
                        {/* 1. SVG Layer */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                            {/* Input (Left) to Center */}
                            <ConnectionPath d="M 90 100 C 180 100, 180 200, 300 200" active={activeStage <= 1} />
                            <ConnectionPath d="M 90 300 C 180 300, 180 200, 300 200" active={activeStage <= 1} delay={0.1} />
                            
                            {/* Center to Processing Nodes (Vertical) */}
                            <ConnectionPath d="M 300 200 C 300 160, 300 100, 300 90" active={activeStage >= 1 && activeStage <= 3} />
                            <ConnectionPath d="M 300 200 C 300 240, 300 300, 300 310" active={activeStage >= 1 && activeStage <= 3} />
                            
                            {/* Processing to Output (Right) */}
                            <ConnectionPath d="M 300 200 C 420 200, 420 100, 510 100" active={activeStage >= 3} color="#10b981" />
                            <ConnectionPath d="M 300 200 C 420 200, 420 300, 510 300" active={activeStage >= 4} color="#10b981" />
                        </svg>

                        {/* 2. HTML Node Layer (Positioned by %) */}
                        {/* Coordinates mapping (600x400):
                           Left Col X: 90 -> 15%
                           Center X: 300 -> 50%
                           Right Col X: 510 -> 85%
                           
                           Top Row Y: 100 -> 25%
                           Mid Row Y: 200 -> 50%
                           Bottom Row Y: 300 -> 75%
                        */}
                        
                        {/* INPUTS (Left) */}
                        <div className="absolute top-[25%] left-[15%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Signal" icon={Radar} active={activeStage === 0} success={undefined} compact={undefined} />
                        </div>
                        <div className="absolute top-[75%] left-[15%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Data" icon={Database} active={activeStage === 0 || activeStage === 1} success={undefined} compact={undefined} />
                        </div>

                        {/* CORE (Center) */}
                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="relative">
                                {/* Rotating Rings */}
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className={`absolute inset-[-40px] rounded-full border border-dashed transition-colors duration-500 ${activeStage >= 1 && activeStage <= 4 ? "border-indigo-500/30" : "border-white/5"}`}
                                />
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className={`absolute inset-[-25px] rounded-full border border-dotted transition-colors duration-500 ${activeStage >= 1 && activeStage <= 4 ? "border-purple-500/30" : "border-white/5"}`}
                                />
                                {/* Reactor */}
                                <div className="h-24 w-24 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-2xl relative z-20">
                                    <div className={`absolute inset-0 rounded-full bg-indigo-500/10 blur-xl transition-opacity duration-300 ${activeStage >= 1 && activeStage <= 4 ? "opacity-100" : "opacity-0"}`} />
                                    <Cpu className={`w-8 h-8 transition-all duration-300 ${activeStage >= 1 && activeStage <= 4 ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "text-white/20"}`} />
                                    {activeStage >= 1 && activeStage <= 4 && (
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 rounded-full"
                                        >
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_currentColor]" />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* PROCESS NODES (Above/Below Core) */}
                        <div className="absolute top-[18%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Filter" icon={Filter} active={activeStage >= 1 && activeStage <= 3} compact success={undefined} />
                        </div>
                        <div className="absolute top-[82%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                            <SystemNode label="Enrich" icon={Layers} active={activeStage >= 1 && activeStage <= 3} compact success={undefined} />
                        </div>

                        {/* OUTPUTS (Right) */}
                        <div className="absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2">
                             <SystemNode label="Meeting" icon={CheckCircle2} active={activeStage >= 3} success compact={undefined} />
                        </div>
                        <div className="absolute top-[75%] left-[85%] -translate-x-1/2 -translate-y-1/2">
                             <SystemNode label="Revenue" icon={BarChart3} active={activeStage >= 5} success compact={undefined} />
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// New Curve Component for smoother visuals
const ConnectionPath = ({
  d,
  active,
  delay = 0,
  color = "#a855f7",
}: {
  d: string;
  active: boolean;
  delay?: number;
  color?: string;
}) => (
    <>
        {/* Dim background path */}
        <path d={d} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
        {/* Glowing Active Path */}
        <motion.path
            d={d}
            stroke={color}
            strokeWidth="2"
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
            borderColor: active ? (success ? "rgba(168, 85, 247, 0.4)" : "rgba(34, 211, 238, 0.4)") : "rgba(255,255,255,0.1)",
            backgroundColor: active ? (success ? "rgba(16, 185, 129, 0.05)" : "rgba(34, 211, 238, 0.05)") : "rgba(10,10,10,0.8)",
            scale: active ? 1.05 : 1,
            boxShadow: active ? (success ? "0 0 20px rgba(168,85,247,0.1)" : "0 0 20px rgba(129,140,248,0.1)") : "none"
        }}
        className={`relative ${compact ? "px-4 py-2" : "px-5 py-4"} rounded-lg border backdrop-blur-md flex items-center gap-3 transition-all duration-500 z-20 min-w-[120px] justify-center whitespace-nowrap`}
    >
        {Icon && <Icon className={`w-4 h-4 ${active ? (success ? "text-purple-400" : "text-indigo-400") : "text-white/20"}`} />}
        <span className={`text-[11px] uppercase tracking-wider font-bold ${active ? "text-white" : "text-white/30"}`}>{label}</span>
        
        {/* Tech Corner Accents */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${active ? (success ? "border-purple-500" : "border-indigo-500") : "border-transparent"} rounded-tl-sm transition-colors duration-500`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${active ? (success ? "border-purple-500" : "border-indigo-500") : "border-transparent"} rounded-br-sm transition-colors duration-500`} />
    </motion.div>
)

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [tick, setTick] = useState(0);
  const listContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };
  const listItem = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const makeShortLabel = (text: string) => {
    const base = text.split(":")[0];
    if (base.length <= 26) return base;
    return `${base.slice(0, 26).trim()}...`;
  };

  const makeBrief = (items: string[], count: number) => {
    if (items.length <= count) return items;
    const step = Math.max(1, Math.floor(items.length / count));
    const picked = items.filter((_, index) => index % step === 0).slice(0, count);
    return picked.length ? picked : items.slice(0, count);
  };

  // Auto-advance if not hovering? Or simpler manual control for clarity
  // Let's stick to scroll-based or simpler click-based for reliability in demo
  
  const execBrief = makeBrief(weeklyTimeline[activeIndex].whatWeDo, 3);
  const youBrief = makeBrief(weeklyTimeline[activeIndex].whatYouDo, 2);
  const activeExecIndex = tick % execBrief.length;
  const activeYouIndex = tick % youBrief.length;

  return (
    <section className="relative py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-blue-400 mb-4">Activation Sequence</p>
          <h2 className="text-4xl md:text-5xl font-bold">4 Weeks to <span className="text-gray-300">Velocity</span></h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12" ref={containerRef}>
            {/* Left Side: Buttons/Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-4">
                {weeklyTimeline.map((week, index) => (
                    <div 
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`group cursor-pointer relative p-6 rounded-2xl border transition-all duration-300 ${
                            activeIndex === index 
                            ? "bg-white/10 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.12)]" 
                            : "bg-white/5 border-white/5 hover:bg-white/[0.07] hover:border-white/10"
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                                activeIndex === index 
                                ? "border-blue-500 bg-blue-500 text-black" 
                                : "border-white/20 bg-transparent text-white/50 group-hover:border-white/40 group-hover:text-white"
                            }`}>
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className={`font-semibold text-base transition-colors ${activeIndex === index ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>
                                    {week.title}
                                </h3>
                                <p className={`text-xs mt-1 transition-colors ${activeIndex === index ? "text-blue-400" : "text-white/40"}`}>
                                    {week.subtitle}
                                </p>
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pt-3 text-sm text-white/60 leading-relaxed">{week.goal}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        {/* Left border removed as requested */}
                    </div>
                ))}
            </div>

            {/* Right Side: Detailed Content */}
            <div className="lg:col-span-7 relative flex">
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full opacity-50" />

                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-transparent overflow-hidden flex flex-col w-full h-full">
                    {/* Header */}
                    <div className="border-b border-white/10 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                <span className="text-blue-300 font-bold text-sm">W{activeIndex + 1}</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Week Briefing</h3>
                                <p className="text-blue-400 text-xs">{weeklyTimeline[activeIndex].subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] text-blue-400 font-medium">Active</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {weeklyTimeline.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-1.5 w-6 rounded-full transition-colors ${
                                            i === activeIndex ? "bg-blue-400" : "bg-white/10"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 flex flex-col h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25 }}
                                className="flex flex-col gap-4 h-full"
                            >
                                {/* Animated Visual Brief */}
                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Execution Flow</h4>
                                            </div>
                                            <span className="text-[10px] text-blue-300/80">
                                                {weeklyTimeline[activeIndex].whatWeDo.length} actions
                                            </span>
                                        </div>
                                        <div className="relative flex items-center justify-between gap-3">
                                            <div className="absolute left-3 right-3 top-4 h-px bg-blue-500/20" />
                                            {execBrief.map((item, i) => {
                                                const isActive = i === activeExecIndex;
                                                return (
                                                    <div key={item} className="relative z-10 flex flex-col items-center text-center gap-2">
                                                        <motion.div
                                                            animate={{
                                                                scale: isActive ? 1.05 : 1,
                                                                boxShadow: isActive
                                                                    ? "0 0 18px rgba(59,130,246,0.4)"
                                                                    : "0 0 0 rgba(0,0,0,0)",
                                                            }}
                                                            className={`h-8 w-8 rounded-full border flex items-center justify-center transition-colors ${
                                                                isActive
                                                                    ? "border-blue-400 bg-blue-400/20 text-blue-200"
                                                                    : "border-white/20 bg-black/40 text-white/40"
                                                            }`}
                                                        >
                                                            {i + 1}
                                                        </motion.div>
                                                        <span className={`text-[10px] uppercase tracking-wider ${isActive ? "text-white" : "text-white/40"}`}>
                                                            {makeShortLabel(item)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`exec-detail-${activeIndex}-${activeExecIndex}`}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                transition={{ duration: 0.2 }}
                                                className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-[11px] text-white/80"
                                            >
                                                {execBrief[activeExecIndex]}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                                    <Users className="w-4 h-4 text-indigo-400" />
                                                </div>
                                                <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Your Inputs</h4>
                                            </div>
                                            <span className="text-[10px] text-indigo-300/80">
                                                {weeklyTimeline[activeIndex].whatYouDo.length} inputs
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {youBrief.map((item, i) => {
                                                const isActive = i === activeYouIndex;
                                                return (
                                                    <motion.div
                                                        key={item}
                                                        animate={{
                                                            scale: isActive ? 1.04 : 1,
                                                            borderColor: isActive ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.1)",
                                                        }}
                                                        className="flex items-center gap-2 rounded-full border bg-black/40 px-3 py-2 text-[11px] text-white/70"
                                                    >
                                                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-indigo-300" : "bg-white/30"}`} />
                                                        {makeShortLabel(item)}
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`you-detail-${activeIndex}-${activeYouIndex}`}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                transition={{ duration: 0.2 }}
                                                className="mt-4 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-[11px] text-white/80"
                                            >
                                                {youBrief[activeYouIndex]}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Key Outcome - Full Width */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative mt-auto overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                                            <Zap className="w-4 h-4 text-black" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                                                Key Outcome
                                                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-200 text-[9px] font-semibold">Result</span>
                                            </h4>
                                            <p className="text-white/90 text-sm leading-relaxed">
                                                {weeklyTimeline[activeIndex].outcome}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const DealAssistSection = () => {
    const features = [
        {
            title: "Ghost-free follow-ups",
            description: "Automated sequences that feel personal, ensuring no prospect falls through the cracks"
        },
        {
            title: "Strategic content visibility",
            description: "Targeted content placement across LinkedIn feeds to reinforce your value proposition"
        },
        {
            title: "Competitor displacement",
            description: "Stay top-of-mind while competitors fade into the background noise"
        },
        {
            title: "Multi-touch engagement",
            description: "Coordinated touchpoints across email, LinkedIn, and retargeting channels"
        },
        {
            title: "Intent-based timing",
            description: "Reach prospects at the exact moment they are researching solutions like yours"
        }
    ];

    return (
        <section className="py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                         <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                         <span className="text-xs font-mono text-blue-400 uppercase">Always On</span>
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                        The Invisible {" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Salesperson</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/60 text-base mb-6 leading-relaxed">
                        Deals don&apos;t close in the inbox. They close in the mind. We surround your prospects with strategic visibility across LinkedIn and news feeds, keeping you top-of-mind without being annoying.
                    </motion.p>
                    <motion.ul variants={fadeUp} className="space-y-4">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <span className="text-white font-medium block">{feature.title}</span>
                                    <span className="text-white/50 text-sm">{feature.description}</span>
                                </div>
                            </li>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* Simulated Feed UI - Realistic LinkedIn Style */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -inset-8 bg-blue-500/20 blur-[60px] rounded-full opacity-30" />

                    {/* Main Feed Card */}
                    <div className="relative bg-[#1B1F23] border border-white/10 rounded-xl shadow-2xl max-w-md mx-auto overflow-hidden">

                         {/* LinkedIn Post Header */}
                         <div className="p-4 pb-3">
                             <div className="flex gap-3">
                                 {/* Profile Picture */}
                                 <div className="relative">
                                     <img
                                         src="/images/ss.png"
                                         alt="Rahul Dev"
                                         className="w-12 h-12 rounded-full object-cover"
                                     />
                                     <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#0A66C2] rounded-full border-2 border-[#1B1F23] flex items-center justify-center">
                                         <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                             <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                                         </svg>
                                     </div>
                                 </div>

                                 {/* Profile Info */}
                                 <div className="flex-1">
                                     <div className="flex items-center gap-2">
                                         <span className="text-white font-semibold text-sm">Rahul Dev</span>
                                         <span className="text-white/40 text-xs">• 1st</span>
                                     </div>
                                     <p className="text-white/50 text-xs leading-tight">CEO at Thyleads • GTM for SaaS</p>
                                     <div className="flex items-center gap-1 mt-0.5">
                                         <span className="text-white/40 text-xs">2h</span>
                                         <span className="text-white/40 text-xs">•</span>
                                         <svg className="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 16 16">
                                             <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 11V5l5 3-5 3z"/>
                                         </svg>
                                     </div>
                                 </div>

                                 {/* More Options */}
                                 <button className="text-white/40 hover:text-white/60 self-start">
                                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                         <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                     </svg>
                                 </button>
                             </div>
                         </div>

                         {/* Post Content */}
                         <div className="px-4 pb-3">
                             <p className="text-white/90 text-sm leading-relaxed">
                                 <span className="text-white">3 things I learned scaling from $1M to $10M ARR:</span>
                                 <br/><br/>
                                 1️⃣ Outbound isn&apos;t dead—your targeting is<br/>
                                 2️⃣ AE time is your scarcest resource<br/>
                                 3️⃣ Intent signals beat spray-and-pray
                                 <br/><br/>
                                 <span className="text-[#71B7FB]">#SaaS #B2BSales #GrowthStrategy</span>
                             </p>
                         </div>

                         {/* Post Image/Article Preview */}
                         <div className="mx-4 mb-3 rounded-lg overflow-hidden border border-white/10">
                             <div className="aspect-[1.91/1] bg-gradient-to-br from-blue-900/60 via-indigo-900/60 to-purple-900/60 flex items-center justify-center relative">
                                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%)] bg-[length:20px_20px]" />
                                 <div className="text-center z-10">
                                     <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                         <BarChart3 className="w-8 h-8 text-blue-400" />
                                     </div>
                                     <span className="text-white/80 text-sm font-medium">The Revenue Playbook 2024</span>
                                 </div>
                             </div>
                             <div className="bg-[#282D33] p-3">
                                 <p className="text-white/60 text-xs mb-1">thyleads.com</p>
                                 <p className="text-white/90 text-sm font-medium leading-tight">How Top SaaS Companies Scale Pipeline Without Adding Headcount</p>
                             </div>
                         </div>

                         {/* Engagement Stats */}
                         <div className="px-4 py-3 flex items-center justify-between text-xs text-white/50">
                             <div className="flex items-center gap-2">
                                 <div className="flex -space-x-1">
                                     <div className="w-5 h-5 rounded-full bg-[#0A66C2] flex items-center justify-center border border-[#1B1F23]">
                                         <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                             <path d="M2 8.5c0-3.5 2.9-6.5 6.5-6.5 2.5 0 4.6 1.3 5.5 3.2.9-1.9 3-3.2 5.5-3.2 3.6 0 6.5 3 6.5 6.5 0 4.6-5.1 8.5-12 14.5-6.9-6-12-9.9-12-14.5z"/>
                                         </svg>
                                     </div>
                                     <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border border-[#1B1F23]">
                                         <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                         </svg>
                                     </div>
                                     <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center border border-[#1B1F23]">
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

                         {/* Action Buttons */}
                         <div className="border-t border-white/10 px-2 py-1 flex justify-between">
                             {[
                                 { icon: "M19.46 11l-3.91-3.91a7 7 0 1 0-1.69 1.69L17.87 13H19z", label: "Like" },
                                 { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", label: "Comment" },
                                 { icon: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3", label: "Repost" },
                                 { icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z", label: "Send" }
                             ].map((action, i) => (
                                 <button key={i} className="flex-1 flex items-center justify-center gap-2 py-3 text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors">
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" d={action.icon}/>
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

    // Auto-cycle through signals when not paused
    useEffect(() => {
      if (paused) return;
      const interval = setInterval(() => {
        setActiveSignal(prev => (prev + 1) % signalIntelligence.length);
      }, 4000); // Slower cycling - 4 seconds per signal
      return () => clearInterval(interval);
    }, [paused]);

    const active = signalIntelligence[activeSignal];

    return (
      <section className="relative py-16 md:py-20 px-6 bg-black overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
            {/* Orbit Visual */}
            <div className="relative h-[320px] md:h-[450px] lg:h-[520px] flex items-center justify-center will-change-transform">
                {/* Multi-layer outer glow */}
                <div className="absolute w-[300px] md:w-[450px] lg:w-[550px] h-[300px] md:h-[450px] lg:h-[550px] rounded-full bg-indigo-500/5 blur-[80px]" />

                {/* Animated particle ring - outer */}
                <div
                    className="absolute w-[280px] md:w-[420px] lg:w-[520px] h-[280px] md:h-[420px] lg:h-[520px] rounded-full will-change-transform"
                    style={{ transform: `rotate(${outerRingRotation}deg) translateZ(0)` }}
                >
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-indigo-400/40"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 45}deg) translateX(140px) md:translateX(210px) lg:translateX(260px) translateY(-50%)`,
                            }}
                        />
                    ))}
                </div>

                {/* Inner animated ring with gradient */}
                <div
                    className="absolute w-[200px] md:w-[300px] lg:w-[360px] h-[200px] md:h-[300px] lg:h-[360px] rounded-full border-2 border-transparent will-change-transform"
                    style={{
                        transform: `rotate(${innerRingRotation}deg) translateZ(0)`,
                        background: 'linear-gradient(black, black) padding-box, linear-gradient(135deg, rgba(129,140,248,0.5), rgba(168,85,247,0.5), rgba(34,211,238,0.2)) border-box'
                    }}
                />

                {/* Main orbit ring with glow effect */}
                <div className="absolute w-[240px] md:w-[360px] lg:w-[440px] h-[240px] md:h-[360px] lg:h-[440px] rounded-full border border-indigo-500/20 shadow-[0_0_30px_rgba(129,140,248,0.1)]" />

                {/* Outer dashed ring - animated */}
                <div
                    className="absolute w-[270px] md:w-[400px] lg:w-[500px] h-[270px] md:h-[400px] lg:h-[500px] rounded-full border border-white/10 border-dashed will-change-transform"
                    style={{ transform: `rotate(${outerRingRotation * 0.5}deg) translateZ(0)` }}
                />

                {/* Energy arc segments */}
                <svg className="absolute w-[260px] md:w-[380px] lg:w-[480px] h-[260px] md:h-[380px] lg:h-[480px] will-change-transform" style={{ transform: `rotate(${rotation * 0.3}deg) translateZ(0)` }}>
                    <defs>
                        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                            <stop offset="50%" stopColor="rgba(129,140,248,0.5)" />
                            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                        </linearGradient>
                    </defs>
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#arcGradient)" strokeWidth="2" strokeDasharray="100 200" />
                </svg>

                {/* Center Sun - Enhanced */}
                <div className="absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-indigo-900/40 via-black to-purple-900/20 border-2 border-indigo-500/50 backdrop-blur-md z-20 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(129,140,248,0.3)]">
                    <div className="absolute inset-2 rounded-full border border-indigo-400/30" />
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">ICP</span>
                    <span className="text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-widest text-indigo-400 mt-1">Core</span>
                </div>

                {/* Click hint */}
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-[10px] md:text-xs">
                    <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Click any signal to explore
                </div>

                {/* Orbiting Signals - Scaled container for responsiveness */}
                <div className="absolute inset-0 z-30 scale-[0.55] md:scale-[0.8] lg:scale-100 will-change-transform" ref={containerRef}>
                    {signalIntelligence.map((signal, index) => {
                        const offsetAngle = (360 / signalIntelligence.length) * index;
                        const currentAngle = rotation + offsetAngle;
                        const radian = (currentAngle * Math.PI) / 180;

                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;

                        const isActive = index === activeSignal;

                        return (
                            <React.Fragment key={index}>
                                {/* Connecting Line */}
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

                                {/* Signal Button */}
                                <button
                                    onClick={() => { setActiveSignal(index); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
                                    className={`absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 rounded-full border-2 flex items-center justify-center group cursor-pointer z-20 will-change-transform
                                        ${isActive
                                            ? "bg-gradient-to-br from-indigo-400 to-indigo-600 border-indigo-300 shadow-[0_0_30px_rgba(129,140,248,0.6)] scale-110 z-30"
                                            : "bg-black/90 border-white/20 hover:border-indigo-400/60 hover:bg-black"
                                        }`}
                                    style={{
                                        transform: `translate(${x}px, ${y}px) translateZ(0)`
                                    }}
                                >
                                    <signal.icon className={`w-4 h-4 ${isActive ? "text-black" : "text-white/70 group-hover:text-indigo-400"}`} />

                                    {/* Label */}
                                    <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/95 border rounded-md text-[10px] whitespace-nowrap pointer-events-none font-medium
                                        ${isActive
                                            ? "opacity-100 border-indigo-500/60 text-indigo-300"
                                            : "opacity-0 group-hover:opacity-100 border-white/20 text-white/90"
                                        }
                                    `}>
                                        {signal.name}
                                    </div>

                                    {/* Pulse ring for active */}
                                    {isActive && (
                                        <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-30" style={{ animationDuration: '1.5s' }} />
                                    )}
                                </button>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Info Card */}
            <div className="flex flex-col">
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 mb-4">Signal Intelligence</p>
                <h2 className="text-4xl font-bold mb-6">11 Signals, <br/> One Source of Truth.</h2>
                <p className="text-white/60 mb-6">
                    We don&apos;t just guess. We listen. Click any signal to understand why it matters for your pipeline.
                </p>

                {/* Active Signal Detail Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.name}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden mb-6"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <active.icon className="w-24 h-24 text-white" />
                        </div>
                        <div className="relative z-10">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <active.icon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-semibold">{active.name}</h3>
                             </div>
                             <p className="text-base text-white/80 leading-relaxed mb-4">
                                {active.reason}
                             </p>
                             <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/50">High Intent</span>
                                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/50">Real-time</span>
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

const TalentSection = () => {
    return (
        <section className="py-24 px-6 bg-[#080808]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-bold">Human Expertise, <span className="text-gray-300">Algorithmic Scale</span></h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {talentPillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                        >
                            <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:border-purple-500/50 transition-colors">
                                <pillar.icon className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{pillar.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const PerformancePhilosophySection = () => {
    const principles = [
        "Velocity beats volume",
        "Pipeline is a system, not a lottery",
        "Intent must be verified",
        "Revenue > Activity"
    ];

    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                 
                 <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-500 mb-6">Philosophy</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-10">We reject &quot;Spray and Pray&quot;.</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {principles.map((p, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-black/40 border border-white/10 rounded-lg text-left">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="font-medium text-white/90">{p}</span>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </section>
    )
}

const TestimonialSection = () => (
    <section className="py-32 px-6 flex items-center justify-center">
        <div className="max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
                {[1,2,3,4,5].map(i => <span key={i} className="text-purple-400 text-2xl">★</span>)}
            </div>
            <h2 className="text-2xl md:text-2xl font-medium leading-relaxed mb-8">
                &quot;At Epiplex.ai, partnering with Thyleads for market outreach has yielded outstanding results. Their strategic lead generation has expanded our client base and effectively communicated Epiplex&apos;s value in the GCC.&quot;
            </h2>
            <div className="flex items-center justify-center gap-4">
                <img
                    src="/pipelex.png"
                    alt="Vivek Patial"
                    className="h-12 w-12 rounded-full object-cover border border-white/20"
                />
                <div className="text-left">
                    <div className="font-bold">Vivek Patial</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">Head of Marketing, Epipplex.ai</div>
                </div>
            </div>
        </div>
    </section>
)

const FinalCTASection = () => (
    <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                Ready to <span className="text-gray-300">Scale?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                Stop relying on luck. Start engineering your revenue with a system built for the modern SaaS landscape.
            </p>
            <Link
              href="/contact"
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex justify-center w-fit items-center gap-2 mx-auto"
            >
              Build Your Predictable Pipeline <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    </section>
)

// --- Utilities & Styles ---

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
    `}</style>
);

export default HowItWorksPage;
