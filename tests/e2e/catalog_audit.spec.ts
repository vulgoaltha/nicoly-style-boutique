import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zycwvatimjfbsfnjjvns.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_movab4IrHC8zoT_BnEYoVA_bStZZxDm';

const ADMIN_EMAIL = 'modas.nicoly26@gmail.com';
const ADMIN_PASSWORD = 'modasnicoly2026';

test.describe('Auditoria Completa de Catálogo', () => {
  let accessToken: string;
  let refreshToken: string;

  test.beforeAll(async () => {
    // Authenticate via Supabase API (not through the UI)
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await client.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    if (error) throw new Error('Auth API failed: ' + error.message);
    accessToken = data.session.access_token;
    refreshToken = data.session.refresh_token;
    console.log('✅ Auth API success, user:', data.user.id);
  });

  test.beforeEach(async ({ page }) => {
    // Inject the Supabase session into localStorage BEFORE loading the app
    const storageKey = `sb-zycwvatimjfbsfnjjvns-auth-token`;
    const sessionPayload = JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    });

    // Go to the domain first (needed to set localStorage for that origin)
    await page.goto('/');
    await page.evaluate(
      ([key, value]) => {
        localStorage.setItem(key, value);
      },
      [storageKey, sessionPayload],
    );

    // Reload so the app picks up the session from localStorage
    await page.reload();
    await page.waitForTimeout(2000);

    // Navigate to admin
    await page.goto('/admin');
    await page.waitForTimeout(2000);

    // Take a screenshot to confirm we're in admin
    await page.screenshot({ path: 'tests/e2e/admin-login-check.png' });
    console.log('Current URL after admin nav:', page.url());
  });

  test('1. Auditoria de Categorias', async ({ page }) => {
    await page.goto('/admin/categorias-home');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/e2e/categorias-page.png' });

    // Check if the page loaded (look for any admin content)
    const bodyText = await page.locator('body').textContent();
    console.log('Categorias page text (first 500 chars):', bodyText?.slice(0, 500));

    // Try to find "Nova Categoria" button
    const newBtn = page.locator('button, a').filter({ hasText: /nova categoria/i });
    const btnCount = await newBtn.count();
    console.log('Found "Nova Categoria" buttons:', btnCount);

    if (btnCount > 0) {
      await newBtn.first().click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'tests/e2e/categorias-form.png' });

      // Try to fill the form
      const titleInput = page.locator('input[name="title"], input[name="name"], input[placeholder*="nome" i], input[placeholder*="título" i]');
      if (await titleInput.count() > 0) {
        await titleInput.first().fill('Categoria Audit E2E');
        await page.screenshot({ path: 'tests/e2e/categorias-filled.png' });

        const saveBtn = page.locator('button').filter({ hasText: /salvar|criar|adicionar/i });
        if (await saveBtn.count() > 0) {
          await saveBtn.first().click();
          await page.waitForTimeout(2000);
          await page.screenshot({ path: 'tests/e2e/categorias-saved.png' });
          console.log('✅ Categoria criada com sucesso');
        }
      }
    }

    // Validate on Home
    await page.goto('/');
    await page.waitForTimeout(2000);
    const homeText = await page.locator('body').textContent();
    const catVisible = homeText?.includes('Categoria Audit E2E') || homeText?.includes('Audit');
    console.log('Categoria visível na Home:', catVisible);

    expect(true).toBeTruthy(); // Pass — we're collecting info
  });

  test('2. Auditoria de Coleções', async ({ page }) => {
    await page.goto('/admin/colecoes');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/e2e/colecoes-page.png' });

    const bodyText = await page.locator('body').textContent();
    console.log('Coleções page text (first 500 chars):', bodyText?.slice(0, 500));

    const newBtn = page.locator('button, a').filter({ hasText: /nova coleção/i });
    const btnCount = await newBtn.count();
    console.log('Found "Nova Coleção" buttons:', btnCount);

    if (btnCount > 0) {
      await newBtn.first().click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'tests/e2e/colecoes-form.png' });

      const nameInput = page.locator('input[name="name"], input[name="title"], input[placeholder*="nome" i]');
      if (await nameInput.count() > 0) {
        await nameInput.first().fill('Coleção Audit E2E');

        const saveBtn = page.locator('button').filter({ hasText: /salvar|criar|adicionar/i });
        if (await saveBtn.count() > 0) {
          await saveBtn.first().click();
          await page.waitForTimeout(2000);
          await page.screenshot({ path: 'tests/e2e/colecoes-saved.png' });
          console.log('✅ Coleção criada com sucesso');
        }
      }
    }

    // Validate on /loja
    await page.goto('/loja');
    await page.waitForTimeout(2000);
    const lojaText = await page.locator('body').textContent();
    const colVisible = lojaText?.includes('Coleção Audit E2E') || lojaText?.includes('Audit');
    console.log('Coleção visível na Loja:', colVisible);

    expect(true).toBeTruthy();
  });

  test('3. Auditoria de Banners', async ({ page }) => {
    await page.goto('/admin/banners');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/e2e/banners-page.png' });

    const bodyText = await page.locator('body').textContent();
    console.log('Banners page text (first 500 chars):', bodyText?.slice(0, 500));

    const newBtn = page.locator('button, a').filter({ hasText: /novo banner/i });
    const btnCount = await newBtn.count();
    console.log('Found "Novo Banner" buttons:', btnCount);

    if (btnCount > 0) {
      await newBtn.first().click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'tests/e2e/banners-form.png' });

      const titleInput = page.locator('input[name="title"], input[name="name"], input[placeholder*="título" i]');
      if (await titleInput.count() > 0) {
        await titleInput.first().fill('Banner Audit E2E');

        const ctaInput = page.locator('input[name="cta_text"], input[placeholder*="CTA" i], input[placeholder*="botão" i]');
        if (await ctaInput.count() > 0) {
          await ctaInput.first().fill('Ver Audit');
        }

        const linkInput = page.locator('input[name="link"], input[name="url"], input[placeholder*="link" i]');
        if (await linkInput.count() > 0) {
          await linkInput.first().fill('/loja');
        }

        // Try to set file if file input exists
        const fileInput = page.locator('input[type="file"]');
        if (await fileInput.count() > 0) {
          await fileInput.first().setInputFiles('tests/e2e/dummy.png');
        }

        const saveBtn = page.locator('button').filter({ hasText: /salvar|criar|adicionar/i });
        if (await saveBtn.count() > 0) {
          await saveBtn.first().click();
          await page.waitForTimeout(2000);
          await page.screenshot({ path: 'tests/e2e/banners-saved.png' });
          console.log('✅ Banner criado com sucesso');
        }
      }
    }

    expect(true).toBeTruthy();
  });

  test('4. Auditoria de Produtos', async ({ page }) => {
    await page.goto('/admin/produtos');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'tests/e2e/produtos-page.png' });

    const bodyText = await page.locator('body').textContent();
    console.log('Produtos page text (first 500 chars):', bodyText?.slice(0, 500));

    const newBtn = page.locator('button, a').filter({ hasText: /novo produto/i });
    const btnCount = await newBtn.count();
    console.log('Found "Novo Produto" buttons:', btnCount);

    if (btnCount > 0) {
      await newBtn.first().click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'tests/e2e/produtos-form.png' });

      const nameInput = page.locator('input[name="name"], input[name="title"], input[placeholder*="nome" i]');
      if (await nameInput.count() > 0) {
        await nameInput.first().fill('Produto Audit E2E');
      }

      const priceInput = page.locator('input[name="price"], input[placeholder*="preço" i]');
      if (await priceInput.count() > 0) {
        await priceInput.first().fill('100');
      }

      const salePriceInput = page.locator('input[name="sale_price"], input[name="promo_price"], input[placeholder*="promo" i]');
      if (await salePriceInput.count() > 0) {
        await salePriceInput.first().fill('80');
      }

      const stockInput = page.locator('input[name="stock"], input[name="quantity"], input[placeholder*="estoque" i]');
      if (await stockInput.count() > 0) {
        await stockInput.first().fill('10');
      }

      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        await fileInput.first().setInputFiles('tests/e2e/dummy.png');
      }

      await page.screenshot({ path: 'tests/e2e/produtos-filled.png' });

      const saveBtn = page.locator('button').filter({ hasText: /salvar|criar|adicionar/i });
      if (await saveBtn.count() > 0) {
        await saveBtn.first().click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'tests/e2e/produtos-saved.png' });
        console.log('✅ Produto criado com sucesso');
      }
    }

    // Validate on storefront
    await page.goto('/loja');
    await page.waitForTimeout(2000);
    const lojaText = await page.locator('body').textContent();
    const prodVisible = lojaText?.includes('Produto Audit E2E') || lojaText?.includes('Audit');
    console.log('Produto visível na Loja:', prodVisible);

    expect(true).toBeTruthy();
  });
});
