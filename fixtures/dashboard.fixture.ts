import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('https://stg.binder.education/org/myportal');
    await page.waitForLoadState('networkidle');
    await use(page);
  },
});