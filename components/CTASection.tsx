'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  theme?: 'light' | 'dark';
}

const CTASection: React.FC<CTASectionProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <section className={`relative w-full py-20 overflow-hidden ${isLight ? 'bg-gray-50' : 'bg-black'}`}>

      {/* Custom Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Background Decorative Elements */}
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

        {/* Main Content Wrapper with Glitter Border */}
        <div className="relative rounded-3xl p-[1px] overflow-hidden">

          {/* Running Glitter Border Animation */}
          <div className="absolute inset-[-100%] animate-spin-slow"
               style={{
                 background: isLight
                   ? 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #a78bfa 85%, #c084fc 90%, #e879f9 95%, transparent 100%)'
                   : 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #818cf8 85%, #d946ef 90%, #f472b6 95%, transparent 100%)'
               }}>
          </div>
          <div className="absolute inset-[-100%] animate-spin-slow animation-delay-4000"
               style={{
                 background: isLight
                   ? 'conic-gradient(from 180deg at 50% 50%, transparent 0%, transparent 70%, #a78bfa 85%, #c084fc 90%, #e879f9 95%, transparent 100%)'
                   : 'conic-gradient(from 180deg at 50% 50%, transparent 0%, transparent 70%, #818cf8 85%, #d946ef 90%, #f472b6 95%, transparent 100%)'
               }}>
          </div>

        <div className={`relative rounded-[23px] p-10 md:p-16 text-center ${
          isLight
            ? 'bg-purple-50 shadow-lg'
            : 'bg-black'
        }`}>
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
            isLight
              ? 'text-gray-900'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400'
          }`}>
            Ready to Transform Your Outbound?
          </h2>
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
            isLight ? 'text-gray-600' : 'text-neutral-300'
          }`}>
            Join hundreds of SaaS companies using Thyleads to scale their revenue with AI-powered outbound.
          </p>
          <div className="justify-center">
            <Link
              href="/contact"
              className={`px-8 py-4 rounded-full font-bold transition-colors text-lg inline-flex items-center justify-center ${
                isLight
                  ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'text-white border border-white/20 hover:bg-white/10'
              }`}
            >
              Book a Demo
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
