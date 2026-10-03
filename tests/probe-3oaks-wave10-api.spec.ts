import { expect, test } from "@playwright/test";

const games = [
  "sun_of_egypt_2",
  "sun_of_egypt_3",
  "sun_of_egypt_4",
  "sun_of_egypt_5",
  "sunlight_princess",
  "super_china_pots",
  "super_hot_chilli",
  "super_hot_teapots",
  "super_hotfire_diamonds",
  "super_sticky_piggy",
];

function collectUrls(value: unknown, out = new Set<string>()) {
  if (typeof value === "string" && /^https?:\/\//.test(value)) out.add(value);
  else if (Array.isArray(value)) for (const item of value) collectUrls(item, out);
  else if (value && typeof value === "object") for (const item of Object.values(value as Record<string, unknown>)) collectUrls(item, out);
  return out;
}

test("probe official 3 Oaks wave10 API", async () => {
  for (const key of games) {
    const response = await fetch(`https://3oaks.com/api/v1/games/${key}`);
    expect(response.ok, `${key} HTTP ${response.status}`).toBeTruthy();
    const json = await response.json();
    const urls = [...collectUrls(json)].filter((url) => /3oaks\.com|media|thumbnail|banner/i.test(url));
    console.log("WAVE10_API", key, JSON.stringify({ urls, json }));
  }
});
