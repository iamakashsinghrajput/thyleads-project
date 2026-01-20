'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, MessageCircle, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the AI personalization actually work?",
      answer: "Our AI analyzes your prospect's public data (LinkedIn, company news, website) to construct a unique mental model. It then generates outreach messages that reference specific, relevant details—just like a human researcher would, but instantly and at scale."
    },
    {
      question: "Can I integrate Thyleads with my existing CRM?",
      answer: "Absolutely. We offer native 2-way sync with Salesforce, HubSpot, Pipedrive, and Zoho. You can also use our Zapier integration to connect with over 5,000+ other tools in your stack."
    },
    {
      question: "What happens after the 14-day free trial?",
      answer: "At the end of your trial, you can choose a plan that fits your volume needs. If you're not ready to commit, your account will switch to our Free Tier, which allows for 50 AI-generated credits per month forever."
    },
    {
      question: "Is my data and my prospect's data secure?",
      answer: "Security is our top priority. We are SOC2 Type II compliant and GDPR ready. We use enterprise-grade encryption for all data in transit and at rest, and we never sell your data to third parties."
    },
    {
      question: "Do you offer enterprise-level support?",
      answer: "Yes, our Enterprise plan includes a dedicated Customer Success Manager, priority 24/7 support, and custom onboarding sessions to ensure your team gets the most out of the platform."
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
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
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
