# Freddy Liang — Sprint 1.5 art-direction storyboard

Status: proposed direction, awaiting Freddy's approval. No homepage rewrite or publication made for this plan.

## Review of the current version

Reviewed the source at e661e663f0200bb2fb2012051071709ec531647d and its saved visual captures. The last pass increased scale and spacing, but the experience still repeats a title beside a rectangular image. Mochi remains a photograph, Journey contains only city names and a route, and the three project images toggle closed instead of opening project destinations. The flat background makes the gaps feel unoccupied.

## Creative thesis

A dark exhibition that gradually comes into focus as the visitor moves through it. Freddy and Mochi establish identity; a deliberate threshold introduces an uninterrupted sequence of projects; Journey follows Lab as a personal closing chapter.

Use approximately 94vw on desktop. Charcoal grain, a faint scanned material texture, broad grey illumination, cropped ghost lettering and isolated construction lines create depth. Light follows the current subject. Pale blue may spill around Sage Vista; Max-Rebate keeps its blue concentrated inside the image; the ending loses almost all light.

Four primary mechanics: reactive Mochi, scroll-driven image/mask reveals, a draggable Journey, and a responsive Lab depth stack. These share restrained pointer movement and accessible controls. No scroll lock; only Sage Vista gets a short sticky desktop frame.

## Storyboard

| Scene | Viewport composition and primary visual | Interaction | Transition | Image assets | Current components |
| --- | --- | --- | --- | --- | --- |
| 01 · Opening, 2 seconds | Textured black frame. SYSTEMS dominates upper left; smaller CLARITY and INSIGHT enter off-axis. | Type masks, tracking changes and two structural lines assemble the frame. Skippable immediately. | The same lines become hero framing; light exposes Mochi while FREDDY LIANG resolves. | One restrained material texture; no extra project imagery. | Reuse opening timing, words and skip logic; rebuild choreography. |
| 02 · Freddy + Mochi | Large name lower left; PERSONAL PORTFOLIO / BUSINESS + DATA stays clear. A monochrome Mochi cutout stands off-centre in a broad grey light field. | Separate body/head/eye layers respond subtly to approach. Attention follows navigation; leaving restores the pose. Touch position supplies a bounded reaction. | Mochi recedes behind a horizontal mask as SELECTED WORK grows into frame. | Derive layered artwork from the supplied full-body and portrait photos; preserve recognisable markings. | Reuse name, contacts and pointer foundations; replace rectangular photo expansion. |
| 03 · Selected Work threshold | Oversized SELECTED / WORK occupies most of the screen; 01—04 / SELECTED PROJECTS is the only metadata. A tiny Sage Vista image appears through a slit. | Native scroll separates the lettering and opens the image mask. | The slit becomes the Sage Vista project surface, maintaining continuous visual alignment. | Existing Sage Vista screenshot. | New threshold composition; reuse fonts and work anchor. |
| 04 · Sage Vista | A small image starts near the far right, then becomes a 60–65vw surface crossing a sparse structural line. SAGE VISTA / Quantitative trading research platform and SYSTEMS / INSIGHT remain readable left. | Short sticky frame makes enlargement and sharpening follow scroll; approach adds subtle depth and blue atmosphere. Active image opens the live site in a new tab, labelled VIEW LIVE ↗. | The expanded surface passes upward into the reserved analytics frame, then Max-Rebate. Journey no longer interrupts the project sequence. | Supplied Candidates image; details come from authentic crops. Confirm live URL. | Reuse screenshot and metadata; replace generic Exhibit layout and close-on-click behaviour. |
| 05 · Trading Analytics, deferred | Reserve a large dashboard composition with two or three panel crops extending beyond its frame. Category: Trading analytics dashboard. Keywords: INSIGHT / CLARITY. | When the real asset arrives: subtle layer depth and a full-screen internal dashboard view. Detailed case-study writing waits until the homepage is approved. | Technical panels align into the clean website plane of Max-Rebate. | Power BI screenshot remains pending. No invented chart data or working case-study link. | Retain a clearly labelled reserved state for now; replace the plain placeholder composition later. |
| 06 · Max-Rebate | A tall website surface moves through a wide horizontal aperture. Compact corner labels: MAX-REBATE / Trading rebate website and CLARITY / SYSTEMS. Blue stays concentrated inside the product image. | Scroll pans the genuine website surface; pointer adds a small opposing crop movement. Active image opens the live destination, labelled VISIT SITE ↗. | The surface separates into smaller rectangular crops that introduce Lab. | Existing homepage image supports an initial crop; capture a longer real page once the live URL is confirmed. | Reuse screenshot and project metadata; replace shared Exhibit presentation. |
| 07 · Lab | LAB / Automation tools & Discord apps, with SYSTEMS as its main keyword. Three offset image windows: Reddit ranking, sentiment overview, sentiment detail. These are three views of two apps, labelled accurately. | Pointer or focus brings one window forward while the others recede; idle positions settle into an implied grid. Touch selects, with a visible destination link. Each view opens its relevant verified destination when available. | Windows withdraw to expose the large monochrome Journey photograph. | Use crops of the supplied Discord screenshot. Additional unique apps require their own real images and destinations. | Reuse actual output and Lab labels; replace the single large screenshot and shared Exhibit. |
| 08 · Journey | An edge-to-edge photographic crop sits behind a horizontal route. Only the active city is dominant; neighbours remain partial. | Drag, swipe, city buttons or arrow keys select Seattle, Beijing, Shenzhen and Melbourne. Image crop and route progress change together. Dates and one short line appear only when supplied. | The final Melbourne photograph loses light and reveals Freddy’s name and contact links. | Need 2–4 personal/environmental photos with city mapping. Optional dates, short memories and portrait. Do not assign the cat photos to cities without confirmation. | Reuse city order; replace static city list and diagonal route. |
| 09 · Ending | Large FREDDY LIANG, a small returning Mochi silhouette, and GITHUB / LINKEDIN / EMAIL in near darkness. SYSTEMS / CLARITY / INSIGHT returns beside the name; STILL EXPLORING remains the small closing phrase. | Mochi gently turns attention toward the focused or hovered contact link. | The scene settles; back-to-top returns to the identity without replaying the opening. | Reuse the completed Mochi layers. | Reuse contact destinations; replace generic CONTACT footer composition. |

## Identity, project clarity and memorable keywords

The three constant brand words are SYSTEMS / CLARITY / INSIGHT. Keep this exact wording and order at the opening, alongside Freddy's name, and at the ending. Each project supplies concrete evidence for one or two of the words. Do not repeat all three as an undifferentiated badge on every project.

- SYSTEMS: repeatable processes, connected tools and automation.
- CLARITY: making complex information and user journeys understandable.
- INSIGHT: using data to support informed decisions.

| Project | Always-visible category | Brand keywords |
| --- | --- | --- |
| Sage Vista | Quantitative trading research platform | SYSTEMS / INSIGHT |
| Trading Analytics, deferred | Trading analytics dashboard · Power BI | INSIGHT / CLARITY |
| Max-Rebate | Trading rebate website | CLARITY / SYSTEMS |
| Lab | Automation tools & Discord apps | SYSTEMS |

Display order: project name, plain-language category, then brand keywords. Category labels remain visible before interaction and on mobile. A short description is optional only when it adds information beyond the category; never make visitors hover to learn what a project is.

Use a large, quiet version of the main keyword within each project scene, reinforced by the smaller readable label. The visual evidence gives the word meaning: Sage Vista’s selection framework and ranked data, Max-Rebate’s eligibility/application journey, and Lab’s automated reports. When the BI asset arrives, its dashboard strengthens INSIGHT and CLARITY.

Intended takeaway: Freddy builds systems, makes complexity clearer, and finds useful insight in data. This is the message to reinforce, not a guaranteed memory outcome.

Journey sits after Lab. This keeps the work together and adds a personal chapter before the final repetition of Freddy’s name and the three keywords.

## Mobile and reduced motion

Mobile scenes are recomposed vertically. Sage Vista reveals through ordinary scroll without a sticky hold. Journey has swipe, labelled buttons and keyboard controls. Lab becomes a horizontal, snapping sequence. Active media exposes an obvious link; no destination requires hover. Reduced motion uses settled compositions, still imagery and direct controls. The name and project labels remain readable throughout.

## Reuse and removal

Keep the framework, fonts, supplied assets, verified contact links, project metadata, opening bypass, focus handling and reduced-motion support. Replace the shared Exhibit presentation, rectangular Mochi frame, text-only Journey, generic footer and flat background. Retain a labelled Power BI reservation while its asset is deferred.

During implementation, also correct the Max-Rebate image dimensions: its source is a 2226×1280 JPEG with a .png filename, while its current metadata is incorrect. This is a maintenance fix, not an art-direction choice.

## Needed for the finished experience

- Journey photographs with city mapping; dates and one short line only if wanted.
- Sage Vista and Max-Rebate live URLs; public Lab destinations or relevant repository URLs.
- Power BI image later, as already agreed.

Existing assets are sufficient to begin Mochi artwork, the opening/threshold, Sage Vista, and a three-window Lab after direction approval. Missing Journey imagery and destinations will stay visibly unresolved in review work; they will not be invented.

Reference links supplied in the brief, checked for identity: [Keita Yamada](https://p5aholic.me/), [Amanda Guo](https://byamandaguo.com/), [Jordan Sowers](https://jordansowers.com/), [Gyokuro Studio](https://gyokuro-s.com/). These guide the requested restraint and experimentation; the storyboard is an original proposal.
