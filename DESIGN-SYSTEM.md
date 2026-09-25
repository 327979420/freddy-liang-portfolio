# Freddy Liang — Sprint 1.5 / Art direction

A personal portfolio for business and data analysis applications. SYSTEMS / CLARITY / INSIGHT appear in the opening, identity, relevant projects, and closing name. Each project has a permanently visible plain-language category.

## Sequence and pacing

Four chapters, named in a fixed header indicator (I Profile · II Work · III Journey · IV Contact) that tracks the current chapter:

Opening → **I Profile** (Freddy + Mochi) → **II Selected Work** (threshold, Sage Vista, Trading Analytics / Power BI, Lab) → **III Journey** → **IV Contact**.

Chapter entrances differ in weight: Selected Work keeps the oversized threshold; Journey opens after a long fall into darkness with a condensed chapter title; Contact is a compact near-black close. Display titles use Archivo Variable at a condensed width; Inter Tight and IBM Plex Mono carry everything else.

Journey follows Lab, as approved. Power BI stays explicitly deferred; no charts or results are invented, and no case-study destination is offered without content.

The desktop composition uses about 94vw. Dark charcoal, an extremely faint texture from the owner's tree photograph, soft grey illumination, structural marks and cropped ghost words establish a material background. Sage Vista adds restrained cool light; Journey introduces large monochrome city photography. The ending returns toward black.

## Four primary interactions

1. **Mochi:** the generated cutout, recoloured to Mochi's natural seal-point colouring (cream body, dark brown points, blue eyes) by `scripts/recolour-mochi.py`, layered into body, head, ear and eye regions. At rest he is slightly receded and desaturated; as the pointer approaches he grows, warms and sharpens. Head and eyes follow the pointer, or glance at a hovered link. Ears flick rarely. Touch toggles an attentive pose. Mochi appears only in the hero.
2. **Scroll reveals:** the two-second opening assembles the hero framing. Selected Work separates to expose the work. Sage Vista grows through a short sticky desktop frame. Scrolling stays native.
3. **Journey:** drag, touch controls, city buttons or arrow keys move through Seattle, Beijing, Shenzhen and Melbourne. Photographs, city names and the route position change together. No dates or personal anecdotes are fabricated.
4. **Lab:** three offset windows show Reddit Stock Radar, Fear & Greed Tracker, and a detail from the same tracker. Hover/focus brings the relevant window forward. These are two apps and three views, not three separate projects. Mobile uses a horizontal snapping strip.

## Project identity and destinations

- Sage Vista — Quantitative trading research platform — SYSTEMS / INSIGHT. Image opens the live research application.
- Trading Analytics — Trading analytics dashboard · Power BI — INSIGHT / CLARITY. Three real pages fan out with scroll; the selected page opens a full-screen viewer.
- Lab — Automation tools & Discord apps — SYSTEMS. Images open the relevant public GitHub repositories.

Live URLs were taken from the owner's public project READMEs. Lab repository identities were checked through the owner's public GitHub account. The portfolio makes no claim of investment performance or automated trade execution.

## Access and mobile

Main labels remain readable before interaction. All project gateways are real links with descriptive names; external destinations open in a new tab. Keyboard users can skip directly to work and operate Journey without dragging. Touch never depends on hover. Reduced motion removes animation, parallax, panning and the opening; Sage Vista uses a settled non-sticky frame.

Mobile gets separate positions and shorter gestures. Mochi and the name remain distinct, project categories stay above their images, and Journey has both swipe/drag and explicit buttons. Intro skipping works through keyboard, touch, pointer or scrolling. `?intro=off` and fragment links bypass it before paint.

## Content and files

Contact and project destinations: `app/content.ts`. Scene layout: `app/page.tsx`. Mochi: `app/components/Mochi.tsx`. Styling and motion: `app/globals.css`.

See ASSET-CREDITS.md for origins, licenses and the generated Mochi prompt. The page labels Journey photos as city reference photography and provides source and license links. They are not presented as the owner's personal photographs.

Run `npm ci`, then `npm run dev -- --port 3000`. `npm run typecheck` checks types; `npm run build` exports `out/`. Existing public Sites hosting is retained. freddyliang.com remains subject to DNS verification.
