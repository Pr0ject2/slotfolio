import { test } from "@playwright/test";

const games = [
  [
    "the-count",
    "https://www.hacksawgaming.com/games/the-count"
  ],
  [
    "the-luxe",
    "https://www.hacksawgaming.com/games/the-luxe"
  ],
  [
    "the-wildwood-curse",
    "https://www.hacksawgaming.com/games/the-wildwood-curse"
  ],
  [
    "tiger-legends",
    "https://www.hacksawgaming.com/games/tiger-legends"
  ],
  [
    "toshi-ways-club",
    "https://www.hacksawgaming.com/games/toshi-ways-club"
  ],
  [
    "twisted-lab",
    "https://www.hacksawgaming.com/games/twisted-lab"
  ],
  [
    "ultimate-slot-of-america",
    "https://www.hacksawgaming.com/games/ultimate-slot-of-america"
  ],
  [
    "vending-machine",
    "https://www.hacksawgaming.com/games/vending-machine"
  ],
  [
    "wings-of-horus",
    "https://www.hacksawgaming.com/games/wings-of-horus"
  ],
  [
    "wishbringer",
    "https://www.hacksawgaming.com/games/wishbringer"
  ]
] as const;

for (const [key, url] of games) {
  test(`temporary probe ${key}`, async ({ page }) => {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    const bodyText = (await page.locator("body").innerText()).replace(/\r/g, "");
    const images = await page.locator("img").evaluateAll((nodes) =>
      nodes.map((node) => ({
        alt: node.getAttribute("alt"),
        src: (node as HTMLImageElement).currentSrc || node.getAttribute("src"),
      }))
    );
    console.log(`W26_${key.toUpperCase().replace(/-/g,"_")}_BODY=` + JSON.stringify(bodyText));
    console.log(`W26_${key.toUpperCase().replace(/-/g,"_")}_IMAGES=` + JSON.stringify(images));
  });
}
