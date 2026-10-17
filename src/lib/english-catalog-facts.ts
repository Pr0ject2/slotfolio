/** Translate documented labels only. Numbers, ranges, scales and feature names
 * remain source values; this function never supplies a missing characteristic. */
const labels: [string, string][] = [
  // The publisher describes expanded symbols paying without adjacency in Book of Dead:
  // https://www.playngo.com/games/book-of-dead (Game features).
  ["Неснятые соседством выплаты", "Non-adjacent expanded-symbol wins"],
  ["Три стадии появления Gargantoon", "Three stages of Gargantoon appearances"],
  ["Повторный запуск бонуса", "Bonus retrigger"],
  ["Зональные множители", "Area multipliers"],
  ["Мгновенные призы", "Instant prizes"],
  ["кластерные выплаты", "Cluster pays"],
  ["динамическая сетка", "dynamic grid"],
  ["на 6-м", "on reel 6"],
  ["десять Free Spins", "ten free spins"],
  ["Средняя–выше средней", "Medium–above medium"],
  ["Очень высокая", "Very high"], ["Очень низкая", "Very low"],
  ["Низкая", "Low"], ["Средняя", "Medium"], ["Высокая", "High"],
  ["Экстремальная", "Extreme"], ["Настраиваемая", "Configurable"], ["Стандартная", "Standard"],
  ["Прогрессивные множители", "Progressive multipliers"],
  ["Расширяющиеся барабаны", "Expanding reels"],
  ["Расширяющиеся символы", "Expanding symbols"],
  ["Трансформация символов", "Symbol transformation"],
  ["Блокировка символов", "Symbol locking"],
  ["Удаление символов", "Symbol removal"],
  ["Сбор символов", "Symbol collection"],
  ["Бонусные вращения", "Bonus spins"],
  ["Бонусное колесо", "Bonus wheel"],
  ["Шкала прогресса", "Progress meter"],
  ["Респины", "Respins"], ["Множители", "Multipliers"],
  ["Каскады", "Cascades"], ["Кластеры", "Cluster pays"],
  ["Линии", "Paylines"], ["Способы", "Ways to win"],
  ["зависит от версии", "varies by version"],
  ["источники расходятся", "sources disagree"],
  ["фиксированных линий", "fixed paylines"],
  ["расширяемое поле", "expanding grid"],
  ["барабанов", "reels"], ["барабана", "reels"], ["барабан", "reel"],
  ["способов", "ways"], ["способа", "ways"],
  ["линий", "paylines"], ["линии", "paylines"],
  ["монет", "coins"], ["старт", "starts at"], ["до ", "up to "],
  ["ячеек", "positions"], ["позиций", "positions"], ["рядов", "rows"],
  ["сетка", "grid"], ["линия", "payline"], ["Бонус:", "Bonus:"],
  [" и ", " and "], [" в ", " in "],
];

export function englishCatalogFact(value: string): string {
  let translated = value;
  for (const [original, english] of labels) {
    translated = translated.replace(new RegExp(original, "giu"), english);
  }
  // Russian decimal commas have one or two fractional digits in these records.
  // Leave comma-separated thousands and all original ranges intact.
  return translated.replace(/(\d),(\d{1,2})(?!\d)/g, "$1.$2");
}
