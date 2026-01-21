"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonial = () => {
  // Staggered animation for the container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Slide up animation for items
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center bg-slate-950 py-24 px-6 overflow-hidden">
      
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Glowing Orbs - Made slightly more subtle for open layout */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
        >
          
          {/* --- LEFT SIDE: Header & Author Profile --- */}
          <div className="lg:col-span-5 flex flex-col space-y-12 relative">
             {/* Subtle vertical divider for desktop */}
            <div className="hidden lg:block absolute -right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent" />

            {/* Header Text */}
            <motion.div variants={itemVariants} className="space-y-8">              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                <span className="inline-block relative h-12 w-48 my-1 align-middle">
                   {/* Logo Container */}
                  <img 
                    src="/images/mynd.svg" 
                    alt="MYND Logo" 
                    className="w-full h-full object-contain object-left filter brightness-100 opacity-90"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.style.display = 'none';
                      if (target.parentNode) {
                        (target.parentNode as HTMLElement).innerHTML = '<span class="text-indigo-400">MYND</span>';
                      }
                    }}
                  />
                </span>
                <br />
                says about us.
              </h2>
            </motion.div>

            {/* Author Details - Clean & Minimal */}
            <motion.div variants={itemVariants} className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-indigo-500/20 shadow-2xl">
                  <img
                    src="/ArghaKarmakar.jpeg" 
                    alt="Argha Karmakar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  Argha Karmakar
                </h3>
                <p className="text-indigo-200/80 text-sm font-medium uppercase tracking-wider mt-0.5">
                  General Manager - Marketing
                </p>
              </div>
            </motion.div>
          </div>


          {/* --- RIGHT SIDE: The Main Content --- */}
          <div className="lg:col-span-7 relative">
            <motion.div variants={itemVariants} className="relative pl-0 lg:pl-8">
              
              {/* Giant Quote Background */}
              <Quote className="absolute -top-10 -left-6 lg:left-0 w-20 h-20 text-indigo-500/10 rotate-180 pointer-events-none" />

              <blockquote className="relative z-10">
                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed tracking-wide">
                  &quot;In over a decade of experience in <span className="text-white font-medium">Strategy & Marketing</span>, I have worked with several &apos;Lead Agencies&apos; across a wide spectrum of premium price points. 
                  <span className="text-indigo-200 font-normal"> Thyleads has outperformed them all </span> 
                  in terms of value for money, specifically regarding SaaS-based lead generation and connecting with relevant Key Decision Makers. The team&apos;s understanding of Ideal Customer Profiles and their deep technical expertise positions them exceptionally well.&quot;
                </p>
              </blockquote>

              {/* Decorative Line */}
              <div className="mt-8 h-px w-24 bg-indigo-500/50" />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;