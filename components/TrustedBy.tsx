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

  const companies = [
    { name: 'CleverTap', logo: '/images/CleverTap.svg' },
    { name: 'Pazo', logo: '/images/pazo.png' },
    { name: 'Dice', logo: '/images/dice.png' },
    { name: 'Tazapay', logo: '/images/Tazapay.svg' },
    { name: 'VWO', logo: '/images/VWO.svg' },
    { name: 'Increff', logo: '/images/Increff.svg'},
    { name: 'Airmeet',  logo: '/images/Airmeet.svg'},
    { name: 'Nurix', logo: '/images/Nurix.svg'},
    { name: 'MYND',  logo: '/images/mynd.svg'},
    { name: 'Epiplex',  logo: '/images/epiplex.svg'},
    { name: 'OneCap',  logo: 'https://www.onecap.ai/revamp/OneCap%20logo.svg'},
    { name: 'TeamLease',  logo: '/images/teamlease.png', veryextraLarge: true},
    { name: 'zigital',  logo: '/images/zigital.png', large: true},
    { name: 'Actyv', logo: '/images/actyv.png', extraLarge: true}
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
                    width={company.veryextraLarge? 290 : company.extraLarge ? 290 : company.large ? 220 : 90}
                    height={company.veryextraLarge? 90 : company.extraLarge ? 90 : company.large ? 84 : 52}
                    className={`${company.veryextraLarge ?'h-24 md:h-32' : company.extraLarge ? 'h-16 md:h-20' : company.large ? 'h-12 md:h-14' : 'h-5 md:h-7'} w-auto object-contain ${logoFilterClass} transition-all duration-500`}
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
