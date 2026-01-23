'use client'
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Filter,
  CalendarCheck,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Database,
  MessageSquare,
  BarChart3,
  ChevronDown
} from 'lucide-react';

const ThyleadsPipeline = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <MainPipelineLayout />
      <CTASection />
    </div>
  );
};

// --- 1. Header Section ---
const Header = () => (
  <section className="pt-24 pb-12 px-6 text-center max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
        The <span className="text-blue-600">Revenue Engine</span> Blueprint
      </h1>
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
        A continuous, automated flow from first touch to closed won. See how Thyleads constructs your pipeline.
      </p>
    </motion.div>
  </section>
);

// --- 2. Main Split Layout (Diagram + Timeline) ---
const MainPipelineLayout = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [activeStage, setActiveStage] = useState(0);
  const totalStages = 3;

  // Auto-advance through stages
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % totalStages);
    }, 4000); // Change stage every 4 seconds

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COLUMN: Sticky Diagram Image */}
        <div className="lg:sticky lg:top-32 order-1 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 bg-white relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] w-full bg-slate-100 flex items-center justify-center group overflow-hidden">
              <img
                src="/Group 7.png"
                alt="Thyleads Pipeline Process Flow"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />

              {/* Active Stage Highlight Overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: activeStage === 0
                    ? "linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 40%, transparent 100%)"
                    : activeStage === 1
                    ? "linear-gradient(to bottom, transparent 0%, rgba(99, 102, 241, 0) 30%, rgba(99, 102, 241, 0.15) 50%, rgba(99, 102, 241, 0) 70%, transparent 100%)"
                    : "linear-gradient(to bottom, transparent 0%, rgba(14, 165, 233, 0) 60%, rgba(14, 165, 233, 0.15) 100%)"
                }}
                transition={{ duration: 1 }}
              />

              {/* Stage Indicator Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    animate={{
                      backgroundColor: activeStage === 0 ? "#3b82f6" : activeStage === 1 ? "#6366f1" : "#0ea5e9"
                    }}
                  />
                  <span className="text-xs font-bold text-slate-700">
                    {activeStage === 0 ? "Intake" : activeStage === 1 ? "Qualification" : "Momentum"}
                  </span>
                </div>
              </div>

              {/* Optional Overlay Text */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                VISUAL BLUEPRINT
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Animated Timeline Steps */}
        <div className="relative order-2 lg:order-2 pl-4 md:pl-0">

          {/* Timeline Spine (Vertical Line) */}
          <div className="absolute left-8 md:left-[35px] top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block">
            {/* Animated Progress Line */}
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-blue-600 to-indigo-600"
              initial={{ height: "0%" }}
              animate={{
                height: activeStage === 0 ? "0%" : activeStage === 1 ? "50%" : "100%"
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Continuous Flow Pulse */}
            <motion.div
              animate={isInView ? {
                top: ['0%', '100%'],
                opacity: [0, 1, 0]
              } : {}}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-50"
            />

            {/* Flow Particles */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                initial={{ top: "0%", opacity: 0 }}
                animate={{
                  top: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5]
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="space-y-12">

            {/* STAGE 1: INTAKE ENGINE */}
            <TimelineStage
              number="01"
              title="Thyleads Intake Engine"
              icon={<Filter className="w-5 h-5 text-white" />}
              color="bg-blue-600"
              delay={0.2}
              isActive={activeStage === 0}
              points={[
                "Structured inbound + outbound aggregation",
                "Automation allows 1 AE to handle 10x volume",
                "Junk leads filtered automatically"
              ]}
              subIcon={<Database className="w-4 h-4" />}
            />

            {/* Flow Arrow Between Stages */}
            <motion.div
              className="hidden md:flex items-center justify-center -my-6 relative z-20"
              animate={{
                opacity: activeStage >= 1 ? 1 : 0.3,
                y: [0, 5, 0]
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="absolute left-[35px] w-px h-8 bg-gradient-to-b from-blue-600 to-indigo-600" />
              <ChevronDown className={`w-6 h-6 ${activeStage >= 1 ? 'text-indigo-600' : 'text-slate-300'} transition-colors ml-[35px]`} />
            </motion.div>

            {/* STAGE 2: SALES READY */}
            <TimelineStage
              number="02"
              title="Sales Ready Conversation"
              icon={<CalendarCheck className="w-5 h-5 text-white" />}
              color="bg-indigo-600"
              delay={0.4}
              isActive={activeStage === 1}
              points={[
                "Only qualified, pre-scheduled meetings",
                "Clear qualification stages before AE handoff",
                "No right opportunity left untouched"
              ]}
              subIcon={<MessageSquare className="w-4 h-4" />}
            />

            {/* Flow Arrow Between Stages */}
            <motion.div
              className="hidden md:flex items-center justify-center -my-6 relative z-20"
              animate={{
                opacity: activeStage >= 2 ? 1 : 0.3,
                y: [0, 5, 0]
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="absolute left-[35px] w-px h-8 bg-gradient-to-b from-indigo-600 to-sky-600" />
              <ChevronDown className={`w-6 h-6 ${activeStage >= 2 ? 'text-sky-600' : 'text-slate-300'} transition-colors ml-[35px]`} />
            </motion.div>

            {/* STAGE 3: MOMENTUM */}
            <TimelineStage
              number="03"
              title="Post Demo Momentum"
              icon={<Rocket className="w-5 h-5 text-white" />}
              color="bg-sky-600"
              delay={0.6}
              isActive={activeStage === 2}
              points={[
                "Deal momentum with intent-intelligent follow-ups",
                "Stakeholder mapping & multi-threading",
                "Live pipeline updates & CRM discipline"
              ]}
              subIcon={<BarChart3 className="w-4 h-4" />}
            />

          </div>
        </div>

      </div>

      {/* Progress Indicator & Manual Controls */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`transition-all duration-300 rounded-full ${
                activeStage === stage
                  ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-indigo-600'
                  : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to stage ${stage + 1}`}
            />
          ))}
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Stage {activeStage + 1} of {totalStages}
        </div>
      </div>
    </section>
  );
};

const TimelineStage = ({
  number,
  title,
  icon,
  color,
  points,
  delay,
  subIcon,
  isActive,
}: {
  number: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  points: string[];
  delay: number;
  subIcon?: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="relative md:pl-24"
    >
      {/* Timeline Node (Icon on the line) */}
      <motion.div
        className={`hidden md:flex absolute left-0 top-0 w-[70px] h-[70px] ${color} rounded-2xl items-center justify-center shadow-lg z-10 ring-4 transition-all duration-500`}
        animate={{
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive
            ? "0 0 40px rgba(59, 130, 246, 0.6), 0 10px 30px rgba(0, 0, 0, 0.2)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          ringColor: isActive ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 1)"
        }}
        transition={{ duration: 0.5 }}
      >
        {icon}
        <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
          {number}
        </div>

        {/* Active Pulse Ring */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 ${color} rounded-2xl`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Mobile Icon (Inline) */}
      <div className="md:hidden flex items-center gap-4 mb-4">
        <motion.div
          className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-md`}
          animate={{
            scale: isActive ? 1.1 : 1
          }}
        >
          {icon}
        </motion.div>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Step {number}</span>
      </div>

      {/* Content Card */}
      <motion.div
        className="bg-white p-6 md:p-8 rounded-2xl border transition-all duration-500 relative overflow-hidden"
        animate={{
          borderColor: isActive ? "rgba(59, 130, 246, 0.5)" : "rgba(226, 232, 240, 1)",
          boxShadow: isActive
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 3px rgba(59, 130, 246, 0.1)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }}
      >
        {/* Active Stage Indicator */}
        {isActive && (
          <motion.div
            className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-600 to-indigo-600"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <h3 className={`text-xl md:text-2xl font-bold mb-4 transition-colors duration-500 ${isActive ? 'text-blue-900' : 'text-slate-900'}`}>
          {title}
        </h3>

        <div className="h-px w-full bg-slate-100 mb-6" />

        <ul className="space-y-3">
          {points.map((point, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-slate-600 text-sm md:text-base leading-relaxed group"
              animate={{
                x: isActive ? 5 : 0,
                color: isActive ? "rgb(30, 58, 138)" : "rgb(71, 85, 105)"
              }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <CheckCircle2 className={`w-5 h-5 ${color.replace('bg-', 'text-')} shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity`} />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom Feature Tag */}
        <div className={`mt-6 pt-4 border-t flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${isActive ? 'border-blue-100 text-blue-600' : 'border-slate-50 text-slate-400'}`}>
          {subIcon}
          <span>Powered by Thyleads AI</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 4. CTA Section ---
const CTASection = () => (
  <section className="py-20 text-center">
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
    >
      <span>Build This Pipeline</span>
      <ArrowRight className="w-5 h-5" />
    </Link>
  </section>
);

export default ThyleadsPipeline;
