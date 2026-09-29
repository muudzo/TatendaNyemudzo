/**
 * The scene: one canvas fixed behind the page, the starfield and the planet drawn into it, and the
 * inputs that move the camera (scroll, time, the pointer). Colours come from the --sky-* and
 * --planet-* tokens, so the theme switch and the palette stay in CSS.
 */
import { easeToward, starCount, travelFor } from '../../lib/sky';
import type { Frame, Layer } from './gl';
import { planetLayer } from './planet';
import { starLayer } from './stars';

export interface Sky {
  stop(): void;
}

const MAX_DPR = 2;
/** How far the camera leans toward the pointer at the edge of the screen, in world units. */
const TILT = 0.3;

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const darkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const isStill = () => reducedMotion.matches;

export function startSky(): Sky | null {
  const canvas = document.createElement('canvas');
  canvas.className = 'sky';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    premultipliedAlpha: true,
    powerPreference: 'low-power',
  });
  // No WebGL, or a driver that can't build the shaders: the page is complete without a sky.
  if (!gl) return null;
  const stars = starLayer(gl, starCount(window.innerWidth, window.innerHeight));
  // Only pages that set a place aside for the planet get one.
  const anchor = document.querySelector('[data-planet]');
  const planet = anchor ? planetLayer(gl, anchor, isStill) : undefined;
  if (!stars || planet === null) return null;
  return run(canvas, gl, planet ? [stars, planet] : [stars]);
}

function run(canvas: HTMLCanvasElement, gl: WebGLRenderingContext, layers: readonly Layer[]): Sky {
  const started = performance.now();
  let last = started;
  let travel = travelFor(window.scrollY, 0);
  let tilt = { x: 0, y: 0 };
  let tiltTarget = { x: 0, y: 0 };
  let size = { width: 1, height: 1, dpr: 1 };
  let frameId = 0;

  function resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    size = { width, height, dpr };
  }

  function draw(seconds: number): void {
    const frame: Frame = { seconds, travel, tilt, scrollY: window.scrollY, ...size };
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    layers.forEach((layer) => layer.draw(frame));
  }

  function paint(): void {
    layers.forEach((layer) => layer.paint());
  }

  function tick(now: number): void {
    const elapsed = now - last;
    last = now;
    const seconds = (now - started) / 1000;
    travel = easeToward(travel, travelFor(window.scrollY, seconds), elapsed);
    tilt = {
      x: easeToward(tilt.x, tiltTarget.x, elapsed),
      y: easeToward(tilt.y, tiltTarget.y, elapsed),
    };
    draw(seconds);
    frameId = requestAnimationFrame(tick);
  }

  /** With reduced motion the sky is a still picture: one frame, redrawn only when it must change. */
  function play(): void {
    cancelAnimationFrame(frameId);
    if (isStill()) {
      travel = 0;
      tilt = { x: 0, y: 0 };
      draw(0);
      return;
    }
    last = performance.now();
    frameId = requestAnimationFrame(tick);
  }

  const redrawIfStill = () => {
    if (isStill()) draw(0);
  };
  // A still sky only needs redrawing on scroll to carry the planet with the page.
  let scrollQueued = false;
  const onScroll = () => {
    if (!isStill() || scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      draw(0);
    });
  };
  const onResize = () => {
    resize();
    redrawIfStill();
  };
  const onTheme = () => {
    paint();
    redrawIfStill();
  };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    tiltTarget = {
      x: (event.clientX / window.innerWidth - 0.5) * TILT,
      y: (0.5 - event.clientY / window.innerHeight) * TILT,
    };
  };
  const themeObserver = new MutationObserver(onTheme);

  function stop(): void {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    darkScheme.removeEventListener('change', onTheme);
    reducedMotion.removeEventListener('change', play);
    themeObserver.disconnect();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    canvas.remove();
  }

  document.body.prepend(canvas);
  gl.enable(gl.BLEND);
  resize();
  paint();
  play();
  // Fade the lights up once there is something to see.
  requestAnimationFrame(() => canvas.classList.add('is-lit'));

  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  darkScheme.addEventListener('change', onTheme);
  reducedMotion.addEventListener('change', play);
  themeObserver.observe(root, { attributeFilter: ['data-theme'] });
  canvas.addEventListener('webglcontextlost', stop, { once: true });

  return { stop };
}
