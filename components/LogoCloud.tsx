"use client";

import React from 'react';
import { motion } from 'framer-motion';

const LogoCloud: React.FC = () => {
  const logos = [
    { name: 'CleverTap' },
    { name: 'TazaPay' },
    { name: 'Nurix' },
    { name: 'VWO' },
    { name: 'Actyv.ai' },
    { name: 'ZIGTAL' },
    { name: 'Mynd' },
    { name: 'Pazo' },
    { name: 'Airmeet' },
    { name: 'Teamlease' },
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full py-6 relative overflow-hidden group">
      {/* Side Masks for clean fade in/out */}
      <div className="absolute left-0 bottom-0 w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex space-x-20 items-center"
        animate={{
          x: [0, -2500],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: "fit-content" }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 flex items-center space-x-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-lg shadow-2xl">
              {logo.name[0]}
            </div>
            <span className="font-bold text-white text-sm tracking-[0.2em] uppercase">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCloud;
