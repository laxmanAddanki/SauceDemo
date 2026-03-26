    const {test, expect} = require("../fixtures/LoggedInFixture")
    const users = require('../test-data/users.json')

    test.describe("Inventory Tests", () => {

    test('Verify product count', async({loggedInPage:{inventoryPage}})=> {
        const productNames = await inventoryPage.getProductNames();
        expect(productNames.length).toBe(6);
    })

    test('Add products to cart', async({loggedInPage: {inventoryPage, page}})=>{
        await inventoryPage.addFirstProductToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');  

    })

    test("Check number of products in cart", async({loggedInPage})=>{
        await loggedInPage.inventoryPage.addFirstProductToCart();
        const count = await loggedInPage.inventoryPage.getCartCount();
        expect(count).toBe(1);  
    })
    });