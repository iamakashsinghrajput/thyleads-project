"use client"
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Target,
  BarChart4,
  Activity,
  Zap,
  UserCheck,
  Mail,
  CheckCircle,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import AnimatedCounter from './AnimatedCounter';

const Hero: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const totalCards = 6;

  // Live Data State
  const [liveData, setLiveData] = useState({
    pipeline: 1.2,
    conversion: 24,
    deals: 45,
    mrr: 85,
    leads: 850,
    speedometer: 72,
    efficiency: 86
  });

  const [barHeights, setBarHeights] = useState([40, 60, 50, 80, 75, 95, 85]);
  const [targetSpeed, setTargetSpeed] = useState(72);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  // Funnel Data State
  const [funnelData, setFunnelData] = useState([
    { label: 'Leads', value: 1000, width: 100 },
    { label: 'Qualified', value: 450, width: 75 },
    { label: 'Meetings', value: 180, width: 50 },
    { label: 'Closed', value: 45, width: 25 }
  ]);

  // Chart Points for organic line movement
  const [chartPoints, setChartPoints] = useState([120, 100, 80, 60, 40, 20, 10]);

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % totalCards);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newSpeed = Math.min(95, Math.max(55, Math.floor(Math.random() * 30) + 60));

      setLiveData((prev) => ({
        pipeline: Number((prev.pipeline + (Math.random() - 0.5) * 0.15).toFixed(2)),
        conversion: Math.min(40, Math.max(10, prev.conversion + (Math.random() - 0.5) * 4)),
        deals: Math.min(80, Math.max(20, prev.deals + (Math.random() - 0.5) * 6)),
        mrr: Math.min(150, Math.max(60, prev.mrr + (Math.random() - 0.5) * 5)),
        leads: Math.min(1200, Math.max(600, prev.leads + Math.floor((Math.random() - 0.5) * 30))),
        speedometer: newSpeed,
        efficiency: Math.min(100, Math.floor(newSpeed * 1.1))
      }));

      setBarHeights((prev) => prev.map((h) => Math.min(100, Math.max(20, h + (Math.random() - 0.5) * 25))));
      setTargetSpeed(newSpeed);

      setFunnelData((prev) => prev.map(stage => ({
        ...stage,
        value: Math.max(10, Math.floor(stage.value + (Math.random() - 0.5) * 15)),
        width: Math.min(100, Math.max(15, stage.width + (Math.random() - 0.5) * 5))
      })));

      setChartPoints((prev) => prev.map((p, i) => {
        const base = [110, 90, 75, 60, 45, 25, 15][i]; 
        return base + (Math.random() - 0.5) * 20;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Speedometer needle smoothing
  useEffect(() => {
    const step = (targetSpeed - currentSpeed) / 20;
    const interval = setInterval(() => {
      setCurrentSpeed((prev) => {
        const diff = targetSpeed - prev;
        if (Math.abs(diff) < 0.2) return targetSpeed;
        return prev + step;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [targetSpeed, currentSpeed]);

  const handleCardClick = () => {
    setActiveCard((prev) => (prev + 1) % totalCards);
  };

  const chartPathDefinition = useMemo(() => 
    `M 0 ${chartPoints[0]} Q 50 ${chartPoints[1]}, 100 ${chartPoints[2]} T 200 ${chartPoints[4]} T 300 ${chartPoints[6]}`, 
    [chartPoints]
  );

  const getCardStyle = (index: number) => {
    const diff = (index - activeCard + totalCards) % totalCards;
    
    return {
      zIndex: totalCards - diff,
      scale: 1 - diff * 0.05,
      y: diff * 25,
      x: diff * 15,
      opacity: diff === 0 ? 1 : diff === 1 ? 0.6 : diff === 2 ? 0.3 : 0,
      pointerEvents: diff === 0 ? 'auto' as const : 'none' as const,
      filter: `blur(${diff * 2}px)`,
    };
  };

  return (
    <section className="relative min-h-screen flex items-center pt-30 pb-16 px-6 sm:px-12 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center z-10">
        
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-14"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 88.12" className="w-3.5 h-3.5 fill-purple-500">
              <path fillRule="evenodd" d="M59.3,10.11a32.17,32.17,0,0,0-4.28.13,30.16,30.16,0,0,0-15.62,6.1A29.31,29.31,0,0,0,28.67,34.48L28.19,37l-2.5.44a35.19,35.19,0,0,0-6.56,1.77,21.57,21.57,0,0,0-5,2.67,16.1,16.1,0,0,0-3,2.79,17,17,0,0,0-3.82,11.1A20.1,20.1,0,0,0,11.12,67.3a18.84,18.84,0,0,0,3.16,3.4A18.52,18.52,0,0,0,16,72c0,.46,0,.93,0,1.41a16.36,16.36,0,0,0,.54,4.26,7.1,7.1,0,0,0,.2.76l.19.53a7,7,0,0,0-.37,1.4L15.62,80a23.17,23.17,0,0,1-6-3.63,25.82,25.82,0,0,1-4.4-4.72A27.53,27.53,0,0,1,0,55.79,24.32,24.32,0,0,1,5.52,39.93a23.62,23.62,0,0,1,4.34-4,29.66,29.66,0,0,1,6.64-3.55A38.82,38.82,0,0,1,22,30.67,36.15,36.15,0,0,1,34.92,10.52,37.54,37.54,0,0,1,54.34,2.93,39.87,39.87,0,0,1,64,3.2a10.35,10.35,0,0,0-.52,2.13c0,.26-.06.53-.08.79a11.37,11.37,0,0,0-1.39.9,10.59,10.59,0,0,0-2.75,3.09ZM78.84,76.26v6.56a2.29,2.29,0,0,0,.77.35l-.1,4.53a26.54,26.54,0,0,1-3.41.39,5,5,0,0,1-1.69-.28,2.43,2.43,0,0,1-1-.55L73.13,87a9.69,9.69,0,0,1-4.81,1.12,6.23,6.23,0,0,1-4.26-1.3,5.39,5.39,0,0,1-1.43-4.16c0-1.92.55-3.21,1.62-3.85a11.36,11.36,0,0,1,5.14-1.1l2.3-.1V76.8c0-.4-.45-.61-1.34-.61-1.93,0-3.89.15-5.81.32l-1.05.1-.16-4.85A30,30,0,0,1,71,70.64a12.32,12.32,0,0,1,5.65,1.08c1.44.76,2.17,2.31,2.17,4.54ZM39.48,72.44c-3-.32-5.19-.48-6.55-.48a13.58,13.58,0,0,0-2.38.11.46.46,0,0,0-.33.47.6.6,0,0,0,.38.54,16,16,0,0,0,2.41.64,33.59,33.59,0,0,1,3.32.88,7.82,7.82,0,0,1,2.33,1.21A3.74,3.74,0,0,1,40,77.72a11.36,11.36,0,0,1,.33,3q0,4-2.11,5.66c-1.4,1.12-3.52,1.69-6.35,1.69a34.22,34.22,0,0,1-4.29-.29c-1.5-.19-2.66-.38-3.47-.57L22.91,87l.32-5.65a59.64,59.64,0,0,0,8,.7c1.11,0,1.66-.24,1.66-.74,0-.21-.13-.36-.38-.46a14.19,14.19,0,0,0-2.08-.4c-3-.47-5-1.2-6.08-2.19s-1.61-2.61-1.61-4.86q0-4.32,2.07-5.91c1.39-1.06,3.52-1.6,6.39-1.6a50.13,50.13,0,0,1,7.12.61l1.34.22-.19,5.75Zm59.52,0Q94.5,72,92.45,72a14.32,14.32,0,0,0-2.37.11.46.46,0,0,0-.34.47.59.59,0,0,0,.39.54,16.7,16.7,0,0,0,2.4.64,31.27,31.27,0,0,1,3.33.88,7.76,7.76,0,0,1,2.32,1.21,3.7,3.7,0,0,1,1.38,1.91,11.36,11.36,0,0,1,.33,3q0,4-2.1,5.66c-1.41,1.12-3.53,1.69-6.36,1.69a34.22,34.22,0,0,1-4.29-.29c-1.5-.19-2.68-.39-3.46-.57L82.43,87l.32-5.65a59.77,59.77,0,0,0,8,.7c1.11,0,1.66-.24,1.66-.74a.49.49,0,0,0-.38-.46,18,18,0,0,0-2.07-.4c-3-.44-5-1.2-6.09-2.19s-1.61-2.61-1.61-4.86c0-2.88.7-4.86,2.08-5.91s3.51-1.6,6.38-1.6a43.62,43.62,0,0,1,7.12.61l1.34.22L99,72.44ZM49.92,84.06a3.56,3.56,0,0,0,2.3-1V80.62l-2.06.13a1.54,1.54,0,0,0-1.58,1.72c0,1.06.45,1.59,1.34,1.59Zm19.7,0a3.56,3.56,0,0,0,2.3-1V80.62l-2.06.13a1.54,1.54,0,0,0-1.57,1.72c0,1.06.44,1.59,1.33,1.59Zm-10.48-7.8v6.56a2.29,2.29,0,0,0,.77.35l-.09,4.53a26.82,26.82,0,0,1-3.42.39,5,5,0,0,1-1.69-.28,2.5,2.5,0,0,1-1-.55L53.43,87a9.68,9.68,0,0,1-4.8,1.12,6.21,6.21,0,0,1-4.27-1.3,5.36,5.36,0,0,1-1.43-4.16c0-1.92.54-3.21,1.62-3.85a11.24,11.24,0,0,1,5.15-1.1l2.29-.1V76.8c0-.4-.44-.61-1.34-.61-1.94,0-3.89.15-5.81.32l-1.05.1-.16-4.85a30,30,0,0,1,7.69-1.12A12.26,12.26,0,0,1,57,71.72c1.43.77,2.16,2.3,2.16,4.54ZM101.75,6.9l2.51,3.31a2,2,0,0,1-.38,2.78l-2.67,2a15.53,15.53,0,0,1,.93,4.08l3,.41a2,2,0,0,1,1.7,2.24l-.56,4.13a2,2,0,0,1-2.24,1.7l-3.32-.46a15.33,15.33,0,0,1-2.24,3.53l1.86,2.45a2,2,0,0,1-.39,2.79L96.67,38.4A2,2,0,0,1,93.89,38l-2-2.67a15.2,15.2,0,0,1-4.09.92l-.41,3A2,2,0,0,1,85.11,41L81,40.45a2,2,0,0,1-1.7-2.25l.46-3.31a16.2,16.2,0,0,1-3.54-2.24l-2.44,1.86A2,2,0,0,1,71,34.13l-2.51-3.31A2,2,0,0,1,68.85,28l2.67-2a15.21,15.21,0,0,1-.92-4.08l-3-.42a2,2,0,0,1-1.7-2.24l.56-4.12a2,2,0,0,1,2.24-1.7L72,13.9a16.13,16.13,0,0,1,2.24-3.53L72.36,7.93a2,2,0,0,1,.38-2.78l3.31-2.51A2,2,0,0,1,78.84,3l2,2.66a15.92,15.92,0,0,1,4.08-.92l.42-3A2,2,0,0,1,87.6,0l4.12.56a2,2,0,0,1,1.7,2.24L93,6.14a15.83,15.83,0,0,1,3.54,2.24L99,6.53a2,2,0,0,1,2.8.37ZM58.67,32.54a1.33,1.33,0,0,0-1.89.33l-1.19,1.69a10,10,0,0,0-1.34-.45,13.33,13.33,0,0,0-1.4-.28l-.38-2.22a1.34,1.34,0,0,0-1.57-1.1L48.12,31a1.29,1.29,0,0,0-.86.55,1.25,1.25,0,0,0-.23,1l.35,2a9.48,9.48,0,0,0-1.27.65A10.6,10.6,0,0,0,45,36l-1.87-1.3a1.24,1.24,0,0,0-1-.24,1.35,1.35,0,0,0-.88.57l-1.6,2.29A1.33,1.33,0,0,0,40,39.24l1.69,1.19a8.79,8.79,0,0,0-.45,1.34,13.37,13.37,0,0,0-.29,1.4l-2.21.38a1.34,1.34,0,0,0-1.1,1.57l.49,2.78a1.29,1.29,0,0,0,.55.86,1.25,1.25,0,0,0,1,.23l2-.35a9.48,9.48,0,0,0,.65,1.27,12,12,0,0,0,.79,1.17l-1.3,1.85a1.24,1.24,0,0,0-.24,1,1.28,1.28,0,0,0,.57.88l2.29,1.63a1.39,1.39,0,0,0,1,.21,1.33,1.33,0,0,0,.88-.54l1.19-1.72a8.79,8.79,0,0,0,1.34.45,13.74,13.74,0,0,0,1.39.29l.39,2.21a1.34,1.34,0,0,0,1.57,1.1L55,57.94a1.35,1.35,0,0,0,1.1-1.56l-.35-2A9.48,9.48,0,0,0,57,53.7a12,12,0,0,0,1.17-.79L60,54.21a1.27,1.27,0,0,0,1,.24,1.28,1.28,0,0,0,.87-.57l1.63-2.29a1.39,1.39,0,0,0,.21-1,1.41,1.41,0,0,0-.54-.88l-1.72-1.19a10,10,0,0,0,.45-1.34,13.68,13.68,0,0,0,.28-1.39l2.22-.39a1.34,1.34,0,0,0,1.1-1.57L65,41.05a1.29,1.29,0,0,0-.55-.87,1.25,1.25,0,0,0-1-.23l-2,.35A11.58,11.58,0,0,0,60.78,39,9.7,9.7,0,0,0,60,37.89L61.29,36a1.24,1.24,0,0,0,.24-1,1.4,1.4,0,0,0-.57-.88l-2.29-1.6Zm-7.83,7.88a3.94,3.94,0,0,1,1.64,0A4.07,4.07,0,0,1,55,42.24a4.17,4.17,0,0,1,.55,3.16,4.14,4.14,0,0,1-3.3,3.13,4.06,4.06,0,0,1-4.17-1.83,4.1,4.1,0,0,1-.6-1.52A4.06,4.06,0,0,1,49.32,41a3.92,3.92,0,0,1,1.52-.59Zm36.63-28a8.18,8.18,0,1,1-9.21,7,8.17,8.17,0,0,1,9.21-7ZM114,29.87c.38.36.74.73,1.11,1.12a29.19,29.19,0,0,1,3,3.9,33,33,0,0,1,4.77,17.93c-.07,6.31-1.77,12.59-5.25,17.21A27.45,27.45,0,0,1,109,77.45c-.77.43-1.58.84-2.41,1.22l0-.33a14.25,14.25,0,0,0-.49-2.52h0a10.33,10.33,0,0,0-.55-1.47,6.79,6.79,0,0,0,.27-1.7l.06-1.87a19.65,19.65,0,0,0,5.94-5.14c2.5-3.33,3.73-8,3.78-12.87a25.48,25.48,0,0,0-3.59-13.87A20.75,20.75,0,0,0,109.68,36l-.45-.46c0-.21,0-.43.06-.64a9.81,9.81,0,0,0,1.4-.9A10.44,10.44,0,0,0,114,29.87Z"/>
            </svg>
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">B2B Appointment Setting Service</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-white to-neutral-700"
          >
            Go-To-Market For SaaS  <br />
            That Drives Revenue
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-neutral-400 mb-16 max-w-xl leading-"
          >
            We help global SaaS companies build and convert demand through outbound, inbound qualification, and deal momentum.
          </motion.p>

          <Link
            href="/contact"
            className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black py-5 px-12 rounded-full transition-all duration-300 flex items-center justify-center space-x-3 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]"
          >
            <span className="uppercase tracking-[0.2em] text-xs">Start Your Growth</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </Link>
        </motion.div>

        {/* Right: Stacked Live Cards */}
        <div className="relative h-[550px] w-full flex items-center justify-center lg:justify-end">

          {/* Floating SaaS Words */}
          <div className="absolute inset-0 overflow-visible pointer-events-none z-50">
            {/* PIPELINE */}
            <motion.div
              className="absolute top-12 left-0"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-xs font-black text-purple-400/40 tracking-[0.3em]">PIPELINE</span>
            </motion.div>

            {/* MRR */}
            <motion.div
              className="absolute top-20 right-8"
              animate={{
                y: [0, 15, 0],
                x: [0, -8, 0],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <span className="text-sm font-black text-indigo-400/50 tracking-[0.3em]">MRR</span>
            </motion.div>

            {/* GROWTH */}
            <motion.div
              className="absolute bottom-28 left-4"
              animate={{
                y: [0, -25, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <span className="text-xs font-black text-emerald-400/40 tracking-[0.3em]">GROWTH</span>
            </motion.div>

            {/* CONVERSION */}
            <motion.div
              className="absolute top-36 left-12"
              animate={{
                y: [0, -18, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <span className="text-[10px] font-black text-purple-400/35 tracking-[0.3em]">CONVERSION</span>
            </motion.div>

            {/* ARR */}
            <motion.div
              className="absolute bottom-20 right-12"
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <span className="text-sm font-black text-indigo-400/45 tracking-[0.3em]">ARR</span>
            </motion.div>

            {/* LEADS */}
            <motion.div
              className="absolute top-28 right-4"
              animate={{
                y: [0, 12, 0],
                opacity: [0.25, 0.55, 0.25]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5
              }}
            >
              <span className="text-xs font-black text-purple-400/40 tracking-[0.3em]">LEADS</span>
            </motion.div>

            {/* VELOCITY */}
            <motion.div
              className="absolute bottom-40 left-8"
              animate={{
                y: [0, -22, 0],
                x: [0, 5, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <span className="text-[10px] font-black text-amber-400/40 tracking-[0.3em]">VELOCITY</span>
            </motion.div>

            {/* SCALE */}
            <motion.div
              className="absolute top-44 left-2"
              animate={{
                y: [0, -16, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            >
              <span className="text-xs font-black text-indigo-400/35 tracking-[0.3em]">SCALE</span>
            </motion.div>

            {/* ROI */}
            <motion.div
              className="absolute bottom-32 right-6"
              animate={{
                y: [0, -20, 0],
                opacity: [0.35, 0.65, 0.35]
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            >
              <span className="text-sm font-black text-emerald-400/45 tracking-[0.3em]">ROI</span>
            </motion.div>

            {/* FUNNEL */}
            <motion.div
              className="absolute top-52 right-16"
              animate={{
                y: [0, 18, 0],
                opacity: [0.28, 0.58, 0.28]
              }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2
              }}
            >
              <span className="text-[10px] font-black text-purple-400/38 tracking-[0.3em]">FUNNEL</span>
            </motion.div>

            {/* Revenue Metrics Floating */}
            {/* $250K */}
            <motion.div
              className="absolute"
              style={{ left: '10%', top: '75%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.1, 1, 0.9, 0],
                y: [0, -20, -40, -60]
              }}
              transition={{
                duration: 4,
                delay: 0.5,
                repeat: Infinity,
                repeatDelay: 6,
                ease: 'easeOut'
              }}
            >
              <span className="text-lg font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">$250K</span>
            </motion.div>

            {/* +120% */}
            <motion.div
              className="absolute"
              style={{ left: '20%', top: '55%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.1, 1, 0.9, 0],
                y: [0, -20, -40, -60]
              }}
              transition={{
                duration: 4,
                delay: 1.5,
                repeat: Infinity,
                repeatDelay: 6,
                ease: 'easeOut'
              }}
            >
              <span className="text-lg font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">+120%</span>
            </motion.div>

            {/* $1.2M */}
            <motion.div
              className="absolute"
              style={{ left: '15%', top: '35%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.1, 1, 0.9, 0],
                y: [0, -20, -40, -60]
              }}
              transition={{
                duration: 4,
                delay: 2.5,
                repeat: Infinity,
                repeatDelay: 6,
                ease: 'easeOut'
              }}
            >
              <span className="text-lg font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">$1.2M</span>
            </motion.div>

            {/* ARR ↑ */}
            <motion.div
              className="absolute"
              style={{ left: '25%', top: '20%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.1, 1, 0.9, 0],
                y: [0, -20, -40, -60]
              }}
              transition={{
                duration: 4,
                delay: 3.5,
                repeat: Infinity,
                repeatDelay: 6,
                ease: 'easeOut'
              }}
            >
              <span className="text-lg font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">ARR ↑</span>
            </motion.div>
          </div>

          <div className="relative w-full max-w-[380px] h-[500px]">
            {/* Card 1: Pipeline */}
            <motion.div
              layout
              animate={getCardStyle(0)}
              onClick={handleCardClick}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl cursor-pointer group"
              style={{
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 120px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black rounded-full uppercase tracking-widest text-purple-400">Live Momentum</div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-1">Pipeline Growth</h3>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-8">Monthly GTM Velocity</p>
              
              <div className="flex items-end justify-between gap-2 h-32 mb-8">
                {barHeights.map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: `${h}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="flex-1 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-lg relative group-hover:from-purple-500 group-hover:to-indigo-400"
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Pipeline</p>
                  <AnimatedCounter value={liveData.pipeline} prefix="$" suffix="M+" decimals={2} className="text-xl font-black text-white" />
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Conversion</p>
                  <AnimatedCounter value={liveData.conversion} suffix="%" className="text-xl font-black text-purple-400" />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Funnel */}
            <motion.div
              layout
              animate={getCardStyle(1)}
              onClick={handleCardClick}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl cursor-pointer group"
              style={{
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 120px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black rounded-full uppercase tracking-widest text-purple-400">Funnel Flow</div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-1">Conversion Flow</h3>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-8">Lead to Closed Won</p>

              <div className="space-y-4 mb-8">
                {funnelData.map((f, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase text-neutral-400">
                      <span>{f.label}</span>
                      <AnimatedCounter value={f.value} />
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${f.width}%` }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-600"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span className="text-[10px] font-black uppercase text-white">Peak Efficiency</span>
                </div>
                <AnimatedCounter value={liveData.efficiency} suffix="%" className="font-black text-purple-400" />
              </div>
            </motion.div>

            {/* Card 3: Revenue Index */}
            <motion.div
              layout
              animate={getCardStyle(2)}
              onClick={handleCardClick}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl cursor-pointer group"
              style={{
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 120px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black rounded-full uppercase tracking-widest text-purple-400">Growth Index</div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-1">Revenue Growth</h3>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-8">6-Month Scaling Trend</p>

              <div className="relative h-40 mb-8 overflow-visible">
                <svg className="w-full h-full" viewBox="0 0 300 120">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={chartPathDefinition}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    animate={{ d: chartPathDefinition }}
                    transition={{ duration: 1.5 }}
                  />
                  {/* Moving pulse dot */}
                  <motion.circle
                    r="6"
                    fill="#a855f7"
                    animate={{
                      cx: [0, 300],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      offsetPath: `path("${chartPathDefinition}")`,
                      offsetRotate: 'auto'
                    }}
                  />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Current MRR</p>
                  <AnimatedCounter value={liveData.mrr} prefix="$" suffix="K+" className="text-xl font-black text-white" />
                </div>
                <div className="bg-purple-500/20 p-4 rounded-2xl border border-purple-500/30 text-center">
                  <div className="text-purple-400 text-xs font-black">+42% YoY</div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Performance */}
            <motion.div
              layout
              animate={getCardStyle(3)}
              onClick={handleCardClick}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl cursor-pointer group overflow-hidden"
              style={{
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 120px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black rounded-full uppercase tracking-widest text-purple-400">Real-Time</div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-1">Performance Score</h3>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-6">Operational Excellence</p>

              <div className="flex items-center justify-center py-4 mb-6 relative">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="68" stroke="#1f2937" strokeWidth="10" fill="none" strokeDasharray="427" strokeDashoffset="107" strokeLinecap="round" />
                  <motion.circle
                    cx="80" cy="80" r="68"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="427"
                    animate={{ strokeDashoffset: 427 - (427 * (currentSpeed / 100) * 0.75) }}
                    transition={{ duration: 1 }}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <AnimatedCounter value={currentSpeed} suffix="%" className="text-3xl font-black text-white" />
                  <span className="text-[9px] font-black text-neutral-500 uppercase mt-1">Efficiency</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[9px] font-black uppercase text-neutral-400">Total Leads Handled</span>
                <AnimatedCounter value={liveData.leads} className="text-sm font-black text-white" />
              </div>
            </motion.div>

            {/* Card 5: Growth Velocity */}
            <motion.div
              layout
              animate={getCardStyle(4)}
              onClick={handleCardClick}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl cursor-pointer group"
              style={{
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 120px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <BarChart4 className="w-6 h-6 text-purple-400" />
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black rounded-full uppercase tracking-widest text-purple-400">Insights</div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-1">Growth Velocity</h3>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-8">Performance Dashboard</p>

              <div className="flex items-end justify-between gap-2 h-40 mb-8">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${h}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="flex-1 bg-gradient-to-t from-purple-600/80 via-purple-500 to-purple-400 rounded-lg relative"
                  />
                ))}
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Pipeline Generated</p>
                  <AnimatedCounter value={liveData.pipeline} prefix="$" suffix="M+" decimals={2} className="text-xl font-black text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </motion.div>

            {/* Card 6: Lead Scoring */}
            <motion.div
              layout
              animate={getCardStyle(5)}
              onClick={handleCardClick}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl cursor-pointer group"
              style={{
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 120px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500" />
                  <UserCheck className="w-6 h-6 text-white relative z-10" />
                </div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-1">Lead Scoring</h3>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-8">AI Intelligence</p>

              <div className="space-y-4 mb-8">
                <div className="bg-neutral-800/50 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-xs font-black uppercase text-white">Semantic Match</span>
                  </div>
                  <span className="text-lg font-black text-purple-400">98%</span>
                </div>

                <div className="bg-neutral-800/50 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-xs font-black uppercase text-white">Meeting Booked</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-5 rounded-2xl border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-1">State</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">$250K</span>
                      <span className="text-sm font-black text-purple-400">WON</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Carousel Navigation Dots */}
          <div className="absolute -bottom-12 right-0 left-0 flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveCard(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${activeCard === idx ? 'w-8 bg-purple-500' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
