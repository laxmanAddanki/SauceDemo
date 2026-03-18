const {LoginPage} = require('../pages/LoginPage')
const {test, expect} = require('@playwright/test')

let lp;
test.beforeEach("Navigate to Sauce Labs", async({page})=> {
    lp = new LoginPage(page);
    await lp.navigate('https://www.saucedemo.com/');
})

test('Verify Login with Valid username and password', async({page}) =>{
    await lp.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
})

test('Verify login with invalid username and password', async({page})=> {
    await lp.login('laxman', 'secret_sauce');
    await expect(page.locator('h3')).toContainText("Username and password do not match any user in this service");
})

test('Verify Login with lockedout user', async({page})=> {
    await lp.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('h3')).toContainText('Sorry, this user has been locked out.');
})