# Handoff validation

Checked on 24 September 2026.

- A fresh copy installed successfully with `npm ci --no-audit --no-fund`, Node 22.14.0 and npm 10.9.2.
- `npm run build` completed the static export; `npm run typecheck` passed.
- All 17 application and public asset files match the existing published baseline byte for byte. This handoff does not implement the pending visual revisions.
- Local Markdown links resolve. Public-source review found no credentials, environment files, dependency folders or build caches in the handoff file set.
- Existing browser evidence in `review/qa.json` covers seven viewport widths and reports no page errors or horizontal/scene-content overflow. Screenshots were captured and visually inspected during the prior art-direction implementation; they are baseline evidence, not a new browser run for this documentation-only handoff.

The GitHub Actions workflow repeats the clean install, production build and typecheck, then uploads the static output. Its current status is available in the repository's Actions tab.

Workflow structure follows [GitHub's Node.js workflow documentation](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs). DNS setup follows [Cloudflare's DNS record documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), using domain-specific values returned by the existing hosting service.
