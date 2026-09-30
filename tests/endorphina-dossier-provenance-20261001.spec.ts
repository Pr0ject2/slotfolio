import { expect, test } from "@playwright/test";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const dossiers = [
  {
    slug: "burning-coins-20",
    rtp: "96,01%",
    maxWin: "1 000x",
    label: "текущая официальная карточка Endorphina",
  },
  {
    slug: "chance-machine-20",
    rtp: "96,01%",
    label: "текущая официальная карточка Endorphina",
  },
  {
    slug: "dia-de-los-muertos-2",
    rtp: "96,05%",
    label: "текущая официальная карточка Endorphina",
  },
] as const;

test("Endorphina full dossiers retain official metric provenance without inventing max win", async ({ page }) => {
  for (const dossier of dossiers) {
    const metrics = getVerifiedSlotMetrics(dossier.slug)!;
    expect(metrics.rtpVariants).toContain(dossier.rtp);
    expect(metrics.sourceLabel).toBe(dossier.label);
    expect(metrics.maxWin).toBe(dossier.maxWin);

    await page.goto(`/slots/${dossier.slug}`);
    await expect(
      page.locator("#facts").getByRole("link", { name: dossier.label }),
    ).toHaveCount(1);
  }
});
