import { expect, test } from "@playwright/test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sitemap from "../src/app/sitemap";
import { systemPages } from "../src/lib/system-pages";
import { englishSystemPages } from "../src/lib/english-system-pages";
import { spanishSystemPages } from "../src/lib/spanish-system-pages";
import { englishReadyPaths } from "../src/lib/locales";
import { spanishReadyPaths } from "../src/lib/spanish-routes";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
const removed = ["/disclosure", "/regions", "/regions/great-britain"];
const prefixes = ["", "/en", "/es"];
const normalized = (path: string) => path.replace(/^\/slotfolio(?=\/|$)/, "").replace(/\/$/, "");
const removedPaths = new Set(prefixes.flatMap(prefix => removed.map(path => prefix + path)));
const isRemovedPath = (path: string) => removedPaths.has(path) || /^\/(?:en\/|es\/)?regions(?:\/|$)/.test(path);

test("deleted pages are absent from content, translation registries and sitemap", () => {
  for (const pages of [systemPages, englishSystemPages, spanishSystemPages]) {
    expect(Object.hasOwn(pages, "disclosure")).toBe(false);
  }
  for (const paths of [englishReadyPaths, spanishReadyPaths]) {
    for (const path of removed) expect(paths).not.toContain(path);
    expect(paths.filter(path => /^\/regions(?:\/|$)/.test(path))).toEqual([]);
  }
  for (const entry of sitemap()) {
    expect(isRemovedPath(normalized(new URL(entry.url).pathname))).toBe(false);
    for (const href of Object.values(entry.alternates!.languages!)) {
      expect(href).toBeTruthy();
      expect(isRemovedPath(normalized(new URL(href!).pathname))).toBe(false);
    }
  }
});

test("complete static export contains neither deleted pages nor internal links to them", () => {
  for (const path of removedPaths) expect(existsSync(join("out", path, "index.html"))).toBe(false);
  const invalid: string[] = [];
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://slotfolio.org";
  const internalHosts = new Set([new URL(origin).host, "slotfolio.org", "example.invalid", "pr0ject2.github.io"]);
  const files = readdirSync("out", { recursive: true }).filter(file => String(file).endsWith(".html"));
  expect(files.length).toBeGreaterThan(3000);
  for (const file of files) {
    const exportPath = "/" + String(file).replaceAll("\\", "/").replace(/\/index\.html$/, "");
    expect(isRemovedPath(normalized(exportPath)), String(file)).toBe(false);
    const html = readFileSync(join("out", String(file)), "utf8");
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      const url = new URL(href, origin);
      if (internalHosts.has(url.host) && isRemovedPath(normalized(url.pathname))) invalid.push(`${file}: ${href}`);
    }
  }
  expect(invalid).toEqual([]);
});

for (const prefix of prefixes) {
  test(`deleted information URLs return 404 in ${prefix || "RU"}`, async ({ request }) => {
    for (const path of removed) {
      expect((await request.get(prefix + path + "/", { maxRedirects: 0 })).status()).toBe(404);
    }
  });
  for (const width of [320, 1440]) {
    test(`remaining pages have no removed links at ${prefix || "RU"} ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["/about", "/bonuses", "/privacy", "/editorial-policy", "/slots/gates-of-olympus", "/slots/catalog/wazdan-mayan-ritual"]) {
        expect((await page.goto(prefix + route + "/"))!.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        const paths = await page.locator("a[href]").evaluateAll(links => links.map(a => new URL((a as HTMLAnchorElement).href).pathname));
        expect(paths.filter(path => isRemovedPath(normalized(path)))).toEqual([]);
        await expect(page.locator("footer")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
        if (route === "/about") await page.screenshot({ path: testInfo.outputPath(`about-${prefix.slice(1) || "ru"}-${width}.png`), fullPage: true });
      }
    });
  }
}
