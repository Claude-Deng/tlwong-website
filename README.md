# TL Wong & Co. — website redesign

A static, responsive website for **TL Wong & Co.**, a Malaysian firm of Chartered Accountants established in 1989 and based at Phileo Damansara 1, Petaling Jaya.

The redesign keeps the firm's content, name, contact details and existing brand cues (the stacked green **T/L** mark, the brass rule and the dark green) while giving the practice the clarity, pace and editorial confidence of a contemporary professional-services site.

---

## Preview locally

No build step or dependencies are required.

```powershell
cd D:\harnessspaces\tlwong-site
python -m http.server 4173
```

Open <http://localhost:4173>. To stop the server, press `Ctrl+C`.

You can also open `index.html` directly, though a local server is recommended so that relative paths behave consistently.

### Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: proposition, five service lines, the firm, testimonials, client access |
| `about.html` | The firm, the original about copy, milestones and principles |
| `services.html` | The five service lines in full, with anchor navigation |
| `contact.html` | Contact details, enquiry form and map |
| `client-access.html` | File-share guidance and the existing client portal |
| `privacy.html` | Website privacy notice |

Shared assets live in `assets/css/style.css`, `assets/js/main.js` and `assets/img/`.

---

## Design direction

**Quiet authority, not corporate noise.** The site is built around a simple tension: the precision of the numbers, and the humanity of the people who explain them.

- **Palette** — ink `#0c1612`, forest `#123b2b`, leaf `#68b04d` (from the original logo), brass `#b08d5b`, bone `#f5f4ef`, sage `#e6eae1`.
- **Type** — Instrument Serif for display and italic emphasis; Instrument Sans for body and navigation; IBM Plex Mono for labels, indices and small metadata. The serif/sans contrast is deliberate: the firm's voice, then the firm's work.
- **Signature devices** — the offset green T/L monogram with a brass slash; a dark utility strip above a white, sticky header; a numbered service index that inverts to forest on hover; a full-bleed Kuala Lumpur dusk hero; and a giant low-contrast wordmark in the footer.
- **Layout** — a 1320px, 12-column grid with generous gutters and a consistent vertical rhythm. Sections alternate between white, bone and sage; the testimonial and client-access moments use full forest green.
- **Motion** — restrained. A short reveal on scroll, a sticky-header shadow, a testimonial carousel and button/row hover states. All content remains visible if JavaScript is unavailable.

The visual reference was the polish and editorial typography of PwC Malaysia. The identity, copy and colour remain TL Wong's.

---

## Content approach

- The original about copy, service descriptions, contact details, opening hours and testimonials are preserved. Grammar and sentence flow were lightly edited for readability; facts and claims were not changed.
- Testimonials are attributed exactly as on the original site: **Nasharuddin Aziz, Business Owner** and **Rudy Chan, Director**.
- "Since 1989" and "Est. 1989" are taken from the original site. No team size, client count, accreditation or award claims were invented.
- The services page uses the original structure and substance of the five service descriptions, with added plain-language tags to help scanning.
- The enquiry form deliberately does **not** post to a server. It validates the fields and opens the visitor's email application with a prepared message to `dr.tlwong@outlook.com`. This keeps the static site honest and avoids collecting data without a backend.

---

## Interactions

- Sticky header; mobile menu with `aria-expanded`, Escape-to-close and focusable links.
- Active navigation set from each page's `body[data-page]`.
- Scroll reveals via `IntersectionObserver`, disabled automatically for `prefers-reduced-motion`.
- Testimonial carousel with previous/next controls, a counter and left/right arrow keys.
- Enquiry form with native validation and a `mailto:` handoff.
- Client portal links to the firm's existing members area: <https://www.tlwongco.com/members>.

---

## Photography

The photography is free-to-use stock from **Pexels** and is included locally as optimised WebP files. It is representative, **not** a photograph of the firm's team or office. Replace it with commissioned photography of the actual team and premises when available; the layout is designed to accept portraits and landscape crops without change.

| File | Pexels source |
| --- | --- |
| `hero-kl.webp` | <https://www.pexels.com/photo/1538177/> |
| `about-team.webp` | <https://www.pexels.com/photo/8101931/> |
| `meeting-wide.webp` | <https://www.pexels.com/photo/7643748/> |
| `detail-accounting.webp` | <https://www.pexels.com/photo/6779567/> |
| `arch-tower.webp` | <https://www.pexels.com/photo/13726917/> |
| `arch-modern.webp` | <https://www.pexels.com/photo/28748428/> |
| `kl-night.webp` | <https://www.pexels.com/photo/36122845/> |

Pexels licence: <https://www.pexels.com/license/>. The photographs may be used free of charge; attribution is not required but is recorded here as good practice.

The contact map (`contact-map.webp`) is a static image assembled from **OpenStreetMap** tiles around Phileo Damansara 1. Map data © OpenStreetMap contributors, available under the [Open Database Licence](https://www.openstreetmap.org/copyright). The map is stored locally rather than embedded, so the page makes no third-party map request; the “Open in Google Maps” link is an ordinary outbound link for directions.

`build_images.py` is a small development helper used to resize and convert the source photographs to WebP. It is not needed to run the site.

---

## Deploying

The site is fully static and can be hosted on any static host (Hostinger, Netlify, Cloudflare Pages, GitHub Pages, S3, nginx).

1. Upload the contents of `D:\harnessspaces\tlwong-site\` — the HTML files and the `assets/` folder.
2. Serve `index.html` at the domain root.
3. Add absolute canonical and Open Graph URLs (currently relative) once the production domain is known.
4. Ensure HTTPS. Google Fonts is the only third-party request on page load; the map is a local image and the Google Maps and OpenStreetMap links are ordinary outbound links.
5. If the firm wants enquiries delivered without opening an email client, connect the form to a form endpoint or a small server-side handler; the current `mailto:` behaviour is intentional for a static launch.

### Before go-live

- [ ] Confirm the client portal URL (`https://www.tlwongco.com/members`) is still the correct destination, or replace it with the new portal.
- [ ] Have the privacy notice reviewed against the firm's actual data practices and the applicable Malaysian personal-data requirements.
- [ ] Replace representative stock photography with real team/office photography if available.
- [ ] Replace the inline SVG wordmark with the firm's official vector logo if one exists.
- [ ] Check the contact email and telephone links on a real device.
- [ ] Run a final accessibility and cross-browser pass (Chrome, Safari, Firefox, iOS, Android).

---

## Technical notes

- No framework, build step or package manager. Plain HTML, CSS and JavaScript.
- Fonts are loaded from Google Fonts with `preconnect`; the page still reads well if they fail to load.
- Images are served as WebP with explicit `width`/`height` to reduce layout shift; the hero image is loaded eagerly and everything below the fold lazily.
- The CSS uses custom properties, `clamp()` for fluid type and spacing, and breakpoints at 1180px, 1080px, 980px, 760px and 460px.
- JavaScript is deferred and progressive: navigation, content and the enquiry form's mailto fallback work without it.
- The contact map is a locally hosted WebP built from OpenStreetMap tiles, with an accessible text label and attribution; it is lazy-loaded and causes no third-party request.

---

*Redesign prepared November 2026. Original content © TL Wong & Co.*
