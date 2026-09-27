import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";

test("Crown Coins does not advertise a pick bonus absent from Endorphina evidence", () => {
  const slot = getSlot("crown-coins");

  expect(slot).toBeTruthy();
  expect(slot?.source).toBe("https://endorphina.com/games/crown-coins");
  expect(slot?.tags).not.toContain("Pick-бонус");
  expect(slot?.tags).toEqual(
    expect.arrayContaining(["Wild", "Risk Game", "Сбор значений", "Джекпоты"]),
  );
  expect(slot?.rtp).toBe("96,06%");
  expect(slot?.field).toBe("3 × 3");
});

test("Crown Coins dossier no longer renders the unsupported pick-bonus tag", async ({ page }) => {
  await page.goto("/slots/crown-coins");

  await expect(page.locator(".facts")).not.toContainText("Pick-бонус");
  await expect(page.locator(".facts")).toContainText("Сбор значений");
  await expect(page.locator(".facts")).toContainText("Джекпоты");
});
