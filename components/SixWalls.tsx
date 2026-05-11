"use client";

import { motion } from 'framer-motion';
import {
  PhoneCall,
  Filter,
  Radar,
  Clock,
  Users,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

const walls = [
  {
    icon: PhoneCall,
    title: 'Deals Stall After the 1st Call',
    description:
      'There is a 70% chance of converting at the 2nd call, yet most prospects never get there. Momentum dies instantly.',
  },
  {
    icon: Filter,
    title: 'Inbound Filled With Noise',
    description:
      'Your team is wasting 40% of their time filtering unqualified inbound leads instead of actually selling.',
  },
  {
    icon: Radar,
    title: 'Hard to Tell Interest From Intent',
    description:
      "Interest is easy to find. Real intent isn't, yet your team spends hours figuring out who is actually serious.",
  },
  {
    icon: Clock,
    title: 'Losing Leads to Delays',
    description:
      'Multi-layer approval delays slow down decisions, causing even high-intent deals to drop off the pipeline.',
  },
  {
    icon: Users,
    title: 'SDR Attrition Kills Pipeline',
    description:
      'SDR attrition averages 14 months. It costs 3 months of ramp time and massive amounts of institutional knowledge.',
  },
  {
    icon: DollarSign,
    title: 'Outbound Is Expensive',
    description:
      'From hiring SDRs to continuous training and execution, building outbound is a resource-heavy and slow process.',
  },
];

type WallCardProps = {
  wall: typeof walls[number];
  delay: number;
  align?: 'left' | 'right';
};

const WallCard = ({ wall, delay, align = 'left' }: WallCardProps) => {
  const Icon = wall.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`group relative bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-[0_8px_25px_-12px_rgba(0,0,0,0.06)] hover:border-primary-200 hover:shadow-[0_15px_40px_-15px_rgba(94,48,208,0.20)] hover:-translate-y-1 transition-all duration-300 ${
        align === 'right' ? 'lg:text-right' : ''
      }`}
    >
      <div
        className={`flex items-start gap-4 ${
          align === 'right' ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Icon */}
        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 group-hover:scale-105 transition-all duration-300 shrink-0">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.7} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base lg:text-lg font-bold text-neutral-900 mb-1.5 leading-snug tracking-tight">
            {wall.title}
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed">
            {wall.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SixWalls = () => {
  const leftCards = walls.slice(0, 3);
  const rightCards = walls.slice(3, 6);

  return (
    <section className="relative w-full bg-slate-50 py-20 lg:py-28 px-6 sm:px-12 overflow-hidden font-sans">


      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* === Left Column: 3 Cards === */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6 order-2 lg:order-1">
            {leftCards.map((wall, i) => (
              <WallCard key={wall.title} wall={wall} delay={i * 0.1} align="left" />
            ))}
          </div>

          {/* === Center Column: Heading & Para === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-4 flex flex-col items-center text-center order-1 lg:order-2 px-2 lg:px-0 lg:py-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-600 shadow-sm mb-6">
              <AlertCircle className="w-4 h-4 text-primary-500" />
              Sound Familiar?
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.1] text-neutral-900">
              Every SaaS team hits the same{' '}
              <span className="bg-primary-100 text-primary-700 px-3 py-1 inline-block mt-2 rounded-md">
                six walls
              </span>{' '}
              while scaling in India.
            </h2>

            <p className="mt-6 text-base lg:text-lg text-neutral-500 leading-relaxed max-w-md">
              Identify the hidden bottlenecks that are leaking revenue and slowing down your sales cycles before they impact your bottom line.
            </p>

            {/* Connector dot accent */}
            <div className="hidden lg:flex items-center gap-2 mt-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary-300" />
            </div>
          </motion.div>

          {/* === Right Column: 3 Cards === */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6 order-3">
            {rightCards.map((wall, i) => (
              <WallCard key={wall.title} wall={wall} delay={0.3 + i * 0.1} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixWalls;
