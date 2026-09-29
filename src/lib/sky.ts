/**
 * The sky behind the pages: a field of stars the reader travels through as they scroll, and a
 * ringed planet beside the statement that recedes into it. Pure numbers only; the WebGL renderer
 * lives in scripts/sky/.
 */

export const SKY = {
  /** Stars per CSS pixel of screen: sparse enough that text always sits on dark (or light) paper. */
  density: 0.0013,
  minStars: 400,
  maxStars: 2400,
  /** Point size in CSS pixels before perspective. Most stars are small; a few are bright. */
  minSize: 1,
  maxSize: 3.4,
  /** The share of stars in the signal lime. */
  accentShare: 0.16,
  /** Depth of the field, in the same units as travel. */
  depth: 4,
  /** How far one CSS pixel of scroll carries the reader into the field. */
  scrollTravel: 0.0012,
  /** Drift when nobody is scrolling, per second. */
  drift: 0.06,
  /** Time constant, in ms, for easing scroll and pointer into the camera. */
  easeMs: 220,
} as const;

/** x, y, z, size, accent, phase. */
export const FLOATS_PER_STAR = 6;

export function starCount(width: number, height: number): number {
  const wanted = Math.round(width * height * SKY.density);
  return Math.min(SKY.maxStars, Math.max(SKY.minStars, wanted));
}

/** A small seeded generator, so the same visitor sees the same sky and screenshots are stable. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createStars(count: number, seed = 1): Float32Array {
  const random = mulberry32(seed);
  const stars = new Float32Array(count * FLOATS_PER_STAR);
  for (let index = 0; index < count; index += 1) {
    const offset = index * FLOATS_PER_STAR;
    stars[offset] = random() * 2 - 1;
    stars[offset + 1] = random() * 2 - 1;
    stars[offset + 2] = random();
    // Cubing skews sizes towards small, so bright stars stay rare.
    stars[offset + 3] = SKY.minSize + (SKY.maxSize - SKY.minSize) * random() ** 3;
    stars[offset + 4] = random() < SKY.accentShare ? 1 : 0;
    stars[offset + 5] = random();
  }
  return stars;
}

/** How far into the field the camera is, given the scroll position and the time on the page. */
export function travelFor(scrollY: number, seconds: number): number {
  return scrollY * SKY.scrollTravel + seconds * SKY.drift;
}

/** Ease a value toward its target, frame-rate independently. */
export function easeToward(current: number, target: number, elapsedMs: number): number {
  return target + (current - target) * Math.exp(-elapsedMs / SKY.easeMs);
}

export interface PlanetLayout {
  /** Centre, in CSS pixels from the top left of the document. */
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  /** 0 to 1: how strongly it is drawn. */
  readonly strength: number;
}

/** Where the page asks for the planet: the box its globe should fill, in document coordinates. */
export interface Anchor {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

export const PLANET = {
  /**
   * It rises away a little faster than the page scrolls, shrinking as it goes, so the words below
   * it can never scroll over it.
   */
  parallax: 1.25,
  /** How quickly it shrinks into the distance, per screen of scroll. */
  recede: 1.5,
  /** How quickly it fades, per screen of scroll: gone before the reader is a screen in. */
  fade: 1.6,
} as const;

export function planetLayout(anchor: Anchor): PlanetLayout {
  return {
    x: anchor.left + anchor.width / 2,
    y: anchor.top + anchor.height / 2,
    radius: Math.min(anchor.width, anchor.height) / 2,
    strength: 1,
  };
}

/** Where the planet is on screen once the reader has scrolled. */
export function planetAt(layout: PlanetLayout, scrollY: number, height: number): PlanetLayout {
  const scrolled = Math.max(0, scrollY);
  const screens = scrolled / height;
  return {
    x: layout.x,
    y: layout.y - scrolled * PLANET.parallax,
    radius: layout.radius / (1 + screens * PLANET.recede),
    strength: layout.strength * Math.max(0, 1 - screens * PLANET.fade),
  };
}
