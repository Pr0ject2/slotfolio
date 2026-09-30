import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const cases = [
  {
    slug: "fury-of-anubis",
    name: "Fury of Anubis",
    date: "25 июня 2026",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-unleashes-the-power-of-ancient-egypt-in-fury-of-anubis/",
    label: "официальный релиз Pragmatic Play от 25.06.2026",
    provider: "Pragmatic Play",
    year: 2026,
  },
  {
    slug: "mahjong-wins-super-scatter",
    name: "Mahjong Wins Super Scatter",
    date: "29 мая 2025",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-expands-super-scatter-series-with-mahjong-wins-super-scatter/",
    label: "официальный релиз Pragmatic Play от 29.05.2025",
    provider: "Pragmatic Play",
    year: 2025,
  },
] as const;

for (const item of cases) {
  test(`${item.name} keeps its first-party release passport`, () => {
    const slot = getSlot(item.slug);
    const passport = getVerifiedSlotPassport(item.slug);
    const metrics = getVerifiedSlotMetrics(item.slug);

    expect(slot?.provider).toBe(item.provider);
    expect(slot?.year).toBe(item.year);
    expect(passport).toEqual({
      releaseDate: item.date,
      gameType: "Slot",
      source: item.source,
      sourceLabel: item.label,
    });
    expect(metrics?.maxWin).toBeTruthy();
  });

  test(`${item.name} renders its verified release passport`, async ({ page }) => {
    await page.goto(`/slots/${item.slug}`);
    const summary = page.locator(".slot-summary .facts");
    await expect(summary).toContainText(item.date);
    await expect(summary).toContainText("Slot");
    await expect(
      page.locator("#facts").getByRole("link", { name: item.label }),
    ).toHaveCount(1);
  });
}
