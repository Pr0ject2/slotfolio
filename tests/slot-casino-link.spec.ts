import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createCatalogModel } from "../src/lib/catalog-index";

const destination = "https://viazento.link/slotfolio";
const examples = [
  { route: "/slots/gates-of-olympus/", locale: "ru", name: "Где поиграть в этот слот?", action: "Выбрать казино ↗" },
  { route: "/slots/catalog/3-oaks-gaming-15-dragon-pearls/", locale: "ru", name: "Где поиграть в этот слот?", action: "Выбрать казино ↗" },
  { route: "/en/slots/gates-of-olympus/", locale: "en", name: "Where can you play this slot?", action: "Choose a casino ↗" },
  { route: "/en/slots/catalog/3-oaks-gaming-15-dragon-pearls/", locale: "en", name: "Where can you play this slot?", action: "Choose a casino ↗" },
] as const;

test("every published game export contains one casino block in each language", async () => {
  const games = createCatalogModel().items;
  expect(games).toHaveLength(1000);
  expect(games.filter(game => game.coverage === "dossier")).toHaveLength(100);
  expect(games.filter(game => game.coverage === "catalog")).toHaveLength(900);
  expect(new Set(games.map(game => game.slug)).size).toBe(1000);
  let checked = 0;
  for (const locale of ["ru", "en"] as const) {
    for (const game of games) {
      const route = `${locale === "en" ? "en/" : ""}slots/${game.coverage === "catalog" ? "catalog/" : ""}${game.slug}`;
      const html = readFileSync(path.join(process.cwd(), "out", route, "index.html"), "utf8");
      assert.equal((html.match(/<aside[^>]*data-slot-casino-link="(?:ru|en)"/g) ?? []).length, 1, route);
      assert.ok(html.includes(`href="${destination}" target="_blank" rel="sponsored nofollow noopener noreferrer"`), route);
      const blockStart = html.indexOf(`data-slot-casino-link="${locale}"`);
      const factsStart = html.indexOf('<dl class="facts');
      assert.ok(blockStart > 0 && factsStart > blockStart, route);
      const block = html.slice(blockStart, html.indexOf("</aside>", blockStart));
      assert.equal((block.match(/data-promo-code="3DDD"/g) ?? []).length, 1, route);
      assert.ok(!block.includes("Партнёрская ссылка · 18+") && !block.includes("Affiliate link · 18+"), route);
      // Keep the worker responsive while checking all 2,000 exported files.
      if (++checked % 100 === 0) await new Promise<void>(resolve => setImmediate(resolve));
    }
  }
});

for (const example of examples) {
  for (const width of [320, 375, 390, 1440]) {
    test(`casino block is placed and readable on ${example.route} at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(example.route);
      await page.evaluate(() => document.fonts.ready);
      const block = page.locator("[data-slot-casino-link]");
      await expect(block).toHaveCount(1);
      await expect(block).toHaveAttribute("data-slot-casino-link", example.locale);
      await expect(block.getByRole("heading", { name: example.name, exact: true })).toBeVisible();
      expect(await block.evaluate(el => el.nextElementSibling?.matches("dl.facts"))).toBe(true);
      const link = block.getByRole("link", { name: example.action, exact: true });
      await expect(link).toHaveAttribute("href", destination);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "sponsored nofollow noopener noreferrer");
      await expect(link.locator("a")).toHaveCount(0);
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      const code = block.getByRole("textbox", { name: example.locale === "ru" ? "Промокод" : "Promo code", exact: true });
      await expect(code).toHaveValue("3DDD");
      await expect(code).toHaveAttribute("readonly", "");
      const copyButton = block.getByRole("button", { name: example.locale === "ru" ? "Скопировать промокод 3DDD" : "Copy promo code 3DDD", exact: true });
      await expect(copyButton).toBeVisible();
      expect((await copyButton.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await expect(block).toContainText(example.locale === "ru" ? "условия дополнительных бонусов" : "terms of additional bonuses");
      await expect(block).not.toContainText(example.locale === "ru" ? "Партнёрская ссылка · 18+" : "Affiliate link · 18+");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      expect(await block.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
      const shot = testInfo.outputPath(`casino-${example.locale}-${width}.png`);
      await page.locator(".slot-summary").screenshot({ path: shot });
      await testInfo.attach("Casino block and unchanged game characteristics", { path: shot, contentType: "image/png" });
    });
  }

  test(`casino link supports keyboard, hover and a safe new tab on ${example.route}`, async ({ page, context }) => {
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        writeText: async (value: string) => { (window as Window & { copiedPromo?: string }).copiedPromo = value; },
      } });
    });
    await page.goto(example.route);
    const block = page.locator("[data-slot-casino-link]");
    const code = block.getByRole("textbox");
    await code.focus();
    await page.keyboard.press("Tab");
    const button = block.getByRole("button");
    await expect(button).toBeFocused();
    expect(await button.evaluate(el => getComputedStyle(el).outlineWidth)).toBe("3px");
    const buttonColor = await button.evaluate(el => getComputedStyle(el).color);
    await button.hover();
    expect(await button.evaluate(el => getComputedStyle(el).color)).not.toBe(buttonColor);
    await button.press("Enter");
    await expect(block.getByRole("status")).toHaveText(example.locale === "ru" ? "Промокод 3DDD скопирован." : "Promo code 3DDD copied.");
    expect(await page.evaluate(() => (window as Window & { copiedPromo?: string }).copiedPromo)).toBe("3DDD");
    const link = page.locator("[data-slot-casino-link]").getByRole("link", { name: example.action });
    await link.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(link).toBeFocused();
    const focus = await link.evaluate(el => ({ visible: el.matches(":focus-visible"), width: getComputedStyle(el).outlineWidth, style: getComputedStyle(el).outlineStyle }));
    expect(focus.visible).toBe(true);
    expect(focus.width).toBe("3px");
    expect(focus.style).toBe("solid");
    await page.mouse.move(0, 0);
    const normal = await link.evaluate(el => getComputedStyle(el).backgroundColor);
    await link.hover();
    expect(await link.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(normal);
    // Exercise the actual anchor without contacting the affiliate destination.
    await context.route("https://viazento.link/**", route => route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Test destination</title>" }));
    const popupEvent = page.waitForEvent("popup");
    await link.press("Enter");
    const popup = await popupEvent;
    await popup.waitForLoadState();
    expect(popup.url()).toBe(destination);
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await popup.close();
  });

  test(`promo code remains manually copyable when clipboard is denied on ${example.route}`, async ({ page, context }) => {
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        writeText: async () => { throw new DOMException("Clipboard denied", "NotAllowedError"); },
      } });
    });
    await page.goto(example.route);
    const block = page.locator("[data-slot-casino-link]");
    await block.getByRole("button").click();
    await expect(block.getByRole("status")).toHaveText(example.locale === "ru"
      ? "Не удалось скопировать. Выделите 3DDD и скопируйте вручную."
      : "Could not copy. Select 3DDD and copy it manually.");
    const code = block.getByRole("textbox");
    await code.focus();
    expect(await code.evaluate(el => ({ start: (el as HTMLInputElement).selectionStart, end: (el as HTMLInputElement).selectionEnd }))).toEqual({ start: 0, end: 4 });
    await expect(code).toHaveValue("3DDD");
    await expect(block.getByRole("button")).toBeEnabled();
  });
}
