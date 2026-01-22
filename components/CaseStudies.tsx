'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- Types & Interfaces ---
interface Testimonial {
  id: string;
  companyName: string;
  logo: string;
  brandColor: string;
  quote: string;
  personName: string;
  personTitle: string;
  personImage: string;
}

// --- Configuration ---
const SLIDE_DURATION = 6000; // 6 seconds per slide
const TRANSITION_DURATION = 700; // ms

// --- Data ---
const testimonials: Testimonial[] = [
  {
    id: 'clevertap',
    companyName: 'CleverTap',
    logo: '/images/CleverTap.svg',
    brandColor: 'text-[#003580]',
    quote: "I've been burned by agencies in the past and Thyleads has exceeded my expectations because of their commitments to our success",
    personName: 'Roopesh Balakrishna',
    personTitle: 'Regional VP',
    personImage: '/clevertap.png'
  },
  {
    id:'tazapay',
    companyName: 'Tazapay',
    logo: '/images/Tazapay.svg',
    brandColor: 'text-[#003580]',
    quote: "Thyleads qualify, set context, and make sure our sales team walks into calls knowing why the prospect is there and what problem they’re trying to solve.",
    personName: 'Umar Salman',
    personTitle: 'Head of Marketing',
    personImage: '/tazapay.png'
  },
  {
    id: 'dice',
    companyName: 'dice',
    logo: '/images/dice.png',
    brandColor: 'text-[#146EF5]',
    quote: "Thyleads gets highly sales qualified leads within the provided target regions from the very first month of our partnership",
    personName: 'Ishan Acharya',
    personTitle: 'VP of Business Operations',
    personImage: '/dice.png'
  },
  {
    id: 'vwo',
    companyName: 'VWO',
    logo: '/images/VWO.svg',
    brandColor: 'text-[#146EF5]',
    quote: "They adapt quickly to feedback, efficiently reach decision makers and maintain a low no-show rate-rate qualities in outbound",
    personName: 'Harsh Sharma',
    personTitle: 'Senior Manager-APAC',
    personImage: '/vwo.png'
  }
];

export default function TestimonialSection() {
  // Start from the middle set for infinite scroll capability
  const [activeIndex, setActiveIndex] = useState(testimonials.length);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isWrapping, setIsWrapping] = useState(false); // Hide progress during wrap-around
  const [cardWidth, setCardWidth] = useState(800);

  // Refs for animation performance (avoids re-renders)
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const pausedProgressRef = useRef<number>(0);

  // Duplicate testimonials for infinite scroll effect (Prev Set | Current Set | Next Set)
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const resetAnimation = useCallback(() => {
    startTimeRef.current = null;
    pausedProgressRef.current = 0;
    if (progressBarRef.current) progressBarRef.current.style.width = '0%';
    if (progressDotRef.current) progressDotRef.current.style.left = '0%';
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1;
      // If we reach the end of the second set, quietly snap back to the start of the first set
      // after the transition completes to maintain the infinite loop illusion.
      if (next >= testimonials.length * 2) {
        // Hide progress indicator during wrap
        setIsWrapping(true);
        setTimeout(() => {
          setIsTransitioning(false);
          setActiveIndex(testimonials.length);
          // Re-enable transition after snap
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsTransitioning(true);
              setIsWrapping(false); // Show progress again
            });
          });
        }, TRANSITION_DURATION);
      }
      return next;
    });
    resetAnimation();
  }, [resetAnimation]);

  const handleTabClick = (index: number) => {
    // Calculate the target index in the middle set
    const targetIndex = testimonials.length + index;
    setIsTransitioning(true);
    setActiveIndex(targetIndex);
    resetAnimation();
  };

  const animate = useCallback(function animateFrame(time: number) {
    if (isPaused) {
      requestRef.current = requestAnimationFrame(animateFrame);
      return;
    }

    if (!startTimeRef.current) startTimeRef.current = time - pausedProgressRef.current;

    const elapsed = time - startTimeRef.current;
    const progress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

    // Direct DOM manipulation for 60fps smoothness without React re-renders
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }
    if (progressDotRef.current) {
      progressDotRef.current.style.left = `${progress}%`;
    }

    if (elapsed < SLIDE_DURATION) {
      requestRef.current = requestAnimationFrame(animateFrame);
    } else {
      pausedProgressRef.current = 0;
      nextSlide();
      // Continue animation loop for next slide
      startTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animateFrame);
    }
  }, [isPaused, nextSlide]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  // Handle Pause logic to save progress
  useEffect(() => {
    if (isPaused) {
      // Capture current progress when paused so we can resume from same spot
      const currentWidth = progressBarRef.current ? parseFloat(progressBarRef.current.style.width) || 0 : 0;
      pausedProgressRef.current = (currentWidth / 100) * SLIDE_DURATION;
    } else {
      // Reset start time relative to saved progress
      startTimeRef.current = null;
    }
  }, [isPaused]);

  // Dimensions
  const gap = 32; // Gap in pixels
  const translateX = activeIndex * (cardWidth + gap);
  const actualTabIndex = activeIndex % testimonials.length;

  useEffect(() => {
    const updateCardWidth = () => {
      const nextWidth = Math.min(800, Math.round(window.innerWidth * 0.85));
      setCardWidth(nextWidth);
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  return (
    <section className="bg-black min-h-screen w-full flex flex-col justify-center py-32 overflow-hidden font-sans relative">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 mb-16 relative z-10">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

          {/* Title Section */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-white to-neutral-700 leading-[1.1]">
              See what our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-300 relative inline-block">
                customers say
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-purple-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="lg:col-span-8 flex justify-start lg:justify-end items-end w-full">
            <div className="grid grid-cols-3 gap-4 w-full md:flex md:gap-8 md:w-auto md:overflow-x-auto md:pb-4 lg:pb-0 scrollbar-hide">
              {testimonials.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => handleTabClick(index)}
                  className="group relative pt-8 pb-2 min-w-0 md:min-w-[130px] flex flex-col items-center outline-none transition-opacity duration-300"
                >
                  {/* Inactive Line (Background) */}
                  <div className="absolute top-6 left-0 w-full h-[2px] bg-neutral-400 rounded-full transition-all duration-300 group-hover:bg-neutral-200" />

                  {/* Active Progress Line - hidden during wrap-around */}
                  {actualTabIndex === index && !isWrapping && (
                    <>
                      <div
                        ref={progressBarRef}
                        className="absolute top-6 left-0 h-[3px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        style={{ width: '0%' }}
                      />
                      {/* Glowing Dot */}
                      <div
                        ref={progressDotRef}
                        className="absolute top-[25px] w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_16px_rgba(168,85,247,1)] z-20 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: '0%' }}
                      >
                        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </>
                  )}

                  {/* Company Logo */}
                  <div className={`
                    flex items-center justify-center mt-3 transition-all duration-500
                    ${actualTabIndex === index
                      ? 'text-white opacity-100 transform translate-y-0 scale-105'
                      : 'text-neutral-400 opacity-60 group-hover:opacity-90 transform translate-y-1'
                    }
                  `}>
                     {/* Company Logo Icon */}
                     <Image
                       src={t.logo}
                       alt={`${t.companyName} logo`}
                       width={72}
                       height={72}
                       className="w-14 h-14 md:w-20 md:h-20 object-contain transition-all duration-300 brightness-0 invert drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]"
                     />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="w-full relative z-10"
           onMouseEnter={() => setIsPaused(true)}
           onMouseLeave={() => setIsPaused(false)}>
        
        {/* Alignment spacer to match container padding */}
        <div 
          className="flex gap-8 transition-transform will-change-transform"
          style={{
            transform: `translateX(calc(-${translateX}px + max(0px, calc(50vw - 700px + 24px))))`,
            transition: isTransitioning ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1)` : 'none'
          }}
        >
          {infiniteTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className={`
                shrink-0 relative group cursor-default transition-all duration-500
                ${idx === activeIndex ? 'opacity-100 scale-100 saturate-100' : 'opacity-40 scale-[0.98] saturate-50 hover:opacity-60'}
              `}
              style={{ width: `${cardWidth}px`, maxWidth: '85vw' }}
              onClick={() => {
                if (idx !== activeIndex) {
                   const offset = idx - activeIndex;
                   handleTabClick((actualTabIndex + offset + testimonials.length) % testimonials.length);
                }
              }}
            >
              <div className="rounded-4xl overflow-hidden shadow-2xl h-full md:h-[420px] relative bg-[#E9ECFF]">

                {/* Image on left - no container, blends with background */}
                <div className="absolute left-0 top-0 bottom-0 w-[40%] hidden md:block">
                  <img
                    src={testimonial.personImage}
                    alt={testimonial.personName}
                    className="h-full w-full object-cover object-center"
                  />
                  {/* Black to transparent gradient at bottom for person info */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Person info - flush to bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <h3 className="text-lg font-semibold leading-tight">{testimonial.personName}</h3>
                    <p className="text-sm text-gray-200 font-medium">{testimonial.personTitle}</p>
                  </div>
                </div>

                {/* Mobile image */}
                <div className="relative aspect-[3/2] md:hidden overflow-hidden">
                  <img
                    src={testimonial.personImage}
                    alt={testimonial.personName}
                    className="h-full w-full object-cover object-top"
                  />
                  {/* Black to transparent gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  {/* Person info - flush to bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <h3 className="text-lg font-semibold leading-tight">{testimonial.personName}</h3>
                    <p className="text-sm text-gray-200 font-medium">{testimonial.personTitle}</p>
                  </div>
                </div>

                {/* Content Section - positioned on right */}
                <div className="md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[60%] p-8 md:p-10 lg:p-12 flex flex-col justify-between relative">

                  {/* Decorative Quote Icon */}
                  <Quote className="absolute top-10 right-10 w-12 h-12 text-gray-100 opacity-50 rotate-180" />

                  <div>
                    {/* Brand Header with Logo Icon */}
                    <div className="mb-6">
                      <Image
                        src={testimonial.logo}
                        alt={`${testimonial.companyName} logo`}
                        width={220}
                        height={70}
                        className="h-12 md:h-14 w-auto object-contain"
                      />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl leading-relaxed text-slate-800 font-medium tracking-tight">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                  </div>

                  {/* Action - Hide for tazapay (no dedicated page) */}
                  {testimonial.id !== 'tazapay' && (
                    <div className="mt-8 pt-2 flex items-center justify-between">
                      <Link
                        href={`/casestudies/${testimonial.id}`}
                        className="group/btn inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                      >
                        Customer story
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
