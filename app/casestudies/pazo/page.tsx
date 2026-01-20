'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, PlayCircle, Quote, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BillCustomerStory() {
  const videoUrl = "https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4";

  const testimonial = {
    companyName: 'Pazo',
    personName: 'Nitin Ravi',
    personTitle: 'Head of Global Sales',
    personImage: '/pazo.png',
    quote: "We always believed outbound could work, but lacked a structured approach. Thyleads changed that by building a repeatable system that delivers high-value meetings. Now, we’re having quality conversations with the right people with real buying intent."
  };

  return (
    <div className="min-h-screen bg-white font-sans animate-in fade-in duration-500">
      <Navbar />

      {/* Hero Section with Video Background */}
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
                <Image src="/images/pazo.png" alt="Pazo logo" width={48} height={48} className="w-12 h-12 object-contain" />
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
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-[1.2] mb-10 max-w-5xl">
            How Thyleads engineered a signal-based outbound system{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-[#C3F53C]">
              for Pazo and closed 4 enterprise deals in 90 days.
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
                As a pioneer in operations management and frontline automation, Pazo is the digital nervous system for massive physical footprints.
              </p>
              <p>
                From sprawling retail chains to elite coworking spaces, Pazo allows leadership to maintain peak operational standards across thousands of locations. To scale, they needed an outbound motion as robust as their platform: one that bypassed the noise and landed directly on the desks of decision-makers facing real complexities.
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

            <div className="prose prose-lg max-w-none text-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Challenge: Good Tool, Wrong Buyers, and No Signal.</h3>
              <p className="mb-6">
                In Facility Management and Coworking, the difference between a lead and a deal is context. At Pazo, SDRs were sprinting, but they were running toward the wrong finish line: engaging small ops teams instead of the multi-site enterprise chains where Pazo’s true value was sitting.
              </p>
              <p className="text-xl font-semibold text-slate-800 mb-6">The Turmoil:</p>
              <ul className="space-y-4 my-8">
                {[
                  'While the funnel looked full, the sales cycle was dragging.',
                  'SDRs were trapped in conversations with misfit personas.',
                  'Market incumbents were capturing buyer mindshare before Pazo could even get a seat at the table.',
                  'The targeting was based on industry rather than intent.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Without a way to identify pre-pain signals, like regional expansion or organizational restructuring, the team was pitching to everyone and resonating with no one.
              </p>
            </div>
            {/* The Solution */}
            <div id="solution" className="prose prose-lg max-w-none text-slate-600 scroll-mt-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Solution: Building a GTM Lab (Outbound as a Signal System)</h3>
              <p className="mb-6">
                Thyleads re-engineered the entire targeting logic into a Signal System. We treated Pazo’s outbound as a precision laboratory:
              </p>
              <p className="text-xl font-semibold text-slate-800 mb-6">What changed:</p>

              {/* Solution Cards */}
              <div className="space-y-6 not-prose">
                {/* I. Outreach Infrastructure */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">I</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Revenue Reverse-Engineering</h4>
                      <p className="text-slate-600">
                        We ignored assumptions and studied the DNA of Pazo&apos;s past wins. We identified behavioral triggers such as new Ops Head hires, regional site growth, or a change in franchise strategy. In a literal sense, we found the Compliance Debt before the prospect even felt the interest rate.
                      </p>
                    </div>
                  </div>
                </div>

                {/* II. Multi-Channel Visibility */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">II</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Structural Lookalike Mapping</h4>
                      <p className="text-slate-600 mb-3">
                        We moved beyond vertical matching to behavioral matching. We hunted for organizational complexity: 10+ sites, QA teams, and regional franchise layers, where visibility gaps are a guaranteed pain point.
                      </p>
                    </div>
                  </div>
                </div>

                {/* III. Waterfall Enrichment */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">III</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Friction-Mapped Messaging</h4>
                      <p className="text-slate-600">
                        We replaced product pitches with Operational Mirroring. Instead of listing features, we asked the questions that keep Ops VPs awake: &quot;Who finds out first when your SOPs fail?&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* IV. AI Personalisation */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">IV</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">The Coworking Vertical Lab</h4>
                      <p className="text-slate-600">
                        We isolated one niche, narrowed the target to 200 high-intent accounts, and exhausted the segment with hyper-personalized, handwritten copy for Tier 1 leads. This deep-dive approach turned one vertical into a high-velocity revenue engine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="key-results" className="prose prose-lg max-w-none text-slate-600 scroll-mt-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Results(90 days)</h3>
              <ul className="space-y-2 my-4">
                {[
                  '37 Total Qualified Meetings generated within the first 90 days.',
                  '4 Closed-Won Deals (including India’s most prominent coworking chain).',
                  '80% Lead Qualification Rate, moving from junk volume to Tier 1 precision.',
                  '3X Reply Rate in the Coworking vertical post-optimization.',
                  '2X Signal-to-Pipeline Conversion compared to all previous outbound efforts.'
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
                With the Signal-First blueprint now validated, Pazo is moving from a tactical sales motion to a dominant GTM strategy.
              </p>
              <p>
                The infrastructure is now in place to replicate the Coworking success across Retail and Facility Management global markets. By continuing to treat every reply as a data point in a feedback loop, Pazo isn&apos;t just selling software; they are currently owning the operational intent of the enterprise market.
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">If your outbound engine is running hot but your pipeline is staying cold</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            It’s time to re-engineer it.
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
