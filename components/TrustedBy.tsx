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
    { name: 'MYND',  logo: '/images/MYND.svg'},
    { name: 'Epiplex',  logo: '/images/epiplex.svg'},
    { name: 'NovaBenefits',  logo: '/images/NovaBenefits.svg'}
  ];

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

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

            <motion.div
              className="flex items-center gap-16 lg:gap-20"
              animate={{
                x: [0, -50 * companies.length * 2]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }}
            >
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex items-center justify-center shrink-0 group cursor-pointer"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={90}
                    height={24}
                    className="h-5 md:h-7 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-500"
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
