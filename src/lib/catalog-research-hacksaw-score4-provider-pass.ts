import { getCatalogResearchHacksawScore4ProviderPass as getLegacyHacksawScore4ProviderPass } from "./catalog-research-hacksaw-score4-provider-pass-legacy";
import { getCatalogResearchHacksawScore4Tail20260919 } from "./catalog-research-hacksaw-score4-tail-20260919";

export function getCatalogResearchHacksawScore4ProviderPass(slug: string) {
  const legacy = getLegacyHacksawScore4ProviderPass(slug);
  const tail = getCatalogResearchHacksawScore4Tail20260919(slug);

  if (!tail) return legacy;
  if (!legacy) return tail;

  return {
    ...legacy,
    ...tail,
    mechanics: [...new Set([...legacy.mechanics, ...tail.mechanics])],
    evidence: `${legacy.evidence} ${tail.evidence}`,
  };
}
