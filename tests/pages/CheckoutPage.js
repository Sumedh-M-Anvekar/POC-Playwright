// tests/pages/CheckoutPage.js
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.countryInput = page.locator('[placeholder="Select Country"]');
    this.countryOption = (country) => page.locator(`.ta-results button:has-text("${country}")`);
    this.placeOrderButton = page.locator('text=Place Order');
  }

  async selectCountry(country) {
    await this.countryInput.type(country, { delay: 100 });
    await this.countryOption(country).click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = { CheckoutPage };
