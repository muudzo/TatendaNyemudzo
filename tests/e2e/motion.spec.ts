import { expect, test, type Page } from '@playwright/test';

const PAGES = ['/', '/work/zimlivestock/', '/work/vaka/', '/work/investment-gamified/', '/about/'];
// Entrances are staggered; poll until they settle rather than guessing a fixed wait.
const SETTLE_TIMEOUT_MS = 10_000;

/** Scroll the whole page in half-viewport steps, optionally checking something at each stop. */
async function scrollThrough(page: Page, atEachStop?: () => Promise<void>): Promise<void> {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = page.viewportSize()?.height ?? 900;
  for (let y = 0; y <= height; y += step / 2) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
    await atEachStop?.();
  }
}

/**
 * Elements the motion script is still holding back inside the given share of the viewport, from
 * the top. Entrances fire as elements cross a line up to 25% above the bottom edge, so anything
 * above that band must never be waiting.
 */
const hiddenOnScreen = (page: Page, share = 1) =>
  page.evaluate(
    (limit) =>
      [...document.querySelectorAll('.is-pending')].filter((element) => {
        const { top, bottom } = element.getBoundingClientRect();
        return bottom > 0 && top < window.innerHeight * limit;
      }).length,
    share,
  );

const ABOVE_REVEAL_BAND = 0.7;

const runningAnimations = (page: Page) =>
  page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);

const hiddenByMotion = (page: Page) =>
  page.evaluate(() => document.querySelectorAll('.is-pending, .is-in').length);

test.describe('motion never withholds content', () => {
  for (const path of PAGES) {
    test(`${path}: nothing you can read is held back, including at the end of the page`, async ({ page }) => {
      await page.goto(path);
      await scrollThrough(page, () =>
        expect.poll(() => hiddenOnScreen(page, ABOVE_REVEAL_BAND), { timeout: SETTLE_TIMEOUT_MS }).toBe(0),
      );
      // No scroll is left at the bottom, so everything on screen there must be revealed.
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect.poll(() => hiddenOnScreen(page), { timeout: SETTLE_TIMEOUT_MS }).toBe(0);
    });
  }

  test('with reduced motion nothing animates and nothing is pending', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of PAGES) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      expect(await runningAnimations(page), path).toBe(0);
      expect(await hiddenByMotion(page), path).toBe(0);
    }
  });

  test('cutting the power settles every entrance immediately', async ({ page }) => {
    await page.goto('/work/vaka/');
    await page.getByRole('switch', { name: 'Power' }).click();
    // Let the brown-out transition itself finish.
    await page.waitForTimeout(1000);
    await scrollThrough(page);
    expect(await hiddenByMotion(page)).toBe(0);
    expect(await runningAnimations(page)).toBe(0);
  });

  test('without JavaScript every section is visible', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForTimeout(1000);
    for (const selector of ['.statement-text', '.work-feature', '.stamp', '.matrix-intro']) {
      await expect(page.locator(selector).first()).toBeVisible();
    }
    const opacity = await page
      .locator('.work-feature .feature-claim')
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe('1');
    await context.close();
  });
});
