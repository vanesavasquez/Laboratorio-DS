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
- **Single page**: All content is in one `index.html` (~1000+ lines).
- **Icons are inline SVGs** inside HTML, NOT `<img src>` references (files exist in `assets/icons/` but are not linked).
- **Source of truth for colors**: `../05_SISTEMA_DISENO/colortokens.json` (primitives + semantics).
- **Typography**: Work Sans loaded from Google Fonts CDN. Sizes from screenshots (H1=42/56, body1=14/24, etc.).

## ✅ How to verify changes

- Open `index.html` in any modern browser (file:// or Live Server).
- No build, no dev server, no test suite.

## 📁 Asset sources (manual copy)

Icons and illustrations are copied manually from:
- `../../05_SISTEMA_DISENO/Iconos/` → `assets/icons/`
- `../../05_SISTEMA_DISENO/Ilustraciones/` → `assets/illustrations/`

## ⚠️ Common mistakes to avoid

- Do not add npm, Vite, Webpack, or any build tool.
- Do not create React/Vue components.
- Do not link external icon libraries (FontAwesome, etc.). Use inline SVGs only.
- Do not change the color tokens without checking `colortokens.json` first.
