const { chromium } = require('@playwright/test');
const fs = require('fs');

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://rahulshettyacademy.com/client');
  await page.fill('#userEmail', 'rs8888@gmail.com');
  await page.fill('#userPassword', 'Rs@12345');
  await page.click('#login');
  await page.waitForLoadState('networkidle');

  // Save login session
  await page.context().storageState({ path: 'auth/login-state.json' });
  await browser.close();
};
