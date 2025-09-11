// tests/pages/CartPage.js
class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('text=Checkout');
  }

  async verifyProductInCart(productName) {
    await this.page.locator(`h3:has-text("${productName}")`).waitFor({ state: 'visible' });
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
