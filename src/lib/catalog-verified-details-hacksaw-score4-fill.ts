import { getCatalogVerifiedDetailsHacksawScore4Fill as getLegacyHacksawScore4Fill } from "./catalog-verified-details-hacksaw-score4-fill-legacy";
import { getCatalogVerifiedDetailsHacksawScore4Tail } from "./catalog-verified-details-hacksaw-score4-tail";
import { getCatalogVerifiedDetailsHacksawScore6 } from "./catalog-verified-details-hacksaw-score6";
import { getCatalogVerifiedDetailsHacksawPassportCloseout } from "./catalog-verified-details-hacksaw-passport-closeout";
import { getCatalogVerifiedDetailsHacksawPassportCloseout2 } from "./catalog-verified-details-hacksaw-passport-closeout-2";
import { getCatalogVerifiedDetailsHacksawPassportCloseout3 } from "./catalog-verified-details-hacksaw-passport-closeout-3";
import { getCatalogVerifiedDetailsHacksawPassportCloseout4 } from "./catalog-verified-details-hacksaw-passport-closeout-4";
import { getCatalogVerifiedDetailsHacksawPassportCloseout5 } from "./catalog-verified-details-hacksaw-passport-closeout-5";
import { getCatalogVerifiedDetailsHacksawPassportCloseout6 } from "./catalog-verified-details-hacksaw-passport-closeout-6";
import { getCatalogVerifiedDetailsHacksawPassportCloseout7 } from "./catalog-verified-details-hacksaw-passport-closeout-7";
import { getCatalogVerifiedDetailsHacksawPassportCloseout8 } from "./catalog-verified-details-hacksaw-passport-closeout-8";
import { getCatalogVerifiedDetailsHacksawPassportCloseout9 } from "./catalog-verified-details-hacksaw-passport-closeout-9";
import { getCatalogVerifiedDetailsHacksawPassportCloseout10 } from "./catalog-verified-details-hacksaw-passport-closeout-10";
import { getCatalogVerifiedDetailsHacksawPassportCloseout11 } from "./catalog-verified-details-hacksaw-passport-closeout-11";

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
  const withCloseout6 = !closeout6 ? withCloseout5 : !withCloseout5 ? closeout6 : { ...withCloseout5, ...closeout6 };
  const closeout7 = getCatalogVerifiedDetailsHacksawPassportCloseout7(slug);
  const withCloseout7 = !closeout7 ? withCloseout6 : !withCloseout6 ? closeout7 : { ...withCloseout6, ...closeout7 };
  const closeout8 = getCatalogVerifiedDetailsHacksawPassportCloseout8(slug);
  const withCloseout8 = !closeout8 ? withCloseout7 : !withCloseout7 ? closeout8 : { ...withCloseout7, ...closeout8 };
  const closeout9 = getCatalogVerifiedDetailsHacksawPassportCloseout9(slug);
  const withCloseout9 = !closeout9 ? withCloseout8 : !withCloseout8 ? closeout9 : { ...withCloseout8, ...closeout9 };
  const closeout10 = getCatalogVerifiedDetailsHacksawPassportCloseout10(slug);
  const withCloseout10 = !closeout10 ? withCloseout9 : !withCloseout9 ? closeout10 : { ...withCloseout9, ...closeout10 };
  const closeout11 = getCatalogVerifiedDetailsHacksawPassportCloseout11(slug);

  if (!closeout11) return withCloseout10;
  if (!withCloseout10) return closeout11;
  return { ...withCloseout10, ...closeout11 };
}
