import { test, expect } from '@playwright/test';
import { delay } from 'rxjs-compat/operator/delay';

test.beforeEach('', async ({ page }) => {
  await page.goto('http://localhost:4200/');
})

test.describe('Test with UI component', () => {
  test('Input field', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    // await page.locator('#inputEmail1').fill("heloo");
    await page.locator('#inputEmail1').pressSequentially('email@gmail.com', { delay: 100 });
  })

  test('Radio button', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    const usingTheGrid = page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingTheGrid.getByLabel('Option 1').check({ force: true });
  })

  test('Checkbox', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    const checkBox1 = page.getByRole('checkbox', { name: 'Hide on click' });
    // await checkBox1.check({force:true});
    // await checkBox1.uncheck({force:true});
    const allBox = page.getByRole('checkbox');
    for (const box of await allBox.all()) {
      await box.click({ force: true });
      // expect(await box.isChecked()).toBeFalsy();
    }
  })

  test('Dropdownlist', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    const list = page.locator('nb-option-list nb-option');
    await expect(list).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await list.filter({ hasText: 'Cosmic' }).click();
    const backgroundHeader = page.locator('nb-layout-header');
    await expect(backgroundHeader).toHaveCSS('background-color', 'rgb(50, 50, 89)');
    const colors = {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)"
    }

    for (const color in colors) {
      await dropDownMenu.click();
      await list.filter({ hasText: color }).click();
      await expect(backgroundHeader).toHaveCSS('background-color', colors[color]);
    }
  })

  test('Tooltip', async ({ page }) => {
    // Các debug web là F8+click chuột để giữ lại xem tooltip
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
    const toolTip = page.locator('nb-card', { hasText: 'Tooltip Placements' });
    await toolTip.getByRole("button", { name: 'Top' }).hover();
    const toolTipContent = page.locator('nb-tooltip');
    await expect(toolTipContent).toHaveText('This is a tooltip');
  })

  test('Dialog', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();


    page.on('dialog', async dialog => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?');
      await dialog.accept();
    })

    const elementNeedToDelete = page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' });
    await elementNeedToDelete.locator('.nb-trash').click();


  })

  test('Web table 1', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    const buttonEdit = page.getByRole('row', { name: '3' }).filter({ has: page.locator('td').nth(1).getByText('3') });
    await buttonEdit.locator('.nb-edit').click();
    // const buttonEdit = page.locator('.nb-edit').first().click();
    const inputEdit = page.locator('input-editor').getByPlaceholder('E-mail');
    await inputEdit.clear();
    await inputEdit.fill('vytran@gmail.com');
    await page.locator('.nb-checkmark').click();
  })

  test('Web table 2', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    const searchFilter = page.locator('input-filter').getByPlaceholder('Age');

    const ageList = page.locator('tbody tr');

    const ages = ["20", "30", "40"];

    for (let age of await ages) {
      await searchFilter.clear();
      await searchFilter.fill(age);
      await page.waitForTimeout(500);

      for (let row of await ageList.all()) {
        const value = await row.locator('td').last().textContent();
        expect(value).toEqual(age);
      }

    }
  })

  test('Datepicker', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const inputCalendar = page.getByPlaceholder('Form Picker')
    await inputCalendar.click();

    let date = new Date();
    date.setDate(date.getDate()+100);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US',{month:'short'});
    const expectedMonthLong = date.toLocaleString('En-US',{month:'long'});
    const expectedYear = date.getFullYear().toString();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    const dateToAssert1 = `${expectedMonthLong} ${expectedYear}`;

    let viewMode = await page.locator('nb-calendar-view-mode').textContent();

    while(!viewMode.includes(dateToAssert1)){
      await page.locator('nb-calendar-pageable-navigation [ng-reflect-icon="chevron-right-outline"]').click();
      viewMode = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click();
    await expect(inputCalendar).toHaveValue(dateToAssert);

  })

  test('Slides',async ({page})=>{
    const tempBox = page.locator('[tabtitle=Temperature] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    const x = box.x + box.width /2;
    const y = box.y + box.height /2;
    await page.mouse.move(x,y);
    await page.mouse.down();
    await page.mouse.move(x+100,y);
    await page.mouse.move(x+100,y+100);
    await page.mouse.up()
  })
})