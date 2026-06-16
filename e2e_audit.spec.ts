import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase to verify DB state later
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://zycwvatimjfbsfnjjvns.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

test('Checkout Flow E2E', async ({ page }) => {
  // 1. Go to Home
  await page.goto('http://localhost:4175/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'audit_home.png', fullPage: true });

  // 2. Go to Loja
  await page.click('text=Loja');
  await page.waitForLoadState('networkidle');
  
  // 3. Click first product
  const firstProduct = page.locator('a[href^="/produto/"]').first();
  await firstProduct.click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'audit_product.png' });

  // 4. Add to cart
  await page.click('button:has-text("Adicionar ao Carrinho")');
  await page.waitForTimeout(1000); // Wait for toast/state
  
  // 5. Go to checkout
  await page.click('text=Finalizar Compra');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'audit_checkout.png' });

  // 6. Login/Register handling (assuming we are redirected to login)
  // We'll fill login if we see it
  if (page.url().includes('/login')) {
    await page.fill('input[type="email"]', 'teste@nicolymodas.com.br');
    await page.fill('input[type="password"]', '123456');
    await page.click('button:has-text("Entrar")');
    await page.waitForLoadState('networkidle');
  }

  // Back to checkout
  if (!page.url().includes('/checkout')) {
    await page.goto('http://localhost:4175/checkout');
    await page.waitForLoadState('networkidle');
  }

  // 7. Fill checkout form
  await page.fill('input[name="customer_name"]', 'Auditoria Teste');
  await page.fill('input[name="customer_email"]', 'teste@nicolymodas.com.br');
  await page.fill('input[name="customer_phone"]', '11999999999');
  await page.fill('input[name="shipping_cep"]', '01001-000');
  
  // The cep might trigger address autofill, wait a bit
  await page.waitForTimeout(2000);
  
  await page.fill('input[name="shipping_number"]', '123');
  
  // 8. Submit checkout
  await page.click('button:has-text("Ir para o Pagamento")');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000); // Wait for MP preference creation
  
  await page.screenshot({ path: 'audit_payment.png', fullPage: true });

  // 9. Check DB
  console.log("Checking DB for order...");
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', 'teste@nicolymodas.com.br')
    .order('created_at', { ascending: false })
    .limit(1);

  if (orders && orders.length > 0) {
    console.log("ORDER FOUND:", orders[0].id);
    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orders[0].id);
    console.log("ORDER ITEMS:", items);
  } else {
    console.log("ORDER NOT FOUND!");
  }
});
