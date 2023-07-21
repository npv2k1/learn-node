const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  // Go to https://code.ptit.edu.vn/login
  await page.goto("https://code.ptit.edu.vn/login");

  // Click input[name="username"]
  await page.click('input[name="username"]');

  // Fill input[name="username"]
  await page.fill('input[name="username"]', "B19DCCN479");

  // Click input[name="password"]
  await page.click('input[name="password"]');

  // Fill input[name="password"]
  await page.fill('input[name="password"]', "pvn2k1vn");

  // Click text=Ghi nhớ
  await page.click("text=Ghi nhớ");

  // Click button:has-text("Đăng nhập")
  await page.click('button:has-text("Đăng nhập")');
  expect(page.url()).toBe("https://code.ptit.edu.vn/student/question");

  // Click text=SẮP XẾP ĐỔI CHỖ TRỰC TIẾP
  await page.click("text=SẮP XẾP ĐỔI CHỖ TRỰC TIẾP", {
    button: "right",
  });

  // Click span:has-text("AC")
  await page1.click('span:has-text("AC")');
  expect(page1.url()).toBe(
    "https://code.ptit.edu.vn/student/solution/361734/edit"
  );
});
