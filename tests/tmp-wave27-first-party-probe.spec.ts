import { test } from "@playwright/test";

const games = [
  [
    "hacksaw-gaming-xmas-drop",
    "https://www.hacksawgaming.com/games/xmas-drop"
  ],
  [
    "hacksaw-gaming-ze-zeus",
    "https://www.hacksawgaming.com/games/ze-zeus"
  ],
  [
    "hacksaw-gaming-zeus-ze-zecond",
    "https://www.hacksawgaming.com/games/zeus-ze-zecond"
  ],
  [
    "nolimit-city-bowel-of-beelzebub",
    "https://nolimitcity.com/games/bowel-of-beelzebub"
  ],
  [
    "nolimit-city-ding-dong-death",
    "https://nolimitcity.com/games/ding-dong-death"
  ],
  [
    "nolimit-city-duck-hunters-2",
    "https://nolimitcity.com/games/duck-hunters-2"
  ],
  [
    "nolimit-city-fire-in-the-hole-4",
    "https://nolimitcity.com/games/game-1"
  ],
  [
    "nolimit-city-gator-hunters-2",
    "https://nolimitcity.com/games/gator-hunters-2"
  ],
  [
    "nolimit-city-six-feet-under",
    "https://nolimitcity.com/games/six-feet-under"
  ],
  [
    "playn-go-nsync-pop",
    "https://www.playngo.com/games/*nsync-pop"
  ]
] as const;

for (const [key, url] of games) {
  test(`temporary probe ${key}`, async ({ page }) => {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    if (url.includes("playngo.com")) await page.waitForTimeout(5000);
    const title = await page.title();
    const bodyText = (await page.locator("body").innerText()).replace(/\r/g, "");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content").catch(() => null);
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute("content").catch(() => null);
    const images = await page.locator("img").evaluateAll((nodes) =>
      nodes.map((node) => ({
        alt: node.getAttribute("alt"),
        src: (node as HTMLImageElement).currentSrc || node.getAttribute("src"),
        width: (node as HTMLImageElement).naturalWidth,
        height: (node as HTMLImageElement).naturalHeight,
      }))
    );
    console.log(`W27_${key.toUpperCase().replace(/-/g,"_")}_TITLE=` + JSON.stringify(title));
    console.log(`W27_${key.toUpperCase().replace(/-/g,"_")}_BODY=` + JSON.stringify(bodyText));
    console.log(`W27_${key.toUpperCase().replace(/-/g,"_")}_META=` + JSON.stringify({ ogImage, twitterImage }));
    console.log(`W27_${key.toUpperCase().replace(/-/g,"_")}_IMAGES=` + JSON.stringify(images));
  });
}
