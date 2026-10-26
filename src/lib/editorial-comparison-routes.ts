export const editorialComparisonSlugs = [
  "gates-of-olympus-vs-sweet-bonanza",
  "gates-of-olympus-vs-1000",
  "reactoonz-vs-jammin-jars",
] as const;

export function hasEditorialComparison(path: string) {
  return path === "/comparisons" || editorialComparisonSlugs.some(slug => path === `/comparisons/${slug}`);
}
