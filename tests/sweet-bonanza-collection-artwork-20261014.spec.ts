import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getSlot } from "../src/lib/data";

const source = "/images/slots/sweet-bonanza.webp";

test("Sweet Bonanza uses the same 799×466 locally checked-in artwork in its collection and dossier", async ({ page }) => {
  for (const route of ["/collections/beyond-lines", "/slots/sweet-bonanza"]) {
    await page.goto(route);
    const image = route.includes("collections")
      ? page.locator(".collection-entry").first().locator("img")
      : page.locator(".slot-figure img");
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("src", new RegExp(source.replaceAll(".", "\\.") + "$"));
    await expect.poll(async () => image.evaluate((node) => {
      const element = node as HTMLImageElement;
      return {
        loaded: element.complete,
        width: element.naturalWidth,
        height: element.naturalHeight,
        fallback: element.currentSrc.includes("unavailable.svg"),
      };
    })).toEqual({ loaded: true, width: 799, height: 466, fallback: false });
  }
});

test("updated local PNG and WebP preserve verified game provenance and avoid remote image requests", () => {
  const png = readFileSync(join(process.cwd(), "public/images/sweet-bonanza.png"));
  const webp = readFileSync(join(process.cwd(), "public/images/slots/sweet-bonanza.webp"));
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(png.readUInt32BE(16)).toBe(799);
  expect(png.readUInt32BE(20)).toBe(466);
  expect(webp.toString("ascii", 0, 4)).toBe("RIFF");
  expect(webp.toString("ascii", 8, 12)).toBe("WEBP");
  expect(webp.byteLength).toBeGreaterThan(100_000);
  expect(getSlot("sweet-bonanza")?.image).toBe(source);
  expect(getSlot("sweet-bonanza")?.source).toBe("https://www.pragmaticplay.com/en/games/sweet-bonanza/");
});

test("other Beyond Lines artwork is unchanged", async ({ page }) => {
  await page.goto("/collections/beyond-lines");
  for (const other of [1, 2]) {
    await expect(page.locator(".collection-entry").nth(other).locator("img"))
      .not.toHaveAttribute("src", /sweet-bonanza\.webp$/);
  }
});
