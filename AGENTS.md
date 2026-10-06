# X Color Web (xcolor.lt)

Static marketing site (plain HTML/CSS/vanilla JS, no framework/build step) for
X Color, MB — a powder-coating paint (milteliniai dažai) reseller in Kaunas,
Lithuania. Deployed as-is, likely via a static host (Cloudflare Pages or
similar — check for a `_redirects`/`wrangler.toml`/CI config before assuming).

## Stack
- No bundler. `index.html` + `css/style.css` + `js/main.js`. No npm/build step —
  edits to HTML/CSS/JS take effect immediately on deploy, no compilation.
- SEO is taken seriously here: `index.html` has a full `LocalBusiness`
  JSON-LD block (address, phone, VAT ID, opening hours, product catalog) and
  Open Graph tags — keep these in sync with real business info if content
  changes (address, phone, hours), they're not just boilerplate.
- `js/main.js` is organized as small self-invoking IIFEs per feature (nav,
  hero particles, counters, scroll-reveal, product filter, RAL color palette
  swatches) — follow this pattern for new interactive sections rather than
  adding a shared monolithic script.
- RAL color swatches are hardcoded hex values in `initColorPalette()` — this is
  a curated subset "popular RAL colours", not the full RAL catalog; don't
  assume it's exhaustive if asked to add/look up a RAL code.

## Content domain
- Lithuanian-language content throughout, selling physical paint products
  (Bullcrem, ST brands) and custom NCS color matching — not an e-commerce
  checkout flow, just a catalog/lead-gen site (CTA buttons link to `#kontaktai`
  contact section, no cart/payment).
