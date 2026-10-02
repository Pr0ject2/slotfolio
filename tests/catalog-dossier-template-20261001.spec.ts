import { expect, test } from "@playwright/test";

for (const slug of ["bgaming-multi-rush", "playn-go-nsync-pop"]) {
  test(`catalog ${slug} uses the dossier template without invented artwork`, async ({ page }) => {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading")).toBeVisible();
    await expect(page.locator(".slot-intro")).toBeVisible();
    await expect(page.locator(".slot-figure")).toHaveCount(0);
    await expect(page.locator(".article-layout")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Цифры без ложной точности" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "На что смотреть перед запуском" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Где искать похожие игры" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Что нужно знать" })).toBeVisible();
    await expect(page.locator("#facts")).toBeVisible();
    await expect(page.locator(".slot-deck")).not.toContainText(/Official page|Official release|Подтверждённое игровое поле/);
    await expect(page.locator("body")).not.toContainText("Механика «");
    await expect.poll(() => page.locator(".dossier-feature-card p").count()).toBeGreaterThan(0);
    await expect(page.locator("body")).not.toContainText("подтверждённые механики собраны по официальной странице");
    await expect(page.locator(".catalog-record-page")).toHaveCount(0);
  });
}

test("catalog dossier renders approved game artwork", async ({ page }) => {
  await page.goto("/slots/catalog/3-oaks-gaming-3-clover-pots-extra");
  const artwork = page.locator(".slot-figure .catalog-dossier-art");
  await expect(artwork).toBeVisible();
  await expect(artwork).toHaveAttribute("src", /3-oaks-gaming-3-clover-pots-extra\.webp$/);
});
