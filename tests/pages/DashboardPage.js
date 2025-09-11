// tests/pages/DashboardPage.js
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.product = (name) => page.locator(`.card-body:has-text("${name}")`);
    this.cartLink = page.locator('[routerlink="/dashboard/cart"]');
  }

  async addProductToCart(productName) {
    await this.product(productName).locator('text=Add To Cart').click();
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL(/.*cart/);
  }
}

module.exports = { DashboardPage };
