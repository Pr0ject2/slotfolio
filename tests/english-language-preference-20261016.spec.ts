import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

test("a manual language choice is saved even before React hydrates", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "en-GB" });
  await context.route("**/_next/static/chunks/**", (route) => route.abort());
  const page = await context.newPage();
  await page.goto("/en/");
  await page.getByRole("link", { name: "RU", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(
    await page.evaluate(() => localStorage.getItem("slotfolio-language")),
  ).toBe("ru");
  await context.close();
});

test("automatic language selection preserves the hosting mount, query and fragment", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "en-GB" });
  const page = await context.newPage();
  const mount = process.env.NEXT_PUBLIC_BASE_PATH || "";
  await page.goto(`${mount}/?locale-check=1#main`);
  await expect
    .poll(() => new URL(page.url()).pathname.replace(/\/$/, ""))
    .toBe(`${mount}/en`);
  expect(new URL(page.url()).search).toBe("?locale-check=1");
  expect(new URL(page.url()).hash).toBe("#main");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await context.close();
});

test("uses the browser language on first visit and keeps a manual choice", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "en-GB" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "RU", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(
    page.evaluate(() => localStorage.getItem("slotfolio-language")),
  ).resolves.toBe("ru");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await context.close();
});

test("retains the English selection on a Russian URL", async ({ browser }) => {
  const context = await browser.newContext({ locale: "ru-RU" });
  await context.addInitScript(() =>
    localStorage.setItem("slotfolio-language", "en"),
  );
  const page = await context.newPage();
  await page.goto("/slots/");
  await expect(page).toHaveURL(/\/en\/slots\/?$/);
  await expect(
    page.getByRole("heading", { name: /Explore the slot catalogue/ }),
  ).toBeVisible();
  await context.close();
});

test("an English browser keeps a direct link to an untranslated Russian dossier", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "en-GB" });
  const page = await context.newPage();
  await page.goto("/slots/bear-crazy/");
  await expect(page).toHaveURL(/\/slots\/bear-crazy\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await context.close();
});

test("manual language changes preserve query and anchors before and after hydration", async ({
  browser,
}) => {
  for (const hydrated of [false, true]) {
    const context = await browser.newContext({
      locale: "en-GB",
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();
    if (!hydrated)
      await page.route("**/_next/**/*.js", (route) => route.abort());
    await page.goto("/en/providers/pragmatic-play/?audit=locale#games");
    await page.getByRole("link", { name: "RU", exact: true }).click();
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toMatch(/\/providers\/pragmatic-play\/?$/);
    expect(new URL(page.url()).searchParams.get("audit")).toBe("locale");
    expect(new URL(page.url()).hash).toBe("#games");
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toMatch(/\/en\/providers\/pragmatic-play\/?$/);
    expect(new URL(page.url()).searchParams.get("audit")).toBe("locale");
    expect(new URL(page.url()).hash).toBe("#games");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(
      await page.evaluate(() => localStorage.getItem("slotfolio-language")),
    ).toBe("en");
    await context.close();
  }
});

test("translated dossiers expose a direct language counterpart", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "ru-RU" });
  const page = await context.newPage();
  await page.goto("/slots/sugar-rush-1000/");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/slots\/sugar-rush-1000\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await context.close();
});
