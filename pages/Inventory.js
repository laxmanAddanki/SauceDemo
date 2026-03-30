import {expect } from '@playwright/test';

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
            const firstProduct =  this.products.first();
            await firstProduct.getByRole('button', {name:/add to cart/i}).click()
    }

    async addSecondProductToCart(){
        const secondProduct = this.products.nth(1);
        await secondProduct.getByRole('button', {name:/add to cart/i}).click()    
    }

    async addProductsByIndex (index){
        const currentProduct = this.products.n(index);
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

    async getCartCount(){
      const cartIcon = this.page.locator('.shopping_cart_link');
      const productCount = await cartIcon.textContent();
      return Number(productCount || 0);
    }
}       

export{Inventory}