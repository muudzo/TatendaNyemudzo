import { describe, expect, test } from 'vitest';
import {
  FLOATS_PER_STAR,
  SKY,
  createStars,
  easeToward,
  planetAt,
  planetLayout,
  starCount,
  travelFor,
} from '../../src/lib/sky';

describe('starCount', () => {
  test('scales with the area of the screen', () => {
    expect(starCount(1440, 900)).toBeGreaterThan(starCount(768, 1024));
  });

  test('stays within the budget on tiny and huge screens', () => {
    expect(starCount(320, 480)).toBe(SKY.minStars);
    expect(starCount(7680, 4320)).toBe(SKY.maxStars);
  });
});

describe('createStars', () => {
  test('is the same sky every time for the same seed', () => {
    expect(createStars(200, 7)).toEqual(createStars(200, 7));
    expect(createStars(200, 7)).not.toEqual(createStars(200, 8));
  });

  test('packs every star into the expected layout and ranges', () => {
    const stars = createStars(500, 1);
    expect(stars).toHaveLength(500 * FLOATS_PER_STAR);
    for (let offset = 0; offset < stars.length; offset += FLOATS_PER_STAR) {
      const [x, y, z, size, accent, phase] = stars.slice(offset, offset + FLOATS_PER_STAR);
      expect(Math.abs(x)).toBeLessThanOrEqual(1);
      expect(Math.abs(y)).toBeLessThanOrEqual(1);
      expect(z).toBeGreaterThanOrEqual(0);
      expect(z).toBeLessThan(1);
      expect(size).toBeGreaterThanOrEqual(SKY.minSize);
      expect(size).toBeLessThanOrEqual(SKY.maxSize);
      expect([0, 1]).toContain(accent);
      expect(phase).toBeGreaterThanOrEqual(0);
      expect(phase).toBeLessThan(1);
    }
  });

  test('makes a small share of the stars lime', () => {
    const stars = createStars(4000, 3);
    let accents = 0;
    for (let offset = 4; offset < stars.length; offset += FLOATS_PER_STAR) accents += stars[offset];
    expect(accents / 4000).toBeCloseTo(SKY.accentShare, 1);
  });
});

describe('travelFor', () => {
  test('moves forward with scroll and with time', () => {
    expect(travelFor(0, 0)).toBe(0);
    expect(travelFor(1000, 0)).toBeGreaterThan(travelFor(500, 0));
    expect(travelFor(0, 10)).toBeGreaterThan(travelFor(0, 5));
  });
});

describe('easeToward', () => {
  test('closes part of the gap each frame and never overshoots', () => {
    const next = easeToward(0, 10, 16);
    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(10);
  });

  test('covers the same ground at any frame rate', () => {
    const at60 = easeToward(easeToward(0, 10, 16), 10, 16);
    const at30 = easeToward(0, 10, 32);
    expect(at30).toBeCloseTo(at60, 5);
  });
});

describe('planetLayout', () => {
  test('fills the box the page set aside for it', () => {
    const planet = planetLayout({ left: 900, top: 100, width: 320, height: 320 });
    expect(planet).toEqual({ x: 1060, y: 260, radius: 160, strength: 1 });
  });

  test('stays round in a box that is not square', () => {
    expect(planetLayout({ left: 0, top: 0, width: 200, height: 120 }).radius).toBe(60);
  });
});

describe('planetAt', () => {
  const layout = planetLayout({ left: 900, top: 100, width: 320, height: 320 });

  test('is the layout itself before any scroll', () => {
    expect(planetAt(layout, 0, 900)).toEqual(layout);
  });

  test('rises away as the reader scrolls: faster than the page, smaller and fainter', () => {
    const later = planetAt(layout, 300, 900);
    expect(later.y).toBeLessThan(layout.y - 300);
    expect(later.radius).toBeLessThan(layout.radius);
    expect(later.strength).toBeLessThan(layout.strength);
  });

  test('keeps clear of the words below it: the page never catches up', () => {
    const textBelow = layout.y + layout.radius + 20;
    for (const scrollY of [50, 150, 300, 600]) {
      const planet = planetAt(layout, scrollY, 900);
      expect(planet.y + planet.radius).toBeLessThan(textBelow - scrollY);
    }
  });

  test('is gone before the reader is a screen in, and never negative', () => {
    expect(planetAt(layout, 900, 900).strength).toBe(0);
    expect(planetAt(layout, 5000, 900).strength).toBe(0);
  });

  test('ignores overscroll above the top of the page', () => {
    expect(planetAt(layout, -80, 900)).toEqual(layout);
  });
});
