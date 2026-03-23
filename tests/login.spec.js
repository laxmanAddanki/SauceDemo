const {LoginPage} = require('../pages/LoginPage')
const {test, expect} = require('@playwright/test')
const users = require('../test-data/users.json')

let lp;

test.beforeEach("Navigate to Sauce Labs", async({page})=> {
    lp = new LoginPage(page);
    await lp.navigate('https://www.saucedemo.com/');
})

test('Verify Login with Valid username and password', async({page}) =>{
    await lp.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory.html/);
})

test('Verify login with invalid username and password', async({page})=> {
    await lp.login(users.invalidUser.username, users.invalidUser.password);
    await expect(page.getByTestId('error')).toContainText("Username and password do not match any user in this service");
})

test('Verify Login with lockedout user', async({page})=> {
    await lp.login(users.lockedUser.username, users.lockedUser.password);
    await expect(page.getByTestId('error')).toContainText('Sorry, this user has been locked out.');
})

test("Verify login with empty username", async({page})=> {
    await lp.login(users.emptyuserName.username, users.emptyuserName.password);
    await expect(page.getByTestId('error')).toContainText(/Epic sadface/);
})

test("Verify login with empty password", async({page})=> {

    await lp.login(users.emptyPassword.username, users.emptyPassword.password);
    await expect(page.getByTestId('error')).toHaveText("Epic sadface: Password is required");

})