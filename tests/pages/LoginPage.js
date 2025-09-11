const { ConfirmationPage } = require("./Confirmationpage");
const { Header } = require("./Header");
const config = require('../config.json');

// tests/pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '#userEmail';
    this.passwordInput = '#userPassword';
    this.loginButton = '#login';
    
  }

  async navigate() {
    await this.page.goto(config.url);
    const header = new Header(this.page);
    await header.logout();
    await this.page.screenshot({path:'./screenshot/login.png'})
    await this.page.evaluate(() => localStorage.clear());
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);

    try {
      await this.page.waitForURL('**/dashboard/dash', { timeout: 5000 });
      console.log(`✅ Login success for: ${email}`);
    } catch {
      const msg = await this._getErrorMessage();
      throw new Error(`❌ Login failed for ${email}. Message: ${msg}`);
    }
  }

  async _getErrorMessage() {
    if (await this.errorAlert.first().isVisible()) {
      return await this.errorAlert.first().textContent();
    }
    return 'No visible error, login failed silently.';
  }
}

module.exports = { LoginPage };
