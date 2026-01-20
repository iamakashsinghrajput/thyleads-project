'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, Calendar, Video,
  CheckSquare, Share2, Mail, BarChart,
  Linkedin, ShieldCheck, UserCheck,
  Monitor, Sparkles, User, MessageCircle,
  ChevronRight, ArrowRight, Database, Globe,
  Zap, Briefcase, Fingerprint, Activity, Layers
} from 'lucide-react';

const steps = [
  {
    title: "Lead Gen",
    subtitle: "Inbound + Outbound",
    icon: <Users className="w-3.5 h-3.5" />,
    description: "Multi-channel acquisition pipeline.",
    color: "from-purple-500 to-indigo-500",
    accent: "text-purple-400",
    border: "border-purple-500/50",
    bg: "bg-purple-500/10"
  },
  {
    title: "Qualification",
    subtitle: "Account Intel",
    icon: <Search className="w-3.5 h-3.5" />,
    description: "Deep account-level scoring.",
    color: "from-blue-500 to-cyan-500",
    accent: "text-blue-400",
    border: "border-blue-500/50",
    bg: "bg-blue-500/10"
  },
  {
    title: "Scheduling",
    subtitle: "Coordination",
    icon: <Calendar className="w-3.5 h-3.5" />,
    description: "No-show management system.",
    color: "from-emerald-500 to-teal-500",
    accent: "text-emerald-400",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Demo",
    subtitle: "Execution",
    icon: <Video className="w-3.5 h-3.5" />,
    description: "High-impact presentation layer.",
    color: "from-orange-500 to-red-500",
    accent: "text-orange-400",
    border: "border-orange-500/50",
    bg: "bg-orange-500/10"
  },
  {
    title: "Alignment",
    subtitle: "Consensus",
    icon: <CheckSquare className="w-3.5 h-3.5" />,
    description: "Post-demo alignment checklist.",
    color: "from-pink-500 to-rose-500",
    accent: "text-pink-400",
    border: "border-pink-500/50",
    bg: "bg-pink-500/10"
  },
  {
    title: "Progression",
    subtitle: "Mapping",
    icon: <Share2 className="w-3.5 h-3.5" />,
    description: "Stakeholder navigation map.",
    color: "from-violet-500 to-purple-500",
    accent: "text-violet-400",
    border: "border-violet-500/50",
    bg: "bg-violet-500/10"
  },
  {
    title: "Nurturing",
    subtitle: "Engagement",
    icon: <Mail className="w-3.5 h-3.5" />,
    description: "Omni-channel drip sequences.",
    color: "from-amber-500 to-orange-500",
    accent: "text-amber-400",
    border: "border-amber-500/50",
    bg: "bg-amber-500/10"
  },
  {
    title: "Reporting",
    subtitle: "Analytics",
    icon: <BarChart className="w-3.5 h-3.5" />,
    description: "Real-time revenue telemetry.",
    color: "from-indigo-500 to-blue-500",
    accent: "text-indigo-400",
    border: "border-indigo-500/50",
    bg: "bg-indigo-500/10"
  }
];

const ProcessJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);

  // Pre-calculate random positions for gradient animation
  const gradientPositions = useRef({
    x: Math.random() * 100,
    y: Math.random() * 100
  });

  // Pause auto-play on hover
  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000); // Slightly faster for responsiveness
    return () => clearInterval(timer);
  }, [isHovering]);

  // Auto-scroll the sidebar to keep active step in view (without scrolling the page)
  useEffect(() => {
    if (stepsContainerRef.current) {
      const container = stepsContainerRef.current;
      const activeElement = container.children[activeStep] as HTMLElement;

      if (activeElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();

        // Calculate if element is out of view within the container
        const isAbove = elementRect.top < containerRect.top;
        const isBelow = elementRect.bottom > containerRect.bottom;

        if (isAbove || isBelow) {
          // Scroll only the container, not the page
          const scrollTop = activeElement.offsetTop - container.offsetTop - (container.clientHeight / 2) + (activeElement.clientHeight / 2);
          container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeStep]);

  return (
    <section className="w-full bg-[#030303] text-white py-24 relative selection:bg-purple-500/30 overflow-hidden font-sans">

      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[12s] delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-20 pb-12 px-6 text-center">
         <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="max-w-3xl mx-auto"
         >
             <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                 <Activity className="w-3 h-3 text-emerald-400" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">System Active</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
                 Process Flow in <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-400 via-white-400 to-gray-800">Action</span>
             </h1>
             <p className="text-neutral-400 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
                 Automated revenue pipeline for high-growth SaaS expansion.
             </p>
         </motion.div>
      </div>

      {/* Compact Dashboard Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid lg:grid-cols-12 gap-4 h-auto lg:h-[500px]">
          
          {/* Left: Compact Step List (Control Panel) */}
          <div className="lg:col-span-5 h-full relative flex flex-col bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
             
             {/* Panel Header */}
             <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Sequence</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
             </div>

             <div 
               ref={stepsContainerRef}
               className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar"
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}
             >
               {steps.map((step, idx) => {
                 const isActive = activeStep === idx;
                 return (
                   <motion.button
                     key={idx}
                     onClick={() => setActiveStep(idx)}
                     className={`
                       relative w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 group flex items-center gap-3
                       ${isActive 
                         ? `bg-white/[0.06] border border-white/10 shadow-lg` 
                         : 'hover:bg-white/[0.03] border border-transparent'}
                     `}
                   >
                     {/* Icon */}
                     <div className={`
                       relative flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center border transition-all duration-300
                       ${isActive 
                         ? `${step.bg} ${step.border} ${step.accent} shadow-inner` 
                         : 'bg-[#111] border-white/5 text-neutral-500 group-hover:text-neutral-300'}
                     `}>
                        {step.icon}
                     </div>

                     <div className="flex-grow min-w-0">
                       <div className="flex justify-between items-center">
                         <h4 className={`text-sm font-bold tracking-tight truncate ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                           {step.title}
                         </h4>
                         {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />}
                       </div>
                       <p className={`text-[11px] truncate ${isActive ? 'text-neutral-300' : 'text-neutral-600'}`}>
                         {step.description}
                       </p>
                     </div>
                   </motion.button>
                 );
               })}
             </div>
          </div>

          {/* Right: Tighter Visualizer (The Monitor) */}
          <div className="lg:col-span-7 h-[400px] lg:h-full relative group perspective-1000">
            <div className="w-full h-full bg-[#080808] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative ring-1 ring-white/5 relative">
              
              {/* Visualizer HUD */}
              <div className="absolute top-0 left-0 right-0 px-6 py-5 flex justify-between items-start z-20 pointer-events-none select-none border-b border-white/5 bg-gradient-to-b from-black/50 to-transparent">
                 <div>
                    <motion.div 
                        key={`title-${activeStep}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-bold text-white tracking-tight flex items-center gap-2"
                    >
                        {steps[activeStep].title}
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-400 font-mono font-normal tracking-wide uppercase">
                            {steps[activeStep].subtitle}
                        </span>
                    </motion.div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Live</span>
                   </div>
                 </div>
              </div>

              {/* Grid Background */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <motion.div
                  animate={{
                    background: `radial-gradient(400px circle at ${gradientPositions.current.x}% ${gradientPositions.current.y}%, rgba(120,119,198,0.15), transparent 40%)`
                  }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute inset-0"
                />
              </div>

              {/* ------- ANIMATION STAGE ------- */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.1 }} // Slight zoom to fill space
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className="w-full h-full flex items-center justify-center p-4"
                  >
                    
                    {/* STEP 1: LEAD GEN */}
                    {activeStep === 0 && (
                      <div className="relative w-full h-full flex items-center justify-center">
                         <div className="relative z-30">
                            <motion.div
                               animate={{ boxShadow: ["0 0 20px rgba(168,85,247,0.2)", "0 0 40px rgba(168,85,247,0.4)", "0 0 20px rgba(168,85,247,0.2)"] }}
                               transition={{ duration: 2, repeat: Infinity }}
                               className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl relative z-10"
                            >
                               <Database className="w-10 h-10 text-white" />
                            </motion.div>
                            {/* Pulsing Rings */}
                            {[1, 1.5].map((scale, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 border border-purple-500/30 rounded-2xl"
                                    animate={{ scale: [1, scale], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                />
                            ))}
                         </div>

                         {/* Sources Orbiting Closer */}
                         {[
                           { icon: <Linkedin className="w-4 h-4" />, x: -120, y: -80, color: "bg-blue-600" },
                           { icon: <Mail className="w-4 h-4" />, x: 120, y: -80, color: "bg-amber-500" },
                           { icon: <Globe className="w-4 h-4" />, x: -120, y: 80, color: "bg-emerald-500" },
                           { icon: <MessageCircle className="w-4 h-4" />, x: 120, y: 80, color: "bg-pink-500" }
                         ].map((source, i) => (
                           <React.Fragment key={i}>
                             <motion.div
                               initial={{ scale: 0, x: 0, y: 0 }}
                               animate={{ scale: 1, x: source.x, y: source.y }}
                               transition={{ type: "spring", delay: i * 0.1 }}
                               className={`absolute w-12 h-12 ${source.color} rounded-xl flex items-center justify-center shadow-lg border border-white/10 z-20`}
                             >
                               <div className="text-white">{source.icon}</div>
                             </motion.div>
                             {/* Connector */}
                             <motion.div 
                                className="absolute w-1/2 h-[1px] bg-white/10 origin-right left-0 top-1/2 z-0"
                                style={{ 
                                    width: Math.sqrt(source.x ** 2 + source.y ** 2), 
                                    rotate: `${Math.atan2(source.y, source.x) * (180 / Math.PI)}deg`,
                                    transformOrigin: "0 0",
                                    left: "50%",
                                    top: "50%"
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                             />
                              {/* Particles */}
                              <motion.div
                                className={`absolute w-2 h-2 rounded-full ${source.color}`}
                                animate={{ 
                                    x: [source.x, 0], 
                                    y: [source.y, 0],
                                    opacity: [1, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 + i * 0.5 }}
                                style={{ left: "50%", top: "50%", marginLeft: -4, marginTop: -4 }}
                              />
                           </React.Fragment>
                         ))}
                      </div>
                    )}

                    {/* STEP 2: QUALIFICATION */}
                    {activeStep === 1 && (
                      <div className="relative flex flex-col items-center justify-center">
                        <motion.div 
                          className="w-48 bg-[#111] border border-white/10 rounded-xl p-4 relative overflow-hidden"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                           <div className="flex items-center gap-3 mb-4">
                             <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                               <UserCheck size={16} />
                             </div>
                             <div className="h-2 w-20 bg-white/20 rounded" />
                           </div>
                           <div className="space-y-2">
                               <div className="h-1.5 w-full bg-white/5 rounded overflow-hidden">
                                   <motion.div className="h-full bg-blue-500" animate={{ width: "80%" }} transition={{ duration: 1 }} />
                               </div>
                               <div className="h-1.5 w-full bg-white/5 rounded overflow-hidden">
                                   <motion.div className="h-full bg-blue-500" animate={{ width: "60%" }} transition={{ duration: 1, delay: 0.2 }} />
                               </div>
                               <div className="h-1.5 w-full bg-white/5 rounded overflow-hidden">
                                   <motion.div className="h-full bg-blue-500" animate={{ width: "90%" }} transition={{ duration: 1, delay: 0.4 }} />
                               </div>
                           </div>
                           {/* Scan Line */}
                           <motion.div 
                             className="absolute top-0 left-0 right-0 h-1 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                             animate={{ top: ["0%", "100%", "0%"] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           />
                        </motion.div>
                        <motion.div 
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ delay: 1, type: "spring" }}
                           className="absolute -right-4 -bottom-4 bg-green-500 text-black text-xs font-black px-3 py-1 rounded shadow-lg -rotate-12 border-2 border-white"
                        >
                           MATCH
                        </motion.div>
                      </div>
                    )}

                    {/* STEP 3: SCHEDULING */}
                    {activeStep === 2 && (
                      <div className="w-64 bg-[#111] border border-white/10 rounded-xl p-3 shadow-xl">
                         <div className="grid grid-cols-4 gap-2">
                           {Array.from({length: 12}).map((_, i) => (
                             <motion.div 
                               key={i}
                               className={`aspect-square rounded border ${i === 6 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-transparent' } flex items-center justify-center`}
                               initial={{ scale: 0 }}
                               animate={{ scale: 1 }}
                               transition={{ delay: i * 0.05 }}
                             >
                                {i === 6 && <CheckSquare size={14} />}
                             </motion.div>
                           ))}
                         </div>
                         <motion.div 
                           className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded p-2 flex items-center gap-2"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 1 }}
                         >
                            <Calendar size={12} className="text-emerald-400" />
                            <span className="text-[10px] text-emerald-200 font-medium">Meeting Confirmed</span>
                         </motion.div>
                      </div>
                    )}

                    {/* STEP 4: DEMO */}
                    {activeStep === 3 && (
                      <div className="relative">
                         <motion.div 
                           className="w-56 h-36 bg-[#0a0a0a] border border-white/20 rounded-lg overflow-hidden flex flex-col shadow-2xl"
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                         >
                            <div className="h-4 bg-white/5 border-b border-white/5 flex items-center px-2 gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            </div>
                            <div className="flex-1 p-2 flex gap-2">
                                <div className="w-1/3 bg-white/5 rounded animate-pulse" />
                                <div className="w-2/3 space-y-2">
                                    <div className="h-2 w-full bg-white/10 rounded" />
                                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                                    <div className="h-16 w-full bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded relative overflow-hidden">
                                        <motion.div className="absolute inset-0 bg-white/5" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
                                    </div>
                                </div>
                            </div>
                         </motion.div>
                         <motion.div 
                            className="absolute -right-6 -bottom-2 w-16 h-20 bg-neutral-800 border border-white/10 rounded-lg shadow-lg"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                         />
                      </div>
                    )}

                    {/* STEP 5: ALIGNMENT */}
                    {activeStep === 4 && (
                      <div className="bg-[#111] border border-white/10 rounded-xl p-4 w-56">
                         <div className="space-y-3">
                           {["Budget", "Timeline", "Tech"].map((item, i) => (
                             <motion.div 
                               key={i} 
                               className="flex items-center justify-between group"
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.2 }}
                             >
                               <div className="flex items-center gap-2">
                                 <div className="w-4 h-4 bg-pink-500 rounded flex items-center justify-center">
                                    <CheckSquare size={10} className="text-white" />
                                 </div>
                                 <span className="text-xs font-medium text-neutral-300">{item}</span>
                               </div>
                               <div className="h-[1px] w-8 bg-white/10" />
                             </motion.div>
                           ))}
                         </div>
                      </div>
                    )}

                    {/* STEP 6: STAKEHOLDER MAPPING (RESTORED) */}
                    {activeStep === 5 && (
                      <div className="relative w-full h-full flex items-center justify-center">
                         {/* Center */}
                         <motion.div className="relative z-20 w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.5)] border-4 border-[#080808]">
                           <Users className="w-8 h-8 text-white" />
                         </motion.div>

                         {/* Nodes */}
                         {[
                           { x: 0, y: -120, label: "Decision Maker", icon: <Fingerprint size={16} />, delay: 0 },
                           { x: 100, y: -60, label: "Tech Lead", icon: <Monitor size={16} />, delay: 0.2 },
                           { x: 100, y: 60, label: "Champion", icon: <Zap size={16} />, delay: 0.4 },
                           { x: 0, y: 120, label: "Finance", icon: <Briefcase size={16} />, delay: 0.6 },
                           { x: -100, y: 60, label: "End User", icon: <User size={16} />, delay: 0.8 },
                           { x: -100, y: -60, label: "Legal", icon: <ShieldCheck size={16} />, delay: 1.0 },
                         ].map((node, i) => (
                           <React.Fragment key={i}>
                             {/* Line */}
                             <motion.div 
                               className="absolute top-1/2 left-1/2 h-0.5 bg-violet-500/30 origin-left z-0"
                               style={{ 
                                 width: Math.sqrt(node.x ** 2 + node.y ** 2) * 0.8, // Adjusted scale for new container
                                 rotate: `${Math.atan2(node.y, node.x) * (180 / Math.PI)}deg`
                               }}
                               initial={{ scaleX: 0 }}
                               animate={{ scaleX: 1 }}
                               transition={{ delay: node.delay, duration: 0.5 }}
                             />
                             
                             {/* Node Dot */}
                             <motion.div 
                               className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 bg-[#111] border border-violet-500/50 rounded-full flex items-center justify-center z-10 shadow-lg"
                               initial={{ x: 0, y: 0, opacity: 0 }}
                               animate={{ x: node.x * 0.8, y: node.y * 0.8, opacity: 1 }} // Adjusted scale for new container
                               transition={{ delay: node.delay, duration: 0.5, type: 'spring' }}
                             >
                                <div className="text-violet-400">{node.icon}</div>
                                <motion.span 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: node.delay + 0.5 }}
                                  className="absolute -bottom-6 text-[8px] font-bold text-white uppercase whitespace-nowrap bg-black/50 px-2 py-0.5 rounded"
                                >
                                  {node.label}
                                </motion.span>
                             </motion.div>
                           </React.Fragment>
                         ))}
                      </div>
                    )}

                    {/* STEP 7: NURTURING (RESTORED) */}
                    {activeStep === 6 && (
                      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                        {[
                          { color: "bg-blue-600", rot: -10, z: 0, icon: <Linkedin className="w-6 h-6" /> },
                          { color: "bg-amber-500", rot: 10, z: 10, icon: <Mail className="w-6 h-6" /> },
                          { color: "bg-neutral-800", rot: 0, z: 30, icon: <MessageCircle className="w-6 h-6" />, main: true }
                        ].map((card, i) => (
                          <motion.div
                             key={i}
                             initial={{ scale: 0, y: 100 }}
                             animate={{ 
                               scale: 1, 
                               y: 0, 
                               rotate: card.rot,
                               zIndex: card.z 
                             }}
                             transition={{ type: "spring", delay: i * 0.2 }}
                             className={`absolute w-40 h-56 rounded-2xl ${card.color} border border-white/10 shadow-2xl flex flex-col items-center justify-center p-4`}
                          >
                            {card.main ? (
                               <div className="text-center">
                                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {card.icon}
                                 </div>
                                 <div className="space-y-2">
                                   <motion.div 
                                      animate={{ width: ["10%", "100%"] }}
                                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                      className="h-2 bg-white/20 rounded-full w-24" 
                                   />
                                   <div className="h-2 bg-white/10 rounded-full w-16 mx-auto" />
                                 </div>
                                 <motion.div 
                                   initial={{ scale: 0 }}
                                   animate={{ scale: 1 }}
                                   transition={{ delay: 1 }}
                                   className="mt-6 px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-[8px] font-bold uppercase"
                                 >
                                   Response Received
                                 </motion.div>
                               </div>
                            ) : (
                               <div className="opacity-50 text-white">
                                  {card.icon}
                               </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* STEP 8: REVENUE (RESTORED) */}
                    {activeStep === 7 && (
                      <div className="w-full max-w-lg h-64 flex items-end justify-between gap-4 px-8 relative">
                        {[30, 45, 25, 60, 50, 80, 70, 95].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: `${h}%`, opacity: 1 }}
                            transition={{ 
                              delay: i * 0.1, 
                              type: "spring",
                              damping: 10,
                              stiffness: 100
                            }}
                            className="w-full relative group"
                          >
                            <div className={`absolute bottom-0 inset-x-0 top-0 rounded-t-lg bg-gradient-to-t from-indigo-900 to-indigo-500 opacity-80 group-hover:to-indigo-400 transition-all`} />
                            
                            {/* Top Tag */}
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1 + i * 0.1 }}
                              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-indigo-900 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ${h}k
                            </motion.div>
                          </motion.div>
                        ))}
                        
                        {/* Trend Line Overlay */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
                           <motion.path 
                             d="M 10 180 L 60 140 L 110 190 L 160 100 L 210 120 L 260 50 L 310 70 L 360 20" 
                             fill="none"
                             stroke="#4ade80"
                             strokeWidth="3"
                             initial={{ pathLength: 0 }}
                             animate={{ pathLength: 1 }}
                             transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                           />
                           <motion.path 
                             d="M 10 180 L 60 140 L 110 190 L 160 100 L 210 120 L 260 50 L 310 70 L 360 20 L 360 250 L 10 250 Z" 
                             fill="url(#gradient)"
                             stroke="none"
                             className="opacity-20"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 0.2 }}
                             transition={{ delay: 1.5 }}
                           />
                           <defs>
                             <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                               <stop offset="0%" stopColor="#4ade80" />
                               <stop offset="100%" stopColor="transparent" />
                             </linearGradient>
                           </defs>
                        </svg>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress Line */}
              <div className="h-0.5 bg-white/5 w-full">
                <motion.div 
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  className="h-full bg-white/50 shadow-[0_0_10px_white]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer CTA - Compact */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-[#080808] border border-white/10 text-center relative overflow-hidden group hover:border-white/20 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
                <h2 className="text-2xl font-bold text-white mb-2">
                Ready to activate GTM?
                </h2>
                <p className="text-neutral-400 text-sm max-w-sm">
                Deploy the protocol and start generating predictable revenue in the Indian market.
                </p>
            </div>

            <Link
              href="/contact"
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center gap-2 flex-shrink-0"
            >
              <span>Navigating to how it works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default ProcessJourney;
