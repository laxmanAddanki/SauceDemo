    const {test, expect} = require("../fixtures/LoggedInFixture")
    

    test.describe("Inventory Tests", () => {


    test('Verify product count', async({inventoryPage})=> {
        const productNames = await inventoryPage.getProductNames();
        expect(productNames.length).toBe(6);
    })
    test("Check number of products in cart", async({inventoryPage})=>{
        await inventoryPage.addFirstProductToCart();
        const count = await inventoryPage.getCartCount();
        expect(count).toBe(1);  
    })
    test('Navigate to Cart', async({inventoryPage, page})=>{
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/cart.html/);

    })
    });