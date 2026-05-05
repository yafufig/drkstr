# DRKSTR Mexico Landing

Static GitHub Pages landing page for the DRKSTR Mexico CDMX founding pilot.

Production URL: `https://drkstr.online/`.

## Run Locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Launch Notes

- Hosting: GitHub Pages from the `main` branch repository root
- Custom domain: `drkstr.online`
- Keep the `CNAME` file in the repository root with `drkstr.online`
- Analytics: GTM snippet only in the site (`GTM-WS3M6PPW`)
- GA4 and Clarity should be configured inside GTM
- Replace `WHATSAPP_URL`, `CALENDLY_URL`, and `SOFT_LEAD_FORM_URL` in `index.html` before launch if those actions should be visible
- Configure external form success redirects to `https://drkstr.online/thanks-brand.html` and `https://drkstr.online/thanks-node.html` when possible
- Query fallback is also supported: `https://drkstr.online/?submitted=brand` and `https://drkstr.online/?submitted=node`
- Replace the placeholder legal/contact text in `privacy.html` before paid campaigns
- Configure GTM using `ANALYTICS_GTM_SETUP.md`

## Included Files

- `index.html`: Spanish Mexico landing page
- `style.css`: responsive brutalist DRKSTR visual system
- `script.js`: `dataLayer` CTA, CJM view, form-start, form-submit redirect, FAQ, WhatsApp, Calendly, soft-lead, sticky mobile, and privacy events
- `assets/`: images, logo, favicon, OG image, and launch reference visuals
- `thanks-brand.html`, `thanks-node.html`: form success pages that fire submit events
- `robots.txt`, `sitemap.xml`, `404.html`, `privacy.html`: GitHub Pages support files
