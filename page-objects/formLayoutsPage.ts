import { Page } from "@playwright/test";

export class FormLayoutsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async submitUsingTheGridForm(email: string, password: string,optionText: string) {
        const gridForm = await this.page.locator('nb-card',{hasText:'Using the Grid'});
        await gridForm.getByRole('textbox',{name:'Email'}).fill(email);
        await gridForm.getByRole('textbox',{name:'Password'}).fill(password);
        await gridForm.getByRole('radio',{name: optionText}).check({force:true});
    }
}   

