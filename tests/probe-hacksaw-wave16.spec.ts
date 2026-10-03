import { expect, test } from "@playwright/test";

const games = [
  ["benny-the-beer", "https://www.hacksawgaming.com/games/benny-the-beer"],
  ["booze-bash", "https://www.hacksawgaming.com/games/booze-bash"],
  ["bouncy-bombs", "https://www.hacksawgaming.com/games/bouncy-bombs"],
  ["bullets-and-bounty", "https://www.hacksawgaming.com/games/Bullets-and-bounty"],
  ["cash-crew", "https://www.hacksawgaming.com/games/cash-crew"],
  ["chaos-crew", "https://www.hacksawgaming.com/games/chaos-crew"],
  ["chaos-crew-2", "https://www.hacksawgaming.com/games/chaos-crew-2"],
  ["chaos-crew-3", "https://www.hacksawgaming.com/games/chaos-crew-3"],
  ["circle-of-life", "https://www.hacksawgaming.com/games/circle-of-life"],
  ["cloud-princess", "https://www.hacksawgaming.com/games/cloud-princess"],
] as const;

test("probe official Hacksaw wave16 pages", async ({ browser }) => {
  for (const [key, url] of games) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(1200);
    const title = await page.title();
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content").catch(() => null);
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute("content").catch(() => null);
    const description = await page.locator('meta[name="description"]').getAttribute("content").catch(() => null);
    const imgs = await page.locator("img").evaluateAll((nodes) => nodes.slice(0,100).map((n) => ({src:n.getAttribute("src"),alt:n.getAttribute("alt")})));
    const text = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
    console.log("WAVE16_HACKSAW", key, JSON.stringify({ url: page.url(), title, ogImage, twitterImage, description, imgs, text: text.slice(0, 32000) }));
    expect(title.length).toBeGreaterThan(0);
    await page.close();
  }
});
