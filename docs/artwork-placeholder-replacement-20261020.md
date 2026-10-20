# Retired placeholder artwork and approved game replacements

Reviewed against main `c4f3d5ce4f4a2c78e1e6d397487c11f9c0cca5ba` on 20 October 2026.

The user requested real artwork for all three placeholder-covered games, then explicitly preferred other genuine editions absent from the published catalogue for the two disputed operator names. No claim that the old and new games are identical is made. Gates of Olympus, Gates of Olympus 1000, Gates of Olympus Super Scatter and Sweet Bonanza Super Scatter were already published. Gates of Olympus 2500 and Sweet Bonanza 1000 were not.

## Approved result

| Previous record | Result | Local artwork |
| --- | --- | --- |
| `house-of-sins` | Same game and existing facts, real official promotion | `/images/slots/house-of-sins.webp` |
| `gates-of-1win` | Replaced with `gates-of-olympus-2500`, a separate official edition | `/images/slots/gates-of-olympus-2500.webp` |
| `1win-bonanza` | Replaced with `sweet-bonanza-1000`, a separate official edition | `/images/slots/sweet-bonanza-1000.webp` |

The two retired records and their SVGs are removed rather than relabelled with unrelated artwork. Each new game has its own title, slug, sources, facts, release date, RU copy and complete EN copy. The catalogue remains exactly 1,000 games: 100 dossiers and the same 900 catalogue-only records. Sorted catalogue-only slug fingerprint (SHA-256 of JSON) remains `9ea6a0dee892ac35f380d94919e3d2c633bc5ebb26b4fa370b7ccd2d9ad179d0`.

## Image provenance

### House of Sins

- Official operator source: <https://forum.1win.com/topic/359-%E2%80%8B%F0%9F%96%A4%E2%80%8B-up-to-x10000-in-house-of-sins/>
- Exact source image: <https://web-k8s-forum-prod.s3.eu-central-1.amazonaws.com/uploads/monthly_2025_09/Frame37.png.46d05802f7c6d537f3ea861abe6fd44e.png>
- Visually inspected official promotion: explicit House of Sins title, BGaming attribution and game graphics on the phone. A general forum logo or page preview was not used.
- Source SHA-256: `f9eda01fdacde893d996ce0d88bae9d6a3dae3aa0ee05d4777c06b3d8a929fc3`.
- Local WebP: 960 x 384, 23,580 bytes; SHA-256 `db518968ca5dadfe4a87d25f4595cd9e1b772535d8874d73f9bff6e46d4a12cf`.

### Gates of Olympus 2500

- Official image publication: <https://www.pragmaticplay.com/en/news/pragmatic-play-supercharges-iconic-series-in-gates-of-olympus-2500/>
- Exact source image: <https://www.pragmaticplay.com/wp-content/uploads/2026/09/Gates-of-Olympus-2500_1200x630_EN.jpg>
- Primary rules: <https://www.pragmaticplay.com/en/games/gates-of-olympus-2500/>
- Additional official facts: <https://www.pragmaticplay.com/ru/%D0%BA%D0%B0%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F/gates-of-olympus-2500/>
- Visually inspected artwork has the exact 2500 title. It is not the original, 1000 or Super Scatter edition.
- Source SHA-256: `774a9008498514dd1e01de4e073de77e9ed9bec821f3c61e47210f465b99d113`.
- Local WebP: 960 x 504, 89,880 bytes; SHA-256 `95cb9dde555db4ac98590c24fb6b59ca99a6236d13f9bb1f35f64e9b3ea249c8`.
- No 1win availability record is copied from the retired operator-branded record. Publisher evidence establishes this edition and its rules, not current operator or GEO availability.

### Sweet Bonanza 1000

- Official image publication and release: <https://www.pragmaticplay.com/en/news/pragmatic-play-sweetens-up-candyland-in-sweet-bonanza-1000/>
- Exact source image: <https://www.pragmaticplay.com/wp-content/uploads/2024/06/1200x630_EN.jpg>
- Primary rules: <https://www.pragmaticplay.com/en/games/sweet-bonanza-1000/>
- Visually inspected artwork has the exact Sweet Bonanza 1000 title and game screenshot. The generic file name is pinned only because the exact image is embedded in this game-specific official release.
- Source SHA-256: `d7a7a0bc8c16685a76ea12a16fcf7739aee9e1d73ccd1a0fb76adf3c3e9ff07b`.
- Local WebP: 960 x 504, 67,196 bytes; SHA-256 `d575e940324ca8a393fd6c7f8489c7af176829cfd66c0de2a018dca77bd5ac04`.
- The official game page’s Basic Game Info block explicitly states RTP 96.53%. This provider-hosted page is the verified numerical source. The same page documents win potential of 25,000x; no operator-hosted mirror is needed. The reference RTP does not guarantee the active configuration at every casino. The game/release pages do not state volatility.
- Separate historical operator reference: <https://t.me/s/reg_official_1win/3159>, post dated 27 February 2026, naming Sweet Bonanza 1000. This existing project source channel is not used to infer current availability everywhere.

## Pipeline and regression policy

On 20 October 2026 the user explicitly approved two limited changes to the post-v123 operator-evidence policy: Gates of Olympus 2500 may be published without a 1win availability claim, and Sweet Bonanza 1000 may cite only the exact historical official-channel post `https://t.me/s/reg_official_1win/3159`. The general site regression enforces Gates' exact publisher URL and absent availability, pins Sweet's full post URL/date/game-specific evidence, and retains the existing 1win.com/forum.1win.com requirement for the other 68 post-v123 dossiers. No general Telegram-domain allowance or other exception is introduced. The numerical RTP requirement remains intact and is satisfied using the official Sweet Bonanza 1000 Basic Game Info block above.

All three images use the existing non-cropping WebP profile (maximum 960 x 540, no enlargement, quality 76/72/68, hard limit 220 KiB). All three source entries in `image-sources-v128.json` are explicit `build-time` sources with `requireExplicitImage: true`; placeholder flags are removed.

The asset validator now rejects SVG cover destinations and placeholder status, including attempts to label a WebP as a placeholder. The localizer removes exactly the three retired SVG paths after cache restoration, preventing old cached copies from entering new exports. Dependency, security, download bounds, CI, artwork size and decode checks remain enabled.

Only the two replaced source fingerprints and House of Sins' artwork fingerprint change. The other 97 dossier fingerprints remain unchanged. The historical provenance regression now checks the exact missing-evidence set rather than only its length: the original eleven gaps plus the new 2500 edition. This prevents manufacturing evidence for a new game and detects any newly lost historical reference.

Browser regressions cover RU/EN dossiers at 320/375/390/1440px and list/cover, publisher-row and comparison views at 320/1440px. They verify decoded original WebP assets, file fingerprints, absence of old SVG assets and horizontal overflow, catalogue membership and source-backed unknown characteristics. Existing EN dossier and comparison checks remain active, updated to the explicitly approved replacement identities.

No stylesheet, redirect, dependency, SEO/noindex policy, sitemap implementation or workflow is changed. Wave 88 is not started.
