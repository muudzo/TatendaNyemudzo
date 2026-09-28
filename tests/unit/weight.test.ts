import { describe, expect, test } from 'vitest';
import { classifyResource, formatKB, summariseWeight } from '../../src/lib/weight';

describe('classifyResource', () => {
  test.each([
    ['https://x.dev/_astro/newsreader.a1b2.woff2', 'css', 'font'],
    ['https://x.dev/_astro/page.a1b2.css', 'link', 'style'],
    ['https://x.dev/_astro/grid.a1b2.js', 'script', 'script'],
    ['https://x.dev/img/plate.avif', 'img', 'image'],
    ['https://x.dev/og.png?v=2', 'img', 'image'],
    ['https://x.dev/sw.js', 'other', 'script'],
    ['https://x.dev/data.json', 'fetch', 'other'],
  ])('%s → %s', (name, initiator, kind) => {
    expect(classifyResource(name, initiator)).toBe(kind);
  });
});

describe('summariseWeight', () => {
  test('uses encoded body size, falling back to transfer size', () => {
    const summary = summariseWeight(10_000, [
      { name: '/a.css', initiatorType: 'link', encodedBodySize: 4_000, transferSize: 0 },
      { name: '/b.woff2', initiatorType: 'css', encodedBodySize: 0, transferSize: 50_000 },
    ]);
    expect(summary.byKind.style).toBe(4_000);
    expect(summary.byKind.font).toBe(50_000);
    expect(summary.total).toBe(64_000);
  });

  test('counts only the document and stylesheets as essential', () => {
    const summary = summariseWeight(10_000, [
      { name: '/a.css', initiatorType: 'link', encodedBodySize: 4_000, transferSize: 0 },
      { name: '/b.js', initiatorType: 'script', encodedBodySize: 6_000, transferSize: 0 },
      { name: '/c.woff2', initiatorType: 'css', encodedBodySize: 50_000, transferSize: 0 },
    ]);
    expect(summary.essential).toBe(14_000);
  });

  test('handles an empty resource list', () => {
    const summary = summariseWeight(8_000, []);
    expect(summary.total).toBe(8_000);
    expect(summary.essential).toBe(8_000);
  });
});

describe('formatKB', () => {
  test.each([
    [0, '<1 KB'],
    [512, '<1 KB'],
    [1_024, '1 KB'],
    [41_300, '40 KB'],
    [1_536_000, '1.5 MB'],
  ])('%d bytes → %s', (bytes, label) => {
    expect(formatKB(bytes)).toBe(label);
  });
});
