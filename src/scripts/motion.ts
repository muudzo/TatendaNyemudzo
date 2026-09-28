/**
 * Motion, used sparingly: rules are drawn, entries settle under them, stamps press, and each
 * diagram plays its system once as it comes into view.
 *
 * The markup declares order (data-seq), styles/motion.css owns the timing, and this script only
 * decides whether motion is allowed and when each element enters. Nothing is hidden unless this
 * script is about to reveal it: without JS, with reduced motion or with the power off, every
 * element renders in its final state.
 */

interface Entrance {
  selector: string;
  /** How far into the viewport the element must come before it enters. */
  rootMargin: string;
  /** Wait after entering, so an entry reads in order: rule and text, then diagram, then stamp. */
  delay: number;
  /** Extra wait for elements already on the first screen, so the page reads top to bottom. */
  firstScreenDelay: number;
}

const ENTRANCES: Entrance[] = [
  {
    selector: '.section-head, .prose h2, .work-feature, .work-row, .note, .principles > li, .path > li',
    rootMargin: '0px 0px -8% 0px',
    delay: 0,
    firstScreenDelay: 240,
  },
  // Systems play out once they are well into view, so the whole sequence is seen.
  { selector: '.plate, .matrix-table', rootMargin: '0px 0px -25% 0px', delay: 200, firstScreenDelay: 420 },
  // The status is stamped last, once the entry it belongs to has been read.
  { selector: '.stamp', rootMargin: '0px 0px -12% 0px', delay: 420, firstScreenDelay: 300 },
];

const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 6;
const PENDING = 'is-pending';
const ENTERING = 'is-in';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let observers: IntersectionObserver[] = [];

function motionAllowed(): boolean {
  return !reducedMotion.matches && root.dataset.power !== 'off' && 'IntersectionObserver' in window;
}

/** Once the page has painted, anything on screen has been seen and must not be hidden again. */
function hasPainted(): boolean {
  return performance.getEntriesByName('first-contentful-paint').length > 0;
}

function isOnScreen(element: Element): boolean {
  const { top, bottom } = element.getBoundingClientRect();
  return bottom > 0 && top < window.innerHeight;
}

/** Hand each step's position in its sequence to CSS, which turns it into a delay. */
function copySequence(element: HTMLElement): void {
  for (const step of element.querySelectorAll<HTMLElement>('[data-seq]')) {
    step.style.setProperty('--seq', step.dataset.seq ?? '0');
  }
}

function enter(element: HTMLElement, delay: number): void {
  element.style.setProperty('--delay', `${delay}ms`);
  element.classList.replace(PENDING, ENTERING);
  // When everything it started has finished, drop back to the plain static styles.
  const running = element.getAnimations({ subtree: true }).map((animation) => animation.finished);
  Promise.allSettled(running).then(() => element.classList.remove(ENTERING));
}

function watch({ rootMargin, delay, firstScreenDelay }: Entrance, targets: HTMLElement[]): void {
  let offset = delay + firstScreenDelay;
  const observer = new IntersectionObserver(
    (entries) => {
      const arriving = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target);
      arriving.forEach((target, index) => {
        observer.unobserve(target);
        enter(target as HTMLElement, offset + Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS);
      });
      // Only the first report describes the first screen.
      offset = delay;
    },
    { rootMargin },
  );
  for (const target of targets) {
    copySequence(target);
    target.classList.add(PENDING);
    observer.observe(target);
  }
  observers = [...observers, observer];
}

/** Put every element in its final state and stop watching. Used when motion stops being welcome. */
function settle(): void {
  observers.forEach((observer) => observer.disconnect());
  observers = [];
  root.classList.add('motion-settled');
  for (const element of document.querySelectorAll(`.${PENDING}, .${ENTERING}`)) {
    element.classList.remove(PENDING, ENTERING);
  }
}

function arm(): void {
  const painted = hasPainted();
  // Read every position first, then write, so the page is laid out once.
  const plans = ENTRANCES.map((entrance) => {
    const all = [...document.querySelectorAll<HTMLElement>(entrance.selector)];
    return { entrance, targets: painted ? all.filter((element) => !isOnScreen(element)) : all };
  });
  for (const { entrance, targets } of plans) {
    if (targets.length) watch(entrance, targets);
  }
}

function onPowerChange(): void {
  settle();
  // The lamp flickers back on when the power returns.
  root.classList.toggle('power-returning', root.dataset.power !== 'off');
}

if (motionAllowed()) arm();
new MutationObserver(onPowerChange).observe(root, { attributeFilter: ['data-power'] });
reducedMotion.addEventListener('change', settle);
