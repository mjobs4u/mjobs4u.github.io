# M Jobs HR Services - Website

Static site for M Jobs HR Services (MJobs4U).
Plain HTML / CSS / JS - no build step.

## Folder layout

```
mjobs4u/
  index.html               main landing page
  README.md                this file
  assets/
    css/
      styles.css           all site styles (light + dark theme)
    js/
      main.js              theme toggle, scroll effects, marquee, counters, EmailJS
    images/
      hero-illustration.svg
      about-illustration.svg
      services-illustration.svg
      itstaffing-illustration.svg
      contact-illustration.svg
    logos/
      mjobs4u-logo.svg     full lockup with tagline
      mjobs4u-mark.svg     square mark used in nav
      favicon.svg
      itc-infotech.svg
      sagility.svg
      zomato.svg
    fonts/                 (reserved - using Google Fonts CDN today)
    icons/                 (reserved - using Font Awesome CDN today)
  pages/                   (reserved for future inner pages)
```

## Branding

Brand name on site: **M Jobs HR Services**
Short / domain form: **MJobs4U**
Always use one of those two forms - never anything else.

## Theme

Dark blue (#003f7f) and electric cyan (#00bfff) palette with a warm orange accent (#f0a500). Day / night toggle in the navbar persists the user's choice in `localStorage` under the key `theme`.

## Type system

- Display: **Plus Jakarta Sans** (700/800) - modern, professional, used by good corporate sites
- Body: **Inter** (400/500/600) - clean, neutral, easy to read at small sizes

Both loaded from Google Fonts in `index.html`.

## Contact form

Uses EmailJS. Public key, service ID and template ID are in `assets/js/main.js`. Replace those if you migrate to a different EmailJS account.
