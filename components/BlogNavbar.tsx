"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const BlogNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOW IT WORKS?', href: '/howitworks', hasDropdown: false },
    { name: 'CASE STUDIES', href: '/casestudies', hasDropdown: false },
    { name: 'BLOGS', href: '/blog', hasDropdown: false },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95'} backdrop-blur-md border-b border-gray-200`}>
      <div className="w-full px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">

          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image
                  src="/thylead.svg"
                  alt="Thyleads Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Thyleads</span>
          </Link>

          {/* Nav Links - Center */}
          <div className="hidden md:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.hasDropdown ? (
                  <div
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center text-[11px] font-bold text-gray-600 hover:text-gray-900 transition-colors tracking-[0.2em]"
                    >
                      {link.name}
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="group flex items-center text-[11px] font-bold text-gray-600 hover:text-gray-900 transition-colors tracking-[0.2em]"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Action Button - Right */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="flex items-center space-x-2 px-6 py-2.5 bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 group cursor-pointer"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-white">Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-b border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 pt-4 pb-10 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div className="space-y-3">
                      <Link
                        href={link.href}
                        className="block text-sm font-bold text-gray-600 uppercase tracking-widest hover:text-gray-900 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-sm font-bold text-gray-600 uppercase tracking-widest hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="flex items-center space-x-2 px-6 py-2.5 bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 group w-full justify-center"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
      </div>
    </nav>
  );
};

export default BlogNavbar;
