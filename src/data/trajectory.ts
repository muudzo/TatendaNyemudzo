/**
 * The path, dated from repository history. Each step is a change in what kind of problem I could
 * take on, not a list of technologies.
 */
export interface Step {
  readonly when: string;
  readonly shift: string;
  readonly evidence: string;
  readonly href?: string;
}

export const TRAJECTORY: readonly Step[] = [
  {
    when: 'Late 2024',
    shift: 'Making pages',
    evidence: 'The Odin Project: recipes, a to-do list, a calculator.',
  },
  {
    when: '2025',
    shift: 'Making tools for real people',
    evidence: 'Farm Tracker, sites for small businesses, school payments. The agriculture and payments threads begin.',
  },
  {
    when: 'Late 2025 – Feb 2026',
    shift: 'Making money logic correct',
    evidence: 'Investment Gamified: race conditions, row locks, an audit ledger, written non-goals.',
    href: '/work/investment-gamified/',
  },
  {
    when: 'Mar – Apr 2026',
    shift: 'Research, product and production at once',
    evidence: 'Paynow internship. Auction field visits, a five-provider benchmark, a live PWA with CI that polices production.',
    href: '/work/zimlivestock/',
  },
  {
    when: 'Apr 2026',
    shift: 'Designing for adversaries',
    evidence: 'BIGMAMA$: a threat model, real browser crypto, a list of what the UI may claim.',
    href: '/work/bigmama/',
  },
  {
    when: 'Jun – Jul 2026',
    shift: 'Designing for institutions',
    evidence: 'Vaka for councils; SmartRail for a national railway. Rules enforced by the system, decisions recorded as ADRs.',
    href: '/work/vaka/',
  },
];
