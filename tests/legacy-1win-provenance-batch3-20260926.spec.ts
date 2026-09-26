import { expect, test } from "@playwright/test";
import { slots } from "../src/lib/data";

const expectedSources: Record<string, string> = {
  "book-of-dead": "https://t.me/s/reg_official_1win/1386",
  "fruit-party": "https://t.me/s/reg_official_1win/1386",
  "razor-shark": "https://t.me/s/reg_official_1win/1386",
  starburst: "https://t.me/s/reg_official_1win/706",
  "money-train-2": "https://t.me/s/reg_official_1win/986",
};

test("third legacy dossier batch keeps auditable 1win availability evidence", () => {
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

test("later legacy enrichment cannot reopen any batch-three provenance gap", () => {
  const missing = new Set(
    slots
      .filter((slot) => !slot.availability?.some((item) => item.operator === "1win"))
      .map((slot) => slot.slug),
  );

  for (const slug of Object.keys(expectedSources)) expect(missing.has(slug), slug).toBe(false);
});
