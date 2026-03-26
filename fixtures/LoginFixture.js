const invalidBase = require("@playwright/test")
const {loginpage, LoginPage} = require("../pages/LoginPage")
const {inventory, Inventory} = require ("../pages/Inventory")

exports.test= invalidBase.test.extend({

    invalidLogin: async({page}, use)=>{
        loginpage = new LoginPage(page);
        inventory = new Inventory(page);

        await use({loginpage, inventory, page});

    }
})