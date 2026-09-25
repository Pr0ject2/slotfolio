import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

const expected = {
  "3-oaks-gaming-3-jewel-crowns": { rtp: "95,65%", maxWin: "1 000x", volatility: "Высокая" },
  "3-oaks-gaming-3-olymp-fortunes": { rtp: "96,08%", maxWin: "1 000–5 000x (источники расходятся)", volatility: "Высокая" },
  "3-oaks-gaming-777-fruity-coins": { rtp: "96,01%", maxWin: "1 055–3 000x (зависит от версии)", volatility: "Средняя–выше средней" },
  "3-oaks-gaming-amazonia-wins": { rtp: "95,66%", maxWin: ">20 000x", volatility: "Высокая" },
  "3-oaks-gaming-dancing-joker": { rtp: "95,71%", maxWin: "1 039x", volatility: "Средняя–высокая" },
  "3-oaks-gaming-grab-more-gold": { rtp: "95,7%", maxWin: "1 000–10 000x (зависит от версии)", volatility: "Средняя–высокая" },
  "3-oaks-gaming-grab-the-gold": { rtp: "95,71%", maxWin: "6 526x", volatility: "Высокая" },
  "3-oaks-gaming-grand": { rtp: "95,44%", maxWin: "5 000x", volatility: "Средняя" },
  "3-oaks-gaming-hot-fire-fruits": { rtp: "95,65%", maxWin: "60x", volatility: "Низкая–средняя" },
  "3-oaks-gaming-joker-glitz-x1000": { rtp: "95,73–96,12% (зависит от версии)", maxWin: "40 000x", volatility: "Средняя–высокая" },
} as const;

test("3 Oaks passport closeout batch 14 preserves researched specs", () => {
  for (const [slug, values] of Object.entries(expected)) {
    const details = getVerifiedCatalogDetails(slug) as ReturnType<typeof getVerifiedCatalogDetails>;
    expect(details, slug).toBeTruthy();
    for (const [key, value] of Object.entries(values)) {
      expect(details?.[key as keyof typeof details], `${slug} ${key}`).toBe(value);
    }
  }
});
