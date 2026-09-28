/**
 * The building blocks that keep reappearing across projects, regardless of stack.
 * Each case study declares which of these it uses; the homepage matrix is derived from that.
 */
export const PRIMITIVE_IDS = [
  'field-research',
  'offline-first',
  'idempotency',
  'audit-log',
  'gated-money',
  'honest-scope',
  'fail-closed',
] as const;

export type PrimitiveId = (typeof PRIMITIVE_IDS)[number];

export interface Primitive {
  readonly id: PrimitiveId;
  readonly name: string;
  readonly note: string;
}

export const PRIMITIVES: readonly Primitive[] = [
  {
    id: 'field-research',
    name: 'Go and look first',
    note: 'Field visits, process mapping and sourced research before any screen is drawn.',
  },
  {
    id: 'offline-first',
    name: 'Works without the network',
    note: 'Writes queue locally and sync later. The system keeps working through outages and load-shedding.',
  },
  {
    id: 'idempotency',
    name: 'Exactly once',
    note: 'Idempotency keys, atomic procedures and row locks, so a retry or a double-tap never charges twice.',
  },
  {
    id: 'audit-log',
    name: 'Append-only record',
    note: 'Every state change leaves a trace nobody can quietly edit.',
  },
  {
    id: 'gated-money',
    name: 'Money moves on a rule',
    note: 'Escrow, stage gates and server-side settlement: value only moves when a condition is met.',
  },
  {
    id: 'honest-scope',
    name: 'Say what it can’t do',
    note: 'Kill criteria, non-goals, residual risks and allowed copy, all written down.',
  },
  {
    id: 'fail-closed',
    name: 'Fail closed',
    note: 'Missing config, weak secrets or broken invariants stop the build rather than ship quietly.',
  },
];
