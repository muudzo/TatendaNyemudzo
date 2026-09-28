import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;
// Set BASE_URL to test a deployed site instead of a local build, e.g. BASE_URL=https://… npm run test:e2e
const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: BASE_URL ?? `http://localhost:${PORT}` },
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  webServer: BASE_URL
    ? undefined
    : {
        command: `npx astro build && npx astro preview --port ${PORT} --ignore-lock`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /visual/ },
  ],
});
