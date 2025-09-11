const { test } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

test('Login test using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigate();
  
  try {
    await loginPage.login('rs2002@gmail.com', 'Rs@1234');
    console.log('✅ Login test completed successfully');
  } catch (err) {
    console.error(`❌ Login test failed: ${err.message}`);
    throw err;
  }
});
