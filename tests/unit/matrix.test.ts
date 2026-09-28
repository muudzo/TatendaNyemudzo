import { describe, expect, test } from 'vitest';
import { buildMatrix } from '../../src/lib/matrix';

const primitives = [
  { id: 'a', name: 'A', note: '' },
  { id: 'b', name: 'B', note: '' },
  { id: 'c', name: 'C', note: '' },
] as const;

const projects = [
  { slug: 'p1', title: 'P1', primitives: ['a', 'b'] },
  { slug: 'p2', title: 'P2', primitives: ['b'] },
  { slug: 'p3', title: 'P3', primitives: ['b', 'a'] },
];

describe('buildMatrix', () => {
  test('marks each cell by whether the project uses the primitive', () => {
    const { rows } = buildMatrix(primitives, projects);
    const a = rows.find((r) => r.primitive.id === 'a');
    expect(a?.cells).toEqual([true, false, true]);
  });

  test('sorts rows by how many projects share the primitive, most shared first', () => {
    const { rows } = buildMatrix(primitives, projects);
    expect(rows.map((r) => r.primitive.id)).toEqual(['b', 'a']);
    expect(rows.map((r) => r.count)).toEqual([3, 2]);
  });

  test('drops primitives no project uses', () => {
    const { rows } = buildMatrix(primitives, projects);
    expect(rows.some((r) => r.primitive.id === 'c')).toBe(false);
  });

  test('keeps declaration order for ties', () => {
    const tied = [
      { slug: 'x', title: 'X', primitives: ['c', 'a'] },
    ];
    const { rows } = buildMatrix(primitives, tied);
    expect(rows.map((r) => r.primitive.id)).toEqual(['a', 'c']);
  });

  test('does not mutate its inputs', () => {
    const input = projects.map((p) => ({ ...p, primitives: [...p.primitives] }));
    const snapshot = JSON.stringify(input);
    buildMatrix(primitives, input);
    expect(JSON.stringify(input)).toBe(snapshot);
  });
});
