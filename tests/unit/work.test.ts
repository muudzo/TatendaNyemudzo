import { describe, expect, test } from 'vitest';
import { byTier, sortWork, STATUS_LABEL } from '../../src/lib/work';

const entry = (id: string, tier: 'flagship' | 'supporting', order: number) => ({
  id,
  data: { tier, order },
});

describe('sortWork', () => {
  test('puts flagships first, then orders within a tier', () => {
    const sorted = sortWork([
      entry('s2', 'supporting', 2),
      entry('f2', 'flagship', 2),
      entry('s1', 'supporting', 1),
      entry('f1', 'flagship', 1),
    ]);
    expect(sorted.map((e) => e.id)).toEqual(['f1', 'f2', 's1', 's2']);
  });

  test('returns a new array', () => {
    const input = [entry('a', 'flagship', 1)];
    expect(sortWork(input)).not.toBe(input);
  });
});

describe('byTier', () => {
  test('filters and sorts one tier', () => {
    const result = byTier(
      [entry('s1', 'supporting', 1), entry('f2', 'flagship', 2), entry('f1', 'flagship', 1)],
      'flagship',
    );
    expect(result.map((e) => e.id)).toEqual(['f1', 'f2']);
  });
});

describe('STATUS_LABEL', () => {
  test('has a human label for every status', () => {
    expect(Object.keys(STATUS_LABEL).sort()).toEqual(['architecture', 'live', 'mvp', 'prototype']);
  });
});
