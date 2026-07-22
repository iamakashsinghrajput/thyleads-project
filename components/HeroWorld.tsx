"use client";

import { useEffect, useRef } from 'react';
import { landCells } from './worldLandmask';

/**
 * Hero backdrop: the world as a dot matrix, with live routes between hubs.
 *
 * Flat equirectangular, not a rotating globe — a spinning wireframe earth is
 * the most worn visual in B2B software, while a flat dot map is the treatment
 * the serious cross-border firms use. The landmass is real: Natural Earth
 * coastlines rasterised to a 480x240 grid, which is why the continents,
 * islands and inland seas resolve properly rather than looking approximated.
 *
 * Routes are drawn as quadratic curves between real hub coordinates, each
 * carrying a pulse on its own phase, so the map reads as carrying traffic.
 */

/**
 * The funnel, in order. A callout does not pick one of these at random — it
 * walks all three while it is on screen, so each annotation shows a single
 * lead converting rather than announcing an isolated event.
 *
 * Illustrative: driven by the animation's own timing, not by any data source.
 */
const STAGES = ['Lead qualified', 'Meeting booked', 'Revenue won'];
const CALLOUT_LIFE = 3400;

const DEG_TO_U = (lon: number) => (lon + 180) / 360;
const DEG_TO_V = (lat: number) => (90 - lat) / 180;

/** Hub cities: [lat, lon]. */
const HUBS: [number, number][] = [
  [37.77, -122.42],  // San Francisco
  [40.71, -74.01],   // New York
  [-23.55, -46.63],  // Sao Paulo
  [51.51, -0.13],    // London
  [52.52, 13.40],    // Berlin
  [25.20, 55.27],    // Dubai
  [12.97, 77.59],    // Bangalore
  [1.35, 103.82],    // Singapore
  [35.68, 139.69],   // Tokyo
  [-33.87, 151.21],  // Sydney
];

const DOT_VERT = `
precision highp float;
attribute vec2 a_uv;
attribute vec2 a_ll;     // true lon/lat in radians
attribute float a_seed;
attribute float a_edge;  // 1 on the coast
uniform vec2 u_center, u_half, u_mouse, u_sun;
uniform float u_time, u_px, u_mact;
varying float v_a, v_day, v_edge;
void main() {
  vec2 pos = u_center + (a_uv - 0.5) * u_half * vec2(2.0, -2.0);

  // Dots lift toward the pointer, so the map responds without deforming.
  vec2 mp = (u_mouse - 0.5) * 2.0;
  float md = length((pos - mp) * vec2(0.55, 1.0));
  float near = exp(-md * md * 2.6) * u_mact;

  // Real solar geometry: cosine of the sun's zenith angle at this cell.
  // Zero is the terminator, positive is daylight, negative is night.
  float cosZ = sin(a_ll.y) * sin(u_sun.y)
             + cos(a_ll.y) * cos(u_sun.y) * cos(a_ll.x - u_sun.x);
  v_day = smoothstep(-0.14, 0.16, cosZ);
  v_edge = a_edge;

  gl_Position = vec4(pos, 0.0, 1.0);
  float tw = 0.74 + 0.26 * sin(u_time * 0.9 + a_seed * 6.283);
  v_a = tw * (0.75 + 1.0 * near);
  gl_PointSize = u_px * (0.80 + 0.45 * a_edge + 0.5 * near);
}
`;

const DOT_FRAG = `
precision highp float;
uniform vec3 u_dot, u_night;
varying float v_a, v_day, v_edge;
void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  float a = 1.0 - smoothstep(0.35, 1.0, r);

  // Night side carries the warmer, brighter tone — the way inhabited land
  // reads from orbit after dark. Daylight land sits back, cooler and dimmer.
  vec3 col = mix(u_night, u_dot, v_day);
  float lum = mix(1.15, 0.56, v_day);

  // Coastlines are drawn brighter than continental interiors, as on a
  // printed reference map.
  lum *= mix(0.78, 1.0, v_edge);

  gl_FragColor = vec4(col, 1.0) * a * v_a * lum * 0.95;
}
`;

const ARC_VERT = `
precision highp float;
attribute vec2 a_uv;
attribute float a_t;     // 0 at the lead source, 1 at the revenue hub
attribute float a_seed;
uniform vec2 u_center, u_half;
uniform float u_time;
varying float v_p, v_t;
void main() {
  gl_Position = vec4(u_center + (a_uv - 0.5) * u_half * vec2(2.0, -2.0), 0.0, 1.0);
  v_t = a_t;

  // A head running source -> hub, with the trail behind it. Nothing is drawn
  // ahead of the head, so each route visibly *travels* rather than pulsing in
  // place: the lead is in transit, not yet arrived.
  float head = fract(u_time * 0.17 + a_seed);
  float d = head - a_t;
  v_p = d >= 0.0 ? exp(-d * 17.0) : 0.0;
}
`;

const ARC_FRAG = `
precision highp float;
uniform vec3 u_lead, u_rev;
varying float v_p, v_t;
void main() {
  // Cold at the source, warming toward revenue colour as it nears the hub.
  vec3 col = mix(u_lead, u_rev, v_t * v_t);
  float base = 0.085 * mix(0.5, 1.0, v_t);
  gl_FragColor = vec4(col + u_rev * v_p * v_t * 1.6, 1.0) * (base + v_p * 1.05);
}
`;

const HUB_VERT = `
precision highp float;
attribute vec2 a_uv;
attribute float a_seed;
attribute float a_arrive;  // how much revenue is landing here right now
uniform vec2 u_center, u_half;
uniform float u_time, u_px;
varying float v_beat, v_arr;
void main() {
  gl_Position = vec4(u_center + (a_uv - 0.5) * u_half * vec2(2.0, -2.0), 0.0, 1.0);
  v_beat = 0.5 + 0.5 * sin(u_time * 1.1 + a_seed * 6.283);
  v_arr = a_arrive;
  gl_PointSize = u_px * (1.5 + 1.1 * v_beat + 2.6 * a_arrive);
}
`;

const HUB_FRAG = `
precision highp float;
uniform vec3 u_rev;
varying float v_beat, v_arr;
void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  float core = 1.0 - smoothstep(0.0, 0.26, r);
  // Idle breathing ring, plus a hard flare when a lead actually lands.
  float ring = exp(-pow((r - v_beat * 0.85) * 8.0, 2.0)) * (1.0 - v_beat) * 0.55;
  float flare = exp(-pow((r - (1.0 - v_arr) * 0.9) * 5.0, 2.0)) * v_arr * 1.4;
  gl_FragColor = vec4(u_rev, 1.0) * (core * (0.85 + v_arr * 1.6) + ring + flare);
}
`;

/** [background, land dots, routes, hubs] per slide. */
export const WORLD_PALETTES: string[][] = [
  ['#08061a', '#6d5cc9', '#8b6cf7', '#e2d8ff'],
  ['#0b0619', '#8f4fb0', '#c774e8', '#fbd8f6'],
  ['#05091f', '#3f66bd', '#5b8def', '#cfe6ff'],
  ['#120714', '#a85069', '#e0738f', '#ffd6dd'],
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, t: number, src: string) {
  const sh = gl.createShader(t)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error('HeroWorld:', gl.getShaderInfoLog(sh));
  return sh;
}
function program(gl: WebGLRenderingContext, v: string, f: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, v));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, f));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error('HeroWorld link:', gl.getProgramInfoLog(p));
  return p;
}

export default function HeroWorld({
  slide,
  reduceMotion = false,
  transitionMs = 1050,
}: {
  slide: number;
  reduceMotion?: boolean;
  transitionMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelWrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      alpha: true, depth: false, antialias: true, premultipliedAlpha: true,
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const dotProg = program(gl, DOT_VERT, DOT_FRAG);
    const arcProg = program(gl, ARC_VERT, ARC_FRAG);
    const hubProg = program(gl, HUB_VERT, HUB_FRAG);

    // ---- geometry ---------------------------------------------------------
    const cells = landCells();

    // Normalise v to the latitude band actually retained, so the map fills the
    // frame instead of floating with dead space where Antarctica was removed.
    let vMin = 1, vMax = 0;
    for (const c of cells) { if (c.v < vMin) vMin = c.v; if (c.v > vMax) vMax = c.v; }
    const pad = 0.02;
    vMin -= pad; vMax += pad;
    const remapV = (v: number) => (v - vMin) / (vMax - vMin);
    // Width:height of the retained band, used to keep the projection square.
    const mapWH = 360 / ((vMax - vMin) * 180);

    const dUv = new Float32Array(cells.length * 2);
    const dLL = new Float32Array(cells.length * 2);
    const dSeed = new Float32Array(cells.length);
    const dEdge = new Float32Array(cells.length);
    cells.forEach((c, i) => {
      dUv[i * 2] = c.u; dUv[i * 2 + 1] = remapV(c.v);
      dLL[i * 2] = c.lon; dLL[i * 2 + 1] = c.lat;
      dSeed[i] = (i * 0.6180339887) % 1;
      dEdge[i] = c.edge;
    });

    const hUv = new Float32Array(HUBS.length * 2);
    const hSeed = new Float32Array(HUBS.length);
    HUBS.forEach(([lat, lon], i) => {
      hUv[i * 2] = DEG_TO_U(lon); hUv[i * 2 + 1] = remapV(DEG_TO_V(lat));
      hSeed[i] = (i * 0.271) % 1;
    });

    /**
     * Lead sources: real land cells spread across the inhabited latitudes,
     * chosen greedily with a minimum separation so they cover the map rather
     * than clumping. Each one routes to whichever hub is genuinely nearest by
     * great-circle distance — so the flows follow the geography instead of
     * being drawn by hand.
     */
    const SOURCES = 34;
    const sources: { u: number; v: number; hub: number }[] = [];
    const stride = Math.max(1, Math.floor(cells.length / (SOURCES * 37)));
    for (let i = 0; i < cells.length && sources.length < SOURCES; i += stride) {
      const c = cells[(i * 7919) % cells.length];
      const latDeg = (c.lat * 180) / Math.PI;
      if (latDeg < -42 || latDeg > 63) continue;               // inhabited band
      if (sources.some((p) => Math.hypot(p.u - c.u, (p.v - c.v) * 2) < 0.085)) continue;

      // Nearest hub by great-circle distance.
      let best = 0, bestD = Infinity;
      HUBS.forEach(([hlat, hlon], hi) => {
        const la1 = c.lat, la2 = hlat * (Math.PI / 180);
        const dLon = c.lon - hlon * (Math.PI / 180);
        const d = Math.acos(
          Math.min(1, Math.max(-1,
            Math.sin(la1) * Math.sin(la2) + Math.cos(la1) * Math.cos(la2) * Math.cos(dLon)))
        );
        if (d < bestD) { bestD = d; best = hi; }
      });
      sources.push({ u: c.u, v: c.v, hub: best });
    }

    // Each route: a bowed quadratic from source to hub, sampled into segments.
    const aUv: number[] = [], aT: number[] = [], aSeed: number[] = [];
    const routeHub: number[] = [];      // destination hub per route
    const routeSeed: number[] = [];     // phase per route, for arrival timing
    const SEG = 34;
    sources.forEach((src, ri) => {
      const [hlat, hlon] = HUBS[src.hub];
      const p0 = [src.u, remapV(src.v)];
      const p1 = [DEG_TO_U(hlon), remapV(DEG_TO_V(hlat))];
      const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
      const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
      const len = Math.hypot(dx, dy);
      const cx = mx - dy * len * 0.30, cy = my + dx * len * 0.30;
      const seed = (ri * 0.6180339887) % 1;
      routeHub.push(src.hub);
      routeSeed.push(seed);
      const at = (t: number) => {
        const it = 1 - t;
        return [
          it * it * p0[0] + 2 * it * t * cx + t * t * p1[0],
          it * it * p0[1] + 2 * it * t * cy + t * t * p1[1],
        ];
      };
      for (let i = 0; i < SEG; i++) {
        const t1 = i / SEG, t2 = (i + 1) / SEG;
        const a = at(t1), b2 = at(t2);
        aUv.push(a[0], a[1], b2[0], b2[1]);
        aT.push(t1, t2);
        aSeed.push(seed, seed);
      }
    });

    const buf = (d: Float32Array) => {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, d, gl.STATIC_DRAW);
      return b;
    };
    const bDot = buf(dUv), bDotS = buf(dSeed), bDotLL = buf(dLL), bDotE = buf(dEdge);
    const bHub = buf(hUv), bHubS = buf(hSeed);
    const hArrive = new Float32Array(HUBS.length);
    const bHubA = gl.createBuffer();
    const bArc = buf(new Float32Array(aUv)), bArcT = buf(new Float32Array(aT)), bArcS = buf(new Float32Array(aSeed));
    const arcCount = aT.length;

    const attach = (prog: WebGLProgram, name: string, b: WebGLBuffer | null, size: number) => {
      const loc = gl.getAttribLocation(prog, name);
      if (loc < 0) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    const U = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);

    const rgb = WORLD_PALETTES.map((p) => p.map(hexToRgb));
    const cur = rgb[slideRef.current].map((c) => [...c] as [number, number, number]);

    let aspect = 1;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      aspect = w / h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

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

    /**
     * Subsolar point from the actual date and UTC time: declination from the
     * day of year, longitude from how far the Earth has turned since noon UTC.
     * Seeded from the real clock so the terminator starts where it genuinely
     * is, then advanced ~90x so a full day passes in about sixteen minutes —
     * real geometry, at a rate you can actually perceive.
     */
    const D2R = Math.PI / 180;
    const now0 = new Date();
    const startOfYear = new Date(Date.UTC(now0.getUTCFullYear(), 0, 0));
    const dayOfYear = (now0.getTime() - startOfYear.getTime()) / 86400000;
    const sunLat = -23.44 * Math.cos(((2 * Math.PI) / 365.24) * (dayOfYear + 10)) * D2R;
    const utcHours =
      now0.getUTCHours() + now0.getUTCMinutes() / 60 + now0.getUTCSeconds() / 3600;
    const sunLon0 = -15 * (utcHours - 12) * D2R;
    const SUN_RATE = 15 * 90 * D2R / 3600;   // deg/hour -> rad/second, x90
    let sunLon = sunLon0;

    const labelState = HUBS.map(() => ({ start: 0, until: 0, stage: -1, stageAt: 0, flip: false }));

    let raf = 0, running = true, last = performance.now(), clock = 0;

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!motionRef.current) {
        clock += dt;
        sunLon -= SUN_RATE * dt;   // the Earth turns east, the sun tracks west
      }

      const k = 1 - Math.pow(0.001, dt / (durRef.current / 1000));
      const want = rgb[slideRef.current];
      for (let i = 0; i < 4; i++) for (let c = 0; c < 3; c++) cur[i][c] += (want[i][c] - cur[i][c]) * k;

      const wantAct = motionRef.current ? 0 : (now - lastMove < 2200 ? 1 : 0);
      const em = 1 - Math.pow(0.001, dt / 0.42);
      m.x += (m.tx - m.x) * em;
      m.y += (m.ty - m.y) * em;
      m.act += (wantAct - m.act) * (1 - Math.pow(0.001, dt / 0.9));

      resize();
      // Fit the 2:1 map across the frame, seated slightly above centre.
      const halfW = 0.94;
      const halfH = (halfW / mapWH) * aspect;
      const cx = 0, cy = 0.0;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(dotProg);
      attach(dotProg, 'a_uv', bDot, 2);
      attach(dotProg, 'a_seed', bDotS, 1);
      attach(dotProg, 'a_ll', bDotLL, 2);
      attach(dotProg, 'a_edge', bDotE, 1);
      gl.uniform2f(U(dotProg, 'u_center'), cx, cy);
      gl.uniform2f(U(dotProg, 'u_half'), halfW, halfH);
      gl.uniform2f(U(dotProg, 'u_mouse'), m.x, m.y);
      gl.uniform1f(U(dotProg, 'u_mact'), m.act);
      gl.uniform1f(U(dotProg, 'u_time'), clock);
      gl.uniform1f(U(dotProg, 'u_px'), Math.max(1.6, canvas.height * 0.0031));
      gl.uniform3f(U(dotProg, 'u_dot'), cur[1][0], cur[1][1], cur[1][2]);
      gl.uniform3f(U(dotProg, 'u_night'), cur[3][0], cur[3][1], cur[3][2]);
      gl.uniform2f(U(dotProg, 'u_sun'), sunLon, sunLat);
      gl.drawArrays(gl.POINTS, 0, cells.length);

      gl.useProgram(arcProg);
      attach(arcProg, 'a_uv', bArc, 2);
      attach(arcProg, 'a_t', bArcT, 1);
      attach(arcProg, 'a_seed', bArcS, 1);
      gl.uniform2f(U(arcProg, 'u_center'), cx, cy);
      gl.uniform2f(U(arcProg, 'u_half'), halfW, halfH);
      gl.uniform1f(U(arcProg, 'u_time'), clock);
      gl.uniform3f(U(arcProg, 'u_lead'), cur[2][0], cur[2][1], cur[2][2]);
      gl.uniform3f(U(arcProg, 'u_rev'), cur[3][0], cur[3][1], cur[3][2]);
      gl.drawArrays(gl.LINES, 0, arcCount);

      // How much revenue is landing at each hub this instant: for every route,
      // how close its travelling head is to arrival. Twelve floats, rewritten
      // per frame, so the flare is driven by the same phase as the arc itself.
      hArrive.fill(0);
      for (let r = 0; r < routeHub.length; r++) {
        const head = (clock * 0.17 + routeSeed[r]) % 1;
        const d = 1 - head;                       // distance still to travel
        hArrive[routeHub[r]] += Math.exp(-d * 22) * 0.85;
      }
      for (let i = 0; i < hArrive.length; i++) hArrive[i] = Math.min(1, hArrive[i]);
      gl.bindBuffer(gl.ARRAY_BUFFER, bHubA);
      gl.bufferData(gl.ARRAY_BUFFER, hArrive, gl.DYNAMIC_DRAW);

      // Surface the arrivals as text. Each label is positioned from the same
      // projection as its hub and triggered by the same arrival value, so the
      // words appear exactly when the flare does.
      for (let i = 0; i < HUBS.length; i++) {
        const el = labelRefs.current[i];
        if (!el) continue;
        const ndcX = cx + (hUv[i * 2] - 0.5) * halfW * 2;
        const ndcY = cy + (hUv[i * 2 + 1] - 0.5) * halfH * -2;
        const sx = (ndcX * 0.5 + 0.5) * canvas.clientWidth;
        const sy = (1 - (ndcY * 0.5 + 0.5)) * canvas.clientHeight;

        const vert = el.children[0] as HTMLElement | undefined;
        const horiz = el.children[1] as HTMLElement | undefined;
        const body = el.children[2] as HTMLElement | undefined;
        const txt = body?.children[0] as HTMLElement | undefined;
        const fill = body?.children[1]?.children[0] as HTMLElement | undefined;

        // Two things make a callout unreadable: landing under the headline, or
        // running off the frame. Reserve the centre band, and mirror the elbow
        // when the hub sits near the right edge so the type stays on screen.
        const fx = sx / canvas.clientWidth;
        const fy = sy / canvas.clientHeight;
        const inCopy = fx > 0.19 && fx < 0.81 && fy > 0.24 && fy < 0.72;
        const tooLow = fy > 0.86;
        const flip = fx > 0.7;

        const st = labelState[i];
        if (hArrive[i] > 0.5 && now > st.until && !inCopy && !tooLow) {
          st.start = now;
          st.until = now + CALLOUT_LIFE;
          st.stage = -1;
          st.flip = flip;
        }

        const age = now - st.start;
        const left = st.until - now;
        const f = Math.max(0, Math.min(1, age / CALLOUT_LIFE));

        el.style.opacity = String(left <= 0 ? 0 : Math.min(1, left / 650));
        el.style.transform = `translate(${sx}px, ${sy - 4}px)`;

        // The leader rises, turns the corner, and only then does type appear —
        // the eye is walked from the point on the map to the words.
        if (vert) vert.style.transform = `scaleY(${Math.min(1, age / 200)})`;
        if (horiz) {
          horiz.style.transformOrigin = st.flip ? 'right' : 'left';
          horiz.style.left = st.flip ? 'auto' : '0';
          horiz.style.right = st.flip ? '0' : 'auto';
          horiz.style.transform = `scaleX(${Math.max(0, Math.min(1, (age - 170) / 220))})`;
        }
        if (body) {
          body.style.left = st.flip ? 'auto' : '14px';
          body.style.right = st.flip ? '14px' : 'auto';
          body.style.textAlign = st.flip ? 'right' : 'left';
        }
        if (body) body.style.opacity = String(Math.max(0, Math.min(1, (age - 230) / 240)));


        // Step the funnel while the callout is up, re-wiping the type on each
        // change so the conversion reads as progress rather than a relabel.
        const stage = Math.min(STAGES.length - 1, Math.floor(f * STAGES.length));
        if (stage !== st.stage) {
          st.stage = stage;
          st.stageAt = now;
          if (txt) txt.textContent = STAGES[stage];
        }
        if (txt) {
          const reveal = Math.min(1, (now - st.stageAt) / 280);
          txt.style.clipPath = `inset(0 ${(1 - reveal) * 100}% 0 0)`;
        }
        if (fill) fill.style.width = `${f * 100}%`;
      }

      gl.useProgram(hubProg);
      attach(hubProg, 'a_uv', bHub, 2);
      attach(hubProg, 'a_seed', bHubS, 1);
      attach(hubProg, 'a_arrive', bHubA, 1);
      gl.uniform2f(U(hubProg, 'u_center'), cx, cy);
      gl.uniform2f(U(hubProg, 'u_half'), halfW, halfH);
      gl.uniform1f(U(hubProg, 'u_time'), clock);
      gl.uniform1f(U(hubProg, 'u_px'), Math.max(7, canvas.height * 0.016));
      gl.uniform3f(U(hubProg, 'u_rev'), cur[3][0], cur[3][1], cur[3][2]);
      gl.drawArrays(gl.POINTS, 0, HUBS.length);

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
      gl.deleteProgram(dotProg); gl.deleteProgram(arcProg); gl.deleteProgram(hubProg);
      [bDot, bDotS, bDotLL, bDotE, bHub, bHubS, bHubA, bArc, bArcT, bArcS].forEach((b) => gl.deleteBuffer(b));
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div ref={labelWrapRef} className="absolute inset-0 overflow-hidden">
        {HUBS.map((_, i) => (
          // An engineering callout: the leader turns a corner, the type is
          // wiped in behind it, and a rail underneath tracks the lead's
          // progress through the funnel while the annotation lives.
          <div
            key={i}
            ref={(el) => { labelRefs.current[i] = el; }}
            style={{ opacity: 0 }}
            className="absolute left-0 top-0 will-change-transform"
          >
            <span className="absolute bottom-0 left-0 block h-[22px] w-px origin-bottom bg-gradient-to-t from-white/10 to-white/55" />
            <span className="absolute bottom-[22px] left-0 block h-px w-[11px] origin-left bg-white/45" />
            <span className="absolute bottom-[15px] left-[14px] block">
              <span className="block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]" />
              <span className="mt-[4px] ml-auto block h-px w-[52px] bg-white/12">
                <span className="block h-px w-0 bg-white/70" />
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
