import { expect, test } from "@playwright/test";

const games = [
  ["chaos-crew", "https://www.hacksawgaming.com/games/chaos-crew"],
  ["chaos-crew-2", "https://www.hacksawgaming.com/games/chaos-crew-2"],
] as const;

test("probe official Hacksaw Chaos Crew pages", async ({ browser }) => {
  for (const [key, url] of games) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(1200);
    const imgs = await page.locator("img").evaluateAll((nodes) => nodes.map((n) => ({src:n.getAttribute("src"),alt:n.getAttribute("alt")})).filter((x)=>x.src));
    const text = (await page.locator("body").innerText()).replace(/\s+/g," ").trim();
    console.log("WAVE16_CHAOS", key, JSON.stringify({ imgs, text:text.slice(0,20000) }));
    expect(await page.title()).not.toBe("");
    await page.close();
  }
});
