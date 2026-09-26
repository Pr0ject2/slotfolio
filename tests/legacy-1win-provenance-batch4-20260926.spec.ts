import { expect, test } from "@playwright/test";
import { slots } from "../src/lib/data";

const expectedSources: Record<string, string> = {
  "gonzos-quest": "https://t.me/s/reg_official_1win/226",
  "fat-rabbit": "https://t.me/s/reg_official_1win/226",
  "fire-in-the-hole": "https://t.me/s/reg_official_1win/1426",
  "book-of-99": "https://t.me/s/reg_official_1win/3266",
  mental: "https://t.me/s/reg_official_1win/2866",
};

test("fourth legacy dossier batch keeps auditable 1win availability evidence", () => {
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

test("legacy 1win provenance residual falls to eleven dossiers", () => {
  const missing = slots
    .filter((slot) => !slot.availability?.some((item) => item.operator === "1win"))
    .map((slot) => slot.slug)
    .sort();

  expect(missing).toHaveLength(11);
  for (const slug of Object.keys(expectedSources)) expect(missing).not.toContain(slug);
});
