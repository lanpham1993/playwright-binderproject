import { Page, Locator, expect } from '@playwright/test';
import { Navbar } from '../components/navbar.component';
import { BasePage } from './base.page';
import { clear } from 'node:console';

export class ClassesPage extends BasePage {


  // Class list page 
  readonly newClassButton: Locator;
  readonly academicYearFilter: Locator;


  // create Form fields
  readonly createEditClassForm: Locator;
  readonly codeInput: Locator;
  readonly siteInput: Locator;
  readonly academicYearInput: Locator;
  readonly subjectInput: Locator;
  readonly leadTeacherInput: Locator;
  readonly termInput: Locator;
  readonly dropdownOptions: Locator;
  readonly dropDownOptionTerm: Locator;
  readonly classList: Locator;
  readonly saveNewClassButton: Locator;
  readonly descInput: Locator;
  readonly scheduleInput: Locator;
  readonly buildingInput: Locator;
  readonly roomInput: Locator;


  //table
  readonly codeFilter: Locator;
  readonly codeColumn: Locator;
  readonly deleteAction: Locator;
  readonly editAction: Locator;
  readonly viewAction: Locator;


  //delete popup
  readonly confirmDeleteTextBox: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.newClassButton = page.locator('.innos-ui-button-content', { hasText: 'Add Class' });
    this.academicYearFilter = page.locator('.innos-ui-select-selection-search-input').nth(1);


    this.createEditClassForm = page.locator('.innos-ui-modal-content');
    this.codeInput = page.locator('#code');
    this.siteInput = page.locator('#idSite');
    this.academicYearInput = page.locator('#idAcademicYear');
    this.subjectInput = page.locator('#idSubject');
    this.leadTeacherInput = page.locator('#idTeacher');
    this.termInput = page.locator('#idTerm');
    this.descInput = page.locator('textarea#description');
    this.scheduleInput = page.locator('#scheduleLayer');
    this.buildingInput = page.locator('#idBuilding');
    this.roomInput = page.locator('#idLocation');

    this.saveNewClassButton = page.locator('.innos-ui-button-content', { hasText: 'Save' });
    this.dropdownOptions = page.locator('.innos-ui-select-item-option-content');
    this.dropDownOptionTerm = page.locator('.term-name');
    this.classList = page.locator('.class-list-custom');

    this.viewAction = page.locator('button.custom-btn-action').nth(0);
    this.editAction = page.locator('button.custom-btn-action').nth(1);
    this.deleteAction = page.locator('button.custom-btn-action').nth(2);
    this.codeFilter = page.getByLabel('Code Filter Input');
    this.codeColumn = page.locator('.ag-react-container').nth(0);

    this.confirmDeleteTextBox = page.locator('#content');
    this.deleteButton = page.locator('.innos-ui-modal-footer .innos-ui-button-content', { hasText: 'Delete' });
  }


  async filldataClass({
    classCode,
    site,
    academicYear,
    subject,
    leadTeacher,
    term,
    desc = '',
    schedule = '',
    building = '',
    room = '',
  }: {
    classCode: string;
    site?: string;
    academicYear?: string;
    subject?: string;
    leadTeacher?: string;
    term?: string;
    desc?: string;
    schedule?: string;
    building?: string;
    room?: string;
  }) {
    await this.codeInput.fill(classCode);
    if (site) {
      await this.siteInput.click();
      await this.dropdownOptions.filter({ hasText: site }).click();
    }
    if (academicYear) {
      await this.academicYearInput.fill(academicYear);
      await this.dropdownOptions.filter({ hasText: academicYear }).click();
    }
    if (subject) {
      await this.subjectInput.fill(subject);
      await this.dropdownOptions.filter({ hasText: subject }).click();
    }
    if (leadTeacher) {
      await this.leadTeacherInput.click();
      await this.dropdownOptions.filter({ hasText: leadTeacher }).click();
    }
    if (term) {
      await this.termInput.click();
      await this.dropDownOptionTerm.filter({ hasText: term }).click();
    }

    if (desc) await this.descInput.fill(desc);
    if (schedule) {
      await this.scheduleInput.click();
      await this.scheduleInput.filter({ hasText: schedule }).click();
    }
    if (building) {
      await this.buildingInput.click();
      await this.dropdownOptions.filter({ hasText: building }).click();
    }
    if (room) {
      await this.roomInput.click();
      await this.roomInput.filter({ hasText: room }).click();
    }

    await this.saveNewClassButton.click();
    await this.page.waitForLoadState('networkidle');
    //await this.createEditClassForm.waitFor({ state: 'hidden' });
  }




  async filterAcademicYear(academicYear: string) {
    await this.academicYearFilter.waitFor({ state: 'visible' });
    await this.academicYearFilter.fill(academicYear);
    await this.dropdownOptions.filter({ hasText: academicYear }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyClass(classCode: string, mode: string) {
    await this.codeFilter.fill(classCode);
    if (mode === 'visible') {
      await expect(this.classList.filter({ hasText: classCode })).toBeVisible();
    } else if (mode === 'hidden') {
      await expect(this.classList.filter({ hasText: classCode })).toBeHidden();
    }
  }



  async createClass(data: {
    classCode: string;
    site?: string;
    academicYear?: string;
    subject?: string;
    leadTeacher?: string;
    term?: string;
    desc?: string;
    schedule?: string;
    building?: string;
    room?: string;
  }) {
    await this.newClassButton.click();
    await this.createEditClassForm.waitFor({ state: 'visible' });
    await this.filldataClass(data);
  }

  async editClass(theOldClassCode: string, data: {
    classCode: string;
    site?: string;
    academicYear: string;
    subject?: string;
    leadTeacher?: string;
    term?: string;
    desc?: string;
    schedule?: string;
    building?: string;
    room?: string;
  }) {
    await this.verifyClass(theOldClassCode, 'visible');
    await this.editAction.click();
    await this.createEditClassForm.waitFor({ state: 'visible' });
    await this.filldataClass(data);

  }
  async deleteClass(classCode: string, academicYear: string) {
    await this.filterAcademicYear(academicYear);
    await this.codeFilter.fill(classCode);
    await this.page.waitForLoadState('networkidle');
    await this.deleteAction.click();
    await this.confirmDeleteTextBox.waitFor({ state: 'visible' });
    await this.confirmDeleteTextBox.fill('CONFIRM');
    await this.deleteButton.click();
  }

}
