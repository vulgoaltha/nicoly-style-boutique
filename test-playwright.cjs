const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  console.log('Navigating to http://localhost:8080/checkout/pagamento/6eb18865-9f2a-432e-a5c5-bdc7b7b0a18b');
  await page.goto('http://localhost:8080/checkout/pagamento/6eb18865-9f2a-432e-a5c5-bdc7b7b0a18b', { waitUntil: 'networkidle' });
  
  // Wait a bit to let React Query load
  await page.waitForTimeout(5000);
  
  await browser.close();
})();
