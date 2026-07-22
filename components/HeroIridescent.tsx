"use client";

import { useEffect, useRef } from 'react';

/**
 * Hero backdrop: an iridescent liquid surface.
 *
 * The colour here is not sampled from a palette — it is *computed* from thin
 * film interference, the physics that makes an oil film on water or a soap
 * bubble shift colour as you move. Light reflecting off the top of a thin film
 * travels a slightly different distance than light reflecting off the bottom;
 * where those two paths differ by half a wavelength they cancel, and where
 * they differ by a whole wavelength they reinforce. Because that condition is
 * met at a different film thickness for red, green and blue, thickness maps
 * directly to hue.
 *
 * So the shader builds a height field, derives a real surface normal from its
 * gradient, works out the optical path difference at each point, and evaluates
 * the interference term per channel. The banding that results — tight where
 * the surface curves hard, broad where it is flat — is a consequence of the
 * geometry rather than something authored, which is why it cannot be faked
 * convincingly with a gradient.
 *
 * A Fresnel term brightens the grazing angles and a specular lobe rides the
 * crests, so it reads as a lit material rather than a coloured picture.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_deep, u_tint, u_hi;
uniform vec2  u_mouse;
uniform float u_mact;

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
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = rot * p * 2.03; a *= 0.5; }
  return v;
}

/** The film surface: domain-warped, so it folds instead of rippling evenly. */
float height(vec2 p, float t) {
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.030)),
                fbm(p + vec2(5.2, 1.3) - t * 0.024));
  return fbm(p + 1.9 * q + vec2(t * 0.018, -t * 0.014));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) * 1.30;
  float t = u_time;

  // Pointer presses into the film, thinning it locally — which shifts the
  // interference colour under the cursor rather than just brightening it.
  vec2 mp = vec2((u_mouse.x - 0.5) * aspect, u_mouse.y - 0.5) * 1.30;
  float press = exp(-dot(p - mp, p - mp) * 1.15) * u_mact;

  float e = 0.0022;
  float hC = height(p, t);
  float hX = height(p + vec2(e, 0.0), t);
  float hY = height(p + vec2(0.0, e), t);

  // Real surface normal from the height gradient.
  vec3 n = normalize(vec3((hC - hX) / e, (hC - hY) / e, 4.2));

  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 L = normalize(vec3(-0.42, 0.62, 0.66));

  // Fresnel: reflectivity climbs steeply toward grazing angles.
  float ndv = clamp(dot(n, V), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 3.2);

  /*
   * Optical path difference through the film. Thickness varies with the
   * surface height and thins where the pointer presses; the 1/ndv term is the
   * longer path light takes through the film at an angle, which is what makes
   * the bands crowd together toward the edges of each fold.
   */
  float thickness = 300.0 + 260.0 * hC - 150.0 * press;
  float opd = thickness / max(ndv, 0.34);

  // Interference per channel: constructive where the path difference is a
  // whole number of wavelengths, destructive at a half. Constants are 2*pi
  // over approximate RGB wavelengths.
  vec3 irid = 0.5 + 0.5 * cos(opd * vec3(0.0062, 0.0077, 0.0096) + 1.35);
  // Keep it in the brand's blue -> violet -> magenta arc rather than letting
  // it run the full rainbow.
  irid = mix(vec3(dot(irid, vec3(0.33))), irid, 0.82) * u_tint;

  float ndl = clamp(dot(n, L), 0.0, 1.0);
  float spec = pow(clamp(dot(reflect(-L, n), V), 0.0, 1.0), 58.0);

  vec3 col = u_deep;
  col += irid * (0.20 + 0.85 * fres) * (0.35 + 0.75 * ndl);
  col += u_hi * spec * 0.85;
  // A soft sheen along the folds so the surface has body between highlights.
  col += u_tint * pow(ndl, 3.0) * 0.10;

  // Roll off by the peak channel so bright folds deepen in hue instead of
  // clipping to white.
  float peak = max(max(col.r, col.g), col.b);
  col /= 1.0 + peak * 0.72;
  col *= 1.24;

  // Calm centre for the headline; edges recede.
  float dc = length((uv - vec2(0.5, 0.52)) * vec2(1.06, 1.0));
  col *= mix(0.26, 1.0, smoothstep(0.08, 0.68, dc));
  col *= mix(1.0, 0.46, smoothstep(0.60, 1.06, dc));
  col *= mix(0.44, 1.0, smoothstep(0.0, 0.26, uv.y));
  col *= mix(1.0, 0.54, smoothstep(0.74, 1.0, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

/** [deep, film tint, specular] per slide. */
export const IRIDESCENT_PALETTES: string[][] = [
  ['#09071c', '#9b8cff', '#efe8ff'],
  ['#0c0620', '#d18cf0', '#fbdcf8'],
  ['#050b22', '#7fa8f5', '#dcecff'],
  ['#160818', '#ee8ca6', '#ffdfe6'],
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, t: number, src: string) {
  const sh = gl.createShader(t)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error('HeroIridescent:', gl.getShaderInfoLog(sh));
  return sh;
}

export default function HeroIridescent({
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
      alpha: false, depth: false, antialias: false, powerPreference: 'low-power',
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('HeroIridescent link:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (k: string) => gl.getUniformLocation(prog, k);
    const uRes = U('u_res'), uTime = U('u_time');
    const uDeep = U('u_deep'), uTint = U('u_tint'), uHi = U('u_hi');
    const uMouse = U('u_mouse'), uMact = U('u_mact');

    const rgb = IRIDESCENT_PALETTES.map((p) => p.map(hexToRgb));
    const cur = rgb[slideRef.current].map((c) => [...c] as [number, number, number]);

    // The interference bands are fine, but the surface is smooth — rendering
    // below native and letting CSS scale up reads as optical softness.
    const SCALE = 0.62;
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

    const m = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, act: 0 };
    let lastMove = -1e9;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      m.tx = (e.clientX - r.left) / r.width;
      m.ty = 1 - (e.clientY - r.top) / r.height;
      lastMove = performance.now();
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0, running = true, last = performance.now(), clock = 0;
    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!motionRef.current) clock += dt;

      const k = 1 - Math.pow(0.001, dt / (durRef.current / 1000));
      const want = rgb[slideRef.current];
      for (let i = 0; i < 3; i++) for (let c = 0; c < 3; c++) cur[i][c] += (want[i][c] - cur[i][c]) * k;
      gl.uniform3f(uDeep, cur[0][0], cur[0][1], cur[0][2]);
      gl.uniform3f(uTint, cur[1][0], cur[1][1], cur[1][2]);
      gl.uniform3f(uHi, cur[2][0], cur[2][1], cur[2][2]);

      const wantAct = motionRef.current ? 0 : (now - lastMove < 2200 ? 1 : 0);
      const em = 1 - Math.pow(0.001, dt / 0.42);
      m.x += (m.tx - m.x) * em;
      m.y += (m.ty - m.y) * em;
      m.act += (wantAct - m.act) * (1 - Math.pow(0.001, dt / 0.9));
      gl.uniform2f(uMouse, m.x, m.y);
      gl.uniform1f(uMact, m.act);
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
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteProgram(prog); gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
