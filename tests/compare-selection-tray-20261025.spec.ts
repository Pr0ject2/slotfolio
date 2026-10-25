import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
const traySelector = "[data-compare-tray]";

for (const locale of ["ru", "en", "es"]) {
  const prefix = locale === "ru" ? "" : `/${locale}`;
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    test(`${locale} comparison action follows the selection at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${prefix}/slots/`);
      const tray = page.locator(traySelector),
        choices = page.locator(".catalog-game .compare-button");
      await expect(tray).toHaveCount(0);
      await choices.nth(0).focus();
      await choices.nth(0).press("Enter");
      await expect(choices.nth(0)).toBeFocused();
      await expect(tray).toBeVisible();
      await expect(tray).toContainText("Gates of Olympus");
      await expect(tray.locator("[data-remove-game]")).toHaveCount(1);
      await expect(tray.locator("[data-compare-open]")).toHaveAttribute(
        "href",
        new RegExp(`${prefix}/compare/?$`),
      );
      await choices.nth(1).focus();
      await choices.nth(1).press("Enter");
      await expect(choices.nth(1)).toBeFocused();
      await expect(tray.locator("[data-remove-game]")).toHaveCount(2);
      await expect(tray).toContainText("Sweet Bonanza");
      const bounds = (await tray.boundingBox())!,
        action = (await tray.locator("[data-compare-open]").boundingBox())!;
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(901);
      expect(bounds.height).toBeLessThan(300);
      expect(action.y).toBeGreaterThanOrEqual(bounds.y);
      expect(action.height).toBeGreaterThanOrEqual(44);
      expect(action.y + action.height).toBeLessThanOrEqual(901);
      expect(
        (await choices.nth(1).boundingBox())!.y +
          (await choices.nth(1).boundingBox())!.height,
      ).toBeLessThan(bounds.y);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      await tray.locator('[data-remove-game="gates-of-olympus"]').click();
      await expect(choices.nth(0)).toHaveAttribute("aria-pressed", "false");
      await expect(tray.locator("[data-remove-game]")).toHaveCount(1);
      await expect(tray.locator("[data-remove-game]")).toBeFocused();
      await tray.locator("button").last().click();
      await expect(tray).toHaveCount(0);
      await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "false");
      await expect(choices.nth(1)).toBeFocused();
      await choices.nth(0).click();
      await choices.nth(1).click();
      await page.evaluate(() =>
        window.scrollTo(0, document.documentElement.scrollHeight),
      );
      expect(
        (await page.locator(".footer-bottom").boundingBox())!.y +
          (await page.locator(".footer-bottom").boundingBox())!.height,
      ).toBeLessThanOrEqual((await tray.boundingBox())!.y + 1);
      const link = tray.locator("[data-compare-open]");
      await link.focus();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Shift+Tab");
      await expect(link).toBeFocused();
      expect(
        await link.evaluate((el) => getComputedStyle(el).outlineStyle),
      ).not.toBe("none");
      await link.press("Enter");
      await expect(page).toHaveURL(new RegExp(`${prefix}/compare/?$`));
      await expect(page.locator(".comparison-selection article")).toHaveCount(
        2,
      );
      await expect(tray).toHaveCount(0);
      await page.goBack();
      await expect(tray.locator("[data-remove-game]")).toHaveCount(2);
    });
  }

  test(`${locale} selection survives catalogue navigation and the two-game limit`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/slots/`);
    const buttons = page.locator(".catalog-game .compare-button"),
      tray = page.locator(traySelector);
    await buttons.nth(0).click();
    await buttons.nth(1).click();
    await buttons.nth(2).click();
    await expect(buttons.nth(2)).toHaveAttribute("aria-pressed", "false");
    await expect(tray.locator("[data-remove-game]")).toHaveCount(2);
    await page.locator(".catalog-page-next").click();
    await expect(page).toHaveURL(/page=2/);
    await expect(tray).toContainText("Gates of Olympus");
    await page.reload();
    await expect(tray.locator("[data-remove-game]")).toHaveCount(2);
    await page.goto(`${prefix}/slots/gates-of-olympus/`);
    await expect(tray).toBeVisible();
    await expect(page.locator("main h1")).toHaveText("Gates of Olympus");
    await expect(
      tray.locator('[data-remove-game="gates-of-olympus"]'),
    ).toBeVisible();
    await page.goto(`${prefix}/providers/pragmatic-play/`);
    await expect(tray.locator("[data-remove-game]")).toHaveCount(2);
  });
}

test("selection syncs across tabs and cleans unavailable games", async ({
  context,
}) => {
  const first = await context.newPage(),
    second = await context.newPage();
  await first.goto("/slots/");
  await first.locator(".compare-button").nth(0).click();
  await second.goto("/en/slots/");
  await expect(second.locator(traySelector)).toContainText("Gates of Olympus");
  await second.locator("[data-remove-game]").click();
  await expect(first.locator(traySelector)).toHaveCount(0);
  await first.evaluate(() =>
    localStorage.setItem("slotfolio-compare", '["not-a-game","starburst"]'),
  );
  await first.reload();
  await expect(first.locator(traySelector)).toContainText("Starburst");
  await expect(first.locator("[data-remove-game]")).toHaveCount(1);
  await expect
    .poll(() =>
      first.evaluate(() =>
        JSON.parse(localStorage.getItem("slotfolio-compare")!),
      ),
    )
    .toEqual(["starburst"]);
});

test("the tray stays usable when browser storage is blocked", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    }),
  );
  await page.goto("/slots/");
  await page.locator(".compare-button").nth(0).click();
  await page.locator(".compare-button").nth(1).click();
  await expect(page.locator(`${traySelector} [data-remove-game]`)).toHaveCount(
    2,
  );
  await page.locator("[data-compare-open]").click();
  await expect(page.locator(".comparison-selection article")).toHaveCount(2);
});

test("mobile menu takes precedence and long edition names remain readable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/es/slots/");
  await page.evaluate(() => {
    localStorage.setItem(
      "slotfolio-compare",
      '["gates-of-olympus-2500","gates-of-olympus-super-scatter"]',
    );
    window.dispatchEvent(new Event("comparison-change"));
  });
  const tray = page.locator(traySelector);
  await expect(tray).toContainText("2500");
  await expect(tray).toContainText("Super Scatter");
  for (const name of await tray
    .locator("[data-remove-game] span:first-child")
    .all()) {
    expect(
      await name.evaluate((el) => el.scrollWidth - el.clientWidth),
    ).toBeLessThanOrEqual(1);
  }
  expect((await tray.boundingBox())!.height).toBeLessThan(300);
  await page.locator(".menu-toggle").click();
  await expect(tray).toBeHidden();
  await page.locator(".menu-toggle").press("Escape");
  await expect(tray).toBeVisible();
});
