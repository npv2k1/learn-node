const { chromium } = require("playwright");

(async () => {
  // Make sure to run headed.
  const browser = await chromium.launch({ headless: false });

  // Setup context however you like.
  const context = await browser.newContext({
    /* pass any options */
  });
  await context.route("**/*", (route) => route.continue());

  // Pause the page, and start recording manually.
  const page = await context.newPage();
    await page.goto("http://code.ptit.edu.vn/");
  
  // Click input[name="username"]
  await page.click('input[name="username"]');

  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'B19DCCN479');

  // Click input[name="password"]
  await page.click('input[name="password"]');

  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'pvn2k1vn');

  // Click button:has-text("Đăng nhập")
  await page.click('button:has-text("Đăng nhập")');
  // assert.equal(page.url(), 'https://code.ptit.edu.vn/student/question');

  // Click td:has-text("HELLO")
  await page.click('td:has-text("HELLO")');

  // Click text=HELLO
  await page.click('text=HELLO');
  // assert.equal(page.url(), 'https://code.ptit.edu.vn/student/question/HELLO');

  // Click text=AC
  await page.click('text=AC');
  // assert.equal(page.url(), 'https://code.ptit.edu.vn/student/solution/360698/edit');

  // Click #editor >> :nth-match(div:has-text("print('Hello PTIT.')"), 2)
  await page.click('#editor >> :nth-match(div:has-text("print(\'Hello PTIT.\')"), 2)');
  await page.pause();
})();
