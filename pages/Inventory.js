const {BasePage} = require('./BasePage')

class Inventory extends BasePage{

    constructor(page){
        super(page);
        this.products = page.locator(".inventory_item");

    }
    
    async getProductNames(){
        const productCount= await this.products.count();
        let names=[];
        for (let i=0; i<productCount; i++){
            const product = this.products.nth(i)
            const productName = await product.locator(".inventory_item_name").textContent();
            names.push(productName);
        }

        return names;
    }

    async getProductDescriptions(){
        const productCount= await this.products.count();
        let productDescriptions = []
        for (let i=0; i<productCount; i++){
            const product = this.products.nth(i)
            const productDescription = await product.getByTestId("inventory-item-desc").textContent();
            productDescriptions.push(productDescription);
        }
        return productDescriptions;
        
    }

    async addFirstProductToCart (){
            const firstProduct =    this.products.first();
            await firstProduct.getByRole('button', {name:/Add to cart/i}).click()
    }

    async removeProductFromCart(){
        await this.page.getByTestId("shopping-cart-link").click();
        const firstCartItem = this.page.locator('.cart_item').first();
        await firstCartItem.getByRole('button', {name: /Remove/i}).click();
    }
}

export{Inventory}