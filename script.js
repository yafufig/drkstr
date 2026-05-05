window.dataLayer = window.dataLayer || [];

const placeholderUrls = new Set([
  'BRAND_FORM_URL',
  'NODE_FORM_URL',
  'WHATSAPP_URL',
  'CALENDLY_URL'
]);

function pushEvent(name, params = {}) {
  window.dataLayer.push({ event: name, page_location: window.location.href, ...params });
}

function trackRedirectConversions() {
  const params = new URLSearchParams(window.location.search);
  const submitted = params.get('submitted');
  const conversionMap = {
    brand: 'form_brand_submit',
    node: 'form_node_submit'
  };

  if (conversionMap[submitted]) {
    pushEvent(conversionMap[submitted], { source: 'external_form_redirect' });
  }
}

trackRedirectConversions();

document.querySelectorAll('[data-event]').forEach((el) => {
  el.addEventListener('click', (event) => {
    const href = el.getAttribute('href') || '';

    pushEvent(el.dataset.event, {
      cta_text: el.textContent.trim(),
      cta_href: href
    });

    if (el.dataset.formStart) {
      pushEvent(el.dataset.formStart, {
        cta_text: el.textContent.trim(),
        cta_href: href
      });
    }

    if (placeholderUrls.has(href)) {
      event.preventDefault();
      console.warn(`Replace ${href} before launch.`);
    }
  });
});

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      const summary = detail.querySelector('summary');
      pushEvent('faq_open', { faq_question: summary ? summary.textContent.trim() : '' });
    }
  });
});

// Replace placeholders before launch:
// BRAND_FORM_URL, NODE_FORM_URL, WHATSAPP_URL, CALENDLY_URL.
// External form success redirects can use ?submitted=brand or ?submitted=node.
