import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  const consoleMessages = [];

  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  page.on('pageerror', err => {
    errors.push({ message: err.message, stack: err.stack });
  });
  page.on('requestfailed', request => {
    errors.push({ type: 'network', url: request.url(), error: request.failure()?.errorText });
  });

  console.log("============================================");
  console.log("   VALIDAÇÃO PÓS-FIX: RENDERIZAÇÃO PRODUÇÃO");
  console.log("============================================\n");

  // ---- HOME ----
  console.log("[1/4] Testando HOME (http://localhost:3000) ...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const homeTitle = await page.title();
  const homeHTML = await page.content();
  const hasHeader = homeHTML.includes('Nicoly') || homeHTML.includes('header') || homeHTML.includes('Header');
  const hasProducts = homeHTML.includes('ProductCard') || homeHTML.includes('product') || homeHTML.includes('R$') || homeHTML.includes('brl');
  const hasNovidades = homeHTML.includes('Novidades') || homeHTML.includes('Acabou de chegar');
  const hasCarousel = homeHTML.includes('carousel') || homeHTML.includes('Carousel') || homeHTML.includes('embla');
  
  console.log(`  Título: ${homeTitle}`);
  console.log(`  Header presente: ${hasHeader}`);
  console.log(`  Produtos renderizados (R$ visível): ${homeHTML.includes('R$')}`);
  console.log(`  Seção Novidades: ${hasNovidades}`);
  console.log(`  Carrossel presente: ${hasCarousel}`);
  console.log(`  Erros até agora: ${errors.length}`);

  // ---- LOJA ----
  console.log("\n[2/4] Testando LOJA (http://localhost:3000/loja) ...");
  await page.goto('http://localhost:3000/loja', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const lojaHTML = await page.content();
  const hasLojaProducts = lojaHTML.includes('R$');
  const hasCategories = lojaHTML.includes('Tudo') && (lojaHTML.includes('button') || lojaHTML.includes('categorias'));
  const hasPagination = lojaHTML.includes('Página') || lojaHTML.includes('Anterior') || lojaHTML.includes('Próxima');
  const hasGrid = lojaHTML.includes('grid');
  const hasNenhumProduto = lojaHTML.includes('Nenhum produto encontrado');

  console.log(`  Produtos no grid (R$ visível): ${hasLojaProducts}`);
  console.log(`  Categorias presentes: ${hasCategories}`);
  console.log(`  Grid renderizado: ${hasGrid}`);
  console.log(`  Mensagem "Nenhum produto": ${hasNenhumProduto}`);
  console.log(`  Paginação visível: ${hasPagination}`);
  console.log(`  Erros até agora: ${errors.length}`);

  // ---- CARRINHO ----
  console.log("\n[3/4] Testando CARRINHO (http://localhost:3000/carrinho) ...");
  await page.goto('http://localhost:3000/carrinho', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const carrinhoHTML = await page.content();
  const hasCarrinho = carrinhoHTML.includes('carrinho') || carrinhoHTML.includes('Carrinho') || carrinhoHTML.includes('vazio');
  console.log(`  Página renderizada: ${hasCarrinho}`);
  console.log(`  Erros até agora: ${errors.length}`);

  // ---- RESUMO DE ERROS ----
  console.log("\n[4/4] RESUMO DE ERROS");
  console.log("-------------------------------------------");
  
  const forwardRefError = errors.find(e => e.message && e.message.includes('forwardRef'));
  const hydrationError = errors.find(e => e.message && e.message.includes('hydrat'));
  const chunkLoadError = errors.find(e => e.message && e.message.includes('chunk'));
  
  console.log(`  forwardRef error: ${forwardRefError ? 'SIM ❌' : 'NÃO ✅'}`);
  console.log(`  Hydration error:  ${hydrationError ? 'SIM ❌' : 'NÃO ✅'}`);
  console.log(`  Chunk Load error: ${chunkLoadError ? 'SIM ❌' : 'NÃO ✅'}`);
  console.log(`  Total de erros:   ${errors.length}`);
  
  if (errors.length > 0) {
    console.log("\n  Detalhes dos erros:");
    errors.forEach((e, i) => {
      console.log(`  [${i+1}] ${e.message || e.error || e.url || 'unknown'}`);
    });
  }

  console.log("\n============================================");
  console.log("   RESULTADO FINAL");
  console.log("============================================");
  
  const fixWorked = !forwardRefError && hasLojaProducts;
  console.log(fixWorked
    ? "  ✅ FIX CONFIRMADO — forwardRef resolvido, produtos renderizando"
    : "  ❌ FIX NÃO RESOLVEU — verificar detalhes acima"
  );

  await browser.close();
})();
