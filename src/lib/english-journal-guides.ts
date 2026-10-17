import type { JournalGuide } from "./journal-guides";

/** Reviewed editorial adaptations of the original Russian journal guides.
 * Preserve the source-backed examples, quantitative illustrations and the
 * complete source list rather than inventing game parameters.
 */
export const englishJournalGuides: JournalGuide[] = [
  {
    "slug": "reading-paytables",
    "title": "How to read a game's paytable",
    "category": "Game rules",
    "description": "Where to find winning-combination rules, how to interpret stake multipliers, and which conditions to check before a spin.",
    "sections": [
      {
        "id": "open-help",
        "title": "Start with the rules for the exact game",
        "paragraphs": [
          "Open the game's information menu. It may be called Help, Paytable or Rules, or marked with an information icon. Look beyond the pictures showing symbol prizes: you need the base-game rules, bonus conditions and explanations of special features too.",
          "Confirm the full title and publisher. Sequels labelled 1000, Megaways or Super Scatter can look familiar while using different rules. The original game's documentation does not establish how a sequel works. If the operator shows an RTP version, record that setting separately from the figure in a catalogue."
        ]
      },
      {
        "id": "combination",
        "title": "Check what actually counts as a win",
        "paragraphs": [
          "Next to each symbol, the paytable usually shows how many matches are needed and the corresponding award. Then identify the placement rule: a payline, consecutive reels, adjacent clusters or matches anywhere on the grid. Three identical symbols appearing on screen do not necessarily qualify for a payout.",
          "Check the counting direction, the minimum number of symbols and any exceptions. Read scatter and wild rules separately: special symbols may start a feature, substitute for others or perform more than one function."
        ],
        "example": {
          "title": "A game-specific example",
          "text": "Sweet Bonanza counts matching symbols across its grid, so you do not need to trace a payline through them. This is a rule of that game, not a property shared by all slots with cascades."
        }
      },
      {
        "id": "units",
        "title": "Find out which stake the award is based on",
        "paragraphs": [
          "The label 10× is incomplete until you know what it multiplies. It may refer to the total stake, a stake per line or another unit defined in the paytable. Never carry a calculation method from one game into another without checking.",
          "A displayed payout and the change in your balance are different quantities. If a round costs 20 units and pays 10, the net change is −10. A celebratory win animation cannot change that arithmetic."
        ],
        "example": {
          "title": "Illustrative maths, not a real game's parameters",
          "text": "If the paytable explicitly specifies 5× the total stake and your stake is 20 units, the payout is 100 units. The net change for that round is 100 − 20 = +80. The calculation would differ if the multiplier were based on the stake per payline."
        }
      },
      {
        "id": "check",
        "title": "Five questions to ask of a paytable",
        "paragraphs": [
          "Read the multiplier conditions and maximum-win restrictions separately: these may apply to a symbol combination, one cascade or an entire round. A paytable tells you what an eligible result pays; it does not disclose the probability of every combination."
        ],
        "checks": [
          "What symbol positions form an eligible win?",
          "Which stake unit is used to calculate the stated prizes?",
          "Which symbols cannot be replaced by a wild?",
          "When is a multiplier applied, and when does it reset?",
          "Where can you find the actual RTP setting and round limits?"
        ]
      }
    ],
    "related": [
      {
        "href": "/en/journal/payout-systems",
        "label": "Paylines, ways and clusters explained"
      },
      {
        "href": "/en/mechanics",
        "label": "Explore game mechanics"
      },
      {
        "href": "/en/slots/sweet-bonanza",
        "label": "Sweet Bonanza game guide"
      }
    ],
    "sources": [
      {
        "href": "https://www.pragmaticplay.com/en/games/sweet-bonanza-slot/",
        "label": "Pragmatic Play: Sweet Bonanza game description"
      },
      {
        "href": "https://www.gamblingcommission.gov.uk/public-and-players/guide/return-to-player-how-much-gaming-machines-payout",
        "label": "Gambling Commission: what RTP means"
      }
    ]
  },
  {
    "slug": "payout-systems",
    "title": "Paylines, ways and clusters: how wins are formed",
    "category": "Game mechanics",
    "description": "Four systems for forming winning combinations, and why cascades are a separate rule from how symbols qualify for a payout.",
    "sections": [
      {
        "id": "lines",
        "title": "Paylines follow defined routes",
        "paragraphs": [
          "In a payline game, eligible symbols must follow one of the reel routes specified in the rules. A route may be straight or zigzag. Check both its shape and the direction in which combinations are counted: a visible chain of matching symbols is not automatically a valid payline.",
          "The number of paylines describes how a game is organised. By itself, it cannot tell you which of two games offers a higher chance of winning, a better RTP or a larger future payout. The geometry of the grid is not enough to establish those figures."
        ],
        "checks": [
          "Are the paylines fixed or selectable?",
          "Which reel starts a paying combination?",
          "What is the minimum number of matches for each symbol?"
        ]
      },
      {
        "id": "ways",
        "title": "Ways count consecutive reels rather than drawn lines",
        "paragraphs": [
          "In a typical ways-to-win system, symbols do not have to follow a pre-drawn line. Instead, eligible matching symbols are counted across consecutive reels in the permitted positions. The game's rules still determine where the sequence starts and how long it must be.",
          "A high advertised ways count describes the available symbol paths, not the probability of a payout or the number of prizes in a single spin. If the reel heights change, the number of possible ways may change with them."
        ],
        "example": {
          "title": "A simplified illustration",
          "text": "Suppose an eligible symbol occupies two positions on the first reel, one on the second and three on the third. That gives 2 × 1 × 3 = 6 possible paths. This illustrates how positions are counted; whether any path pays, and how much, depend on the particular game."
        }
      },
      {
        "id": "clusters",
        "title": "Clusters are different from matches anywhere on the grid",
        "paragraphs": [
          "A cluster requires a connected group of matching symbols. Check what kind of adjacency is permitted. Do not count diagonally touching symbols when the rules allow only connections along the sides.",
          "In a pay-anywhere game, matching symbols may not need to touch at all: the game counts them across the grid regardless of position. Reactoonz and Sweet Bonanza illustrate this distinction. A similar-looking board does not make their payout requirements interchangeable."
        ],
        "checks": [
          "Must eligible symbols touch?",
          "How many matching symbols must be in one group?",
          "Are separate groups of the same symbol combined or counted separately?"
        ]
      },
      {
        "id": "cascades",
        "title": "A cascade happens after an eligible win",
        "paragraphs": [
          "A cascade describes how the board changes after a win: winning symbols are removed and new symbols occupy the spaces they leave. First, the game determines whether the symbols form a winning combination under its payout rules. Then the cascade happens. That is why cluster payouts and cascades can occur together.",
          "When comparing games, record two separate answers: 'What makes a combination win?' and 'What happens to the grid after it wins?' This is more useful than placing every non-payline game into one category."
        ],
        "example": {
          "title": "Putting the distinction into practice",
          "text": "Compare Sweet Bonanza and Reactoonz. First, check whether matching symbols have to be adjacent. Then examine what additional effects each game links to cascading symbols."
        }
      }
    ],
    "related": [
      {
        "href": "/en/journal/reading-paytables",
        "label": "How to read a paytable"
      },
      {
        "href": "/en/slots/reactoonz",
        "label": "Reactoonz game guide"
      },
      {
        "href": "/en/mechanics",
        "label": "Game mechanics index"
      }
    ],
    "sources": [
      {
        "href": "https://www.pragmaticplay.com/en/games/sweet-bonanza-slot/",
        "label": "Pragmatic Play: Sweet Bonanza rules"
      },
      {
        "href": "https://www.playngo.com/games/reactoonz",
        "label": "Play’n GO: Reactoonz cluster mechanics"
      },
      {
        "href": "https://client.pragmaticplay.com/wp-content/uploads/2022/11/5-Rabbit-Megaways.pdf",
        "label": "Pragmatic Play: 5 Rabbit Megaways rules (PDF)"
      }
    ]
  }
];
