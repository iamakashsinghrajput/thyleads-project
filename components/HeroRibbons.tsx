"use client";

import { useEffect, useRef } from 'react';

/**
 * Option A — flowing ribbons.
 *
 * Six bands sweep continuously across the frame. Each is a signed-distance
 * band around a travelling wave, shaded across its own thickness and lit from
 * the slope of that wave, so it turns and catches light like fabric rather
 * than reading as a flat stripe. Bands run at different speeds and depths;
 * the nearer ones are brighter and faster, which is what produces parallax.
 *
 * The motion is continuous and clearly visible — nothing here is slow enough
 * to read as static. It runs on its own clock only: the pointer is
 * deliberately not an input, so the ribbons never react to the cursor.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_base, u_inkA, u_inkB;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

/** Centre height of one ribbon, and (via the caller) its slope. */
float ribbonY(float x, float t, float seed, float amp, float freq, float speed) {
  return amp * sin(x * freq + t * speed + seed)
       + amp * 0.45 * sin(x * freq * 1.9 - t * speed * 0.7 + seed * 2.1)
       + amp * 0.22 * noise(vec2(x * 1.4 + t * speed * 0.25, seed));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float x = (uv.x - 0.5) * aspect;
  float t = u_time;

  vec3 col = u_base;

  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float depth = fi / 5.0;                    // 0 = nearest
    float seed = fi * 2.37;

    float base = 0.5 + (fi - 2.5) * 0.115;
    float amp = mix(0.115, 0.055, depth);
    float freq = mix(2.1, 3.4, depth);
    float speed = mix(0.62, 0.28, depth);      // nearer ribbons move faster
    float thick = mix(0.085, 0.038, depth);

    float xs = x;
    float y = base + ribbonY(xs, t, seed, amp, freq, speed);
    float d = uv.y - y;

    // Soft band around the curve.
    float band = 1.0 - smoothstep(thick * 0.35, thick, abs(d));
    if (band <= 0.001) continue;

    // Slope of the ribbon at this x — used as a surface normal, which is what
    // makes the band read as a turning surface rather than a flat stripe.
    float e = 0.006;
    float slope = (ribbonY(xs + e, t, seed, amp, freq, speed)
                 - ribbonY(xs - e, t, seed, amp, freq, speed)) / (2.0 * e);
    vec3 n = normalize(vec3(-slope, 1.0, 0.0));
    float lit = clamp(dot(n, normalize(vec3(-0.45, 0.85, 0.0))), 0.0, 1.0);

    // Shade across the thickness: bright at the leading edge, falling to the
    // trailing one, so each ribbon has a readable top and underside.
    float across = clamp(d / thick * 0.5 + 0.5, 0.0, 1.0);
    float shade = mix(1.0, 0.28, across);

    vec3 ink = mix(u_inkA, u_inkB, depth * 0.7 + lit * 0.3);
    float strength = mix(0.55, 0.16, depth);

    col += ink * band * shade * strength * (0.55 + 0.65 * lit);
    // Specular thread along the crest.
    col += ink * pow(band, 6.0) * lit * mix(0.30, 0.06, depth);
  }

  float peak = max(max(col.r, col.g), col.b);
  col /= 1.0 + peak * 0.72;
  col *= 1.52;

  float dc = length((uv - vec2(0.5, 0.52)) * vec2(1.06, 1.0));
  col *= mix(0.32, 1.0, smoothstep(0.09, 0.64, dc));
  col *= mix(1.0, 0.46, smoothstep(0.60, 1.06, dc));
  col *= mix(0.44, 1.0, smoothstep(0.0, 0.26, uv.y));
  col *= mix(1.0, 0.54, smoothstep(0.74, 1.0, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

export const RIBBON_PALETTES: string[][] = [
  ['#0a0719', '#7c5cf0', '#c9b6ff'],
  ['#0d0719', '#bb5ce0', '#f0b8ee'],
  ['#060b1f', '#4a7cee', '#a5d2ff'],
  ['#130814', '#dd6285', '#ffbfcb'],
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, t: number, src: string) {
  const sh = gl.createShader(t)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error('HeroRibbons:', gl.getShaderInfoLog(sh));
  return sh;
}

export default function HeroRibbons({
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
    const gl = canvas.getContext('webgl', { alpha: false, depth: false, antialias: false }) as WebGLRenderingContext | null;
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('HeroRibbons link:', gl.getProgramInfoLog(prog));
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
    const uA = gl.getUniformLocation(prog, 'u_inkA');
    const uB = gl.getUniformLocation(prog, 'u_inkB');

    const rgb = RIBBON_PALETTES.map((p) => p.map(hexToRgb));
    const cur = rgb[slideRef.current].map((c) => [...c] as [number, number, number]);

    const SCALE = 0.72;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0, running = true, last = performance.now(), clock = 0;
    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!motionRef.current) clock += dt;

      const k = 1 - Math.pow(0.001, dt / (durRef.current / 1000));
      const want = rgb[slideRef.current];
      for (let i = 0; i < 3; i++) for (let c = 0; c < 3; c++) cur[i][c] += (want[i][c] - cur[i][c]) * k;
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
    const start = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(draw); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const onLost = (e: Event) => { e.preventDefault(); stop(); };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteProgram(prog); gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
