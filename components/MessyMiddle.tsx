'use client'
import React from 'react';
import {
  Check, Radio, Filter, Zap,
  CheckCircle2
} from 'lucide-react';

const MessyMiddle = () => {
  return (
    <section className="relative w-full bg-slate-50 overflow-hidden flex flex-col items-center px-6 sm:px-12 font-sans py-20 lg:py-28 gap-20">
      {/* Top Divider — separates SixWalls from MessyMiddle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl flex items-center justify-center pointer-events-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-200/70 to-primary-300/80" />
        <div className="relative flex items-center justify-center mx-3">
          <span className="absolute w-5 h-5 rounded-full bg-primary-300/30 blur-md" />
          <span className="relative w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(94,48,208,0.6)]" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary-200/70 to-primary-300/80" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16">

        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12 text-neutral-900 leading-[1.1]">
            Stop Hunting, Start Closing with our{' '}
            <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">3-Step SaaS Revenue Engine</span>
          </h2>

          <p className="text-base md:text-lg text-neutral-500 leading-relaxed mb-12 max-w-3xl">
            We focus on the &quot;messy middle&quot; between a prospect&apos;s first interest and the final close. So AEs only enter when revenue conversations are real.
          </p>

          <div className="flex flex-wrap justify-center mb-8 gap-2 md:gap-4">
            {[
              { metric: "40%", label: "Shorter sales cycles" },
              { metric: "2X", label: "Higher deal control" },
              { metric: "1/3rd", label: "of in-house cost" },
            ].map((outcome, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm">
                <Check className="w-3.5 h-3.5 text-primary-500" />
                <span className="text-xs md:text-sm font-medium text-neutral-700">
                  <span className="font-bold text-primary-600">{outcome.metric}</span>{' '}{outcome.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

          <div className="group relative rounded-[2rem] bg-white border-2 border-transparent p-8 flex flex-col h-full shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:border-primary-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(132,92,245,0.20)] transition-all duration-500">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-200/40 blur-[60px] rounded-full group-hover:bg-primary-300/50 transition-all duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <Radio className="w-7 h-7 text-primary-600" />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-6xl font-bold text-neutral-100 absolute -top-4 right-0 font-mono select-none">01</span>
                <div className="px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-wider text-primary-600">
                  Signal &gt; Spam
                </div>
              </div>

              <h4 className="text-2xl font-bold text-neutral-900 mb-3">
                AI-Powered Outbound
              </h4>

              <p className="text-sm text-neutral-500 leading-relaxed mb-8 border-b border-neutral-100">
                Signal-led conversations that convert
              </p>

              <div className="space-y-4 mt-auto">
                {[
                  "Vertical-focused GTM Pods",
                  "Multichannel Outreach",
                  "Pre-qualified meetings"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-sm text-neutral-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative rounded-[2rem] bg-white border-2 border-transparent p-8 flex flex-col h-full shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:border-primary-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(132,92,245,0.20)] transition-all duration-500">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-200/40 blur-[60px] rounded-full group-hover:bg-primary-300/50 transition-all duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <Filter className="w-7 h-7 text-primary-600" />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-6xl font-bold text-neutral-100 absolute -top-4 right-0 font-mono select-none">02</span>
                <div className="px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-wider text-primary-600">
                  Systematic Control
                </div>
              </div>

              <h4 className="text-2xl font-bold text-neutral-900 mb-3">
                Inbound Qualification
              </h4>

              <p className="text-sm text-neutral-500 leading-relaxed mb-8 border-b border-neutral-100">
                Turn inbound into pipeline from noise.
              </p>

              <div className="space-y-4 mt-auto">
                {[
                  "Speed-to-lead execution",
                  "Fit + Intent Qualification",
                  "Only sales-ready leads"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-sm text-neutral-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative rounded-[2rem] bg-white border-2 border-primary-500 p-8 flex flex-col h-full shadow-[0_20px_45px_-15px_rgba(132,92,245,0.30)] hover:-translate-y-2 hover:shadow-[0_25px_55px_-15px_rgba(132,92,245,0.40)] transition-all duration-500">
            {/* India's Biggest Gap — featured ribbon */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <div className="px-3.5 py-1 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                ★ India&rsquo;s Biggest Gap
              </div>
            </div>

            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-200/40 blur-[60px] rounded-full group-hover:bg-primary-300/50 transition-all duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <Zap className="w-7 h-7 text-primary-600" />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-6xl font-bold text-neutral-100 absolute -top-4 right-0 font-mono select-none">03</span>
                <div className="px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-wider text-primary-600">
                  The Deal Assist Pod
                </div>
              </div>

              <h4 className="text-2xl font-bold text-neutral-900 mb-3">
                Deal Momentum
              </h4>

              <p className="text-sm text-neutral-500 leading-relaxed mb-8 border-b border-neutral-100">
                Keep deals moving, with consistent momentum
              </p>

              <div className="space-y-4 mt-auto">
                {[
                  "Structured follow-ups",
                  "Multi-threading across stakeholders",
                  "Post-demo pipeline acceleration"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-sm text-neutral-700">{point}</span>
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
