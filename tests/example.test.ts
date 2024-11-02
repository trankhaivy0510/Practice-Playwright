import { test, expect } from '@playwright/test';

test.beforeEach('',async({page})=>{
  await page.goto('http://localhost:4200/');
})

test.describe('Test suite',() => {
  test('test case 1',async ({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.fill('input[type=email]','vylibra510@gmail.com');
  })

  test('test case 2',async ({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.locator('nb-card').nth(0).click();
  })

  test('test case 3 get parent element',async ({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.locator('nb-card').filter({hasText:'Using the Grid'}).locator('#inputEmail1').fill("abd");
    await page.locator('nb-card').filter({hasText:'Using the Grid'}).getByRole('button',{name:'Sign in'}).click();
    
    // -- locator('..') là một chỉ thị để di chuyển lên một cấp trong cây DOM, tức là lấy phần tử cha của phần tử hiện tại.
    // await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:'Email'}).click(); 

  })

  test('demo time out',async ({page})=>{
    await page.getByText('Forms').click({timeout:500});
    await page.getByText('Form Layouts').click();
    const buttonSuccess = page.getByText('Sign in');
    // await buttonSuccess.click({timeout:16000});
  })

});


