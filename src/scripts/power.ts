import { formatKB, summariseWeight } from '../lib/weight';

const STORAGE_KEY = 'power';
const root = document.documentElement;
const button = document.getElementById('power-switch');
const strip = document.getElementById('power-strip');
const stripText = strip?.querySelector('p');

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

function isOn(): boolean {
  return root.dataset.power !== 'off';
}

function measure() {
  const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  const documentBytes = navigation ? navigation.encodedBodySize || navigation.transferSize : 0;
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  return summariseWeight(documentBytes, resources);
}

function describeOff(): string {
  const { total, essential, byKind } = measure();
  // No font bytes means the page never had the power on during this visit.
  const startedOff = byKind.font === 0;
  const intro =
    root.dataset.powerReason === 'save-data'
      ? 'Your browser asked to save data, so this page started with the power off.'
      : 'Load-shedding.';
  const detail = startedOff
    ? `Web fonts, colour and diagrams stay unloaded; every diagram is shown as text. This visit has used ${formatKB(total)} so far.`
    : `Web fonts, colour and diagrams are off; every diagram is shown as text. This page loaded ${formatKB(total)}. Reading it needs ${formatKB(essential)}.`;
  return `${intro} ${detail}`;
}

function render(): void {
  const on = isOn();
  button?.setAttribute('aria-checked', String(on));
  if (!strip || !stripText) return;
  strip.hidden = on;
  if (!on) stripText.textContent = describeOff();
}

function persist(on: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
  } catch {
    // Storage can be blocked (private mode); the switch still works for this page.
  }
}

function setPower(on: boolean): void {
  if (on) delete root.dataset.power;
  else root.dataset.power = 'off';
  delete root.dataset.powerReason;
  persist(on);
  render();
}

function toggle(): void {
  const next = !isOn();
  const doc = document as ViewTransitionDocument;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!doc.startViewTransition || reduceMotion) {
    setPower(next);
    return;
  }

  root.classList.add(next ? 'power-restoring' : 'power-cutting');
  doc
    .startViewTransition(() => setPower(next))
    .finished.finally(() => root.classList.remove('power-restoring', 'power-cutting'));
}

button?.addEventListener('click', toggle);

// Measure once everything the page asked for has arrived.
if (document.readyState === 'complete') render();
else window.addEventListener('load', render, { once: true });
render();
