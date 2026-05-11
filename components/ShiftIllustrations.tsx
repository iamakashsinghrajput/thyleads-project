"use client"
import React from 'react';

const baseProps = {
  viewBox: '0 0 320 240',
  xmlns: 'http://www.w3.org/2000/svg',
  className: 'w-full h-full',
};

export function PrecisionIllustration() {
  return (
    <svg {...baseProps}>
      <defs>
        <radialGradient id="bg-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9e1fe" />
          <stop offset="100%" stopColor="#e9e1fe" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arrow-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7040e8" />
          <stop offset="100%" stopColor="#5e30d0" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="120" rx="140" ry="100" fill="url(#bg-1)" />

      <g opacity="0.55">
        <line x1="40" y1="180" x2="100" y2="100" stroke="#fda4af" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
        <line x1="60" y1="60" x2="130" y2="80" stroke="#fda4af" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
        <circle cx="40" cy="180" r="3" fill="#fb7185" />
        <circle cx="60" cy="60" r="3" fill="#fb7185" />
      </g>

      <circle cx="200" cy="120" r="68" fill="none" stroke="#d4c5fd" strokeWidth="2" />
      <circle cx="200" cy="120" r="48" fill="none" stroke="#b89afb" strokeWidth="2" />
      <circle cx="200" cy="120" r="28" fill="#e9e1fe" />
      <circle cx="200" cy="120" r="12" fill="#7040e8" />

      <line x1="60" y1="220" x2="200" y2="120" stroke="url(#arrow-1)" strokeWidth="4" strokeLinecap="round" />
      <polygon points="200,120 188,114 192,128" fill="#5e30d0" />

      <circle cx="280" cy="60" r="5" fill="#9d75f8" />
      <circle cx="280" cy="60" r="2" fill="#fff" />
      <circle cx="270" cy="195" r="3" fill="#b89afb" />
    </svg>
  );
}

export function SignalIllustration() {
  return (
    <svg {...baseProps}>
      <defs>
        <radialGradient id="bg-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9e1fe" />
          <stop offset="100%" stopColor="#e9e1fe" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="120" rx="140" ry="100" fill="url(#bg-2)" />

      <g opacity="0.6">
        <path d="M 30 90 Q 45 70, 60 90 T 90 90" fill="none" stroke="#fda4af" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 30 130 Q 45 150, 60 130 T 90 130" fill="none" stroke="#fda4af" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 30 110 Q 50 95, 70 110 T 100 110" fill="none" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="60" r="3" fill="#fda4af" />
        <circle cx="60" cy="170" r="3" fill="#fda4af" />
      </g>

      <line x1="115" y1="120" x2="155" y2="120" stroke="#7040e8" strokeWidth="3" strokeLinecap="round" />
      <polygon points="155,120 145,114 145,126" fill="#7040e8" />

      <g>
        <rect x="170" y="70" width="120" height="80" rx="20" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
        <path d="M 200 150 L 210 168 L 220 150 Z" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
        <path d="M 200 150 L 210 168 L 220 150 Z" fill="#fff" />

        <line x1="190" y1="95" x2="270" y2="95" stroke="#d4c5fd" strokeWidth="3" strokeLinecap="round" />
        <line x1="190" y1="115" x2="250" y2="115" stroke="#d4c5fd" strokeWidth="3" strokeLinecap="round" />
        <line x1="190" y1="135" x2="240" y2="135" stroke="#d4c5fd" strokeWidth="3" strokeLinecap="round" />

        <circle cx="282" cy="70" r="14" fill="#10b981" stroke="#fff" strokeWidth="3" />
        <path d="M 276 70 L 281 75 L 288 65" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function PartnershipIllustration() {
  return (
    <svg {...baseProps}>
      <defs>
        <radialGradient id="bg-3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9e1fe" />
          <stop offset="100%" stopColor="#e9e1fe" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="120" rx="140" ry="100" fill="url(#bg-3)" />

      <circle cx="115" cy="120" r="58" fill="#7040e8" fillOpacity="0.18" stroke="#7040e8" strokeWidth="2.5" />
      <circle cx="205" cy="120" r="58" fill="#5e30d0" fillOpacity="0.22" stroke="#5e30d0" strokeWidth="2.5" />

      <g>
        <circle cx="95" cy="105" r="14" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
        <circle cx="95" cy="100" r="5" fill="#7040e8" />
        <path d="M 84 117 Q 95 108, 106 117" fill="none" stroke="#7040e8" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g>
        <circle cx="225" cy="105" r="14" fill="#fff" stroke="#5e30d0" strokeWidth="2.5" />
        <circle cx="225" cy="100" r="5" fill="#5e30d0" />
        <path d="M 214 117 Q 225 108, 236 117" fill="none" stroke="#5e30d0" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <g>
        <circle cx="160" cy="155" r="22" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
        <circle cx="160" cy="155" r="14" fill="#7040e8" />
        <path d="M 152 155 L 158 161 L 168 149" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <circle cx="50" cy="50" r="3" fill="#b89afb" />
      <circle cx="280" cy="60" r="4" fill="#9d75f8" />
      <circle cx="280" cy="195" r="3" fill="#b89afb" />
    </svg>
  );
}

export function PipelineIllustration() {
  return (
    <svg {...baseProps}>
      <defs>
        <radialGradient id="bg-4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9e1fe" />
          <stop offset="100%" stopColor="#e9e1fe" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="120" rx="140" ry="100" fill="url(#bg-4)" />

      <path
        d="M 80 60 L 240 60 L 200 130 L 200 190 L 200 200 Q 200 210, 190 210 L 130 210 Q 120 210, 120 200 L 120 130 Z"
        fill="#fff"
        stroke="#7040e8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M 80 60 L 240 60 L 200 130 L 120 130 Z"
        fill="#e9e1fe"
        stroke="#7040e8"
        strokeWidth="2.5"
      />

      <circle cx="100" cy="40" r="5" fill="#b89afb" />
      <circle cx="125" cy="35" r="6" fill="#9d75f8" />
      <circle cx="155" cy="42" r="5" fill="#b89afb" />
      <circle cx="185" cy="35" r="6" fill="#9d75f8" />
      <circle cx="215" cy="40" r="5" fill="#b89afb" />
      <circle cx="245" cy="35" r="4" fill="#d4c5fd" />

      <circle cx="145" cy="160" r="6" fill="#7040e8" />
      <circle cx="170" cy="175" r="6" fill="#7040e8" />
      <circle cx="155" cy="190" r="6" fill="#7040e8" />
      <circle cx="180" cy="155" r="5" fill="#7040e8" />

      <g transform="translate(155, 220)">
        <circle r="14" fill="#10b981" stroke="#fff" strokeWidth="3" />
        <path d="M -6 0 L -1 5 L 7 -4" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <path d="M 100 50 Q 115 55, 130 60" fill="none" stroke="#b89afb" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" />
      <path d="M 245 50 Q 230 55, 215 60" fill="none" stroke="#b89afb" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" />
    </svg>
  );
}

export function GrowthIllustration() {
  return (
    <svg {...baseProps}>
      <defs>
        <radialGradient id="bg-5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9e1fe" />
          <stop offset="100%" stopColor="#e9e1fe" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="growth-line" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9d75f8" />
          <stop offset="100%" stopColor="#5e30d0" />
        </linearGradient>
        <linearGradient id="growth-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7040e8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7040e8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="120" rx="140" ry="100" fill="url(#bg-5)" />

      <g opacity="0.3">
        <line x1="40" y1="80" x2="280" y2="80" stroke="#d4c5fd" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="40" y1="130" x2="280" y2="130" stroke="#d4c5fd" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="40" y1="180" x2="280" y2="180" stroke="#d4c5fd" strokeWidth="1" strokeDasharray="3 4" />
      </g>

      <path
        d="M 40 200 L 80 175 L 120 165 L 160 130 L 200 110 L 240 75 L 280 50 L 280 220 L 40 220 Z"
        fill="url(#growth-fill)"
      />

      <path
        d="M 40 200 L 80 175 L 120 165 L 160 130 L 200 110 L 240 75 L 280 50"
        fill="none"
        stroke="url(#growth-line)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="80" cy="175" r="5" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
      <circle cx="120" cy="165" r="5" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
      <circle cx="160" cy="130" r="5" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
      <circle cx="200" cy="110" r="5" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />
      <circle cx="240" cy="75" r="5" fill="#fff" stroke="#7040e8" strokeWidth="2.5" />

      <circle cx="280" cy="50" r="10" fill="#7040e8" stroke="#fff" strokeWidth="3" />
      <circle cx="280" cy="50" r="16" fill="none" stroke="#7040e8" strokeOpacity="0.4" strokeWidth="2" />

      <g transform="translate(265, 25)">
        <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill="#9d75f8" />
      </g>
    </svg>
  );
}

export const illustrations = [
  PrecisionIllustration,
  SignalIllustration,
  PartnershipIllustration,
  PipelineIllustration,
  GrowthIllustration,
];
