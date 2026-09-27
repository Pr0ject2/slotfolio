import { expect, test } from "@playwright/test";

test("operator-backed dossier source is labeled by its actual host", async ({ page }) => {
  await page.goto("/slots/crypto-genesys");

  const source = page.locator(
    '#facts .source-note a[href="https://forum.1win.com/23-slot-games/"]',
  );
  await expect(source).toHaveText("forum.1win.com ↗");
  await expect(page.locator("#facts")).not.toContainText("официальная страница Pragmatic Play");
});

test("provider-backed dossier source keeps a transparent provider hostname", async ({ page }) => {
  await page.goto("/slots/crown-coins");

  const source = page.locator(
    '#facts .source-note a[href="https://endorphina.com/games/crown-coins"]',
  );
  await expect(source).toHaveText("endorphina.com ↗");
});
