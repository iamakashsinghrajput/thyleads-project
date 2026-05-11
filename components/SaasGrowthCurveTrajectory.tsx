"use client"
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
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

type CurvePoint = {
  year: number;
  multiplier: string;
  range: string;
  value: number;
};

const curve: CurvePoint[] = [
  { year: 1, multiplier: '3X', range: '$1M → $3M', value: 3 },
  { year: 2, multiplier: '3X', range: '$3M → $9M', value: 9 },
  { year: 3, multiplier: '2X', range: '$9M → $18M', value: 18 },
  { year: 4, multiplier: '2X', range: '$18M → $36M', value: 36 },
  { year: 5, multiplier: '2X', range: '$36M → $72M+', value: 72 },
];

const W = 720;
const H = 360;
const PAD_X = 60;
const PAD_TOP = 60;
const PAD_BOT = 60;
const MAX_VAL = 72;

function point(i: number, value: number) {
  const x = PAD_X + (i * (W - PAD_X * 2)) / (curve.length - 1);
  const y = H - PAD_BOT - (value / MAX_VAL) * (H - PAD_TOP - PAD_BOT);
  return { x, y };
}

export default function SaasGrowthCurveTrajectory() {

  const linePath = curve
    .map((p, i) => {
      const { x, y } = point(i, p.value);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${linePath} L ${point(curve.length - 1, 0).x} ${
    H - PAD_BOT
  } L ${point(0, 0).x} ${H - PAD_BOT} Z`;

  const depthOffset = 12;
  const depthPath = curve
    .map((p, i) => {
      const { x, y } = point(i, p.value);
      return `${i === 0 ? 'M' : 'L'} ${x + depthOffset} ${y + depthOffset}`;
    })
    .join(' ');

  return (
    <section className="relative py-12 lg:py-16 px-6 sm:px-12 overflow-hidden bg-white font-sans">
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto"
      >

        <div className="text-center mb-12 lg:mb-14">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-5"
          >
            <Badge>
              <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
              The SaaS Growth Curve
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold tracking-tight leading-[1.15] text-center text-neutral-900"
          >
            Built for the{' '}
            <span className="bg-primary-100 text-primary-700 px-3 py-1 inline-block rounded-md">
              3-3-2-2-2
            </span>{' '}
            Curve.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl mx-auto text-center text-sm sm:text-base text-slate-600 leading-relaxed font-medium"
          >
            You can&apos;t hire your way up this curve. The teams that make it
            have pipeline they can count on — month after month, quarter after
            quarter.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl bg-gradient-to-b from-primary-50/40 via-white to-white border border-primary-100 p-6 sm:p-8 overflow-hidden"
        >

          <div
            aria-hidden="true"
            className="absolute inset-6 sm:inset-8 opacity-[0.05] pointer-events-none rounded-2xl"
            style={{
              backgroundImage:
                'linear-gradient(to right, #845cf5 1px, transparent 1px), linear-gradient(to bottom, #845cf5 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto block"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="traj-area" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#845cf5" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#845cf5" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="traj-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9d75f8" />
                <stop offset="100%" stopColor="#5e30d0" />
              </linearGradient>
              <filter id="traj-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {[0, 18, 36, 54, 72].map(v => {
              const y = H - PAD_BOT - (v / MAX_VAL) * (H - PAD_TOP - PAD_BOT);
              return (
                <g key={`y-${v}`}>
                  <line
                    x1={PAD_X - 8}
                    y1={y}
                    x2={W - PAD_X}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                  />
                  <text
                    x={PAD_X - 14}
                    y={y + 4}
                    fontSize="11"
                    fontWeight="600"
                    fill="#94a3b8"
                    textAnchor="end"
                  >
                    ${v}M
                  </text>
                </g>
              );
            })}

            <path
              d={depthPath}
              fill="none"
              stroke="#7040e8"
              strokeOpacity="0.25"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#traj-glow)"
            />

            <motion.path
              d={areaPath}
              fill="url(#traj-area)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#traj-line)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: easeOut, delay: 0.2 }}
            />

            {curve.map((p, i) => {
              const { x, y } = point(i, p.value);
              return (
                <motion.g
                  key={p.year}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.12,
                    ease: easeOut,
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >

                  <circle cx={x} cy={y} r="14" fill="#845cf5" fillOpacity="0.15" />

                  <circle cx={x} cy={y} r="7" fill="#fff" stroke="#7040e8" strokeWidth="3" />
                  <circle cx={x} cy={y} r="3" fill="#7040e8" />

                  <g transform={`translate(${x}, ${y - 32})`}>
                    <rect
                      x="-22"
                      y="-14"
                      width="44"
                      height="24"
                      rx="6"
                      fill="#fff"
                      stroke="#d4c5fd"
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill="#5e30d0"
                    >
                      {p.multiplier}
                    </text>
                  </g>

                  <text
                    x={x}
                    y={H - PAD_BOT + 22}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#64748b"
                    style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
                  >
                    Year {p.year}
                  </text>
                  <text
                    x={x}
                    y={H - PAD_BOT + 38}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#0f172a"
                  >
                    {p.range}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-8 text-center text-sm text-slate-600 italic font-medium"
        >
          Thyleads plugs in wherever you are on the curve, and keeps your
          pipeline on pace.
        </motion.p>
      </motion.div>
    </section>
  );
}
