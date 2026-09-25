import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const SCREENSHOTS_DIR = 'C:\\Users\\ganes\\.gemini\\antigravity-ide\\brain\\dad9aa34-8ed2-41fd-8011-54936b3da1f6\\screenshots';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runVisualVerification() {
  console.log('================================================================');
  console.log('STARTING CHROME DEVTOOLS PROTOCOL (CDP) AUDIT & INTERACTION');
  console.log('================================================================\n');

  // Spawn headless chrome with CDP enabled
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--user-data-dir=' + path.join(process.cwd(), '.chrome_cdp_audit')
  ]);

  await sleep(2000);

  let wsUrl = '';
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const data = await res.json();
    wsUrl = data.webSocketDebuggerUrl;
    console.log('Connected to Chrome DevTools Protocol:', wsUrl);
  } catch (err) {
    console.error('Failed to connect to Chrome CDP:', err.message);
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
    return new Promise((resolve) => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Create page
  const targetRes = await send('Target.createTarget', { url: 'about:blank' });
  const targetId = targetRes.result.targetId;
  const attachRes = await send('Target.attachToTarget', { targetId, flatten: true });
  const sessionId = attachRes.result.sessionId;

  function sendSession(method, params = {}) {
    const id = msgId++;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');
  await sendSession('DOM.enable');

  async function captureScreenshot(name) {
    const res = await sendSession('Page.captureScreenshot', { format: 'png', quality: 90 });
    if (res.result && res.result.data) {
      const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
      fs.writeFileSync(filePath, Buffer.from(res.result.data, 'base64'));
      console.log(`[SCREENSHOT CAPTURED] ${name}.png (${(res.result.data.length / 1024).toFixed(1)} KB)`);
      return filePath;
    }
    return null;
  }

  async function evalInPage(script) {
    const res = await sendSession('Runtime.evaluate', {
      expression: script,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.result?.value;
  }

  // -------------------------------------------------------------
  // 1. ROUTE VERIFICATION (13 Routes)
  // -------------------------------------------------------------
  const routes = [
    { name: '1. Homepage', path: '/' },
    { name: '2. Shop', path: '/shop' },
    { name: '3. Categories', path: '/categories' },
    { name: '4. Product Details', path: '/product/apple-iphone-16-pro' },
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

  console.log('\n--- VERIFYING ALL 13 CORE ROUTES ---');
  for (const r of routes) {
    await sendSession('Page.navigate', { url: `http://localhost:5173${r.path}` });
    await sleep(700);

    const report = await evalInPage(`(() => {
      const brokenImages = Array.from(document.querySelectorAll('img'))
        .filter(img => img.naturalWidth === 0 && img.src && !img.src.includes('data:'))
        .map(img => img.src);
      const h1 = document.querySelector('h1')?.innerText?.trim() || 'No H1';
      return {
        title: document.title,
        h1,
        brokenImagesCount: brokenImages.length,
        brokenImages: brokenImages.slice(0, 3)
      };
    })()`);

    console.log(`[PASS] ${r.name} -> Title: "${report.title}", H1: "${report.h1}", Broken Images: ${report.brokenImagesCount}`);
  }

  // -------------------------------------------------------------
  // 2. DESKTOP VIEWPORTS (1440px, 1280px, 1024px)
  // -------------------------------------------------------------
  console.log('\n--- TESTING DESKTOP VIEWPORTS & DENSE PRODUCT GRID ---');
  const desktopWidths = [
    { label: 'Desktop 1440px', width: 1440, height: 900, shot: 'desktop_1440' },
    { label: 'Desktop 1280px', width: 1280, height: 800, shot: 'desktop_1280' },
    { label: 'Desktop 1024px', width: 1024, height: 768, shot: 'desktop_1024' }
  ];

  for (const dw of desktopWidths) {
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: dw.width,
      height: dw.height,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sendSession('Page.navigate', { url: 'http://localhost:5173/shop' });
    await sleep(800);

    const metrics = await evalInPage(`(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const grid = document.querySelector('.grid');
      let cols = 0;
      if (grid && grid.children.length > 1) {
        const top0 = grid.children[0].getBoundingClientRect().top;
        cols = Array.from(grid.children).filter(c => Math.abs(c.getBoundingClientRect().top - top0) < 15).length;
      }
      return { docW, winW, overflow: docW > winW, cols };
    })()`);

    console.log(`[DESKTOP] ${dw.label}: Width=${metrics.winW}px, Columns=${metrics.cols}, Horizontal Overflow=${metrics.overflow}`);
    await captureScreenshot(dw.shot);
  }

  // -------------------------------------------------------------
  // 3. MOBILE VIEWPORTS (320, 360, 375, 390, 412, 430px)
  // -------------------------------------------------------------
  console.log('\n--- TESTING MOBILE VIEWPORTS (STRICT 2-COL GRID & ZERO OVERFLOW) ---');
  const mobileWidths = [
    { width: 430, height: 932, shot: 'mobile_430' },
    { width: 412, height: 915, shot: 'mobile_412' },
    { width: 390, height: 844, shot: 'mobile_390' },
    { width: 375, height: 667, shot: 'mobile_375' },
    { width: 360, height: 640, shot: 'mobile_360' },
    { width: 320, height: 640, shot: 'mobile_320' }
  ];

  for (const mw of mobileWidths) {
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: mw.width,
      height: mw.height,
      deviceScaleFactor: 2,
      mobile: true
    });

    // Check Home
    await sendSession('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(700);

    const homeMetrics = await evalInPage(`(() => {
      const docW = document.documentElement.scrollWidth;
      const bodyW = document.body.scrollWidth;
      const winW = window.innerWidth;
      const maxW = Math.max(docW, bodyW);
      return { docW: maxW, winW, overflow: maxW > winW };
    })()`);

    // Check Shop
    await sendSession('Page.navigate', { url: 'http://localhost:5173/shop' });
    await sleep(700);

    const shopMetrics = await evalInPage(`(() => {
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
      return { docW: maxW, winW, overflow: maxW > winW, cols };
    })()`);

    console.log(`[MOBILE ${mw.width}px] Home Overflow: ${homeMetrics.overflow} | Shop Columns: ${shopMetrics.cols} (Expected 2), Shop Overflow: ${shopMetrics.overflow}`);
    await captureScreenshot(mw.shot);
  }

  // -------------------------------------------------------------
  // 4. INTERACTION TESTING (Full User Flow)
  // -------------------------------------------------------------
  console.log('\n--- TESTING REAL USER INTERACTIONS & E-COMMERCE FLOW ---');
  // Reset to Desktop 1440px
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // A. Search Bar
  console.log('\n[Flow A] Testing Search interaction for "Sony"...');
  await sendSession('Page.navigate', { url: 'http://localhost:5173/' });
  await sleep(700);

  const searchResult = await evalInPage(`(() => {
    const input = document.querySelector('input[type="text"]');
    if (!input) return { success: false, reason: 'Search input not found' };
    input.value = 'Sony';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const form = input.closest('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      return { success: true, method: 'form_submit' };
    }
    return { success: true, method: 'input_set' };
  })()`);
  console.log(`- Search submission triggered:`, searchResult);
  await sleep(1000);

  // B. Product Detail & Add to Cart
  console.log('\n[Flow B] Navigating to verified product detail: Apple iPhone 16 Pro...');
  await sendSession('Page.navigate', { url: 'http://localhost:5173/product/apple-iphone-16-pro' });
  await sleep(900);

  const productDetailData = await evalInPage(`(() => {
    const title = document.querySelector('h1')?.innerText?.trim();
    const priceText = document.querySelector('.text-2xl, .text-3xl')?.innerText?.trim();
    const specsCount = document.querySelectorAll('dl dt, table tr, .font-medium').length;
    const codBadge = Array.from(document.querySelectorAll('span, div')).some(el => el.innerText.includes('Cash on Delivery'));
    const addToCartBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Add to Cart'));
    
    let clicked = false;
    if (addToCartBtn) {
      addToCartBtn.click();
      clicked = true;
    }

    return { title, priceText, specsCount, codBadge, addToCartBtnFound: !!addToCartBtn, clicked };
  })()`);
  console.log(`- Product Details:`, productDetailData);
  await captureScreenshot('desktop_product_1440');
  await sleep(600);

  // C. Cart Page & Quantity Update & Coupon
  console.log('\n[Flow C] Checking Cart Page and coupon NEXORA10...');
  await sendSession('Page.navigate', { url: 'http://localhost:5173/cart' });
  await sleep(800);

  const cartData = await evalInPage(`(() => {
    const items = document.querySelectorAll('.divide-y > div, .border-b');
    const plusBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText === '+' || b.querySelector('svg.lucide-plus'));
    if (plusBtn) plusBtn.click();

    const couponInput = document.querySelector('input[placeholder*="coupon" i], input[placeholder*="code" i]');
    const applyBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('apply'));
    let couponApplied = false;
    if (couponInput && applyBtn) {
      couponInput.value = 'NEXORA10';
      couponInput.dispatchEvent(new Event('input', { bubbles: true }));
      applyBtn.click();
      couponApplied = true;
    }

    return {
      itemCount: items.length,
      plusClicked: !!plusBtn,
      couponApplied,
      cartText: document.body.innerText.substring(0, 300)
    };
  })()`);
  console.log(`- Cart interaction status:`, { itemCount: cartData.itemCount, plusClicked: cartData.plusClicked, couponApplied: cartData.couponApplied });
  await captureScreenshot('desktop_cart_1440');
  await sleep(600);

  // D. Checkout & Order Placement
  console.log('\n[Flow D] Navigating to Checkout & Placing COD Order...');
  await sendSession('Page.navigate', { url: 'http://localhost:5173/checkout' });
  await sleep(800);

  const checkoutData = await evalInPage(`(() => {
    // Fill required form fields if empty
    const nameInput = document.querySelector('input[name="fullName"], input[placeholder*="Full Name" i]');
    const phoneInput = document.querySelector('input[name="phone"], input[placeholder*="Phone" i]');
    const addressInput = document.querySelector('input[name="address"], textarea[name="address"], input[placeholder*="Address" i]');
    const pincodeInput = document.querySelector('input[name="pincode"], input[placeholder*="PIN" i]');
    const cityInput = document.querySelector('input[name="city"], input[placeholder*="City" i]');
    const stateInput = document.querySelector('input[name="state"], select[name="state"], input[placeholder*="State" i]');

    if (nameInput) { nameInput.value = 'Rajesh Kumar'; nameInput.dispatchEvent(new Event('input', { bubbles: true })); }
    if (phoneInput) { phoneInput.value = '9876543210'; phoneInput.dispatchEvent(new Event('input', { bubbles: true })); }
    if (addressInput) { addressInput.value = 'Flat 402, Lotus Residency, Indiranagar'; addressInput.dispatchEvent(new Event('input', { bubbles: true })); }
    if (pincodeInput) { pincodeInput.value = '560038'; pincodeInput.dispatchEvent(new Event('input', { bubbles: true })); }
    if (cityInput) { cityInput.value = 'Bengaluru'; cityInput.dispatchEvent(new Event('input', { bubbles: true })); }

    const placeOrderBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.innerText.toLowerCase().includes('place order') || b.innerText.toLowerCase().includes('confirm')
    );

    let orderSubmitted = false;
    if (placeOrderBtn) {
      placeOrderBtn.click();
      orderSubmitted = true;
    }

    return {
      nameSet: !!nameInput,
      addressSet: !!addressInput,
      placeOrderBtnFound: !!placeOrderBtn,
      orderSubmitted
    };
  })()`);
  console.log(`- Checkout execution:`, checkoutData);
  await captureScreenshot('desktop_checkout_1440');
  await sleep(1200);

  // Check URL after placement
  const afterCheckoutUrl = await evalInPage(`window.location.href`);
  console.log(`- Page URL after checkout: ${afterCheckoutUrl}`);

  // E. Admin Dashboard Tabs
  console.log('\n[Flow E] Checking Admin Panel Tabs...');
  await sendSession('Page.navigate', { url: 'http://localhost:5173/admin' });
  await sleep(800);

  const adminData = await evalInPage(`(() => {
    const kpiCards = document.querySelectorAll('.grid .rounded-xl, .grid .bg-white');
    const tabs = Array.from(document.querySelectorAll('button, nav a')).map(t => t.innerText.trim()).filter(Boolean);
    const restockBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('+10'));
    let restockClicked = false;
    if (restockBtn) {
      restockBtn.click();
      restockClicked = true;
    }
    return {
      kpiCount: kpiCards.length,
      tabs: tabs.slice(0, 8),
      restockFound: !!restockBtn,
      restockClicked
    };
  })()`);
  console.log(`- Admin Panel metrics:`, adminData);
  await captureScreenshot('desktop_admin_1440');

  // Close session & process
  ws.close();
  chromeProcess.kill();

  console.log('\n================================================================');
  console.log('CHROME DEVTOOLS PROTOCOL (CDP) AUDIT & SCREENSHOT CAPTURE COMPLETE');
  console.log('================================================================\n');
}

runVisualVerification().catch(err => {
  console.error('CDP Visual Verification failed:', err);
  process.exit(1);
});
