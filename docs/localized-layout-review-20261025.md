# English and Spanish layout review — 25 October 2026

Baseline: main `172485145c184068c0b93e7321344da0b010268f`.
This is a scoped layout correction, not a CSS cleanup or a new visual system.

## Confirmed defects

| Priority | Where                                  | Width                            | Cause and correction                                                                                                                                                                                                                                                                     |
| -------- | -------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | EN/ES home, Reactoonz preview          | 320–390                          | The shared `.side-story > a` grid rule assigned both the artwork anchor and the reading link to the same cell. Give the reading link its own full-width row and a 44px target.                                                                                                           |
| P2       | EN/ES home and shared section headings | 320–390                          | A heading and a non-wrapping action competed for one line. Stack them below 768px; permit wrapping at larger widths.                                                                                                                                                                     |
| P2       | ES home, bottom editorial note         | 320                              | Flex layout left only 66.95px for the explanatory text. A two-column mark/text layout with the action on a separate row gives the text 232px. Apply the same rule to EN.                                                                                                                 |
| P2       | English header                         | All widths                       | The older navigation duplicated Catalogue and omitted direct access to the translated mechanics, journal, collections and comparison. Use the same four primary and two secondary destinations as RU/ES, retaining English labels. Policy and safer-gambling links remain in the footer. |
| P2       | EN/ES catalogue heading                | All widths                       | With no breadcrumbs, the eyebrow sat immediately under the navigation rule. Add the existing localized breadcrumb component, matching the other section entrances.                                                                                                                       |
| P2       | English catalogue filter help          | Desktop / expanded phone filters | A stale link still pointed at the Russian collection. Link to its existing English translation and remove the obsolete Russian-language qualifier.                                                                                                                                       |

## Scope and verification

The CSS module is attached only to the existing EN/ES layout boundaries. Russian
page styling, game data, artwork, sources, published game set, metadata, sitemap,
indexing gates, affiliate destinations and disclosure behavior are unchanged.

Browser regression coverage includes 320, 375, 390, 768, 1024 and 1440px;
actual reading-link clicks; menu Enter/Escape and focus restoration; breadcrumb
spacing; text-column width; and overflow checks for catalogue, both game page
templates, providers, mechanics, journal, collections and information pages.
The existing English foundation test now checks all four current primary links
instead of requiring the superseded single-article navigation item.

Before/after browser captures and the local comparison report are retained in
the task workspace under `outputs/localized-ux-20261025/`. Loading screens and
partially decoded images from the first exploratory pass are not accepted as
visual evidence; the comparison captures use the fully loaded static baseline.

Full CI and Cloudflare preview must pass on the final PR SHA before publication.
This PR must not merge the overlapping older #556 or restore deleted disclosure
and regions pages. The unrelated custom-domain stale-deleted-page incident is
recorded separately; these layout changes do not claim to resolve it.
