import {test, expect} from '@playwright/test';
 
test("Veify the fucntinality using assertions", async({page}) => {
await page.goto('https://applitools.com/');
let text = page.getByText("The Kitchen")
await expect(text).toHaveText("The Kitchen");

});