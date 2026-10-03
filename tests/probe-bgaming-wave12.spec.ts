import { expect, test } from "@playwright/test";

const games = [
  ["chicken-fire", "https://bgaming.com/games/chicken-fire"],
  ["divine-queen-power-of-sun", "https://bgaming.com/games/divine-queen-power-of-sun"],
  ["dusty-duel", "https://bgaming.com/games/dusty-duel"],
  ["fortune-trio-minions-of-fu", "https://bgaming.com/games/fortune-trio-minions-of-fu"],
  ["frenzy-clusters", "https://bgaming.com/games/frenzy-clusters"],
  ["fruit-million-respin", "https://bgaming.com/games/fruit-million-respin"],
  ["johnny-vs-chicken", "https://bgaming.com/games/johnny-vs-chicken"],
  ["miss-cherry-wild-frames", "https://bgaming.com/games/miss-cherry-wild-frames"],
  ["money-maker", "https://bgaming.com/games/money-maker"],
  ["multi-rush", "https://bgaming.com/games/multi-rush"],
] as const;

test("probe official BGaming wave12 pages", async ({ browser }) => {
  for (const [key, url] of games) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(1200);
    const title = await page.title();
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content").catch(() => null);
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute("content").catch(() => null);
    const description = await page.locator('meta[name="description"]').getAttribute("content").catch(() => null);
    const text = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
    console.log("WAVE12_BGAMING", key, JSON.stringify({ url: page.url(), title, ogImage, twitterImage, description, text: text.slice(0, 20000) }));
    expect(title.length).toBeGreaterThan(0);
    await page.close();
  }
});
