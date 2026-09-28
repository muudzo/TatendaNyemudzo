type Tier = 'flagship' | 'supporting';
export type Status = 'live' | 'prototype' | 'architecture' | 'mvp';

interface Sortable {
  readonly id: string;
  readonly data: { readonly tier: Tier; readonly order: number };
}

const TIER_RANK: Record<Tier, number> = { flagship: 0, supporting: 1 };

export const STATUS_LABEL: Record<Status, string> = {
  live: 'Live',
  prototype: 'Working prototype',
  mvp: 'Behaviour-test MVP',
  architecture: 'Architecture, no code yet',
};

export function sortWork<T extends Sortable>(entries: readonly T[]): T[] {
  return [...entries].sort(
    (a, b) => TIER_RANK[a.data.tier] - TIER_RANK[b.data.tier] || a.data.order - b.data.order,
  );
}

export function byTier<T extends Sortable>(entries: readonly T[], tier: Tier): T[] {
  return sortWork(entries.filter((entry) => entry.data.tier === tier));
}
