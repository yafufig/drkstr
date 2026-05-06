# DRKSTR Mexico Landing

Static SEO site for the DRKSTR Mexico CDMX founding pilot.

Production URL: `https://drkstr.online/`.

## Run Locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Launch Notes

- Hosting: static site from the `main` branch repository root
- Custom domain: `drkstr.online`
- Keep the `CNAME` file in the repository root with `drkstr.online`
- Analytics: GTM snippet only in the site (`GTM-WS3M6PPW`)
- GA4 and Clarity should be configured inside GTM
- WhatsApp and contact email are configured; replace `SOFT_LEAD_FORM_URL` before launch if that action should be visible
- Configure external form success redirects to `https://drkstr.online/thanks-brand.html` and `https://drkstr.online/thanks-node.html` when possible
- Query fallback is also supported: `https://drkstr.online/?submitted=brand` and `https://drkstr.online/?submitted=node`
- Contact email in `privacy.html`: `blackbonik@gmail.com`
- Configure GTM using `ANALYTICS_GTM_SETUP.md`

## Included Files

- `index.html`: Spanish Mexico landing page
- `style.css`: responsive brutalist DRKSTR visual system
- `script.js`: `dataLayer` CTA, CJM view, form-start, form-submit redirect, FAQ, WhatsApp, email, soft-lead, sticky mobile, and privacy events
- `assets/`: logo, favicon, OG image, and hero network diagram
- `marcas/`, `nodos/`, `dark-stores/`, `fulfillment-cdmx/`, `entrega-express-ecommerce/`: Spanish SEO pages
- `en/`, `en/brands/`, `en/nodes/`: optional English SEO layer
- `thanks-brand.html`, `thanks-node.html`: form success pages that fire submit events
- `robots.txt`, `sitemap.xml`, `404.html`, `privacy.html`: crawl and support files
