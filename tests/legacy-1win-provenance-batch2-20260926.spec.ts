import { expect, test } from "@playwright/test";
import { slots } from "../src/lib/data";

const expectedSources: Record<string, string> = {
  "sweet-bonanza":
    "https://forum.1win.com/topic/346-%F0%9F%8D%AC-sugar-rush-or-sugar-crash-the-candy-slot-dilemma/",
  "sugar-rush":
    "https://forum.1win.com/topic/346-%F0%9F%8D%AC-sugar-rush-or-sugar-crash-the-candy-slot-dilemma/",
  "dead-or-alive-2":
    "https://forum.1win.com/topic/180-%F0%9F%8E%B0-longest-bonus-ever-this-slot-goes-wild/",
};

test("second legacy dossier batch keeps auditable 1win availability evidence", () => {
  for (const [slug, source] of Object.entries(expectedSources)) {
    const slot = slots.find((item) => item.slug === slug);
    expect(slot, slug).toBeTruthy();

    const evidence = slot!.availability?.find((item) => item.operator === "1win");
    expect(evidence, `${slug} 1win evidence`).toBeTruthy();
    expect(evidence!.verifiedAt, slug).toBe("2026-09-26");
    expect(evidence!.source, slug).toBe(source);
    expect(evidence!.evidence.length, slug).toBeGreaterThan(20);
  }
});

test("legacy 1win provenance residual falls to twenty-one dossiers", () => {
  const missing = slots
    .filter((slot) => !slot.availability?.some((item) => item.operator === "1win"))
    .map((slot) => slot.slug)
    .sort();

  expect(missing).toHaveLength(21);
  for (const slug of Object.keys(expectedSources)) expect(missing).not.toContain(slug);
});
