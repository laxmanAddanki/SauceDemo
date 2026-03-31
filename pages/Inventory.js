const {BasePage} = require('./BasePage')

class Inventory extends BasePage{

    constructor(page){
        super(page);
       this.products = page.locator(".inventory_item"); 

    }
    
    async getProductNames(){
        const productCount = await this.products.count();
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

    async addProductsByIndex(index){
        const currentProduct = this.products.nth(index);
        await currentProduct.getByRole('button', {name: /add to cart/i}).click();
    }

    async removeFirstProductFromCart(){
        await this.page.locator('.shopping_cart_link').click();
        const firstCartItem = this.page.locator('.cart_item').first();
        await firstCartItem.getByRole('button', {name: /remove/i}).click();
    }
    async goToCart(){
       const cartIcon =  this.page.locator('.shopping_cart_link');
        await cartIcon.click();
    }

    async sortBy(option){
        const sortByOption = this.page.locator(".product_sort_container");
        await sortByOption.selectOption(option);
    }

    async getProductPrices(){
        const productPrice = await this.products.count();
        let productPrices =[];
        for (let i=0; i<productPrice; i++){
            const currentProduct = this.products.nth(i);
            const productPrice = await currentProduct.locator('.inventory_item_price').textContent() || "";
            productPrices.push(productPrice);
        }
        return productPrices;
    }
}       

module.exports= {Inventory}