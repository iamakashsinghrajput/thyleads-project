"use client";

import { useEffect, useRef } from 'react';

/**
 * PRESERVED ALTERNATIVE — the refracted-light (caustics) hero backdrop.
 * Not currently mounted; kept so it can be swapped back in by importing this
 * instead of HeroFluid in Hero.tsx.
 *
 * Real-time caustics: the pattern sunlight makes on the floor of a pool.
 *
 * Rather than drawing shapes, this integrates a wave field: each of five
 * passes displaces the sample point by the sine of its own previous position,
 * so the field folds back through itself. The caustic filaments emerge from
 * that feedback instead of being authored, which is why the pattern never
 * settles into a recognisable loop or a shape you could point at.
 *
 * Two layers at different scales and drift rates are composited, so the
 * interference between them has no common period — it does not visibly repeat.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_deep;  // water / background
uniform vec3  u_mid;   // body colour
uniform vec3  u_glow;  // caustic highlight

#define TAU 6.28318530718

/**
 * One caustic layer. The loop feeds each iteration's output back into the
 * sample position — that feedback is what produces filaments that pinch and
 * braid like real refracted light rather than a tiled pattern.
 */
float caustic(vec2 uv, float t, float inten) {
  vec2 p = mod(uv * TAU, TAU) - 250.0;
  vec2 i = p;
  float c = 1.0;
  for (int n = 0; n < 5; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y),
                 sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten),
                           p.y / (cos(i.y + tt) / inten)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return clamp(pow(abs(c), 8.0), 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = u_time * 0.20;

  // Two layers, deliberately incommensurate in scale and speed so their
  // interference has no repeating period.
  float a = caustic(p * 0.85 + vec2(0.0, t * 0.035), t, 0.0045);
  float b = caustic(p * 1.43 - vec2(t * 0.028, 0.0), t * 0.83 + 12.0, 0.0060);

  float light = a * 0.75 + b * 0.55;

  // Depth: the body of the water, lit from above.
  float depth = smoothstep(1.15, -0.15, uv.y);
  vec3 col = mix(u_deep, u_mid, depth * 0.55);

  // Caustics ride on top, brightest where the two layers coincide.
  col += u_mid * light * 0.55;
  col += u_glow * pow(light, 2.2) * 0.85;
  col += u_glow * pow(a * b, 1.4) * 0.9;

  // A broad, slowly wandering shaft of light from off-frame.
  vec2 shaft = vec2(0.68 + 0.10 * sin(t * 0.21), 0.30 + 0.07 * cos(t * 0.17));
  float beam = smoothstep(1.0, 0.0, length((uv - shaft) * vec2(aspect * 0.6, 1.0)));
  col += u_mid * beam * beam * 0.30;

  // Keep the middle calm so the centred headline always reads.
  float dc = length((uv - vec2(0.5, 0.52)) * vec2(1.05, 1.0));
  col *= mix(0.30, 1.0, smoothstep(0.10, 0.66, dc));
  // Settle the edges into the page.
  col *= mix(0.42, 1.0, smoothstep(0.0, 0.30, uv.y));
  col *= mix(1.0, 0.62, smoothstep(0.74, 1.0, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

/** [deep, mid, glow] per slide — colour changes, motion does not. */
export const CAUSTIC_PALETTES: string[][] = [
  ['#08040f', '#5b21b6', '#c4b5fd'],
  ['#0a0414', '#7e22ce', '#f0abfc'],
  ['#04070f', '#1e40af', '#a5d8ff'],
  ['#0d0409', '#9d174d', '#fecdd3'],
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
    console.error('HeroCaustics shader:', gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export default function HeroCaustics({
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

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('HeroCaustics link:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uDeep = gl.getUniformLocation(prog, 'u_deep');
    const uMid = gl.getUniformLocation(prog, 'u_mid');
    const uGlow = gl.getUniformLocation(prog, 'u_glow');

    const rgb = CAUSTIC_PALETTES.map((p) => p.map(hexToRgb));
    const cur = rgb[slideRef.current].map((c) => [...c] as [number, number, number]);

    // Caustics are all fine filaments — rendering below native and letting CSS
    // scale up keeps the cost down and reads as optical softness.
    const SCALE = 0.6;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
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
      gl.uniform3f(uDeep, cur[0][0], cur[0][1], cur[0][2]);
      gl.uniform3f(uMid, cur[1][0], cur[1][1], cur[1][2]);
      gl.uniform3f(uGlow, cur[2][0], cur[2][1], cur[2][2]);

      gl.uniform1f(uTime, clock);
      resize();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
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
      gl.deleteBuffer(b);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full scale-[1.04]"
    />
  );
}
