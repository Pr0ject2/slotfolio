import { test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";

test("diagnose Coin Club automatic replacement", () => {
  const playngo = catalogSeeds.filter((seed) => seed.provider === "Play’n GO");
  const replacement = playngo.at(-1);
  throw new Error(`COIN_CLUB_REPLACEMENT=${replacement?.slug}|${replacement?.name}|${replacement?.source}`);
});
