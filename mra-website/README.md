# MRA Management Associates — Official Corporate Website (`www.mra.co.tz`)

**Established Since 2005 | Plot 75, Kisasa B Centre Block F, P.O. Box 1446, Dodoma, Tanzania**

This repository contains the complete, shared-hosting-compatible corporate website for **MRA Management Associates**, built strictly with **HTML5, CSS3, and Vanilla JavaScript** (zero external runtime frameworks, databases, or Node.js requirements on production hosting).

---

## Complete File Structure

```text
mra-website/
├── index.html
├── about.html
├── services.html
├── approach.html
├── expertise.html
├── projects.html
├── clients.html
├── gallery.html
├── insights.html
├── contact.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/
    │   ├── style.css
    │   └── responsive.css
    ├── js/
    │   ├── main.js
    │   ├── projects.js
    │   ├── gallery.js
    │   └── forms.js
    ├── documents/
    │   └── MRA-Management-Associates-2026-Company-Profile.html
    └── images/
        ├── hero/
        │   └── mra-hero-consultancy-01.jpg
        ├── about/
        │   └── mra-field-activity-01.jpg
        ├── services/
        │   ├── mra-community-group-01.jpg
        │   ├── mra-consultancy-01.jpg
        │   ├── mra-training-01.jpg
        │   └── mra-workshop-01.jpg
        ├── projects/
        │   ├── mra-project-01.jpg
        │   ├── mra-project-02.jpg
        │   ├── mra-project-03.jpg
        │   ├── mra-project-04.jpg
        │   └── mra-project-05.jpg
        ├── gallery/
        │   ├── mra-consultancy-01.jpg
        │   ├── mra-field-activity-01.jpg
        │   ├── mra-field-activity-02.jpg
        │   ├── mra-meeting-01.jpg
        │   ├── mra-project-01.jpg
        │   ├── mra-training-01.jpg
        │   └── mra-workshop-01.jpg
        ├── consultants/
        │   ├── mra-consultants-01.jpg
        │   └── mra-mentoring-01.jpg
        └── general/
            └── mra-strategy-desk-01.jpg
```

---

## 1. How to Upload the Website to Shared Hosting (`public_html`)

1. Log in to your shared hosting control panel (**cPanel**, **DirectAdmin**, **Plesk**) or connect via **FTP/SFTP** (using FileZilla or Cyberduck).
2. Navigate to the web root directory: `public_html/` (or your domain folder for `www.mra.co.tz`).
3. Upload all contents of the website folder (`index.html`, `about.html`, `services.html`, `approach.html`, `expertise.html`, `projects.html`, `clients.html`, `gallery.html`, `insights.html`, `contact.html`, `favicon.svg`, `robots.txt`, `sitemap.xml`, and the `assets/` folder) directly into `public_html/`.
4. No build step, database setup, or Node.js process is needed. Your website will be live immediately at `https://www.mra.co.tz`.

---

## 2. Where the Photographs Are Stored

All website photographs are organized by section inside `assets/images/`:

- `assets/images/hero/` — Homepage & banner photography
- `assets/images/about/` — Company profile & community field activity photographs
- `assets/images/services/` — Core and specialized consulting practice photographs
- `assets/images/projects/` — Portfolio assignment photographs
- `assets/images/gallery/` — High-resolution gallery & lightbox photographs
- `assets/images/consultants/` — Consultant facilitation & mentoring photographs
- `assets/images/general/` — Supporting editorial imagery

---

## 3. How to Replace Photographs

1. Prepare your replacement `.jpg` or `.webp` photograph (recommended resolution: `1200x900px` or `1600x1000px`, compressed under `350KB`).
2. Name the new file with the exact same filename as the photograph you are replacing (for example, `assets/images/about/mra-field-activity-01.jpg`) and upload it to overwrite the existing file.
3. Alternatively, upload a new filename into the relevant subfolder under `assets/images/` and update the `<img src="assets/images/..." alt="...">` attribute in the corresponding HTML page.

---

## 4. How to Add Gallery Photographs

1. Upload your new photograph to `assets/images/gallery/` (e.g. `assets/images/gallery/mra-field-activity-03.jpg`).
2. Open `gallery.html` in any text editor and duplicate one of the `<figure class="gallery-item" ...>` blocks inside `<div class="gallery-grid">`:

```html
<figure
  class="gallery-item"
  tabindex="0"
  role="button"
  data-gallery-item
  data-category="field-activities"
  data-category-label="Field Activities"
  data-full-src="assets/images/gallery/mra-field-activity-03.jpg"
  data-caption="MRA consultancy team during field activities"
>
  <div class="gallery-item__img-wrap">
    <img
      src="assets/images/gallery/mra-field-activity-03.jpg"
      alt="MRA Management Associates consultancy team during field activities"
      class="gallery-item__img"
      loading="lazy"
    />
  </div>
  <figcaption class="gallery-item__caption">
    <span class="gallery-item__title">MRA consultancy team during field activities</span>
    <div class="meta-line">
      <span>Field Activities</span>
    </div>
  </figcaption>
</figure>
```

Valid `data-category` values (comma-separated if multiple):
`field-activities`, `workshops`, `meetings`, `training`, `consultancy-assignments`, `projects`.

---

## 5. How to Add Projects

1. Open `projects.html` and locate `<div class="projects-grid">`.
2. Duplicate an `<article class="project-card" data-project-card ...>` block:

```html
<article class="project-card" data-project-card data-categories="agriculture,value-chains">
  <div class="project-card__body">
    <span class="project-card__client">CLIENT NAME</span>
    <h3 class="project-card__title">Assignment Title</h3>
    <p class="project-card__desc">Brief factual description of the assignment.</p>
    <div class="project-card__footer meta-line">
      <span>Value Chains</span><span class="meta-sep">·</span><span>Location</span>
    </div>
  </div>
</article>
```

Supported `data-categories` filter keys:
`agriculture`, `value-chains`, `research-evaluation`, `strategic-planning`, `human-rights`, `socio-economic`, `feasibility`, `export-strategy`, `baseline-surveys`.

---

## 6. How to Edit Company Information

All company contact details, vision, mission, values, and affiliations are stored in semantic HTML across the 10 `.html` files and in `assets/documents/MRA-Management-Associates-2026-Company-Profile.html`.
- To update the address, telephone (`+255 753 786966`), or emails (`charles@mra.co.tz`, `oneyac@yahoo.co.uk`), edit the `<footer class="site-footer">` block and `contact.html`.

---

## 7. How to Change Colors

Open `assets/css/style.css` and edit the CSS custom properties at the top of `:root`:

```css
:root {
  --primary: #0b1f3a;       /* Deep Corporate Navy */
  --secondary: #145346;     /* Professional Teal/Green */
  --accent: #b5892e;        /* Muted Institutional Gold */
  --text: #141a24;          /* Dark Charcoal Text */
  --muted: #4e5969;         /* Muted Secondary Text */
  --background: #faf9f5;    /* Off-White Page Canvas */
  --surface: #ffffff;       /* Card Surface */
  --border: #e2ded5;        /* Hairline Border */
}
```

---

## 8. How to Change the Logo

1. Place your official logo file (e.g., `assets/images/general/mra-logo.svg` or `mra-logo.png`) in `assets/images/general/`.
2. In the `<header class="site-header">` of each `.html` file, replace the text inside `<a href="index.html" class="brand-wordmark">` with your `<img>` tag, or update `favicon.svg` for browser tab icons.

---

## 9. How to Add Publications

1. Upload your PDF report or case study to `assets/documents/` (for example, `assets/documents/mra-dairy-sector-review.pdf`).
2. Open `insights.html` and add a new `<article class="project-card">` inside `<div class="projects-grid">` with a download link pointing to `assets/documents/mra-dairy-sector-review.pdf`.

---

## 10. How to Connect Forms to PHP Later

The three forms in `contact.html` (`process-consultation.php`, `process-proposal.php`, `process-contact.php`) are already structured with semantic `name` attributes and `enctype="multipart/form-data"`.

To enable server-side email and attachment processing on shared hosting:
1. Create `process-proposal.php` (and/or `process-consultation.php`) in `public_html/` using PHP's `mail()` or **PHPMailer** to send form submissions to `charles@mra.co.tz` and `oneyac@yahoo.co.uk`.
2. In `assets/js/forms.js`, remove `e.preventDefault();` once validation passes (`if (isValid) { return; }`) so the browser submits the form directly to your PHP script.
