'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Quote, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function VWOCaseStudy() {
  const testimonial = {
    companyName: 'Zigtal',
    personName: 'Harsh Sharma',
    personTitle: 'Senior Manager',
    personImage: '/zigital.png',
    quote: "The HR tech market is incredibly noisy, and our outreach was falling flat. Thyleads fixed this by re-engineering our messaging to finally resonate with decision-makers. They transformed our struggle into a consistent pipeline of qualified demos."
  };

  return (
    <div className="min-h-screen bg-white font-sans animate-in fade-in duration-500 scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <header className="relative w-full overflow-hidden bg-slate-950 min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-600/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#C3F53C]/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        {/* Back to stories button */}
        <Link
          href="/casestudies"
          className="absolute top-24 left-6 md:left-12 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to stories
        </Link>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-16">
          {/* Top Section: Logo + Tags */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-white/10">
                <Image src="/images/zigital.png" alt="VWO logo" width={48} height={48} className="w-12 h-12 object-contain" />
              </div>
              <div>
                <div className="text-white font-bold text-2xl">{testimonial.companyName}</div>
                <div className="text-slate-400 text-sm">Customer Engagement Platform</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:ml-auto">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">GTM Strategy</span>
              <span className="px-3 py-1 bg-[#C3F53C]/20 text-[#C3F53C] rounded-full text-xs font-medium border border-[#C3F53C]/30">Outbound Sales</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">Pipeline Growth</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-[1.1] mb-10 max-w-5xl">
            How Thyleads re-engineered Zigtal’s GTM to move past the just HR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-[#C3F53C]">
               Tool category and capture real enterprise intelligence
            </span>
          </h1>
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
                {[
                  { label: 'The Challenge', id: 'challenge' },
                  { label: 'The Solution', id: 'solution' },
                  { label: 'Key Results', id: 'key-results' },
                  { label: 'Future Outlook', id: 'future-outlook' }
                ].map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`block py-2 text-lg transition-colors text-left w-full ${i === 0 ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {item.label}
                  </button>
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
                Zigtal entered the market as a pioneer of Collective Intelligence to close the growing gap between business strategy and the latent skills of employees. Using a proprietary model, it turns HR systems into Internal Talent Marketplaces, where skills, not titles, are the currency of operation.
              </p>
              <p>
                On paper, the value was obvious. In reality, the market was deaf. To scale inside large enterprises, Zigtal needed more than awareness. They needed a GTM motion that bypassed HR tech fatigue and landed directly with CHROs, COOs, and Transformation Leaders seeking a structural fix to the global skills shortage.
              </p>
            </div>

            {/* Blockquote */}
            <div className="my-16 relative">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-[#C3F53C]" />
              <div className="pl-8 md:pl-12">
                <Quote className="w-12 h-12 text-blue-100 mb-6" />
                <h3 className="text-xl md:text-2xl font-light text-slate-900 leading-relaxed mb-6">
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

            <div id="challenge" className="prose prose-lg max-w-none text-slate-600 scroll-mt-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Challenge: Escaping the HR Tool’s Big Category</h3>
              <p className="mb-3">
                Zigtal was fighting an Institutional Blind Spot. Enterprises were spending millions on expensive external headhunting while their own internal talent, carrying vast reservoirs of ‘dormant skills’, was disengaging and walking out the door.
              </p>
              <p className="text-xl font-semibold text-slate-800 mb-6">The Top Barriers:</p>
              <ul className="space-y-4 my-8">
                {[
                  'Zigtal was being mislabeled as another LMS or HRIS rather than a strategic Skill Intelligence Platform.',
                  'Decision-makers liked the ‘culture’ aspect but needed to see the direct line to Innovation Velocity.',
                  'Sales conversations were dying in the gap between Learning & Development (who saw the need) and Operations (who held the budget).',
                  'Prospects were hesitant to add ‘one more thing’ to their ecosystem without seeing how Zigtal acted as the nervous system for their existing tech.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution */}
            <div id="solution" className="prose prose-lg max-w-none text-slate-600 scroll-mt-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Solution: Engineering the Skill-Centric GTM</h3>
              <p className="mb-6">
                Thyleads positioned them as the Architect of Future Readiness. We moved the conversation from managing people to optimizing invisible assets.
              </p>

              {/* Solution Cards */}
              <div className="space-y-6 not-prose">
                {/* I. The Wedge Narrative */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">I</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">The Dormant Skill Audit:</h4>
                      <p className="text-slate-600 mb-3">
                        We killed the generic ‘Employee Engagement’ fluff. Instead, we focused on Asset Underutilization. We approached enterprises with a diagnostic lens: &quos;How much of your workforce’s expertise is currently invisible to your project leads?&quos; By positioning Zigtal as a mechanism to monetize internal knowledge, we turned a soft HR want into a hard operational need.
                      </p>
                    </div>
                  </div>
                </div>

                {/* II. Multi-Channel Visibility */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">II</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">SAP Alignment & Infrastructure Hardening:</h4>
                      <p className="text-slate-600 mb-3">
                        Leveraging Zigtal’s status as an SAP Solution Partner, we built a High-Fidelity Outreach Grid. We didn&apos;t just blast lists; we surgically partitioned outreach to target the SAP SuccessFactors ecosystem. We ensured Zigtal arrived not as a disruptive new cost, but as a Natural Upgrade to the prospect’s existing multi-million dollar SAP investment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* III. Waterfall Enrichment */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">III</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Signal-Led Talent Bleed Mapping:</h4>
                      <p className="text-slate-600 mb-2">
                        We replaced broad targeting with Friction-Based Signals. Using a waterfall enrichment stack, we looked for companies experiencing:
                      </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Massive external hiring surges (signaling a failure in internal mobility).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Rapid technological pivots (signaling a Skill Gap emergency).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-slate-700">High turnover in Knowledge-Heavy industries like Tech and BFSI.</span>
                            </li>
                        </ul>
                    </div>
                  </div>
                </div>

                {/* IV. AI Personalisation */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">IV</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Multi-Threaded Account Surround:</h4>
                      <p className="text-slate-600 mb-2">
                        Workforce decisions are never solitary. We launched Synchronized Offensives, hitting the CHRO with Talent Retention logic and the COO with Project Velocity proof. By the time the first demo was booked, we had already built internal consensus across the hierarchy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">V</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">An intelligent Feedback loop:</h4>
                      <p className="text-slate-600 mb-2">
                        We re-manufactured outbound as a data-capture system. Every objection about Culture Shift or Integration was fed back into the Zigtal lab, turning every not now into a data point that refined our Skill Intelligence positioning for the next send.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="key-results" className="prose prose-lg max-w-none text-slate-600 scroll-mt-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Results</h3>
              <ul className="space-y-2 my-4">
                {[
                  'The Zero Noise Outcome: Zigtal successfully shifted from an Optional Tool to the Mandatory Infrastructure for skill-based growth.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Future Outlook */}
            <div id="future-outlook" className="prose prose-lg max-w-none text-slate-600 scroll-mt-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Future Outlook</h3>
              <p className="mb-4">
                The precision engine is now the baseline. The next phase moves from finding talent to Predictive Skill Orchestration. 
              </p>
              <p>
                By leveraging the data captured in this phase, Zigtal and Thyleads are building a GTM model that predicts which companies are one Expert departure away from a project failure, ensuring Zigtal is there with the fix before the break happens.
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">If your outbound sounds like the market instead of ahead of it</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Fix the translation gap with Thyleads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#C3F53C] text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b2e232] transition-colors"
            >
              Book a GTM Audit
            </Link>
            <Link href="/" className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-colors inline-block">
              View more stories
            </Link>
          </div>
        </div>
      </footer>

      <Footer/>
    </div>
  );
}
