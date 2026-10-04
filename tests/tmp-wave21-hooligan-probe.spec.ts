import { test } from "@playwright/test";

test("temporary probe Le Hooligan first-party assets", async ({ page }) => {
  await page.goto("https://www.hacksawgaming.com/games/le-hooligan", { waitUntil: "domcontentloaded", timeout: 60_000 });
  const images = await page.locator("img").evaluateAll((nodes) =>
    nodes.map((node) => ({
      alt: node.getAttribute("alt"),
      src: (node as HTMLImageElement).currentSrc || node.getAttribute("src"),
    }))
  );
  console.log("LE_HOOLIGAN_IMAGES=" + JSON.stringify(images));
});
