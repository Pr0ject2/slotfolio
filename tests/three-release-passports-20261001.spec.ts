import { expect, test } from "@playwright/test";
import { getSlot } from "../src/lib/data";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

const cases = [
  {
    slug: "snake-arena",
    date: "6 января 2020",
    type: "Slot",
    source: "https://www.relax-gaming.com/news/2020/01/relax-gaming-launches-actionpacked-new-slot-snake-arena-across-network",
    label: "официальный релиз Relax Gaming от 06.01.2020",
  },
  {
    slug: "nitro-nights",
    date: "23 июня 2026",
    type: "Slot",
    source: "https://www.hacksawgaming.com/games/nitro-nights",
    label: "официальная страница Hacksaw Gaming от 23.06.2026",
  },
  {
    slug: "max-win-machine",
    date: "6 августа 2026",
    type: "Slot",
    source: "https://www.hacksawgaming.com/games/max-win-machine",
    label: "официальная страница Hacksaw Gaming от 06.08.2026",
  },
] as const;

for (const item of cases) {
  test(`${item.slug} has a verified first-party passport`, async ({ page }) => {
    const slot = getSlot(item.slug);
    expect(slot).toBeTruthy();
    expect(getVerifiedSlotPassport(item.slug)).toEqual({
      releaseDate: item.date,
      gameType: item.type,
      source: item.source,
      sourceLabel: item.label,
    });

    await page.goto(`/slots/${item.slug}`);
    const summary = page.locator(".slot-summary .facts");
    await expect(summary).toContainText(item.date);
    await expect(summary).toContainText(item.type);
    const facts = page.locator("#facts");
    await expect(facts).toContainText("Дата релиза и тип игры сверены по");
  });
}
