"use client";

import React from 'react';
import Image from 'next/image';
import { m, motion } from 'framer-motion';

const TrustedBy: React.FC = () => {
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

  return (
    <section className="relative w-full py-16 px-6 sm:px-12 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Header */}
          <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-12 text-center">
            Trusted by Global SaaS Disruptors
          </p>

          {/* Company Logos - Infinite Scroll */}
          <div className="relative w-full overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max scroll-container">
              {/* First track */}
              <div className="flex items-center">
                {companies.map((company, index) => (
                  <div
                    key={`first-${company.name}-${index}`}
                    className="flex items-center justify-center shrink-0 group cursor-pointer mx-8 lg:mx-10"
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={company.veryextraLarge? 290 : company.extraLarge ? 290 : company.large ? 220 : 90}
                      height={company.veryextraLarge? 90 : company.extraLarge ? 90 : company.large ? 84 : 52}
                      className={`${company.veryextraLarge ?'h-36 md:h-36' : company.extraLarge ? 'h-24 md:h-24' : company.large ? 'h-16 md:h-16' : 'h-5 md:h-7'} w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </div>
                ))}
              </div>
              {/* Second track (duplicate for seamless loop) */}
              <div className="flex items-center">
                {companies.map((company, index) => (
                  <div
                    key={`second-${company.name}-${index}`}
                    className="flex items-center justify-center shrink-0 group cursor-pointer mx-8 lg:mx-10"
                  >
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={company.extraLarge ? 220 : company.large ? 180 : 90}
                      height={company.extraLarge ? 72 : company.large ? 56 : 24}
                      className={`${company.extraLarge ? 'h-16 md:h-20' : company.large ? 'h-12 md:h-14' : 'h-5 md:h-7'} w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
