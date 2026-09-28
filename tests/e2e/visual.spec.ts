import { expect, test } from '@playwright/test';

const BREAKPOINTS = [320, 768, 1024, 1440];
const SURFACES = [
  { name: 'home', path: '/' },
  { name: 'case', path: '/work/zimlivestock/' },
];

for (const scheme of ['light', 'dark'] as const) {
  for (const surface of SURFACES) {
    for (const width of BREAKPOINTS) {
      test(`${surface.name} ${scheme} ${width}px`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(surface.path);
        await page.evaluate(() => document.fonts.ready);
        await expect(page).toHaveScreenshot(`${surface.name}-${scheme}-${width}.png`);
      });
    }
  }
}

test('home with the power off', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.getByRole('switch', { name: 'Power' }).click();
  await expect(page).toHaveScreenshot('home-power-off-1440.png', {
    // The strip reports live byte counts, which vary slightly between runs.
    mask: [page.locator('#power-strip')],
  });
});
