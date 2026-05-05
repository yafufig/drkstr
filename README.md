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
- Replace `BRAND_FORM_URL`, `NODE_FORM_URL`, `WHATSAPP_URL`, and `CALENDLY_URL` in `index.html` before launch
- Configure external form success redirects to `https://drkstr.online/?submitted=brand` and `https://drkstr.online/?submitted=node` if the form provider supports redirects
- Replace the placeholder legal/contact text in `privacy.html` before paid campaigns

## Included Files

- `index.html`: Spanish Mexico landing page
- `style.css`: responsive brutalist DRKSTR visual system
- `script.js`: `dataLayer` CTA, form-start, form-submit redirect, FAQ, WhatsApp, Calendly, and privacy events
- `assets/`: images, logo, favicon, OG image, and launch reference visuals
- `robots.txt`, `sitemap.xml`, `404.html`, `privacy.html`: GitHub Pages support files
