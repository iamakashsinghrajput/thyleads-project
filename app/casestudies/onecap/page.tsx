'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Quote,
  Building2,
  Layers,
  Workflow,
  Users,
  MapPin,
  Repeat,
  CalendarCheck,
  Clock,
  Trophy,
  Rocket,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const heroStats = [
  { value: '0→1', label: 'Pipeline built from zero' },
  { value: 'CFO', label: 'Level meetings every month' },
  { value: '4+', label: 'Verticals covered' },
  { value: 'Closed', label: 'Deals from outbound pipeline' },
];

const navItems = [
  { label: 'About OneCap', id: 'about' },
  { label: 'Overview', id: 'overview' },
  { label: 'The Challenge', id: 'challenge' },
  { label: 'The Solution', id: 'solution' },
  { label: 'Key Results', id: 'key-results' },
];

const meta = [
  { icon: Building2, label: 'Client', value: 'OneCap' },
  { icon: Layers, label: 'Vertical', value: 'FinTech / Fin-Ops Automation' },
  { icon: Workflow, label: 'Engagement', value: 'Full outbound build + execution' },
  { icon: Users, label: 'Target Personas', value: 'CFOs, Finance Heads, Controllers' },
  { icon: MapPin, label: 'HQ', value: 'Bengaluru, India' },
];

const aboutParas = [
  'OneCap is an Antler-backed, Fin-Ops automation platform for Indian SMEs and mid-market businesses. It helps finance teams automate reconciliations, manage collections, monitor cashflow in real-time, and close books faster. It works with any ERP (Tally, Zoho, SAP, and more) without heavy integrations.',
  'The product was strong. Finance teams that got on a demo were impressed. The problem was getting in front of the right people consistently.',
];

const overviewParas = [
  "OneCap's platform is a finance team's co-pilot. It handles everything from payment matching to vendor balance confirmations, so CFOs and Finance Heads can stop firefighting and start making decisions with clean, real-time data.",
  'The founding team had been doing sales, running demos, chasing follow-ups, and building the product at the same time. Leads came through referrals and founder networks. Some months were strong, others were dry. There was no structured outbound motion and no predictable way to fill the top of the funnel.',
  'OneCap needed a partner who understood the SaaS GTM playbook, could identify and reach finance decision-makers, and could consistently set up meetings that were worth their sales team’s time.',
];

const testimonial = {
  quote:
    'We knew our product solved a real problem for finance teams, but getting in front of the right CFOs and Finance Heads consistently was something we struggled with. Thyleads understood our buyer, spoke their language, and made sure every conversation our sales team walked into was a real opportunity. They effectively became our outbound GTM engine.',
  name: 'Sandeep Nambiar',
  title: 'Co-Founder & CEO, OneCap',
};

const challenges = [
  {
    title: 'No structured outbound motion',
    body: 'Pipeline was inconsistent. The founding team was wearing too many hats: selling, demoing, hiring, and building the product all at once.',
  },
  {
    title: 'Hard-to-reach personas',
    body: 'CFOs and Finance Heads are busy people. They ignore generic outreach. Getting their attention requires messaging that speaks to their specific pain, not feature lists.',
  },
  {
    title: 'Referral-dependent pipeline',
    body: 'Leads were coming from founder networks and referrals only. That meant zero predictability and zero control over pipeline volume month to month.',
  },
  {
    title: 'Multi-stakeholder buying process',
    body: 'For a product like OneCap, the finance team, IT, and sometimes the CEO all need to be on board. One meeting isn’t enough. Deals need multi-threading to close.',
  },
];

const solutions = [
  {
    title: 'ICP Definition and Data Building',
    body: "We worked closely with OneCap's team to sharpen the ICP around “finance leaders at SMEs.” We dug into specifics: company size, industry verticals where reconciliation pain was highest (retail, e-commerce, lending, real estate), tech-stack signals, and recent hiring patterns in finance teams. From there, we built a high-quality contact list of CFOs, Finance Heads, and Controllers across target accounts.",
  },
  {
    title: 'Messaging That Spoke to Finance Pain Points',
    body: 'Generic outreach doesn’t work with CFOs. These people live in spreadsheets, deal with month-end chaos, and care about accuracy and control. We crafted messaging that led with real problems: manual reconciliation eating up weeks, revenue leakage going unnoticed, delayed collections hurting cashflow. No fluff. The kind of language that makes a Finance Head stop and say, “Okay, this is relevant.” Multiple angles were tested across email and LinkedIn, and we iterated based on what was actually getting replies.',
  },
  {
    title: 'Multi-Channel Outbound Execution',
    body: 'We ran coordinated campaigns across email and LinkedIn with proper warm-up, domain setup, and sender identity aligned to OneCap’s brand. Every touchpoint felt like it was coming from OneCap, not a third-party agency. Sequences were designed with follow-ups that added value rather than generic “bumping this up” messages.',
  },
  {
    title: 'Pre-Sales Qualification',
    body: 'Not every reply is a qualified lead. We made sure every meeting booked was with someone who had the right title, the right pain, and the right intent. Budget, authority, need, and timeline were all checked before a meeting hit the OneCap calendar. The OneCap sales team only walked into conversations with real potential.',
  },
  {
    title: 'Deal Momentum and Follow-Ups',
    body: 'It didn’t stop at the first meeting. We helped with post-demo follow-ups, scheduling second and third meetings with extra stakeholders, and keeping deals moving. For a product where the finance team, IT, and the CEO all need to sign off, this kind of multi-threading was critical to getting deals across the line.',
  },
];

const results = [
  {
    icon: Repeat,
    text: 'Consistent pipeline of SQLs every month for the first time since OneCap’s launch.',
  },
  {
    icon: CalendarCheck,
    text: 'Qualified appointments with CFOs and Finance Heads at companies across retail, lending, e-commerce, and real estate verticals.',
  },
  {
    icon: Trophy,
    text: 'Multiple closed deals directly attributed to the outbound pipeline built by Thyleads.',
  },
  {
    icon: Clock,
    text: 'Shorter sales cycles because prospects were already pre-qualified and had context before the first meeting.',
  },
  {
    icon: Rocket,
    text: 'Founding team freed up to focus on product and closing instead of top-of-funnel prospecting.',
  },
];

const moreStudies = [
  {
    id: 'zigtal',
    company: 'Zigtal',
    title: 'Re-engineered GTM to move past the “just HR tool” category',
    desc: 'Thyleads repositioned Zigtal as mandatory infrastructure for skill-based enterprise growth.',
    stats: [
      { value: 'CHRO', label: 'Level access' },
      { value: 'SAP', label: 'Ecosystem targeted' },
      { value: 'Active', label: 'Pipeline' },
    ],
  },
  {
    id: 'clevertap',
    company: 'CleverTap',
    title: '90+ qualified meetings in 90 days with a 30% closed-won rate',
    desc: 'Vertical-specific pod scaled appointment volume 3x while cutting ramp time by half.',
    stats: [
      { value: '90+', label: 'Meetings' },
      { value: '3x', label: 'Volume' },
      { value: '30%', label: 'SQL to Won' },
    ],
  },
  {
    id: 'dice',
    company: 'Dice',
    title: '115+ appointments in 6 months with 140% average KPI achievement',
    desc: 'Vertical-trained outbound across 25 industries with a 23% average closing rate.',
    stats: [
      { value: '115+', label: 'Appointments' },
      { value: '140%', label: 'KPI hit' },
      { value: '23%', label: 'Close rate' },
    ],
  },
];

export default function OneCapCaseStudy() {
  const [activeId, setActiveId] = useState('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#f7f3eb] font-sans scroll-smooth">
      <Navbar />

      {/* HERO */}
      <header className="relative w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute -top-20 right-0 w-[700px] h-[700px] bg-primary-600/25 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 -left-20 w-[560px] h-[560px] bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:46px_46px] opacity-40" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-12">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/casestudies" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Case Studies
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70">FinTech</span>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-primary-500/15 border border-primary-400/30 text-primary-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Case Study
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl">
            How Thyleads helped OneCap build a repeatable outbound engine to reach{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-300">
              CFOs and Finance Heads
            </span>
          </h1>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-white/10 border border-white/10">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-slate-950/60 backdrop-blur-sm px-6 py-6 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-indigo-200">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs text-white/60 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="relative bg-[#f7f3eb]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 md:px-10 py-16 lg:py-20">

          {/* LEFT NAV */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-5">
                In this case study
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`flex items-center gap-3 w-full text-left py-1.5 text-[15px] transition-colors ${
                        active ? 'text-primary-700 font-semibold' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <span
                        className={`h-px transition-all ${
                          active ? 'w-6 bg-primary-600' : 'w-3 bg-slate-300'
                        }`}
                      />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* CENTER CONTENT */}
          <article className="lg:col-span-6 space-y-16">

            <section id="about" className="scroll-mt-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-3">About OneCap</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-5">
                Fin-Ops automation for <span className="text-primary-600">Indian SMEs</span>
              </h2>
              <div className="space-y-4 text-[15px] md:text-base text-slate-600 leading-relaxed">
                {aboutParas.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section id="overview" className="scroll-mt-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-3">Overview</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-5">
                A strong product with <span className="text-primary-600">no outbound engine</span>
              </h2>
              <div className="space-y-4 text-[15px] md:text-base text-slate-600 leading-relaxed">
                {overviewParas.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <figure className="mt-8 relative rounded-2xl bg-slate-50 border border-slate-200 p-7 md:p-8">
                <Quote className="w-9 h-9 text-primary-200 mb-4" />
                <blockquote className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-5">
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.title}</div>
                </figcaption>
              </figure>
            </section>

            <section id="challenge" className="scroll-mt-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-3">The Challenge</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                Selling to CFOs is a <span className="text-primary-600">different game</span>
              </h2>
              <p className="text-[15px] md:text-base text-slate-600 leading-relaxed mb-7">
                CFOs and Finance Heads don’t respond to generic cold emails. They’ve seen every “automate your
                finance” pitch before. Their buying cycles are longer because they need trust before they agree to a call.
              </p>
              <div className="space-y-4">
                {challenges.map((c, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{c.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="solution" className="scroll-mt-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-3">The Solution</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                Building the outbound engine <span className="text-primary-600">from the ground up</span>
              </h2>
              <p className="text-[15px] md:text-base text-slate-600 leading-relaxed mb-7">
                OneCap partnered with Thyleads to build and run their entire outbound motion. Here’s how we did it.
              </p>
              <div className="space-y-4">
                {solutions.map((s, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 border border-slate-200 p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="key-results" className="scroll-mt-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-3">Key Results</p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-7">
                From zero pipeline to <span className="text-primary-600">closed deals</span>
              </h2>
              <div className="space-y-3">
                {results.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div key={i} className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </span>
                      <p className="text-[15px] text-slate-700 font-medium leading-relaxed pt-1.5">{r.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6">
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                  Get results like OneCap for your pipeline
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  See how Thyleads can build qualified pipeline for your product from scratch.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-3 transition-colors"
                >
                  Book a GTM Audit <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/casestudies"
                  className="flex items-center justify-center gap-2 w-full rounded-full border border-primary-200 text-primary-700 hover:bg-primary-100 text-sm font-semibold px-5 py-3 mt-3 transition-colors"
                >
                  View More Stories
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 p-6 space-y-5">
                {meta.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{m.label}</div>
                        <div className="text-sm font-semibold text-slate-800 leading-snug">{m.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary-600/25 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
            Your product solves a real problem. Let Thyleads get it in front of the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-300">
              right people.
            </span>
          </h2>
          <p className="text-lg text-white/60 mb-9">Talk to us about building your outbound engine.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-7 py-3.5 rounded-full font-bold hover:bg-primary-50 transition-colors"
            >
              Book a Meeting <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/casestudies"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              View More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* MORE CASE STUDIES */}
      <section className="bg-[#f7f3eb] py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-700 mb-3">More Case Studies</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              See how other SaaS companies <span className="text-primary-600">scaled pipeline.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moreStudies.map((s) => (
              <Link
                key={s.id}
                href={`/casestudies/${s.id}`}
                className="group rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all p-6 flex flex-col"
              >
                <span className="inline-flex self-start px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-5">
                  {s.company}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{s.desc}</p>

                <div className="mt-auto grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                  {s.stats.map((st) => (
                    <div key={st.label}>
                      <div className="text-lg font-extrabold text-primary-600 leading-none">{st.value}</div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-tight">{st.label}</div>
                    </div>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:gap-2 transition-all">
                  Read Case Study <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
