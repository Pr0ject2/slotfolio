import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

test("editorial, privacy and partnership pages speak to visitors", async ({ page }) => {
  await page.goto("/editorial-policy");
  await expect(page.getByRole("heading", { name: "Откуда мы берём информацию" })).toBeVisible();
  await expect(page.locator("main")).toContainText("Если точной информации нет");
  await expect(page.locator("main")).not.toContainText("Перед публичным запуском");

  await page.goto("/privacy");
  await expect(page.locator("main")).toContainText("Для поиска и сравнения игр не нужно создавать аккаунт");
  await expect(page.locator("main")).not.toContainText("slotfolio-compare");
  await expect(page.locator("main")).not.toContainText("До запуска политика будет дополнена");

  await page.goto("/disclosure");
  await expect(page.getByRole("heading", { name: "Есть ли партнёрские предложения сейчас?" })).toBeVisible();
  await expect(page.locator("main")).toContainText("Сейчас на Slotfolio нет действующих партнёрских предложений");
  await expect(page.locator("main")).not.toContainText("атрибутами sponsored");
  await expect(page.locator("main")).not.toContainText("Партнёрский адрес 1win");
});

test("regional guides and bonuses do not contain work-in-progress notes", async ({ page }) => {
  await page.goto("/regions");
  await expect(page.locator("main")).toContainText("Правила отличаются от страны к стране");
  await expect(page.locator("main")).not.toContainText("В каркасе представлена одна страна");
  await expect(page.getByRole("link", { name: /Великобритания/ })).toBeVisible();

  await page.goto("/regions/great-britain");
  await expect(page.getByRole("heading", { name: "Знакомый бренд — не гарантия" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Открыть официальный реестр/ })).toHaveAttribute("href", /gamblingcommission.gov.uk/);
  await expect(page.locator("main")).not.toContainText("В этом страновом разделе нет подключённых");
  await expect(page.locator("main")).not.toContainText("1win");

  await page.goto("/bonuses");
  await expect(page.locator("main")).toContainText("Самые важные");
  await expect(page.locator("main")).not.toContainText("Когда они появятся");
  await expect(page.getByRole("link", { name: /партнёрские материалы/ })).toHaveAttribute("href", /\/disclosure\/?$/);
});

test("provider and mechanic pages explain games, not internal samples", async ({ page }) => {
  await page.goto("/providers");
  await expect(page.locator(".provider-index-lead")).toContainText("Выберите студию");
  await expect(page.locator(".provider-data-note")).toHaveCount(0);

  for (const path of ["/providers/pragmatic-play", "/mechanics/cascades"]) {
    await page.goto(path);
    await expect(page.locator(".entity-statistics .section-title")).toContainText("Игры и их особенности");
    await expect(page.locator(".entity-statistics")).not.toContainText("Портрет выборки");
    await expect(page.locator(".entity-statistics")).not.toContainText("Частота тега в выборке");
    await expect(page.locator(".entity-statistics")).not.toContainText("Для каждого слота учтён один справочный RTP");
    await expect(page.locator(".entity-statistics")).toContainText("Волатильность");
  }
});

test("catalog, comparison and game overview use readable labels", async ({ page }) => {
  await page.goto("/slots");
  await expect(page.locator("main")).toContainText("1000 игр в одном месте");
  await expect(page.locator(".results-count")).toHaveText("1000 игр");
  await expect(page.locator("main")).not.toContainText("проверенными источниками провайдеров");

  await page.goto("/compare");
  await expect(page.locator(".comparison-end")).toContainText("Не нашли нужную игру?");
  await expect(page.locator(".comparison-end")).not.toContainText("Каталог расширяется постепенно");

  await page.goto("/slots/gates-of-olympus");
  await expect(page.getByRole("heading", { name: "Что важно знать об этих цифрах" })).toBeVisible();
  await expect(page.locator(".slot-body")).not.toContainText("фиксированный cap");
  await expect(page.locator(".slot-body")).not.toContainText("Среднее по середине списка");
  await expect(page.locator(".slot-body")).toContainText("Серединное значение RTP");
  await expect(page.locator(".slot-body")).toContainText("Об игре рассказывает разработчик");
  await expect(page.getByRole("link", { name: /Открыть таблицу сравнения/ })).toBeVisible();
});

test("reader-facing copy preserves SEO exclusions", async ({ page }) => {
  for (const path of ["/search", "/compare", "/slots/catalog/playn-go-reactoonz-100"]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});
