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

## Suggested implementation order once authorized

1. Confirm the ending and chapter transitions in a concise text plan.
2. Revise Mochi using the existing colour references.
3. Implement the chapter boundaries and compact contact treatment.
4. Check the full sequence on desktop and mobile, including reduced motion and all project/contact links.
5. Build, review and publish through the selected host. Keep Power BI deferred unless its content arrives.
