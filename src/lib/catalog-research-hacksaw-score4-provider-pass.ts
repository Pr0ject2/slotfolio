import { getCatalogResearchHacksawScore4ProviderPass as getLegacyHacksawScore4ProviderPass } from "./catalog-research-hacksaw-score4-provider-pass-legacy";
import { getCatalogResearchHacksawScore4Tail20260919 } from "./catalog-research-hacksaw-score4-tail-20260919";
import { getCatalogResearchHacksawScore5ProviderPass } from "./catalog-research-hacksaw-score5-provider-pass";

export function getCatalogResearchHacksawScore4ProviderPass(slug: string) {
  const legacy = getLegacyHacksawScore4ProviderPass(slug);
  const tail = getCatalogResearchHacksawScore4Tail20260919(slug);
  const score5 = getCatalogResearchHacksawScore5ProviderPass(slug);

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
