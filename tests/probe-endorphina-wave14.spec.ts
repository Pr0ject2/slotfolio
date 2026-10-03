import { expect, test } from "@playwright/test";

const games = [
  ["3-golden-chests", "https://endorphina.com/games/3-golden-chests"],
  ["burning-coins-100", "https://endorphina.com/games/burning-coins-100"],
  ["burning-coins-20-dice", "https://endorphina.com/games/burning-coins-20-dice"],
  ["chance-machine-90s", "https://endorphina.com/games/chance-machine-90s"],
  ["druids-fortune", "https://endorphina.com/games/druids-fortune"],
  ["fortune-bankers", "https://endorphina.com/games/fortune-bankers"],
  ["fortune-chests-dice", "https://endorphina.com/games/fortune-chests-dice"],
  ["gift-of-midas", "https://endorphina.com/games/gift-of-midas"],
  ["groovin-tiger", "https://endorphina.com/games/groovin-tiger"],
  ["hell-hot-1000", "https://endorphina.com/games/hell-hot-1000"],
] as const;

test("probe official Endorphina wave14 pages", async ({ browser }) => {
  for (const [key, url] of games) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(1200);
    const title = await page.title();
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content").catch(() => null);
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute("content").catch(() => null);
    const description = await page.locator('meta[name="description"]').getAttribute("content").catch(() => null);
    const text = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
    console.log("WAVE14_ENDORPHINA", key, JSON.stringify({ url: page.url(), title, ogImage, twitterImage, description, text: text.slice(0, 24000) }));
    expect(title.length).toBeGreaterThan(0);
    await page.close();
  }
});
