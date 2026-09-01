# daniellekrzeminski.com

Source for my personal site, served through GitHub Pages. A running note to
myself on what's here and how it's put together — less "how the code works,"
more "where things stand."

## Pages

- **Home** (`index.html`) — "Hello," who I am, and a photo.
- **Featured Projects** (`featured-projects.html`) — *The Process Drifts*, my
  piece on entropy in quality systems. Tagged "more coming soon."
- **Experience** (`experience.html`) — my work in quality engineering, written
  as a story rather than a résumé.
- **Credentials** (`credentials.html`) — Hexagon CMM/PC-DMIS coursework and my
  Lean Six Sigma Green Belt, grouped by issuer.
- **Curated Collections** (`curated-collections.html`) — a placeholder for
  writing I want to publish here eventually.
- **Connect** (`connect.html`) — email, GitHub, Instagram.

## Stack

Static HTML/CSS/JS, no build step, no framework. One shared `styles.css` and
`script.js` across every page.

- **Fonts** — Antikor Mono, Druk Wide Super, Katherine Script (`assets/fonts`).
- **Look** — dark, single green theme, drifting color blobs and a scattered
  starfield in the background, a faint grain overlay on top.
- **Images** — the cat mark, and the two duotone photos on Home/Connect, are
  hand-toned to the site's exact green rather than generated at runtime.
  They ship as WebP with a JPEG/PNG fallback via `<picture>`.

## SEO / metadata

Every page carries its own title, description, canonical URL, Open Graph and
Twitter Card tags, and a shared social preview image
(`assets/images/og-image.png`). The homepage also carries a small JSON-LD
`Person` block. `sitemap.xml` and `robots.txt` sit at the repo root and point
crawlers at all six pages.

## Favicons

`favicon.ico`, `apple-touch-icon.png`, and the sized PNGs in
`assets/favicons/` are all generated from the same cat photo, composited onto
a solid dark tile so it reads on both light and dark browser chrome. They're
referenced as static files rather than swapped in by JavaScript — that JS
swap was the reason the favicon used to be unreliable in Safari.

## What's still coming

- [ ] Actual writing samples on Curated Collections — right now it's a promise
- [ ] More entries on Featured Projects beyond The Process Drifts

## Local preview

No build step — just serve the folder and open it:

```
python3 -m http.server 8000
```
