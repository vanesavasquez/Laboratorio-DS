# Agent Notes — Laboratorio Design System

## 🔒 Security Constraints (NEVER violate)

1. **Never use the word "Bagó"** anywhere in code, comments, or UI. Use "Laboratorio" only.
2. **No brand switcher**: Do not implement Bagó/Montpellier toggle.
3. **Hide Logos section**: Remove from nav and page content entirely.
4. **Medical Cards**: Remove only the "coverage" line. Keep all other original layout.
5. **Market Card**: Use invented data only (names, percentages, regions). Never real data.
6. **Footer**: Only "Last updated: [date] | Vanesa Vasquez". No Figma/Jira/Guide links.

## 🏗️ Architecture (non-obvious)

- **Zero build step**: Vanilla HTML/CSS/JS. Open `index.html` directly in browser.
- **Single page**: All content is in one `index.html` (~1400+ lines).
- **Icons are inline SVGs** inside HTML, NOT `<img src>` references (files exist in `assets/icons/` but are not linked).
- **Source of truth for colors**: `../05_SISTEMA_DISENO/colortokens.json` (primitives + semantics).
- **Typography**: Work Sans loaded from Google Fonts CDN. Sizes from screenshots (H1=42/56, body1=14/24, etc.).
- **GitHub repo**: https://github.com/vanesavasquez/Laboratorio-DS
- **GitHub Pages**: Branch-based deployment (master / root). URL: https://vanesavasquez.github.io/Laboratorio-DS/

## 📑 Page Sections (in order)

1. **Hero** — Title + description
2. **Fundamentos / Colores** — Primitive + semantic tokens in card grid format with tabs
3. **Tipografia** — Typography table (Tipo | Variante | Ejemplo | Uso)
4. **Iconografia** — Compact card grid (9 columns) with inline SVG icons + search input
5. **Botones** — 4×4 matrix (Primary, Secondary, Outline, Text × Default, Hover, Active, Disabled)
6. **Cards** — Card Medico (3 examples), Card Mercado (1 example with invented data)
7. **Formularios** — Inputs, selects, textareas, checkboxes
8. **Graficos** — Two libraries:
   - **Libreria Flutter — [Fl Chart](https://app.flchart.dev/#/line)** — Line chart, Bar chart, Donut chart
   - **Libreria Angular — [Chart JS](https://www.chartjs.org/)** — Area chart, Grouped bar chart, Gauge chart
9. **Ilustraciones** — 6 unDraw illustrations in card grid, customized color `#c5d0fc`
10. **Feedback** — Alerts (success, error, warning, info) + Badges
11. **Guia de Uso** — Do's, Don'ts, accessibility

## 🎨 Illustrations

- **Source**: [unDraw](https://undraw.co/illustrations)
- **Custom color**: `#c5d0fc` (light blue/lavender)
- **Location**: `assets/illustrations/`
- **Displayed**: 6 cards in grid — Studying Science, Analyze, Collaboration, Data Input, Growth Chart, Certification
- **Download method**: `curl.exe` from `https://cdn.undraw.co/illustration/{slug}.svg`
- **Color replacement**: Replace unDraw default `#6c63ff` with `#c5d0fc` after download

## ✅ How to verify changes

- Open `index.html` in any modern browser (file:// or Live Server).
- No build, no dev server, no test suite.
- GitHub Pages updates automatically on push to master (branch-based deploy).

## 📁 Asset sources (manual copy)

Icons and illustrations are copied manually from:
- `../../05_SISTEMA_DISENO/Iconos/` → `assets/icons/`
- `../../05_SISTEMA_DISENO/Ilustraciones/` → `assets/illustrations/`

## ⚠️ Common mistakes to avoid

- Do not add npm, Vite, Webpack, or any build tool.
- Do not create React/Vue components.
- Do not link external icon libraries (FontAwesome, etc.). Use inline SVGs only.
- Do not change the color tokens without checking `colortokens.json` first.
- Do not use GitHub Actions for deployment (account has billing lock). Use branch-based Pages deploy instead.
