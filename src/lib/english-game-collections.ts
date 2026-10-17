import type { GameCollection } from "./collections";

// Individually adapted UK English copy; keep game selection and feature facts
// aligned with src/lib/collections.ts. No gameplay parameters are overridden.
export const englishGameCollections: GameCollection[] = [
  {
    "slug": "beyond-lines",
    "title": "Beyond paylines",
    "question": "When can matching symbols pay without lining up?",
    "introduction": "Sweet Bonanza and Gates of Olympus count matching symbols across the grid. Reactoonz requires adjacent symbols. Compare what qualifies for a win—and what happens once those symbols are removed.",
    "selection": "Three games without fixed paylines, all with cascades. Two count matching symbols across the play area; the third requires neighbouring groups. Cascades refill the grid after a win, but they do not determine which symbols qualify in the first place.",
    "checklist": [
      "Must matching symbols be adjacent?",
      "How many matching symbols make a paying combination?",
      "When does a multiplier apply, and when does it reset?"
    ],
    "games": [
      {
        "slug": "sweet-bonanza",
        "note": "Matching symbols count across the grid. After a win they disappear, and new symbols fill the gaps. Multiplier symbols can appear during free spins.",
        "check": "Find the minimum number of matching symbols in the paytable and check when bonus multipliers are applied."
      },
      {
        "slug": "reactoonz",
        "note": "Wins require groups of neighbouring symbols. Winning clusters charge an energy meter that can activate additional effects on the board.",
        "check": "Confirm which positions count as neighbours and what triggers each stage of the energy meter."
      },
      {
        "slug": "gates-of-olympus",
        "note": "As in Sweet Bonanza, matching symbols count across the grid. A key difference to examine is the free-spins multiplier, which can accumulate and affect later wins in the bonus.",
        "check": "Compare the multiplier rules in the base game with those during free spins."
      }
    ]
  },
  {
    "slug": "cluster-features",
    "title": "Clusters: what changes after a win?",
    "question": "Why do games with adjacent-symbol wins behave so differently?",
    "introduction": "Reactoonz, Jammin’ Jars and Le Bandit all use clusters and cascades. Their added layers differ: an energy meter, moving wild jars and golden cells. Explore which parts of the board matter in each game.",
    "selection": "Three cluster-pays games from different studios, each with cascading symbols. The comparison focuses on what their extra features do, not on advertised potential winnings.",
    "checklist": [
      "Which symbols disappear after a winning cluster?",
      "What remains on the board between cascades?",
      "What starts an additional feature?"
    ],
    "games": [
      {
        "slug": "reactoonz",
        "note": "Winning clusters charge an energy meter. To understand the next effect, watch both the symbols and the meter's current stage.",
        "check": "Read the order of the meter effects and the requirements for activating each one."
      },
      {
        "slug": "jammin-jars",
        "note": "On its 8 × 8 grid, wild jars take part in clusters. After contributing to a win, a jar can move and increase its multiplier.",
        "check": "Follow one wild jar: when does it move, and when does its multiplier grow?"
      },
      {
        "slug": "le-bandit",
        "note": "A winning cluster starts a super cascade that also removes matching symbols of the same type. Golden cells then connect to coin, clover and pot-of-gold effects.",
        "check": "Separate ordinary cluster payouts from the additional effects tied to golden cells."
      }
    ]
  },
  {
    "slug": "wild-symbols",
    "title": "Wild symbols: sticky, moving or reel-wide",
    "question": "What can a wild do beyond substituting for another symbol?",
    "introduction": "The Dog House uses sticky wilds, Jammin’ Jars has moving wild jars, and Wanted Dead or a Wild can turn special symbols into wild reels. Compare where substitutions work and how multipliers affect eligible wins.",
    "selection": "Three different uses of wild symbols, across both paylines and cluster pays. Sharing a symbol name does not mean the games calculate wins in the same way.",
    "checklist": [
      "Which symbols can the wild substitute for?",
      "How long does the wild remain in play?",
      "Which wins can receive its multiplier?"
    ],
    "games": [
      {
        "slug": "the-dog-house",
        "note": "During free spins, wild symbols can stay in place until the bonus ends. Winning paylines still need to pass through eligible symbol combinations.",
        "check": "Compare an ordinary wild with a sticky wild during the bonus, including how multipliers combine."
      },
      {
        "slug": "jammin-jars",
        "note": "Wild jars operate on a cluster grid. After contributing to a win, a jar can move and raise its multiplier; its position among adjacent symbols matters.",
        "check": "Identify the exact event that moves a jar and increases its multiplier."
      },
      {
        "slug": "wanted-dead-or-a-wild",
        "note": "DuelReels can turn VS symbols into wild reels. Their multipliers add together for a qualifying payline.",
        "check": "Look for the DuelReels trigger and the multiplier rule when a winning line crosses several such reels."
      }
    ]
  },
  {
    "slug": "five-by-three-bonuses",
    "title": "One 5 × 3 grid, three different bonuses",
    "question": "Why does an identical reel layout tell you so little about the bonus?",
    "introduction": "Book of Dead, The Dog House and Big Bass Bonanza all use a 5 × 3 layout. Their free-spins features work differently: expanding symbols, sticky wilds and collecting cash values.",
    "selection": "Three games with the same grid size and free spins. Keeping the layout constant helps isolate the feature rules rather than the shape of the reels.",
    "checklist": [
      "What starts free spins?",
      "Which rules change once the feature begins?",
      "What awards extra spins or increases a multiplier?"
    ],
    "games": [
      {
        "slug": "book-of-dead",
        "note": "During free spins, a selected symbol can expand to fill a reel. That feature must be distinguished from an ordinary payline win.",
        "check": "Check what allows the selected symbol to expand and how the payout is calculated afterwards."
      },
      {
        "slug": "the-dog-house",
        "note": "Wild symbols can remain on the reels until the bonus ends. The board evolves, but payouts still depend on valid combinations.",
        "check": "Check which reels can hold sticky wilds and how their multipliers apply."
      },
      {
        "slug": "big-bass-bonanza",
        "note": "In free spins, the fisherman collects values from cash symbols. Repeated fisherman appearances can advance a meter towards extra spins and multipliers.",
        "check": "Keep ordinary line wins, cash-value collection and bonus-meter progress separate."
      }
    ]
  }
];
