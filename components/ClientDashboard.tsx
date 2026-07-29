'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  LayoutDashboard,
  Activity,
  Footprints,
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Everything in One Pod View',
    desc: 'From assigned clients to targets, achieved meetings, and extended pipeline — see your entire pod’s performance at every stage.',
    highlight: true,
  },
  {
    icon: Activity,
    title: 'Real-Time Pipeline Tracking',
    desc: 'Outbound, inbound, and deal progress tracked per client with completion %, On Track / At Risk status, and contact velocity.',
  },
  {
    icon: Footprints,
    title: 'Deal Momentum, Not Just Meetings',
    desc: 'See onboarding, attendance, follow-ups, and signatures — the operational layer most agencies keep hidden.',
  },
];

const ClientDashboard = () => {
  return (
    <section className="relative w-full bg-[#f7f3eb] overflow-hidden flex flex-col items-center px-6 sm:px-12 font-sans py-20 lg:py-28">

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-600 mb-6">
              Client Dashboard
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-neutral-900 mb-6">
              Nothing We Do Is{' '}
              <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">
                Hidden
              </span>
            </h2>

            <p className="text-base md:text-lg text-neutral-500 leading-relaxed mb-8 max-w-md">
              Every account, every message, every follow-up: visible, trackable, and improving in real time.
            </p>

            <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-md">
              Powered by AI agents and one platform that keeps your pipeline running, and getting better, every week.
            </p>

            <Link
              href="/agents"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-full shadow-lg shadow-primary-500/25 transition-all group"
            >
              See Our AI System
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="space-y-3"
          >
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className={`group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 ${
                    feat.highlight
                      ? 'bg-white border-[#d8c9ab]'
                      : 'border-transparent hover:bg-white hover:border-[#e3d7c1]'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-primary-600" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ClientDashboard;
