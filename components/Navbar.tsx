"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type DropdownKey = 'solutions' | 'resources' | null;

const TOP_LINKS = [
  { name: 'WHY THYLEADS', href: '/why-thyleads' },
  { name: 'HOW WE WORK', href: '/howitworks' },
];

const SOLUTIONS = {
  byStage: [
    { name: 'For startups (Seed–Series A)', href: '/series-a' },
    { name: 'For scaling teams (Series B+)', href: '/series-b' },
  ],
  byService: [
    { name: 'Outbound Strategy', href: '/why-thyleads' },
    { name: 'Lead Generation', href: '/howitworks' },
    { name: 'Meeting Booking', href: '/howitworks#human-layer' },
    { name: 'Pipeline Management', href: '/howitworks#deal-assist' },
    { name: 'GTM Execution', href: '/gtm-framework' },
  ],
  byVertical: [
    { name: 'HRTech', href: '/hrtech' },
    { name: 'FinTech', href: '/fintech' },
    { name: 'MarTech', href: '/martech' },
  ],
};

const RESOURCES = [
  { name: 'Case Studies', href: '/casestudies' },
  { name: 'AI Tools Page', href: '/agents' },
  { name: '5-Step GTM Framework', href: '/gtm-framework' },
  { name: 'Blogs', href: '/blog' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openIt = (k: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(k);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 160);
  };

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-6 top-6">
      <div
        className={`relative flex items-center justify-between border border-neutral-200 rounded-2xl backdrop-blur-md py-3 px-5 lg:px-7 transition-all duration-300 ${
          scrolled ? 'bg-white/85 shadow-lg' : 'bg-white/70'
        }`}
      >

        <Link
          href="/"
          className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
        >
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
          <span className="text-[20px] font-polysans font-bold tracking-wide text-neutral-900">
            Thyleads
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 h-5">
          {TOP_LINKS.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="inline-flex items-center h-5 leading-none text-[11px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors tracking-[0.2em]"
            >
              {l.name}
            </Link>
          ))}

          <div
            className="relative inline-flex items-center h-5"
            onMouseEnter={() => openIt('solutions')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1 h-5 leading-none text-[11px] font-bold tracking-[0.2em] transition-colors ${
                openDropdown === 'solutions'
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              SOLUTIONS
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  openDropdown === 'solutions' ? 'rotate-180' : ''
                }`}
                strokeWidth={2.5}
              />
            </button>
          </div>

          <div
            className="relative inline-flex items-center h-5"
            onMouseEnter={() => openIt('resources')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1 h-5 leading-none text-[11px] font-bold tracking-[0.2em] transition-colors ${
                openDropdown === 'resources'
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              RESOURCES
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  openDropdown === 'resources' ? 'rotate-180' : ''
                }`}
                strokeWidth={2.5}
              />
            </button>

            <AnimatePresence>
              {openDropdown === 'resources' && (
                <motion.div
                  key="resources-panel"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-[calc(100%+14px)] w-[260px] rounded-2xl border border-neutral-200 bg-white shadow-[0_22px_60px_-22px_rgba(15,23,42,0.20)] overflow-hidden"
                >
                  <div className="p-3">
                    {RESOURCES.map((r) => (
                      <Link
                        key={r.name}
                        href={r.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {r.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center h-5 leading-none text-[11px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors tracking-[0.2em]"
          >
            ABOUT US
          </Link>
        </div>

        <div className="hidden lg:block shrink-0">
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center rounded-full p-[1.5px] overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,#845cf5_50%,#ffffff_60%,transparent_70%,transparent_100%)]" />
            <span className="relative flex items-center space-x-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full group-hover:bg-primary-500 transition-all duration-300">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
                Let&apos;s Talk
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-900 p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openDropdown === 'solutions' && (
          <motion.div
            key="solutions-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => openIt('solutions')}
            onMouseLeave={scheduleClose}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[680px] rounded-2xl border border-neutral-200 bg-white shadow-[0_22px_60px_-22px_rgba(15,23,42,0.20)] overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-6 p-7">
              <SolutionCol
                label="By Stage"
                items={SOLUTIONS.byStage}
                onClick={() => setOpenDropdown(null)}
              />
              <SolutionCol
                label="By Service"
                items={SOLUTIONS.byService}
                onClick={() => setOpenDropdown(null)}
              />
              <SolutionCol
                label="By Vertical"
                items={SOLUTIONS.byVertical}
                onClick={() => setOpenDropdown(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border border-neutral-200 rounded-2xl mt-2 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1">
              {TOP_LINKS.map((l) => (
                <MobileItem
                  key={l.name}
                  href={l.href}
                  label={l.name}
                  onClose={() => setMobileMenuOpen(false)}
                />
              ))}

              <MobileSection label="SOLUTIONS">
                <MobileSubGroup
                  label="By Stage"
                  items={SOLUTIONS.byStage}
                  onClose={() => setMobileMenuOpen(false)}
                />
                <MobileSubGroup
                  label="By Service"
                  items={SOLUTIONS.byService}
                  onClose={() => setMobileMenuOpen(false)}
                />
                <MobileSubGroup
                  label="By Vertical"
                  items={SOLUTIONS.byVertical}
                  onClose={() => setMobileMenuOpen(false)}
                />
              </MobileSection>

              <MobileSection label="RESOURCES">
                <div className="pl-3 space-y-0.5">
                  {RESOURCES.map((r) => (
                    <Link
                      key={r.name}
                      href={r.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-neutral-700 hover:text-primary-700 transition-colors"
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              </MobileSection>

              <MobileItem
                href="/about"
                label="ABOUT US"
                onClose={() => setMobileMenuOpen(false)}
              />

              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-neutral-900 text-white rounded-full hover:bg-primary-500 transition-all w-full group"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
                    Let&apos;s Talk
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function SolutionCol({
  label,
  items,
  onClick,
}: {
  label: string;
  items: { name: string; href: string }[];
  onClick: () => void;
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-600 mb-3.5">
        {label}
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClick}
            className="block text-sm text-neutral-700 hover:text-primary-700 font-semibold transition-colors leading-snug"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileItem({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="block py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-neutral-700 hover:text-neutral-900 transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-neutral-700 hover:text-neutral-900 transition-colors"
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-2 pt-1 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSubGroup({
  label,
  items,
  onClose,
}: {
  label: string;
  items: { name: string; href: string }[];
  onClose: () => void;
}) {
  return (
    <div className="pl-3">
      <div className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-primary-600 mb-1.5">
        {label}
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className="block py-1.5 text-[13px] text-neutral-700 hover:text-primary-700 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
