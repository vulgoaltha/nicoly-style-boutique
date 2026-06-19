import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('Console:', msg.type(), msg.text()));
  page.on('pageerror', err => {
    console.log('React Error/Unhandled Message:', err.message);
    console.log('React Error/Unhandled Stack:', err.stack);
  });

  try {
    await page.goto('http://localhost:8080');
    console.log("Navigated to Home");
    await page.waitForTimeout(3000);
  } catch(e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
