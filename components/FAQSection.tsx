'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, MessageCircle, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  bullets?: string[];
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs: FAQ[] = [
    {
      question: "What kind of SaaS companies do you work with?",
      answer: "We work with B2B SaaS companies of all stages from seed to Series D+ across verticals like HRTech, FinTech, MarTech, and RetailTech. If you sell to mid-market or enterprise and your product has a considered sales process, we’re likely a great fit."
    },
    {
      question: "Can you customize outreach messaging based on our product’s use cases or integrations?",
      answer: "Absolutely. Each client has a dedicated GTM pod that understands your market, use case, and product nuances. We also A/B test hooks, offers, and personalization frameworks for each segment."
    },
    {
      question: "Will prospects know Thyleads is running outreach on our behalf?",
      answer: "Outreach is sent using brand-aligned sender identities and domains that closely resemble your company, so communication feels native to your organization. Messaging is written in your voice and aligned to your positioning, so prospects experience it as a natural extension of your internal GTM motion."
    },
    {
      question: "What level of visibility will we have into the process?",
      answer: "Full visibility. You get:",
      bullets: [
        "Shared access to your prospect pipeline (via Airtable or CRM)",
        "Weekly campaign performance dashboards",
        "Live campaign boards (sequence views, response tags, QA feedback)",
        "A dedicated Slack channel + weekly syncs with your GTM Engineer"
      ]
    },
    {
      question: "Do you need training or onboarding from our team?",
      answer: "Not in the traditional sense. We do a deep discovery call and study your:",
      bullets: [
        "Sales deck, demo video, case studies, and past deals",
        "Last 5-10 closed accounts to understand personas & triggers",
        "We reverse-engineer your GTM motion. If needed, we'll request brief 1:1s with sales or founders to align on messaging tone & product nuance"
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <HelpCircle size={14} />
                Support
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Everything you need to know about the product and billing. Can&apos;t find the answer you&apos;re looking for?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 focus:ring-offset-slate-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Talk to our team
              </Link>
            </div>
          </div>

          {/* Accordion Section */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className={`group transition-all duration-200 bg-white border border-slate-200 rounded-2xl ${
                    openIndex === index ? 'shadow-md ring-1 ring-slate-200' : 'hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex items-center justify-between w-full px-6 py-5 text-left focus:outline-none"
                  >
                    <span className={`text-lg font-semibold transition-colors duration-200 ${
                      openIndex === index ? 'text-blue-600' : 'text-slate-900 group-hover:text-slate-700'
                    }`}>
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-200 ${
                       openIndex === index ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}>
                      {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.bullets ? (
                        <>
                          <p className="mb-3">{faq.answer}</p>
                          <ul className="space-y-2">
                            {faq.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">→</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
