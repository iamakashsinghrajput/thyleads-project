"use client";

import { useEffect, useRef } from 'react';

/**
 * Hero backdrop: a slowly evolving contour field.
 *
 * A scalar field is evaluated per pixel and drawn as isolines — the same
 * construction as a topographic map or an interference pattern. Line width is
 * held constant in *screen* space by dividing by the field's screen-space
 * derivative (fwidth), which is what keeps every line hairline-crisp no matter
 * how steep the terrain gets. Every fifth line is drawn heavier, the index
 * contour convention from real cartography, which gives the field a reading
 * order instead of an undifferentiated mesh.
 *
 * The result is precise and quiet rather than playful: it reads as measurement,
 * not as paint.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = (derivatives: boolean) => `
${derivatives ? '#extension GL_OES_standard_derivatives : enable' : ''}
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_base;
uniform vec3  u_lineA;
uniform vec3  u_lineB;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = rot * p * 2.03; a *= 0.5; }
  return v;
}

/**
 * The terrain. Long low-frequency waves set the overall shape; the fbm term
 * breaks up the regularity so the contours never read as a repeating ripple.
 */
float field(vec2 p, float t) {
  float v = 0.0;
  v += 0.62 * sin(p.x * 1.15 + t * 0.17);
  v += 0.44 * sin(p.y * 1.55 - t * 0.13 + 1.7);
  v += 0.30 * sin((p.x + p.y * 0.7) * 1.05 + t * 0.11);
  v += 0.95 * fbm(p * 0.75 + vec2(t * 0.035, -t * 0.028));
  v += 0.20 * sin(length(p - vec2(0.55, 0.15)) * 2.2 - t * 0.19);
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) * 4.6;

  float t = u_time;
  float f = field(p, t);

  const float BANDS = 22.0;
  float g = f * BANDS;

  // Distance to the nearest contour, measured in pixels.
${derivatives
  ? '  float w = max(fwidth(g), 1e-4);'
  : '  float w = 0.02;  // no derivatives available: fixed approximation'}
  float e = abs(fract(g - 0.5) - 0.5);
  float dist = e / w;

  float line = 1.0 - smoothstep(0.0, 1.35, dist);

  // Index contours: every fifth line carries more weight, as on a real map.
  float idx = floor(g - 0.5) + 1.0;
  float major = 1.0 - step(0.5, abs(mod(idx, 5.0)));
  float weight = mix(0.34, 1.0, major);

  // A faint halo so the lines sit in space rather than on a flat plane.
  float halo = exp(-dist / 9.0) * 0.16 * weight;

  // Hue shifts gently with elevation, so the field has depth without
  // resorting to a second colour scheme.
  float elev = clamp(f * 0.5 + 0.5, 0.0, 1.0);
  vec3 ink = mix(u_lineA, u_lineB, smoothstep(0.25, 0.85, elev));

  vec3 col = u_base;
  col += ink * line * weight * 0.85;
  col += ink * halo;

  // Calm centre so the headline always reads, and a falloff at the edges so
  // the field recedes rather than running off the frame.
  float dc = length((uv - vec2(0.5, 0.52)) * vec2(1.06, 1.0));
  col *= mix(0.30, 1.0, smoothstep(0.08, 0.62, dc));
  col *= mix(1.0, 0.34, smoothstep(0.58, 1.05, dc));
  col *= mix(0.42, 1.0, smoothstep(0.0, 0.26, uv.y));
  col *= mix(1.0, 0.50, smoothstep(0.74, 1.0, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

/** [base, low ink, high ink] per slide. */
export const CONTOUR_PALETTES: string[][] = [
  ['#08061a', '#7c63f5', '#b9c4ff'],
  ['#0b0619', '#b45cf0', '#f2b8e6'],
  ['#05091c', '#3f7bef', '#9fd6ff'],
  ['#120714', '#e06188', '#ffbcc6'],
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('HeroContour shader:', gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export default function HeroContour({
  slide,
  reduceMotion = false,
  transitionMs = 1050,
}: {
  slide: number;
  reduceMotion?: boolean;
  transitionMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slideRef = useRef(slide);
  const motionRef = useRef(reduceMotion);
  const durRef = useRef(transitionMs);

  slideRef.current = slide;
  motionRef.current = reduceMotion;
  durRef.current = transitionMs;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: 'low-power',
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    // Screen-space derivatives are what keep the lines a constant width. If
    // they're unavailable the shader falls back to a fixed approximation.
    const hasDerivatives = !!gl.getExtension('OES_standard_derivatives');

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG(hasDerivatives));
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('HeroContour link:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uBase = gl.getUniformLocation(prog, 'u_base');
    const uA = gl.getUniformLocation(prog, 'u_lineA');
    const uB = gl.getUniformLocation(prog, 'u_lineB');

    const rgb = CONTOUR_PALETTES.map((p) => p.map(hexToRgb));
    const cur = rgb[slideRef.current].map((c) => [...c] as [number, number, number]);

    // Full resolution: these are hairlines, so downscaling would blur them.
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    let running = true;
    let last = performance.now();
    let clock = 0;

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!motionRef.current) clock += dt;

      const k = 1 - Math.pow(0.001, dt / (durRef.current / 1000));
      const want = rgb[slideRef.current];
      for (let i = 0; i < 3; i++) {
        for (let c = 0; c < 3; c++) cur[i][c] += (want[i][c] - cur[i][c]) * k;
      }
      gl.uniform3f(uBase, cur[0][0], cur[0][1], cur[0][2]);
      gl.uniform3f(uA, cur[1][0], cur[1][1], cur[1][2]);
      gl.uniform3f(uB, cur[2][0], cur[2][1], cur[2][2]);
      gl.uniform1f(uTime, clock);

      resize();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
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
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
