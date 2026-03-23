const {test, expect} = require("@playwright/test")
const {landingPage} = require("../pages/Inventory")
const users = require('../test-data/users.json')
const {LoginPage} = require('../pages/LoginPage')

let inventoryPage;
let lp; 
test.describe.serial("serial tests", ()=>{
    test.beforeEach("Login", async({page})=>{
    inventoryPage = new landingPage(page);
    lp = new LoginPage(page);
    await inventoryPage.naviagte('https://www.saucedemo.com/');
    await inventoryPage.lp.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory/i);
    })
});
