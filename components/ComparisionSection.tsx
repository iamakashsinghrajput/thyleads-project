'use client'
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Zap 
} from 'lucide-react';

const ThyleadsLanding = () => {
  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans selection:bg-blue-900 selection:text-blue-100 overflow-x-hidden">
      <HeroSection />
      <ComparisonSection />
    </div>
  );
};

// --- 1. Hero Section ---
const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-6 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-400 mb-6 leading-[1.1]">
          Why Go-To{' '}
          <span className="inline-block ml-3 text-transparent bg-clip-text bg-linear-to-r from-gray-300 to-gray-500">
            &ldquo;Thyleads&rdquo;?
          </span>
        </h1>
      </motion.div>
    </section>
  );
};

// --- 2. Comparison Section ---
const ComparisonSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <section ref={containerRef} className="pt-16 pb-24 px-4 md:px-8 max-w-7xl mx-auto relative">

      {/* Background Context Labels */}
      <div className="absolute top-16 left-0 w-full hidden md:flex justify-between px-4 md:px-20 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-red-950/50 border border-red-500/30 rounded-full">
          <span className="text-xs font-bold tracking-wider uppercase text-red-400">Current Reality</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-950/50 border border-blue-500/30 rounded-full">
          <span className="text-xs font-bold tracking-wider uppercase text-blue-400">The Transformation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative">

        {/* Animated Vertical Divider (Desktop Only) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? { height: '100%', opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="hidden md:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-white/10 via-blue-500/30 to-white/10 -translate-x-1/2 z-10"
        />

        {/* Left Side: The Old Way */}
        <div className="md:pr-16 relative">
          <div className="md:text-right mb-8">
            <div className="md:hidden inline-flex items-center gap-2 px-4 py-1.5 bg-red-950/50 border border-red-500/30 rounded-full mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-red-400">Current Reality</span>
            </div>
            <h3 className="text-2xl font-semibold text-white/50">The Old Way</h3>
            <p className="text-white/40 text-sm mt-1">Struggling to scale past $1M ARR</p>
          </div>

          <div className="space-y-6 md:text-right flex flex-col items-end">
            <OldWayItem text="Messy inbound handovers and broken nurturing" delay={0.2} />
            <OldWayItem text="Junk leads eating AE time" delay={0.4} />
            <OldWayItem text="Poor data freshness and CRM hygiene" delay={0.6} />
            <OldWayItem text="More AEs hired to fix a quality problem" delay={0.8} />
            <OldWayItem text="Deals stall after the first meeting" delay={1.0} />
            <OldWayItem text="Follow-ups depend entirely on AEs" delay={1.2} />
          </div>
        </div>

        {/* Right Side: The Thyleads Way */}
        <div className="md:pl-16 relative">
           <div className="mb-8">
            <div className="md:hidden inline-flex items-center gap-2 px-4 py-1.5 bg-blue-950/50 border border-blue-500/30 rounded-full mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-400">The Transformation</span>
            </div>
            <h3 className="text-2xl font-bold text-white">The Thyleads Way</h3>
            <p className="text-blue-400 text-sm mt-1 font-medium">Predictable Scale Engine</p>
          </div>

          <div className="space-y-6">
            <ThyleadsItem text="Structured inbound + outbound with clear qualification stages" delay={1.4} />
            <ThyleadsItem text="Only qualified, pre-scheduled revenue conversations" delay={1.6} />
            <ThyleadsItem text="Live pipeline updates with disciplined CRM ownership" delay={1.8} />
            <ThyleadsItem text="Automation allows 1 AE to handle the work of 10 AEs with ease" delay={2.0} />
            <ThyleadsItem text="Deal momentum ensured with intent-intelligent follow-ups and stakeholder mapping" delay={2.2} />
            <ThyleadsItem text="No right opportunity left untouched." delay={2.4} />
          </div>
        </div>
      </div>
    </section>
  );
};

const OldWayItem = ({ text, delay }: { text: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{
        opacity: 0.6,
        x: 0,
        transition: { delay, duration: 0.5 }
      }}
      whileHover={{ x: -5, opacity: 0.8 }}
      viewport={{ once: true }}
      className="group flex items-center justify-end gap-4 p-4 rounded-lg border border-transparent hover:border-red-500/30 hover:bg-red-950/30 transition-colors w-full md:w-auto"
    >
      <span className="text-white/50 font-medium group-hover:text-red-400 transition-colors">{text}</span>
      <motion.div
        animate={{
          x: [0, -2, 2, -1, 1, 0],
        }}
        transition={{
          duration: 0.4,
          delay: delay + 1,
          repeat: 0
        }}
      >
        <XCircle className="w-5 h-5 text-white/30 group-hover:text-red-400 transition-colors shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const ThyleadsItem = ({ text, delay }: { text: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { delay, type: "spring", stiffness: 100 }
      }}
      whileHover={{ scale: 1.02, x: 5 }}
      viewport={{ once: true }}
      className="group flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-950/30 transition-all w-full md:w-auto"
    >
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform opacity-50" />
        <CheckCircle2 className="w-6 h-6 text-blue-400 relative z-10" />
      </div>
      <span className="text-white/90 font-semibold group-hover:text-blue-300 transition-colors">{text}</span>
    </motion.div>
  );
};




const CTAButton = () => {
  return (
    <Link
      href="/contact"
      className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-blue-500/20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">Let&apos;s talk</span>
      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />

      {/* Pulse Effect */}
      <motion.div
        animate={{ boxShadow: ["0 0 0 0px rgba(59, 130, 246, 0)", "0 0 0 10px rgba(59, 130, 246, 0)"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        className="absolute inset-0 rounded-full"
      />
    </Link>
  );
};

export default ThyleadsLanding;



// 'use client'
// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   XCircle, 
//   CheckCircle2, 
//   ArrowRight, 
//   Zap,
//   BarChart3,
//   Users,
//   Database,
//   RefreshCw,
//   Target
// } from 'lucide-react';

// const ThyleadsLanding = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
//       <HeroSection />
//       <TransformationGrid />
//     </div>
//   );
// };

// // --- 1. Hero Section ---
// const HeroSection = () => {
//   return (
//     <section className="relative pt-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      
//       {/* Abstract Background Blur */}
//       <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-50/80 to-transparent -z-10 pointer-events-none" />
      
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="mb-8"
//       >
//         <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest">
//           <Zap size={12} className="fill-indigo-600" />
//           The Revenue Engine
//         </span>
//       </motion.div>

//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.1 }}
//         className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight"
//       >
//         Turn your sales chaos into <br />
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
//           predictable revenue.
//         </span>
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="text-md text-slate-500 max-w-2xl mx-auto leading-relaxed"
//       >
//         Stop throwing more AEs at a broken process. Upgrade to an intelligent outbound engine designed for scale.
//       </motion.p>
//     </section>
//   );
// };

// // --- 2. Transformation Grid Section ---
// const TransformationGrid = () => {
//   const cards = [
//     {
//       category: "Process & Handovers",
//       icon: <RefreshCw size={20} />,
//       old: "Messy inbound handovers and broken nurturing",
//       new: "Structured inbound + outbound with clear qualification stages"
//     },
//     {
//       category: "Lead Quality",
//       icon: <Target size={20} />,
//       old: "Junk leads eating AE time",
//       new: "Only qualified, pre-scheduled revenue conversations"
//     },
//     {
//       category: "Data Hygiene",
//       icon: <Database size={20} />,
//       old: "Poor data freshness and CRM hygiene",
//       new: "Live pipeline updates with disciplined CRM ownership"
//     },
//     {
//       category: "Scalability",
//       icon: <Users size={20} />,
//       old: "More AEs hired to fix a quality problem",
//       new: "Automation allows 1 AE to handle the work of 10 AEs with ease"
//     },
//     {
//       category: "Deal Velocity",
//       icon: <BarChart3 size={20} />,
//       old: "Deals stall after the first meeting",
//       new: "Deal momentum ensured with intent-intelligent follow-ups"
//     },
//     {
//       category: "Opportunity Cost",
//       icon: <Zap size={20} />,
//       old: "Follow-ups depend entirely on AEs",
//       new: "No right opportunity left untouched."
//     }
//   ];

//   return (
//     <section className="py-12 px-6 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cards.map((card, index) => (
//           <TransformationCard key={index} data={card} index={index} />
//         ))}
//       </div>
//     </section>
//   );
// };

// const TransformationCard = ({ data, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       viewport={{ once: true }}
//       className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex flex-col h-full"
//     >
//       {/* Top Half: The Bottleneck */}
//       <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex-grow-0">
//         <div className="flex items-center gap-2 mb-3 opacity-60">
//           <div className="p-1.5 rounded-md bg-slate-200 text-slate-600">
//             {data.icon}
//           </div>
//           <span className="text-xs font-bold uppercase tracking-wider text-slate-500">The Bottleneck</span>
//         </div>
//         <div className="flex items-start gap-3">
//           <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
//           <p className="text-sm font-medium text-slate-500 line-through decoration-slate-300">
//             {data.old}
//           </p>
//         </div>
//       </div>

//       {/* Connector Visual */}
//       <div className="relative h-px bg-slate-100 w-full overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-1/2 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
//       </div>

//       {/* Bottom Half: The Solution */}
//       <div className="p-6 flex-grow bg-white relative">
//         <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
//            <Zap size={80} className="text-indigo-600" />
//         </div>
        
//         <div className="flex items-center gap-2 mb-4">
//            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">The Breakthrough</span>
//         </div>

//         <div className="flex items-start gap-3 relative z-10">
//           <div className="relative">
//             <div className="absolute inset-0 bg-indigo-100 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
//             <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0 relative z-10" />
//           </div>
//           <p className="text-base font-semibold text-slate-900 group-hover:text-indigo-900 transition-colors">
//             {data.new}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };


// export default ThyleadsLanding;



// 'use client'
// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   XCircle, 
//   CheckCircle2, 
//   ArrowRight, 
//   Zap,
//   BarChart3,
//   Users,
//   Database,
//   RefreshCw,
//   Target,
//   AlertTriangle,
//   ArrowDown
// } from 'lucide-react';

// const ThyleadsLanding = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
//       <HeroSection />
//       <TransformationGrid />
//     </div>
//   );
// };

// // --- 1. Hero Section ---
// const HeroSection = () => {
//   return (
//     <section className="relative pt-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      
//       {/* Abstract Background Blur */}
//       <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-50/80 to-transparent -z-10 pointer-events-none" />
      
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="mb-4"
//       >
//         <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest">
//           <Zap size={12} className="fill-indigo-600" />
//           The Revenue Engine
//         </span>
//       </motion.div>

//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.1 }}
//         className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight"
//       >
//         Turn your sales chaos into <br />
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
//           predictable revenue.
//         </span>
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="text-md text-slate-500 max-w-2xl mx-auto leading-relaxed"
//       >
//         Stop throwing more AEs at a broken process. Upgrade to an intelligent outbound engine designed for scale.
//       </motion.p>
//     </section>
//   );
// };

// // --- 2. Transformation Grid Section ---
// const TransformationGrid = () => {
//   const cards = [
//     {
//       category: "Process & Handovers",
//       icon: <RefreshCw size={20} />,
//       old: "Messy inbound handovers and broken nurturing",
//       new: "Structured inbound + outbound with clear qualification stages"
//     },
//     {
//       category: "Lead Quality",
//       icon: <Target size={20} />,
//       old: "Junk leads eating AE time",
//       new: "Only qualified, pre-scheduled revenue conversations"
//     },
//     {
//       category: "Data Hygiene",
//       icon: <Database size={20} />,
//       old: "Poor data freshness and CRM hygiene",
//       new: "Live pipeline updates with disciplined CRM ownership"
//     },
//     {
//       category: "Scalability",
//       icon: <Users size={20} />,
//       old: "More AEs hired to fix a quality problem",
//       new: "Automation allows 1 AE to handle the work of 10 AEs with ease"
//     },
//     {
//       category: "Deal Velocity",
//       icon: <BarChart3 size={20} />,
//       old: "Deals stall after the first meeting",
//       new: "Deal momentum ensured with intent-intelligent follow-ups"
//     },
//     {
//       category: "Opportunity Cost",
//       icon: <Zap size={20} />,
//       old: "Follow-ups depend entirely on AEs",
//       new: "No right opportunity left untouched."
//     }
//   ];

//   return (
//     <section className="py-12 px-6 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cards.map((card, index) => (
//           <TransformationCard key={index} data={card} index={index} />
//         ))}
//       </div>
//     </section>
//   );
// };

// const TransformationCard = ({ data, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       viewport={{ once: true }}
//       className="group relative bg-white rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 overflow-hidden flex flex-col h-full"
//     >
//       {/* TOP: Outdated / Problem State */}
//       <div className="p-6 bg-slate-50 border-b border-dashed border-slate-200 relative overflow-hidden">
//         {/* 'Outdated' Label */}
//         <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-600 border border-rose-200 opacity-70">
//           Legacy
//         </div>
        
//         <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-50 transition-opacity duration-300">
//            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400">
//              {data.icon}
//            </div>
//            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Detected Issue</span>
//         </div>

//         <div className="flex items-start gap-3 relative z-10">
//           <div className="mt-1 shrink-0">
//              <AlertTriangle className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
//           </div>
//           <p className="text-sm font-medium text-slate-500 group-hover:text-slate-400 transition-colors">
//             {data.old}
//           </p>
//         </div>
//       </div>

//       {/* MIDDLE: Transformation Indicator */}
//       <div className="relative h-6 bg-white flex items-center justify-center -my-3 z-10">
//          <div className="bg-white border border-slate-100 rounded-full p-1 text-slate-300 shadow-sm group-hover:text-indigo-500 group-hover:border-indigo-100 group-hover:shadow-indigo-100 transition-all duration-300">
//             <ArrowDown size={14} className="group-hover:animate-bounce" />
//          </div>
//       </div>

//       {/* BOTTOM: Updated / Solution State */}
//       <div className="p-6 pt-8 flex-grow bg-white relative overflow-hidden">
//         {/* Subtle Background Glow on Hover */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/50 transition-all duration-500" />
        
//         <div className="flex items-center gap-2 mb-3 relative z-10">
//            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
//              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
//              Optimized with Thyleads
//            </span>
//         </div>

//         <div className="flex items-start gap-3 relative z-10">
//           <div className="mt-1 shrink-0">
//              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
//           </div>
//           <p className="text-base font-bold text-slate-900 leading-snug">
//             {data.new}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ThyleadsLanding;



// 'use client'
// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   X, 
//   Check, 
//   Zap,
//   BarChart3,
//   Users,
//   Database,
//   RefreshCw,
//   Target,
//   AlertCircle
// } from 'lucide-react';

// const ThyleadsLanding = () => {
//   return (
//     <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
//       <HeroSection />
//       <ComparisonSection />
//     </div>
//   );
// };

// // --- 1. Hero Section ---
// const HeroSection = () => {
//   return (
//     <section className="relative pt-32 pb-12 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      
//       {/* Minimal Background Element */}
//       <div className="absolute top-0 inset-x-0 h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent -z-10 pointer-events-none" />
      
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-4xl"
//       >
//         <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 uppercase">
//           Why Thyleads
//         </h1>

//         <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
//           The difference between guessing and growing.
//         </p>
//       </motion.div>
//     </section>
//   );
// };

// // --- 2. Comparison Section ---
// const ComparisonSection = () => {
//   const comparisons = [
//     {
//       category: "Process",
//       old: "Messy handovers & broken nurturing",
//       new: "Structured, automated qualification stages",
//       icon: <RefreshCw size={24} />
//     },
//     {
//       category: "Lead Quality",
//       old: "Junk leads eating up AE time",
//       new: "Only pre-scheduled revenue conversations",
//       icon: <Target size={24} />
//     },
//     {
//       category: "Data",
//       old: "Stale data & poor CRM hygiene",
//       new: "Live pipeline updates & clean data",
//       icon: <Database size={24} />
//     },
//     {
//       category: "Scale",
//       old: "Hiring more AEs to fix quality issues",
//       new: "1 AE handles the volume of 10",
//       icon: <Users size={24} />
//     },
//     {
//       category: "Momentum",
//       old: "Deals stall after the first meeting",
//       new: "Intent-driven follow-ups keep deals moving",
//       icon: <BarChart3 size={24} />
//     },
//     {
//       category: "Coverage",
//       old: "Manual follow-ups drop opportunities",
//       new: "No opportunity left untouched",
//       icon: <Zap size={24} />
//     }
//   ];

//   return (
//     <section className="pb-32 px-6 max-w-6xl mx-auto">
      
//       {/* Column Headers */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b border-slate-200 pb-4">
//         <div className="hidden md:block text-center">
//             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Without Thyleads</span>
//         </div>
//         <div className="hidden md:block text-center">
//             <span className="text-xs font-bold uppercase tracking-widest text-blue-600">With Thyleads</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {comparisons.map((item, index) => (
//           <ComparisonRow key={index} data={item} index={index} />
//         ))}
//       </div>
//     </section>
//   );
// };

// const ComparisonRow = ({ data, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       viewport={{ once: true, margin: "-50px" }}
//       className="group relative grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-center p-6 md:p-8 rounded-3xl hover:bg-slate-50 transition-colors duration-500"
//     >
      
//       {/* Mobile Label */}
//       <div className="md:hidden text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Without Thyleads</div>

//       {/* Left Side: The Problem */}
//       <div className="flex items-center gap-4 md:justify-end md:text-right relative">
//         <span className="text-lg font-medium text-slate-400 group-hover:text-slate-500 transition-colors duration-300">
//           {data.old}
//         </span>
//         <div className="shrink-0 p-2 rounded-full bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors duration-300">
//             <X size={18} />
//         </div>
        
//         {/* Mobile Vertical Line Connector */}
//         <div className="md:hidden absolute left-[3.25rem] top-10 bottom-[-2rem] w-px bg-slate-200"></div>
//       </div>

//       {/* Center Icon (Desktop Only) */}
//       <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm text-slate-300 group-hover:text-blue-600 group-hover:border-blue-100 group-hover:scale-110 transition-all duration-300 z-10">
//         {data.icon}
//       </div>

//       {/* Mobile Spacer */}
//       <div className="md:hidden h-4"></div>
//       <div className="md:hidden text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">With Thyleads</div>

//       {/* Right Side: The Solution */}
//       <div className="flex items-center gap-4 md:justify-start md:text-left">
//         <div className="shrink-0 p-2 rounded-full bg-blue-50 text-blue-600 shadow-sm shadow-blue-100 ring-2 ring-transparent group-hover:ring-blue-100 transition-all duration-300">
//             <Check size={18} strokeWidth={3} />
//         </div>
//         <span className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-300">
//           {data.new}
//         </span>
//       </div>

//     </motion.div>
//   );
// };

// export default ThyleadsLanding;


// 'use client'
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   X, 
//   Check, 
//   Zap,
//   BarChart3,
//   Users,
//   Database,
//   RefreshCw,
//   Target,
//   AlertTriangle,
//   FileWarning,
//   CalendarX,
//   Clock,
//   ArrowRight
// } from 'lucide-react';

// const ThyleadsLanding = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
//       <TransformationSection />
//     </div>
//   );
// };

// // --- Transformation Section ---
// const TransformationSection = () => {
//   const [mode, setMode] = useState('old'); // 'old' | 'new'

//   const toggleMode = () => {
//     setMode(prev => prev === 'old' ? 'new' : 'old');
//   };

//   const isNew = mode === 'new';

//   return (
//     <section className={`relative py-24 px-6 transition-colors duration-1000 overflow-hidden min-h-screen flex flex-col items-center ${isNew ? 'bg-white pb-16' : 'bg-slate-200'}`}>
      
//       {/* Background Ambience */}
//       <div className="absolute inset-0 transition-opacity duration-1000 pointer-events-none">
//         {isNew ? (
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white opacity-100" />
//         ) : (
//             <div className="absolute inset-0 opacity-60 bg-[linear-gradient(45deg,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         )}
//       </div>

//       <div className="relative z-10 max-w-5xl w-full mx-auto">
        
//         {/* Header & Toggle */}
//         <div className="text-center mb-16">
//           <motion.h1 
//             layout
//             className={`text-3xl md:text-6xl font-black tracking-tighter mb-10 transition-colors duration-500 ${isNew ? 'text-slate-900' : 'text-slate-600'}`}
//           >
//              Why Go-To “Thyleads”?
//           </motion.h1>
          
//           <div className="flex justify-center mb-6 relative group">
//              {/* Glow effect behind toggle in new mode */}
//              <div className={`absolute inset-0 bg-blue-500/20 blur-2xl rounded-full transition-opacity duration-500 ${isNew ? 'opacity-100' : 'opacity-0'}`} />
             
//              <button 
//                 onClick={toggleMode}
//                 className={`relative flex items-center p-1.5 rounded-full w-80 h-16 transition-all duration-500 shadow-inner cursor-pointer z-10 
//                   ${isNew 
//                     ? 'bg-white ring-1 ring-blue-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]' 
//                     : 'bg-slate-300/80 ring-1 ring-slate-400/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]'
//                   }`}
//              >
//                 <motion.div 
//                     layout
//                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                     className={`absolute w-[48%] h-[85%] rounded-full shadow-lg z-10 flex items-center justify-center font-extrabold text-sm tracking-widest
//                         ${isNew 
//                           ? 'left-[50%] bg-blue-600 text-white shadow-blue-500/30' 
//                           : 'left-[2%] bg-slate-100 text-slate-500 shadow-slate-400/30'
//                         }`}
//                 >
//                     {isNew ? "THYLEADS" : "OLD WAY"}
//                 </motion.div>
                
//                 <span className={`absolute left-[15%] text-xs font-bold tracking-widest transition-all duration-300 ${isNew ? 'text-slate-400 blur-[1px]' : 'text-slate-600 blur-0'}`}>CHAOS</span>
//                 <span className={`absolute right-[13%] text-xs font-bold tracking-widest transition-all duration-300 ${!isNew ? 'text-slate-400 blur-[1px]' : 'text-blue-600 blur-0'}`}>CLARITY</span>
//              </button>
//           </div>
          
//           <motion.div 
//             key={mode}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${
//                 isNew 
//                 ? 'bg-green-50 border-green-100 text-green-700' 
//                 : 'bg-red-50 border-red-100 text-red-700'
//             }`}
//           >
//             {isNew ? (
//                 <><Check size={14} strokeWidth={3} /> System Online. Optimized for Revenue.</>
//             ) : (
//                 <><AlertTriangle size={14} strokeWidth={3} /> System Warning: Inefficiencies Detected.</>
//             )}
//           </motion.div>
//         </div>

//         {/* The Unified Card */}
//         <div className="perspective-1000">
//              <UnifiedTransformationCard mode={mode} />
//         </div>

//       </div>

//       {/* Floating CTA for New Mode */}
//       <AnimatePresence>
//         {isNew && (
//             <motion.div
//                 initial={{ opacity: 0, y: 100 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 100 }}
//                 transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
//                 className="mt-16 z-50 px-6 flex justify-center pointer-events-none"
//             >
//                 <button className="pointer-events-auto group flex items-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:scale-105 transition-all duration-300 hover:bg-black ring-4 ring-white/50">
//                     <span>Start Your Transformation</span>
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//             </motion.div>
//         )}
//       </AnimatePresence>

//     </section>
//   );
// };

// const UnifiedTransformationCard = ({ mode }) => {
//     const isNew = mode === 'new';

//     return (
//         <motion.div
//             layout
//             transition={{ 
//                 type: "spring", stiffness: 300, damping: 30
//             }}
//             className={`relative w-full rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden group
//                 ${isNew 
//                     ? 'bg-white border-blue-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rotate-0 scale-100' 
//                     : 'bg-[#E2E8F0] border-slate-300 shadow-none hover:bg-[#CBD5E1] border-dashed'
//                 }
//             `}
//             style={{
//                 // Subtle Rotation for Chaos Mode
//                 transform: !isNew ? 'rotate(-1deg)' : 'none'
//             }}
//             whileHover={!isNew ? { 
//                 rotate: -0.5,
//                 transition: { duration: 0.3 }
//             } : {}}
//         >

//             {/* List Content */}
//             <div className="p-6 md:p-10">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                     {cardsData.map((data, index) => (
//                         <div key={index} className="relative">
//                             <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={mode}
//                                     initial={{ opacity: 0, y: 10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -10 }}
//                                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                                     className={`flex gap-4 p-4 rounded-2xl transition-all duration-300 ${isNew ? 'hover:bg-blue-50/50' : 'opacity-80'}`}
//                                 >
//                                     {/* Icon */}
//                                     <div className={`shrink-0 h-12 w-12 rounded-xl flex items-center justify-center transition-colors
//                                         ${isNew ? 'bg-blue-50 text-blue-600' : 'bg-slate-300/50 text-slate-500'}
//                                     `}>
//                                         {isNew ? data.newIcon : data.oldIcon}
//                                     </div>

//                                     {/* Text Info */}
//                                     <div>
//                                         <div className="flex items-center justify-between mb-1">
//                                             <h3 className={`text-[10px] font-bold uppercase tracking-widest ${isNew ? 'text-slate-400' : 'text-slate-500'}`}>
//                                                 {data.category}
//                                             </h3>
//                                             <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${isNew ? 'bg-green-100 text-green-700' : 'bg-red-100/80 text-red-700'}`}>
//                                                 {isNew ? 'Optimized' : 'Error'}
//                                             </span>
//                                         </div>
//                                         <p className={`text-base font-bold leading-snug ${isNew ? 'text-slate-900' : 'text-slate-600 font-medium'}`}>
//                                             {isNew ? data.newText : data.oldText}
//                                         </p>
//                                     </div>
//                                 </motion.div>
//                             </AnimatePresence>
//                              {/* Divider Line (Visual only for Old Mode to look messy/fragmented) */}
//                              {!isNew && (
//                                 <div className="absolute bottom-0 left-4 right-4 h-px bg-slate-300/50 rotate-1 transform origin-left" />
//                              )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Background Decoration */}
//             {isNew && (
//                 <>
//                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />
//                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-50 to-transparent rounded-tr-full opacity-50 pointer-events-none" />
//                 </>
//             )}
//             {!isNew && (
//                  // Dirty noise texture for old mode
//                 <div 
//                   className="absolute inset-0 opacity-[0.04] pointer-events-none" 
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
//                   }}
//                 />
//             )}
//         </motion.div>
//     );
// };

// // Data Structure Mapping the Prompt
// const cardsData = [
//     {
//         category: "Process & Handovers",
//         oldText: "Messy inbound handovers & broken nurturing.",
//         newText: "Structured inbound + outbound with clear qualification stages.",
//         oldIcon: <FileWarning size={20} />,
//         newIcon: <RefreshCw size={20} />
//     },
//     {
//         category: "Lead Quality",
//         oldText: "Junk leads eating up precious AE time.",
//         newText: "Only qualified, pre-scheduled revenue conversations.",
//         oldIcon: <AlertTriangle size={20} />,
//         newIcon: <Target size={20} />
//     },
//     {
//         category: "Data Hygiene",
//         oldText: "Poor data freshness and CRM hygiene.",
//         newText: "Live pipeline updates with disciplined CRM ownership.",
//         oldIcon: <Database size={20} />,
//         newIcon: <Check size={20} />
//     },
//     {
//         category: "Scalability",
//         oldText: "Hiring more AEs just to fix a quality problem.",
//         newText: "Automation allows 1 AE to handle the work of 10.",
//         oldIcon: <Users size={20} />,
//         newIcon: <Zap size={20} />
//     },
//     {
//         category: "Deal Velocity",
//         oldText: "Deals stall after the first meeting.",
//         newText: "Deal momentum ensured with intent-intelligent follow-ups and stakeholder mapping.",
//         oldIcon: <CalendarX size={20} />,
//         newIcon: <BarChart3 size={20} />
//     },
//     {
//         category: "Opportunity Cost",
//         oldText: "Follow-ups depend entirely on AEs.",
//         newText: "No right opportunity left unturned.",
//         oldIcon: <Clock size={20} />,
//         newIcon: <Users size={20} />
//     }
// ];

// export default ThyleadsLanding;
