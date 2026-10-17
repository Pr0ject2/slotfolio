import batch01 from "./english-full-dossier-batch01.json" with { type: "json" };
import batch02 from "./english-full-dossier-batch02.json" with { type: "json" };
import batch03 from "./english-full-dossier-batch03.json" with { type: "json" };
import batch04 from "./english-full-dossier-batch04.json" with { type: "json" };
import batch05 from "./english-full-dossier-batch05.json" with { type: "json" };
import batch06 from "./english-full-dossier-batch06.json" with { type: "json" };
import batch07 from "./english-full-dossier-batch07.json" with { type: "json" };
import batch08 from "./english-full-dossier-batch08.json" with { type: "json" };
import batch09 from "./english-full-dossier-batch09.json" with { type: "json" };
import batch10 from "./english-full-dossier-batch10.json" with { type: "json" };
import batch11 from "./english-full-dossier-batch11.json" with { type: "json" };
import type { Slot } from "./data";
import { slotFeatureCards } from "./dossier";
import { englishCatalogFact } from "./english-catalog-facts";

export type EnglishFullDossierCopy = {
  description: string;
  feature: string;
  note: string;
  releaseDate?: string;
  metricsNote?: string;
  cards?: { title: string; text: string }[];
  additionalSourceLabels?: string[];
  passportSourceLabel?: string;
  attributionNote?: string;
};

/** Complete source-copy translations. Game facts and sources remain in the original records. */
export const englishFullDossiers: Record<string, EnglishFullDossierCopy> = {
  ...batch01, ...batch02, ...batch03, ...batch04, ...batch05, ...batch06,
  ...batch07, ...batch08, ...batch09, ...batch10, ...batch11,
};

export const englishMechanicExplanations: Record<string, string> = {
  "Каскады": "Winning symbols are removed from the grid, and new ones fill their positions. If another combination forms, the sequence continues within the same spin. Cascades alone do not determine the probability of winning.",
  "Кластеры": "Neighbouring positions matter: a group of touching symbols forms a win. Read the whole grid rather than familiar left-to-right routes. After a group disappears, replacement symbols can continue the chain reaction.",
  "Линии": "The base grid retains a familiar structure of reels and predefined routes. Check payout direction, the number of active paylines and how Wild symbols change combinations during the bonus.",
  "Сбор символов": "The key event is the appearance of a special collector symbol. It collects values from other symbols on the grid. Check when collection occurs and whether accumulation carries between bonus spins.",
  "Способы": "There is no fixed payline: matches form across adjacent reels, and the number of possible routes can change. Grid expansion, split symbols and extra positions increase the number of ways during the round.",
};

const featureExplanations: Record<string, string> = {
  "Свободные вращения": "The game has a separate bonus round with its own rules. What matters is which mechanics carry into free spins and what accumulates there, rather than simply whether free spins exist.",
  "Множители": "A multiplier can increase some wins. Check whether values add together, carry between spins and apply to a specific win.",
  "Pay Anywhere": "The payout depends on the number of matching symbols on the grid, rather than a fixed payline. This changes how to read a result, but does not itself make a win more likely.",
  "Book-бонус": "The book usually combines Scatter and Wild roles, while a special expanding symbol is selected for the bonus. The key question is when an expansion actually forms a payout.",
  "Расширяющийся символ": "A special symbol can occupy an entire reel or a substantial part of it. The animation is prominent, but its value depends on the paytable and activation conditions.",
  "Каскады": "After a payout, participating symbols disappear and the grid refills. One paid round can therefore contain several consecutive events.",
  "Шкала прогресса": "Specific events charge a counter or meter. Check whether progress resets after a spin and what happens when the meter fills.",
  "Преобразование символов": "The feature changes some symbols on the grid or turns them into a more useful type. Follow the timing of the transformation and whether it creates a new payout sequence.",
  "Закрепляющийся wild": "A Wild can remain in a position for more than one spin, most often during the bonus. The effect is easy to see, but the remaining number of spins still matters.",
  "Сбор значений": "A special symbol collects cash or multiplier values from other positions. Check whether collection happens once or repeats during the bonus.",
  "Сбор символов": "The game counts particular symbols or events. Accumulation can open another feature level, extra spins or another effect.",
  "Mystery-символы": "Hidden symbols reveal a shared symbol type or a set of values. The final combination cannot be read visually before the reveal, so follow the feature's rules.",
  "Wild": "Wild substitutes for some ordinary symbols. In some games it also carries a multiplier, moves or stays on the grid. The Wild label alone is therefore not enough to explain the mechanic.",
  "Несколько бонусов": "The game has more than one bonus scenario. Compare their rules as well as their names: the same number of free spins can lead to a different round structure.",
  "xWays": "A special symbol reveals extra positions and increases the number of ways to form a win. The final number of ways depends on the current state of the reels.",
  "Split-символы": "One position divides into several parts, increasing the number of symbols on a reel and potential payout routes.",
  "Динамическое поле": "The size or active area of the grid changes during the event. Read a description such as 5 × 3+ together with the expansion rules.",
  "xBomb": "An explosive Wild removes neighbouring positions and can increase the next cascade's multiplier. Read the effect alongside the order of explosions and collapses.",
  "xNudge": "A Wild nudges until fully visible on a reel, and each step can raise its multiplier. Several such Wilds can interact in one payout.",
  "xSplit": "The mechanic divides symbols or positions, increasing the number of elements on a reel. It is particularly prominent in games with a dynamic number of ways.",
  "Respin": "A particular event triggers a respin, sometimes retaining part of the grid. This is a separate cycle within the base round, rather than a guaranteed bonus.",
  "Золотые клетки": "Marked positions retain their state and can increase later cascades or bonus events. The grid's history matters alongside the symbol combination.",
  "Персонажи-функции": "Special characters perform different actions: collecting values, multiplying, adding symbols or changing the grid's state. Read their effects separately.",
  "Super Scatter": "A special Scatter awards a separate fixed prize when the bonus-trigger conditions are met. Count it separately from ordinary Scatters and wins within free spins.",
  "Soul Orbs": "Special orbs participate in accumulating multipliers and other feature states. Follow which orb changed and whether its value persists after a cascade.",
  "Risk Game": "After an ordinary win, the game offers a separate chance to risk the amount already won. It does not change the RTP of the base spin and is not a continuation of the main payline payout.",
  "Scatter": "Scatter usually counts independently of fixed paylines and can trigger a bonus. Check the exact number and positions in the particular game's paytable.",
  "Bonus Pop": "An additional feature can speed up entry into a bonus event. Availability can depend on the game version, operator and jurisdiction.",
  "Hold and Win": "The bonus retains special symbols on the grid and gives a limited number of further attempts to fill the remaining positions. The bonus state persists between respins.",
  "Джекпоты": "The game has separate fixed or progressive prize levels. The presence of a jackpot does not itself indicate how frequently it can be won.",
  "Pick-бонус": "The bonus offers a choice of hidden objects with predetermined prizes or effects. The distinction from an ordinary spin is a separate sequence of choices within the feature.",
};

export function englishDossierFeatureCards(game: Slot) {
  const copy = englishFullDossiers[game.slug];
  if (!copy) throw new Error(`Missing full English dossier: ${game.slug}`);
  const original = slotFeatureCards(game);
  if (copy.cards) {
    if (copy.cards.length !== original.length) throw new Error(`Incomplete English feature cards: ${game.slug}`);
    return copy.cards.map((card, index) => ({ ...card, kind: original[index].kind }));
  }
  if (original[0].title !== "Ключевая функция") throw new Error(`Missing special feature copy: ${game.slug}`);
  return original.map(card => {
    if (card.kind === "primary") return { title: "Main feature", text: copy.feature, kind: card.kind };
    const title = englishCatalogFact(card.title);
    return { title, text: featureExplanations[card.title] ?? `The “${title}” feature is recorded in this game's rules. Before playing, check when it activates and whether its effect persists between events.`, kind: card.kind };
  });
}

const months: Record<string, string> = {
  января:"January", февраля:"February", марта:"March", апреля:"April", мая:"May", июня:"June",
  июля:"July", августа:"August", сентября:"September", октября:"October", ноября:"November", декабря:"December",
};
export function englishReleaseDate(value: string) {
  return value.replace(/[А-Яа-яЁё]+/g, word => months[word.toLowerCase()] ?? word);
}

const metricLabels: Record<string, string> = {
  "Задокументированный выигрыш":"Documented win",
  "Заявленный максимум":"Stated maximum",
  "Заявленный потенциал":"Stated potential",
  "Заявленный потенциал бонуса":"Stated bonus potential",
  "Максимальная выплата":"Maximum payout",
  "Максимальный ULTRA Jackpot":"Maximum ULTRA Jackpot",
  "Наблюдавшийся максимум":"Highest observed win",
};
export function englishMetricLabel(value: string | undefined, fallback: string) {
  return value ? metricLabels[value] ?? value : fallback;
}

export function englishRtpContext(value: string) {
  return englishCatalogFact(value)
    .replace("Недостаточно данных для сопоставления", "Not enough data for comparison")
    .replace("На уровне медианы каталога", "At the catalogue median")
    .replace("п.п. выше медианы каталога", "percentage points above the catalogue median")
    .replace("п.п. ниже медианы каталога", "percentage points below the catalogue median");
}

export function englishVolatilityContext(value: string) {
  return englishCatalogFact(value)
    .replace("справочная категория", "reference category")
    .replace("Справочная категория провайдера", "Publisher reference category");
}
