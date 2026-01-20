'use client'
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, PlayCircle, Quote, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';

interface CustomerStoryPageProps {
  testimonial: Testimonial;
  onBack: () => void;
}

// Changed to default export to fix import issues in App.tsx
export default function CustomerStoryPage({ testimonial, onBack }: CustomerStoryPageProps) {
  // Reliable generic tech background video
  const videoUrl = "https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4";

  return (
    <div className="min-h-screen bg-white font-sans animate-in fade-in duration-500">
      {/* Navigation Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 lg:px-12 bg-gradient-to-b from-black/60 to-transparent">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all text-sm font-medium border border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to stories
        </button>
        <div className="hidden md:block text-white/80 text-sm font-medium tracking-wide">
          CUSTOMER SUCCESS STORY
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <header className="relative h-[85vh] w-full overflow-hidden flex items-end pb-20">
        <div className="absolute inset-0 w-full h-full bg-slate-900">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-xs font-semibold tracking-wider mb-6 uppercase backdrop-blur-sm">
              <PlayCircle className="w-3 h-3 fill-current" />
              Watch Story
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              How {testimonial.companyName} unlocked <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#C3F53C]">
                enterprise intelligence
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.personImage} 
                  alt={testimonial.personName}
                  className="w-14 h-14 rounded-full border-2 border-white/20 object-cover"
                />
                <div>
                  <div className="text-white font-semibold text-lg">{testimonial.personName}</div>
                  <div className="text-blue-200 text-sm">{testimonial.personTitle}</div>
                </div>
              </div>

              <div className="flex gap-12">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">30%</span>
                  <span className="text-sm text-gray-400">Faster Onboarding</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">2.5h</span>
                  <span className="text-sm text-gray-400">Saved per week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="relative z-10 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12 py-20">
          
          {/* Sidebar / Sticky Nav */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Contents</div>
              <nav className="space-y-1">
                {['The Challenge', 'The Solution', 'Key Results', 'Future Outlook'].map((item, i) => (
                  <a 
                    key={item} 
                    href="#" 
                    className={`block py-2 text-lg transition-colors ${i === 0 ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="pt-8 border-t border-gray-100">
                <div className="text-sm text-gray-500 mb-2">Share this story</div>
                <div className="flex gap-4">
                  {/* Social placeholders */}
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <article className="lg:col-span-8 lg:col-start-5 space-y-12">
            
            {/* Intro */}
            <div className="prose prose-lg md:prose-xl max-w-none text-slate-600">
              <p className="lead text-2xl font-normal leading-relaxed text-slate-900 mb-8">
                As a global leader in travel, {testimonial.companyName} manages massive amounts of data across distributed teams. They needed a way to break down silos and make internal knowledge instantly accessible.
              </p>
              <p>
                In the fast-paced world of online travel, speed is everything. For {testimonial.companyName}, maintaining agility while scaling their engineering organization meant solving a critical problem: knowledge fragmentation. Engineers were spending too much time searching for documentation, previous incidents, and codebase context, rather than building new features.
              </p>
            </div>

            {/* Blockquote */}
            <div className="my-16 relative">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-[#C3F53C]" />
              <div className="pl-8 md:pl-12">
                <Quote className="w-12 h-12 text-blue-100 mb-6" />
                <h3 className="text-3xl md:text-4xl font-medium text-slate-900 leading-tight mb-6">
                  &quot;{testimonial.quote}&quot;
                </h3>
                <div className="flex items-center gap-4">
                   <img src={testimonial.personImage} alt="" className="w-12 h-12 rounded-full object-cover" />
                   <div>
                      <div className="font-bold text-slate-900">{testimonial.personName}</div>
                      <div className="text-slate-500 text-sm">{testimonial.personTitle}</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <Clock className="w-8 h-8 text-blue-600 mb-4" />
                <div className="text-4xl font-bold text-slate-900 mb-2">2.5 hrs</div>
                <div className="text-slate-600">Saved per employee, per week</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <TrendingUp className="w-8 h-8 text-[#C3F53C] mb-4 stroke-current text-green-600" style={{ color: '#65a30d' }} />
                <div className="text-4xl font-bold text-slate-900 mb-2">45%</div>
                <div className="text-slate-600">Reduction in support tickets</div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Solution</h3>
              <p className="mb-6">
                By implementing Glean, {testimonial.companyName} unified their fragmented data sources into a single, searchable index. The implementation process was seamless, connecting to Jira, Confluence, GitHub, and Slack within hours.
              </p>
              <ul className="space-y-4 my-8">
                {[
                  'Unified search across 15+ enterprise apps',
                  'Personalized results based on team and role',
                  'AI-powered answers that synthesize information'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                The impact was immediate. Engineers reported that &quot;Glean feels like magic,&quot; enabling them to self-serve answers to complex technical questions without interrupting their colleagues.
              </p>
            </div>
          </article>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-[-50%] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-blue-600 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to transform your organization?</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Join {testimonial.companyName} and hundreds of other forward-thinking companies using Glean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#C3F53C] text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b2e232] transition-colors"
            >
              Get a demo
            </Link>
            <button className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-colors">
              View more stories
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
