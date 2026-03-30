const { test: base, expect } = require('@playwright/test');
const {LoginPage} = require("../pages/LoginPage")
const {Inventory} = require ("../pages/Inventory")
const users = require('../test-data/users.json')

exports.test = base.test.extend ({
    inventoryPage : async({page}, use)=>{

        const loginPage = new LoginPage(page);
        const inventoryPage = new Inventory(page);
        console.log("navigating to url....")
        await loginPage.navigate('https://www.saucedemo.com/');
        console.log("Entering Credentials")
        await loginPage.login(users.validUser.username, users.validUser.password);
        console.log("before usage")
        await use(inventoryPage);
        console.log("after login")
    }
})
    exports.expect = expect;