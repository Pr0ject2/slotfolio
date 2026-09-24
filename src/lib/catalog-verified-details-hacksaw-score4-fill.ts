import { getCatalogVerifiedDetailsHacksawScore4Fill as getLegacyHacksawScore4Fill } from "./catalog-verified-details-hacksaw-score4-fill-legacy";
import { getCatalogVerifiedDetailsHacksawScore4Tail } from "./catalog-verified-details-hacksaw-score4-tail";
import { getCatalogVerifiedDetailsHacksawScore6 } from "./catalog-verified-details-hacksaw-score6";
import { getCatalogVerifiedDetailsHacksawCloseout20260924 } from "./catalog-verified-details-hacksaw-closeout-20260924";
import { getCatalogVerifiedDetailsHacksawCloseout2_20260924 } from "./catalog-verified-details-hacksaw-closeout-2-20260924";

export function getCatalogVerifiedDetailsHacksawScore4Fill(slug: string) {
  const legacy = getLegacyHacksawScore4Fill(slug);
  const tail = getCatalogVerifiedDetailsHacksawScore4Tail(slug);
  const score4 = !tail ? legacy : !legacy ? tail : { ...legacy, ...tail };
  const score6 = getCatalogVerifiedDetailsHacksawScore6(slug);
  const beforeCloseout = !score6 ? score4 : !score4 ? score6 : { ...score4, ...score6 };
  const closeout = getCatalogVerifiedDetailsHacksawCloseout20260924(slug);
  const withCloseout = !closeout ? beforeCloseout : !beforeCloseout ? closeout : { ...beforeCloseout, ...closeout };
  const closeout2 = getCatalogVerifiedDetailsHacksawCloseout2_20260924(slug);

  if (!closeout2) return withCloseout;
  if (!withCloseout) return closeout2;
  return { ...withCloseout, ...closeout2 };
}
