import { getCatalogVerifiedDetailsHacksawScore4Fill as getLegacyHacksawScore4Fill } from "./catalog-verified-details-hacksaw-score4-fill-legacy";
import { getCatalogVerifiedDetailsHacksawScore4Tail } from "./catalog-verified-details-hacksaw-score4-tail";
import { getCatalogVerifiedDetailsHacksawScore6 } from "./catalog-verified-details-hacksaw-score6";
import { getCatalogVerifiedDetailsHacksawPassportCloseout } from "./catalog-verified-details-hacksaw-passport-closeout";
import { getCatalogVerifiedDetailsHacksawPassportCloseout2 } from "./catalog-verified-details-hacksaw-passport-closeout-2";

export function getCatalogVerifiedDetailsHacksawScore4Fill(slug: string) {
  const legacy = getLegacyHacksawScore4Fill(slug);
  const tail = getCatalogVerifiedDetailsHacksawScore4Tail(slug);
  const score4 = !tail ? legacy : !legacy ? tail : { ...legacy, ...tail };
  const score6 = getCatalogVerifiedDetailsHacksawScore6(slug);
  const existing = !score6 ? score4 : !score4 ? score6 : { ...score4, ...score6 };
  const closeout = getCatalogVerifiedDetailsHacksawPassportCloseout(slug);
  const withCloseout = !closeout ? existing : !existing ? closeout : { ...existing, ...closeout };
  const closeout2 = getCatalogVerifiedDetailsHacksawPassportCloseout2(slug);

  if (!closeout2) return withCloseout;
  if (!withCloseout) return closeout2;
  return { ...withCloseout, ...closeout2 };
}
