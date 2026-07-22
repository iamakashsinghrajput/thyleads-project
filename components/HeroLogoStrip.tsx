"use client";

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Client logos, inside the hero.
 *
 * Sizing is per logo because these marks are very different shapes, and a
 * single shared height makes them look wildly different sizes. Two separate
 * problems had to be handled:
 *
 * 1. Aspect ratio. Nurix is 4.6:1 and CometChat is 3.5:1, so at one fixed
 *    height Nurix renders far wider. Heights are set individually so each mark
 *    lands on a similar optical width.
 *
 * 2. Padding. Several vendor exports ship the logo adrift on a 1536x1024
 *    canvas — Creatium's mark was 15% of its file height. Those now use
 *    padding-stripped `*-trim.png` copies, so `h` means what it says and the
 *    untouched originals stay on disk. The `crop` escape hatch below renders a
 *    still-padded file oversized inside a fixed `overflow-hidden` window
 *    instead; `max-w-none` stops the image being squeezed back to fit.
 *
 * 3. Internal contrast. Every logo is flattened by `brightness-0 invert`, which
 *    maps ALL opaque pixels to white and keeps only alpha. CometChat's C was a
 *    white shape on an opaque dark box, so both collapsed to white and the C
 *    vanished. `cometchat-mono.png` re-cuts the C as true transparency so it
 *    reads as a hole. Any future logo whose detail comes from colour rather
 *    than alpha needs the same treatment.
 *
 * Every file is local. The shared TrustedBy strip also references one logo on
 * an external host, which next/image cannot load while `images.remotePatterns`
 * is unset in next.config.ts.
 */

type Logo = {
  name: string;
  src: string;
  /** Rendered height. For cropped marks this is the oversized height. */
  h: string;
  /** Fixed window, used only for the padded rasters. */
  crop?: string;
};

const LOGOS: Logo[] = [
  { name: 'CleverTap', src: '/images/CleverTap.svg', h: 'h-[30px]' },
  { name: 'Tazapay', src: '/images/Tazapay.svg', h: 'h-[22px]' },
  { name: 'VWO', src: '/images/VWO.svg', h: 'h-[26px]' },
  { name: 'Increff', src: '/images/Increff.svg', h: 'h-[30px]' },
  { name: 'Airmeet', src: '/images/Airmeet.svg', h: 'h-[26px]' },
  { name: 'Nurix', src: '/images/Nurix.svg', h: 'h-[22px]' },
  { name: 'MYND', src: '/images/mynd.svg', h: 'h-[24px]' },
  { name: 'Epiplex', src: '/images/epiplex.svg', h: 'h-[22px]' },
  { name: 'Pazo', src: '/images/pazo.png', h: 'h-[26px]' },
  { name: 'Dice', src: '/images/dice.png', h: 'h-[28px]' },
  { name: 'InfeedO', src: '/images/Infeedo.webp', h: 'h-[22px]' },
  { name: 'Creatium', src: '/images/creatium-trim.png', h: 'h-[13px]' },
  // Deliberately larger than the block above: these carry an icon as well as a
  // wordmark, and matching on width alone left the icon looking undersized.
  { name: 'Venwiz', src: '/images/venwiz.svg', h: 'h-[28px]' },
  { name: 'TeamLease', src: '/images/teamlease-trim.png', h: 'h-[28px]' },
  { name: 'CometChat', src: '/images/cometchat-mono.png', h: 'h-[30px]' },
  // Still-padded originals, kept for reference — these need the `crop` window.
  // { name: 'Actyv', src: '/images/actyv.png', h: 'h-[74px]', crop: 'h-[38px] w-[112px]' },
  // { name: 'Zigital', src: '/images/zigital.png', h: 'h-[78px]', crop: 'h-[38px] w-[92px]' },
];

export default function HeroLogoStrip() {
  const reduce = useReducedMotion();
  // Duplicated so the marquee wraps without a visible seam.
  const run = [...LOGOS, ...LOGOS];

  return (
    // A rule and real spacing above, so this never reads as part of the tab row.
    <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-7 pt-6 sm:px-12">
      <div className="border-t border-white/10 pt-6">
        <div className="relative overflow-hidden">
          {/* Edges fade out rather than cutting a mark in half. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#07060d] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#07060d] to-transparent" />

          <motion.div
            className="flex w-max items-center"
            animate={reduce ? undefined : { x: ['0%', '-50%'] }}
            transition={
              reduce
                ? undefined
                : { x: { repeat: Infinity, repeatType: 'loop', duration: 44, ease: 'linear' } }
            }
          >
            {run.map((l, i) => (
              <div
                key={`${l.name}-${i}`}
                className="mx-7 flex h-[38px] shrink-0 items-center justify-center lg:mx-9"
              >
                {l.crop ? (
                  <span className={`flex ${l.crop} items-center justify-center overflow-hidden`}>
                    <Image
                      src={l.src}
                      alt={`${l.name} logo`}
                      width={300}
                      height={200}
                      className={`${l.h} w-auto max-w-none object-contain opacity-70 brightness-0 invert`}
                    />
                  </span>
                ) : (
                  <Image
                    src={l.src}
                    alt={`${l.name} logo`}
                    width={240}
                    height={80}
                    className={`${l.h} w-auto object-contain opacity-70 brightness-0 invert`}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
