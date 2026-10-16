import { test, expect } from "@playwright/test";
import { journalGuides } from "../src/lib/journal-guides";
import sitemap from "../src/app/sitemap";
import { absoluteUrl } from "../src/lib/seo";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

test("practical guides have unique sitemap entries", () => {
  const urls = sitemap().map((item) => item.url);
  for (const guide of journalGuides) {
    expect(
      urls.filter((url) => url === absoluteUrl(`/journal/${guide.slug}`)),
    ).toHaveLength(1);
  }
});

test("journal opens each guide with consistent metadata and working related pages", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  const destinations = new Set<string>();
  for (const guide of journalGuides) {
    await page.goto("/journal");
    await page.getByRole("link", { name: guide.title, exact: true }).click();
    await expect(page.locator("main h1")).toHaveText(guide.title);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical!).pathname).toMatch(
      new RegExp(`/journal/${guide.slug}/?$`),
    );
    const article = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes
          .map((node) => JSON.parse(node.textContent!))
          .find((item) => item["@type"] === "Article"),
      );
    expect(article.headline).toBe(guide.title);
    expect(article.url).toBe(canonical);
    for (const link of [...guide.related, ...guide.sources])
      if (link.href.startsWith("/")) destinations.add(link.href);
  }
  for (const route of destinations)
    expect((await request.get(route)).status(), route).toBe(200);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`guides are readable and keyboard accessible at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/journal",
      ...journalGuides.map((guide) => `/journal/${guide.slug}`),
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      expect(
        (await page.locator("main h1").boundingBox())!.height,
      ).toBeLessThan(210);
      if (route !== "/journal") {
        expect(
          await page
            .locator("article p, article li")
            .evaluateAll((nodes) =>
              Math.min(
                ...nodes.map((node) =>
                  parseFloat(getComputedStyle(node).fontSize),
                ),
              ),
            ),
        ).toBeGreaterThanOrEqual(16);
        const toc = page.getByRole("navigation", { name: "В материале" });
        for (const anchor of await toc.getByRole("link").all())
          await expect(
            page.locator((await anchor.getAttribute("href"))!),
          ).toHaveCount(1);
        const first = toc.getByRole("link").first();
        await first.focus();
        await expect(first).toBeFocused();
        expect(
          await first.evaluate((node) => getComputedStyle(node).outlineStyle),
        ).not.toBe("none");
        const expectedHash = await first.getAttribute("href");
        await page.keyboard.press("Enter");
        await expect.poll(() => new URL(page.url()).hash).toBe(expectedHash);
      }
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.screenshot({
        path: testInfo.outputPath(`${route.replaceAll("/", "_")}-${width}.png`),
        fullPage: true,
      });
    }
  });
}
