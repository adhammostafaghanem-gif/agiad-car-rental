(function (global) {
  'use strict';

  var STORAGE_KEY = 'agiad_lang';
  var SUPPORTED = ['ar', 'en'];

  function normalizeLang(value) {
    if (!value || typeof value !== 'string') return null;
    var base = value.trim().toLowerCase().split(/[-_]/)[0];
    return SUPPORTED.indexOf(base) !== -1 ? base : null;
  }

  function detectBrowserLanguage() {
    var candidates = [];
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      candidates = navigator.languages;
    } else if (navigator.language) {
      candidates = [navigator.language];
    } else if (navigator.userLanguage) {
      candidates = [navigator.userLanguage];
    }

    for (var i = 0; i < candidates.length; i++) {
      var matched = normalizeLang(candidates[i]);
      if (matched) return matched;
    }

    // Default to Arabic if browser language is unsupported
    return 'ar';
  }

  function readStoredLanguage() {
    try {
      return normalizeLang(global.localStorage.getItem(STORAGE_KEY));
    } catch (err) {
      return null;
    }
  }

  function persistLanguage(lang) {
    try {
      global.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      // Ignore storage errors in restricted contexts
    }
  }

  function resolveInitialLanguage() {
    var root = document.documentElement;
    var pageLang = normalizeLang(root.getAttribute('data-page-lang'));

    if (pageLang) {
      persistLanguage(pageLang);
      return pageLang;
    }

    var stored = readStoredLanguage();
    if (stored) {
      return stored;
    }

    var detected = detectBrowserLanguage();
    persistLanguage(detected);
    return detected;
  }

  function applyDocumentAttributes(lang) {
    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  function switchLanguage(nextLang) {
    var targetLang = normalizeLang(nextLang) || 'ar';
    persistLanguage(targetLang);

    var root = document.documentElement;
    var pageLang = normalizeLang(root.getAttribute('data-page-lang'));
    var basePath = root.getAttribute('data-base-path') || '.';

    // On dedicated /ar/ or /en/ pages, navigate to the sibling language page while preserving hash
    if (pageLang && pageLang !== targetLang) {
      var cleanBase = basePath.replace(/\/+$/, '');
      var hash = global.location.hash || '';
      global.location.href = cleanBase + '/' + targetLang + '/index.html' + hash;
      return false;
    }

    applyDocumentAttributes(targetLang);
    return true;
  }

  var initialLang = resolveInitialLanguage();
  applyDocumentAttributes(initialLang);

  global.AGIAD_LANG = {
    getCurrent: function () {
      return normalizeLang(document.documentElement.lang) || initialLang;
    },
    detectBrowserLanguage: detectBrowserLanguage,
    applyDocumentAttributes: applyDocumentAttributes,
    persistLanguage: persistLanguage,
    switchLanguage: switchLanguage
  };
})(window);
