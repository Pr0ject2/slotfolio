import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test("CI and Pages restore source-controlled artwork after cache extraction", () => {
  for (const [workflow, localizeStep] of [
    ["ci.yml", "Localize and require all reviewed artwork"],
    ["deploy-pages.yml", "Localize slot artwork for preview"],
  ] as const) {
    const yaml = readFileSync(join(process.cwd(), ".github", "workflows", workflow), "utf8");
    const cache = yaml.indexOf("- name: Cache localized slot images");
    const restore = yaml.indexOf("- name: Reapply source-controlled slot artwork after cache");
    const localize = yaml.indexOf("- name: " + localizeStep);
    expect(cache, workflow).toBeGreaterThanOrEqual(0);
    expect(restore, workflow).toBeGreaterThan(cache);
    expect(localize, workflow).toBeGreaterThan(restore);
    expect(yaml).toContain("git restore --source=HEAD --worktree -- public/images/slots");
  }
});
