import { test } from '../../fixtures/dashboard.fixture';
import { ClassesPage } from '../../pages/classes.page';

test('create a class successfully', async ({ page }) => {
  const classesPage = new ClassesPage(page);
  await classesPage.navbar.selectMenuItem('Classroom/Subject Management');
  await classesPage.createClass({classCode:'CREATE-newClass',academicYear:'2025-2026', subject:'Technology', leadTeacher:'Hanh Nguyen Nguyen - Hanhcode', term:'Term 1'});
  await classesPage.verifyClass('CREATE-newClass', 'visible');
});

test('edit selected class successfully', async ({ page }) => {
  const classesPage = new ClassesPage(page);
  await classesPage.navbar.selectMenuItem('Classroom/Subject Management');
  await classesPage.filterAcademicYear('2025-2026');
  await classesPage.editClass('CREATE-newClass',{classCode:'EDIT-newClass',desc:'Updated Description'});
  await classesPage.verifyClass('EDIT-newClass', 'visible');
});

test('delete selected class successfully', async ({ page }) => {
  const classesPage = new ClassesPage(page);
  await classesPage.navbar.selectMenuItem('Classroom/Subject Management');
  await classesPage.deleteClass('EDIT-newClass', '2025-2026');
  await classesPage.verifyClass('EDIT-newClass', 'hidden');
});