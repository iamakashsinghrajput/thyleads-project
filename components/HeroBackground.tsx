"use client"
import React, { useEffect, useRef } from 'react';

/**
 * Lead-generation network animation.
 * - Anchors = AI agents / your platform (4 corner-positioned nodes that pulse).
 * - Prospects = drifting particles (raw leads in the wild).
 * - Packets = outbound contacts firing from anchors → prospects.
 * - On arrival the prospect is "captured" (turns emerald briefly = qualified lead).
 * - Some captures trigger a conversion ring (deal won).
 * - Mouse acts as a 5th anchor — wherever you move, the platform follows.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  captureMs: number;
  pulseMs: number;
};

type Anchor = {
  x: number;
  y: number;
  emitTimer: number;
  pulsePhase: number;
};

type Packet = {
  fromX: number;
  fromY: number;
  targetIdx: number;
  t: number;
  speed: number;
};

const PROSPECT_COUNT = 85;
const CONNECT_DIST = 130;
const ANCHOR_REACH = 240;
const MOUSE_RADIUS = 200;
const MAX_SPEED = 0.65;
const MIN_SPEED = 0.02;
const CAPTURE_DURATION = 900;
const CONVERSION_DURATION = 1600;
const CONVERSION_PROB = 0.18;

// Anchors live in safe corners away from the centered headline.
const ANCHOR_POSITIONS: ReadonlyArray<readonly [number, number]> = [
  [0.10, 0.22],
  [0.90, 0.22],
  [0.10, 0.80],
  [0.90, 0.80],
];

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999, active: false, emitTimer: 0 };
    let particles: Particle[] = [];
    let anchors: Anchor[] = [];
    let packets: Packet[] = [];
    let rafId = 0;
    let width = 0;
    let height = 0;
    let lastTime = performance.now();

    const initParticles = () => {
      anchors = ANCHOR_POSITIONS.map(([fx, fy], i) => ({
        x: fx * width,
        y: fy * height,
        emitTimer: 400 + i * 280,
        pulsePhase: i * 0.6,
      }));
      particles = Array.from({ length: PROSPECT_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1 + Math.random() * 1.4,
        captureMs: 0,
        pulseMs: 0,
      }));
      packets = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const wasInit = width > 0;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (!wasInit) {
        initParticles();
      } else {
        for (let i = 0; i < anchors.length; i++) {
          anchors[i].x = ANCHOR_POSITIONS[i][0] * width;
          anchors[i].y = ANCHOR_POSITIONS[i][1] * height;
        }
        for (const p of particles) {
          if (p.x > width) p.x = width;
          if (p.y > height) p.y = height;
        }
      }
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        mouse.active = false;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleOut);

    const fireOutbound = (
      ax: number,
      ay: number,
      reachSq: number,
      speed: number
    ) => {
      const candidates: number[] = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.captureMs > 0) continue;
        const dx = p.x - ax;
        const dy = p.y - ay;
        if (dx * dx + dy * dy < reachSq) candidates.push(i);
      }
      if (candidates.length === 0) return;
      const targetIdx = candidates[Math.floor(Math.random() * candidates.length)];
      packets.push({ fromX: ax, fromY: ay, targetIdx, t: 0, speed });
    };

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // 1) Update particles
      for (const p of particles) {
        p.vx *= 0.992;
        p.vy *= 0.992;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed < MIN_SPEED) {
          const a = Math.random() * Math.PI * 2;
          p.vx += Math.cos(a) * 0.04;
          p.vy += Math.sin(a) * 0.04;
        } else if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        else if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        else if (p.y > height) { p.y = height; p.vy *= -1; }
        p.captureMs = Math.max(0, p.captureMs - dt);
        p.pulseMs = Math.max(0, p.pulseMs - dt);
      }

      // 2) Anchors emit periodic outbound packets
      const reachSq = ANCHOR_REACH * ANCHOR_REACH;
      for (const anchor of anchors) {
        anchor.emitTimer -= dt;
        if (anchor.emitTimer <= 0) {
          anchor.emitTimer = 1200 + Math.random() * 1500;
          fireOutbound(anchor.x, anchor.y, reachSq, 0.0017);
        }
      }

      // 3) Mouse fires faster + stronger
      if (mouse.active) {
        mouse.emitTimer -= dt;
        if (mouse.emitTimer <= 0) {
          mouse.emitTimer = 320 + Math.random() * 220;
          fireOutbound(mouse.x, mouse.y, MOUSE_RADIUS * MOUSE_RADIUS, 0.0028);
        }
      } else {
        mouse.emitTimer = 0;
      }

      // 4) Advance packets — capture target on arrival
      packets = packets.filter(packet => {
        packet.t += packet.speed * dt;
        if (packet.t >= 1) {
          const target = particles[packet.targetIdx];
          if (target) {
            target.captureMs = CAPTURE_DURATION;
            if (Math.random() < CONVERSION_PROB) {
              target.pulseMs = CONVERSION_DURATION;
            }
          }
          return false;
        }
        return true;
      });

      // 5) Faint anchor reach lines
      ctx.lineWidth = 1;
      for (const anchor of anchors) {
        for (const p of particles) {
          const dx = p.x - anchor.x;
          const dy = p.y - anchor.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < reachSq) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / ANCHOR_REACH) * 0.10;
            ctx.strokeStyle = `rgba(132, 92, 245, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(anchor.x, anchor.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      // 6) Particle-to-particle web — captured nodes turn the line emerald
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const dist = Math.sqrt(d2);
            const baseAlpha = (1 - dist / CONNECT_DIST) * 0.22;
            const isHot = a.captureMs > 0 || b.captureMs > 0;
            ctx.strokeStyle = isHot
              ? `rgba(16, 185, 129, ${baseAlpha * 1.6})`
              : `rgba(132, 92, 245, ${baseAlpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 7) Mouse: connection web + gentle pull
      if (mouse.active) {
        ctx.lineWidth = 1.2;
        for (const p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
            const dist = Math.sqrt(d2);
            const t = 1 - dist / MOUSE_RADIUS;
            ctx.strokeStyle = `rgba(132, 92, 245, ${t * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            if (dist > 1) {
              const force = t * 0.045;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }
        }

        // Cursor halo + ring
        const halo = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_RADIUS * 0.55
        );
        halo.addColorStop(0, 'rgba(132, 92, 245, 0.22)');
        halo.addColorStop(1, 'rgba(132, 92, 245, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(132, 92, 245, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 8) Packets in flight (emerald data balls)
      for (const packet of packets) {
        const target = particles[packet.targetIdx];
        if (!target) continue;
        const x = packet.fromX + (target.x - packet.fromX) * packet.t;
        const y = packet.fromY + (target.y - packet.fromY) * packet.t;
        ctx.fillStyle = 'rgba(16, 185, 129, 0.28)';
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 9) Particles + capture/conversion visuals
      for (const p of particles) {
        if (p.pulseMs > 0) {
          const tProgress = 1 - p.pulseMs / CONVERSION_DURATION;
          const ringR = 4 + tProgress * 32;
          const ringA = (1 - tProgress) * 0.7;
          ctx.strokeStyle = `rgba(16, 185, 129, ${ringA})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, ringR, 0, Math.PI * 2);
          ctx.stroke();
        }
        const captured = p.captureMs > 0;
        if (captured) {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = captured
          ? 'rgba(16, 185, 129, 0.95)'
          : 'rgba(132, 92, 245, 0.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, captured ? p.size + 0.6 : p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 10) Anchors — pulsing platform nodes
      for (const anchor of anchors) {
        const pulse = 0.6 + Math.sin(now * 0.002 + anchor.pulsePhase) * 0.4;
        const haloR = 22 + pulse * 10;
        const haloGrad = ctx.createRadialGradient(
          anchor.x, anchor.y, 0,
          anchor.x, anchor.y, haloR
        );
        haloGrad.addColorStop(0, 'rgba(132, 92, 245, 0.42)');
        haloGrad.addColorStop(1, 'rgba(132, 92, 245, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(132, 92, 245, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#7040e8';
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #6800ff 1px, transparent 1px),
            linear-gradient(to bottom, #6800ff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div
        className="absolute -top-1/4 -left-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(132,92,245,0.16), transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(157,117,248,0.14), transparent 70%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
