import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test("Sweet Bonanza collection cover uses its dedicated locally bundled artwork", async ({ page }) => {
  await page.goto("/collections/beyond-lines");

  const cover = page.locator(".collection-entry").first();
  const image = cover.locator("img");
  await expect(cover).toHaveClass(/collection-entry--sweet-bonanza/);
  await expect(image).toHaveAttribute("src", /\/images\/collections\/sweet-bonanza-feature\.svg$/);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(async () => image.evaluate((node) => {
    const img = node as HTMLImageElement;
    return img.complete && img.naturalWidth === 1200 && img.naturalHeight === 675;
  })).toBe(true);

  for (const other of [1, 2]) {
    await expect(page.locator(".collection-entry").nth(other).locator("img")).not.toHaveAttribute(
      "src",
      /sweet-bonanza-feature\.svg$/,
    );
  }
});

test("collection artwork embeds the unchanged local original, without remote image requests", () => {
  const original = readFileSync(join(process.cwd(), "public/images/sweet-bonanza.png")).toString("base64");
  const svg = readFileSync(join(process.cwd(), "public/images/collections/sweet-bonanza-feature.svg"), "utf8");
  expect(svg).toContain(`href="data:image/png;base64,${original}"`);
  expect(svg).toContain('width="1200" height="675"');
  expect(svg).not.toContain("<script");
});
