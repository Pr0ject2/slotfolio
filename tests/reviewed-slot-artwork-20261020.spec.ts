import { expect, test, type Locator, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { slots, getSlot, providerSlug } from "../src/lib/data";
import { createCatalogModel } from "../src/lib/catalog-index";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const games = [
  { slug: "house-of-sins", name: "House of Sins", provider: "BGaming", sha: "db518968ca5dadfe4a87d25f4595cd9e1b772535d8874d73f9bff6e46d4a12cf" },
  { slug: "gates-of-olympus-2500", name: "Gates of Olympus 2500", provider: "Pragmatic Play", sha: "95cb9dde555db4ac98590c24fb6b59ca99a6236d13f9bb1f35f64e9b3ea249c8" },
  { slug: "sweet-bonanza-1000", name: "Sweet Bonanza 1000", provider: "Pragmatic Play", sha: "d575e940324ca8a393fd6c7f8489c7af176829cfd66c0de2a018dca77bd5ac04" },
] as const;
const retired = ["gates-of-1win", "1win-bonanza", "house-of-sins"];

async function realImage(image: Locator, slug: string) {
  await expect(image).toBeVisible();
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute("src", new RegExp(`/images/slots/${slug}\\.webp$`));
  await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth >= 300)).toBe(true);
  await expect(image).toHaveCSS("object-fit", "contain");
}

async function noOverflow(page: Page, width: number) {
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  await expect(page.locator('main img[src$=".svg"]')).toHaveCount(0);
}

test("all approved covers are real WebP assets; only the two approved games change", async () => {
  const model = createCatalogModel();
  expect(model.items).toHaveLength(1000);
  expect(slots).toHaveLength(100);
  const catalog = model.items.filter(game => game.coverage === "catalog").map(game => game.slug).sort();
  expect(catalog).toHaveLength(900);
  expect(createHash("sha256").update(JSON.stringify(catalog)).digest("hex")).toBe("9ea6a0dee892ac35f380d94919e3d2c633bc5ebb26b4fa370b7ccd2d9ad179d0");
  expect(model.items.every(game => !game.image?.endsWith(".svg"))).toBe(true);
  expect(getSlot("gates-of-1win")).toBeUndefined();
  expect(getSlot("1win-bonanza")).toBeUndefined();
  for (const slug of retired) expect(existsSync(path.join(process.cwd(), "public/images/slots", slug + ".svg"))).toBe(false);
  const manifests = ["image-sources.json", "image-sources-v128.json", "image-sources-v129.json", "image-sources-v130.json"]
    .flatMap(file => JSON.parse(readFileSync(path.join(process.cwd(), "docs", file), "utf8")));
  expect(manifests.every(entry => !entry.placeholder && entry.localize !== "checked-in-placeholder" && !entry.local.endsWith(".svg"))).toBe(true);
  for (const game of games) {
    const entry = manifests.filter(entry => entry.slug === game.slug);
    expect(entry).toHaveLength(1);
    expect(entry[0].local).toBe(`/images/slots/${game.slug}.webp`);
    expect(entry[0].localize).toBe("build-time");
    expect(entry[0].requireExplicitImage).toBe(true);
    expect(new URL(entry[0].page).hostname).toBe(game.slug === "house-of-sins" ? "forum.1win.com" : "www.pragmaticplay.com");
    expect(new URL(entry[0].image).protocol).toBe("https:");
    const bytes = readFileSync(path.join(process.cwd(), "public", entry[0].local));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(game.sha);
    const metadata = await sharp(bytes).metadata();
    expect(metadata.format).toBe("webp");
    expect(metadata.width).toBeGreaterThanOrEqual(300);
    expect(metadata.width).toBeLessThanOrEqual(960);
    expect(metadata.height).toBeLessThanOrEqual(540);
    expect(bytes.length).toBeLessThanOrEqual(220 * 1024);
  }
  expect(getSlot("gates-of-olympus-2500")?.availability).toBeUndefined();
  expect(getSlot("sweet-bonanza-1000")?.availability?.[0].source).toBe("https://t.me/s/reg_official_1win/3159");
  expect(getSlot("sweet-bonanza-1000")?.rtp).toBe("96,53%");
  expect(getVerifiedSlotMetrics("sweet-bonanza-1000")?.rtpVariants).toEqual(["96,53%"]);
  expect(getVerifiedSlotMetrics("sweet-bonanza-1000")?.source).toBe("https://www.pragmaticplay.com/en/games/sweet-bonanza-1000/");
});

for (const locale of ["ru", "en"] as const) {
  const root = locale === "en" ? "/en" : "";
  for (const width of [320, 375, 390, 1440]) {
    test(`reviewed dossier artwork: ${locale} at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      for (const game of games) {
        expect((await page.goto(`${root}/slots/${game.slug}/`))?.status()).toBe(200);
        await expect(page.getByRole("heading", { name: game.name, exact: true })).toBeVisible();
        await realImage(page.locator(".slot-figure img").first(), game.slug);
        await noOverflow(page, width);
        if (locale === "en") await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
        const shot = testInfo.outputPath(`${game.slug}-${locale}-${width}.png`);
        await page.locator(".slot-intro").screenshot({ path: shot });
        await testInfo.attach(`${game.name} artwork and facts`, { path: shot, contentType: "image/png" });
      }
    });
  }
  for (const width of [320, 1440]) {
    test(`reviewed artwork remains visible in lists and covers: ${locale} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      for (const game of games) {
        await page.goto(`${root}/slots/?q=${encodeURIComponent(game.name)}`);
        const card = page.locator(`[data-slot="${game.slug}"]`);
        for (const view of [locale === "en" ? "List view" : "Список", locale === "en" ? "Cover view" : "Обложки"]) {
          await page.getByRole("button", { name: view, exact: true }).click();
          await realImage(card.locator("img"), game.slug);
          await noOverflow(page, width);
        }
      }
    });
    test(`reviewed artwork remains visible in publisher rows: ${locale} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      for (const game of games) {
        await page.goto(`${root}/providers/${providerSlug(game.provider)}/`);
        await realImage(page.locator(`.game-row img[src$="/${game.slug}.webp"]`), game.slug);
        await noOverflow(page, width);
      }
    });
    test(`reviewed artwork remains visible in comparison: ${locale} ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${root}/compare/`);
      for (const pair of [[games[0], games[1]], [games[1], games[2]]]) {
        for (const game of pair) {
          await page.getByLabel(locale === "en" ? "Add a game" : "Добавить игру", { exact: true }).selectOption(game.slug);
          await page.getByRole("button", { name: locale === "en" ? "Add" : "Добавить", exact: true }).click();
          await realImage(page.locator(`.comparison-selection img[src$="/${game.slug}.webp"]`), game.slug);
        }
        await noOverflow(page, width);
        await page.getByRole("button", { name: locale === "en" ? "Clear comparison" : "Очистить сравнение", exact: true }).click();
        await expect(page.locator(".comparison-selection article")).toHaveCount(0);
      }
    });
  }
}
