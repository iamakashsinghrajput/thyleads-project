"use client";

import { motion } from 'framer-motion';
import { Target, Zap, Heart, TrendingUp, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Experience that Drives Sales',
    description: 'We have been on the other side, so we identify the right buyers at the right time for better conversions.',
  },
  {
    icon: Zap,
    title: 'AI-led Outbound',
    description: 'We use AI to engage the right buyers, backed by GTM Engineers, Account Managers and Content Researchers.',
  },
  {
    icon: Heart,
    title: 'We Grow When you Grow',
    description: 'We invest time in understanding your product, ICP, and goals so we can drive your growth.',
  },
  {
    icon: TrendingUp,
    title: 'Nurturing to the end',
    description: 'We source, book and nurture to keep the deals moving from first touch to close.',
  },
  {
    icon: Lightbulb,
    title: 'Tailored Innovation',
    description: 'We keep innovating and experimenting to keep you ahead of market trends.',
  },
];

const WhyGlobalSaaS = () => {
  return (
    <section className="w-full bg-white py-20 lg:py-28 px-6 sm:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 xl:gap-24 items-center lg:items-start">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full lg:w-[45%] relative"
        >

          <div className="relative z-10 rounded-tl-[4rem] rounded-tr-[4rem] rounded-br-[4rem] rounded-bl-none overflow-hidden aspect-[4/5] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
              alt="Team collaborating on SaaS growth"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply" />
          </div>
        </motion.div>

        <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pt-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-600 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
                </span>
                Why Us
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-8">
              Why <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">Global SaaS</span><br />
              Leaders <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">bet on us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  className="flex gap-5 items-start"
                >

                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <Icon className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
                    <div className="w-6 h-[2px] bg-primary-500 mt-3 rounded-full" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 mb-2 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyGlobalSaaS;