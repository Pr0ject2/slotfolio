import { expect, test } from "@playwright/test";
import { slots, slotRtpValue } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

function parseRtp(value: string) {
  return Number.parseFloat(value.replace("%", "").replace(",", ".").trim());
}

test("verified RTP variants stay consistent with each full dossier", () => {
  let covered = 0;

  for (const slot of slots) {
    const variants = getVerifiedSlotMetrics(slot.slug)?.rtpVariants;
    if (!variants?.length) continue;
    covered += 1;

    const parsed = variants.map(parseRtp);
    const unique = new Set(parsed.map((value) => value.toFixed(4)));
    const referenceRtp = slotRtpValue(slot);

    expect(unique.size, `${slot.slug}: RTP variants must not contain duplicates`).toBe(parsed.length);

    for (const value of parsed) {
      expect(Number.isFinite(value), `${slot.slug}: every RTP variant must be numeric`).toBe(true);
      expect(value, `${slot.slug}: RTP must be greater than 0`).toBeGreaterThan(0);
      expect(value, `${slot.slug}: RTP must be below 100`).toBeLessThan(100);
    }

    expect(
      parsed.some((value) => Math.abs(value - referenceRtp) < 0.0001),
      `${slot.slug}: verified RTP variants must include dossier reference RTP ${slot.rtp}`,
    ).toBe(true);
  }

  expect(covered).toBeGreaterThanOrEqual(10);
});
