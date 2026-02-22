import { chromium, FullConfig, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

const authFile = '.auth/user.json';

async function globalSetup(config: FullConfig) {
    console.log('🚀 globalSetup started'  );
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.ADA_USERNAME!, process.env.PASSWORD!);
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: authFile });

  await browser.close()
};
export default globalSetup;