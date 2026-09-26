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
};
