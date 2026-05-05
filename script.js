window.dataLayer = window.dataLayer || [];

const placeholderUrls = new Set([
  'SOFT_LEAD_FORM_URL'
]);

const allowedParamKeys = [
  'audience',
  'category',
  'city',
  'cta_text',
  'destination',
  'form_type',
  'menu_target',
  'monthly_orders_range',
  'page_path',
  'question',
  'section',
  'sku_count_range',
  'source',
  'space_type'
];

function compactParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter((entry) => entry[1] !== undefined && entry[1] !== '')
  );
}

function trackEvent(eventName, params = {}) {
  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => allowedParamKeys.includes(key))
  );
  const payload = compactParams({
    event: eventName,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...safeParams
  });

  window.dataLayer.push(payload);
}

function getTrackingParams(el) {
  const params = {
    cta_text: el.dataset.ctaText || (el.dataset.viewEvent ? undefined : el.textContent.trim()),
    section: el.dataset.section,
    audience: el.dataset.audience,
    form_type: el.dataset.formType,
    destination: el.dataset.destination,
    menu_target: el.dataset.menuTarget
  };

  return Object.fromEntries(
    Object.entries(params).filter(([key, value]) => allowedParamKeys.includes(key) && value)
  );
}

function hidePlaceholderLinks() {
  document.querySelectorAll('a[href]').forEach((el) => {
    const href = el.getAttribute('href') || '';

    if (placeholderUrls.has(href)) {
      el.hidden = true;
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('tabindex', '-1');
    }
  });

  document.querySelectorAll('.mobile-sticky').forEach((bar) => {
    const visibleLinks = Array.from(bar.querySelectorAll('a')).filter((link) => !link.hidden);
    if (visibleLinks.length) {
      bar.style.gridTemplateColumns = `repeat(${visibleLinks.length}, minmax(0, 1fr))`;
    }
  });
}

function trackRedirectConversions() {
  if (document.body.dataset.submitEvent) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const submitted = params.get('submitted');
  const conversionMap = {
    brand: {
      event: 'form_brand_submit',
      params: { form_type: 'brand', audience: 'brand', source: 'external_form_redirect' }
    },
    node: {
      event: 'form_node_submit',
      params: { form_type: 'node', audience: 'node', source: 'external_form_redirect' }
    }
  };

  if (conversionMap[submitted]) {
    trackEvent(conversionMap[submitted].event, conversionMap[submitted].params);
  }
}

function trackThankYouPage() {
  const { submitEvent, formType, audience } = document.body.dataset;

  if (!submitEvent) {
    return;
  }

  trackEvent(submitEvent, {
    form_type: formType,
    audience,
    source: 'thank_you_page'
  });
}

trackRedirectConversions();
trackThankYouPage();
hidePlaceholderLinks();

document.querySelectorAll('[data-event]').forEach((el) => {
  el.addEventListener('click', (event) => {
    const href = el.getAttribute('href') || '';
    const trackingParams = getTrackingParams(el);

    trackEvent(el.dataset.event, trackingParams);

    if (el.dataset.alsoEvent) {
      el.dataset.alsoEvent.split(',').forEach((eventName) => {
        const trimmedEventName = eventName.trim();
        if (trimmedEventName) {
          trackEvent(trimmedEventName, trackingParams);
        }
      });
    }

    if (el.dataset.formStart) {
      trackEvent(el.dataset.formStart, {
        form_type: el.dataset.formType,
        audience: el.dataset.audience,
        section: el.dataset.section
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
      trackEvent('faq_open', {
        question: summary ? summary.textContent.trim() : '',
        section: 'faq'
      });
    }
  });
});

function trackViewSections() {
  const sections = document.querySelectorAll('[data-view-event]');

  if (!sections.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => {
      trackEvent(section.dataset.viewEvent, getTrackingParams(section));
    });
    return;
  }

  const seen = new WeakSet();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || seen.has(entry.target)) {
        return;
      }

      seen.add(entry.target);
      trackEvent(entry.target.dataset.viewEvent, getTrackingParams(entry.target));
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  sections.forEach((section) => observer.observe(section));
}

trackViewSections();

// Replace placeholders before launch:
// SOFT_LEAD_FORM_URL.
// External forms can redirect to /thanks-brand.html, /thanks-node.html,
// or use /?submitted=brand and /?submitted=node.
