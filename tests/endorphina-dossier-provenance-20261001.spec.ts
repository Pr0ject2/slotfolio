import { expect, test } from "@playwright/test";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";

type ExpectedDossier = {
  slug: string;
  rtp: string;
  maxWin?: string;
  source: string;
  releaseDate?: string;
  gameType?: string;
  passportSource?: string;
};

const dossiers: ExpectedDossier[] = [
  {
    slug: "burning-coins-20", rtp: "96,01%", maxWin: "1 000x",
    source: "https://endorphina.com/games/burning-coins-20",
    releaseDate: "15 мая 2025", gameType: "Classic Slot",
    passportSource: "https://endorphina.com/news/burning-coins-20-strengthens-endorphinas-classic-slot-range",
  },
  {
    slug: "hell-hot-100", rtp: "96,07%",
    source: "https://endorphina.com/games/hell-hot-100",
    releaseDate: "26 мая 2021", gameType: "Slot",
    passportSource: "https://endorphina.com/news/take-the-heat-in-hell-hot-100",
  },
  {
    slug: "81-burning-ways", rtp: "96,05%",
    source: "https://endorphina.com/games/81-burning-ways",
    releaseDate: "20 августа 2024", gameType: "Classic Slot",
    passportSource: "https://endorphina.com/news/81-burning-ways-the-newest-classic-fruit-slot-makes-way-to-our-portfolio",
  },

  {
    slug: "crown-coins", rtp: "96,06%", maxWin: "1 000x",
    source: "https://endorphina.com/games/crown-coins",
    releaseDate: "4 июля 2024", gameType: "Classic Slot",
    passportSource: "https://endorphina.com/news/the-classic-crown-coins-slot-joins-our-game-portfolio",
  },
  {
    slug: "lucky-streak-1000", rtp: "96,07%", maxWin: "1 000x",
    source: "https://endorphina.com/games/lucky-streak-1000",
    releaseDate: "10 декабря 2024", gameType: "Classic Slot",
    passportSource: "https://endorphina.com/news/discover-hidden-riches-in-the-online-slot-game-lucky-streak-1000",
  },

  {
    slug: "2023-hit-slot",
    rtp: "96,01%",
    source: "https://endorphina.com/games/2023-hit-slot",
    releaseDate: "14 марта 2023",
    gameType: "Video Slot",
    passportSource: "https://endorphina.com/news/2023-hit-slot-2",
  },

  {
    slug: "prestige-crown",
    rtp: "96,08%",
    source: "https://endorphina.com/games/prestige-crown",
    releaseDate: "17 июля 2025",
    gameType: "Cascading Slot",
    passportSource: "https://endorphina.com/news/prestige-crown-brings-legendary-riches-to-life",
  },

  {
    slug: "2021-hit-slot",
    rtp: "96,02%",
    source: "https://endorphina.com/games/2021-hit-slot",
    releaseDate: "11 мая 2021",
    gameType: "Classic Slot Game",
    passportSource: "https://endorphina.com/news/mesmerize-yourself-in-2021-hit-slot",
  },

  {
    slug: "2025-hit-slot",
    rtp: "96,05%",
    maxWin: "2 025x",
    source: "https://endorphina.com/games/2025-hit-slot",
    releaseDate: "10 апреля 2025",
    gameType: "Fruit Slot",
    passportSource: "https://endorphina.com/news/set-the-reels-on-fire-with-endorphinas-2025-hit-slot",
  },

  {
    slug: "3-coin-towers",
    rtp: "96,08%",
    maxWin: "1 000x",
    source: "https://endorphina.com/games/3-coin-towers",
    releaseDate: "17 февраля 2026",
    gameType: "Oriental Slot",
    passportSource: "https://endorphina.com/news/endorphina-releases-3-coin-towers-a-festival-of-fortune-with-three-bonus-games",
  },
  {
    slug: "burning-coins-40",
    rtp: "96,12%",
    maxWin: "2 000x",
    source: "https://endorphina.com/games/burning-coins-40",
    releaseDate: "9 декабря 2025",
    gameType: "Fruit Game",
    passportSource: "https://endorphina.com/news/burning-coins-40-a-fiery-new-world-of-multiple-bonus-variations",
  },
  {
    slug: "81-burning-ways",
    rtp: "96,05%",
    source: "https://endorphina.com/games/81-burning-ways",
  },
  {
    slug: "crown-coins",
    rtp: "96,06%",
    maxWin: "1 000x",
    source: "https://endorphina.com/games/crown-coins",
  },
  {
    slug: "ultra-fresh",
    rtp: "96,01%",
    source: "https://endorphina.com/games/ultra-fresh",
  },
  {
    slug: "hell-hot-40",
    rtp: "96,04%",
    source: "https://endorphina.com/games/hell-hot-40",
  },
  {
    slug: "lucky-streak-1",
    rtp: "96,09%",
    source: "https://endorphina.com/games/lucky-streak-1",
  },
  {
    slug: "lucky-streak-3",
    rtp: "96,01%",
    source: "https://endorphina.com/games/lucky-streak-3",
  },
  {
    slug: "hell-hot-100",
    rtp: "96,07%",
    source: "https://endorphina.com/games/hell-hot-100",
  },
  {
    slug: "joker-stoker",
    rtp: "96,07%",
    source: "https://endorphina.com/games/joker-stoker",
  },
  {
    slug: "lucky-streak-1000",
    rtp: "96,07%",
    maxWin: "1 000x",
    source: "https://endorphina.com/games/lucky-streak-1000",
  },
  {
    slug: "burning-coins-20",
    rtp: "96,01%",
    maxWin: "1 000x",
    source: "https://endorphina.com/games/burning-coins-20",
  },
  {
    slug: "chance-machine-20",
    rtp: "96,01%",
    source: "https://endorphina.com/games/chance-machine-20",
  },
  {
    slug: "dia-de-los-muertos-2",
    rtp: "96,05%",
    source: "https://endorphina.com/games/dia-de-los-muertos-2",
  },
];

test("Endorphina full dossiers retain official metric provenance and payout semantics", async ({ page }) => {
  for (const dossier of dossiers) {
    const metrics = getVerifiedSlotMetrics(dossier.slug)!;
    expect(metrics.rtpVariants).toContain(dossier.rtp);
    expect(metrics.source).toBe(dossier.source);
    expect(metrics.maxWin).toBe(dossier.maxWin);

    if (dossier.releaseDate && dossier.gameType && dossier.passportSource) {
      const passport = getVerifiedSlotPassport(dossier.slug)!;
      expect(passport.releaseDate).toBe(dossier.releaseDate);
      expect(passport.gameType).toBe(dossier.gameType);
      expect(passport.source).toBe(dossier.passportSource);
    }

    await page.goto(`/slots/${dossier.slug}`);
    await expect(
      page.locator("#facts").locator(`a[href="${dossier.source}"]`),
    ).toHaveCount(1);
  }
});
