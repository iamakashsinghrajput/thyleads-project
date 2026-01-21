'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    Pages: [
      { name: 'Home', href: '/' },
      { name: 'How It Works', href: '/howitworks' },
      { name: 'Case Studies', href: '/casestudies' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    'Case Studies': [
      { name: 'CleverTap', href: '/casestudies/clevertap' },
      { name: 'Dice', href: '/casestudies/dice' },
      { name: 'Pazo', href: '/casestudies/pazo' },
      { name: 'VWO', href: '/casestudies/vwo' },
      { name: 'View All', href: '/casestudies' },
    ],
    Services: [
      { name: 'Outbound Strategy', href: '/howitworks' },
      { name: 'Lead Generation', href: '/howitworks' },
      { name: 'Meeting Booking', href: '/howitworks' },
      { name: 'Pipeline Management', href: '/howitworks' },
      { name: 'GTM Execution', href: '/howitworks' },
    ],
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black border border-white/10">
                  <Image
                    src="/thylead.svg"
                    alt="Thyleads Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-normal text-white">Thyleads</span>
            </div>
            <p className="text-neutral-400 mb-5 max-w-xs text-sm">
              AI-powered outbound systems for SaaS companies. Get responses, book meetings, and win logos.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://twitter.com" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors group">
                <Twitter className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors group">
                <Linkedin className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </a>
              <a href="mailto:sales@thyleads.com" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors group">
                <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Legal Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="mailto:sales@thyleads.com" className="hover:text-white transition-colors">
                  sales@thyleads.com
                </Link>
              </li>
              <li>
                <Link href="tel:+918769673818" className="hover:text-white transition-colors">
                  +91 87696 73818
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Book a Call
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 py-8 border-y border-white/5">
          {[
            { label: "Intent-Driven Prospecting", desc: "Signal-Based Targeting" },
            { label: "Multi-Channel Outreach", desc: "Email + LinkedIn" },
            { label: "Calendar-Ready Meetings", desc: "Qualified Appointments" },
            { label: "Full-Funnel Support", desc: "From ICP to Close" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
              <div>
                <p className="text-sm text-white/80 font-medium">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Thyleads. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-neutral-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="pt-4 text-center text-xs text-neutral-600">
          Designed and developed by Skymiq.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
