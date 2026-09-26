# HOMSKIN — Premium Surface Protection Film Website

> **Brand:** HOMSKIN  
> **Business:** Premium Surface Protection Film for residential and commercial interiors  
> **Location:** Hyderabad, Telangana, India  
> **Contact:** Phone: `+91 9392418581` | Email: `homskin11@gmail.com` | WhatsApp: `https://wa.me/919392418581`  
> **Core Message:** *Protect the surface. Preserve the beauty.*  

---

## 1. Project Overview

This repository contains the complete production-grade static landing page and digital brand experience for **HOMSKIN**, a premium surface protection film brand serving Hyderabad, Telangana, India.

The website is crafted to evoke a luxury interior design magazine aesthetic (akin to high-end architecture journals and luxury furniture studios) rather than an industrial film supplier or generic construction company.

### Key Highlights
- **100% Vanilla Tech Stack:** Pure HTML5, CSS3, and modern Vanilla JavaScript with zero external frameworks or heavy runtime dependencies.
- **Conversion-Focused:** Multi-channel inquiries through Direct Call, WhatsApp prefilled messages, Mailto triggers, and an interactive Consultation Form.
- **Interactive Before / After Comparison:** Dual-layer comparison slider using modern CSS `clip-path` and Pointer Events API (`setPointerCapture`) for silky-smooth dragging on mouse, touch, and keyboard.
- **Accessible & SEO Ready:** Semantic HTML5 landmarks, WCAG-compliant color contrasts, keyboard navigation, schema.org JSON-LD local business structured data, and responsive image fallbacks.
- **Mobile First:** Dedicated sticky mobile contact bar (Call, WhatsApp, Consultation), mobile hero crop, slide-out drawer, and fluid responsive design from 320px up to 4K displays.
- **Progressive Photo Enhancement:** Built with instant-rendering architectural SVG visuals and seamless client-side verification to automatically upgrade to high-resolution WebP photographs when dropped into `images/`.

---

## 2. File & Directory Structure

```text
homeskin/
├── index.html                  # Main static landing page
├── style.css                   # Master luxury design system & responsive styling
├── script.js                   # Interactive controller (slider, drawer, form, accordion)
├── IMAGE_PROMPTS.md            # Master prompts & specifications for 18 photo assets
├── README.md                   # Complete documentation & deployment guide
├── assets/
│   ├── favicon.svg             # HOMSKIN luxury monogram favicon
│   └── images/                 # High-resolution vector architectural SVG visuals (20 files)
│       ├── hero-kitchen.svg
│       ├── hero-mobile.svg
│       ├── luxury-home.svg
│       ├── film-detail.svg
│       ├── kitchen-protection.svg
│       ├── kitchen-cabinets.svg
│       ├── dining-table.svg
│       ├── furniture-protection.svg
│       ├── before-after-unprotected.svg   # Unprotected worn marble for slider
│       ├── before-after-protected.svg     # Protected pristine marble for slider
│       ├── before-after.svg               # Static 50/50 split comparison
│       ├── installation.svg
│       ├── commercial-reception.svg
│       ├── wardrobe.svg
│       ├── dressing-table.svg
│       ├── office-desk.svg
│       ├── retail-interior.svg
│       ├── scratch-protection.svg
│       ├── stain-protection.svg
│       └── materials.svg
└── images/                     # WebP photo destination directory (18 exact filenames)
    ├── hero-kitchen.webp
    ├── hero-mobile.webp
    ├── luxury-home.webp
    ├── film-detail.webp
    ├── kitchen-protection.webp
    ├── kitchen-cabinets.webp
    ├── dining-table.webp
    ├── furniture-protection.webp
    ├── before-after.webp
    ├── installation.webp
    ├── commercial-reception.webp
    ├── wardrobe.webp
    ├── dressing-table.webp
    ├── office-desk.webp
    ├── retail-interior.webp
    ├── scratch-protection.webp
    ├── stain-protection.webp
    └── materials.webp
```

---

## 3. How to Run Locally

Because this is a pure static website with no compilation or build steps, you can run it immediately with zero configuration:

### Option A: Direct Browser Opening (Quickest)
Double-click `index.html` in your file explorer, or right-click and choose **Open with > Chrome / Edge / Safari / Firefox**.

### Option B: Local Python HTTP Server
Open your terminal in the `homeskin/` folder and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option C: VS Code Live Server
If using VS Code, install the **Live Server** extension, right-click `index.html` and click **"Open with Live Server"**.

---

## 4. How to Replace Images

1. Refer to [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md) for detailed descriptions, aspect ratios, and prompts for each of the 18 images.
2. Generate or photograph your assets according to the visual guidelines (luxury Indian residences, natural daylight, neutral warm grey and beige tones).
3. Export or convert your photos into the modern **WebP** format.
4. Replace the files in the `images/` directory using the **exact filenames**:
   - `hero-kitchen.webp` (16:9)
   - `hero-mobile.webp` (4:5)
   - `luxury-home.webp` (16:9)
   - `film-detail.webp` (1:1)
   - `kitchen-protection.webp` (4:3)
   - `kitchen-cabinets.webp` (4:3)
   - `dining-table.webp` (4:3)
   - `furniture-protection.webp` (4:3)
   - `before-after.webp` (16:9)
   - `installation.webp` (4:3)
   - `commercial-reception.webp` (16:9)
   - `wardrobe.webp` (4:3)
   - `dressing-table.webp` (4:3)
   - `office-desk.webp` (4:3)
   - `retail-interior.webp` (16:9)
   - `scratch-protection.webp` (4:3)
   - `stain-protection.webp` (16:9)
   - `materials.webp` (1:1)

> **Note on Image Progressive Enhancement:** The website renders instant, high-end architectural SVG visuals right out of the box with zero broken icons. Once you drop real 4K WebP photos into the `images/` directory, `script.js` automatically verifies and upgrades the imagery seamlessly.

---

## 5. How to Change Phone / Email / Contact Info

The business information is centralized in a few easily editable locations:

1. **`index.html`**:
   - Utility top bar: `tel:+919392418581` and WhatsApp link.
   - Quick Contact Card: search for `+91 9392418581` and `homskin11@gmail.com`.
   - Footer: contact items and address.
   - JSON-LD Structured Data in `<head>`: update `"telephone"` and `"email"`.
2. **`script.js`**:
   - Search for `HOMSKIN_PHONE = '+919392418581';` and `HOMSKIN_EMAIL = 'homskin11@gmail.com';` near the top of the file.

---

## 6. How to Edit Copy

All website copy is organized in semantic sections in `index.html`:
- Hero Headline & Subtitle: `<section class="hero-section" id="hero">`
- Value Propositions: `<section class="value-strip-section">`
- About / What is Film: `<section class="about-section" id="about">`
- Why HOMSKIN: `<section class="why-section" id="why">`
- Key Features: `<section class="features-section" id="features">`
- Applications (9 Categories): `<section class="applications-section" id="applications">`
- Before / After Comparison: `<section class="before-after-section" id="before-after">`
- Process Timeline: `<section class="process-section" id="process">`
- Audience Segments: `<section class="audience-section" id="audience">`
- Materials Showcase: `<section class="materials-section" id="materials">`
- Installation Spotlight: `<section class="installation-spotlight-section" id="installation">`
- Frequently Asked Questions: `<section class="faq-section" id="faq">`
- Consultation Form: `<section class="contact-section" id="contact">`

---

## 7. How to Connect a Form Backend (Future)

The Consultation Form is currently configured for static client-side generation of WhatsApp messages and mailto links. If you wish to connect an automated email or database backend in the future:

### Option A: Formspree
1. Create a free endpoint at [formspree.io](https://formspree.io).
2. Change the `<form>` tag in `index.html` to:
   ```html
   <form action="https://formspree.io/f/YOUR_ENDPOINT_ID" method="POST" class="consultation-form">
   ```

### Option B: Netlify Forms
If deploying to Netlify, simply add the `netlify` attribute to the form tag:
```html
<form name="consultation" method="POST" data-netlify="true" class="consultation-form">
```

---

## 8. Deployment Options

Deploying this static website takes less than 2 minutes on any modern static hosting platform:

### 1. Netlify (Recommended)
- Drag and drop the `homeskin/` folder directly into the Netlify App dashboard.
- Or connect your GitHub repository and set publish directory to `.`.

### 2. Vercel
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel` inside `homeskin/` and select default settings.

### 3. GitHub Pages
- Push the repository to GitHub.
- In your repository settings, navigate to **Pages**, select the `main` branch, and set folder to `/ (root)`.
- Save and your site will be live at `https://your-username.github.io/homeskin/`.

### 4. Cloudflare Pages
- Connect your GitHub repo to Cloudflare Pages, select Framework: **None / Static**, build output directory: `.`.
