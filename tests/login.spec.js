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
    if(users.invalidUser.expected.type== "error"){
        await expect(page.getByTestId('error')).toHaveText(users.invalidUser.expected.message);
    }
})

test('Verify Login with lockedout user', async({page})=> {
    await lp.login(users.lockedUser.username, users.lockedUser.password);
    if(users.lockedUser.expected.type == 'locked'){
        await expect(page.getByTestId('error')).toHaveText(users.lockedUser.expected.message);
    }
})

test("Verify login with empty username", async({page})=> {
    await lp.login(users.emptyuserName.username, users.emptyuserName.password);
     if(users.lockedUser.expected.type == 'error'){
        await expect(page.getByTestId('error')).toHaveText(users.emptyUserName.expected.message);
    }
})

test("Verify login with empty password", async({page})=> {

    await lp.login(users.emptyPassword.username, users.emptyPassword.password);
         if(users.lockedUser.expected.type == 'error'){
        await expect(page.getByTestId('error')).toHaveText(users.emptyPassword.expected.message);
    }

})