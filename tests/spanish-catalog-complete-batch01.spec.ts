import batch from "../src/lib/spanish-catalog-complete-batch01.json" with { type: "json" };
import { completeSpanishCatalogBatchTests } from "./spanish-catalog-complete-helpers";
import { test, expect } from "@playwright/test";

completeSpanishCatalogBatchTests(1, batch);

const firstRoute = `/es/slots/catalog/${Object.keys(batch)[0]}/`;

test("Spanish casino link and promo code support keyboard, hover and a safe new tab", async ({ page, context }) => {
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      writeText: async (value: string) => { (window as Window & { copiedPromo?: string }).copiedPromo = value; },
    } });
  });
  await page.goto(firstRoute);
  const block = page.locator('[data-slot-casino-link="es"]');
  await block.getByRole("textbox", { name: "Código promocional", exact: true }).focus();
  await page.keyboard.press("Tab");
  const button = block.getByRole("button", { name: "Copiar el código promocional 3DDD", exact: true });
  await expect(button).toBeFocused();
  expect(await button.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
  const color = await button.evaluate(element => getComputedStyle(element).color);
  await button.hover();
  expect(await button.evaluate(element => getComputedStyle(element).color)).not.toBe(color);
  await button.press("Enter");
  await expect(block.getByRole("status")).toHaveText("Código promocional 3DDD copiado.");
  expect(await page.evaluate(() => (window as Window & { copiedPromo?: string }).copiedPromo)).toBe("3DDD");
  const link = block.getByRole("link", { name: "Elegir casino ↗", exact: true });
  await link.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(link).toBeFocused();
  expect(await link.evaluate(element => element.matches(":focus-visible"))).toBe(true);
  await expect(link).toHaveAttribute("target", "_blank");
  await context.route("https://viazento.link/**", route => route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Test destination</title>" }));
  const popupEvent = page.waitForEvent("popup");
  await link.press("Enter");
  const popup = await popupEvent;
  await popup.waitForLoadState();
  expect(popup.url()).toBe("https://viazento.link/slotfolio");
  expect(await popup.evaluate(() => window.opener === null)).toBe(true);
  await popup.close();
});

test("Spanish promo code stays available when clipboard access fails", async ({ page, context }) => {
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      writeText: async () => { throw new DOMException("Clipboard denied", "NotAllowedError"); },
    } });
  });
  await page.goto(firstRoute);
  const block = page.locator('[data-slot-casino-link="es"]');
  await block.getByRole("button").click();
  await expect(block.getByRole("status")).toHaveText("No se pudo copiar. Selecciona 3DDD y cópialo manualmente.");
  const code = block.getByRole("textbox");
  await code.focus();
  expect(await code.evaluate(element => ({ start: (element as HTMLInputElement).selectionStart, end: (element as HTMLInputElement).selectionEnd }))).toEqual({ start: 0, end: 4 });
  await expect(code).toHaveValue("3DDD");
  await expect(block.getByRole("button")).toBeEnabled();
});
