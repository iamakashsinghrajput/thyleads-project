'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Quote, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CaseStudies from '@/components/CaseStudies';
import TrustedBy from '@/components/TrustedBy';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

/**
 * TESTIMONIALS DATA - Only real case studies
 */
const testimonials = [
  {
    id: 'clevertap',
    category: 'tech',
    companyName: 'CleverTap',
    logo: '/images/CleverTap.svg',
    brandColor: 'text-[#003580]',
    quote: "I've been burned by agencies in the past and Thyleads has exceeded my expectations because of their commitments to our sucess",
    personName: 'Roopesh Balakrishna',
    personTitle: 'Regional VP',
    personImage: '/clevertap.png',
    stats: { label: 'Pipeline', value: '3X' }
  },
  {
    id: 'tazapay',
    category: 'finance',
    companyName: 'Tazapay',
    logo: '/images/Tazapay.svg',
    brandColor: 'text-[#003580]',
    quote: "Thyleads qualify, set context, and make sure our sales team walks into calls knowing why the prospect is there and what problem they're trying to solve.",
    personName: 'Umar Salman',
    personTitle: 'Head of Marketing',
    personImage: '/tazapay.png',
    stats: { label: 'Qualified', value: '100%' }
  },
  {
    id: 'pazo',
    category: 'tech',
    companyName: 'Pazo',
    logo: '/images/pazo.png',
    brandColor: 'text-[#6B7280]',
    quote: "The quality of conversation we're having now - we're speaking with the right people, at the right company, with actual buying content",
    personName: 'Nitin Ravi',
    personTitle: 'Head of Global Sales',
    personImage: '/pazo.png',
    stats: { label: 'Quality', value: '+85%' }
  },
  {
    id: 'dice',
    category: 'tech',
    companyName: 'Dice',
    logo: '/images/dice.png',
    brandColor: 'text-[#146EF5]',
    quote: "Thyleads gets highly sales qualified leads within the provided target regions from the very first month of our partnership",
    personName: 'Ishan Acharya',
    personTitle: 'VP of Business Operations',
    personImage: '/dice.png',
    stats: { label: 'ROI', value: '10:1' }
  },
  {
    id: 'vwo',
    category: 'tech',
    companyName: 'VWO',
    logo: '/images/VWO.svg',
    brandColor: 'text-[#146EF5]',
    quote: "They adapt quickly to feedback, efficiently reach decision makers and maintain a low no-show rate-rate qualities in outbound",
    personName: 'Harsh Sharma',
    personTitle: 'Senior Manager-APAC',
    personImage: '/vwo.png',
    stats: { label: 'Show Rate', value: '95%' }
  },
  {
    id: 'novabenefit',
    category: 'finance',
    companyName: 'NovaBenefits',
    logo: '/images/NovaBenefits.svg',
    brandColor: 'text-[#003580]',
    quote: "Thyleads brings strong on the ground experience in managing sales SDR teams and comes highly recommended for any B2B companies looking to build a strong top of funnel.",
    personName: 'Saransh Garg',
    personTitle: 'Co-Founder',
    personImage: '/saransh.png',
    stats: { label: 'Qualified', value: '100%' }
  },
  {
    id: 'epiplex',
    category: 'finance',
    companyName: 'Epiplex',
    logo: '/images/epiplex.svg',
    brandColor: 'text-[#003580]',
    quote: "Partnering with Thyleads for market outreach delivered strong results strategic lead generation expanded Epiplex.ai’s client base and clearly communicated its value across the GCC.",
    personName: 'Vivek Patial',
    personTitle: 'Head of Marketing',
    personImage: '/pipelex.png',
    stats: { label: 'Qualified', value: '100%' }
  }
];

export default function CaseStudiesPage() {
  const featuredCaseStudy = testimonials[0];
  const carouselStories = testimonials.slice(1);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-purple-600/20">
      <Navbar />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      {/* 1. Page Heading */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
            Customer Success
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-300 tracking-tight leading-tight">
            How Thyleads turned a broken <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400">
              outbound engine into a pipeline multiplier.
            </span>
          </h1>
        </div>
      </div>

      {/* 2. Hero Card (Featured Client) */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 mb-20">
        <Link
          href={`/casestudies/${featuredCaseStudy.id}`}
          className="block relative w-full rounded-3xl overflow-hidden shadow-2xl bg-[#0c0c12] grid grid-cols-1 lg:grid-cols-2 min-h-[420px] group transition-all duration-500 hover:shadow-purple-900/30 border border-white/10"
        >
          {/* Image Side */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-auto order-1 lg:order-1 overflow-hidden">
            <img
              src={featuredCaseStudy.personImage}
              alt="Featured Customer"
              className="absolute inset-0 w-full h-full object-contain lg:object-cover object-center lg:object-top transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Bottom gradient for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Person info on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
              <div className="text-lg font-bold">{featuredCaseStudy.personName}</div>
              <div className="text-sm text-gray-300">{featuredCaseStudy.personTitle}</div>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-10 flex flex-col justify-between relative z-10 order-2 lg:order-2 bg-[#0c0c12]">
            <div>
              <div className="mb-6">
                <Image
                  src={featuredCaseStudy.logo}
                  alt={`${featuredCaseStudy.companyName} logo`}
                  width={96}
                  height={48}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                &quot;{featuredCaseStudy.quote}&quot;
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <span className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-purple-700 transition-colors flex items-center gap-2">
                Read full story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Infinite Carousel of Success Stories */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 mb-10">
          <h3 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            More Success Stories
            <span className="text-neutral-500 font-normal text-xl">
              ({testimonials.length}+)
            </span>
          </h3>
        </div>

        <div className="relative w-full">
          {/* Gradient Masks for fade effect */}
          <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex animate-scroll-cards w-max gap-8 px-8 hover:[animation-play-state:paused]">
            {/* Triple the array for seamless loop */}
            {[...carouselStories, ...carouselStories, ...carouselStories].map(
              (story, idx) => {
                const isTazapay = story.id === "tazapay";
                const isNovaBenefits = story.id === "novabenefit";
                const isEpiplex = story.id === "epiplex";
                const isNonClickable = isTazapay || isNovaBenefits || isEpiplex;
                const Card = (
                  <div
                    className={`w-[85vw] sm:w-[360px] lg:w-[400px] h-[420px] sm:h-[440px] lg:h-[460px] flex-shrink-0 group relative bg-white rounded-3xl overflow-hidden border-2 border-transparent transition-all duration-300 flex flex-col p-6 sm:p-8 shadow-lg ${
                      isNonClickable ? "cursor-default" : "hover:border-purple-300 cursor-pointer"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <Image
                        src={story.logo}
                        alt={`${story.companyName} logo`}
                        width={120}
                        height={40}
                        className="h-8 sm:h-10 w-auto object-contain"
                      />
                      {!isNonClickable && (
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-110">
                          <ArrowRight className="w-6 h-6 text-purple-600" />
                        </div>
                      )}
                    </div>
                    
                    <p className="text-slate-700 text-lg sm:text-xl font-medium mb-6 line-clamp-5 leading-relaxed flex-grow">
                      &quot;{story.quote}&quot;
                    </p>

                    <div className="mt-auto flex items-center gap-4 pt-6">
                      <img
                        src={story.personImage}
                        alt={story.personName}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <div>
                        <div className="text-slate-900 font-bold text-base sm:text-lg">{story.personName}</div>
                        <div className="text-slate-500 font-medium text-sm sm:text-base">{story.personTitle}</div>
                      </div>
                    </div>
                  </div>
                );

                return isNonClickable ? (
                  <div key={`${story.id}-${idx}`}>{Card}</div>
                ) : (
                  <Link key={`${story.id}-${idx}`} href={`/casestudies/${story.id}`}>
                    {Card}
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Case Study Cards Grid */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">Case Studies</p>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Explore the full library</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CleverTap Card */}
            <Link
              href="/casestudies/clevertap"
              className="group w-full max-w-[405px] mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/9] md:h-[221px] md:aspect-auto bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,200,200,0.3),transparent_50%)]" />
                <Image
                  src="/images/CleverTap.svg"
                  alt="CleverTap logo"
                  width={160}
                  height={48}
                  className="relative z-10 h-10 w-auto object-contain"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 bg-white flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
                <p className="text-slate-800 font-medium text-lg md:text-[21px] leading-relaxed">
                  How CleverTap 3X&apos;d their pipeline with precision outbound through Thyleads
                </p>
                <span className="text-slate-500 text-md font-normal group-hover:text-slate-600 transition-colors flex items-center gap-1 mt-4">
                  Read the case study <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* Dice Card */}
            <Link
              href="/casestudies/dice"
              className="group w-full max-w-[405px] mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/9] md:h-[221px] md:aspect-auto bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.9),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,220,180,0.4),transparent_50%)]" />
                <Image
                  src="/images/dice.png"
                  alt="Dice logo"
                  width={160}
                  height={48}
                  className="relative z-10 h-10 w-auto object-contain"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 bg-white flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
                <p className="text-slate-800 font-medium text-lg md:text-[21px] leading-relaxed">
                  How Dice achieved 10:1 ROI through strategic GTM positioning
                </p>
                <span className="text-slate-500 text-md font-normal group-hover:text-slate-600 transition-colors flex items-center gap-1 mt-4">
                  Read the case study <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* Pazo Card */}
            <Link
              href="/casestudies/pazo"
              className="group w-full max-w-[405px] mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/9] md:h-[221px] md:aspect-auto bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.9),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,235,200,0.5),transparent_50%)]" />
                <Image
                  src="/images/pazo.png"
                  alt="Pazo logo"
                  width={160}
                  height={48}
                  className="relative z-10 h-10 w-auto object-contain"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 bg-white flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
                <p className="text-slate-800 font-medium text-lg md:text-[21px] leading-relaxed">
                  How Pazo connected with right buyers using intent-led outreach
                </p>
                <span className="text-slate-500 text-md font-normal group-hover:text-slate-600 transition-colors flex items-center gap-1 mt-4">
                  Read the case study <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* VWO Card */}
            <Link
              href="/casestudies/vwo"
              className="group w-full max-w-[405px] mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/9] md:h-[221px] md:aspect-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(200,200,255,0.4),transparent_50%)]" />
                <Image
                  src="/images/VWO.svg"
                  alt="VWO logo"
                  width={160}
                  height={48}
                  className="relative z-10 h-10 w-auto object-contain"
                />
              </div>
              <div className="flex-1 p-5 md:p-6 bg-white flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
                <p className="text-slate-800 font-normal text-lg md:text-[21px] leading-relaxed">
                  How VWO cracked the code with AI-driven personalization
                </p>
                <span className="text-slate-500 text-md font-normal group-hover:text-slate-600 transition-colors flex items-center gap-1 mt-4">
                  Read the case study <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* Placeholder Card 1 */}
            <div className="w-full max-w-[405px] mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col">
              <div className="aspect-[16/9] md:h-[221px] md:aspect-auto bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.9),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(200,255,220,0.4),transparent_50%)]" />
                <span className="relative z-10 text-xl font-bold text-slate-400">Coming Soon</span>
              </div>
              <div className="flex-1 p-5 md:p-6 bg-white flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
                <p className="text-slate-400 font-normal text-lg md:text-[21px] leading-relaxed">
                  More success stories on the way
                </p>
                <span className="text-slate-400 text-md font-normal mt-4">
                  Stay tuned
                </span>
              </div>
            </div>

            {/* Placeholder Card 2 */}
            <div className="w-full max-w-[405px] mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col">
              <div className="aspect-[16/9] md:h-[221px] md:aspect-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.9),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(200,210,255,0.4),transparent_50%)]" />
                <span className="relative z-10 text-xl font-bold text-slate-400">Coming Soon</span>
              </div>
              <div className="flex-1 p-5 md:p-6 bg-white flex flex-col justify-between min-h-[160px] md:min-h-[190px]">
                <p className="text-slate-400 font-normal text-lg md:text-[21px] leading-relaxed">
                  More success stories on the way
                </p>
                <span className="text-slate-400 text-md font-normal mt-4">
                  Stay tuned
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustedBy />
      <CTASection theme="dark" />

      {/* Footer */}
      <Footer />

      {/* Custom CSS for the smooth card scrolling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll-cards {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-cards {
            animation: scroll-cards 80s linear infinite;
          }
      `,
        }}
      />
    </div>
  );
}
