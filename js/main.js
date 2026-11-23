(function (global) {
  'use strict';

  var data = global.AGIAD_DATA;
  var langApi = global.AGIAD_LANG;

  if (!data || !langApi) return;

  var state = {
    page: getPageFromHash(),
    lang: langApi.getCurrent(),
    mobileMenuOpen: false,
    fleetCategory: 'all',
    fleetSearch: '',
    logoFailed: false
  };

  var appRoot = document.getElementById('app');

  function getBasePath() {
    var raw = document.documentElement.getAttribute('data-base-path') || '.';
    return raw.replace(/\/+$/, '');
  }

  function resolveAsset(relativePath) {
    var base = getBasePath();
    var clean = String(relativePath || '').replace(/^\/+/, '');
    return base + '/' + clean;
  }

  function getPageFromHash() {
    var hash = (global.location.hash || '').replace(/^#/, '').toLowerCase();
    if (hash === 'services' || hash === 'fleet' || hash === 'home') {
      return hash;
    }
    return 'home';
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function iconHtml(name, className) {
    var raw = data.icons[name] || '';
    if (!raw || !className) return raw;
    return raw.replace('<svg ', '<svg class="' + escapeHtml(className) + '" ');
  }

  function buildWhatsappUrl(phone, message) {
    var cleanPhone = String(phone || data.primaryWhatsapp).replace(/\D/g, '');
    return 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent(message || '');
  }

  function vehicleWhatsappMessage(vehicle, lang) {
    if (lang === 'ar') {
      return 'مرحباً أجياد، أود الاستفسار عن حجز ' + vehicle.name.ar;
    }
    return 'Hello AGIAD, I would like to inquire about booking the ' + vehicle.name.en + '.';
  }

  function serviceWhatsappMessage(service, lang) {
    if (lang === 'ar') {
      return 'مرحباً أجياد، أود الاستفسار عن خدمة ' + service.title.ar;
    }
    return 'Hello AGIAD, I would like to inquire about ' + service.title.en + '.';
  }

  function updateDocumentMeta() {
    var t = data.translations;
    var titleMap = t.titles[state.page] || t.titles.home;
    document.title = titleMap[state.lang];
  }

  function renderHeader() {
    var lang = state.lang;
    var t = data.translations;
    var navItems = [
      { id: 'home', label: t.nav.home[lang] },
      { id: 'services', label: t.nav.services[lang] },
      { id: 'fleet', label: t.nav.fleet[lang] }
    ];
    var waUrl = buildWhatsappUrl(data.primaryWhatsapp, t.whatsappMessages.general[lang]);

    var logoImg = state.logoFailed
      ? ''
      : '<img src="' +
        escapeHtml(resolveAsset(data.logoPath)) +
        '" alt="' +
        escapeHtml(t.brandName[lang]) +
        '" class="brand-logo" data-brand-logo="true" />';

    var desktopLinks = navItems
      .map(function (item) {
        var active = state.page === item.id;
        return (
          '<button type="button" class="nav-link' +
          (active ? ' is-active' : '') +
          '" data-nav="' +
          item.id +
          '"' +
          (active ? ' aria-current="page"' : '') +
          '>' +
          escapeHtml(item.label) +
          '</button>'
        );
      })
      .join('');

    var mobileLinks = navItems
      .map(function (item) {
        var active = state.page === item.id;
        return (
          '<button type="button" class="mobile-drawer-link' +
          (active ? ' is-active' : '') +
          '" data-nav="' +
          item.id +
          '">' +
          escapeHtml(item.label) +
          '</button>'
        );
      })
      .join('');

    var mobileDesks = data.contactDesks
      .map(function (desk) {
        return (
          '<div class="mobile-phone-card">' +
          '<div class="mobile-phone-meta">' +
          '<span class="mobile-phone-label">' +
          escapeHtml(desk.label[lang]) +
          '</span>' +
          '<span class="mobile-phone-number tabular-nums" dir="ltr">' +
          escapeHtml(desk.display) +
          '</span>' +
          '</div>' +
          '<a href="tel:+' +
          escapeHtml(desk.raw) +
          '" class="mobile-call-btn" aria-label="Call ' +
          escapeHtml(desk.display) +
          '">' +
          iconHtml('phone', 'icon-md') +
          '</a>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<header class="site-header pt-safe">' +
      '<div class="header-inner">' +
      '<button type="button" class="brand-btn" data-nav="home">' +
      logoImg +
      '<span class="brand-name">' +
      escapeHtml(t.brandName[lang]) +
      '</span>' +
      '</button>' +
      '<nav class="desktop-nav" aria-label="' +
      escapeHtml(t.aria.primaryNav[lang]) +
      '">' +
      desktopLinks +
      '</nav>' +
      '<div class="header-actions">' +
      '<div class="lang-switcher" role="group" aria-label="' +
      escapeHtml(t.aria.langSelector[lang]) +
      '">' +
      '<button type="button" class="lang-btn' +
      (lang === 'en' ? ' is-active' : '') +
      '" data-lang="en">EN</button>' +
      '<button type="button" class="lang-btn' +
      (lang === 'ar' ? ' is-active' : '') +
      '" data-lang="ar">AR</button>' +
      '</div>' +
      '<a href="' +
      escapeHtml(waUrl) +
      '" target="_blank" rel="noopener noreferrer" class="btn-header-whatsapp">' +
      iconHtml('message-circle', 'icon-md') +
      '<span>' +
      escapeHtml(t.home.bookWhatsapp[lang]) +
      '</span>' +
      '</a>' +
      '<button type="button" class="mobile-menu-btn" data-toggle-menu="true" aria-expanded="' +
      (state.mobileMenuOpen ? 'true' : 'false') +
      '" aria-label="' +
      escapeHtml(t.aria.toggleMenu[lang]) +
      '">' +
      iconHtml(state.mobileMenuOpen ? 'x' : 'menu', 'icon-xl') +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="mobile-drawer"' +
      (state.mobileMenuOpen ? '' : ' hidden') +
      '>' +
      '<div class="mobile-drawer-links">' +
      mobileLinks +
      '</div>' +
      '<div class="mobile-contact-block">' +
      '<div class="mobile-contact-heading">' +
      iconHtml('globe', 'icon-md') +
      '<span>' +
      escapeHtml(t.footer.contactTitle[lang]) +
      '</span>' +
      '</div>' +
      '<div class="mobile-contact-list">' +
      '<a href="' +
      escapeHtml(waUrl) +
      '" target="_blank" rel="noopener noreferrer" class="mobile-whatsapp-btn">' +
      iconHtml('message-circle', 'icon-md') +
      '<span>' +
      escapeHtml(t.home.bookWhatsapp[lang]) +
      '</span>' +
      '<span dir="ltr" class="tabular-nums">(' +
      escapeHtml(data.primaryDisplay) +
      ')</span>' +
      '</a>' +
      mobileDesks +
      '</div>' +
      '</div>' +
      '</div>' +
      '</header>'
    );
  }

  function renderHome() {
    var lang = state.lang;
    var t = data.translations;
    var isAr = lang === 'ar';
    var dirArrow = isAr ? 'arrow-left' : 'arrow-right';
    var ctaUrl = buildWhatsappUrl(data.primaryWhatsapp, t.whatsappMessages.homeCta[lang]);

    var featuredCards = data.vehicles
      .filter(function (v) {
        return v.featured;
      })
      .map(function (v) {
        var specIcon =
          v.id === 'mercedes-v-class'
            ? 'users'
            : v.id === 'range-rover-sport'
            ? 'gauge'
            : 'shield-check';
        return (
          '<article class="vehicle-card-light">' +
          '<div class="vehicle-media">' +
          '<img src="' +
          escapeHtml(resolveAsset(v.image)) +
          '" alt="' +
          escapeHtml(v.name[lang]) +
          '" class="vehicle-img" loading="lazy" data-fallback-label="' +
          escapeHtml(v.name[lang]) +
          '" />' +
          '<span class="vehicle-badge-top">' +
          escapeHtml(v.badgeLabel[lang]) +
          '</span>' +
          '</div>' +
          '<div class="vehicle-body">' +
          '<div>' +
          '<h3 class="vehicle-title-dark">' +
          escapeHtml(v.name[lang]) +
          '</h3>' +
          '<p class="vehicle-desc-dark">' +
          escapeHtml(v.description[lang]) +
          '</p>' +
          '</div>' +
          '<div class="vehicle-card-footer">' +
          '<div class="vehicle-spec">' +
          iconHtml(specIcon, 'icon-md') +
          '<span>' +
          escapeHtml(v.specHighlight[lang]) +
          '</span>' +
          '</div>' +
          '<a href="' +
          escapeHtml(buildWhatsappUrl(v.whatsappPhone, vehicleWhatsappMessage(v, lang))) +
          '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-card">' +
          iconHtml('message-circle', 'icon-md') +
          '<span>' +
          escapeHtml(t.fleet.bookBtn[lang]) +
          '</span>' +
          '</a>' +
          '</div>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    var standardCards = t.home.standardsCards
      .map(function (card) {
        return (
          '<div class="standard-card">' +
          '<div class="standard-icon-box">' +
          iconHtml(card.icon, 'icon-lg') +
          '</div>' +
          '<h3 class="standard-card-title">' +
          escapeHtml(card.title[lang]) +
          '</h3>' +
          '<p class="standard-card-desc">' +
          escapeHtml(card.desc[lang]) +
          '</p>' +
          '</div>'
        );
      })
      .join('');

    var serviceOverviewCards = t.home.servicesOverview
      .map(function (item) {
        return (
          '<div class="service-overview-card">' +
          '<div>' +
          '<div class="service-overview-icon">' +
          iconHtml(item.icon, 'icon-lg') +
          '</div>' +
          '<h3 class="service-overview-title">' +
          escapeHtml(item.title[lang]) +
          '</h3>' +
          '<p class="service-overview-desc">' +
          escapeHtml(item.desc[lang]) +
          '</p>' +
          '</div>' +
          '<button type="button" class="service-overview-btn" data-nav="services">' +
          '<span>' +
          escapeHtml(t.nav.services[lang]) +
          '</span>' +
          iconHtml(dirArrow, 'icon-md') +
          '</button>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<section class="hero">' +
      '<div class="hero-bg"></div>' +
      '<div class="hero-overlay-dir"></div>' +
      '<div class="hero-overlay-vert"></div>' +
      '<div class="container hero-content">' +
      '<div class="hero-inner">' +
      '<div class="eyebrow-row">' +
      '<span class="eyebrow-line"></span>' +
      '<span class="eyebrow-text">' +
      escapeHtml(t.home.heroEyebrow[lang]) +
      '</span>' +
      '</div>' +
      '<h1 class="hero-title">' +
      escapeHtml(t.home.heroTitlePrefix[lang]) +
      ' <span class="hero-title-accent">' +
      escapeHtml(t.home.heroTitleAccent[lang]) +
      '</span>' +
      '</h1>' +
      '<div class="hero-actions">' +
      '<button type="button" class="btn btn-primary btn-hero-primary" data-nav="fleet">' +
      '<span>' +
      escapeHtml(t.home.exploreFleet[lang]) +
      '</span>' +
      iconHtml(dirArrow, 'icon-md') +
      '</button>' +
      '<a href="' +
      escapeHtml(ctaUrl) +
      '" target="_blank" rel="noopener noreferrer" class="btn btn-outline-gold btn-hero-secondary">' +
      iconHtml('message-circle', 'icon-md') +
      '<span>' +
      escapeHtml(t.home.bookWhatsapp[lang]) +
      '</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="section-light" id="featured-fleet">' +
      '<div class="container">' +
      '<div class="section-header-row">' +
      '<div>' +
      '<span class="section-eyebrow-dark">' +
      escapeHtml(t.home.featuredEyebrow[lang]) +
      '</span>' +
      '<h2 class="section-title-dark">' +
      escapeHtml(t.home.featuredTitle[lang]) +
      '</h2>' +
      '</div>' +
      '<button type="button" class="section-link-btn" data-nav="fleet">' +
      '<span>' +
      escapeHtml(t.home.viewAllFleet[lang]) +
      '</span>' +
      iconHtml(dirArrow, 'icon-md') +
      '</button>' +
      '</div>' +
      '<div class="fleet-grid-3">' +
      featuredCards +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="section-dark">' +
      '<div class="container">' +
      '<div class="standard-grid">' +
      '<div class="standard-intro">' +
      '<span class="section-eyebrow-gold">' +
      escapeHtml(t.home.standardEyebrow[lang]) +
      '</span>' +
      '<h2 class="section-title-light">' +
      escapeHtml(t.home.standardTitle[lang]) +
      '</h2>' +
      '<p class="standard-body">' +
      escapeHtml(t.home.standardBody[lang]) +
      '</p>' +
      '</div>' +
      '<div class="standard-cards-grid">' +
      standardCards +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="section-low">' +
      '<div class="container">' +
      '<div class="services-overview-head">' +
      '<span class="section-eyebrow-gold">' +
      escapeHtml(t.home.servicesEyebrow[lang]) +
      '</span>' +
      '<h2 class="section-title-light">' +
      escapeHtml(t.home.servicesTitle[lang]) +
      '</h2>' +
      '</div>' +
      '<div class="services-overview-grid">' +
      serviceOverviewCards +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="section-dark">' +
      '<div class="cta-centered">' +
      '<span class="section-eyebrow-gold">' +
      escapeHtml(t.home.ctaEyebrow[lang]) +
      '</span>' +
      '<h2 class="section-title-light">' +
      escapeHtml(t.home.ctaTitle[lang]) +
      '</h2>' +
      '<p class="cta-body">' +
      escapeHtml(t.home.ctaBody[lang]) +
      '</p>' +
      '<div class="cta-actions">' +
      '<a href="' +
      escapeHtml(ctaUrl) +
      '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-cta-lg">' +
      iconHtml('message-circle', 'icon-md') +
      '<span>' +
      escapeHtml(t.home.bookWhatsapp[lang]) +
      '</span>' +
      '<span dir="ltr" class="tabular-nums btn-phone-suffix">(' +
      escapeHtml(data.primaryDisplay) +
      ')</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</section>'
    );
  }

  function renderServices() {
    var lang = state.lang;
    var t = data.translations;
    var ctaUrl = buildWhatsappUrl(data.primaryWhatsapp, t.whatsappMessages.servicesCta[lang]);

    var serviceCards = data.services
      .map(function (srv) {
        var bullets = srv.highlights[lang]
          .map(function (bullet) {
            return (
              '<li class="service-highlight-item">' +
              iconHtml('circle-check', 'service-highlight-icon') +
              '<span>' +
              escapeHtml(bullet) +
              '</span>' +
              '</li>'
            );
          })
          .join('');

        return (
          '<article class="service-pillar-card">' +
          '<div class="service-pillar-media">' +
          '<img src="' +
          escapeHtml(resolveAsset(srv.image)) +
          '" alt="' +
          escapeHtml(srv.title[lang]) +
          '" class="vehicle-img" loading="lazy" data-fallback-label="' +
          escapeHtml(srv.title[lang]) +
          '" />' +
          '<div class="service-pillar-gradient"></div>' +
          '<span class="service-pillar-tag">' +
          escapeHtml(srv.tag[lang]) +
          '</span>' +
          '</div>' +
          '<div class="service-pillar-body">' +
          '<div>' +
          '<div class="service-pillar-head">' +
          '<div class="service-pillar-icon">' +
          iconHtml(srv.iconName, 'icon-xl') +
          '</div>' +
          '<div>' +
          '<h3 class="service-pillar-title">' +
          escapeHtml(srv.title[lang]) +
          '</h3>' +
          '<p class="service-pillar-subtitle">' +
          escapeHtml(srv.subtitle[lang]) +
          '</p>' +
          '</div>' +
          '</div>' +
          '<p class="service-pillar-desc">' +
          escapeHtml(srv.description[lang]) +
          '</p>' +
          '<ul class="service-highlights">' +
          bullets +
          '</ul>' +
          '</div>' +
          '<div>' +
          '<a href="' +
          escapeHtml(buildWhatsappUrl(srv.whatsappPhone, serviceWhatsappMessage(srv, lang))) +
          '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-service">' +
          iconHtml('message-circle', 'icon-md') +
          '<span>' +
          escapeHtml(t.services.inquireBtn[lang]) +
          '</span>' +
          '</a>' +
          '</div>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    var royalCards = t.services.royalStandards
      .map(function (item) {
        return (
          '<div class="royal-card">' +
          '<div class="royal-icon-box">' +
          iconHtml(item.icon, 'icon-lg') +
          '</div>' +
          '<h3 class="royal-card-title">' +
          escapeHtml(item.title[lang]) +
          '</h3>' +
          '<span class="royal-card-highlight">' +
          escapeHtml(item.highlight[lang]) +
          '</span>' +
          '<p class="royal-card-desc">' +
          escapeHtml(item.desc[lang]) +
          '</p>' +
          '</div>'
        );
      })
      .join('');

    return (
      '<section class="page-hero">' +
      '<div class="page-hero-glow"></div>' +
      '<div class="container">' +
      '<div class="page-hero-inner">' +
      '<div class="page-hero-eyebrow-row">' +
      '<span class="eyebrow-line-subtle"></span>' +
      '<span class="page-hero-eyebrow">' +
      escapeHtml(t.services.eyebrow[lang]) +
      '</span>' +
      '</div>' +
      '<h1 class="page-hero-title">' +
      escapeHtml(t.services.title[lang]) +
      '</h1>' +
      '<p class="page-hero-subtitle">' +
      escapeHtml(t.services.subtitle[lang]) +
      '</p>' +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="services-section-light">' +
      '<div class="container">' +
      '<div class="services-section-head">' +
      '<h2 class="section-title-dark">' +
      escapeHtml(t.services.sectionTitle[lang]) +
      '</h2>' +
      '</div>' +
      '<div class="services-grid-3">' +
      serviceCards +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="section-obsidian">' +
      '<div class="container">' +
      '<div class="royal-head">' +
      '<span class="section-eyebrow-gold">' +
      escapeHtml(t.services.standardsEyebrow[lang]) +
      '</span>' +
      '<h2 class="royal-title">' +
      escapeHtml(t.services.standardsTitle[lang]) +
      '</h2>' +
      '<p class="royal-subtitle">' +
      escapeHtml(t.services.standardsSubtitle[lang]) +
      '</p>' +
      '</div>' +
      '<div class="royal-grid-4">' +
      royalCards +
      '</div>' +
      '<div class="cta-card">' +
      '<div class="cta-card-content">' +
      '<h3 class="cta-card-title">' +
      escapeHtml(t.home.ctaTitle[lang]) +
      '</h3>' +
      '<p class="cta-card-desc">' +
      escapeHtml(t.home.ctaBody[lang]) +
      '</p>' +
      '</div>' +
      '<div class="concierge-actions">' +
      '<a href="' +
      escapeHtml(ctaUrl) +
      '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-concierge">' +
      iconHtml('message-circle', 'icon-md') +
      '<span>' +
      escapeHtml(t.home.bookWhatsapp[lang]) +
      '</span>' +
      '<span dir="ltr" class="tabular-nums btn-phone-suffix">(' +
      escapeHtml(data.primaryDisplay) +
      ')</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>'
    );
  }

  function getFilteredVehicles() {
    var q = state.fleetSearch.trim().toLowerCase();
    return data.vehicles.filter(function (v) {
      var catMatch = state.fleetCategory === 'all' || v.category === state.fleetCategory;
      var queryMatch =
        !q ||
        v.name.en.toLowerCase().indexOf(q) !== -1 ||
        v.name.ar.toLowerCase().indexOf(q) !== -1 ||
        v.categoryLabel.en.toLowerCase().indexOf(q) !== -1 ||
        v.categoryLabel.ar.toLowerCase().indexOf(q) !== -1;
      return catMatch && queryMatch;
    });
  }

  function formatVehicleCount(count) {
    var t = data.translations.fleet;
    var lang = state.lang;
    return count === 1
      ? '1 ' + t.vehicleSingular[lang]
      : count + ' ' + t.vehiclePlural[lang];
  }

  function renderFleetGridHtml(filtered) {
    var lang = state.lang;
    var t = data.translations.fleet;

    if (filtered.length === 0) {
      return (
        '<div class="fleet-empty">' +
        iconHtml('car', 'icon-empty') +
        '<p class="fleet-empty-title">' +
        escapeHtml(t.emptyTitle[lang]) +
        '</p>' +
        '<p class="fleet-empty-desc">' +
        escapeHtml(t.emptyDesc[lang]) +
        '</p>' +
        '<button type="button" class="btn btn-primary btn-reset-filter" data-reset-fleet="true">' +
        escapeHtml(t.resetFilter[lang]) +
        '</button>' +
        '</div>'
      );
    }

    return (
      '<div class="fleet-grid-dark">' +
      filtered
        .map(function (v) {
          return (
            '<article class="vehicle-card-dark">' +
            '<div class="vehicle-media-dark">' +
            '<img src="' +
            escapeHtml(resolveAsset(v.image)) +
            '" alt="' +
            escapeHtml(v.name[lang]) +
            '" class="vehicle-img" loading="lazy" data-fallback-label="' +
            escapeHtml(v.name[lang]) +
            '" />' +
            '<div class="vehicle-gradient-dark"></div>' +
            '<span class="vehicle-badge-dark">' +
            escapeHtml(v.categoryLabel[lang]) +
            '</span>' +
            '</div>' +
            '<div class="vehicle-body">' +
            '<div>' +
            '<h2 class="vehicle-title-light">' +
            escapeHtml(v.name[lang]) +
            '</h2>' +
            '<p class="vehicle-desc-light">' +
            escapeHtml(v.description[lang]) +
            '</p>' +
            '<div class="vehicle-driver-pill">' +
            iconHtml('shield-check', 'icon-md') +
            '<span>' +
            escapeHtml(v.driverNote[lang]) +
            '</span>' +
            '</div>' +
            '</div>' +
            '<a href="' +
            escapeHtml(buildWhatsappUrl(v.whatsappPhone, vehicleWhatsappMessage(v, lang))) +
            '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-card btn-card-dark">' +
            iconHtml('message-circle', 'icon-md') +
            '<span>' +
            escapeHtml(t.bookBtn[lang]) +
            '</span>' +
            '</a>' +
            '</div>' +
            '</article>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function renderFleet() {
    var lang = state.lang;
    var t = data.translations;
    var filtered = getFilteredVehicles();
    var conciergeUrl = buildWhatsappUrl(
      data.primaryWhatsapp,
      t.whatsappMessages.fleetConcierge[lang]
    );

    var categoryTabs = data.categories
      .map(function (cat) {
        var active = state.fleetCategory === cat;
        return (
          '<button type="button" role="tab" aria-selected="' +
          (active ? 'true' : 'false') +
          '" class="filter-tab' +
          (active ? ' is-active' : '') +
          '" data-category="' +
          escapeHtml(cat) +
          '">' +
          escapeHtml(t.fleet.categories[cat][lang]) +
          '</button>'
        );
      })
      .join('');

    return (
      '<section class="fleet-header-section">' +
      '<div class="fleet-header-glow"></div>' +
      '<div class="container">' +
      '<div class="fleet-hero-row">' +
      '<div class="fleet-intro">' +
      '<div class="fleet-eyebrow-row">' +
      '<span class="fleet-eyebrow-line"></span>' +
      '<span class="page-hero-eyebrow">' +
      escapeHtml(t.fleet.eyebrow[lang]) +
      '</span>' +
      '</div>' +
      '<h1 class="fleet-title">' +
      escapeHtml(t.fleet.title[lang]) +
      '</h1>' +
      '<p class="fleet-subtitle">' +
      escapeHtml(t.fleet.subtitle[lang]) +
      '</p>' +
      '</div>' +
      '<div class="fleet-count-box">' +
      '<div class="fleet-count-inner">' +
      '<span class="fleet-count-label">' +
      escapeHtml(t.fleet.showingLabel[lang]) +
      '</span>' +
      '<span id="fleet-count-value" class="fleet-count-value tabular-nums">' +
      escapeHtml(formatVehicleCount(filtered.length)) +
      '</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="fleet-controls">' +
      '<div class="filter-tabs" role="tablist" aria-label="' +
      escapeHtml(t.aria.filterByCat[lang]) +
      '">' +
      categoryTabs +
      '</div>' +
      '<div class="search-wrap">' +
      iconHtml('search', 'search-icon') +
      '<input id="fleet-search" type="search" class="search-input" value="' +
      escapeHtml(state.fleetSearch) +
      '" placeholder="' +
      escapeHtml(t.fleet.searchPlaceholder[lang]) +
      '" aria-label="' +
      escapeHtml(t.fleet.searchPlaceholder[lang]) +
      '" />' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="fleet-grid-section">' +
      '<div id="fleet-results-container" class="container">' +
      renderFleetGridHtml(filtered) +
      '</div>' +
      '</section>' +
      '<section class="concierge-section">' +
      '<div class="container">' +
      '<div class="concierge-card">' +
      '<div class="concierge-glow"></div>' +
      '<div class="concierge-content">' +
      '<span class="section-eyebrow-gold">' +
      escapeHtml(t.fleet.conciergeEyebrow[lang]) +
      '</span>' +
      '<h2 class="concierge-title">' +
      escapeHtml(t.fleet.conciergeTitle[lang]) +
      '</h2>' +
      '<p class="concierge-subtitle">' +
      escapeHtml(t.fleet.conciergeSubtitle[lang]) +
      '</p>' +
      '</div>' +
      '<div class="concierge-actions">' +
      '<a href="' +
      escapeHtml(conciergeUrl) +
      '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-concierge">' +
      iconHtml('message-circle', 'icon-md') +
      '<span>' +
      escapeHtml(t.fleet.conciergeBtn[lang]) +
      '</span>' +
      '<span dir="ltr" class="tabular-nums btn-phone-suffix">(' +
      escapeHtml(data.primaryDisplay) +
      ')</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>'
    );
  }

  function renderFooter() {
    var lang = state.lang;
    var t = data.translations;
    var waUrl = buildWhatsappUrl(data.primaryWhatsapp, t.whatsappMessages.general[lang]);
    var navItems = [
      { id: 'home', label: t.nav.home[lang] },
      { id: 'services', label: t.nav.services[lang] },
      { id: 'fleet', label: t.nav.fleet[lang] }
    ];

    var footerLinks = navItems
      .map(function (item) {
        var active = state.page === item.id;
        return (
          '<li>' +
          '<button type="button" class="footer-link-btn' +
          (active ? ' is-active' : '') +
          '" data-nav="' +
          item.id +
          '">' +
          escapeHtml(item.label) +
          '</button>' +
          '</li>'
        );
      })
      .join('');

    var contactRows = data.contactDesks
      .map(function (desk) {
        var waChip =
          desk.raw === data.primaryWhatsapp
            ? '<a href="' +
              escapeHtml(waUrl) +
              '" target="_blank" rel="noopener noreferrer" class="footer-wa-chip">' +
              iconHtml('message-circle', 'icon-sm') +
              '<span>WhatsApp</span>' +
              '</a>'
            : '';

        return (
          '<li class="footer-contact-row">' +
          '<a href="tel:+' +
          escapeHtml(desk.raw) +
          '" class="footer-tel-link tabular-nums">' +
          iconHtml('phone', 'icon-md footer-contact-icon') +
          '<span dir="ltr">' +
          escapeHtml(desk.display) +
          '</span>' +
          '</a>' +
          waChip +
          '</li>'
        );
      })
      .join('');

    return (
      '<footer class="site-footer">' +
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div>' +
      '<div class="footer-brand-row">' +
      '<img src="' +
      escapeHtml(resolveAsset(data.logoPath)) +
      '" alt="' +
      escapeHtml(t.brandName[lang]) +
      '" class="footer-logo" />' +
      '<span class="footer-brand-name">' +
      escapeHtml(t.brandName[lang]) +
      '</span>' +
      '</div>' +
      '<p class="footer-slogan">' +
      escapeHtml(t.slogan[lang]) +
      '</p>' +
      '<p class="footer-desc">' +
      escapeHtml(t.footer.description[lang]) +
      '</p>' +
      '</div>' +
      '<div>' +
      '<h3 class="footer-heading">' +
      escapeHtml(t.footer.quickLinks[lang]) +
      '</h3>' +
      '<ul class="footer-links">' +
      footerLinks +
      '</ul>' +
      '</div>' +
      '<div>' +
      '<h3 class="footer-heading">' +
      escapeHtml(t.footer.contactTitle[lang]) +
      '</h3>' +
      '<ul class="footer-contacts">' +
      contactRows +
      '<li class="footer-mail-row">' +
      '<a href="mailto:' +
      escapeHtml(data.email) +
      '" class="footer-mail-link">' +
      iconHtml('mail', 'icon-md footer-contact-icon') +
      '<span dir="ltr">' +
      escapeHtml(data.email) +
      '</span>' +
      '</a>' +
      '</li>' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
      escapeHtml(t.footer.copyright[lang]) +
      '</div>' +
      '</div>' +
      '</footer>'
    );
  }

  function renderMobileBottomNav() {
    var lang = state.lang;
    var t = data.translations;
    var items = [
      { id: 'home', label: t.nav.home[lang], icon: 'house' },
      { id: 'services', label: t.nav.services[lang], icon: 'concierge-bell' },
      { id: 'fleet', label: t.nav.fleet[lang], icon: 'car' }
    ];

    var buttons = items
      .map(function (item) {
        var active = state.page === item.id;
        return (
          '<button type="button" class="mobile-bottom-btn' +
          (active ? ' is-active' : '') +
          '" data-nav="' +
          item.id +
          '"' +
          (active ? ' aria-current="page"' : '') +
          '>' +
          iconHtml(item.icon, 'icon-lg') +
          '<span class="mobile-bottom-label">' +
          escapeHtml(item.label) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    return (
      '<nav class="mobile-bottom-nav pb-safe" aria-label="' +
      escapeHtml(t.aria.mobileNav[lang]) +
      '">' +
      '<div class="mobile-bottom-inner">' +
      buttons +
      '</div>' +
      '</nav>'
    );
  }

  function attachImageFallbacks() {
    if (!appRoot) return;
    var imgs = appRoot.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      (function (img) {
        img.addEventListener('error', function () {
          if (img.getAttribute('data-brand-logo') === 'true') {
            state.logoFailed = true;
            img.remove();
            return;
          }
          var label = img.getAttribute('data-fallback-label') || img.alt || '';
          var fallback = document.createElement('div');
          fallback.className = 'vehicle-img-fallback';
          fallback.setAttribute('role', 'img');
          fallback.setAttribute('aria-label', img.alt || label);
          fallback.innerHTML =
            iconHtml('car', 'vehicle-img-fallback-icon') +
            '<span class="vehicle-img-fallback-label">' +
            escapeHtml(label) +
            '</span>';
          if (img.parentNode) {
            img.parentNode.replaceChild(fallback, img);
          }
        });
      })(imgs[i]);
    }
  }

  function updateFleetResultsOnly() {
    var filtered = getFilteredVehicles();
    var countEl = document.getElementById('fleet-count-value');
    var gridEl = document.getElementById('fleet-results-container');

    if (countEl) {
      countEl.textContent = formatVehicleCount(filtered.length);
    }
    if (gridEl) {
      gridEl.innerHTML = renderFleetGridHtml(filtered);
      attachImageFallbacks();
    }
  }

  function render() {
    if (!appRoot) return;
    updateDocumentMeta();

    var mainHtml = '';
    if (state.page === 'services') {
      mainHtml = renderServices();
    } else if (state.page === 'fleet') {
      mainHtml = renderFleet();
    } else {
      mainHtml = renderHome();
    }

    appRoot.innerHTML =
      '<div class="site-shell" dir="' +
      (state.lang === 'ar' ? 'rtl' : 'ltr') +
      '">' +
      renderHeader() +
      '<main class="main-content">' +
      mainHtml +
      '</main>' +
      renderFooter() +
      renderMobileBottomNav() +
      '</div>';

    attachImageFallbacks();
  }

  function navigateTo(page) {
    if (page !== 'home' && page !== 'services' && page !== 'fleet') {
      page = 'home';
    }
    state.page = page;
    state.mobileMenuOpen = false;
    if (global.location.hash !== '#' + page) {
      global.location.hash = page;
    }
    render();
    global.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (appRoot) {
    appRoot.addEventListener('click', function (event) {
      var navBtn = event.target.closest('[data-nav]');
      if (navBtn) {
        navigateTo(navBtn.getAttribute('data-nav'));
        return;
      }

      var langBtn = event.target.closest('[data-lang]');
      if (langBtn) {
        var nextLang = langBtn.getAttribute('data-lang');
        var updatedInPlace = langApi.switchLanguage(nextLang);
        if (updatedInPlace) {
          state.lang = langApi.getCurrent();
          state.mobileMenuOpen = false;
          render();
        }
        return;
      }

      var menuBtn = event.target.closest('[data-toggle-menu]');
      if (menuBtn) {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        var drawer = appRoot.querySelector('.mobile-drawer');
        if (drawer) {
          drawer.hidden = !state.mobileMenuOpen;
        }
        menuBtn.setAttribute('aria-expanded', state.mobileMenuOpen ? 'true' : 'false');
        menuBtn.innerHTML = iconHtml(state.mobileMenuOpen ? 'x' : 'menu', 'icon-xl');
        return;
      }

      var catBtn = event.target.closest('[data-category]');
      if (catBtn) {
        state.fleetCategory = catBtn.getAttribute('data-category') || 'all';
        var allTabs = appRoot.querySelectorAll('[data-category]');
        for (var i = 0; i < allTabs.length; i++) {
          var isSelected = allTabs[i] === catBtn;
          allTabs[i].classList.toggle('is-active', isSelected);
          allTabs[i].setAttribute('aria-selected', isSelected ? 'true' : 'false');
        }
        updateFleetResultsOnly();
        return;
      }

      var resetBtn = event.target.closest('[data-reset-fleet]');
      if (resetBtn) {
        state.fleetCategory = 'all';
        state.fleetSearch = '';
        render();
      }
    });

    appRoot.addEventListener('input', function (event) {
      if (event.target && event.target.id === 'fleet-search') {
        state.fleetSearch = event.target.value;
        updateFleetResultsOnly();
      }
    });
  }

  global.addEventListener('hashchange', function () {
    var nextPage = getPageFromHash();
    if (nextPage !== state.page) {
      state.page = nextPage;
      state.mobileMenuOpen = false;
      render();
      global.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  global.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && state.mobileMenuOpen) {
      state.mobileMenuOpen = false;
      render();
    }
  });

  render();
})(window);
