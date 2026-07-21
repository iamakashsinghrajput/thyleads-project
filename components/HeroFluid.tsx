"use client";

import { useEffect, useRef } from 'react';

/**
 * Hero backdrop: a real-time incompressible fluid simulation.
 *
 * This is not a noise field dressed up as fluid — it solves the Navier–Stokes
 * equations on the GPU every frame, using the standard split-step scheme:
 *
 *   1. advect velocity through itself (semi-Lagrangian back-trace)
 *   2. compute curl, then apply vorticity confinement to restore the small
 *      eddies that step 1 numerically dissipates
 *   3. compute divergence of the velocity field
 *   4. solve Poisson for pressure with N Jacobi iterations
 *   5. subtract the pressure gradient, projecting velocity back onto the
 *      divergence-free (incompressible) subspace
 *   6. advect the dye through the corrected velocity
 *
 * Every stage is a full-screen pass into a ping-ponged half-float framebuffer.
 * Because the state is fed back into itself frame after frame, the motion is
 * genuinely emergent: nothing about the shapes it makes exists in this file.
 * It also means it is *live* — the pointer injects real momentum and the fluid
 * responds with correct swirl and conservation.
 */

const SIM_RES = 128;      // velocity/pressure grid
const DYE_RES = 512;      // colour grid — higher, since it's what you see
const PRESSURE_ITER = 20; // Jacobi sweeps per frame
const VEL_DISSIPATION = 0.08;  // no auto-fire, so momentum must persist
const DYE_DISSIPATION = 0.10;   // lower = ink lingers longer
const CURL_STRENGTH = 30;
const SPLAT_RADIUS = 0.22;

const BASE_VERT = `
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv, vL, vR, vT, vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const CLEAR_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D uTexture; uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }
`;

const SPLAT_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uTarget; uniform float aspectRatio;
uniform vec3 color; uniform vec2 point; uniform float radius;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`;

// Semi-Lagrangian advection: trace backwards along the velocity field and
// sample where this parcel came from.
const ADVECTION_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uVelocity; uniform sampler2D uSource;
uniform vec2 texelSize; uniform float dt; uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  gl_FragColor = texture2D(uSource, coord) / (1.0 + dissipation * dt);
  gl_FragColor.a = 1.0;
}
`;

const DIVERGENCE_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv, vL, vR, vT, vB; uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  // Free-slip walls: reflect the normal component at the boundary.
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}
`;

const CURL_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv, vL, vR, vT, vB; uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * ((R - L) - (T - B)), 0.0, 0.0, 1.0);
}
`;

// Vorticity confinement: push velocity back toward local curl maxima, which
// puts back the fine swirl that advection numerically smears away.
const VORTICITY_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uVelocity; uniform sampler2D uCurl;
uniform float curl; uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture2D(uVelocity, vUv).xy + force * dt;
  gl_FragColor = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}
`;

// One Jacobi iteration of the pressure Poisson equation.
const PRESSURE_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}
`;

// Project velocity to be divergence-free.
const GRADIENT_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 vel = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
  gl_FragColor = vec4(vel, 0.0, 1.0);
}
`;

const DISPLAY_FRAG = `
precision highp float; precision highp sampler2D;
varying vec2 vUv, vL, vR, vT, vB;
uniform sampler2D uTexture; uniform vec2 texelSize; uniform vec3 uBase;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;

  // Shade from the dye gradient — treats density as a height field, which
  // gives the fluid volume instead of looking like flat paint.
  float l = length(texture2D(uTexture, vL).rgb);
  float r = length(texture2D(uTexture, vR).rgb);
  float t = length(texture2D(uTexture, vT).rgb);
  float b = length(texture2D(uTexture, vB).rgb);
  vec3 n = normalize(vec3(r - l, t - b, 0.28));
  float spec = pow(max(dot(n, normalize(vec3(-0.4, 0.7, 0.6))), 0.0), 18.0);

  vec3 col = uBase + c;
  col += spec * 0.30 * c;

  // Roll off by the peak channel so dense ink deepens in its own hue rather
  // than clipping to white.
  float peak = max(max(col.r, col.g), col.b);
  col /= 1.0 + peak * 0.88;
  col *= 1.62;

  // Thin haze stays close to neutral and only dense ink carries full
  // saturation. Colour then reads as deliberate accent rather than a wash.
  float dens = clamp(length(c) * 1.5, 0.0, 1.0);
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma) * 0.94, col, 0.62 + 0.38 * dens);

  float dc = length((vUv - vec2(0.5, 0.52)) * vec2(1.06, 1.0));
  // Calm centre so the headline always reads.
  col *= mix(0.34, 1.0, smoothstep(0.10, 0.66, dc));
  // ...and a falloff at the outside, so brightness peaks in a ring and the
  // corners keep real negative space instead of flooding with colour.
  col *= mix(1.0, 0.70, smoothstep(0.62, 1.10, dc));
  col *= mix(0.45, 1.0, smoothstep(0.0, 0.26, vUv.y));
  col *= mix(1.0, 0.55, smoothstep(0.72, 1.0, vUv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

/** [background, dyeA, dyeB] per slide. */
export const FLUID_PALETTES: string[][] = [
  ['#161034', '#9b7cff', '#cfc2ff'],
  ['#1a0e33', '#d081ee', '#f2caf2'],
  ['#0e1638', '#6d9bf5', '#b4d8ff'],
  ['#231020', '#ec8098', '#ffcdd5'],
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type FBO = {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
};
type DoubleFBO = {
  read: FBO;
  write: FBO;
  swap: () => void;
  texelSizeX: number;
  texelSizeY: number;
};

export default function HeroFluid({
  slide,
  reduceMotion = false,
}: {
  slide: number;
  reduceMotion?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slideRef = useRef(slide);
  const motionRef = useRef(reduceMotion);
  slideRef.current = slide;
  motionRef.current = reduceMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    // Half-float render targets are required — the sim accumulates values well
    // outside [0,1] and 8-bit targets clamp them into mush.
    const halfFloatExt = gl.getExtension('OES_texture_half_float');
    gl.getExtension('OES_texture_half_float_linear');
    if (!halfFloatExt) return;
    const HALF_FLOAT = halfFloatExt.HALF_FLOAT_OES;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('HeroFluid shader:', gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const vert = compile(gl.VERTEX_SHADER, BASE_VERT);
    const makeProgram = (fragSrc: string) => {
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vert);
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('HeroFluid link:', gl.getProgramInfoLog(prog));
      }
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(prog, i)!.name;
        uniforms[name] = gl.getUniformLocation(prog, name);
      }
      return { prog, uniforms };
    };

    const P = {
      clear: makeProgram(CLEAR_FRAG),
      splat: makeProgram(SPLAT_FRAG),
      advection: makeProgram(ADVECTION_FRAG),
      divergence: makeProgram(DIVERGENCE_FRAG),
      curl: makeProgram(CURL_FRAG),
      vorticity: makeProgram(VORTICITY_FRAG),
      pressure: makeProgram(PRESSURE_FRAG),
      gradient: makeProgram(GRADIENT_FRAG),
      display: makeProgram(DISPLAY_FRAG),
    };

    // Full-screen quad used by every pass.
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const idx = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const blit = (target: FBO | null) => {
      if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    const createFBO = (w: number, h: number, filter: number): FBO => {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, HALF_FLOAT, null);

      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture, fbo, width: w, height: h,
        texelSizeX: 1 / w, texelSizeY: 1 / h,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    };

    const createDoubleFBO = (w: number, h: number, filter: number): DoubleFBO => {
      let fbo1 = createFBO(w, h, filter);
      let fbo2 = createFBO(w, h, filter);
      return {
        get read() { return fbo1; },
        get write() { return fbo2; },
        swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; },
        texelSizeX: 1 / w, texelSizeY: 1 / h,
      };
    };

    const linear = gl.getExtension('OES_texture_half_float_linear') ? gl.LINEAR : gl.NEAREST;
    const dye = createDoubleFBO(DYE_RES, DYE_RES, linear);
    const velocity = createDoubleFBO(SIM_RES, SIM_RES, linear);
    const divergence = createFBO(SIM_RES, SIM_RES, gl.NEAREST);
    const curl = createFBO(SIM_RES, SIM_RES, gl.NEAREST);
    const pressure = createDoubleFBO(SIM_RES, SIM_RES, gl.NEAREST);

    const rgb = FLUID_PALETTES.map((p) => p.map(hexToRgb));
    const base: [number, number, number] = [...rgb[slideRef.current][0]];

    const splat = (x: number, y: number, dx: number, dy: number, color: number[]) => {
      const aspect = canvas.width / canvas.height;
      gl.useProgram(P.splat.prog);
      gl.uniform1i(P.splat.uniforms.uTarget!, velocity.read.attach(0));
      gl.uniform1f(P.splat.uniforms.aspectRatio!, aspect);
      gl.uniform2f(P.splat.uniforms.point!, x, y);
      gl.uniform3f(P.splat.uniforms.color!, dx, dy, 0);
      gl.uniform1f(P.splat.uniforms.radius!, SPLAT_RADIUS / 100);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(P.splat.uniforms.uTarget!, dye.read.attach(0));
      gl.uniform3f(P.splat.uniforms.color!, color[0], color[1], color[2]);
      blit(dye.write);
      dye.swap();
    };

    // Deterministic pseudo-random so behaviour is reproducible.
    let seed = 1;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    let splatSide = 0;

    /**
     * Injects ink from the top-left and bottom-right corners in turn, each
     * aimed down its diagonal. Used to seed the field on first paint and then
     * on a slow, low-strength cadence so the hero never drains to flat — far
     * gentler than a constant jet.
     */
    const cornerSplat = (strength = 1) => {
      const pal = rgb[slideRef.current];
      const c = rnd() < 0.78 ? pal[1] : pal[2];

      // In splat space y = 1 is the top of the canvas.
      const topLeft = splatSide++ % 2 === 0;
      const spread = 0.30;
      const x = topLeft ? rnd() * spread : 1 - rnd() * spread;
      const y = topLeft ? 1 - rnd() * spread : rnd() * spread;

      // Fire along the diagonal, toward the opposite corner, with a little
      // spray so the two jets never look mechanical.
      const ang = (topLeft ? -Math.PI / 4 : (3 * Math.PI) / 4) + (rnd() - 0.5) * 0.55;
      const mag = (560 + rnd() * 640) * strength;

      splat(x, y, Math.cos(ang) * mag, Math.sin(ang) * mag,
        [c[0] * 0.44 * strength, c[1] * 0.44 * strength, c[2] * 0.44 * strength]);
    };

    let pointer: { x: number; y: number; dx: number; dy: number; moved: boolean } | null = null;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      if (pointer) {
        pointer.dx = (x - pointer.x) * 5200;
        pointer.dy = (y - pointer.y) * 5200;
        pointer.x = x;
        pointer.y = y;
        pointer.moved = true;
      } else {
        pointer = { x, y, dx: 0, dy: 0, moved: false };
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Seed the field so the first frame is already interesting.
    for (let i = 0; i < 10; i++) cornerSplat(1.1);

    let raf = 0;
    let running = true;
    let last = performance.now();
    let sinceSplat = 0;

    const step = (dt: number) => {
      gl.disable(gl.BLEND);

      // --- vorticity confinement -------------------------------------------
      gl.useProgram(P.curl.prog);
      gl.uniform2f(P.curl.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(P.curl.uniforms.uVelocity!, velocity.read.attach(0));
      blit(curl);

      gl.useProgram(P.vorticity.prog);
      gl.uniform2f(P.vorticity.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(P.vorticity.uniforms.uVelocity!, velocity.read.attach(0));
      gl.uniform1i(P.vorticity.uniforms.uCurl!, curl.attach(1));
      gl.uniform1f(P.vorticity.uniforms.curl!, CURL_STRENGTH);
      gl.uniform1f(P.vorticity.uniforms.dt!, dt);
      blit(velocity.write);
      velocity.swap();

      // --- projection: divergence -> pressure -> gradient subtract ----------
      gl.useProgram(P.divergence.prog);
      gl.uniform2f(P.divergence.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(P.divergence.uniforms.uVelocity!, velocity.read.attach(0));
      blit(divergence);

      gl.useProgram(P.clear.prog);
      gl.uniform1i(P.clear.uniforms.uTexture!, pressure.read.attach(0));
      gl.uniform1f(P.clear.uniforms.value!, 0.8);
      blit(pressure.write);
      pressure.swap();

      gl.useProgram(P.pressure.prog);
      gl.uniform2f(P.pressure.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(P.pressure.uniforms.uDivergence!, divergence.attach(0));
      for (let i = 0; i < PRESSURE_ITER; i++) {
        gl.uniform1i(P.pressure.uniforms.uPressure!, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gl.useProgram(P.gradient.prog);
      gl.uniform2f(P.gradient.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(P.gradient.uniforms.uPressure!, pressure.read.attach(0));
      gl.uniform1i(P.gradient.uniforms.uVelocity!, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // --- advection --------------------------------------------------------
      gl.useProgram(P.advection.prog);
      gl.uniform2f(P.advection.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(P.advection.uniforms.uVelocity!, velocity.read.attach(0));
      gl.uniform1i(P.advection.uniforms.uSource!, velocity.read.attach(0));
      gl.uniform1f(P.advection.uniforms.dt!, dt);
      gl.uniform1f(P.advection.uniforms.dissipation!, VEL_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(P.advection.uniforms.uVelocity!, velocity.read.attach(0));
      gl.uniform1i(P.advection.uniforms.uSource!, dye.read.attach(1));
      gl.uniform1f(P.advection.uniforms.dissipation!, DYE_DISSIPATION);
      blit(dye.write);
      dye.swap();
    };

    const render = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.016, (now - last) / 1000);
      last = now;

      // Ease the backdrop toward the active slide's base colour.
      const want = rgb[slideRef.current][0];
      const k = 1 - Math.pow(0.001, dt / 1.05);
      for (let i = 0; i < 3; i++) base[i] += (want[i] - base[i]) * k;

      if (!motionRef.current) {
        // Ambient fire: one soft injection every few seconds, just enough to
        // keep colour in the frame. The low dissipation does the rest.
        sinceSplat += dt;
        if (sinceSplat > 2.4) {
          sinceSplat = 0;
          cornerSplat(0.55);
        }
        if (pointer?.moved) {
          pointer.moved = false;
          const c = rgb[slideRef.current][1];
          splat(pointer.x, pointer.y, pointer.dx, pointer.dy,
            [c[0] * 0.22, c[1] * 0.22, c[2] * 0.22]);
        }
        step(dt);
      }

      gl.useProgram(P.display.prog);
      gl.uniform2f(P.display.uniforms.texelSize!, 1 / dye.read.width, 1 / dye.read.height);
      gl.uniform1i(P.display.uniforms.uTexture!, dye.read.attach(0));
      gl.uniform3f(P.display.uniforms.uBase!, base[0], base[1], base[2]);
      blit(null);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(render);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const onLost = (e: Event) => { e.preventDefault(); stop(); };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
