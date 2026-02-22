import { Page, Locator, expect } from '@playwright/test';

export class Navbar {
  readonly megaMenuIcon: Locator;
  //readonly classManagementMenuItem: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.megaMenuIcon = page.locator('.icon-mega-menu')
  }

  

  async selectMenuItem(name: string) {
    await this.megaMenuIcon.click({ timeout: 15000 });
    await this.page.getByText(name).click();
    await this.page.waitForLoadState('networkidle');
  }


}