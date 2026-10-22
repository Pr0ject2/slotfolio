import batch01 from "./spanish-full-dossier-batch01.json" with { type: "json" };
import batch02 from "./spanish-full-dossier-batch02.json" with { type: "json" };
import batch03 from "./spanish-full-dossier-batch03.json" with { type: "json" };
import batch04 from "./spanish-full-dossier-batch04.json" with { type: "json" };
import batch05 from "./spanish-full-dossier-batch05.json" with { type: "json" };
import type { EnglishFullDossierCopy } from "./english-full-dossiers";
import type { Slot } from "./data";
import { slotFeatureCards } from "./dossier";
import { spanishCatalogFact } from "./spanish-catalog-facts";

export type SpanishFullDossierCopy = EnglishFullDossierCopy & { cards: { title: string; text: string }[] };
export const spanishFullDossiers: Record<string, SpanishFullDossierCopy> = { ...batch01, ...batch02, ...batch03, ...batch04, ...batch05 };

export function spanishDossierFeatureCards(game: Slot) {
  const copy = spanishFullDossiers[game.slug];
  const original = slotFeatureCards(game);
  if (!copy || copy.cards.length !== original.length) throw new Error(`Incomplete Spanish feature cards: ${game.slug}`);
  return copy.cards.map((card, index) => ({ ...card, kind: original[index].kind }));
}

export const spanishMechanicExplanations: Record<string, string> = {
  "Каскады": "Los símbolos ganadores desaparecen del tablero y otros nuevos ocupan sus posiciones. Si se forma otra combinación, la secuencia continúa dentro del mismo giro. Las cascadas por sí solas no determinan la probabilidad de ganar.",
  "Кластеры": "Importan las posiciones vecinas: un grupo de símbolos que se tocan forma un premio. Lee todo el tablero, no las rutas habituales de izquierda a derecha. Cuando un grupo desaparece, los símbolos que lo sustituyen pueden continuar la reacción en cadena.",
  "Линии": "El tablero base conserva una estructura conocida de rodillos y rutas predefinidas. Comprueba la dirección de pago, el número de líneas activas y cómo los comodines cambian las combinaciones durante el bonus.",
  "Сбор символов": "El evento clave es la aparición de un símbolo recolector especial. Recoge valores de otros símbolos del tablero. Comprueba cuándo se realiza la recogida y si la acumulación se conserva entre giros del bonus.",
  "Способы": "No hay una línea de pago fija: las coincidencias se forman en rodillos vecinos y el número de rutas posibles puede cambiar. La expansión del tablero, los símbolos divididos y las posiciones adicionales aumentan las vías de pago durante la ronda.",
};

const months: Record<string, string> = {
  января:"enero", февраля:"febrero", марта:"marzo", апреля:"abril", мая:"mayo", июня:"junio",
  июля:"julio", августа:"agosto", сентября:"septiembre", октября:"octubre", ноября:"noviembre", декабря:"diciembre",
};
export function spanishReleaseDate(value: string) {
  const date=value.match(/^(\d{1,2})\s+([А-Яа-яЁё]+)\s+(\d{4})$/);
  if(date&&months[date[2].toLowerCase()])return `${date[1]} de ${months[date[2].toLowerCase()]} de ${date[3]}`;
  return value.replace(/[А-Яа-яЁё]+/g, word => months[word.toLowerCase()] ?? word);
}
const metricLabels: Record<string, string> = {
  "Задокументированный выигрыш":"Premio documentado",
  "Заявленный максимум":"Máximo declarado", "Заявленный потенциал":"Potencial declarado",
  "Заявленный потенциал бонуса":"Potencial declarado del bonus",
  "Максимальная выплата":"Pago máximo", "Максимальный ULTRA Jackpot":"ULTRA Jackpot máximo",
  "Наблюдавшийся максимум":"Mayor premio observado",
};
export function spanishMetricLabel(value: string | undefined, fallback: string) { return value ? metricLabels[value] ?? value : fallback; }
export function spanishRtpContext(value: string) {
  return spanishCatalogFact(value)
    .replace("Недостаточно данных для сопоставления", "No hay suficientes datos para comparar")
    .replace("На уровне медианы каталога", "En la mediana del catálogo")
    .replace("п.п. выше медианы каталога", "puntos porcentuales por encima de la mediana del catálogo")
    .replace("п.п. ниже медианы каталога", "puntos porcentuales por debajo de la mediana del catálogo");
}
export function spanishVolatilityContext(value: string) {
  return spanishCatalogFact(value)
    .replace("справочная категория", "categoría orientativa")
    .replace("Справочная категория провайдера", "Categoría orientativa del proveedor");
}
