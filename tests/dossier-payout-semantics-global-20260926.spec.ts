import { expect, test } from "@playwright/test";
import { slots } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

test("full dossiers keep fixed caps and observed wins semantically separate", () => {
  const violations: Array<{ slug: string; issue: string }> = [];

  for (const slot of slots) {
    const metrics = getVerifiedSlotMetrics(slot.slug);
    if (!metrics) continue;

    const maxLabel = metrics.maxWinLabel?.toLocaleLowerCase("ru-RU") ?? "";
    if (metrics.maxWin && (maxLabel.includes("наблюдав") || maxLabel.includes("observed"))) {
      violations.push({ slug: slot.slug, issue: `maxWin uses observed label: ${metrics.maxWinLabel}` });
    }

    if (metrics.observedWin && !metrics.observedWinLabel) {
      violations.push({ slug: slot.slug, issue: "observedWin has no explicit label" });
    }

    if (metrics.observedWin && metrics.maxWin && metrics.observedWin === metrics.maxWin) {
      violations.push({ slug: slot.slug, issue: "observedWin duplicates maxWin" });
    }

    for (const [field, value] of [
      ["maxWin", metrics.maxWin],
      ["observedWin", metrics.observedWin],
    ] as const) {
      if (value === "0" || value === "0x" || value === "0%") {
        violations.push({ slug: slot.slug, issue: `${field} uses a fake zero placeholder` });
      }
    }
  }

  expect(violations, JSON.stringify(violations)).toEqual([]);
});
