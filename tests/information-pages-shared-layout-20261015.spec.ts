import { expect, test } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

const pages = [
  "/about",
  "/editorial-policy",
  "/privacy",
  "/responsible-gaming",
];

test("information pages share readable layouts, visible links, and usable mobile navigation", async ({ page }) => {
  test.setTimeout(90_000);
  for (const path of pages) {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const heading = page.locator(".simple-heading h1");
      const tocLink = page.locator(".article-toc > a").first();
      const text = page.locator(".prose section p").first();
      const sourceLink = page.locator(".prose a").first();

      await expect(heading).toBeVisible();
      await expect(tocLink).toBeVisible();
      await expect(text).toBeVisible();
      await expect(sourceLink).toBeVisible();

      const metrics = await page.evaluate(() => {
        const heading = document.querySelector<HTMLElement>(".simple-heading h1")!;
        const tocLink = document.querySelector<HTMLElement>(".article-toc > a")!;
        const text = document.querySelector<HTMLElement>(".prose section p")!;
        const anchor = document.querySelector<HTMLElement>(".prose a")!;
        return {
          scrollWidth: document.documentElement.scrollWidth,
          headingSize: parseFloat(getComputedStyle(heading).fontSize),
          headingTopPadding: parseFloat(getComputedStyle(heading).paddingTop),
          tocHeight: tocLink.getBoundingClientRect().height,
          tocFont: parseFloat(getComputedStyle(tocLink).fontSize),
          paragraphFont: parseFloat(getComputedStyle(text).fontSize),
          linkDecoration: getComputedStyle(anchor).textDecorationLine,
        };
      });
      expect(metrics.scrollWidth, `${path} at ${width}px`).toBeLessThanOrEqual(width + 1);
      expect(metrics.headingSize).toBeGreaterThanOrEqual(34);
      expect(metrics.tocHeight).toBeGreaterThanOrEqual(44);
      expect(metrics.tocFont).toBeGreaterThanOrEqual(14);
      expect(metrics.paragraphFont).toBeGreaterThanOrEqual(16);
      expect(metrics.linkDecoration).toContain("underline");
      if (path === "/about") expect(metrics.headingTopPadding).toBe(0);
    }
  }
});

test("information navigation and source links are keyboard accessible", async ({ page }) => {
  await page.goto("/privacy");
  const sectionLink = page.locator(".article-toc > a").first();
  await sectionLink.focus();
  await expect(sectionLink).toBeFocused();
  const focusWidth = await sectionLink.evaluate((node) => parseFloat(getComputedStyle(node).outlineWidth));
  expect(focusWidth).toBeGreaterThanOrEqual(2);
  await sectionLink.click();
  await expect(page).toHaveURL(/#section-0$/);
  await page.goto("/responsible-gaming");
  await expect(page.getByRole("link", { name: /GamCare/ })).toHaveAttribute("href", "https://www.gamcare.org.uk/");
});
