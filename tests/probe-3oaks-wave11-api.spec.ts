import { expect, test } from "@playwright/test";

const games = [
  "supreme_diamond_xxl",
  "thunder_tiger",
  "tiger_gems",
  "tiger_jungle",
  "wolf_night",
];

test("probe official 3 Oaks wave11 API", async () => {
  for (const key of games) {
    const response = await fetch(`https://3oaks.com/api/v1/games/${key}`);
    expect(response.ok, `${key} HTTP ${response.status}`).toBeTruthy();
    const json = await response.json();
    console.log("WAVE11_API", key, JSON.stringify(json));
  }
});
