import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-10-02";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-15-dragon-pearls": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Сбор символов", "Free Spins", "Jackpots"],
    mechanicDetails: {
      "Линии": "Поле 5×3 работает по 25 фиксированным линиям.",
      "Респины": "Шесть Gold Pearl Bonus Symbols запускают Hold & Win с шестью респинами.",
      "Блокировка символов": "Символы, запустившие бонус, и новые жемчужины остаются на поле до конца функции.",
      "Сбор символов": "Зелёная жемчужина собирает значения Gold Pearls, синяя собирает все видимые значения, включая другие синие жемчужины.",
      "Free Spins": "Три Scatter запускают восемь фриспинов с высокооплачиваемыми символами; функция может перезапускаться.",
      "Jackpots": "Заполнение поля Gold Pearls может принести фиксированный Grand Jackpot.",
    },
    source: "https://3oaks.com/game/15_dragon_pearls",
    verifiedAt,
    evidence: "Официальная страница описывает Hold & Win, респины, сбор значений зелёными и синими жемчужинами, фриспины и фиксированный Grand Jackpot.",
  },
  "3-oaks-gaming-3-african-drums": {
    mechanics: ["Линии", "Респины", "Сбор символов", "Множители"],
    mechanicDetails: {
      "Линии": "Поле 5×3 работает по 25 фиксированным линиям.",
      "Респины": "Hold & Win запускает серию респинов с Bonus Symbols на поле.",
      "Сбор символов": "COLLECT собирает значения видимых Bonus Symbols.",
      "Множители": "MULTI добавляет множители к значениям Bonus Symbols.",
    },
    source: "https://3oaks.com/game/3_african_drums",
    verifiedAt,
    evidence: "Официальная страница подтверждает 25 линий, Hold & Win, COLLECT и MULTI.",
  },
  "3-oaks-gaming-3-aztec-temples": {
    mechanics: ["Линии", "Респины", "Сбор символов", "Mystery Symbols", "Множители"],
    mechanicDetails: {
      "Линии": "Поле 5×3 работает по 25 фиксированным линиям.",
      "Респины": "Шесть или больше Bonus Symbols запускают Hold & Win с респинами.",
      "Сбор символов": "COLLECT собирает значения всех видимых Bonus Symbols.",
      "Mystery Symbols": "Mystery Symbol раскрывает бонусный символ либо символ джекпота.",
      "Множители": "MULTI увеличивает значения Bonus Symbols во время Hold & Win.",
    },
    source: "https://3oaks.com/game/3_aztec_temples",
    verifiedAt,
    evidence: "Официальная страница подтверждает Hold & Win, COLLECT, MULTI и Mystery Symbol с возможностью раскрытия джекпота.",
  },
  "3-oaks-gaming-3-china-pots": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Множители", "Jackpots"],
    mechanicDetails: {
      "Линии": "Поле 5×3 работает по 25 фиксированным линиям.",
      "Респины": "Bonus Symbols запускают Hold & Win с респинами.",
      "Блокировка символов": "Bonus Symbols остаются на поле во время Hold & Win.",
      "Множители": "Pot Feature MULTI добавляет множители к Bonus Symbols.",
      "Jackpots": "В бонусе доступны фиксированные Mini, Minor, Major и Grand Jackpot.",
    },
    source: "https://3oaks.com/game/3_china_pots",
    verifiedAt,
    evidence: "Официальная страница подтверждает Hold & Win, закрепление Bonus Symbols, Pot Features и фиксированные джекпоты.",
  },
  "3-oaks-gaming-3-clover-pots": {
    mechanics: ["Линии", "Респины", "Сбор символов", "Mystery Symbols", "Множители", "Free Spins", "Jackpots"],
    mechanicDetails: {
      "Линии": "Поле 5×3 работает по 25 фиксированным линиям.",
      "Респины": "Шесть Gold Clover Bonus Symbols запускают Hold & Win.",
      "Сбор символов": "COLLECT собирает все видимые значения во время бонуса.",
      "Mystery Symbols": "MYSTERY раскрывает высокооплачиваемый Bonus Symbol или джекпот.",
      "Множители": "Double Symbol удваивает значения символов, а Wild во фриспинах имеет множитель x2.",
      "Free Spins": "Три Scatter запускают фриспины, где Wild умножает выигрыш по линии на x2.",
      "Jackpots": "В Hold & Win доступны Mini, Minor, Major и Grand Jackpot; Grand требует заполнить поле клеверами.",
    },
    source: "https://3oaks.com/game/3_clover_pots",
    verifiedAt,
    evidence: "Официальная страница и релиз 3 Oaks описывают Hold & Win, Magic Pot boosters, фриспины с x2 Wild и четыре фиксированных джекпота.",
  },
};

export function getCatalogResearch3OaksDossierCopy(slug: string) {
  return records[slug];
}
