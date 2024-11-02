import { test, expect } from '@playwright/test';
import {NavigationPage} from '../page-objects/navigationPage';
import {FormLayoutsPage} from '../page-objects/formLayoutsPage';

test.beforeEach('', async ({ page }) => {
    await page.goto('http://localhost:4200/');
  })

test('First use Page Object',async ({page})=>{
    const navigateTo = new NavigationPage(page);
    const formLayoutsPage = new FormLayoutsPage(page);
    await navigateTo.gotoFormMenu();
    await formLayoutsPage.submitUsingTheGridForm('vytran@gmail.com','12345','Option 1');
})