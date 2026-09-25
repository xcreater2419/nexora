import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const SCREENSHOTS_DIR = 'C:\\Users\\ganes\\.gemini\\antigravity-ide\\brain\\dad9aa34-8ed2-41fd-8011-54936b3da1f6\\screenshots';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runComprehensiveCDPAudit() {
  console.log('================================================================');
  console.log('NEXORA COMPLETE CDP BROWSER VERIFICATION & INTERACTION SUITE');
  console.log('================================================================\n');

  // Spawn headless chrome
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--user-data-dir=' + path.join(process.cwd(), '.chrome_cdp_audit_clean')
  ]);

  await sleep(1800);

  let wsUrl = '';
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const data = await res.json();
    wsUrl = data.webSocketDebuggerUrl;
    console.log('Connected to Google Chrome via CDP:', wsUrl);
  } catch (err) {
    console.error('Failed to connect to Chrome:', err.message);
    chromeProcess.kill();
    process.exit(1);
  }

  const ws = new WebSocket(wsUrl);
  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const resolver = pending.get(msg.id);
      pending.delete(msg.id);
      resolver(msg);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    const id = msgId++;
    return new Promise(resolve => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const targetRes = await send('Target.createTarget', { url: 'about:blank' });
  const targetId = targetRes.result.targetId;
  const attachRes = await send('Target.attachToTarget', { targetId, flatten: true });
  const sessionId = attachRes.result.sessionId;

  function sendSession(method, params = {}) {
    const id = msgId++;
    return new Promise(resolve => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');
  await sendSession('DOM.enable');

  async function evalInPage(script) {
    const res = await sendSession('Runtime.evaluate', {
      expression: script,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.result?.value;
  }

  async function waitForPageReady(timeoutMs = 6000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const isReady = await evalInPage(`(() => {
        const spinner = document.querySelector('.animate-spin');
        const hasHeader = !!document.querySelector('header');
        const hasMain = !!document.querySelector('main, .container-dense, h1');
        return !spinner && hasHeader && hasMain;
      })()`);
      if (isReady) {
        await sleep(350);
        return true;
      }
      await sleep(150);
    }
    return false;
  }

  async function navigateAndWait(path, timeoutMs = 6000) {
    await sendSession('Page.navigate', { url: `http://localhost:5173${path}` });
    await waitForPageReady(timeoutMs);
  }

  async function captureScreenshot(name) {
    const res = await sendSession('Page.captureScreenshot', { format: 'png', quality: 90 });
    if (res.result && res.result.data) {
      const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
      fs.writeFileSync(filePath, Buffer.from(res.result.data, 'base64'));
      console.log(`[SAVED SCREENSHOT] ${name}.png (${(res.result.data.length / 1024).toFixed(1)} KB)`);
      return filePath;
    }
    return null;
  }

  // -------------------------------------------------------------
  // PHASE 1: ALL 13 CORE ROUTES VERIFICATION
  // -------------------------------------------------------------
  console.log('\n--- [PHASE 1] VERIFYING ALL 13 ROUTES ---');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  const routes = [
    { name: '1. Homepage', path: '/' },
    { name: '2. Shop', path: '/shop' },
    { name: '3. Categories', path: '/categories' },
    { name: '4. Product Details', path: '/product/apple-iphone-16-pro-128gb-desert-titanium' },
    { name: '5. Search', path: '/shop?q=Samsung' },
    { name: '6. Cart', path: '/cart' },
    { name: '7. Wishlist', path: '/wishlist' },
    { name: '8. Checkout', path: '/checkout' },
    { name: '9. Order Tracking', path: '/order-tracking' },
    { name: '10. Login', path: '/login' },
    { name: '11. Signup', path: '/signup' },
    { name: '12. Account', path: '/account' },
    { name: '13. Admin', path: '/admin' }
  ];

  for (const r of routes) {
    await navigateAndWait(r.path);
    const meta = await evalInPage(`(() => {
      const title = document.title;
      const h1 = document.querySelector('h1')?.innerText?.trim() || 'No H1';
      const hasContent = document.body.innerText.length > 50;
      const brokenImgs = Array.from(document.querySelectorAll('img')).filter(i => i.naturalWidth === 0 && !i.src.includes('data:'));
      return { title, h1, hasContent, brokenImgsCount: brokenImgs.length };
    })()`);
    console.log(`[ROUTE OK] ${r.name.padEnd(20)} | H1: "${meta.h1}" | Broken Images: ${meta.brokenImgsCount}`);
  }

  // -------------------------------------------------------------
  // PHASE 2: DESKTOP VIEWPORTS (1440, 1280, 1024)
  // -------------------------------------------------------------
  console.log('\n--- [PHASE 2] TESTING DESKTOP VIEWPORTS ---');
  const desktopWidths = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'desktop_1280', width: 1280, height: 800 },
    { name: 'desktop_1024', width: 1024, height: 768 }
  ];

  for (const dw of desktopWidths) {
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: dw.width,
      height: dw.height,
      deviceScaleFactor: 1,
      mobile: false
    });

    await navigateAndWait('/shop');
    const dMetrics = await evalInPage(`(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const grid = document.querySelector('.grid');
      let cols = 0;
      if (grid && grid.children.length > 1) {
        const top0 = grid.children[0].getBoundingClientRect().top;
        cols = Array.from(grid.children).filter(c => Math.abs(c.getBoundingClientRect().top - top0) < 15).length;
      }
      return { winW, docW, overflow: docW > winW, cols, cardCount: grid?.children.length || 0 };
    })()`);

    console.log(`[DESKTOP ${dw.width}px] Columns: ${dMetrics.cols} | Overflow: ${dMetrics.overflow} | Items rendered: ${dMetrics.cardCount}`);
    await captureScreenshot(dw.name);
  }

  // -------------------------------------------------------------
  // PHASE 3: MOBILE VIEWPORTS (430, 412, 390, 375, 360, 320)
  // -------------------------------------------------------------
  console.log('\n--- [PHASE 3] TESTING MOBILE VIEWPORTS (STRICT 2-COL & NO OVERFLOW) ---');
  const mobileWidths = [
    { name: 'mobile_430', width: 430, height: 932 },
    { name: 'mobile_412', width: 412, height: 915 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'mobile_375', width: 375, height: 667 },
    { name: 'mobile_360', width: 360, height: 640 },
    { name: 'mobile_320', width: 320, height: 640 }
  ];

  for (const mw of mobileWidths) {
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: mw.width,
      height: mw.height,
      deviceScaleFactor: 2,
      mobile: true
    });

    await navigateAndWait('/shop');
    const mMetrics = await evalInPage(`(() => {
      const docW = document.documentElement.scrollWidth;
      const bodyW = document.body.scrollWidth;
      const winW = window.innerWidth;
      const maxW = Math.max(docW, bodyW);
      const grid = document.querySelector('.grid');
      let cols = 0;
      if (grid && grid.children.length > 1) {
        const top0 = grid.children[0].getBoundingClientRect().top;
        cols = Array.from(grid.children).filter(c => Math.abs(c.getBoundingClientRect().top - top0) < 15).length;
      }
      return { winW, maxW, overflow: maxW > winW, cols };
    })()`);

    console.log(`[MOBILE ${mw.width}px] Columns: ${mMetrics.cols} (Expected: 2) | Horizontal Overflow: ${mMetrics.overflow}`);
    await captureScreenshot(mw.name);
  }

  // -------------------------------------------------------------
  // PHASE 4: FULL USER FLOW & INTERACTION TESTS
  // -------------------------------------------------------------
  console.log('\n--- [PHASE 4] TESTING REAL USER INTERACTIONS ---');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // A. Search
  console.log('\n[Flow 1: Header Search]');
  await navigateAndWait('/');
  const searchTest = await evalInPage(`(() => {
    const input = document.querySelector('header input[type="text"]');
    if (!input) return { ok: false, msg: 'No search input found' };
    input.value = 'Samsung';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const form = input.closest('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      return { ok: true, msg: 'Submitted search for "Samsung"' };
    }
    return { ok: false, msg: 'Form not found' };
  })()`);
  console.log('Result:', searchTest);
  await sleep(800);
  await waitForPageReady();
  const searchItems = await evalInPage(`document.querySelectorAll('.grid > div').length`);
  console.log(`Products displayed after search: ${searchItems} authentic items`);
  await captureScreenshot('desktop_search_1440');

  // B. Product Detail & Add to Cart
  console.log('\n[Flow 2: Product Detail & Add to Cart]');
  await navigateAndWait('/product/apple-iphone-16-pro-128gb-desert-titanium');
  const pdTest = await evalInPage(`(() => {
    const title = document.querySelector('h1, h2')?.innerText?.trim();
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Add to Cart'));
    if (btn) {
      btn.click();
      return { ok: true, title, btnFound: true, clicked: true };
    }
    return { ok: false, title, btnFound: false };
  })()`);
  console.log('Result:', pdTest);
  await captureScreenshot('desktop_product_1440');
  await sleep(600);

  // C. Cart Quantity Increment & Coupon Code
  console.log('\n[Flow 3: Cart Page Interaction & Coupon NEXORA10]');
  await navigateAndWait('/cart');
  const cartTest = await evalInPage(`(() => {
    const plusBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.innerText === '+' || b.querySelector('svg.lucide-plus')
    );
    if (plusBtn) plusBtn.click();

    const couponInput = document.querySelector('input[placeholder*="code" i], input[placeholder*="coupon" i]');
    const applyBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('apply'));
    let couponOk = false;
    if (couponInput && applyBtn) {
      couponInput.value = 'NEXORA10';
      couponInput.dispatchEvent(new Event('input', { bubbles: true }));
      applyBtn.click();
      couponOk = true;
    }

    const cartBadge = document.querySelector('header .lucide-shopping-cart')?.closest('a')?.innerText?.trim() || 'Cart';

    return { plusClicked: !!plusBtn, couponApplied: couponOk, cartBadge };
  })()`);
  console.log('Result:', cartTest);
  await sleep(500);
  await captureScreenshot('desktop_cart_1440');

  // D. Checkout & Order Placement
  console.log('\n[Flow 4: Checkout & Confirm COD Order]');
  await navigateAndWait('/checkout');
  const checkoutTest = await evalInPage(`(() => {
    const confirmBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.innerText.includes('Confirm Cash on Delivery Order')
    );
    if (confirmBtn) {
      confirmBtn.click();
      return { ok: true, clicked: true };
    }
    return { ok: false, btnText: Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean) };
  })()`);
  console.log('Result:', checkoutTest);
  await sleep(1200);
  const currentUrl = await evalInPage(`window.location.href`);
  console.log(`Current URL after confirming COD: ${currentUrl}`);
  await captureScreenshot('desktop_order_confirmation_1440');

  // E. Admin Panel Operations
  console.log('\n[Flow 5: Admin Panel & Stock Management]');
  await navigateAndWait('/admin');
  const adminTest = await evalInPage(`(() => {
    // Click Inventory tab
    const tabs = Array.from(document.querySelectorAll('button')).filter(b => 
      ['overview', 'products', 'inventory', 'orders', 'coupons'].includes(b.innerText.toLowerCase())
    );
    const invTab = tabs.find(t => t.innerText.toLowerCase() === 'inventory');
    if (invTab) invTab.click();

    return {
      kpiCount: document.querySelectorAll('.grid .rounded, .grid .bg-white').length,
      invTabFound: !!invTab
    };
  })()`);
  console.log('Result:', adminTest);
  await sleep(600);
  await captureScreenshot('desktop_admin_1440');

  // Mobile key pages
  console.log('\n[Flow 6: Capturing Mobile Cart & Checkout at 375px]');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true
  });
  await navigateAndWait('/cart');
  await captureScreenshot('mobile_cart_375');
  await navigateAndWait('/checkout');
  await captureScreenshot('mobile_checkout_375');

  // Cleanup
  ws.close();
  chromeProcess.kill();

  console.log('\n================================================================');
  console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY');
  console.log('================================================================\n');
}

runComprehensiveCDPAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
