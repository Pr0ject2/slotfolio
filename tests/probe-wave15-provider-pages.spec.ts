import { expect, test } from "@playwright/test";

const games = [
  ["moofo", "https://endorphina.com/games/moofo"],
  ["zalatar", "https://endorphina.com/games/zalatar"],
  ["2-wild-2-die", "https://www.hacksawgaming.com/games/2-wild-2-die"],
  ["3-cursed-chests-hold-and-win", "https://www.hacksawgaming.com/games/3-cursed-chests%3A-hold-%26-win"],
  ["aiko-and-the-wind-spirit", "https://www.hacksawgaming.com/games/aiko-and-the-wind-spirit"],
  ["arizona-james-and-the-lost-relics", "https://www.hacksawgaming.com/games/arizona-james-and-the-lost-relics"],
  ["army-of-ares", "https://www.hacksawgaming.com/games/army-of-ares"],
  ["bash-bros", "https://www.hacksawgaming.com/games/bash-bros"],
  ["beam-boys", "https://www.hacksawgaming.com/games/beam-boys"],
  ["beast-below", "https://www.hacksawgaming.com/games/beast-below"],
] as const;

test("probe official wave15 provider pages", async ({ browser }) => {
  for (const [key, url] of games) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(1500);
    const title = await page.title();
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content").catch(() => null);
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute("content").catch(() => null);
    const description = await page.locator('meta[name="description"]').getAttribute("content").catch(() => null);
    const imgs = await page.locator("img").evaluateAll((nodes) => nodes.slice(0,80).map((n) => ({src:n.getAttribute("src"),alt:n.getAttribute("alt")})));
    const text = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
    console.log("WAVE15_PROVIDER", key, JSON.stringify({ url: page.url(), title, ogImage, twitterImage, description, imgs, text: text.slice(0, 28000) }));
    expect(title.length).toBeGreaterThan(0);
    await page.close();
  }
});
