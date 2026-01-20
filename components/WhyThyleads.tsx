"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Database, Shield, Fingerprint, ArrowRight, Sparkles, ChevronRight, Plus } from 'lucide-react';

const features = [
  {
    id: 'saas',
    icon: <Layers className="w-6 h-6" />,
    label: '01',
    title: 'Saas Industry Specialization',
    heading: 'Deep Industry Focus, Not One-Size-Fits-All',
    subtitle: 'Industry Deep Dive',
    description: 'Each client is matched with a GTM team specialized in their SaaS vertical — HRTech, FinTech, MarTech, or RetailTech — using customized outbound strategies proven within those industries.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    color: 'text-violet-400',
    bg: 'bg-violet-500',
    border: 'border-violet-500/50',
    shadow: 'shadow-violet-500/20',
    gradient: 'from-violet-900/80 to-indigo-900/80'
  },
  {
    id: 'ai',
    icon: <Fingerprint className="w-6 h-6" />,
    label: '02',
    title: 'AI+Human Personalization',
    heading: 'Human Touch Meets Smart Automation',
    subtitle: 'AI + Human Signal',
    description: 'Our outreach combines AI-powered signals with real human personalization. Every message is crafted based on live intent triggers, buyer behavior, and persona-specific context — never just plug-and-play templates.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    color: 'text-blue-400',
    bg: 'bg-blue-500',
    border: 'border-blue-500/50',
    shadow: 'shadow-blue-500/20',
    gradient: 'from-blue-900/80 to-cyan-900/80'
  },
  {
    id: 'playbooks',
    icon: <Zap className="w-6 h-6" />,
    label: '03',
    title: 'Scalable Data Driven Playbooks',
    heading: 'Frameworks That Scale With You',
    subtitle: 'Engineered Velocity',
    description: 'We use repeatable outbound frameworks built from past success. They’re modular, test-driven, and continuously optimized to match your GTM goals, sales cycle, and conversion benchmarks.',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500/50',
    shadow: 'shadow-emerald-500/20',
    gradient: 'from-emerald-900/80 to-teal-900/80'
  },
  {
    id: 'masterlist',
    icon: <Database className="w-6 h-6" />,
    label: '04',
    title: 'Proprietary Master Account List',
    heading: 'Verified, Nurtured Account Intelligence',
    subtitle: 'Proprietary Data',
    description: 'Our proprietary master list features manually verified, industry-aligned accounts. It’s enriched weekly with hiring signals, stack data, and reply patterns to ensure each campaign starts with high-fit prospects.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200',
    color: 'text-amber-400',
    bg: 'bg-amber-500',
    border: 'border-amber-500/50',
    shadow: 'shadow-amber-500/20',
    gradient: 'from-amber-900/80 to-orange-900/80'
  },
  {
    id: 'noncompete',
    icon: <Shield className="w-6 h-6" />,
    label: '05',
    title: 'Non-Compete Assurance With Full Transparancy',
    heading: 'Your Market Is Yours Alone',
    subtitle: 'Market Exclusivity',
    description: 'We guarantee exclusivity by avoiding direct competitors. Every playbook, insight, and prospect list is custom-built — ensuring zero overlap and full transparency across your campaigns.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    color: 'text-rose-400',
    bg: 'bg-rose-500',
    border: 'border-rose-500/50',
    shadow: 'shadow-rose-500/20',
    gradient: 'from-rose-900/80 to-pink-900/80'
  }
];

const WhyThyleadsRedesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans text-white py-20">
      
      {/* -----------------------------------------------------------------
          Background: Deep Space Mesh
      ------------------------------------------------------------------ */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />
         <motion.div
            animate={{
              background: `radial-gradient(circle 800px at 50% 50%, ${features[activeTab].color.replace('text-', '#').replace('400', '600')}20, transparent)`,
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
         />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 lg:px-8 flex flex-col h-full justify-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Thyleads?</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base">
            We’re not another SDR shop – We Engineer Outbound That Scales SaaS Growth.
          </p>
        </div>

        {/* -----------------------------------------------------------------
            Main Content: Horizontal Accordion Deck
        ------------------------------------------------------------------ */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 h-auto lg:h-[600px] w-full">
           {features.map((feature, idx) => {
             const isActive = activeTab === idx;
             
             return (
               <motion.div
                 key={feature.id}
                 layout
                 onClick={() => setActiveTab(idx)}
                 className={`relative overflow-hidden rounded-2xl cursor-pointer border transition-all duration-500 ease-[0.32,0.72,0,1] flex-1 min-h-[220px] ${
                   isActive 
                     ? `lg:flex-[3] border-white/10 ${feature.shadow} shadow-2xl` 
                     : 'lg:flex-[0.3] border-white/5 hover:border-white/20 lg:hover:flex-[0.5]'
                 }`}
               >
                 {/* Background Image & Gradient */}
                 <div className="absolute inset-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-150 grayscale opacity-40'}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${isActive ? feature.gradient : 'from-black/80 to-black/90'}`} />
                 </div>

                 {/* Content Wrapper */}
                 <div className="relative h-full flex flex-col p-6 lg:p-10">
                    
                    {/* Header (Visible on all) */}
                    <div className="flex items-start justify-between">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 ${isActive ? 'bg-white/10 text-white' : 'bg-black/40 text-white/50'}`}>
                          {feature.icon}
                       </div>
                       
                       {/* Mobile-only Chevron */}
                       <div className="lg:hidden text-white/50">
                         {isActive ? <ChevronRight className="rotate-90 transition-transform" /> : <ChevronRight />}
                       </div>
                    </div>

                    {/* Collapsed Vertical Title (Desktop Only) */}
                    {!isActive && (
                      <div className="hidden lg:flex flex-1 items-center justify-center mt-12">
                         <h3 className="text-xl font-bold text-white/50 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                           {feature.title}
                         </h3>
                      </div>
                    )}

                    {/* Expanded Content */}
                    <div className={`mt-auto transition-opacity duration-500 ${isActive ? 'opacity-100 delay-200' : 'opacity-0 lg:opacity-0 hidden lg:block'}`}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                             <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${feature.color} flex items-center gap-2`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${feature.bg}`} />
                                {feature.subtitle}
                             </div>

                             <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                               {feature.heading}
                             </h3>
                             
                             <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-8">
                               {feature.description}
                             </p>

                             <Link
                               href="/contact"
                               className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors"
                             >
                               Learn More
                               <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:${feature.bg} group-hover:border-transparent transition-all`}>
                                 <ArrowRight className="w-4 h-4" />
                               </div>
                             </Link>
                          </motion.div>
                        )}
                    </div>
                    
                    {/* Active Number Indicator Background */}
                    <div className="absolute right-4 bottom-4 text-[100px] font-black text-white/5 leading-none pointer-events-none select-none">
                      {feature.label}
                    </div>

                 </div>
                 
                 {/* Active Border Glow */}
                 {isActive && (
                    <motion.div 
                      layoutId="activeBorder"
                      className={`absolute inset-0 border-2 ${feature.border} rounded-2xl pointer-events-none`} 
                    />
                 )}
               </motion.div>
             )
           })}
        </div>

      </div>
    </section>
  );
};

export default WhyThyleadsRedesign;
