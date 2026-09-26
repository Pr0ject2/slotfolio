import { expect, test } from "@playwright/test";
import { slots } from "../src/lib/data";

const expectedSources: Record<string, string> = {
  "gates-of-olympus":
    "https://forum.1win.com/topic/892-my-first-1win-deposit-rekt-or-x1000-%F0%9F%93%89%F0%9F%9A%80-storytime/",
  "the-dog-house":
    "https://forum.1win.com/topic/73-%F0%9F%92%A5-slots-battling-for-your-attention/",
  "big-bass-bonanza":
    "https://forum.1win.com/topic/73-%F0%9F%92%A5-slots-battling-for-your-attention/",
  "wanted-dead-or-a-wild":
    "https://forum.1win.com/topic/468-%E2%80%8B-%F0%9F%92%A5-hacksaw-madness-are-these-bonuses-worth-the-risk-%E2%80%8B/",
  "chaos-crew":
    "https://forum.1win.com/topic/468-%E2%80%8B-%F0%9F%92%A5-hacksaw-madness-are-these-bonuses-worth-the-risk-%E2%80%8B/",
  "chaos-crew-2":
    "https://forum.1win.com/topic/468-%E2%80%8B-%F0%9F%92%A5-hacksaw-madness-are-these-bonuses-worth-the-risk-%E2%80%8B/",
};

test("first legacy dossier batch keeps auditable 1win availability evidence", () => {
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

test("legacy 1win provenance residual falls from thirty dossiers to twenty-four", () => {
  const missing = slots
    .filter((slot) => !slot.availability?.some((item) => item.operator === "1win"))
    .map((slot) => slot.slug)
    .sort();

  expect(missing).toHaveLength(24);
  for (const slug of Object.keys(expectedSources)) expect(missing).not.toContain(slug);
});
