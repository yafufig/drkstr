# DRKSTR Analytics Setup

Use Google Tag Manager as the only analytics loader in site code.

## IDs

- Domain: `https://drkstr.online`
- GTM Container ID: `GTM-WS3M6PPW`
- GA4 Measurement ID: `G-6FJ1WHDM0V`
- Microsoft Clarity Project ID: `wmioon3fb2`

## Site Code Rules

- Keep the GTM snippet in every HTML page head.
- Keep the GTM noscript iframe immediately after every opening body tag.
- Do not add direct GA4 `gtag.js` scripts to HTML.
- Do not add direct Microsoft Clarity scripts to HTML.
- Do not send PII in `dataLayer` events.

## GTM Tags

Create and publish these tags in GTM.

1. `GA4 - Google tag - Base`
   - Tag type: `Google tag`
   - Tag ID: `G-6FJ1WHDM0V`
   - Trigger: `Initialization - All Pages` or `All Pages`

2. `Clarity - Base`
   - Tag type: `Custom HTML`
   - Trigger: `All Pages`
   - HTML:

```html
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "wmioon3fb2");
</script>
```

3. GA4 event tags
   - Tag type: `Google Analytics: GA4 Event`
   - Configuration tag / Google tag: `G-6FJ1WHDM0V`
   - Trigger: `Custom Event`
   - Event name: same as the `dataLayer` event name.

## Required Custom Events

Create Custom Event triggers and GA4 Event tags for:

```text
hero_cta_brand_click
hero_cta_node_click
brand_section_cta_click
node_section_cta_click
pilot_apply_click
whatsapp_click
calendly_click
form_brand_start
form_node_start
form_brand_submit
form_node_submit
faq_open
privacy_click
menu_click
home_return_click
```

## Event Parameters

The site sends only non-PII parameters:

```text
page_location
page_path
cta_text
section
audience
form_type
destination
menu_target
question
source
```

Do not add email, phone, name, WhatsApp number, exact address, or free-form user comments to GTM/GA4 events.

## Form Submit Tracking

Preferred external form success redirects:

```text
https://drkstr.online/thanks-brand.html
https://drkstr.online/thanks-node.html
```

Fallback redirects also supported:

```text
https://drkstr.online/?submitted=brand
https://drkstr.online/?submitted=node
```

## GA4 Key Events

Mark these as key events / conversions after events appear in GA4:

```text
form_brand_submit
form_node_submit
whatsapp_click
calendly_click
```

## QA

Use GTM Preview on `https://drkstr.online/` and verify:

- GTM container `GTM-WS3M6PPW` connects.
- `GA4 - Google tag - Base` fires on all pages.
- `Clarity - Base` fires on all pages.
- CTA clicks push custom events.
- FAQ opens push `faq_open`.
- Thank-you pages push `form_brand_submit` or `form_node_submit`.
- GA4 DebugView receives page and custom events.
- No direct `gtag.js` or direct Clarity loader appears in page source.
