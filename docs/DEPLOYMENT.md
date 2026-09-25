# Hosting and freddyliang.com

## Current state (26 September 2026)

**The portfolio is live at https://freddyliang.com and https://www.freddyliang.com**, served by **Cloudflare Pages** (project `freddy-liang-portfolio`, also at https://freddy-liang-portfolio.pages.dev).

- Pages is connected to GitHub `327979420/freddy-liang-portfolio`, production branch `main`. **Every push to `main` builds and deploys automatically.** Pushes to other branches get preview URLs.
- Build settings: framework preset none, build command `npm run build`, output directory `out`, environment variable `NODE_VERSION=22`.
- DNS (Cloudflare zone in the same account): `CNAME @ → freddy-liang-portfolio.pages.dev` and `CNAME www → freddy-liang-portfolio.pages.dev`, both created by Pages. SSL is active for both.
- The older Sites deployment at freddy-liang-sprint-one.rachelzhanzst.chatgpt.site still exists with the earlier version. It is no longer the source of truth; retire it when convenient. The Sites DNS/TXT instructions below are historical and were never applied.

## Historical: connecting the domain to Sites (not used)



In Cloudflare, open **freddyliang.com → DNS → Records** and add these records. Use TTL Auto. Set the two A records to **DNS only** (grey cloud). Preserve any mail and unrelated subdomain records.

| Type | Name | Content |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| TXT | _openai-site-verification | openai-site-verification=flit4rEORK1izYXt_JAfawCJpIHc_1bHhMLIqQqORCY |
| TXT | _cf-custom-hostname | 176f921e-4a00-47f5-9777-b880a05fa1fc |

The TXT values are public domain-verification records, not account credentials. These exact values were returned for this domain by the hosting provider. If the domain registration is recreated later, retrieve fresh values rather than reusing stale ones.

After the records resolve, refresh validation in Sites domain management, or use `sites_refresh_custom_domain_status` with the IDs below. Wait for both the domain and SSL to become active, then verify HTTPS on freddyliang.com. Do not label the domain live while validation is pending. This setup covers the apex domain only; `www` has not been configured.

[Cloudflare's DNS record instructions](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)

## Publish future edits

### When Sites access is available

Use the existing project in `.openai/hosting.json`; do not create a duplicate site. Import/reconcile the approved GitHub changes with the Sites source checkout. Follow the Sites hosting workflow to build, push the matching source, save an archive-backed version and deploy it. Preserve public access. Confirm a successful deployment before claiming the update is live.

The development files themselves need no Sites-specific runtime. Deployment credentials must be obtained through the authenticated hosting integration and must not be committed.

### When working in Claude without Sites access

Clone this repository, edit locally, build and push the reviewed source. GitHub Actions provides a `portfolio-static-site` artifact containing the built `out/` folder contents. The build is portable, but the existing Sites publication still requires its authenticated deployment integration.

If Freddy wants independent deployment directly from GitHub, discuss a separate migration to a host such as Cloudflare Pages. That migration and an automatic deployment connection have **not** been performed. Keep the current public site working until an alternative is verified and the domain can be switched deliberately.

To build the portable output locally:

```sh
npm ci
npm run build
npm run typecheck
```

The output is `out/`. It needs no server-side code, API keys or database. Serve it over HTTP for preview. With the current root-relative asset paths, use a root-domain deployment; a GitHub Pages project subpath would require configuration changes.

## Existing hosting identifiers

- Project: `appgprj_6ab38182de9881919afdb3ebe8f8c940`
- Domain: `appgdom_6ab3da02aec08191aef6b4af569d5cc7`
- Current baseline version: `appgprj_6ab38182de9881919afdb3ebe8f8c940~appgver_d3bd87305cd48191a97fb2143bb1cd9d`
- Baseline deployment: `appgdep_6ab4bc01d8f48191b228653631ec2720`
- Baseline source: `6b8afcc6a0bdd64025ef1c7521ff985e1bedc324`

These identify the existing project; they do not grant access.
