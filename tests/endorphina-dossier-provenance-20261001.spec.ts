import { expect, test } from "@playwright/test";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

type ExpectedDossier = {
  slug: string;
  rtp: string;
  maxWin?: string;
  source: string;
};

const dossiers: ExpectedDossier[] = [
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

    await page.goto(`/slots/${dossier.slug}`);
    await expect(
      page.locator("#facts").locator(`a[href="${dossier.source}"]`),
    ).toHaveCount(1);
  }
});
