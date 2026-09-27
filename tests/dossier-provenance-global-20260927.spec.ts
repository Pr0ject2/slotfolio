import { expect, test } from "@playwright/test";
import { slots } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

const allowedHostsByProvider: Record<string, string[]> = {
  "Pragmatic Play": ["pragmaticplay.com"],
  Endorphina: ["endorphina.com"],
  "Push Gaming": ["pushgaming.com"],
  "Hacksaw Gaming": ["hacksawgaming.com"],
  "Nolimit City": ["nolimitcity.com"],
  BGaming: ["bgaming.com"],
  Wazdan: ["wazdan.com"],
  "Belatra Games": ["belatragames.com"],
  "Yggdrasil Gaming": ["yggdrasilgaming.com"],
  NetEnt: ["netent.com", "evolution.com"],
  "Relax Gaming": ["relax-gaming.com"],
};

function normalizedHost(value: string) {
  return new URL(value).hostname.toLowerCase().replace(/^www\./, "");
}

function hostMatches(host: string, allowedRoot: string) {
  return host === allowedRoot || host.endsWith(`.${allowedRoot}`);
}

test("verified full-dossier numeric provenance stays first-party", () => {
  let covered = 0;

  for (const slot of slots) {
    const metrics = getVerifiedSlotMetrics(slot.slug);
    if (!metrics) continue;
    covered += 1;

    const allowedHosts = allowedHostsByProvider[slot.provider];
    expect(allowedHosts, `${slot.slug}: provider needs an explicit first-party allowlist`).toBeTruthy();

    const sources = [
      { label: "primary verified source", url: metrics.source },
      ...(metrics.additionalSources ?? []).map((source) => ({
        label: source.label,
        url: source.url,
      })),
    ];

    for (const source of sources) {
      const parsed = new URL(source.url);
      const host = normalizedHost(source.url);

      expect(parsed.protocol, `${slot.slug}: ${source.label} must use HTTPS`).toBe("https:");
      expect(
        allowedHosts.some((allowedRoot) => hostMatches(host, allowedRoot)),
        `${slot.slug}: ${source.label} points to non-first-party host ${host}`,
      ).toBe(true);
      expect(source.label.trim().length, `${slot.slug}: provenance labels must be non-empty`).toBeGreaterThan(0);
    }
  }

  expect(covered).toBeGreaterThanOrEqual(28);
});
