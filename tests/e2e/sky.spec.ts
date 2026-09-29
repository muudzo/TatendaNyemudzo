import { expect, test, type Page } from '@playwright/test';

const SKY = 'canvas.sky';
const RENDERER = /\/_astro\/scene\.[\w-]+\.js$/;

/** Collect requests for the sky's renderer, which should only ever be fetched with the power on. */
function watchRenderer(page: Page): string[] {
  const requested: string[] = [];
  page.on('request', (request) => {
    if (RENDERER.test(new URL(request.url()).pathname)) requested.push(request.url());
  });
  return requested;
}

test.describe('the sky', () => {
  test('lights up behind the page once it has loaded, out of reach of readers and pointers', async ({ page }) => {
    await page.goto('/');
    const sky = page.locator(`${SKY}.is-lit`);
    await expect(sky).toHaveCount(1);
    await expect(sky).toHaveAttribute('aria-hidden', 'true');
    expect(await sky.evaluate((canvas) => getComputedStyle(canvas).pointerEvents)).toBe('none');
    expect(await sky.evaluate((canvas) => getComputedStyle(canvas).position)).toBe('fixed');
  });

  test('goes out when the power is cut, and comes back with it', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(SKY)).toHaveCount(1);
    const power = page.getByRole('switch', { name: 'Power' });

    await power.click();
    await expect(page.locator(SKY)).toHaveCount(0);

    await power.click();
    await expect(page.locator(`${SKY}.is-lit`)).toHaveCount(1);
  });

  test('is never downloaded when the page starts with the power off', async ({ page }) => {
    const requested = watchRenderer(page);
    await page.addInitScript(() => localStorage.setItem('power', 'off'));
    await page.goto('/');
    await page.waitForLoadState('load');
    await expect(page.locator(SKY)).toHaveCount(0);
    expect(requested).toEqual([]);
  });

  test('is fetched once, after the page has loaded', async ({ page }) => {
    const requested = watchRenderer(page);
    await page.goto('/');
    await expect(page.locator(`${SKY}.is-lit`)).toHaveCount(1);
    expect(requested).toHaveLength(1);
  });

  test('holds perfectly still with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const sky = page.locator(`${SKY}.is-lit`);
    await expect(sky).toHaveCount(1);
    const first = await sky.screenshot();
    await page.mouse.move(200, 200);
    await page.mouse.move(900, 500);
    // Deterministic: compare against itself after the pointer has moved and frames have passed.
    await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
    expect((await sky.screenshot()).equals(first)).toBe(true);
  });

  test('keeps a place for the planet on the homepage only', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-planet]')).toHaveCount(1);
    await page.goto('/work/zimlivestock/');
    await expect(page.locator('[data-planet]')).toHaveCount(0);
    await expect(page.locator(`${SKY}.is-lit`)).toHaveCount(1);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('there is no sky, and nothing is missing', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(SKY)).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
