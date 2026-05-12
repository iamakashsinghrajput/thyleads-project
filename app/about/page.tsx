"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Sparkles,
  Linkedin,
  Target,
  Compass,
  Zap,
  Users2,
  Clock,
  Crosshair,
  ShieldCheck,
  CalendarDays,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PhotoAvatar({
  name,
  initials,
  photo,
  sizeClass,
  gradient,
}: {
  name: string;
  initials: string;
  photo?: string;
  sizeClass: string;
  gradient: string;
}) {
  const [failed, setFailed] = useState(false);

  if (photo && !failed) {
    return (
      <div
        className={`relative ${sizeClass} rounded-full overflow-hidden border-2 border-white shadow-[0_10px_30px_-12px_rgba(132,92,245,0.45)] shrink-0 bg-slate-100`}
      >

        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-extrabold shadow-[0_10px_30px_-12px_rgba(132,92,245,0.45)] shrink-0`}
    >
      {initials}
    </div>
  );
}

function TopDivider() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl flex items-center justify-center pointer-events-none">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-200/70 to-primary-300/80" />
      <div className="relative flex items-center justify-center mx-3">
        <span className="absolute w-5 h-5 rounded-full bg-primary-300/30 blur-md" />
        <span className="relative w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(94,48,208,0.6)]" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary-200/70 to-primary-300/80" />
    </div>
  );
}

function WhoWeAre() {
  return (
    <section className="relative min-h-[80vh] flex flex-col pt-32 lg:pt-36 pb-20 px-6 sm:px-12 overflow-hidden bg-slate-50 font-sans">
      <div className="flex-1 flex flex-col justify-center w-full max-w-5xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-700 shadow-sm mb-6">
            <span className="text-sm font-medium text-primary-700">About Thyleads</span>
          </div>

          <h1 className="text-[2.25rem] md:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-neutral-900 max-w-4xl">
            We are not a lead generation company.{" "}
            <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-3 rounded-md">
              We are your pipeline-to-revenue partner.
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
            From seeing the gaps in legacy outbound to building the system you wish existed.
            Thyleads was born from real problems, solved with AI and human expertise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Founders() {
  const founders = [
    {
      name: "Rahul Dev",
      role: "Co-Founder & CEO",
      initials: "RD",
      photo: "/team/rahuldev.png",
      bio: "A decade in SaaS sales made one thing clear: no matter the stage or scale, one problem stayed constant. Outbound didn't work the way it should. Teams relied on outdated, volume-driven approaches with little innovation, burning time and money without building predictable pipeline. That made me realise the problem wasn't effort, it was the system itself. I wanted to change that, to bring real innovation into how outbound and pipeline generation actually worked. That led me to build Thyleads, and four years later, we've helped 70+ SaaS teams build pipeline they can actually count on and turn it into consistent revenue growth.",
      linkedin: "#",
    },
    {
      name: "Prachi Dev",
      role: "Co-Founder",
      initials: "PD",
      photo: "/team/prachi-dev.jpg",
      bio: "When Rahul walked me through what he was building, the thing that stood out wasn't the service. It was the intent to build something that truly works for India. Having seen how SaaS companies struggled to design outbound systems for generating consistent revenue, it became clear that there was a deeper problem to solve. I realised this wasn't another lead generation agency. It was an opportunity to build something far more impactful, where real innovation could take place. What I'm most proud of is that our clients don't feel like they outsourced their work. They feel like they added a team.",
      linkedin: "https://www.linkedin.com/in/prachi-dev-ba55b320b/",
    },
  ];

  return (
    <section className="relative w-full bg-slate-50 overflow-hidden flex flex-col items-center px-6 sm:px-12 font-sans py-20 lg:py-28">
      <TopDivider />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-600 mb-6">
            Founders
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-neutral-900 mb-6">
            A Message from Our{" "}
            <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">
              Founders
            </span>
          </h2>
          <p className="text-base md:text-lg text-neutral-500 leading-relaxed">
            We started Thyleads after years of watching outbound break, AEs burn out, and pipelines stall in the gap between marketing and sales. We&apos;re building the partner we wish we&apos;d had.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-[2rem] bg-white border-2 border-transparent p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:border-primary-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(132,92,245,0.20)] transition-all duration-500"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-200/40 blur-[60px] rounded-full group-hover:bg-primary-300/50 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <PhotoAvatar
                    name={founder.name}
                    initials={founder.initials}
                    photo={founder.photo}
                    sizeClass="w-20 h-20 text-2xl"
                    gradient="from-primary-500 to-primary-700"
                  />
                  <div>
                    <h3 className="text-xl font-extrabold text-neutral-900 leading-tight">
                      {founder.name}
                    </h3>
                    <p className="text-sm text-primary-600 font-semibold">{founder.role}</p>
                  </div>
                </div>

                <p className="text-neutral-600 leading-relaxed mb-6">{founder.bio}</p>

                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STORY_MILESTONES = [
  {
    year: "2021",
    title: "Where it Began",
    desc: "We founded Thyleads to fix legacy outbound and help SaaS founders grow through first-hand sales experience.",
  },
  {
    year: "2022",
    title: "The Foundation",
    desc: "When post-COVID spam policies made inboxing harder, we helped clients consistently land inside the Inbox rather than Spam. That's where we built our foundation in deliverability.",
  },
  {
    year: "2023",
    title: "The Playbook",
    desc: "We grew into lead generation and built the first structured outbound playbook for SaaS companies selling in India.",
  },
  {
    year: "2024",
    title: "The Evolution",
    desc: "We were booking qualified meetings but that alone wasn't enough to help clients close faster. That's when we became an end-to-end outbound partner focused on deal momentum and revenue outcomes.",
  },
  {
    year: "2025",
    title: "Scaling Up",
    desc: "Across industries and growth stages, Thyleads became a trusted revenue partner. With 70+ clients and a 3-pillar SaaS revenue engine, our goal stays the same: turn outbound into real revenue.",
  },
];

function OurStory() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 75%"],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full bg-white overflow-hidden flex flex-col items-center px-6 sm:px-12 font-sans py-20 lg:py-28">
      <TopDivider />

      <div
        aria-hidden="true"
        className="absolute top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />

      <div className="max-w-3xl mx-auto w-full relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-600 mb-6">
            Our Story
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-neutral-900">
            How Thyleads{" "}
            <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">
              Grew
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Five years of compounding lessons — from first SaaS outbound campaign to a 70+ client revenue engine.
          </p>
        </motion.div>

        <div ref={railRef} className="relative pl-10 sm:pl-14">

          <span
            aria-hidden="true"
            className="absolute left-3 sm:left-5 top-2 bottom-2 w-px pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(132,92,245,0.30) 0 5px, transparent 5px 11px)",
            }}
          />

          <motion.span
            aria-hidden="true"
            className="absolute left-3 sm:left-5 top-2 w-[2px] rounded-full bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700 shadow-[0_0_10px_rgba(132,92,245,0.45)] pointer-events-none"
            style={{ height: railHeight }}
          />

          <ol className="space-y-10 sm:space-y-12">
            {STORY_MILESTONES.map((m) => (
              <StoryRow key={m.year} milestone={m} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StoryRow({
  milestone,
}: {
  milestone: { year: string; title: string; desc: string };
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 85%", "start 45%"],
  });
  const dotOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 1]);
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
  const haloOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <motion.li
      ref={rowRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >

      <div className="absolute -left-[34px] sm:-left-[44px] top-1.5 flex items-center justify-center">
        <motion.span
          aria-hidden="true"
          className="absolute -inset-2 rounded-full bg-primary-300/40 blur-md pointer-events-none"
          style={{ opacity: haloOpacity }}
        />
        <motion.span
          className="relative block w-3 h-3 rounded-full bg-white border-[2.5px] border-primary-500 shadow-[0_0_0_3px_rgba(255,255,255,1),0_0_0_4px_rgba(132,92,245,0.18)]"
          style={{ opacity: dotOpacity, scale: dotScale }}
        />
      </div>

      <div className="mb-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 text-[11px] font-bold tracking-[0.05em] text-primary-700 tabular-nums">
          {milestone.year}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-neutral-900 leading-snug">
        {milestone.title}
      </h3>

      <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">
        {milestone.desc}
      </p>
    </motion.li>
  );
}

function NorthStar() {
  return (
    <section className="relative w-full bg-slate-50 overflow-hidden flex flex-col items-center px-6 sm:px-12 font-sans py-20 lg:py-28">
      <TopDivider />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(132,92,245,0.12) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          mask: "radial-gradient(ellipse 70% 70% at center, black 30%, transparent 90%)",
          WebkitMask:
            "radial-gradient(ellipse 70% 70% at center, black 30%, transparent 90%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-primary-100/50 blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary-100 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-600 mb-6">
            North Star
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-neutral-900">
            Our{" "}
            <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">
              North Star
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            The two anchors that shape every decision we make at Thyleads.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >

          <div className="absolute left-1/2 -translate-x-1/2 -top-9 z-20">
            <div className="relative">

              <motion.span
                aria-hidden="true"
                className="absolute -inset-4 rounded-full bg-primary-300/40 blur-xl pointer-events-none"
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
              />

              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-dashed border-primary-300/70 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-[0_18px_40px_-12px_rgba(132,92,245,0.55)] border-4 border-white">
                <Star className="w-7 h-7 text-white" strokeWidth={2.25} fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] bg-white border border-primary-100 shadow-[0_24px_70px_-30px_rgba(132,92,245,0.30)] overflow-hidden">

            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary-300/70 to-transparent" />

            <div className="grid md:grid-cols-2 relative">

              <div
                aria-hidden="true"
                className="hidden md:block absolute left-1/2 top-12 bottom-12 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary-200/80 to-transparent"
              />

              <div
                aria-hidden="true"
                className="md:hidden absolute left-10 right-10 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary-200/80 to-transparent"
              />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative pt-16 sm:pt-20 pb-10 sm:pb-12 px-8 sm:px-10 text-center md:text-left"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 mb-5">
                  <Target className="w-6 h-6" strokeWidth={2.25} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-500 mb-2">
                  01 / Mission
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mb-4 leading-[1.15]">
                  Our Mission
                </h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-md md:max-w-none mx-auto md:mx-0">
                  Building India&apos;s most predictable sales engine by managing the entire outbound process from first contact to closed deal.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative pt-10 sm:pt-20 pb-10 sm:pb-12 px-8 sm:px-10 text-center md:text-left"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 mb-5">
                  <Compass className="w-6 h-6" strokeWidth={2.25} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-500 mb-2">
                  02 / Vision
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mb-4 leading-[1.15]">
                  Our Vision
                </h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-md md:max-w-none mx-auto md:mx-0">
                  To become the go-to revenue partner for SaaS companies worldwide looking to win in India.
                </p>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary-200/60 to-transparent" />
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              True North
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Compounding daily
            </span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="hidden sm:inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              Built for India
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Philosophy() {
  const principles = [
    {
      icon: Zap,
      title: "Momentum > Noise",
      desc: "We ignore open rates to focus on deal velocity and opportunity tracking.",
      span: "md:col-span-2",
    },
    {
      icon: Users2,
      title: "Human-in-the-loop",
      desc: "Every lead handoff is human-verified and context-heavy.",
      span: "md:col-span-2",
    },
    {
      icon: Clock,
      title: "1 AE = 10 AEs",
      desc: "Your team handles 3× more volume because we've removed the chasing phase.",
      span: "md:col-span-2",
    },
    {
      icon: Crosshair,
      title: "No siloed reporting",
      desc: "Our weekly reviews focus on opportunity tracking, not activity logs.",
      span: "md:col-span-3",
    },
    {
      icon: ShieldCheck,
      title: "Growth that is expected",
      desc: "An intent-led GTM engine that is systematic and can scale to meet your revenue targets.",
      span: "md:col-span-3",
    },
  ];

  return (
    <section className="relative w-full bg-slate-50 overflow-hidden flex flex-col items-center px-6 sm:px-12 font-sans py-20 lg:py-28">
      <TopDivider />

      <div className="max-w-6xl mx-auto w-full relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary-100 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-600 mb-6">
            Philosophy
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-neutral-900">
            Our Performance{" "}
            <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">
              Philosophy
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            These principles guide every decision we make and every action we take.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-6 gap-5 lg:gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`${p.span} group relative rounded-2xl bg-white border border-slate-200 p-7 sm:p-8 hover:border-primary-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_-22px_rgba(132,92,245,0.30)] transition-all duration-500 overflow-hidden`}
            >

              <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary-200/80 to-transparent" />

              <div className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-100 text-primary-600 mb-5 group-hover:bg-primary-200 transition-colors duration-300">
                <p.icon className="w-5 h-5" strokeWidth={2.25} />
              </div>

              <h3 className="text-lg font-extrabold tracking-tight text-neutral-900 mb-2">
                {p.title}
              </h3>

              <p className="text-[14px] text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  {
    name: "Rahul Dev",
    role: "The Growth Weaver",
    desc: "Weaves strategy, relationships, and decisions into revenue outcomes.",
    initials: "RD",
    gradient: "from-violet-500 to-primary-700",
    photo: "/team/rahuldev.png",
    linkedin: "https://www.linkedin.com/in/rahuldevchauhan/",
  },
  {
    name: "Prachi Dev",
    role: "The Momentum Catalyst",
    desc: "Turns cold prospects into warm opportunities.",
    initials: "PD",
    gradient: "from-primary-500 to-fuchsia-600",
    photo: "/team/prachi-dev.jpg",
    linkedin: "https://www.linkedin.com/in/prachi-dev-ba55b320b/",
  },
  {
    name: "Bala Bharath Kumar Pavuluri",
    role: "The Business Compass",
    desc: "Keeps the business moving in the right direction.",
    initials: "BP",
    gradient: "from-sky-500 to-primary-600",
    photo: "/team/bala-bharath.png",
    linkedin: "https://www.linkedin.com/in/balabharathkumarpavuluri/",
  },
  {
    name: "Kunal Singh",
    role: "The Execution Lead",
    desc: "Keeps everything running: people, process, and performance.",
    initials: "KS",
    gradient: "from-rose-400 to-primary-600",
    photo: "/team/kunal-singh.jpg",
    linkedin: "https://www.linkedin.com/in/kunal-thyleads/",
  },
  {
    name: "Akash Singh",
    role: "The Tech Backbone",
    desc: "Builds the systems that power everything behind the scenes.",
    initials: "AS",
    gradient: "from-emerald-500 to-primary-600",
    photo: "/team/akash-singh.jpg",
    linkedin: "https://www.linkedin.com/in/akashsingh21/",
    featured: true,
  },
  {
    name: "Sandeep Kalura",
    role: "The Deal Closer",
    desc: "Turns opportunities into revenue with precision and consistency.",
    initials: "SK",
    gradient: "from-indigo-500 to-primary-700",
    photo: "/team/sandeep-kalura.jpg",
    linkedin: "https://www.linkedin.com/in/sandeep-singh-6119a137b/",
  },
  {
    name: "Naman Pawar",
    role: "The Ops Anchor",
    desc: "Keeps operations steady, aligned, and running.",
    initials: "NP",
    gradient: "from-amber-500 to-primary-600",
    photo: "/team/naman-pawar.jpg",
    linkedin: "https://www.linkedin.com/in/namanpanwar/",
  },

  {
    name: "Manshi Kaverappa",
    role: "The Account Driver",
    desc: "Drives every interaction forward so deals never lose momentum.",
    initials: "MK",
    gradient: "from-pink-500 to-primary-600",
    photo: "/team/manshi-kaverappa.jpg",
    linkedin: "https://www.linkedin.com/in/manshi-kaverappa-3356aa34a/",
  },
  {
    name: "Krishna Sharma",
    role: "The GTM Engineer",
    desc: "Finds the right accounts and crafts the strategy to convert them.",
    initials: "KS",
    gradient: "from-teal-500 to-primary-600",
    photo: "/team/krishna-sharma.png",
    linkedin: "https://www.linkedin.com/in/krishna-sharma-00b003390/",
  },
];

function Team() {
  return (
    <section className="relative w-full bg-slate-50 overflow-hidden flex flex-col items-center px-6 sm:px-12 font-sans py-20 lg:py-28">
      <TopDivider />

      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -right-32 w-[32rem] h-[32rem] rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary-100 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-600 mb-6">
            The Team
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-neutral-900">
            The people behind{" "}
            <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">
              your pipeline
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            A team focused on building revenue engines for global SaaS companies in India.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative rounded-[1.75rem] p-6 sm:p-7 hover:-translate-y-2 transition-all duration-500 overflow-hidden ${
                member.featured
                  ? "bg-gradient-to-br from-primary-50 via-white to-primary-50/40 border-2 border-primary-300 shadow-[0_18px_44px_-18px_rgba(132,92,245,0.45)] hover:border-primary-500 hover:shadow-[0_28px_70px_-22px_rgba(132,92,245,0.55)]"
                  : "bg-white border border-slate-200 hover:border-primary-200 hover:shadow-[0_24px_60px_-22px_rgba(132,92,245,0.32)]"
              }`}
            >

              <div
                aria-hidden="true"
                className={`absolute -top-20 -right-12 w-44 h-44 rounded-full bg-primary-100/60 blur-3xl pointer-events-none transition-opacity duration-500 ${
                  member.featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              <div className={`absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent ${
                member.featured ? "via-primary-400" : "via-primary-200/80"
              } to-transparent`} />

              {member.featured && (
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary-500 to-transparent"
                />
              )}

              <div className="relative z-10 flex flex-col h-full">

                <div className="flex items-start justify-between mb-5">
                  <div className="relative">

                    <span
                      aria-hidden="true"
                      className={`absolute -inset-1.5 rounded-full bg-gradient-to-br blur transition-all duration-500 ${
                        member.featured
                          ? "from-primary-300/40 to-primary-500/40"
                          : "from-primary-300/0 to-primary-300/0 group-hover:from-primary-300/40 group-hover:to-primary-500/40"
                      }`}
                    />
                    <div className="relative">
                      <PhotoAvatar
                        name={member.name}
                        initials={member.initials}
                        photo={member.photo}
                        sizeClass="w-16 h-16 text-lg"
                        gradient={member.gradient}
                      />
                    </div>
                  </div>

                  {member.featured ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary-600 text-white text-[9.5px] font-bold uppercase tracking-[0.18em] shadow-[0_6px_16px_-6px_rgba(132,92,245,0.55)]">
                      That&apos;s me
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-300 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(TEAM.length).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-neutral-900 leading-tight">
                  {member.name}
                </h3>

                <p className="text-sm font-semibold text-primary-600 mb-3">
                  {member.role}
                </p>

                <p className="text-[14px] text-slate-600 leading-relaxed flex-1">
                  {member.desc}
                </p>

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
                  <a
                    href={member.linkedin}
                    target={member.linkedin !== "#" ? "_blank" : undefined}
                    rel={member.linkedin !== "#" ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary-700 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 text-center text-sm text-slate-500 italic"
        >
          …and 20 more team members across outbound, support, and operations.
        </motion.p>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-20 lg:py-28 px-6 sm:px-12 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 font-sans">
      <TopDivider />

      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-[36rem] h-[36rem] rounded-full bg-primary-200/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-1/4 w-[36rem] h-[36rem] rounded-full bg-primary-100/60 blur-3xl pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(132,92,245,0.12) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          mask: "radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)",
          WebkitMask:
            "radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold tracking-[-0.02em] leading-[1.08] text-neutral-900">
          Your next 15 qualified Indian enterprise meetings are{" "}
          <span className="bg-primary-100 text-primary-700 px-4 py-1 inline-block mt-2 rounded-md">
            closer than you think.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
          Join <span className="font-semibold text-primary-700">70+ SaaS companies</span> using Thyleads to scale their revenue with AI-powered outbound.
        </p>

        <div className="mt-9 flex items-center justify-center">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-primary-50 text-primary-700 text-base font-bold shadow-[0_18px_40px_-14px_rgba(132,92,245,0.30)] border border-primary-100 hover:border-primary-200 transition-all"
          >
            Book a Meeting
            <CalendarDays className="w-4 h-4 text-primary-600 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.25} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <WhoWeAre />
        <Founders />
        <OurStory />
        <NorthStar />
        <Philosophy />
        <Team />
        <ClosingCTA />
        <Footer />
      </main>
    </>
  );
}
