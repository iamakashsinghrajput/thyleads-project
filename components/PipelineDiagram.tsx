"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Linkedin,
  MapPin,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Mail,
  ArrowUpRight,
  Activity,
} from 'lucide-react';

type Lead = {
  initials: string;
  name: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  icpScore: number;
  intent: 'High' | 'Medium' | 'Low';
  signals: string[];
  message: string;
};

const leads: Lead[] = [
  {
    initials: 'SI',
    name: 'Sneha Iyer',
    title: 'VP Revenue Operations',
    company: 'NorthScale',
    location: 'Bengaluru, India',
    industry: 'B2B SaaS · Series B',
    icpScore: 94,
    intent: 'High',
    signals: ['Hiring SDRs', 'Series B closed', 'Mentioned in TechCrunch'],
    message:
      'Hey Sneha — noticed NorthScale just hired three SDRs after the Series B. We help SaaS teams ramp pipeline in India in 30 days. Worth a 15-min look?',
  },
  {
    initials: 'AK',
    name: 'Arjun Kapoor',
    title: 'Head of Growth',
    company: 'FlowMetrics',
    location: 'Mumbai, India',
    industry: 'MarTech · Series A',
    icpScore: 91,
    intent: 'High',
    signals: ['New funding', 'India market entry', 'GTM rebuild'],
    message:
      'Hi Arjun — saw FlowMetrics is building out the India GTM motion. We run outbound for global SaaS expanding here. 15 mins next week?',
  },
  {
    initials: 'PR',
    name: 'Priya Reddy',
    title: 'Director of Sales',
    company: 'Helix CRM',
    location: 'Hyderabad, India',
    industry: 'CRM · Growth stage',
    icpScore: 89,
    intent: 'High',
    signals: ['Pipeline shortfall', 'Q2 hiring', 'Tech stack match'],
    message:
      'Priya — you mentioned filling pipeline gaps in your last podcast. We do exactly this for SaaS in India. Quick chat?',
  },
];

export default function PipelineDiagram() {
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(1284);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % leads.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setCounter(c => c + Math.floor(Math.random() * 2) + 1),
      2200
    );
    return () => clearInterval(t);
  }, []);

  const lead = leads[index];

  return (
    <div className="relative w-full">

      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-72 h-72 bg-primary-200/45 blur-3xl rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -left-12 w-72 h-72 bg-emerald-100 blur-3xl rounded-full pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-6 h-24 rounded-3xl bg-white border border-primary-100 shadow-[0_20px_40px_-20px_rgba(132,92,245,0.18)] -z-10 -rotate-2 origin-bottom-left"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-3 top-3 h-32 rounded-3xl bg-white border border-primary-100 shadow-[0_24px_50px_-20px_rgba(132,92,245,0.20)] -z-10 rotate-1 origin-bottom-right"
      />

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-white ring-1 ring-primary-100 shadow-[0_30px_80px_-20px_rgba(132,92,245,0.28),0_8px_24px_-8px_rgba(132,92,245,0.10)] overflow-hidden"
      >

        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-white via-primary-50/50 to-white">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
              Live · Verified lead
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <motion.span
              key={counter}
              initial={{ y: -3, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-sm font-extrabold text-slate-900 tabular-nums"
            >
              {counter.toLocaleString()}
            </motion.span>
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
              shipped
            </span>
          </div>
        </div>

        <div className="px-5 pt-5 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`profile-${index}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35 }}
              className="flex items-start gap-3"
            >
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                {lead.initials}
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white border-2 border-white flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                    {lead.name}
                  </h4>
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-slate-700 leading-tight mb-1">
                  {lead.title}
                </p>
                <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="w-3 h-3" strokeWidth={2} />
                    {lead.company}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" strokeWidth={2} />
                    {lead.location}
                  </span>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                  {lead.industry}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-5 pb-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-primary-50 border border-primary-100 px-3 py-2">
              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary-700 mb-0.5">
                ICP score
              </div>
              <div className="flex items-baseline gap-0.5">
                <motion.span
                  key={`icp-${index}`}
                  initial={{ y: 4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-lg font-extrabold text-primary-700 tabular-nums"
                >
                  {lead.icpScore}
                </motion.span>
                <span className="text-[10px] font-bold text-primary-500">/100</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-primary-100 overflow-hidden">
                <motion.div
                  key={`bar-${index}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${lead.icpScore}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"
                />
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2">
              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700 mb-0.5">
                Intent
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" strokeWidth={2.25} />
                <span className="text-sm font-extrabold text-emerald-700">
                  {lead.intent}
                </span>
              </div>
              <div className="mt-1 text-[9px] font-semibold text-emerald-600">
                3 buying signals
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2">
              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-amber-700 mb-0.5">
                Fit
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-600" strokeWidth={2.25} />
                <span className="text-sm font-extrabold text-amber-700">
                  Tier 1
                </span>
              </div>
              <div className="mt-1 text-[9px] font-semibold text-amber-600">
                Strong match
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pb-3">
          <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-1.5">
            Buying signals
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`signals-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-1.5"
            >
              {lead.signals.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-700"
                >
                  <Activity className="w-2.5 h-2.5 text-emerald-600" strokeWidth={2.5} />
                  {s}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 inline-flex items-center gap-1">
              <Mail className="w-3 h-3" strokeWidth={2.25} />
              Personalized opener
            </div>
            <span className="text-[9px] font-bold text-primary-700 uppercase tracking-wider">
              by Claude
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`msg-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white px-3.5 py-3 text-xs leading-relaxed font-medium"
            >
              {lead.message}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-gradient-to-r from-emerald-50/60 via-white to-emerald-50/60">
          <div className="inline-flex items-center gap-1.5 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.25} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
              Verified · Ready to ship
            </span>
          </div>
          <button className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary-700 hover:text-primary-800 transition-colors">
            View details
            <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {leads.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? 'w-6 bg-primary-600'
                : 'w-1.5 bg-primary-200 hover:bg-primary-300'
            }`}
            aria-label={`View lead ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
