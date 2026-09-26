import type { OperatorAvailability } from "./data-base";

const pragmaticBattleSource =
  "https://forum.1win.com/topic/73-%F0%9F%92%A5-slots-battling-for-your-attention/";
const gatesSource =
  "https://forum.1win.com/topic/892-my-first-1win-deposit-rekt-or-x1000-%F0%9F%93%89%F0%9F%9A%80-storytime/";
const hacksawSource =
  "https://forum.1win.com/topic/468-%E2%80%8B-%F0%9F%92%A5-hacksaw-madness-are-these-bonuses-worth-the-risk-%E2%80%8B/";
const pragmaticCandySource =
  "https://forum.1win.com/topic/346-%F0%9F%8D%AC-sugar-rush-or-sugar-crash-the-candy-slot-dilemma/";
const deadOrAliveSource =
  "https://forum.1win.com/topic/180-%F0%9F%8E%B0-longest-bonus-ever-this-slot-goes-wild/";
const oneWinTopWinsSource = "https://t.me/s/reg_official_1win/1386";
const oneWinStarburstSource = "https://t.me/s/reg_official_1win/706";
const oneWinMoneyTrainSource = "https://t.me/s/reg_official_1win/986";
const oneWinClassicPromoSource = "https://t.me/s/reg_official_1win/226";
const oneWinFireInTheHoleSource = "https://t.me/s/reg_official_1win/1426";
const oneWinBook99Source = "https://t.me/s/reg_official_1win/3266";
const oneWinMentalSource = "https://t.me/s/reg_official_1win/2866";

export const legacyOneWinAvailabilityBySlug: Record<string, OperatorAvailability> = {
  "gates-of-olympus": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: gatesSource,
    evidence:
      "Публикация команды 1win о первом депозите прямо использует Gates of Olympus как слот, который игрок открывает на 1win, и предлагает вернуться к игре.",
  },
  "the-dog-house": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: pragmaticBattleSource,
    evidence:
      "Модератор официального форума 1win включает The Dog House в пару Pragmatic Play слотов для игры и сопровождает подборку призывом Spin & Win.",
  },
  "big-bass-bonanza": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: pragmaticBattleSource,
    evidence:
      "Модератор официального форума 1win включает Big Bass Bonanza в пару Pragmatic Play слотов для игры и сопровождает подборку призывом Spin & Win.",
  },
  "wanted-dead-or-a-wild": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: hacksawSource,
    evidence:
      "Официальная публикация Slot Games форума 1win включает Wanted Dead or a Wild в подборку Hacksaw и ведёт к запуску игр Hacksaw.",
  },
  "chaos-crew": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: hacksawSource,
    evidence:
      "Официальная публикация Slot Games форума 1win прямо перечисляет Chaos Crew в подборке Hacksaw и ведёт к запуску игр Hacksaw.",
  },
  "chaos-crew-2": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: hacksawSource,
    evidence:
      "Официальная публикация Slot Games форума 1win прямо перечисляет Chaos Crew 2 в подборке Hacksaw и ведёт к запуску игр Hacksaw.",
  },
  "sweet-bonanza": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: pragmaticCandySource,
    evidence:
      "Администратор Daria в разделе Slot Games официального форума 1win прямо называет Sweet Bonanza среди Pragmatic Play candy slots и ведёт к Spin Pragmatic.",
  },
  "sugar-rush": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: pragmaticCandySource,
    evidence:
      "Администратор Daria в разделе Slot Games официального форума 1win прямо называет Sugar Rush среди Pragmatic Play candy slots и ведёт к Spin Pragmatic.",
  },
  "dead-or-alive-2": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: deadOrAliveSource,
    evidence:
      "Администратор Daria публикует в Slot Games описание Dead or Alive 2 как игрового слота и даёт ссылку Explore Slots на официальном форуме 1win.",
  },
  "book-of-dead": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinTopWinsSource,
    evidence:
      "Официальный Telegram-канал 1WIN прямо перечисляет Book of Dead среди слотов в подборке выигрышей игроков 1WIN.",
  },
  "fruit-party": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinTopWinsSource,
    evidence:
      "Официальный Telegram-канал 1WIN прямо перечисляет Fruit Party среди слотов в подборке выигрышей игроков 1WIN.",
  },
  "razor-shark": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinTopWinsSource,
    evidence:
      "Официальный Telegram-канал 1WIN прямо перечисляет Razor Shark среди слотов в подборке выигрышей игроков 1WIN.",
  },
  starburst: {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinStarburstSource,
    evidence:
      "Официальный Telegram-канал 1WIN публикует раздачу бонус-кодов на 50 free spins именно в Starburst для участников канала.",
  },
  "money-train-2": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinMoneyTrainSource,
    evidence:
      "Официальный Telegram-канал 1WIN прямо сообщает о выигрыше стримера в Money Train 2 в казино 1WIN.",
  },
  "gonzos-quest": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinClassicPromoSource,
    evidence:
      "Официальный Telegram-канал 1WIN прямо называет Gonzo's Quest от NetEnt в публикации о казино 1WIN.",
  },
  "fat-rabbit": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinClassicPromoSource,
    evidence:
      "Официальный Telegram-канал 1WIN включает Fat Rabbit от Push Gaming в праздничную подборку игр.",
  },
  "fire-in-the-hole": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinFireInTheHoleSource,
    evidence:
      "Официальный Telegram-канал 1WIN прямо перечисляет оригинальный Fire In The Hole среди игр, в которых выигрывают игроки 1WIN.",
  },
  "book-of-99": {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinBook99Source,
    evidence:
      "Официальный Telegram-канал 1WIN прямо включает Book Of 99 в рубрику выигрышей недели казино 1WIN.",
  },
  mental: {
    operator: "1win",
    verifiedAt: "2026-09-26",
    source: oneWinMentalSource,
    evidence:
      "Официальный Telegram-канал 1WIN прямо перечисляет Mental в рубрике «Три выигрыша недели» среди игр казино 1WIN.",
  },
};
