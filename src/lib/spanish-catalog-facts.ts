import { englishCatalogFact } from "./english-catalog-facts";

// Translate existing labels only. Never fill a missing value or change a number,
// range, scale, edition, feature name or source qualification.
const labels: [string, string][] = [
  ["Not published", "No publicado"], ["Not recorded", "Sin dato confirmado"],
  ["Non-adjacent expanded-symbol wins", "Premios con símbolos expandidos sin requisito de adyacencia"],
  ["Three stages of Gargantoon appearances", "Tres etapas de aparición de Gargantoon"],
  ["No traditional reels or paylines", "Sin rodillos ni líneas de pago tradicionales"],
  ["grid and cascading wins", "tablero y premios en cascada"],
  ["Dynamic 2–7 symbols per reel", "De 2 a 7 símbolos por rodillo, dinámicos"],
  ["Cascading Cluster Pays", "Premios por grupos con cascadas"],
  ["7-reel hexagonal grid", "Tablero hexagonal de 7 rodillos"],
  ["Medium–above medium", "Media–superior a la media"],
  ["Very high", "Muy alta"], ["Very low", "Muy baja"],
  ["High", "Alta"], ["Medium", "Media"], ["Low", "Baja"],
  ["Extreme", "Extrema"], ["Configurable", "Configurable"], ["Standard", "Estándar"],
  ["Video Slots", "Tragamonedas de vídeo"], ["Video Slot", "Tragamonedas de vídeo"],
  ["Grid Slot", "Tragamonedas de tablero"], ["Mini-slot", "Mini tragamonedas"],
  ["Slots", "Tragamonedas"],
  ["Free spins", "Giros gratis"], ["Bonus spins", "Giros de bono"],
  ["Expanding symbols", "Símbolos expansivos"], ["Expanding symbol", "Símbolo expansivo"],
  ["Symbol transformations", "Transformación de símbolos"], ["Symbol transformation", "Transformación de símbolos"],
  ["Sticky Wild", "Comodín fijo"], ["Expanding Wild", "Comodín expansivo"],
  ["Value collection", "Recogida de valores"], ["Coin collection", "Recogida de monedas"],
  ["Multiple bonuses", "Varios bonos"], ["Multiple directions", "Varias direcciones"],
  ["Golden positions", "Casillas doradas"], ["Dynamic grid", "Tablero dinámico"],
  ["Feature characters", "Personajes con funciones"], ["Fixed paylines", "Líneas de pago fijas"],
  ["Classic grid", "Tablero clásico"], ["Accumulating multiplier", "Multiplicador acumulativo"],
  ["Growing multiplier", "Multiplicador creciente"], ["Cascading grid", "Tablero con cascadas"],
  ["Dual grid", "Tablero doble"], ["two grids", "dos tableros"],
  ["Jackpots", "Botes"], ["Fruit", "Frutas"], ["Book bonus", "Bono Book"],
  ["Pick bonus", "Bono de elección"], ["Mystery symbols", "Símbolos Mystery"],
  ["Split symbols", "Símbolos divididos"], ["Hexagonal grid", "Tablero hexagonal"],
  ["Volcanic grid", "Tablero volcánico"], ["pays on adjacent reels", "premios en rodillos consecutivos"],
  ["cascading wins", "premios en cascada"], ["ways pays", "premios por formas de ganar"],
  ["powers of three gods", "poderes de tres dioses"], ["bonus multiplier", "multiplicador de bono"],
  ["Grid +1 row", "Tablero +1 fila"], ["dynamic paylines", "líneas de pago dinámicas"],
  ["payout directions", "direcciones de pago"], ["according to Game Info", "según Game Info"],
  ["with Wild", "con comodín"], ["Bonus retrigger", "Reactivación del bono"],
  ["Area multipliers", "Multiplicadores de zona"], ["Instant prizes", "Premios instantáneos"],
  ["Cluster pays", "Premios por grupos"], ["on reel 6", "en el rodillo 6"],
  ["ten free spins", "diez giros gratis"], ["Progressive multipliers", "Multiplicadores progresivos"],
  ["Expanding reels", "Rodillos expansivos"], ["Symbol locking", "Fijación de símbolos"],
  ["Symbol removal", "Eliminación de símbolos"], ["Symbol collection", "Recogida de símbolos"],
  ["Bonus wheel", "Rueda de bono"], ["Progress meter", "Medidor de progreso"],
  ["Respins", "Regiros"], ["Multipliers", "Multiplicadores"], ["Cascades", "Cascadas"],
  ["Paylines", "Líneas de pago"], ["Ways to win", "Formas de ganar"],
  ["varies by version", "varía según la versión"], ["sources disagree", "las fuentes discrepan"],
  ["expanding grid", "tablero ampliable"], ["reels", "rodillos"], ["reel", "rodillo"],
  ["positions per reel", "casillas por rodillo"], ["positions", "casillas"],
  ["symbols", "símbolos"], ["rows", "filas"], ["rings", "anillos"],
  ["coins", "monedas"], ["starts at", "empieza en"], ["up to", "hasta"],
  ["grid", "tablero"], ["payline", "línea de pago"], ["dynamic", "dinámico"],
  ["ways", "formas"], ["way", "forma"],
];
const orderedLabels = [...labels].sort((a, b) => b[0].length - a[0].length);

export function spanishCatalogFact(value: string): string {
  // Release dates already use day.month.year; decimal localization must not
  // turn their separators into commas.
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return value;
  let result = englishCatalogFact(value);
  for (const [original, spanish] of orderedLabels) {
    const literal = original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`(?<![\\p{L}\\p{N}])${literal}(?![\\p{L}\\p{N}])`, "giu"), spanish);
  }
  return result.replace(/(\d)\.(\d{1,2})(?!\d)/g, "$1,$2");
}
