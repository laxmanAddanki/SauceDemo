const{BasePage} = require('../pages/BasePage')

class Cart extends BasePage {

    constructor(page){
        super(page);
    }

    async getCartCount(){
      const cartIcon = this.page.locator('.shopping_cart_link');
      const productCount = await cartIcon.textContent();
      return Number(productCount || 0);
    }

    async checkAvailibleProducts(){
        await this.page.locator('.shopping_cart_link');
        const itemsInCart = this.page.locator('.cart_item');
        await itemsInCart.count(); // added this to check number of products in count is equal to cart count
    }

}

module.exports = {Cart}