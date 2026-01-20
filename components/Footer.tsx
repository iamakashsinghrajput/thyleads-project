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
    ],
    'Get Started': [
      { name: 'Book a Call', href: '/contact' },
      { name: 'Explore How It Works', href: '/howitworks' },
      { name: 'Read the Blog', href: '/blog' },
      { name: 'See Case Studies', href: '/casestudies' },
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
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
              <span className="text-2xl font-bold tracking-tight text-white uppercase">Thyleads</span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-sm">
              AI-powered outbound systems for SaaS companies. Get responses, book meetings, and win logos with personalized outreach.
            </p>
            <div className="space-y-3 text-sm text-neutral-500 mb-6">
              <p>Always-on pipeline engineering.</p>
              <p>Multi-channel outreach + intent signals.</p>
              <p>Operational GTM execution for SaaS teams.</p>
            </div>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://twitter.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors group">
                <Twitter className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors group">
                <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </a>
              <a href="mailto:hello@thyleads.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-colors group">
                <Mail className="w-5 h-5 text-neutral-400 group-hover:text-white" />
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

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <span className="block text-neutral-500 text-xs uppercase tracking-wider">Email</span>
                <Link href="mailto:hello@thyleads.com" className="hover:text-white transition-colors">
                  hello@thyleads.com
                </Link>
              </li>
              <li>
                <span className="block text-neutral-500 text-xs uppercase tracking-wider">Phone</span>
                <Link href="tel:+1-555-012-2024" className="hover:text-white transition-colors">
                  +1 (555) 012-2024
                </Link>
              </li>
              <li>
                <span className="block text-neutral-500 text-xs uppercase tracking-wider">HQ</span>
                San Francisco, CA
              </li>
              <li>
                <span className="block text-neutral-500 text-xs uppercase tracking-wider">Hours</span>
                Mon–Fri, 9am–6pm PT
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Highlights
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>Signal-driven account prioritization</li>
              <li>Personalized outreach at scale</li>
              <li>Calendar-ready meetings</li>
              <li>Pipeline momentum workflows</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Thyleads. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="pt-4 text-center text-xs text-neutral-500">
          Designed and developed by Skymiq.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
