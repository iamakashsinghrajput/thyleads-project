"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type TrustedByProps = {
  theme?: 'dark' | 'light';
  className?: string;
};

const TrustedBy: React.FC<TrustedByProps> = ({ theme = 'dark', className = '' }) => {
  const isLight = theme === 'light';
  const bgClass = isLight ? 'bg-slate-50' : 'bg-[#050505]';
  const labelClass = isLight ? 'text-neutral-500' : 'text-neutral-400';
  const fadeFromClass = isLight ? 'from-slate-50' : 'from-[#050505]';
  const logoFilterClass = isLight
    ? 'brightness-0 opacity-40 group-hover:opacity-100'
    : 'brightness-0 invert opacity-40 group-hover:opacity-100';

  /*
   * Heights are set per logo, not shared, because these marks have very
   * different aspect ratios and a uniform height makes them look wildly
   * different sizes. At one fixed height a 4.6:1 wordmark like Nurix renders
   * three times wider than a 1.5:1 mark like TeamLease.
   *
   * So each height is derived from the artwork's own ratio to land on roughly
   * the same optical width. The `*-trim.png` files are padding-stripped copies
   * of vendor exports that shipped the mark adrift on a 1536x1024 canvas; the
   * untouched originals are still on disk.
   *
   * Note this strip renders logos on both themes, so it flattens with either
   * `brightness-0 invert` (dark) or `brightness-0` (light). Both keep only the
   * alpha channel, which is why CometChat uses the knocked-out `-mono` asset —
   * its C was a white shape on an opaque box and flattened into invisibility.
   */
  const companies = [
    { name: 'CleverTap', logo: '/images/CleverTap.svg', h: 'h-8 md:h-10' },   // 2.72:1
    { name: 'Pazo', logo: '/images/pazo.png', h: 'h-9 md:h-11' },             // 2.52:1
    { name: 'Dice', logo: '/images/dice.png', h: 'h-7 md:h-9' },              // 3.01:1
    { name: 'Tazapay', logo: '/images/Tazapay.svg', h: 'h-5 md:h-6' },        // 4.41:1
    { name: 'VWO', logo: '/images/VWO.svg', h: 'h-7 md:h-9' },                // 3.00:1
    { name: 'Increff', logo: '/images/Increff.svg', h: 'h-7 md:h-9' },        // 3.32:1
    { name: 'Airmeet', logo: '/images/Airmeet.svg', h: 'h-6 md:h-7' },        // 4.01:1
    { name: 'Nurix', logo: '/images/Nurix.svg', h: 'h-5 md:h-6' },            // 4.58:1
    { name: 'MYND', logo: '/images/mynd.svg', h: 'h-6 md:h-8' },              // 3.53:1
    { name: 'Epiplex', logo: '/images/epiplex.svg', h: 'h-5 md:h-6' },        // 4.33:1
    { name: 'InfeedO', logo: '/images/Infeedo.webp', h: 'h-6 md:h-7' },       // 5.96:1
    { name: 'Creatium', logo: '/images/creatium-trim.png', h: 'h-3 md:h-4' }, // 7.32:1
    // Deliberately larger than the block above: these carry an icon as well as
    // a wordmark, and matching on width alone left the icon looking undersized.
    { name: 'Venwiz', logo: '/images/venwiz.svg', h: 'h-7 md:h-8' },            // 4.19:1
    { name: 'TeamLease', logo: '/images/teamlease-trim.png', h: 'h-7 md:h-9' }, // 3.83:1
    { name: 'CometChat', logo: '/images/cometchat-mono.png', h: 'h-8 md:h-10' },// 3.48:1
  ];

  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section
      className={`relative w-full ${isLight ? 'py-8 lg:py-12' : 'py-16'} px-6 sm:px-12 ${bgClass} overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isLight ? 'mb-8' : 'mb-12'} text-center ${labelClass}`}>
            Trusted by Global SaaS Disruptors
          </p>

          <div className="relative w-full overflow-hidden group">
            <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r ${fadeFromClass} to-transparent z-10 pointer-events-none`} />
            <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l ${fadeFromClass} to-transparent z-10 pointer-events-none`} />

            <motion.div
              className="flex items-center w-max"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex items-center justify-center shrink-0 group cursor-default mx-8 lg:mx-12"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={240}
                    height={120}
                    className={`${company.h} w-auto object-contain ${logoFilterClass} transition-all duration-500`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
