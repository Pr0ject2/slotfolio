# Keep the next comparison action with the selected games

Baseline: main `07a3d63c224bace0385b97c1a7d0c9b4094ff76f`.

Previously, selecting two games changed their card buttons to “Selected”, but
the comparison destination remained in the header or after the catalogue's
pagination. A reading session in the middle of a long catalogue had no nearby
next action. The only inline comparison link appeared after trying to add a
third game to a full selection.

A single shared tray now appears after the first selection on RU/EN/ES pages:

- It stays at the bottom of the viewport, with the selected names beside the
  comparison action. One game prompts another choice; two games show readiness.
- Each game can be removed, or the whole selection cleared. Names wrap in full,
  so editions such as Olympus 2500 and Super Scatter remain distinguishable.
- The existing two-game limit, storage key and comparison model are retained.
  Selection remains available after filtering, pagination, language changes,
  Back/Forward and normal reloads. Same-origin tabs stay in sync.
- Opening the existing comparison page preserves the pair and hides the tray.
  The mobile menu also hides it while expanded.
- Measured space after the footer prevents permanent overlap with page content.
  The active choice remains visible above the tray. Selection does not steal
  focus; removal/clearing restores a useful keyboard position.

The root server layout passes only the existing comparison games' slugs and
names; the client does not import the game/research database. No catalogue-only
game becomes newly eligible for comparison. No game data, assets, source links,
metadata, sitemap, indexing gates or affiliate behavior are changed. No new
dependencies are required.

The browser regression covers RU/EN/ES at 320, 375, 390, 768, 1024 and 1440px,
actual keyboard/click transitions, footer access, visible focus, deletion,
reload and navigation persistence, two-game limits, cross-tab events, corrupt
or unavailable selection entries, blocked storage and long edition names.
Before/after browser evidence is retained in the task workspace under
`outputs/compare-tray-20261025/`.
