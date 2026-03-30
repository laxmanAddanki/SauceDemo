const { test: base, expect } = require('@playwright/test');
const {LoginPage} = require("../pages/LoginPage")
const {Inventory} = require ("../pages/Inventory")
const users = require('../test-data/users.json')

exports.test = base.test.extend ({
    inventoryPage : async({page}, use)=>{

        const loginPage = new LoginPage(page);
        const inventoryPage = new Inventory(page);

        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.login(users.validUser.username, users.validUser.password);

        await use(inventoryPage);
    }
})
    exports.expect = expect;