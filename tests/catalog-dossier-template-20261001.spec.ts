import { expect, test } from "@playwright/test";

for (const slug of ["bgaming-multi-rush", "playn-go-nsync-pop"]) {
  test(`catalog ${slug} uses the dossier template without inventing facts`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading")).toBeVisible();
    await expect(page.locator(".slot-intro")).toBeVisible();
    await expect(page.locator(".slot-figure .catalog-editorial-cover")).toBeVisible();
    await expect(page.locator(".catalog-editorial-cover")).toContainText(slug === "bgaming-multi-rush" ? "Multi Rush" : "NSYNC Pop");
    await expect(page.locator(".article-layout")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Цифры без ложной точности" })).toBeVisible();
    await expect(page.locator("#facts")).toBeVisible();
    await expect(page.locator(".catalog-record-page")).toHaveCount(0);
  });
}
