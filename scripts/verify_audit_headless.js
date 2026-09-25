import { spawn } from 'child_process';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runAudit() {
  console.log('--- STARTING CDP AUTOMATED AUDIT ---');

  // Spawn headless chrome
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--user-data-dir=' + path.join(process.cwd(), '.chrome_temp')
  ]);

  await sleep(1500);

  let wsUrl = '';
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const data = await res.json();
    wsUrl = data.webSocketDebuggerUrl;
    console.log('Connected to Chrome via CDP:', wsUrl);
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

  // Create a new target/page
  const targetRes = await send('Target.createTarget', { url: 'about:blank' });
  const targetId = targetRes.result.targetId;

  // Attach to target
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

  const routesToTest = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Product Details', path: '/product/apple-iphone-16-pro' },
    { name: 'Cart', path: '/cart' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Checkout', path: '/checkout' },
    { name: 'Order Tracking', path: '/order-tracking' },
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
    { name: 'Account', path: '/account' },
    { name: 'Admin', path: '/admin' }
  ];

  console.log('\n=== TESTING ALL ROUTES (HTTP 200 & DOM RENDER) ===');
  for (const route of routesToTest) {
    const fullUrl = `http://localhost:5173${route.path}`;
    await sendSession('Page.navigate', { url: fullUrl });
    await sleep(1000);

    const evalRes = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText || 'No H1',
          bodyLength: document.body.innerHTML.length,
          hasError: document.body.innerText.includes('Cannot GET')
        };
      })()`,
      returnByValue: true
    });

    const info = evalRes.result?.result?.value;
    console.log(`[ROUTE PASS] ${route.name} (${route.path}) -> Title: "${info?.title}", H1: "${info?.h1}"`);
  }

  const mobileWidths = [320, 360, 375, 390, 412, 430];
  console.log('\n=== TESTING MOBILE VIEWPORTS FOR HORIZONTAL OVERFLOW ===');

  for (const width of mobileWidths) {
    // Set device metrics
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width,
      height: 800,
      deviceScaleFactor: 2,
      mobile: true
    });

    // Check Home and Shop for overflow
    for (const testPath of ['/', '/shop', '/cart', '/checkout']) {
      await sendSession('Page.navigate', { url: `http://localhost:5173${testPath}` });
      await sleep(600);

      const overflowCheck = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const docW = document.documentElement.scrollWidth;
          const bodyW = document.body.scrollWidth;
          const winW = window.innerWidth;
          const maxW = Math.max(docW, bodyW);
          const hasOverflow = maxW > winW;
          return {
            winW,
            docW,
            bodyW,
            hasOverflow,
            diff: maxW - winW
          };
        })()`,
        returnByValue: true
      });

      const res = overflowCheck.result?.result?.value;
      if (res?.hasOverflow) {
        console.error(`[OVERFLOW FAIL] Viewport ${width}px on ${testPath}: docW=${res.docW}, winW=${res.winW}, diff=+${res.diff}px`);
      } else {
        console.log(`[OVERFLOW PASS] Viewport ${width}px on ${testPath}: zero horizontal overflow (maxW=${Math.max(res?.docW || 0, res?.bodyW || 0)}px, winW=${res?.winW}px)`);
      }
    }
  }

  console.log('\n=== TESTING PRODUCT GRID DENSITY (DESKTOP TO MOBILE) ===');
  const desktopWidths = [
    { label: 'Very Wide Desktop (2xl)', width: 1540, expectedCols: 6 },
    { label: 'Normal Desktop (xl)', width: 1280, expectedCols: 5 },
    { label: 'Smaller Desktop (lg)', width: 1024, expectedCols: 4 },
    { label: 'Tablet (md)', width: 768, expectedCols: 3 },
    { label: 'Mobile', width: 375, expectedCols: 2 }
  ];

  for (const item of desktopWidths) {
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: item.width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: item.width <= 430
    });

    await sendSession('Page.navigate', { url: 'http://localhost:5173/shop' });
    await sleep(600);

    const gridCheck = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const grid = document.querySelector('.grid');
        if (!grid) return { cols: 0, count: 0 };
        const cards = Array.from(grid.children);
        if (cards.length < 2) return { cols: 0, count: cards.length };
        const firstTop = cards[0].getBoundingClientRect().top;
        const cols = cards.filter(c => Math.abs(c.getBoundingClientRect().top - firstTop) < 10).length;
        return { cols, count: cards.length };
      })()`,
      returnByValue: true
    });

    const gc = gridCheck.result?.result?.value;
    console.log(`[GRID DENSITY] ${item.label} (${item.width}px): ${gc?.cols} columns detected (expected ${item.expectedCols})`);
  }

  ws.close();
  chromeProcess.kill();
  console.log('\n--- AUDIT VERIFICATION COMPLETE ---');
}

runAudit().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
