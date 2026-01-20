"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Activity, TrendingUp, Users, Target, ShieldCheck, Zap } from 'lucide-react';

// Counter animation component
const AnimatedCounter = ({ value, delay }: { value: string; delay: number }) => {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    // Extract numeric value
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) return;

    const targetNumber = parseFloat(numericMatch[0]);
    const prefix = value.split(numericMatch[0])[0];
    const suffix = value.split(numericMatch[0])[1] || "";

    const timer = setTimeout(() => {
      const start = 0;
      const duration = 2000;
      const startTime = Date.now();

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const current = start + (targetNumber - start) * easeOutExpo;

        setDisplayValue(`${prefix}${Math.floor(current)}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setDisplayValue(value);
        }
      };

      updateCounter();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return <>{displayValue}</>;
};

const stats = [
  {
    value: "$100M+",
    label: "SaaS Pipeline",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Cold-to-closed revenue tracked for enterprise partners.",
    size: "lg"
  },
  {
    value: "80%",
    label: "Lead Quality",
    icon: <Target className="w-5 h-5" />,
    description: "Strict ICP alignment.",
    size: "sm"
  },
  {
    value: "60M+",
    label: "Mapped Reach",
    icon: <Users className="w-5 h-5" />,
    description: "High-value decision makers.",
    size: "sm"
  },
  {
    value: "95%",
    label: "Alpha Rate",
    icon: <Zap className="w-5 h-5" />,
    description: "Vs. traditional benchmarks.",
    size: "sm"
  },
  {
    value: "90%",
    label: "Success Rate",
    icon: <ShieldCheck className="w-5 h-5" />,
    description: "Campaign retention driven by ROI.",
    size: "md"
  },
  {
    value: "30%",
    label: "Closure",
    icon: <Activity className="w-5 h-5" />,
    description: "Demo to contract avg.",
    size: "sm"
  },
];

const Results: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-8 pb-32 w-full bg-[#020202] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Layer: Interactive Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.04), transparent 80%)`
        }}
      />
      
      {/* Structural Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-10">
        
        {/* Asymmetric Header */}
        <div className="flex flex-col mb-20">
          <div className="flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-center text-white mb-8 leading-[0.9] drop-shadow-2xl"
            >
              The <span className="text-neutral-700">Results</span> <br/>
              We&apos;re Proud Of.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-neutral-400 text-base md:text-lg text-center font-medium leading-relaxed tracking-tight max-w-3xl mx-auto"
            >
              Our infrastructure isn&apos;t just about sending volume—it&apos;s about the technical precision of high-conversion outbound systems.
            </motion.p>
          </div>
        </div>

        {/* Modular "Neural" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 auto-rows-[200px]">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: idx * 0.08,
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className={`group relative bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-purple-500/40 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)]
                ${stat.size === 'lg' ? 'md:col-span-3 lg:col-span-3 md:row-span-2' : ''}
                ${stat.size === 'md' ? 'md:col-span-3 lg:col-span-2 md:row-span-1' : 'md:col-span-1 lg:col-span-1 md:row-span-1'}
                ${idx === 0 ? 'bg-gradient-to-br from-purple-500/5 to-transparent' : ''}
              `}
            >
              {/* Animated Line Graph */}
              <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  {/* Stock-like path with volatility */}
                  {(() => {
                    // Generate stock-like path with dramatic ups and downs (zigzag)
                    const path = `M 0 35 L 15 25 L 30 32 L 45 20 L 60 28 L 75 15 L 90 22 L 100 10`;
                    const fillPath = `M 0 35 L 15 25 L 30 32 L 45 20 L 60 28 L 75 15 L 90 22 L 100 10 L 100 40 L 0 40 Z`;

                    return (
                      <>
                        {/* Gradient fill under the line */}
                        <motion.path
                          d={fillPath}
                          fill="rgba(255, 255, 255, 0.08)"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: idx * 0.08 + 0.4 }}
                        />

                        {/* Main stock line */}
                        <motion.path
                          d={path}
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.5)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: idx * 0.08 + 0.3, ease: "easeOut" }}
                          vectorEffect="non-scaling-stroke"
                        />
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="text-purple-400 opacity-60 group-hover:opacity-100 transition-all duration-500"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-[8px] font-black text-neutral-600 uppercase tracking-widest group-hover:text-purple-500/40 transition-colors duration-500">
                    ID_0{idx + 1}
                  </div>
                </div>

                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-black text-white tracking-tighter leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:via-purple-200 group-hover:to-white transition-all duration-500
                      ${stat.size === 'lg' ? 'text-6xl md:text-8xl' : 'text-4xl md:text-5xl'}
                    `}
                  >
                    <AnimatedCounter value={stat.value} delay={idx * 0.08 + 0.3} />
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 + 0.4 }}
              >
                <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-1 group-hover:text-purple-300 transition-colors duration-500">
                  {stat.label}
                </p>
                <p className={`text-neutral-500 font-medium leading-tight group-hover:text-neutral-400 transition-colors duration-500
                  ${stat.size === 'lg' ? 'text-xs max-w-[200px]' : 'text-[9px] max-w-[120px]'}
                `}>
                  {stat.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
