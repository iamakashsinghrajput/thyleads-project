'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Quote, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DiceCaseStudy() {
  const testimonial = {
    companyName: 'Dice',
    personName: 'Ishan Acharya',
    personTitle: 'Director of Business Operations',
    personImage: '/dice.png',
    quote: "Thyleads gets highly sales-qualified leads within the provided target regions from the very first month of our partnership. Their working style, culture, and ethics are highly commendable."
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
                <Image src="/images/dice.png" alt="Dice logo" width={48} height={48} className="w-12 h-12 object-contain" />
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
            How Thyleads modernized Dice’s GTM and broke through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-[#C3F53C]">
               enterprise finance noise with workflow-led messaging.
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
                As one of the biggest achievers in corporate spend management, Dice is the precision layer that brings order to 50,000+ enterprise financial hurdles.
              </p>
              <p>
                By consolidating fragmented spend, Dice’s super app has been enabling firms like Myntra, PharmEasy, and Tata 1mg to gain total control over every rupee spent. But in enterprise finance, product strength alone doesn’t win. To occupy the entire enterprise space, Dice needed a GTM motion that spoke directly to operators drowning in approvals, reconciliations, and Excel workarounds, not just decision-makers reading decks.
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Challenge: No One Buys Finance Tools Anymore. They Buy Fixes.</h3>
              <p className="mb-6">
                {testimonial.companyName} was struggling with the &quot;Good Enough&quot; fallacy. In enterprise finance, innovation often feels like a threat to stability, and the biggest competitor was the ERP Status Quo.
              </p>
              <p className='mb-6'>For Dice, the challenge was overcoming this institutional inertia. Dice had to stop being seen as just another platform and become the Missing Workflow that makes the entire finance stack function.</p>
              <p className="text-xl font-semibold text-slate-800 mb-6">What they were up against:</p>
              <ul className="space-y-4 my-8">
                {[
                  'Enterprises already had SAP/Oracle',
                  'Finance teams weren’t browsing tools; they were buried in execution',
                  'Narratives were hitting the CFOs desk but dying there because the real workflow owners—Controllers and Shared Services leads— werent in the loop.',
                  'Agency fatigue: Dice had been burned by "volume-first" agencies that delivered noise instead of signal. They needed a GTM motion that prioritized risk reduction.',
                  'Weak data hygiene and low meeting-set rates from internal prospecting'
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Solution: Workflow-Led GTM</h3>
              <p className="mb-6">
                We didn’t pitch Dice as a replacement. We positioned it as the missing execution layer, the tactical unlock for workflows the ERPs forgot.
              </p>

              {/* Solution Cards */}
              <div className="space-y-6 not-prose">
                {/* I. The Wedge Narrative */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">I</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">The Wedge Narrative: Completion, Not Competition</h4>
                      <p className="text-slate-600 mb-3">
                        We reframed the enterprise conversation. Dice wasn&apos;t fighting the existing tech stack; it was filling the cracks. We transitioned the tone from Challenger to Collaborator, positioning Dice as the essential upgrade that turns rigid infrastructure into fluid execution.
                      </p>
                      <p className="text-slate-600 mb-3">What we addressed:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">A narrative of ‘Dice fills the cracks ERP systems won’t admit exist.’</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">Framed SAP/Oracle as infrastructure, Dice as execution</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* II. Multi-Channel Visibility */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">II</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Segmentation by Daily Friction, Not Job Title</h4>
                      <p className="text-slate-600 mb-3">
                        The real buyers weren’t just CFOs; they were controllers, shared services leads, and procurement heads.
                      </p>
                      <p className="text-slate-600 mb-3">What we mapped:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">Persona clusters based on workflow ownership</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">Using a multichannel approach (LinkedIn, Cold Calls, WhatsApp, and Email)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* III. Waterfall Enrichment */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">III</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Messaging for the &quot;Lived Pain&quot;</h4>
                      <p className="text-slate-600 mb-2">
                        Thyleads used expert writers and SDRs to deconstruct messaging for Dice’s product modules. Similarly, we removed the fluff and adopted the Controller&apos;s terminology.
                      </p>
                      <p className='text-slate-600 mb-3'>What changed:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">By using plain-language, high-context inquiries about Process Debt and Approval Latency, we made Dice approved from a vendor to an Operational Ally.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">We stopped pitching automation and started offering the Silent Upgrade, which teams didn&apos;t know they could have before Dice.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">Messaging rooted in lived pain via the help of our expert writers:</span>
                        </li>
                      </ul>
                      <div className="mt-4 ml-7 space-y-2">
                        <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700">
                          &quot;Still chasing approval trails over email?&quot;
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700">
                          &quot;Is Excel your petty cash system?&quot;
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700">
                          &quot;How long do vendor SLAs go untracked?&quot;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IV. AI Personalisation */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">IV</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Signal-Led Outbound + Mid-Funnel Feedback Loops</h4>
                      <p className="text-slate-600 mb-2">
                        Outbound was guided by readiness, not volume.
                      </p>
                      <p className='text-slate-600 mb-3'>What we added:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">ERP usage signals and workflow complexity triggers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">ICP-matched personas only</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700">Mid-funnel feedback fed back into messaging and targeting weekly</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* V. Feedback Flywheel */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">V</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Functional Multi-Threading</h4>
                      <p className="text-slate-600">
                        Financial decisions are rarely solitary. We initiated Simultaneous Account Surrounds, engaging Procurement and Shared Services alongside Finance. By highlighting how Dice resolves the cross-departmental blame game during month-end closes, we built internal consensus before the first demo was even booked.
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
                  '115+ Appointments booked in 6 months',
                  '140% Average KPI achievement rate from Month 1',
                  '5 Enterprise Deals closed within the first 90 days',
                  '23% Average closing rate across 25 industries',
                  '10:1 ROI: Achieving a $10 return for every $1 invested in this channel.',
                  'Zero Ramp-Up: Delivered 12 Sales-Qualified Appointments in the very first month of collaboration.'
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
                The scalpel approach has successfully carved out a new category for Dice within the enterprise stack.
              </p>
              <p>
                As the partnership evolves, the focus turns toward Automated Workflow Detection. By identifying specific signals of process debt within target organizations, Dice and Thyleads are building a GTM engine that doesn&apos;t just find prospects—it predicts which companies are one Excel error away from a financial meltdown, ensuring Dice is there with the fix before the break happens.
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">If your GTM feels like noise to your buyers</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            It’s time to start solving workflows.
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
