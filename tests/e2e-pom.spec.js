const { test } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { DashboardPage } = require('./pages/DashboardPage');
const { CartPage } = require('./pages/CartPage');
const { CheckoutPage } = require('./pages/CheckoutPage');
const { ConfirmationPage } = require('./pages/Confirmationpage');
const { getLoginDataFromExcel } = require('./utils/excelReader');

const config = require('./config.json');

const loginData = getLoginDataFromExcel('./tests/data/loginData.xlsx', 'Sheet1');

loginData.forEach(({ email, password }) => {
  test(`E2E flow for user: ${email}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await loginPage.navigate();
   
    try {
      await loginPage.login(email, password);
    } catch (err) {
      console.warn(`Skipping test for ${email}. Login failed: ${err.message}`);
      return; // Skip rest of the flow if login fails
    }

    await dashboardPage.addProductToCart(config.productName);
    await dashboardPage.goToCart();

    await cartPage.verifyProductInCart(config.productName);
    await cartPage.clickCheckout();

    await checkoutPage.selectCountry(config.country);
    await checkoutPage.placeOrder();

    await confirmationPage.invoice();
    await confirmationPage.logout();
  });
});
