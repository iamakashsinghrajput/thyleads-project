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

const ComparisonSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <section ref={containerRef} className="pt-16 pb-24 px-4 md:px-8 max-w-7xl mx-auto relative">

      <div className="absolute top-16 left-0 w-full hidden md:flex justify-between px-4 md:px-20 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-red-950/50 border border-red-500/30 rounded-full">
          <span className="text-xs font-bold tracking-wider uppercase text-red-400">Current Reality</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-950/50 border border-blue-500/30 rounded-full">
          <span className="text-xs font-bold tracking-wider uppercase text-blue-400">The Transformation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative">

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? { height: '100%', opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="hidden md:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-white/10 via-blue-500/30 to-white/10 -translate-x-1/2 z-10"
        />

        <div className="md:pr-16 relative">
          <div className="md:text-right mb-8">
            <div className="md:hidden inline-flex items-center gap-2 px-4 py-1.5 bg-red-950/50 border border-red-500/30 rounded-full mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-red-400">Current Reality</span>
            </div>
            <h3 className="text-2xl font-semibold text-white/50">The Old Way</h3>
            <p className="text-white/40 text-sm mt-1">Struggling to scale past $1M ARR</p>
          </div>

          <div className="space-y-6 md:text-right flex flex-col items-end">
            <OldWayItem text="Messy inbound handovers and broken nurturing" delay={0.05} />
            <OldWayItem text="Junk leads eating AE time" delay={0.1} />
            <OldWayItem text="Poor data freshness and CRM hygiene" delay={0.15} />
            <OldWayItem text="More AEs hired to fix a quality problem" delay={0.2} />
            <OldWayItem text="Deals stall after the first meeting" delay={0.25} />
            <OldWayItem text="Follow-ups depend entirely on AEs" delay={0.3} />
          </div>
        </div>

        <div className="md:pl-16 relative">
           <div className="mb-8">
            <div className="md:hidden inline-flex items-center gap-2 px-4 py-1.5 bg-blue-950/50 border border-blue-500/30 rounded-full mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-400">The Transformation</span>
            </div>
            <h3 className="text-2xl font-bold text-white">The Thyleads Way</h3>
            <p className="text-blue-400 text-sm mt-1 font-medium">Predictable Scale Engine</p>
          </div>

          <div className="space-y-6">
            <ThyleadsItem text="Structured inbound + outbound with clear qualification stages" delay={0.35} />
            <ThyleadsItem text="Only qualified, pre-scheduled revenue conversations" delay={0.4} />
            <ThyleadsItem text="Live pipeline updates with disciplined CRM ownership" delay={0.45} />
            <ThyleadsItem text="Automation allows 1 AE to handle the work of 10 AEs with ease" delay={0.5} />
            <ThyleadsItem text="Deal momentum ensured with intent-intelligent follow-ups and stakeholder mapping" delay={0.55} />
            <ThyleadsItem text="No right opportunity left untouched." delay={0.6} />
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
        transition: { delay, duration: 0.3 }
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
        transition: { delay, type: "spring", stiffness: 200, damping: 20 }
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

      <motion.div
        animate={{ boxShadow: ["0 0 0 0px rgba(59, 130, 246, 0)", "0 0 0 10px rgba(59, 130, 246, 0)"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        className="absolute inset-0 rounded-full"
      />
    </Link>
  );
};

export default ThyleadsLanding;
