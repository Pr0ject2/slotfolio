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
  },
  {
    "slug": "wild-and-scatter",
    "title": "Wild and scatter symbols: what the rules really say",
    "category": "Symbols and features",
    "description": "Substitutions, free-spin triggers, sticky wilds and multipliers: how to tell one symbol's functions from another.",
    "sections": [
      {
        "id": "wild",
        "title": "Wilds: first find out what they can replace",
        "paragraphs": [
          "A wild usually helps form a winning combination by standing in for an ordinary symbol. Which symbols it may replace—and which it cannot—is determined by the game. Never assume that a wild can substitute for a scatter, cash symbol or another special icon.",
          "The payout system matters too. On a payline, a wild must contribute to a valid combination along that line. In a cluster-pays game, its position and neighbouring symbols matter. The word WILD on a symbol does not make those rules interchangeable."
        ],
        "checks": [
          "Which symbols can this wild replace?",
          "Does it have an award for a combination of wilds themselves?",
          "On which reels is it allowed to appear?"
        ]
      },
      {
        "id": "scatter",
        "title": "Scatters: distinguish a payout from a feature trigger",
        "paragraphs": [
          "Scatter symbols often activate free spins or another feature. Check the paytable for the exact number needed, which positions are eligible and the conditions that start the feature. The name 'scatter' cannot tell you those details on its own.",
          "A single special symbol can serve more than one purpose. Ordinary prizes, feature triggers and extra spins during an active bonus may have separate rules. Do not assume that a trigger threshold in the base game remains the same during free spins."
        ],
        "example": {
          "title": "A distinction in Sweet Bonanza",
          "text": "Pragmatic Play describes scatter symbols and bonus multipliers as separate features. The arrival of a special symbol does not mean that every multiplier automatically applies to every win."
        }
      },
      {
        "id": "variants",
        "title": "Sticky, expanding and moving wilds add different rules",
        "paragraphs": [
          "A sticky wild stays in a position for the period specified in the game rules. An expanding wild fills additional positions or a reel. A moving wild changes position when a specified event occurs. Check these behaviours separately from the wild's basic substitution role.",
          "The Dog House is an example of sticky wilds during free spins, while Jammin’ Jars features wild jars that can move and increase their multipliers after participating in wins. These examples help clarify the differences, but the paytable of the actual game version remains authoritative."
        ],
        "checks": [
          "What activates the additional behaviour?",
          "How many spins or cascades can it remain active?",
          "Which accumulated features reset when the bonus ends?"
        ]
      },
      {
        "id": "multiplier",
        "title": "Multipliers: find out what the number modifies",
        "paragraphs": [
          "A label such as 3× could apply to a symbol, a line, a cluster or a cascade result. The treatment of multiple multipliers also varies: some games add their values, while others apply different rules. There is no universal formula for every slot.",
          "Write down four points: what triggers the multiplier, which win it affects, how long it lasts and what resets it. If one answer is missing, consult that part of the paytable instead of trying to infer the rule from the animation."
        ],
        "example": {
          "title": "A paytable-checking template",
          "text": "'The wild becomes sticky when …; it substitutes for …; it stays until …; its multiplier applies to …'. Fill in each blank from the game's rules. If the details are not documented, leave the question open."
        }
      }
    ],
    "related": [
      {
        "href": "/en/slots/the-dog-house",
        "label": "The Dog House guide: sticky wilds"
      },
      {
        "href": "/en/slots/jammin-jars",
        "label": "Jammin’ Jars guide: moving wild jars"
      },
      {
        "href": "/en/journal/reading-paytables",
        "label": "How to read a paytable"
      }
    ],
    "sources": [
      {
        "href": "https://www.pragmaticplay.com/en/games/sweet-bonanza-slot/",
        "label": "Pragmatic Play: Sweet Bonanza"
      },
      {
        "href": "https://www.pragmaticplay.com/en/games/the-dog-house/",
        "label": "Pragmatic Play: The Dog House"
      },
      {
        "href": "https://www.pushgaming.com/games/jammin-jars.html",
        "label": "Push Gaming: Jammin’ Jars"
      }
    ]
  },
  {
    "slug": "volatility-and-hit-frequency",
    "title": "Volatility, hit frequency and RTP are not the same thing",
    "category": "Game figures",
    "description": "Why similar RTP figures need not produce similar payouts, and why a frequent payout does not necessarily mean a growing balance.",
    "sections": [
      {
        "id": "three-metrics",
        "title": "Three measures, three different questions",
        "paragraphs": [
          "Return to player (RTP) is the theoretical proportion of total stakes returned as payouts across a very large number of plays. Volatility describes the spread of possible outcomes. Hit frequency describes how often a defined winning event occurs. Before comparing hit-frequency figures, find out what each source counts as an event.",
          "Labels such as 'high' and 'low' are not a universal numeric scale. One publisher's volatility descriptions cannot automatically be equated with another's. If a source does not explain its method, keep that uncertainty visible instead of turning a label into a precise forecast."
        ]
      },
      {
        "id": "example",
        "title": "The same total payout can look completely different",
        "paragraphs": [
          "A deliberately artificial example shows the difference between the total returned and the distribution of results. It is not the mathematical model of an existing slot, and a short play history cannot establish a real game's underlying characteristics."
        ],
        "example": {
          "title": "Ten hypothetical rounds, staking 1 unit each",
          "text": "Scenario A pays 1 unit on nine rounds and zero on one: 9 units returned. Scenario B pays 9 units on one round and zero on the other nine: also 9 units returned. Stakes and total payouts are identical, but the number and distribution of paying events differ. Ten observations cannot establish a game's theoretical RTP."
        },
        "checks": [
          "Do not confuse total money paid out with the number of paying events.",
          "Do not attempt to calculate a game's volatility from one video or short session.",
          "Do not interpret 'high volatility' as the probability of any particular result."
        ]
      },
      {
        "id": "balance",
        "title": "A payout need not mean a profitable round",
        "paragraphs": [
          "If a spin costs 10 units and awards 4, your balance falls by 6 units for that round. The game may still celebrate the event as a payout even though the award did not cover the original stake.",
          "A hit-frequency figure is difficult to interpret without its definition. Does it count every non-zero award, only awards larger than the stake, bonus triggers or another event? Do not treat differently defined rates as comparable."
        ]
      },
      {
        "id": "limits",
        "title": "What these numbers cannot tell you",
        "paragraphs": [
          "Neither RTP nor volatility tells you how many spins remain before a bonus. In games with independent random outcomes, earlier losses create no obligation for the next spin to compensate them. Some games do have progressive in-game features; their particular rules must be read separately.",
          "An unverified figure in the catalogue is missing information, not a zero hit rate or an indication of low risk. When comparing games, use figures that refer to the same relevant game versions and keep gaps in the evidence explicit."
        ],
        "checks": [
          "Find the source of each figure and how it is defined.",
          "Check the RTP setting of the version actually available.",
          "Never use a run of previous results as a reason to increase your stake."
        ]
      }
    ],
    "related": [
      {
        "href": "/en/journal/understanding-rtp",
        "label": "What RTP actually means"
      },
      {
        "href": "/en/journal/comparing-games",
        "label": "How to compare two games"
      },
      {
        "href": "/en/responsible-gaming",
        "label": "Safer gambling and limits"
      }
    ],
    "sources": [
      {
        "href": "https://www.gamblingcommission.gov.uk/public-and-players/guide/return-to-player-how-much-gaming-machines-payout",
        "label": "Gambling Commission: return to player and random outcomes"
      },
      {
        "href": "https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/live-return-to-player-performance-monitoring-of-games-of-chance",
        "label": "Gambling Commission: RTP performance, volatility and results"
      }
    ]
  },
  {
    "slug": "comparing-games",
    "title": "How to compare two games without declaring a winner",
    "category": "Using the catalogue",
    "description": "A practical approach to comparing rules, features and verified details—without guessing missing figures or mixing incompatible RTP settings.",
    "sections": [
      {
        "id": "question",
        "title": "Start with a question you can actually answer",
        "paragraphs": [
          "Which game is 'better' is too broad a question. Try something specific: must winning symbols touch, what happens to the board after a payout, when can a multiplier apply, or how do two bonuses differ despite using the same grid?",
          "Choose two games with a shared element. Sweet Bonanza and Reactoonz both use cascades, for example, but have different rules for what qualifies as a winning combination. Comparing them separates board updates from payout conditions."
        ],
        "example": {
          "title": "Write down a comparison question",
          "text": "'Both games use cascades. I want to know whether symbols must touch and which additional effects may occur after a win.' The answer can be checked against concrete sections of each game guide."
        }
      },
      {
        "id": "open",
        "title": "Open Slotfolio's comparison table",
        "paragraphs": [
          "Select Compare on two games with full editorial guides, then open the side-by-side table. It holds two games at a time; remove one before adding a third. On narrower screens, the table may need horizontal scrolling.",
          "A brief catalogue record may not include a Compare button because it does not carry the same depth of researched information as a full guide. That does not say anything about the quality of the game: the available, verified facts can still be read on its own page."
        ],
        "checks": [
          "Confirm the exact game titles and publishers.",
          "Compare winning-combination rules and the grid.",
          "Separate features available in the base game from those exclusive to the bonus."
        ]
      },
      {
        "id": "unknown",
        "title": "Do not turn an unknown into an estimate",
        "paragraphs": [
          "A missing value is not zero. If a maximum win or bonus frequency is not supported by a source, that comparison remains unresolved. A large number printed on promotional artwork does not tell you the probability of achieving it.",
          "For RTP, compare configurations carefully: a single title may come with several settings. Keep the original source's volatility scale and wording. The same descriptive label used by different publishers may not represent the same measurement."
        ],
        "example": {
          "title": "A precise way to record uncertainty",
          "text": "'Game A has two confirmed RTP variants; Game B has one setting documented in the available source. The versions offered by the operators have not yet been matched.' That is more accurate than calling one game more profitable based on incompatible figures."
        }
      },
      {
        "id": "conclusion",
        "title": "Finish with a distinction in the rules",
        "paragraphs": [
          "A useful conclusion is concrete: 'one game requires adjacent clusters, while another counts matches anywhere on the board', or 'one bonus keeps wilds in place, while another moves them after a win'.",
          "That conclusion helps explain how a game works. It cannot predict what a playing session will return and is not a reason to stake more. If the answer depends on an unknown setting or version, say so beside the comparison."
        ],
        "checks": [
          "What do the games genuinely have in common?",
          "Which one rule differs?",
          "Which source supports that finding?",
          "What remains unknown?"
        ]
      }
    ],
    "related": [
      {
        "href": "/en/compare",
        "label": "Open the comparison table"
      },
      {
        "href": "/en/slots",
        "label": "Choose two games from the catalogue"
      },
      {
        "href": "/en/journal/volatility-and-hit-frequency",
        "label": "RTP, volatility and hit frequency explained"
      }
    ],
    "sources": [
      {
        "href": "/en/editorial-policy",
        "label": "How Slotfolio checks facts and handles conflicting sources"
      },
      {
        "href": "/en/slots/sweet-bonanza",
        "label": "Sweet Bonanza full guide and source references"
      },
      {
        "href": "/en/slots/reactoonz",
        "label": "Reactoonz full guide and source references"
      }
    ]
  }
];
