import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const cases = [
  {
    slug: "jungle-volcano",
    provider: "3 Oaks Gaming",
    year: 2026,
    date: "7 мая 2026",
    gameType: "Slot",
    source: "https://3oaks.com/news/new-release-jungle-volcano",
    label: "официальный релиз 3 Oaks Gaming от 07.05.2026",
  },
  {
    slug: "gemhalla",
    provider: "BGaming",
    year: 2023,
    date: "15 июня 2023",
    gameType: "Slots",
    source: "https://bgaming.com/games/gemhalla",
    label: "официальная карточка BGaming от 15.06.2023",
  },
] as const;

for (const item of cases) {
  test(`${item.slug} keeps its first-party release passport`, async ({ page }) => {
    const slot = getSlot(item.slug);
    expect(slot?.provider).toBe(item.provider);
    expect(slot?.year).toBe(item.year);
    expect(getVerifiedSlotPassport(item.slug)).toEqual({
      releaseDate: item.date,
      gameType: item.gameType,
      source: item.source,
      sourceLabel: item.label,
    });

    await page.goto(`/slots/${item.slug}`);
    await expect(page.locator(".slot-summary .facts")).toContainText(item.date);
    await expect(page.locator(".slot-summary .facts")).toContainText(item.gameType);
  });
}
