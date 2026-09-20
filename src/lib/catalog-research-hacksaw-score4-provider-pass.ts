import { getCatalogResearchHacksawScore4ProviderPass as getLegacyHacksawScore4ProviderPass } from "./catalog-research-hacksaw-score4-provider-pass-legacy";
import { getCatalogResearchHacksawScore4Tail20260919 } from "./catalog-research-hacksaw-score4-tail-20260919";
import { getCatalogResearchHacksawScore5ProviderPass } from "./catalog-research-hacksaw-score5-provider-pass";
import { getCatalogResearchHacksawScore5ProviderPass2 } from "./catalog-research-hacksaw-score5-provider-pass-2";

export function getCatalogResearchHacksawScore4ProviderPass(slug: string) {
  const legacy = getLegacyHacksawScore4ProviderPass(slug);
  const tail = getCatalogResearchHacksawScore4Tail20260919(slug);
  const score5Legacy = getCatalogResearchHacksawScore5ProviderPass(slug);
  const score5New = getCatalogResearchHacksawScore5ProviderPass2(slug);

  const score5 = !score5New
    ? score5Legacy
    : !score5Legacy
      ? score5New
      : {
          ...score5Legacy,
          ...score5New,
          mechanics: [...new Set([...score5Legacy.mechanics, ...score5New.mechanics])],
          evidence: `${score5Legacy.evidence} ${score5New.evidence}`,
        };

  const score4 = !tail
    ? legacy
    : !legacy
      ? tail
      : {
          ...legacy,
          ...tail,
          mechanics: [...new Set([...legacy.mechanics, ...tail.mechanics])],
          evidence: `${legacy.evidence} ${tail.evidence}`,
        };

  if (!score5) return score4;
  if (!score4) return score5;

  return {
    ...score4,
    ...score5,
    mechanics: [...new Set([...score4.mechanics, ...score5.mechanics])],
    evidence: `${score4.evidence} ${score5.evidence}`,
  };
}
