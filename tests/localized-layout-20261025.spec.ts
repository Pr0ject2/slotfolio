import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

for (const locale of ["en", "es"]) {
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    test(`${locale} editorial layout and navigation at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await page.evaluate(() => document.fonts.ready);
      const header = page.locator("header").first();
      const primary = header.locator("nav");
      await expect(primary.getByRole("link")).toHaveCount(4);
      const hrefs = await primary
        .getByRole("link")
        .evaluateAll((links) =>
          links.map((a) =>
            new URL((a as HTMLAnchorElement).href).pathname.replace(/\/$/, ""),
          ),
        );
      expect(hrefs).toEqual(
        ["slots", "mechanics", "journal", "collections"].map(
          (route) => `/${locale}/${route}`,
        ),
      );
      if (width <= 600) {
        const toggle = header.locator(".menu-toggle");
        await toggle.focus();
        await toggle.press("Enter");
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(header.locator(".secondary-nav a").first()).toBeVisible();
        await expect(
          header.locator(".secondary-nav a").first(),
        ).toHaveAttribute("href", new RegExp(`/${locale}/providers/?$`));
        await toggle.press("Escape");
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(toggle).toBeFocused();
      }
      const story = page.locator(".side-story"),
        artwork = story.locator("img"),
        readingLink = story.locator("a.text-link");
      const imageBox = (await artwork.boundingBox())!,
        linkBox = (await readingLink.boundingBox())!;
      if (width <= 600) {
        expect(linkBox.y).toBeGreaterThanOrEqual(
          imageBox.y + imageBox.height - 1,
        );
        expect(linkBox.height).toBeGreaterThanOrEqual(44);
      }
      if (width <= 767) {
        const title = page.locator(".catalog-preview .section-title");
        const headingBox = (await title.locator("h2").boundingBox())!,
          actionBox = (await title.locator("a").boundingBox())!;
        expect(actionBox.y).toBeGreaterThanOrEqual(
          headingBox.y + headingBox.height - 1,
        );
        const signoff = (await page
            .locator(".editorial-signoff")
            .boundingBox())!,
          copy = (await page.locator(".editorial-signoff p").boundingBox())!,
          action = (await page.locator(".editorial-signoff >a").boundingBox())!;
        expect(copy.width).toBeGreaterThanOrEqual(signoff.width - 50);
        expect(action.y).toBeGreaterThanOrEqual(copy.y + copy.height - 1);
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      // A normal click must hit the link, rather than the overlapping artwork.
      await readingLink.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/slots/reactoonz/?$`));
      await expect(page.locator("h1")).toHaveText("Reactoonz");
      await page.goto(`/${locale}/slots/`);
      await expect(page.locator(".breadcrumbs")).toContainText(
        locale === "en" ? "Catalogue" : "Catálogo",
      );
      await expect(page.locator(".catalog-game")).toHaveCount(18);
      const breadcrumb = (await page.locator(".breadcrumbs").boundingBox())!,
        heading = (await page.locator(".page-heading").boundingBox())!;
      expect(heading.y).toBeGreaterThanOrEqual(
        breadcrumb.y + breadcrumb.height,
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
    });
  }
  for (const width of [390, 1440]) {
    test(`${locale} translated templates stay inside viewport at ${width}px`, async ({
      page,
    }) => {
      test.setTimeout(90_000);
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        "/slots/gates-of-olympus/",
        "/slots/catalog/wazdan-mayan-ritual/",
        "/providers/",
        "/providers/pragmatic-play/",
        "/mechanics/",
        "/journal/",
        "/journal/how-cascades-work/",
        "/collections/",
        "/about/",
      ]) {
        const response = await page.goto(`/${locale}${route}`);
        expect(response!.status()).toBe(200);
        await expect(page.locator("h1")).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
          route,
        ).toBeLessThanOrEqual(width + 1);
      }
    });
  }
}

test("English editorial filter link stays in English", async ({ page }) => {
  await page.goto("/en/slots/");
  const link = page.locator(".filter-note a");
  await expect(link).toHaveAttribute(
    "href",
    /\/en\/collections\/beyond-lines\/?$/,
  );
  await expect(link).not.toContainText("Russian");
});
