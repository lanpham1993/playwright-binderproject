import { Page, expect, Locator } from '@playwright/test';
import { Navbar } from '../components/navbar.component';

export class BasePage {
  readonly navbar: Navbar;
  readonly msgConfirmation: Locator;

  constructor(protected page: Page) {
    this.navbar = new Navbar(page);
    this.msgConfirmation = page.locator('.content');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
 async verifyMessage(expectedMessage: string) {
    await expect(this.msgConfirmation).toHaveText(expectedMessage);
  }

  async checkPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }
}