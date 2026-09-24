# Asset origins and credits

## Owner-supplied project imagery

Sage Vista Candidates, Max-Rebate homepage, Discord app output, and the tree photograph used as a very faint material texture were supplied by Freddy. Supplied project images are preserved in public/images; web presentation uses CSS crops and filters. Mochi’s colour references are included in docs/references. The Discord composition contains two apps and three displayed views.

The long Max-Rebate image is an actual English-language browser capture of https://max-rebate.com/ taken on 24 September 2026 at 1440px width. No screenshot contents were generated.

## City reference photography

These images illustrate the cities in the owner-provided route. They are third-party reference photographs, not personal photographs of Freddy. Official Wikimedia 1920px server thumbnails are used. The site crops and displays them in monochrome through CSS.

- **Seattle**: [Seattle Kerry Park Skyline](https://commons.wikimedia.org/wiki/File:Seattle_Kerry_Park_Skyline.jpg) by CommunistSquared. [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). Saved as `public/images/journey/seattle.jpg`.
- **Beijing**: [Beijingskyscraperpic3](https://commons.wikimedia.org/wiki/File:Beijingskyscraperpic3.jpg) by poeloq. [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Saved as `public/images/journey/beijing.jpg`.
- **Shenzhen**: [Shenzhen Skyline from Futian District5](https://commons.wikimedia.org/wiki/File:Shenzhen_Skyline_from_Futian_District5.jpg) by Huangdan2060. [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Saved as `public/images/journey/shenzhen.jpg`.
- **Melbourne**: [Melbourne Skyline at night](https://commons.wikimedia.org/wiki/File:Melbourne_Skyline_at_night.jpg) by Rob Deutscher. [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Saved as `public/images/journey/melbourne.jpg`.

## Mochi character asset

The site now uses `public/images/mochi-colour.webp`, derived from the cutout below by `scripts/recolour-mochi.py`: a tone-to-colour map sampled from `docs/references/mochi-standing.jpg` (dark seal-brown points, cream body) plus blue irises masked at the eye coordinates. Silhouette, fur edges and layer coordinates are unchanged. The monochrome source is kept as the script's input.


Saved as `public/images/mochi-cutout.png`. Generated using the built-in image generation tool, based on the owner’s supplied photos. This is an editorial interpretation of Mochi, not an unaltered photograph. The original generated 1024×1536 RGBA asset is preserved; monochrome treatment and 2.5D layering happen in CSS.

# Mochi cutout

- Final file: `mochi-cutout.png`
- Created with the built-in image generation tool. The generated original was copied byte-for-byte; no image processing was applied.
- Canvas: **1024 × 1536 px**, PNG, **RGBA**
- Alpha: **actual transparency confirmed**. Range 0–254; 632,865 fully transparent pixels (40.24% of canvas); 939,999 partially transparent pixels. The subject interior is predominantly alpha 252–253, visually near-opaque; there are no alpha-255 pixels.
- Visible subject bounding box at alpha > 128: x=38–953, y=34–1498. Both ears, paws and tail are within the frame.
- Low-opacity fur and isolated fringe pixels extend to x=0 and y=1535; avoid assuming alpha>0 is a useful tight crop boundary.
- Appearance: restrained photographic 2.5D cat, charcoal face/ears/legs and pale chest. Tonality is visually near-monochrome but RGB channels retain a slight warm cast. Apply CSS `filter: grayscale(1)` if the website requires mathematically neutral grayscale; preserve the original file.
- Gaze: forward facing, calm alert eyes.

## Approximate positioning for layers

Percentages are relative to the whole source canvas, with x from left and y from top.

- Left visible eye (viewer left): **x 49.5%, y 18.3%** (about 507,281 px)
- Right visible eye (viewer right): **x 64.8%, y 18.5%** (about 664,284 px)
- Eye midpoint: **x 57.2%, y 18.4%**
- Face center: **x 56.8%, y 22.0%** (about 582,338 px)
- Nose: **x 56.8%, y 22.6%** (about 582,347 px)
- Approximate face oval including dark cheeks: **x 39–75%, y 13–30%**
- Approximate head including ears and outer cheek fur: **x 31–85%, y 2–32%**
- Conservative head pivot for subtle parallax: **x 57%, y 29%**
- Cat chest/body center: **x 58%, y 56%**

## Final prompt

Use case: identity-preserve
Asset type: transparent character cutout for a premium editorial portfolio website, suitable for subtle layered head/body parallax.
Input images: Image 1 is Mochi's full standing body and fur pattern reference; Image 2 is Mochi's face and identity reference. Use both to preserve this specific cat's identity.
Primary request: Create ONE full-body, front-facing standing portrait of this exact cat Mochi, with a restrained sculptural photographic 2.5D quality. Keep his recognisable dark mask-like face, tall dark ears, calm forward-looking eyes, very long pale chest ruff, subtly darker back, dark lower legs and paws, and thick natural long-haired tail. Preserve feline proportions and realistic fur, no toy or cartoon stylisation.
Composition/framing: Portrait canvas ideally 1024 x 1536. Cat centered with narrow but sufficient transparent margins, whole body, full ear tips, all paws, full tail safely in frame. Standing naturally with head facing camera, face centered around the upper third, eyes looking naturally forward, tail gently curved along the side so the silhouette is complete. Clear readable head and neck for later parallax animation, body naturally connected.
Scene/backdrop: GENUINELY TRANSPARENT BACKGROUND with actual alpha, no background pixels. Cat only. Remove all original room, table, objects, toys, walls, and background.
Style/medium: Premium monochrome editorial photography with subtle 2.5D sculptural depth from soft studio lighting, extremely natural detailed long fur, realistic eyes and whiskers. Rich charcoal face and legs, pale silver ivory chest, natural neutral grey tonal gradations. Fully grayscale including eyes, while retaining the eye shapes and facial expression from Mochi's photos.
Lighting: broad gentle upper front side light, enough fill to read the dark facial features and both eyes. No rim glow.
Constraints: No props, no platform or pedestal, no floor or backdrop, no shadow rectangle, no checkerboard texture rendered into image, no text, no watermark, no accessories, no human features, no enlarged cartoon eyes. Preserve actual transparent background and fine semi-transparent fur edges. Generate artwork only, never a website mockup.
