# AGIAD Luxury Car Rental

Static bilingual website (Arabic RTL & English LTR) for **AGIAD Luxury Car Rental Egypt**, built exclusively with HTML5, CSS3, and Vanilla JavaScript (ES6+).

## Structure

- `index.html` — Root entry page with automatic browser language detection (defaults to Arabic if unsupported)
- `ar/index.html` — Arabic (`lang="ar" dir="rtl"`) page
- `en/index.html` — English (`lang="en" dir="ltr"`) page
- `css/style.css` — Core design tokens, typography, theme palette, and component styles
- `css/responsive.css` — Breakpoints for mobile, tablet, laptop, and desktop viewports
- `js/data.js` — Bilingual vehicle fleet (9 vehicles), services, contact desks, and SVG icons
- `js/language.js` — Browser language detection, manual switcher, and `localStorage` persistence
- `js/main.js` — Section navigation (`#home`, `#services`, `#fleet`), mobile drawer, category filter, live search, and WhatsApp links
- `assets/images/` — Local vehicle, service, hero, and brand logo assets
- `favicon.ico`, `robots.txt`, `sitemap.xml`

## Deployment

No installation, build step, or Node.js runtime is required. Upload the project directory directly to GitHub Pages, Cloudflare Pages, or any static web host (root or subdirectory).
