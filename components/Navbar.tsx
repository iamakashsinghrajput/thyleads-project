"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setScrolled(currentScrollY > 20);

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'HOW IT WORKS?', href: '/howitworks' },
    { name: 'CASE STUDIES', href: '/casestudies' },
    { name: 'BLOGS', href: '/blog' },
  ];

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6 transition-all duration-500 ease-in-out ${visible ? 'top-6 opacity-100' : '-top-24 opacity-0'}`}>
      <div className={`flex items-center justify-between border border-white/10 rounded-2xl backdrop-blur-md bg-black/20 py-3 px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'bg-black/60' : 'bg-black/20'}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-7 h-7 rounded-lg overflow-hidden">
              <Image
                src="/thylead.svg"
                alt="Thyleads Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-[20px] font-polysans font-bold tracking-wide text-white">Thyleads</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold text-gray-400 hover:text-white transition-colors tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button: Pill-shaped with Aceternity Border Beam Effect */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="flex items-center space-x-2 px-6 py-2.5 bg-black border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Let&apos;s Talk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="px-6 pt-4 pb-10 space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-black border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
