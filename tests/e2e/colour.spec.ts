import { expect, test, type Page } from '@playwright/test';

/** WCAG 2.2 minimums: 4.5:1 for normal text, 3:1 for large text and UI marks. */
const TEXT = 4.5;
const LARGE = 3;

interface Pair {
  name: string;
  scope: string;
  fg: string;
  bg: string;
  min: number;
}

const PAIRS: Pair[] = [
  { name: 'body text', scope: ':root', fg: '--ink', bg: '--paper', min: TEXT },
  { name: 'secondary text', scope: ':root', fg: '--ink-soft', bg: '--paper', min: TEXT },
  { name: 'faint text (years, numerals)', scope: ':root', fg: '--ink-faint', bg: '--paper', min: TEXT },
  { name: 'signal colour as text (stamps, links)', scope: ':root', fg: '--stamp', bg: '--paper', min: TEXT },
  { name: 'text inside a solid stamp', scope: ':root', fg: '--paper', bg: '--stamp', min: TEXT },
  { name: 'highlighted statement line', scope: ':root', fg: '--marker-ink', bg: '--paper', min: TEXT },
  { name: 'text on a cobalt panel', scope: '.plate', fg: '--panel-ink', bg: '--panel', min: TEXT },
  { name: 'captions on a panel', scope: '.plate', fg: '--panel-ink-soft', bg: '--panel', min: TEXT },
  { name: 'signal marks on a panel', scope: '.plate', fg: '--panel-signal', bg: '--panel', min: TEXT },
  { name: 'faint marks on a panel', scope: '.plate', fg: '--panel-ink-faint', bg: '--panel', min: LARGE },
];

/** Resolve two token colours to sRGB in the browser (via canvas) and return their contrast ratio. */
function contrast(page: Page, pair: Pair): Promise<number> {
  return page.evaluate(({ scope, fg, bg }) => {
    const element = scope === ':root' ? document.documentElement : document.querySelector(scope);
    if (!element) throw new Error(`No element for ${scope}`);
    const style = getComputedStyle(element);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) throw new Error('No canvas');

    const luminance = (token: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = style.getPropertyValue(token).trim();
      context.fillRect(0, 0, 1, 1);
      const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((value) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
    return (light + 0.05) / (dark + 0.05);
  }, pair);
}

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`${scheme} mode contrast`, () => {
    for (const pair of PAIRS) {
      test(`${pair.name} meets ${pair.min}:1`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto('/');
        expect(await contrast(page, pair)).toBeGreaterThanOrEqual(pair.min);
      });
    }
  });
}

test.describe('theme switch', () => {
  test('switches mode, remembers it, and overrides the system', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const toggle = page.getByRole('switch', { name: 'Dark mode' });
    await expect(toggle).toHaveAttribute('aria-checked', 'false');

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.getByRole('switch', { name: 'Dark mode' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('follows the system until a choice is made', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.getByRole('switch', { name: 'Dark mode' })).toHaveAttribute('aria-checked', 'true');
  });
});
