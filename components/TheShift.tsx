"use client"
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Zap, VolumeX, TrendingUp, Repeat, Rocket } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

type Shift = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
};

const shifts: Shift[] = [
  {
    icon: Zap,
    title: 'We stop guessing what works',
    desc: 'Built on real SaaS sales experience, we replace random experimentation with systems that consistently bring the right buyers into your pipeline.',
  },
  {
    icon: VolumeX,
    title: 'Outreach stops being noise',
    desc: 'We combine intelligent automation with human insight — so outreach stops being noise and starts generating meaningful conversations.',
  },
  {
    icon: TrendingUp,
    title: 'You get a partner, not a vendor',
    desc: 'We align deeply with your product, ICP, and goals — so every effort ties directly to your revenue outcomes, not surface-level metrics.',
  },
  {
    icon: Repeat,
    title: 'No more "what happened to that lead?"',
    desc: 'We move beyond the first interaction — managing follow-ups, qualification, and deal movement so no opportunity is left behind.',
  },
  {
    icon: Rocket,
    title: 'Your playbook evolves with your market',
    desc: 'We constantly test, refine, and evolve strategies tailored to your market — so you stay ahead while others keep catching up.',
  },
];

export default function TheShift() {
  const topRow = shifts.slice(0, 3);
  const bottomRow = shifts.slice(3);

  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      {/* Soft accent */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-5"
          >
            <Badge>
              <span
                className="w-1 h-1 rounded-full bg-primary-500 animate-pulse"
                aria-hidden="true"
              />
              The Shift
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold tracking-tight leading-[1.15] text-center text-neutral-900"
          >
            What actually changes when{' '}
            <span className="bg-primary-100 text-primary-700 px-3 py-1 inline-block rounded-md">
              we work with you
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl mx-auto text-center text-sm sm:text-base text-slate-600 leading-relaxed font-medium"
          >
            These are the shifts founders and sales leaders tell us they feel
            within the first 60 days.
          </motion.p>
        </div>

        {/* Cards: 3 on top, 2 centered on bottom (6-col grid) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 lg:gap-6">
          {topRow.map(shift => (
            <div key={shift.title} className="md:col-span-2">
              <ShiftCard shift={shift} />
            </div>
          ))}
          {bottomRow.map((shift, i) => (
            <div
              key={shift.title}
              className={`md:col-span-2 ${i === 0 ? 'md:col-start-2' : ''}`}
            >
              <ShiftCard shift={shift} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ShiftCard({ shift }: { shift: Shift }) {
  const Icon = shift.icon;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: easeOut }}
    >
      <Card className="group border-primary-100 bg-primary-50/40 hover:bg-white hover:border-primary-200 hover:shadow-[0_24px_60px_-20px_rgba(132,92,245,0.22),0_8px_20px_-10px_rgba(132,92,245,0.10)] transition-all">
        <CardHeader className="gap-4">
          <div className="w-10 h-10 rounded-lg bg-white border border-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-50 transition-colors">
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>
          <CardTitle>{shift.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{shift.desc}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
