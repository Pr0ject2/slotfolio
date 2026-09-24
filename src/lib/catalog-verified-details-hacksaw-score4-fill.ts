import { getCatalogVerifiedDetailsHacksawScore4Fill as getLegacyHacksawScore4Fill } from "./catalog-verified-details-hacksaw-score4-fill-legacy";
import { getCatalogVerifiedDetailsHacksawScore4Tail } from "./catalog-verified-details-hacksaw-score4-tail";
import { getCatalogVerifiedDetailsHacksawScore6 } from "./catalog-verified-details-hacksaw-score6";
import { getCatalogVerifiedDetailsHacksawPassportCloseout } from "./catalog-verified-details-hacksaw-passport-closeout";
import { getCatalogVerifiedDetailsHacksawPassportCloseout2 } from "./catalog-verified-details-hacksaw-passport-closeout-2";
import { getCatalogVerifiedDetailsHacksawPassportCloseout3 } from "./catalog-verified-details-hacksaw-passport-closeout-3";
import { getCatalogVerifiedDetailsHacksawPassportCloseout4 } from "./catalog-verified-details-hacksaw-passport-closeout-4";
import { getCatalogVerifiedDetailsHacksawPassportCloseout5 } from "./catalog-verified-details-hacksaw-passport-closeout-5";
import { getCatalogVerifiedDetailsHacksawPassportCloseout6 } from "./catalog-verified-details-hacksaw-passport-closeout-6";

export function getCatalogVerifiedDetailsHacksawScore4Fill(slug: string) {
  const legacy = getLegacyHacksawScore4Fill(slug);
  const tail = getCatalogVerifiedDetailsHacksawScore4Tail(slug);
  const score4 = !tail ? legacy : !legacy ? tail : { ...legacy, ...tail };
  const score6 = getCatalogVerifiedDetailsHacksawScore6(slug);
  const existing = !score6 ? score4 : !score4 ? score6 : { ...score4, ...score6 };
  const closeout = getCatalogVerifiedDetailsHacksawPassportCloseout(slug);
  const withCloseout = !closeout ? existing : !existing ? closeout : { ...existing, ...closeout };
  const closeout2 = getCatalogVerifiedDetailsHacksawPassportCloseout2(slug);
  const withCloseout2 = !closeout2 ? withCloseout : !withCloseout ? closeout2 : { ...withCloseout, ...closeout2 };
  const closeout3 = getCatalogVerifiedDetailsHacksawPassportCloseout3(slug);
  const withCloseout3 = !closeout3 ? withCloseout2 : !withCloseout2 ? closeout3 : { ...withCloseout2, ...closeout3 };
  const closeout4 = getCatalogVerifiedDetailsHacksawPassportCloseout4(slug);
  const withCloseout4 = !closeout4 ? withCloseout3 : !withCloseout3 ? closeout4 : { ...withCloseout3, ...closeout4 };
  const closeout5 = getCatalogVerifiedDetailsHacksawPassportCloseout5(slug);
  const withCloseout5 = !closeout5 ? withCloseout4 : !withCloseout4 ? closeout5 : { ...withCloseout4, ...closeout5 };
  const closeout6 = getCatalogVerifiedDetailsHacksawPassportCloseout6(slug);

  if (!closeout6) return withCloseout5;
  if (!withCloseout5) return closeout6;
  return { ...withCloseout5, ...closeout6 };
}
