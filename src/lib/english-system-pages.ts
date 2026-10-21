import type { InformationSection } from "./system-pages";

export type EnglishInformationPage = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: InformationSection[];
};

// Editorially adapted English versions of the visitor-facing policy pages. Keep the
// factual claims in step with their Russian counterparts; no game facts here.
export const englishSystemPages: Record<string, EnglishInformationPage> = {
  "editorial-policy": {
    title: "How we verify game details",
    eyebrow: "Editorial policy",
    intro: "Where our game information comes from, how to interpret the figures and what to check when sources disagree.",
    sections: [
      {
        title: "Start with the publisher's rules",
        text: "Slotfolio uses game rules and publisher materials to describe mechanics and technical parameters. Names and versions matter: a sequel or a different configuration may have different rules even when the artwork looks similar.",
        steps: [
          "Confirm the exact game title and publisher before comparing values.",
          "Look up RTP, release dates and maximum-win figures in the relevant documents. They may be published separately.",
          "A 'last checked' date records when we reviewed a detail. It does not mean the information will never change.",
        ],
        links: [{ label: "Browse the original Russian catalogue", href: "/slots" }],
      },
      {
        title: "When figures do not match",
        text: "A casino may offer one of several versions of the same game. Check the help screen or paytable in the version actually available to you. Do not average incompatible figures or assume the catalogue's setting applies everywhere.",
        steps: [
          "Match the game, version, and units. A maximum win quoted as a multiple of your bet is not a fixed amount of money.",
          "Check whether the listed RTP is one setting or a range of available settings.",
          "Treat any parameter you cannot verify as unknown. A blank field does not mean zero.",
        ],
        links: [{ label: "What RTP actually means", href: "/en/journal/understanding-rtp" }],
      },
      {
        title: "Facts, explanations, and limitations",
        text: "Pay rules, game layout, and bonus conditions can be checked against documentation. When we describe a game's pace or complexity, we are interpreting its documented rules. It is not a claim about profitability or a verification of any casino's payment practices.",
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
        title: "Games saved for comparison",
        text: "Games selected for comparison are stored locally in the browser on this device. The list does not automatically follow you to another browser or computer.",
        steps: [
          "In the comparison view, use its clear option to remove selected games.",
          "To remove other local site data, find Slotfolio under your browser's site-data settings and delete its entry.",
          "Private browsing or blocked storage can cause the comparison list to disappear when the window closes.",
        ],
        links: [{ label: "Open the English comparison", href: "/en/compare" }],
      },
      {
        title: "Search, filters, and browsing history",
        text: "Search queries and filters may appear in a page URL. Anyone receiving that link can see them; the URL may also be stored in browser history and hosting logs.",
        steps: [
          "Do not enter passwords, payment details, or other sensitive information into site search.",
          "To share a clean link, use the game's page or the catalogue address without anything after the question mark.",
          "Clearing the comparison list does not remove browser history; delete individual visits separately if necessary.",
        ],
        links: [{ label: "Browse the catalogue", href: "/en/slots" }],
      },
      {
        title: "Your language choice",
        text: "The RU/EN/ES switch saves your choice in this browser on this device. A saved choice takes priority over the browser language. You can change it with the switch or remove it by clearing Slotfolio's site data in your browser settings.",
      },
      {
        title: "Loading pages and following other websites",
        text: "Your browser makes requests to the hosting provider when you visit the site. Site images and fonts are served alongside its pages. Following a link to a publisher, help service, or operator opens a separate website with its own privacy practices. Deleting Slotfolio data will not remove data stored there.",
        links: [{ label: "Affiliate disclosure", href: "/en/disclosure" }],
      },
    ],
  },
  disclosure: {
    title: "Affiliate links and our editorial approach",
    eyebrow: "Affiliate disclosure",
    intro: "How we distinguish reference material from commercial links, and what to check before using another website.",
    sections: [
      {
        title: "Reference material is not an offer",
        text: "Game rules and publisher information are used to check a game's characteristics. They do not establish that real-money play is available. Slotfolio does not currently display any active casino affiliate offers.",
        links: [{ label: "How we verify game information", href: "/en/editorial-policy" }],
      },
      {
        title: "What an affiliate label means",
        text: "If we display an affiliate link, Slotfolio may earn a commission when someone follows it or takes an eligible action. That label discloses a commercial relationship. It is not an endorsement of the casino, a guarantee about the bonus or a claim that you are more likely to win. A game listed here may not be available from your operator.",
      },
      {
        title: "Before joining another website",
        text: "Check the destination's current conditions for yourself, even when you arrived via a familiar catalogue.",
        steps: [
          "Compare the site's domain and company name with the relevant regulator's public register.",
          "Check whether the operator accepts players in your country and what identity verification is required.",
          "Before claiming a bonus, check withdrawal rules, wagering requirements, expiry dates, maximum bets and excluded games.",
        ],
        links: [{ label: "Safer gambling advice", href: "/en/responsible-gaming" },
          { label: "Understanding bonus terms", href: "/en/bonuses" }],
      },
    ],
  },
  "responsible-gaming": {
    title: "Safer gambling and getting help",
    eyebrow: "Safer gambling · 18+",
    intro: "If gambling is putting pressure on your finances, relationships or ability to stop, support and practical limits are available.",
    sections: [
      {
        title: "If you need to stop right now",
        text: "Close the game and avoid making another deposit to recover losses. A previous loss does not make a win on the next spin any more certain.",
        steps: [
          "Look for a time-out or self-exclusion option in the operator's account settings, or contact its support team.",
          "Turn off promotional notifications and remove apps that encourage you to return.",
          "Ask your bank whether it offers a gambling-transaction block.",
          "Talk to someone you trust. You do not have to wait until you are in debt to ask for help.",
        ],
      },
      {
        title: "Know what each limit actually covers",
        text: "Some operators offer deposit, loss, or time limits. A deposit limit restricts top-ups, not necessarily total bets or losses. Read how each limit works and when it takes effect. Never gamble with money needed for housing, food, bills, or debt repayment.",
      },
      {
        title: "Help and self-exclusion services",
        text: "In Great Britain, GamCare offers support to people affected by gambling harm and those close to them. GAMSTOP provides self-exclusion from participating online gambling operators. Check coverage and eligibility on their websites. Elsewhere, look for locally available support services and regulators.",
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
