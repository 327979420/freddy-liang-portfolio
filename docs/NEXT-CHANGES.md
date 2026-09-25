# Pending design changes

Status: **implemented in source on 24 September 2026 (Sprint 1.6)** after Freddy approved the storyboard. Not yet deployed. The original requests are kept below for context.

## 1. Restore Mochi's natural colour

User request: the black-and-white Mochi feels too sombre. Bring back the natural appearance and warmth while retaining the successful cutout and interaction.

Reference files: `docs/references/mochi-standing.jpg` and `docs/references/mochi-portrait.jpg`. Preserve the actual cat's cream/brown fur, darker face and paws, and blue eyes.

Implementation note for later: `public/images/mochi-cutout.png` was generated with a near-monochrome treatment. Removing CSS grayscale alone will not fully recover the original colours. Use the supplied colour photographs to revise the existing character asset, then update the CSS filters across body, head and eye layers. Keep identity, realistic proportions, transparent fur edges and a calm editorial treatment. Do not substitute a random cat.

## 2. Define the main sections more clearly

User request: visitors should recognize transitions from Freddy's profile to projects, then Journey, then contact/ending.

Proposed direction, still open to discussion: Profile → Selected Work → Journey → Contact. Distinguish the main chapters through prominent labels, breathing room and controlled changes in atmosphere. Keep project categories visible and the individual projects within Selected Work. Avoid turning the page into boxed cards or adding a divider to every element.

## 3. Reconsider the ending

User request: the ending repeats the hero and feels boring. Discuss revising it or removing the ending entirely while retaining contact at the bottom. This is a major priority of this sprint.

Assistant proposal, **not a confirmed decision**: remove the repeated oversized name and returning Mochi; allow Journey to be the final personal moment; follow it with a compact Email / LinkedIn / GitHub area. Optionally repeat SYSTEMS / CLARITY / INSIGHT in small type to reinforce recall without reproducing the hero.

Before implementation, agree the final ending treatment with Freddy. Do not silently treat the assistant's recommendation as user approval.

## Decisions from Freddy, 24 September 2026 (Claude session)

- **Ending → icon contact.** Journey is the last personal moment, followed by a compact contact area of Email / LinkedIn / GitHub line icons with text labels, a tiny SYSTEMS / CLARITY / INSIGHT line and back-to-top. Email: liangfreddy164@gmail.com.
- **Journey position:** kept after Lab (the pasted master brief's rhythm placed it after Sage Vista; Freddy's later instruction wins).
- **Mochi colour → recolour the existing cutout.** Approved and integrated: seal-point colouring with blue irises and dark pupils, same silhouette and layer coordinates.
- **Chapters → header chapter indicator (option c)**, plus prominent chapter titles, spacing and atmosphere shifts per Freddy's brief.
- **No CV link.** Not needed on the site.
- **Sage Vista link → https://sage.freddyliang.com** (English by default), replacing the `/zh/…` workers.dev URL in `app/content.ts`.

## Sprint 1.6 storyboard pass (approved and implemented)

- Sage Vista: small monochrome image at rest → grows to ~62vw with colour and cool light through its pinned scroll, or on hover.
- Trading Analytics: reduced to a short "case in preparation" beat on a structural grid until Power BI material arrives.
- Max-Rebate: closed letterbox that opens and gains colour with scroll/hover; the real capture pans through it.
- Lab: hovered window comes forward in colour; fast pointer movement leaves short-lived fragments of the real Discord output.
- Journey: condensed chapter title, softened photo edges, route previews on hover/focus.
- Global: cursor label (VIEW LIVE ↗ / VISIT SITE ↗ / VIEW PROJECT ↗), faint cursor light, one-time title/image reveals, Lenis smooth scrolling (off for reduced motion).
- Still needed: Power BI screenshots (and optional case outline); personal Journey photos would strengthen that chapter.

## Sprint 1.7 (25 September 2026)

- Sage Vista tour uses four real screens (Opportunities, Decision logic detail, Daily patterns, Sectors); image growth takes the first ~20% of the pin, then frames step with a caption, counter and progress ticks. Phones get a swipe strip.
- Shared screenshot grade (`--grade`, `--grade-tint`) keeps white product UI below the page's own paper tone.
- Max-Rebate removed; projects renumbered 01—03.
- Power BI: three real pages, depth stack + full-screen viewer. "What separates client outcomes?" is only 648px wide; a larger export would read better in the viewer.
- Journey: two photos per city (credited skyline + Freddy's own photo).
- Profile panel from the hero name / ABOUT FREDDY, with a pointer-following portrait on hover.
- Footer: SYSTEMS / CLARITY / INSIGHT · AI-EMPOWERED.

## Sprint 1.8 (25 September 2026): keep the coolness, add comprehension

- Sage Vista rebuilt: no pinned scroll. A numbered index of four screens sits under the title; hovering/tapping swaps the stage instantly with a one-to-two-line caption. The stage scales in with scroll using transforms only (no layout transitions, which caused the lag). Clicking the stage opens a shared focus viewer with the caption and VIEW LIVE.
- Power BI uses the same focus viewer; hovering a page shows its caption under the title.
- Captions are drafted from what each screenshot shows. **Freddy to review the wording** in `app/content.ts`.
- Opening names the site ("FREDDY LIANG / PERSONAL PORTFOLIO") from the first frame. A new Profile introduction scene (`#about`) sits between the hero and Selected Work: one editorial sentence, three facts, and a portrait that grows on hover and opens the full Profile panel.

## Sprint 1.9 (26 September 2026)

- New professional headshot for the Profile introduction and panel; the Melbourne Journey photo stays the graduation photo.
- Profile copy leads with experience; "Looking for" is Business Analyst roles. An Experience list is ready in `app/content.ts` (`profile.experience`) and stays hidden until real entries are added.
- Lab: one-line description inside each window; layout regrouped as two apps / three views (no tilts).
- Journey: only the small photo toggles the personal picture; arrows keep a normal cursor.
- Removed the pointer-following portrait on the hero name (it drifted during scroll).
- Performance: no mix-blend layers, Sage colour switches once on entry (data-lit) instead of per-frame filters, the scroll loop only restyles near-screen sections when values change, async image decoding. Measured full-page wheel scroll: no frames over 20 ms.

## Sprint 2.0 (26 September 2026)

- Hero: "MY CAT, MOCHI" label points to Mochi from the left.
- Profile portrait keeps soft natural colour (no black-and-white rest state).
- Project order: 01 Trading Analytics (Power BI), 02 Sage Vista, 03 Lab. The Selected Work threshold previews the Power BI overview.
- Sage Vista: four visible thumbnails under the stage plus large arrows; auto-advances every 6 s while in view (progress bar on the active thumbnail), pauses while the screens are hovered or a viewer is open, and stops for good once the visitor chooses a screen. Reduced motion: no auto-advance.
- Journey: a 360svh track with a sticky frame; scrolling moves city by city and fills the route line. Arrows, city buttons, drag and keys scroll to the matching city (via Lenis when active).

- Profile introduction: statement shortened to "I turn messy problems and raw data into clearer requirements, better processes and useful insight"; facts enlarged; Experience adds Software.

## Suggested implementation order once authorized

1. Confirm the ending and chapter transitions in a concise text plan.
2. Revise Mochi using the existing colour references.
3. Implement the chapter boundaries and compact contact treatment.
4. Check the full sequence on desktop and mobile, including reduced motion and all project/contact links.
5. Build, review and publish through the selected host. Keep Power BI deferred unless its content arrives.
