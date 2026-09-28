/**
 * Real resilience, not just the simulation: a service worker keeps every page you open
 * readable offline, and the masthead says so when the network drops.
 */
const strip = document.getElementById('network-strip');
const stripText = strip?.querySelector('p');

const OFFLINE_MESSAGE =
  'You’re offline. Pages you’ve opened are saved on this device, so you can keep reading.';

function renderNetwork(): void {
  if (!strip || !stripText) return;
  strip.hidden = navigator.onLine;
  if (!navigator.onLine) stripText.textContent = OFFLINE_MESSAGE;
}

window.addEventListener('online', renderNetwork);
window.addEventListener('offline', renderNetwork);
renderNetwork();

function shouldWarmCache(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return document.documentElement.dataset.power !== 'off' && !connection?.saveData;
}

function internalPages(): string[] {
  const urls = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')]
    .map((anchor) => new URL(anchor.href, location.origin))
    .filter((url) => url.origin === location.origin && !url.pathname.startsWith('/v1/'))
    .map((url) => url.pathname);
  return [...new Set(urls)];
}

async function register(): Promise<void> {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    if (!shouldWarmCache()) return;
    // Save the pages this one links to while the browser is idle, so they work offline later.
    const warm = () => registration.active?.postMessage({ type: 'warm', urls: internalPages() });
    if ('requestIdleCallback' in window) window.requestIdleCallback(warm, { timeout: 5000 });
    else setTimeout(warm, 3000);
  } catch (error) {
    console.warn('Offline support unavailable:', error);
  }
}

window.addEventListener('load', register, { once: true });
