# ashot.pahlevanyan.org

Personal site of **Ashot Pahlevanyan** — serial entrepreneur, software engineer,
product lead, PhD mathematician.

Static site hosted on GitHub Pages.

## Structure

- `index.html` — landing page (hero, ventures, about, experience, skills, contact)
- `cv/index.html` — full curriculum vitae (single source of truth for the PDF)
- `css/site.css` — design system + print stylesheet (theme-aware, light/dark)
- `js/main.js` — theme toggle, scroll reveal
- `print/AshotPahlevanyanCV.pdf` — auto-generated from `cv/index.html`

## The CV PDF (no LaTeX)

The downloadable PDF is rendered **from the `/cv` page itself**, so it can never
drift from the site. The `@media print` rules in `css/site.css` curate it down to
a ~2-page executive resume (long tail hidden via the `print-hide` class).

**Rebuild it — one click:** GitHub → **Actions** → **Build CV PDF** → **Run workflow**.
It also runs automatically whenever `cv/` or `css/site.css` changes, and commits
the fresh PDF back.

**Rebuild it locally:**

```bash
python3 -m http.server 8000        # serve the repo
node scripts/generate-pdf.mjs      # writes print/AshotPahlevanyanCV.pdf
```

To edit the CV, change `cv/index.html` — the PDF follows.
