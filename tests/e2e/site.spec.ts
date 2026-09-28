import { expect, test, type Page } from '@playwright/test';

const PAGES = [
  '/',
  '/about/',
  '/this-site/',
  '/work/zimlivestock/',
  '/work/vaka/',
  '/work/investment-gamified/',
  '/work/smartrail/',
  '/work/bigmama/',
  '/work/moometrics/',
  '/work/clearledger/',
];

const FLAGSHIPS = ['zimlivestock', 'vaka', 'investment-gamified'];
const WIDTHS = [320, 375, 768, 1024, 1440, 1920];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test.describe('every page', () => {
  for (const path of PAGES) {
    test(`${path} renders with no console or CSP errors`, async ({ page }) => {
      const errors = collectErrors(page);
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await page.waitForLoadState('networkidle');
      expect(errors).toEqual([]);
    });
  }

  test('has no horizontal overflow at any breakpoint', async ({ page }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of PAGES) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0);
      }
    }
  });
});

test.describe('homepage', () => {
  test('shows who, what, and the first project within the first screen on a laptop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('I design systems');
    await expect(page.locator('#feature-zimlivestock')).toBeInViewport();
  });

  test('links every flagship to its case study', async ({ page }) => {
    await page.goto('/');
    for (const slug of FLAGSHIPS) {
      await expect(page.locator(`a[href="/work/${slug}/"]`).first()).toBeVisible();
    }
  });
});

test.describe('case studies', () => {
  for (const slug of FLAGSHIPS) {
    test(`${slug} has all eight sections in order`, async ({ page }) => {
      await page.goto(`/work/${slug}/`);
      await expect(page.locator('.prose h2')).toHaveText([
        'Context',
        'Problem',
        'Thinking',
        'Design',
        'Build',
        'Iteration',
        'Result',
        'Reflection',
      ]);
    });
  }

  test('every diagram has a written twin for screen readers', async ({ page }) => {
    for (const slug of FLAGSHIPS) {
      await page.goto(`/work/${slug}/`);
      const plates = page.locator('figure.plate');
      const count = await plates.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(plates.nth(i).locator('.plate-visual')).toHaveAttribute('aria-hidden', 'true');
        await expect(plates.nth(i).locator('.plate-text')).not.toBeEmpty();
      }
    }
  });
});

test.describe('power switch', () => {
  test('cuts the power, reports the saving, and remembers the choice', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const power = page.getByRole('switch', { name: 'Power' });
    await expect(power).toHaveAttribute('aria-checked', 'true');

    await power.click();
    await expect(page.locator('html')).toHaveAttribute('data-power', 'off');
    await expect(power).toHaveAttribute('aria-checked', 'false');
    await expect(page.locator('#power-strip')).toContainText('Reading it needs');
    await expect(page.locator('.plate-visual').first()).toBeHidden();
    await expect(page.locator('.plate-text').first()).toBeVisible();

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-power', 'off');

    await page.getByRole('switch', { name: 'Power' }).click();
    await expect(page.locator('html')).not.toHaveAttribute('data-power', 'off');
    await expect(page.locator('#power-strip')).toBeHidden();
  });

  test('is operable from the keyboard', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('switch', { name: 'Power' }).focus();
    await page.keyboard.press('Space');
    await expect(page.locator('html')).toHaveAttribute('data-power', 'off');
  });

  test('starts off for Save-Data visitors and never downloads fonts', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', { value: { saveData: true }, configurable: true });
    });
    const fontRequests: string[] = [];
    page.on('request', (request) => {
      if (/\.woff2?(\?|$)/.test(request.url())) fontRequests.push(request.url());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('html')).toHaveAttribute('data-power', 'off');
    await expect(page.locator('#power-strip')).toContainText('asked to save data');
    expect(fontRequests).toEqual([]);
  });

  test('works with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('switch', { name: 'Power' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-power', 'off');
  });
});

test.describe('keyboard and landmarks', () => {
  test('the first tab stop is the skip link, and it moves focus to main', async ({ page, browserName }) => {
    await page.goto('/');
    // Safari only tabs to links with Option held, unless the user changes a system setting.
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('marks the current page in the navigation', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
