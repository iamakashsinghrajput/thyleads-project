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
      "Blueprinting",
      "Omni-channel Approach",
      "Competitor Analysis",
      "CRM Integration",
      "Domain Setup",
      "Email Warm-up",
      "Intake Engine Config",
    ],
    whatWeDoFull: [
      "Blueprinting: Defining ICP, persona nuances, and success benchmarks",
      "Omni-channel approach: Email, LinkedIn, Calls, etc.",
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
      "Buying Signals",
      "Raw Intelligence",
      "Data Scraping",
      "Intent Scoring",
      "Context Mapping",
      "Messaging Creation",
      "AI Personalization",
      "A/B Testing",
      "Automation Testing",
      "Email Warm-up",
    ],
    whatWeDoFull: [
      "Monitor real buying signals: Website visitors, New hires & job posts, Funding rounds, Expansion news",
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
      "Launch Outreach",
      "Monitor Engagement",
      "Daily Optimization",
      "Appointment Booking",
      "No-show Handling",
      "Warm Transfer",
      "Complete Warm-up",
    ],
    whatWeDoFull: [
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
      "Post-Demo Momentum",
      "Auto Follow-ups",
      "Performance Review",
      "Funnel Analysis",
      "Segment Analysis",
      "Copy Optimization",
      "Scale Volumes",
      "LinkedIn Alignment",
      "Multi-threading",
    ],
    whatWeDoFull: [
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
        <TeamSection />
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
          Most systems look busy, but book nothing. For SaaS teams who rely on revenue mobility, we developed it as a key <span className="text-white font-medium">GTM function.</span>
        </motion.p>
        
        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="/contact"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-white/90 hover:scale-105"
          >
            <span className="mr-2 uppercase tracking-widest text-xs font-bold">Start Building</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 transition-opacity group-hover:opacity-10" />
          </a>
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
                    <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Layer 1: The Thyleads Revenue Engine</p>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                    Our Process From <br/>
                    <span className="text-white/40">Meeting To Growth </span>
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

const VelocityTimeline = ({ items, activeIndex }: { items: string[]; activeIndex: number }) => {
    // Configuration
    const columns = 4; // Set to 4 columns as requested (1->2->3->4)
    const itemWidth = 28; // Balanced node size
    const itemHeight = 28;
    const xGap = 36; // Optimized horizontal spacing
    const yGap = 36; // Optimized vertical spacing
  
    // Calculate total width/height for SVG viewBox
    const totalWidth = columns * itemWidth + (columns - 1) * xGap;
    // Calculate SVG height based on number of rows
    const rows = Math.ceil(items.length / columns);
    const totalHeight = rows * itemHeight + (rows - 1) * yGap;
  
    // Helper to get coordinates for a node index
    const getCoords = (i: number) => {
      const row = Math.floor(i / columns);
      let col = i % columns;
  
      // Snake logic: If row is odd, reverse column order
      if (row % 2 !== 0) {
        col = columns - 1 - col;
      }
  
      const x = col * (itemWidth + xGap) + itemWidth / 2;
      const y = row * (itemHeight + yGap) + itemHeight / 2;
      return { x, y };
    };
  
    // Generate the Snake Path Definition string (d attribute)
    const generatePath = () => {
      let path = "";
      for (let i = 0; i < items.length - 1; i++) {
        const current = getCoords(i);
        const next = getCoords(i + 1);
  
        if (i === 0) {
          path += `M ${current.x} ${current.y} `;
        }
  
        const rowCurrent = Math.floor(i / columns);
        const rowNext = Math.floor((i + 1) / columns);
  
        if (rowCurrent === rowNext) {
          // Same row: Straight line
          path += `L ${next.x} ${next.y} `;
        } else {
          // Different row: Curve down
          // Determine direction (are we on right or left edge?)
          // If we are on the right edge (col index is columns-1), bulge right.
          // If we are on the left edge (col index is 0), bulge left.
          
          const isRightEdge = current.x > totalWidth / 2;
          const controlX = isRightEdge ? current.x + 35 : current.x - 35; // Curve magnitude
  
          // C (control point 1) (control point 2) (end point)
          path += `C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y} `;
        }
      }
      return path;
    };
  
    const pathD = useMemo(() => generatePath(), [items]);
    const totalPoints = items.length;
    // Calculate percentage for path drawing
    // We want the line to stop exactly at the center of the active node
    // Total segments = totalPoints - 1. 
    const pathProgress = Math.min(activeIndex / (totalPoints - 1), 1);
  
    return (
      <div className="relative w-full flex justify-center py-4 select-none">
        <div className="relative" style={{ width: totalWidth, height: totalHeight }}>
          
          {/* 1. The Track (Background Line) */}
          <svg className="absolute inset-0 w-full h-full overflow-visible z-0 pointer-events-none">
            <path
                d={pathD}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* 2. The Velocity Beam (Foreground Line) */}
            <motion.path
                d={pathD}
                stroke="url(#velocity-gradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: pathProgress }}
                transition={{ duration: 0.5, ease: "linear" }}
            />
            <defs>
                <linearGradient id="velocity-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
            </defs>
          </svg>
  
          {/* 3. The Nodes (Absolute Positioned) */}
          {items.map((item, i) => {
            const { x, y } = getCoords(i);
            const isActive = i <= activeIndex;
            const isCurrent = i === activeIndex;
            
            // Adjust position to center div
            const style = {
                left: x - itemWidth / 2,
                top: y - itemHeight / 2,
                width: itemWidth,
                height: itemWidth // square/circle
            };
  
            return (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center justify-center z-10 group"
                style={style}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
              >
                  {/* Node Circle */}
                  <div className={`
                    w-full h-full rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-300 relative bg-[#0a0a0f]
                    ${isActive
                        ? "border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                        : "border-white/10 text-white/30"
                    }
                  `}>
                      <span className="relative z-10">{i + 1}</span>
                  </div>
  
                  {/* Label (Tooltip style or Text below) */}
                  <div className="absolute top-full mt-1.5 w-24 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                        <div className="bg-black/90 border border-white/10 rounded px-2 py-1 text-[9px] text-white backdrop-blur-sm shadow-xl">
                            {item}
                        </div>
                  </div>
              </motion.div>
            );
          })}
  
          {/* 4. The Glowing Head (Follows the path end) */}
          {(() => {
             const { x, y } = getCoords(activeIndex);
             return (
                 <motion.div
                    className="absolute z-20 w-7 h-7 pointer-events-none"
                    animate={{ 
                        left: x - 14, // center offset
                        top: y - 14
                    }}
                    transition={{ 
                        type: "spring", stiffness: 300, damping: 30 
                    }}
                 >
                     <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-40" />
                     <div className="absolute inset-2 bg-white rounded-full blur-sm opacity-80" />
                 </motion.div>
             )
          })()}
  
        </div>
      </div>
    );
  };

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // Reset tick when changing weeks so animation restarts nicely
    setTick(0);
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1200); // Speed of the velocity animation
    return () => clearInterval(interval);
  }, [activeIndex]);

  const currentWeek = weeklyTimeline[activeIndex];
  const execBrief = currentWeek.whatWeDo;
  const youBrief = currentWeek.whatYouDo; // Show all items
  
  // Calculate the active execution step based on tick
  // Cycle through: 0 -> length -> pause -> 0
  const activeExecIndex = tick % (execBrief.length + 3); // +3 for a pause at the end
  const clampedExecIndex = Math.min(activeExecIndex, execBrief.length - 1);
  
  const activeYouIndex = tick % youBrief.length;
  const execFullDescriptions = (currentWeek as typeof currentWeek & { whatWeDoFull?: string[] }).whatWeDoFull;

  return (
    <section className="relative py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-blue-400 mb-4">Layer 2 - Weekly Execution & Go-Live Timeline</p>
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
                    </div>
                ))}
            </div>

            {/* Right Side: Detailed Content */}
            <div className="lg:col-span-7 relative flex">
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full opacity-50" />

                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-transparent overflow-hidden flex flex-col w-full">
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
                        </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
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
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 relative overflow-hidden flex flex-col">
                                        <div className="flex items-center justify-between mb-2 relative z-10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                                                </div>
                                                <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">What we do</h4>
                                            </div>
                                            <span className="text-[10px] text-blue-300/80">
                                                {weeklyTimeline[activeIndex].whatWeDo.length} steps
                                            </span>
                                        </div>

                                        {/* NEW VELOCITY TIMELINE COMPONENT */}
                                        <div className="relative z-10 flex-1 flex items-center justify-center py-2">
                                            <VelocityTimeline
                                                items={weeklyTimeline[activeIndex].whatWeDo}
                                                activeIndex={clampedExecIndex}
                                            />
                                        </div>

                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`exec-detail-${activeIndex}-${clampedExecIndex}`}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                transition={{ duration: 0.2 }}
                                                className="mt-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-[10px] text-blue-50 leading-relaxed text-center relative z-10"
                                            >
                                                <span className="font-semibold text-blue-400 mr-2">Step {clampedExecIndex + 1}:</span>
                                                {execFullDescriptions && execFullDescriptions[clampedExecIndex]
                                                    ? execFullDescriptions[clampedExecIndex]
                                                    : execBrief[clampedExecIndex]}
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Background Decoration */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                    </div>

                                    {/* Secondary Inputs Section */}
                                    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex flex-col">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Users className="w-4 h-4 text-indigo-400" />
                                            <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">what you do</h4>
                                        </div>
                                        <div className="flex flex-col gap-2 flex-1">
                                            {youBrief.map((item, i) => {
                                                const isActive = i === activeYouIndex;
                                                return (
                                                    <motion.div
                                                        key={item}
                                                        animate={{
                                                            scale: isActive ? 1.02 : 1,
                                                            borderColor: isActive ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.1)",
                                                            backgroundColor: isActive ? "rgba(99,102,241,0.1)" : "rgba(0,0,0,0.2)"
                                                        }}
                                                        className="px-3 py-2.5 rounded-lg border text-[11px] text-white/80 flex items-center gap-3"
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-indigo-400" : "bg-white/20"}`} />
                                                        <span className="leading-tight">{item}</span>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Key Outcome - Bottom */}
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
            title: "Rapport-first connections",
            description: "We send connection requests right after the demo when the conversation is warm, and familiarity already exists, not cold and forced."
        },
        {
            title: "Echo-chamber content",
            description: "We publish posts that reflect the exact problems discussed on the call, so your perspective keeps showing up while the prospect is thinking through options."
        },
        {
            title: "High value engagement",
            description: "No drive-by likes. We engage with prospect content through thoughtful comments that add context and signal real intent to collaborate."
        },
        {
            title: "Intentional presence",
            description: "Subtle profile interactions and well-timed skill endorsements keep your team visible without ever feeling pushy or salesy."
        },
        {
            title: "Multi-node visibility",
            description: "Prospects don’t just see you in their inbox. Your expertise shows up across the channels where decisions are actually taking shape."
        }
    ];

    return (
        <section className="py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                        Deal Assist - For Where Deals {" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Get Won (or Lost)</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/60 text-base mb-6 leading-relaxed">
                        The inbox is not the place to close deals. They close in the mind. Deal Assist is our proprietary Invisible Salesperson to surround your prospects with strategic visibility across LinkedIn and news feeds, keeping you top-of-mind without being annoying.
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

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 mb-4">Signal Intelligence</p>
            <h2 className="text-3xl font-bold mb-4">Campaign Intelligence, We Operate With.</h2>
            <p className="text-white/60 text-sm">
              We work across 11 signal categories, each chosen for a specific strategic reason
            </p>
          </div>

          {/* ICP Core Badge */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-900/40 via-black to-purple-900/20 border-2 border-indigo-500/50 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(129,140,248,0.3)]">
              <span className="text-xl font-bold text-white">ICP</span>
              <span className="text-[8px] uppercase tracking-widest text-indigo-400">Core</span>
            </div>
          </div>

          {/* Signals Grid */}
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
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-indigo-500 text-black'
                      : 'bg-white/5 text-white/50'
                  }`}>
                    <signal.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-medium text-center leading-tight transition-colors ${
                    isActive ? 'text-white' : 'text-white/50'
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

          {/* Active Signal Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white/5 border border-indigo-500/30 p-5 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <active.icon className="w-20 h-20 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <active.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-base font-semibold">{active.name}</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {active.reason}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/50">High Intent</span>
                  <span className="px-2 py-1 rounded-full text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 text-white/50">Real-time</span>
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

        {/* DESKTOP LAYOUT - Original Orbit */}
        <div className="hidden lg:grid max-w-7xl mx-auto lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
            {/* Orbit Visual */}
            <div className="relative h-[520px] flex items-center justify-center will-change-transform">
                {/* Multi-layer outer glow */}
                <div className="absolute w-[550px] h-[550px] rounded-full bg-indigo-500/5 blur-[80px]" />

                {/* Animated particle ring - outer */}
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

                {/* Inner animated ring with gradient */}
                <div
                    className="absolute w-[360px] h-[360px] rounded-full border-2 border-transparent will-change-transform"
                    style={{
                        transform: `rotate(${innerRingRotation}deg) translateZ(0)`,
                        background: 'linear-gradient(black, black) padding-box, linear-gradient(135deg, rgba(129,140,248,0.5), rgba(168,85,247,0.5), rgba(34,211,238,0.2)) border-box'
                    }}
                />

                {/* Main orbit ring with glow effect */}
                <div className="absolute w-[440px] h-[440px] rounded-full border border-indigo-500/20 shadow-[0_0_30px_rgba(129,140,248,0.1)]" />

                {/* Outer dashed ring - animated */}
                <div
                    className="absolute w-[500px] h-[500px] rounded-full border border-white/10 border-dashed will-change-transform"
                    style={{ transform: `rotate(${outerRingRotation * 0.5}deg) translateZ(0)` }}
                />

                {/* Energy arc segments */}
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

                {/* Center Sun - Enhanced */}
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-indigo-900/40 via-black to-purple-900/20 border-2 border-indigo-500/50 backdrop-blur-md z-20 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(129,140,248,0.3)]">
                    <div className="absolute inset-2 rounded-full border border-indigo-400/30" />
                    <span className="text-4xl font-bold text-white">ICP</span>
                    <span className="text-[11px] uppercase tracking-widest text-indigo-400 mt-1">Core</span>
                </div>

                {/* Click hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Click any signal to explore
                </div>

                {/* Orbiting Signals */}
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
                <h2 className="text-4xl font-bold mb-6">Campaign Intelligence, <br/> We Operate With</h2>
                <p className="text-white/60 mb-6">
                    We work across 11 signal categories, each chosen for a specific strategic reason
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

// Team Section Data
const accountManagerTasks = [
    "Owning and qualifying every positive response received",
    "Conducting thorough pre-meeting qualification to confirm fit, relevance, and urgency",
    "Sending structured assessment notes before every meeting",
    "Handling all scheduling and rescheduling friction",
    "Supporting objection handling with context-aware rebuttals",
    "Tracking each deal across stages with full visibility",
    "Attending weekly pipeline calls to report progress and surface risks"
];

const qualificationChecks = [
    { label: "Fit of the use case", icon: "check" },
    { label: "Relevance to stakeholders", icon: "check" },
    { label: "Purchase purpose and urgency", icon: "check" }
];

const contentResearcherPoints = [
    {
        title: "Intelligence-led foundation",
        description: "Every campaign begins with deep ICP research and strategic framing, built around how different roles justify decisions internally."
    },
    {
        title: "LinkedIn-native personalization",
        description: "Persona-specific pain points are fused with LinkedIn-sourced signals so outreach reflects how prospects already think and communicate."
    },
    {
        title: "Proof-backed value",
        description: "Content translates your product features into ROI conversations using use cases and social proof."
    }
];

const TeamSection = () => {
    return (
        <section className="py-24 px-6 bg-[#050508] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 mb-4">The Human Layer</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Your Extended <span className="text-white/40">Revenue Team</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        Dedicated specialists who operate as an extension of your sales organization
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Account Managers Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 h-full hover:border-indigo-500/30 transition-colors duration-300">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Account Managers</h3>
                                    <p className="text-xs text-indigo-400 uppercase tracking-wider">Dedicated to Your Success</p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                Every client is assigned a dedicated Account Manager deeply trained on your product, ICP, and sales motion. They operate as an extension of your sales team, owning everything from the first positive response to deal closure.
                            </p>

                            {/* Qualification Checks */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-6">
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Pre-Meeting Qualification</p>
                                <div className="space-y-2">
                                    {qualificationChecks.map((check, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                                            </div>
                                            <span className="text-sm text-white/70">{check.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tasks List */}
                            <div className="space-y-3">
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Their Mandate Spans</p>
                                {accountManagerTasks.slice(0, 5).map((task, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                        <span className="text-sm text-white/60 leading-relaxed">{task}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Weekly Pipeline Badge */}
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                                        <span className="text-indigo-400 text-xs font-medium">Weekly Pipeline Calls</span>
                                    </div>
                                    <span className="text-white/40 text-xs">Report progress • Surface risks • Align actions</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Researchers Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 h-full hover:border-purple-500/30 transition-colors duration-300">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Content Researchers</h3>
                                    <p className="text-xs text-purple-400 uppercase tracking-wider">Strategic Messaging</p>
                                </div>
                            </div>

                            {/* Tagline */}
                            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
                                <p className="text-white/90 font-medium text-sm">
                                    Bypassing the Sales Filters of the C-Suite
                                </p>
                                <p className="text-white/50 text-xs mt-1">
                                    Writing messaging flows that trigger stakeholder consensus and dissolve resistance
                                </p>
                            </div>

                            {/* Key Points */}
                            <div className="space-y-5">
                                {contentResearcherPoints.map((point, i) => (
                                    <div key={i} className="group/item">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center mt-0.5 shrink-0">
                                                <span className="text-purple-400 text-xs font-bold">{i + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-white mb-1">{point.title}</h4>
                                                <p className="text-xs text-white/50 leading-relaxed">{point.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Highlight */}
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">ICP Research</span>
                                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">LinkedIn Signals</span>
                                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">ROI Messaging</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const performancePhilosophy = [
    {
        title: "Momentum > Noise",
        description: "We ignore Open Rates to focus on Deal Velocity and Opportunity Tracking."
    },
    {
        title: "Human-in-the-loop",
        description: "Every lead handoff is human-verified and context-heavy."
    },
    {
        title: "1 AE = 10 AEs",
        description: "Your team handles 3x more volume because we've removed the chasing phase."
    },
    {
        title: "No siloed reporting",
        description: "Our weekly reviews focus on Opportunity Tracking, not just activity logs."
    },
    {
        title: "Growth that is expected",
        description: "An intent-led GTM engine that is systematic and can scale to meet your revenue targets."
    }
];

const TalentSection = () => {
    return (
        <section className="py-20 px-6 bg-[#080808] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_50%)]" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-4">Philosophy</p>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Our Performance <span className="text-white/40">Philosophy</span>
                    </h2>
                </motion.div>

                {/* Philosophy Grid - 3 top, 2 bottom centered */}
                <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
                    {performancePhilosophy.slice(0, 3).map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group text-center"
                        >
                            <div className="inline-flex w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom 2 items - centered */}
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mt-6 max-w-2xl mx-auto">
                    {performancePhilosophy.slice(3).map((item, i) => (
                        <motion.div
                            key={i + 3}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i + 3) * 0.1 }}
                            className="group text-center"
                        >
                            <div className="inline-flex w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {item.description}
                            </p>
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
            <a
              href="/contact"
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex justify-center w-fit items-center gap-2 mx-auto"
            >
              Build Your Predictable Pipeline <ArrowRight className="w-5 h-5" />
            </a>
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