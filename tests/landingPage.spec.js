    const {test, expect} = require("../fixtures/LoggedInFixture")
    

    test.describe("Inventory Tests", () => {

    test('Verify product count', async({inventoryPage})=> {
        const productNames = await inventoryPage.getProductNames();
        expect(productNames.length).toBe(6);
    })
    test("Check number of products in cart", async({inventoryPage})=>{
        await inventoryPage.addProductsByIndex(0);
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
        await inventoryPage.addProductsByIndex(2);
        const count = await inventoryPage.getCartCount();
        expect(count).toBe(1);
    })

    test('Add first product and remove the same product from cart', async({inventoryPage})=> {
        await inventoryPage.addProductsByIndex(0);
        const count = await inventoryPage.getCartCount();
        expect(count).toBe(1)
        await inventoryPage.removeFirstProductFromCart();
        const countAfterProductRemoval = await inventoryPage.getCartCount()
        expect(countAfterProductRemoval).toBe(0);
    })

    test('Add both first & second product to the cart', async({inventoryPage})=>{
        await inventoryPage.addProductsByIndex(0);
        await inventoryPage.addProductsByIndex(1);
        const countAfterProductAddition = await inventoryPage.getCartCount();
        expect(countAfterProductAddition).toBe(2);
    })

    test('Sort products in descending order and check first product Name', async({inventoryPage})=>{
        await inventoryPage.sortBy("za");
        const firstProductName = await inventoryPage.getProductNames();
        expect (firstProductName[0]).toBe("Test.allTheThings() T-Shirt (Red)");
    })

    test("Sort By Price from Low to High and check the prices", async({inventoryPage})=>{
        await inventoryPage.sortBy("lohi");
        const productPrices = await inventoryPage.getProductPrices();
        console.log(productPrices);
        //expect(productPrices).toBe(6);
        expect(productPrices[0]).toBe("$7.99");
        expect(productPrices[1]).toBe("$9.99");
    })

    test.only("Sort the Price from High to Low anc check the prices", async({inventoryPage})=>{
        await inventoryPage.sortBy("hilo");
        const productPrices = await inventoryPage.getProductPrices();
        expect(productPrices[0]).toBe("$49.99");
        expect(productPrices[1]).toBe("$29.99");


    })
    });