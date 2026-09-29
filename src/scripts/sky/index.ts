/**
 * The sky is part of having the power on. The renderer is a separate file, downloaded only once the
 * page has loaded and only while the power is on; cutting the power puts the stars out.
 */
import type { Sky } from './scene';

const root = document.documentElement;
let sky: Sky | null = null;
let loading = false;

function powerIsOn(): boolean {
  return root.dataset.power !== 'off';
}

async function sync(): Promise<void> {
  if (!powerIsOn()) {
    sky?.stop();
    sky = null;
    return;
  }
  if (sky || loading) return;
  loading = true;
  try {
    const { startSky } = await import('./scene');
    // The power may have been cut while the renderer was on its way.
    if (powerIsOn()) sky = startSky();
  } catch {
    // Offline with the renderer not cached yet: the page is complete without a sky. The next time
    // the power comes on, it tries again.
  } finally {
    loading = false;
  }
}

function syncSoon(): void {
  void sync();
}

// After load, so the sky never competes with the words for the first paint.
if (document.readyState === 'complete') syncSoon();
else window.addEventListener('load', syncSoon, { once: true });
new MutationObserver(syncSoon).observe(root, { attributeFilter: ['data-power'] });

export {};
