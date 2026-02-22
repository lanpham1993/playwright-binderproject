import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),

  reporter: process.env.CI
    ? [['html'], ['junit', { outputFile: 'results.xml' }]]
    : [['html']],

  use: {
    storageState: 'playwright/.auth/user.json',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
});

