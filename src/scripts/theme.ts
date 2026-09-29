/**
 * The theme switch. The choice is stored per visitor; until one is made, the system decides.
 * The pre-paint script in Base.astro applies a stored choice before first render.
 */
const STORAGE_KEY = 'theme';
const root = document.documentElement;
const button = document.getElementById('theme-switch');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

type Theme = 'light' | 'dark';

function isDark(): boolean {
  const chosen = root.dataset.theme;
  return chosen ? chosen === 'dark' : systemDark.matches;
}

function render(): void {
  button?.setAttribute('aria-checked', String(isDark()));
}

function choose(theme: Theme): void {
  root.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the choice still applies to this page.
  }
  render();
}

button?.addEventListener('click', () => choose(isDark() ? 'light' : 'dark'));
systemDark.addEventListener('change', render);
render();

// A module, so its names stay private to this file.
export {};
