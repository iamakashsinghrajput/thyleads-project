"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database,
  Target,
  FileText,
  Settings,
  Radio,
  MessageCircle,
  CalendarCheck,
  Rocket,
  Filter,
  ClipboardList,
  Brain,
  Video,
  ArrowRightCircle,
  Sprout,
  Repeat,
  BarChart,
  Lightbulb,
  Handshake,
  Users,
  Briefcase,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Link as LinkIcon,
  Mail,
  Linkedin
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Graphic 1: Foundation & Target Intelligence
// Includes: Data building · ICP refinement · Content creation · Email & LinkedIn setup
// Animation: Sequential build-up (Data -> ICP -> Content -> Setup) -> System Lock-in
// -----------------------------------------------------------------------------
const GraphicFoundation = () => {
  const [stage, setStage] = useState(0); 
  // 0: Data, 1: ICP, 2: Content, 3: Setup, 4: Lock-in

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const stepDuration = 600; // 0.6s per step
    const lockDuration = 2500; // Hold lock state

    if (stage === 0) timeout = setTimeout(() => setStage(1), stepDuration);
    else if (stage === 1) timeout = setTimeout(() => setStage(2), stepDuration);
    else if (stage === 2) timeout = setTimeout(() => setStage(3), stepDuration);
    else if (stage === 3) timeout = setTimeout(() => setStage(4), stepDuration);
    else if (stage === 4) timeout = setTimeout(() => setStage(0), lockDuration);

    return () => clearTimeout(timeout);
  }, [stage]);

  const isLocked = stage === 4;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Container for the 4 Micro-cards */}
      <div className={`flex items-center gap-3 transition-all duration-500 ${isLocked ? 'scale-105 gap-4' : 'scale-100'}`}>
        
        {/* 1. Data Building: Stacking Cards */}
        <div className={`relative w-16 h-20 rounded-lg border flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-colors duration-300 ${stage >= 0 ? 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-white/5 opacity-30'}`}>
           <Database size={16} className={`mb-2 ${stage >= 0 ? 'text-blue-400' : 'text-slate-600'}`} />
           <div className="relative w-8 h-6">
              {/* Back cards */}
              <motion.div 
                 className="absolute inset-0 bg-blue-500/20 rounded-sm border border-blue-500/30"
                 animate={stage >= 0 ? { y: [5, 0], scale: [0.8, 1], opacity: 1 } : { opacity: 0 }}
              />
              <motion.div 
                 className="absolute inset-0 bg-blue-500/40 rounded-sm border border-blue-500/50"
                 animate={stage >= 0 ? { y: [10, -2], scale: [0.8, 1], opacity: 1 } : { opacity: 0 }}
                 transition={{ delay: 0.1 }}
              />
              {/* Front card with 'fields' */}
              <motion.div 
                 className="absolute inset-0 bg-slate-900 rounded-sm border border-blue-400 flex flex-col justify-center gap-1 p-1"
                 animate={stage >= 0 ? { y: [15, -4], opacity: 1 } : { opacity: 0 }}
                 transition={{ delay: 0.2 }}
              >
                 <motion.div className="h-0.5 bg-blue-400 rounded-full w-3/4" animate={{ width: ["0%", "75%"] }} transition={{ delay: 0.3 }} />
                 <motion.div className="h-0.5 bg-blue-400/50 rounded-full w-full" animate={{ width: ["0%", "100%"] }} transition={{ delay: 0.35 }} />
              </motion.div>
           </div>
           {isLocked && <div className="absolute -bottom-6 text-[8px] text-blue-300 font-bold whitespace-nowrap">DATA</div>}
        </div>

        {/* 2. ICP Refinement: Filter Sweep */}
        <div className={`relative w-16 h-20 rounded-lg border flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-colors duration-300 ${stage >= 1 ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/5 opacity-30'}`}>
           <Filter size={16} className={`mb-2 ${stage >= 1 ? 'text-red-400' : 'text-slate-600'}`} />
           <div className="grid grid-cols-3 gap-1 w-8">
              {[...Array(6)].map((_, i) => {
                 // Randomly highlight some, dim others
                 const isTarget = [1, 4].includes(i); 
                 return (
                    <motion.div 
                      key={i}
                      className={`w-2 h-2 rounded-full ${isTarget ? 'bg-red-500' : 'bg-slate-700'}`}
                      animate={stage >= 1 ? { 
                         opacity: isTarget ? 1 : 0.2, 
                         scale: isTarget ? 1.2 : 0.8 
                      } : { opacity: 0 }}
                      transition={{ delay: 0.1 * i }}
                    />
                 )
              })}
           </div>
           {isLocked && <div className="absolute -bottom-6 text-[8px] text-red-300 font-bold whitespace-nowrap">ICP</div>}
        </div>

        {/* 3. Content Creation: Typing/Reveal */}
        <div className={`relative w-16 h-20 rounded-lg border flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-colors duration-300 ${stage >= 2 ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-white/5 opacity-30'}`}>
           <FileText size={16} className={`mb-2 ${stage >= 2 ? 'text-amber-400' : 'text-slate-600'}`} />
           <div className="relative w-8 h-8">
               {/* Email Card */}
               <motion.div 
                 className="absolute top-0 left-0 w-6 h-5 bg-slate-800 border border-amber-500/40 rounded flex flex-col gap-1 p-1"
                 animate={stage >= 2 ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
               >
                  <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                  <motion.div className="h-0.5 bg-amber-500/50 w-full" animate={{ width: ["0%", "100%"] }} transition={{ delay: 0.2 }} />
               </motion.div>
               {/* LI Card */}
               <motion.div 
                 className="absolute bottom-0 right-0 w-6 h-5 bg-slate-800 border border-amber-500/60 rounded flex flex-col gap-1 p-1 z-10"
                 animate={stage >= 2 ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 }}
                 transition={{ delay: 0.1 }}
               >
                  <div className="flex justify-between">
                     <div className="w-1.5 h-1.5 rounded-sm bg-blue-400" />
                  </div>
                  <motion.div className="h-0.5 bg-white w-full" animate={{ width: ["0%", "100%"] }} transition={{ delay: 0.3 }} />
               </motion.div>
           </div>
           {isLocked && <div className="absolute -bottom-6 text-[8px] text-amber-300 font-bold whitespace-nowrap">CONTENT</div>}
        </div>

        {/* 4. Setup: Connection */}
        <div className={`relative w-16 h-20 rounded-lg border flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-colors duration-300 ${stage >= 3 ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-white/5 opacity-30'}`}>
           <Settings size={16} className={`mb-2 ${stage >= 3 ? 'text-emerald-400' : 'text-slate-600'}`} />
           <div className="flex items-center gap-1">
              <motion.div 
                 className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500 flex items-center justify-center"
                 animate={stage >= 3 ? { scale: [0, 1] } : { scale: 0 }}
              >
                 <Linkedin size={8} className="text-blue-400" />
              </motion.div>
              
              <motion.div 
                 className="h-0.5 bg-emerald-500" 
                 animate={stage >= 3 ? { width: 12 } : { width: 0 }}
                 transition={{ delay: 0.2 }}
              />

              <motion.div 
                 className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center"
                 animate={stage >= 3 ? { scale: [0, 1] } : { scale: 0 }}
                 transition={{ delay: 0.3 }}
              >
                 <Mail size={8} className="text-emerald-400" />
              </motion.div>
           </div>
           {/* Active Dot */}
           <motion.div 
              className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={stage >= 3 ? { opacity: 1, boxShadow: "0 0 8px #10b981" } : { opacity: 0.2 }}
              transition={{ delay: 0.4 }}
           />
           {isLocked && <div className="absolute -bottom-6 text-[8px] text-emerald-300 font-bold whitespace-nowrap">SETUP</div>}
        </div>

      </div>

      {/* System Lock-in Visuals */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            className="absolute inset-x-8 bottom-4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
             <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">System Ready</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Outer Glow during Lock */}
      {isLocked && (
         <motion.div 
            className="absolute inset-4 rounded-xl border border-white/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
         />
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Graphic 2: Intent-Led Campaign Activation
// Includes: Campaign launch · Signal-based outreach · Response management · 1st appointment setup
// -----------------------------------------------------------------------------
const GraphicActivation = () => {
  const steps = [
    { icon: Rocket, label: "Launch", color: "text-purple-400" },
    { icon: Radio, label: "Signals", color: "text-pink-400" },
    { icon: MessageCircle, label: "Response", color: "text-orange-400" },
    { icon: CalendarCheck, label: "Booked", color: "text-emerald-400" },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Connecting Path */}
      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2 rounded-full" />
      
      {/* Moving Pulse */}
      <motion.div 
        className="absolute top-1/2 left-4 h-0.5 bg-purple-500 -translate-y-1/2 rounded-full z-0"
        animate={{ width: `${(activeIdx / (steps.length - 1)) * 80 + 10}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <div className="flex justify-between w-full px-4 relative z-10">
        {steps.map((step, i) => {
          const isActive = i <= activeIdx;
          const isCurrent = i === activeIdx;

          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <motion.div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-[#08080a] transition-colors duration-500 ${
                  isActive ? `border-purple-500 ${step.color}` : 'border-white/10 text-white/20'
                }`}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
              >
                <step.icon size={20} />
              </motion.div>
              <motion.span 
                className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/20'}`}
                animate={{ opacity: isActive ? 1 : 0.3 }}
              >
                {step.label}
              </motion.span>
              
              {isCurrent && (
                <motion.div 
                  className="absolute -bottom-4 w-1 h-1 bg-purple-500 rounded-full"
                  layoutId="activeDot"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Graphic 3: Pre-Sales Qualification & Intelligence
// Includes: Qualification · Pre-assessment notes · Pre-meeting intelligence · Calendar management
// -----------------------------------------------------------------------------
const GraphicQualification = () => {
  const phases = [
    { icon: Filter, label: "Qualification", desc: "Fit Check" },
    { icon: ClipboardList, label: "Notes", desc: "Assessment" },
    { icon: Brain, label: "Intelligence", desc: "Pre-Meeting" },
    { icon: CalendarCheck, label: "Calendar", desc: "Management" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-3">
      {phases.map((phase, i) => (
        <motion.div
          key={i}
          className="w-64 bg-slate-900/50 border border-white/10 rounded-lg p-2 flex items-center gap-3 relative overflow-hidden"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.3 }}
        >
          {/* Progress Bar Background */}
          <motion.div 
            className="absolute inset-0 bg-indigo-500/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.3 + 0.2, duration: 2, ease: "linear" }}
            style={{ originX: 0 }}
          />

          <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center shrink-0 z-10 text-indigo-300">
            <phase.icon size={16} />
          </div>
          
          <div className="flex flex-col z-10">
            <span className="text-xs font-bold text-white">{phase.label}</span>
            <span className="text-[9px] text-white/50 uppercase tracking-wider">{phase.desc}</span>
          </div>

          <div className="ml-auto z-10">
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: i * 0.3 + 1.5 }}
             >
               <CheckCircle2 size={14} className="text-emerald-500" />
             </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Graphic 4: Deal Momentum & Stakeholder Sustaining
// Includes: Demo facilitation · Next-step alignment · Deal nurturing · Buying committee mapping · Multi-touch follow-ups
// -----------------------------------------------------------------------------
const GraphicMomentum = () => {
  const satellites = [
    { icon: Video, label: "Demo Facilitation", angle: 0 },
    { icon: ArrowRightCircle, label: "Next Steps", angle: 72 },
    { icon: Sprout, label: "Deal Nurturing", angle: 144 },
    { icon: Users, label: "Buying Committee", angle: 216 },
    { icon: Repeat, label: "Follow-ups", angle: 288 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Orbits */}
      <div className="absolute w-[240px] h-[240px] border border-white/5 rounded-full" />
      <motion.div 
         className="absolute w-[200px] h-[200px] border border-emerald-500/20 rounded-full border-dashed"
         animate={{ rotate: 360 }}
         transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Central Deal Node */}
      <motion.div 
        className="w-20 h-20 bg-emerald-950 border border-emerald-500 rounded-full flex flex-col items-center justify-center z-20 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
         <Briefcase size={24} className="text-emerald-400" />
         <span className="text-[8px] font-bold text-emerald-200 mt-1">ACTIVE DEAL</span>
      </motion.div>

      {/* Satellites */}
      {satellites.map((item, i) => {
        const radius = 100;
        const rad = (item.angle - 90) * (Math.PI / 180);
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ x, y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-lg mb-1">
               <item.icon size={16} />
            </div>
            <div className="bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-white/80 whitespace-nowrap border border-white/10">
               {item.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Graphic 5: Close & Scale
// Includes: Close support · CRM updates · Performance reporting · Insight-driven iteration
// Animation: Flywheel feeding into a growth chart
// -----------------------------------------------------------------------------
const GraphicScale = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* 1. The Flywheel (Iteration) */}
      <div className="relative flex items-center justify-center mr-12">
         {/* Rotating Ring */}
         <motion.div 
           className="w-32 h-32 rounded-full border border-pink-500/30 border-dashed"
           animate={{ rotate: 360 }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
         />
         {/* Inner Hub */}
         <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
               className="w-12 h-12 bg-pink-950 border border-pink-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)]"
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               <RefreshCw size={20} className="text-pink-400" />
            </motion.div>
         </div>

         {/* Orbiting Elements */}
         {[
           { icon: Handshake, bg: "bg-blue-500" }, 
           { icon: Database, bg: "bg-purple-500" }, 
           { icon: BarChart, bg: "bg-emerald-500" }
         ].map((item, i) => (
            <motion.div
               key={i}
               className="absolute inset-0"
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: -i * 2.6 }}
            >
               <div 
                 className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${item.bg} border-2 border-white/20 flex items-center justify-center text-white`}
                 style={{ transform: 'rotate(0deg)' }} // Reset rotation for icon if needed, but here we want them spinning
               >
                  <item.icon size={14} />
               </div>
            </motion.div>
         ))}
      </div>

      {/* 2. The Growth Chart (Scale) */}
      <div className="absolute right-8 bottom-12 flex items-end gap-1.5 h-32">
         <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-[1px] bg-gradient-to-r from-pink-500 to-transparent" />
         
         {[0.3, 0.5, 0.7, 1.0].map((h, i) => (
           <motion.div 
             key={i}
             className="w-6 bg-gradient-to-t from-pink-900 to-pink-500 rounded-t-sm relative"
             initial={{ height: 10 }}
             animate={{ height: h * 128 }}
             transition={{ duration: 1, delay: i * 0.2, type: "spring" }}
           >
              {i === 3 && (
                 <motion.div 
                   className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.5 }}
                 >
                    <ArrowUpRight size={16} className="text-pink-400 mb-1" />
                    <span className="text-[8px] font-bold text-pink-200">SCALE</span>
                 </motion.div>
              )}
           </motion.div>
         ))}
      </div>
      
      {/* Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap">
         Insight Loop → Growth
      </div>
    </div>
  );
};


// -----------------------------------------------------------------------------
// Data Structure
// -----------------------------------------------------------------------------
const steps = [
  {
    phase: "01",
    title: "Foundation & Target Intelligence",
    subtitle: "Build the right base before outreach begins",
    description: "We start by defining your ICP with precision and building high-quality account and contact data. This includes content creation and setting up email and LinkedIn infrastructure.",
    details: ["Data building", "ICP refinement", "Content creation", "Email & LinkedIn setup"],
    graphic: <GraphicFoundation />,
    color: "text-blue-400",
    bg: "bg-blue-500",
    border: "border-blue-500/50"
  },
  {
    phase: "02",
    title: "Intent-Led Campaign Activation",
    subtitle: "Start conversations only when the timing is right",
    description: "Campaigns go live across outbound and inbound channels, driven by intent signals. Every response is captured, contextualised, and routed with speed, ensuring no early interest is lost.",
    details: ["Campaign launch", "Signal-based outreach", "Response management", "1st appointment setup"],
    graphic: <GraphicActivation />,
    color: "text-purple-400",
    bg: "bg-purple-500",
    border: "border-purple-500/50"
  },
  {
    phase: "03",
    title: "Pre-Sales Qualification & Intelligence",
    subtitle: "Protect AE time with revenue-grade filtering",
    description: "Before an AE ever steps in, we qualify for fit, intent, and urgency. Each meeting is backed by pre-meeting account intelligence, so AEs walk in informed rather than guessing.",
    details: ["Qualification", "Pre-assessment notes", "Pre-meeting intelligence", "Calendar management"],
    graphic: <GraphicQualification />,
    color: "text-indigo-400",
    bg: "bg-indigo-500",
    border: "border-indigo-500/50"
  },
  {
    phase: "04",
    title: "Deal Momentum & Stakeholder Sustaining",
    subtitle: "Move deals forward… relentlessly",
    description: "We manage demo facilitation, post-demo alignment, stakeholder mapping, and multi-touch follow-ups. This is where complex SaaS sales cycles usually stall after early interest but before internal consensus. Thyleads ensures momentum never drops.",
    details: ["Demo facilitation", "Next-step alignment", "Deal nurturing", "Buying committee mapping", "Multi-touch follow-ups"],
    graphic: <GraphicMomentum />,
    color: "text-emerald-400",
    bg: "bg-emerald-500",
    border: "border-emerald-500/50"
  },
  {
    phase: "05",
    title: "Close & Scale",
    subtitle: "Turn wins into a repeatable pipeline",
    description: "Once deals close, insights don’t disappear. We feed deal learnings back into targeting, messaging, and campaigns, sharpening ICP and improving conversion with every cycle.",
    details: ["Close support", "CRM updates", "Performance reporting", "Insight-driven iteration"],
    graphic: <GraphicScale />,
    color: "text-pink-400",
    bg: "bg-pink-500",
    border: "border-pink-500/50"
  }
];

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------
const SaaSOutboundFramework: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how much we've scrolled into the container
      // When top of container hits top of viewport, scrollProgress = 0
      // When bottom of container hits bottom of viewport, scrollProgress = 1
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledIntoContainer = -rect.top;
      const scrollProgress = Math.max(0, Math.min(1, scrolledIntoContainer / scrollableDistance));

      // Map scroll progress to step index
      const newStep = Math.min(
        Math.floor(scrollProgress * steps.length),
        steps.length - 1
      );

      setActiveStep(newStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Outer container with extra height for scroll space
    <div ref={containerRef} className="relative" style={{ height: `${100 + (steps.length - 1) * 50}vh` }}>
      {/* Sticky inner section that stays in place */}
      <section className="sticky top-0 w-full h-screen bg-[#030305] text-white flex flex-col items-center px-4 lg:px-8 overflow-hidden font-sans">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(120,119,198,0.08),transparent)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col h-full py-24 lg:py-28">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6 shrink-0">
           <div>
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
               How Thyleads Runs Your GTM
             </h2>
           </div>
           <div className="mt-4 md:mt-0 text-right hidden md:block">
             <p className="text-white/40 text-sm">Interactive Process Diagram</p>
           </div>
        </div>

        {/* Interface: Split Deck */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 flex-1 min-h-0">

           {/* LEFT: Navigation - Redesigned Layout */}
           <div className="flex flex-col gap-4 h-full overflow-y-auto pr-2 relative justify-center">
              
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`group relative w-full text-left p-4 rounded-xl transition-all duration-300 border overflow-hidden ${
                      isActive
                        ? 'bg-white/5 border-white/10 shadow-xl'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                    }`}
                  >
                    {/* Active Accent Bar (Left) */}
                    {isActive && (
                      <motion.div
                        layoutId="activeHighlight"
                        className={`absolute left-0 top-0 bottom-0 ${step.bg}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Number */}
                      <span className={`text-2xl font-black transition-colors duration-300 leading-none mt-1 ${
                        isActive ? 'text-white' : 'text-white/10 group-hover:text-white/20'
                      }`}>
                        {step.phase}
                      </span>

                      {/* Content */}
                      <div className="flex-1 z-10">
                         <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                           {step.title}
                         </h4>
                         <p className={`text-[11px] mt-1.5 font-medium uppercase tracking-wide transition-all duration-300 ${
                           isActive ? `opacity-100 ${step.color}` : 'opacity-40 text-white/30'
                         }`}>
                           {step.subtitle}
                         </p>
                      </div>
                    </div>
                  </button>
                )
              })}
           </div>

           {/* RIGHT: Viewport */}
           <div className="relative h-auto lg:h-full bg-[#08080a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 w-full h-full flex flex-col lg:flex-row"
                >
                   
                   {/* Graphic Section */}
                   <div className="w-full lg:w-1/2 order-2 lg:order-1 h-64 lg:h-full flex items-center justify-center p-8 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${steps[activeStep].color.replace('text-', 'from-').replace('400', '500')}/10 to-transparent opacity-50`} />
                      <div className="scale-100 lg:scale-125 relative z-20 w-full h-full max-w-[320px] max-h-[320px]">
                         {steps[activeStep].graphic}
                      </div>
                   </div>

                   {/* Content Section */}
                   <div className="w-full lg:w-1/2 order-1 lg:order-2 p-6 lg:p-12 flex flex-col justify-center bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 backdrop-blur-sm">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest mb-4 lg:mb-6 ${steps[activeStep].color}`}>
                           Step {steps[activeStep].phase} — Workflow
                        </div>
                        
                        <h3 className="text-xl lg:text-3xl font-bold text-white mb-3 lg:mb-4 leading-tight">
                          {steps[activeStep].title}
                        </h3>
                        
                        <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8">
                          {steps[activeStep].description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                           {steps[activeStep].details.map((detail, i) => (
                             <div key={i} className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${steps[activeStep].bg}`} />
                                <span className="text-xs lg:text-sm font-medium text-white/80">{detail}</span>
                             </div>
                           ))}
                        </div>
                      </motion.div>
                   </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>

      </div>
      </section>
    </div>
  );
};

export default SaaSOutboundFramework;
