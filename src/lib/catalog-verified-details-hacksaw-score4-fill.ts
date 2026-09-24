import { getCatalogVerifiedDetailsHacksawScore4Fill as getLegacyHacksawScore4Fill } from "./catalog-verified-details-hacksaw-score4-fill-legacy";
import { getCatalogVerifiedDetailsHacksawScore4Tail } from "./catalog-verified-details-hacksaw-score4-tail";
import { getCatalogVerifiedDetailsHacksawScore6 } from "./catalog-verified-details-hacksaw-score6";
import { getCatalogVerifiedDetailsHacksawPassportCloseout } from "./catalog-verified-details-hacksaw-passport-closeout";

export function getCatalogVerifiedDetailsHacksawScore4Fill(slug: string) {
  const legacy = getLegacyHacksawScore4Fill(slug);
  const tail = getCatalogVerifiedDetailsHacksawScore4Tail(slug);
  const score4 = !tail ? legacy : !legacy ? tail : { ...legacy, ...tail };
  const score6 = getCatalogVerifiedDetailsHacksawScore6(slug);
  const existing = !score6 ? score4 : !score4 ? score6 : { ...score4, ...score6 };
  const closeout = getCatalogVerifiedDetailsHacksawPassportCloseout(slug);

  if (!closeout) return existing;
  if (!existing) return closeout;
  return { ...existing, ...closeout };
}
