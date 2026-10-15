import type { InformationSection } from "./system-pages";

export type EnglishInformationPage = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: InformationSection[];
};

// Reviewed translations of the visitor-facing Russian policy pages. Keep the
// factual claims in step with their Russian counterparts; no game facts here.
export const englishSystemPages: Record<string, EnglishInformationPage> = {
  "editorial-policy": {
    title: "How we check game information",
    eyebrow: "Editorial policy",
    intro: "Where game facts come from, how to read the numbers, and what to do when two sources disagree.",
    sections: [
      {
        title: "Start with the game's own rules",
        text: "Slotfolio uses game rules and publisher materials to describe mechanics and technical parameters. Names and versions matter: a sequel or a different configuration may have different rules even when the artwork looks similar.",
        steps: [
          "Confirm the exact game title and publisher before comparing values.",
          "Check RTP, release date, and maximum win in the appropriate game documentation; they may appear in different places.",
          "A date of verification tells you when information was checked, not that it can never change.",
        ],
        links: [{ label: "Browse the original Russian catalogue", href: "/slots" }],
      },
      {
        title: "When figures do not match",
        text: "An operator may offer one of several configurations of the same game. The help screen inside the particular game is the best place to check the active version. Do not average incompatible figures or assume the catalogue's setting applies everywhere.",
        steps: [
          "Match the game, version, and units. A maximum win expressed as a stake multiplier is not a fixed cash amount.",
          "Check whether the listed RTP is one setting or a range of available settings.",
          "Treat any parameter you cannot verify as unknown. A blank field does not mean zero.",
        ],
        links: [{ label: "What RTP actually means", href: "/en/journal/understanding-rtp" }],
      },
      {
        title: "Facts, explanations, and limitations",
        text: "Pay rules, game layout, and bonus conditions can be checked against documentation. Commentary about pace or complexity is an interpretation of those rules. It is not a claim about profitability or a verification of any casino's payment practices.",
        links: [
          { label: "Affiliate disclosure", href: "/en/disclosure" },
          { label: "Safer gambling", href: "/en/responsible-gaming" },
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy and browser data",
    eyebrow: "Privacy",
    intro: "You do not need an account to browse Slotfolio. Here is what your browser may store and how to clear it.",
    sections: [
      {
        title: "Your comparison list",
        text: "Games selected for comparison are stored locally in the browser on this device. The list does not automatically follow you to another browser or computer.",
        steps: [
          "In the comparison view, use its clear option to remove selected games.",
          "To remove other local site data, find Slotfolio under your browser's site-data settings and delete its entry.",
          "Private browsing or blocked storage can cause the comparison list to disappear when the window closes.",
        ],
        links: [{ label: "Open comparison (Russian interface)", href: "/compare" }],
      },
      {
        title: "Search, filters, and browsing history",
        text: "Search queries and filters may appear in a page URL. Anyone receiving that link can see them; the URL may also be stored in browser history and hosting logs.",
        steps: [
          "Do not enter passwords, payment details, or other sensitive information into site search.",
          "To share without a search query, send the game's own link or the catalogue URL without query parameters.",
          "Clearing the comparison list does not remove browser history; delete individual visits separately if necessary.",
        ],
        links: [{ label: "Browse the catalogue (Russian interface)", href: "/slots" }],
      },
      {
        title: "Loading pages and following other websites",
        text: "Your browser makes requests to the hosting provider when you visit the site. Site images and fonts are served alongside its pages. Following a link to a publisher, help service, or operator opens a separate website with its own privacy practices. Deleting Slotfolio data will not remove data stored there.",
        links: [{ label: "Affiliate disclosure", href: "/en/disclosure" }],
      },
    ],
  },
  disclosure: {
    title: "Affiliate links and editorial independence",
    eyebrow: "Affiliate disclosure",
    intro: "How to tell reference information from commercial links and what to check before visiting an operator.",
    sections: [
      {
        title: "Reference material is not an offer",
        text: "Game rules and publisher information are used to check a game's characteristics. They do not establish that real-money play is available. Slotfolio currently has no active casino affiliate offers.",
        links: [{ label: "How we verify game information", href: "/en/editorial-policy" }],
      },
      {
        title: "What an affiliate label means",
        text: "An affiliate link may earn Slotfolio a commission. The label indicates a commercial relationship, not that a casino is trustworthy, a bonus is good value, or a win is likely. A game listed here may not be available from your operator.",
      },
      {
        title: "Before joining another website",
        text: "Check the destination's current conditions for yourself, even when you arrived via a familiar catalogue.",
        steps: [
          "Compare the site's domain and company name with the relevant regulator's public register.",
          "Check whether the operator accepts players in your country and what identity verification is required.",
          "Read withdrawal, wagering, time-limit, bet-limit, and game-exclusion terms before accepting a bonus.",
        ],
        links: [{ label: "Safer gambling advice", href: "/en/responsible-gaming" }],
      },
    ],
  },
  "responsible-gaming": {
    title: "Safer gambling and getting help",
    eyebrow: "Safer gambling · 18+",
    intro: "If gambling is affecting essential expenses, relationships, or your ability to stop, there are practical ways to limit it and seek support.",
    sections: [
      {
        title: "If you need to stop right now",
        text: "Close the game and avoid making another deposit to recover losses. The next spin does not owe you compensation for previous results.",
        steps: [
          "Look for a time-out or self-exclusion option in the operator's account settings, or contact its support team.",
          "Turn off promotional notifications and remove apps that encourage you to return.",
          "Check whether your bank can block gambling-related payments.",
          "Talk to someone you trust. You do not have to wait until you are in debt to ask for help.",
        ],
      },
      {
        title: "Know what each limit actually covers",
        text: "Some operators offer deposit, loss, or time limits. A deposit limit restricts top-ups, not necessarily total bets or losses. Read how each limit works and when it takes effect. Never gamble with money needed for housing, food, bills, or debt repayment.",
      },
      {
        title: "Help and self-exclusion services",
        text: "In Great Britain, GamCare supports people affected by gambling harm and their loved ones. GAMSTOP offers online self-exclusion from participating operators. Check coverage and eligibility on their websites. Elsewhere, look for locally available support services and regulators.",
        links: [
          { label: "GamCare support", href: "https://www.gamcare.org.uk/" },
          { label: "GAMSTOP self-exclusion", href: "https://www.gamstop.co.uk/" },
        ],
      },
      {
        title: "Who this site is for",
        text: "Slotfolio is intended for adults aged 18 or over. Local age restrictions and gambling laws vary. Slotfolio does not accept wagers or manage gaming accounts; only the operator or its support team can suspend an account.",
      },
    ],
  },
};
