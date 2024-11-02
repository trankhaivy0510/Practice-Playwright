import { Page } from "@playwright/test";

export class NavigationPage {
    readonly page:Page;

    constructor(page: Page){
        this.page = page;
    }

    async gotoFormMenu() {
        await this.selectGroupItem('Forms');
        await this.page.getByText('Form Layouts').click();
      }
    async inputField(){
        await this.selectGroupItem('Forms');
        await this.page.getByText('Form Layouts').click();
    }
    async datePicker(){
        await this.selectGroupItem('Forms');
        await this.page.getByText('Datepicker').click();
    }

    private async selectGroupItem(groupItem: string){
        const groupMenuItem = this.page.getByTitle(groupItem);
        const expandedState = await groupMenuItem.getAttribute('aria-expanded');
        if(expandedState=="false"){
            await groupMenuItem.click();
        }
    }
}

