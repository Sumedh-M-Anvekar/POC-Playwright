// tests/pages/ConfirmationPage.js
const { expect } = require('@playwright/test');

class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.successMessage = page.locator('.hero-primary');
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');

    this.myOrdersButton = page.locator('button[routerlink="/dashboard/myorders"]'); // visible after order
    this.profileDropdown = page.locator('.navbar .dropdown-toggle'); // top right profile menu
    this.logoutButton = page.getByRole('button', { name: 'Sign Out' });// inside dropdown/ inside dropdown
  }
  async invoice(){
    await this.page.screenshot({path:"./screenshot/invoice.png"});
    await expect(this.successMessage).toHaveText(/Thankyou for the order/i);
    await this.page.getByRole('button', { name: 'Click To Download Order Details in CSV' }).click();
    console.log("invoice")
  }
  async logout() {
    await this.page.waitForTimeout(3000); 
    await this.logoutButton.click();
    console.log("logged out")

  }
}

module.exports = { ConfirmationPage };
