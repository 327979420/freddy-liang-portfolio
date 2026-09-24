# Continue Freddy's portfolio

This repository is the portable editing handoff for Freddy Liang's personal portfolio. It includes all runtime assets, source, package lock, colour references for Mochi and design context. It can be edited and built without Codex or the Sites plugin.

## Start here

1. Read this file, DESIGN-SYSTEM.md and docs/NEXT-CHANGES.md.
2. Run `npm ci` with Node.js 22, then `npm run dev`.
3. Review the homepage on desktop and phone before changing it. Use `?intro=off` for normal layout review and remove it to check the two-second opening.
4. Follow the user's current instruction about whether to plan or implement. At handoff, the visual changes below are discussion requirements only. The latest authorization was to create this repository and document the plan, not to execute those visual changes.

## Current approved baseline

Sprint 1.5 is a dark, cinematic, image-led homepage supporting Business Analyst / Data Analyst applications. Keep the restrained material background, large editorial typography, real project images, usable links and a few purposeful interactions. Avoid a generic grid, SaaS cards, long copy, neon or AI as the headline theme.

Sequence: opening → I Profile (Freddy and Mochi) → II Selected Work (threshold → Sage Vista → reserved Trading Analytics → Max-Rebate → Lab) → III Journey → IV Contact. The repeated name/Mochi ending was removed in Sprint 1.6.

Journey belongs **after Lab**. SYSTEMS / CLARITY / INSIGHT must remain memorable and recur meaningfully. Always identify what a project actually is:

| Project | Plain-language category | Keywords |
| --- | --- | --- |
| Sage Vista | Quantitative trading research platform | SYSTEMS / INSIGHT |
| Trading Analytics | Trading analytics dashboard · Power BI | INSIGHT / CLARITY |
| Max-Rebate | Trading rebate website | CLARITY / SYSTEMS |
| Lab | Automation tools & Discord apps | SYSTEMS |

The current image treatment and motion were approved as a substantial improvement. The user then requested three refinements; see docs/NEXT-CHANGES.md for the precise boundary between requests and proposals.

## Code map

| File | Purpose |
| --- | --- |
| app/page.tsx | Scene order, scroll motion, project links, Lab interaction and Journey controls |
| app/components/Mochi.tsx | Layered colour cat artwork, approach/look response, link glances and touch toggle |
| scripts/recolour-mochi.py | Regenerates the colour Mochi from `mochi-cutout.png` (needs Pillow + NumPy) |
| app/globals.css | Material background, scene compositions, responsive and reduced-motion behavior |
| app/content.ts | Contacts, project destinations, city photos and credits |
| app/layout.tsx | Fonts, page metadata, pre-paint intro bypass |
| public/images/ | All images needed by the website |
| docs/references/ | Original-colour Mochi photographs used to match the recolour |
| docs/review/ | Existing desktop/mobile screenshots and browser results |
| .openai/hosting.json | Existing Sites project identity; not a GitHub deployment integration |

## Behavior to preserve

- The opening lasts two seconds and can be skipped with input. Reduced motion bypasses it.
- Mochi responds to pointer approach, looks toward hovered links, reacts to touch, and resets when the pointer leaves the page.
- The header chapter indicator must stay in sync with the four `data-chapter` sections.
- Sage Vista starts small and monochrome and grows with its pinned scroll (and hover); Max-Rebate opens from a letterbox. On fine pointers a cursor label replaces the static gateway label; touch keeps the static label.
- Lenis smooth scrolling is disabled for reduced motion; titles and images reveal once on entry, and are simply present without motion.
- Sage Vista grows with scroll/hover; its image opens the real live project in a new tab.
- Max-Rebate pans through a genuine English capture; its image opens the live website.
- Lab has two apps shown in three views. Each view opens the relevant public repository; do not invent a third app.
- Journey works through horizontal dragging, previous/next buttons, city buttons and keyboard controls.
- Journey photography is credited city reference imagery, not the owner's personal photos. Do not invent dates, education, employment or anecdotes.
- Power BI is deferred. Do not fabricate dashboards or build detailed case-study pages in this sprint.
- Keep contact destinations in app/content.ts. Do not invent project performance claims.

## Validation

Run `npm run build`, `npm run typecheck` and `git diff --check`. Build before the standalone typecheck in a fresh checkout because Next generates route declaration files.

For visible changes, check at least 390px mobile and 1440px desktop, inspect actual screenshots, and test touch/keyboard/reduced motion. The baseline passed browser checks at widths 320, 390, 600, 768, 1024, 1440 and 1920 pixels. Those historical results are in docs/review/qa.json; they do not certify future edits.

GitHub Actions runs installation, production build and typecheck on pushes and pull requests, and uploads the static export as an artifact. It does not publish to the live site.

## Hosting and ownership

The existing site is public and remains hosted on Sites. Domain freddyliang.com is registered with that host but was still pending DNS/SSL validation on 24 September 2026. Exact records and continuation options are in docs/DEPLOYMENT.md.

Baseline source came from Sites commit `6b8afcc6a0bdd64025ef1c7521ff985e1bedc324`, published as version 4 on 24 September 2026. The GitHub repository starts with a clean source snapshot. Existing application and public asset files were copied unchanged; handoff documents and CI were added. Do not assume GitHub and the Sites source repository synchronize automatically.

If deployment access is unavailable, finish the code and provide a built `out/` artifact. Do not claim the live site changed until a deployment succeeds. A hosting migration requires the owner's direction; it is not part of the current handoff.
