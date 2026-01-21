'use client'
import React from 'react';
import { 
  Check, Radio, Filter, Zap, 
  CheckCircle2, ArrowRight
} from 'lucide-react';

const MessyMiddle = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-black text-white flex flex-col items-center px-4 lg:px-8 font-sans py-24 gap-20">
      
      {/* Background Ambience - Updated for deeper depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-purple-900/20 blur-[120px] rounded-full opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150 mix-blend-overlay"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16">
        
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-white to-neutral-700 leading-[1.1]">
            3 Pillars to Solve RevOps for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-white to-neutral-700">B2B SaaS Sales</span>
          </h2>

          <p className="text-base md:text-lg text-neutral-400 leading-relaxed mb-12 max-w-3xl">
            Thyleads focuses on the &ldquo;messy middle&rdquo; between a prospect&rsquo;s first interest and the final close. So AEs only enter when revenue conversations are real.
          </p>

          {/* Refined Outcomes Banner */}
          <div className="flex flex-wrap justify-center mb-8 gap-2 md:gap-4">
              {[
                "Shorter sales cycles",
                "Higher deal control",
                "Fraction of in-house cost"
              ].map((outcome, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs md:text-sm font-medium text-neutral-300">{outcome}</span>
                </div>
              ))}
          </div>
        </div>

        {/* STRATEGY CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Pillar 1: Purple - Intent-Led */}
          <div className="group relative rounded-[2rem] bg-gradient-to-b from-neutral-900/80 to-black border border-white/10 p-8 flex flex-col h-full hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/20">
            {/* Ambient Glow */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-all duration-500" />
            
            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Radio className="w-7 h-7 text-purple-400" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <span className="text-6xl font-bold text-white/5 absolute -top-4 right-0 font-mono select-none">01</span>
                    <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                        Signal &gt; Spam
                    </div>
                </div>

                <h4 className="text-2xl font-bold text-white mb-3">
                    Intent-Led Outbound
                </h4>
                
                <p className="text-sm text-neutral-400 leading-relaxed mb-8 border-b border-white/5 pb-6">
                    We use intent signals + human context to start conversations for a genuine path to revenue.
                </p>

                <div className="space-y-4 mt-auto">
                    {[
                        "Vertical-focused GTM pods",
                        "Alignment with Hiring & tech-stack signals",
                        "Dummy Point"
                    ].map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                            <span className="text-sm text-neutral-300">{point}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Pillar 2: Blue - Revenue-Grade */}
          <div className="group relative rounded-[2rem] bg-gradient-to-b from-neutral-900/80 to-black border border-white/10 p-8 flex flex-col h-full hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">
             {/* Ambient Glow */}
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
            
            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Filter className="w-7 h-7 text-blue-400" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <span className="text-6xl font-bold text-white/5 absolute -top-4 right-0 font-mono select-none">02</span>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                        Systematic Control
                    </div>
                </div>

                <h4 className="text-2xl font-bold text-white mb-3">
                    Revenue Inbound
                </h4>

                <p className="text-sm text-neutral-400 leading-relaxed mb-8 border-b border-white/5 pb-6">
                    Inbound fails when there’s no system to manage intent, timing, and follow-ups.
                </p>

                <div className="space-y-4 mt-auto">
                    {[
                        "Speed-to-lead SLAs",
                        "Fit + intent qualification",
                        "Only serious demand reaches AEs"
                    ].map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                            <span className="text-sm text-neutral-300">{point}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Pillar 3: Orange - Deal Momentum */}
          <div className="group relative rounded-[2rem] bg-gradient-to-b from-neutral-900/80 to-black border border-white/10 p-8 flex flex-col h-full hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/20">
             {/* Ambient Glow */}
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full group-hover:bg-orange-500/20 transition-all duration-500" />
            
            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Zap className="w-7 h-7 text-orange-400" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <span className="text-6xl font-bold text-white/5 absolute -top-4 right-0 font-mono select-none">03</span>
                    <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider text-orange-300">
                        The Deal Assist Pod
                    </div>
                </div>

                <h4 className="text-2xl font-bold text-white mb-3">
                    Deal Momentum
                </h4>

                <p className="text-sm text-neutral-400 leading-relaxed mb-8 border-b border-white/5 pb-6">
                    Complex deals need relentless follow-up, stakeholder mapping, and nudging.
                </p>

                <div className="space-y-4 mt-auto">
                    {[
                        "Thyleads completely owns the back-and-forth grind, so AEs focus purely on closing",
                        "Fit + intent qualification",
                        "Only serious demand reaches AEs"
                    ].map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                            <span className="text-sm text-neutral-300">{point}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MessyMiddle;