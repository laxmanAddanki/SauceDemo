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

    test('Add second product to cart', async({inventoryPage})=>{
        const productNames = await inventoryPage.getProductNames()
        const secondProductName =  productNames[1];
        expect(secondProductName).toBe("Sauce Labs Bike Light");
        await inventoryPage.addSecondProductToCart();
        const count = await inventoryPage.getCartCount();
        expect(count).toBe(1);
    })

    test('Add first product and remove the same product from cart', async({inventoryPage})=> {
        await inventoryPage.addFirstProductToCart();
        const count = await inventoryPage.getCartCount();
        expect(count).toBe(1)
        await inventoryPage.removeFirstProductFromCart();
        const countAfterProductRemoval = await inventoryPage.getCartCount()
        expect(countAfterProductRemoval).toBe(0);
    })

    test('Add both first & second product to the cart', async({inventoryPage})=>{
        await inventoryPage.addFirstProductToCart();
        await inventoryPage.addSecondProductToCart();
        const countAfterProductAddition = await inventoryPage.getCartCount();
        expect(countAfterProductAddition).toBe(2);
    })
    });