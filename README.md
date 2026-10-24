# Mark Joshua Briones — Portfolio

A responsive portfolio for a video editor and AI content creator. Its visual direction combines a quiet off-white canvas, Manrope typography, blue accents, floating editing objects, and a gallery of real project imagery.

## Stack

- Semantic HTML for the content and project cards.
- Modular, responsive CSS with shared design tokens, Grid, and Flexbox.
- Native JavaScript modules for category filters, accessible video dialogs, mobile navigation, and email copying.
- A dependency-free Node.js development server. Production is static: no framework runtime, backend, package installation, or build step is required.
- Self-hosted Manrope, distributed under the included SIL Open Font License.

This keeps the portfolio easy to maintain and inexpensive to host. A framework can be introduced if the content or application requirements grow.

## Run locally

Requires Node.js 20 or later.

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. Run `npm run check` for JavaScript syntax checks.

Development-only responsive frames are available at `/__preview/mobile` (390px) and `/__preview/tablet` (768px). These load the real page in fixed-width frames; they are not included in the production assets.

## Structure

```text
dist/
  index.html       Page content, project cards, accessible SVG icons
  styles.css       Foundation, section styles, responsive layouts
  app.js           Project metadata and interactive behavior
  assets/          Local project posters, font/license, favicon, résumé
scripts/
  serve.mjs        Static development server and viewport previews
  fetch-assets.py  Optional public-poster/font refresh utility (Python)
.openai/
  hosting.json     Static hosting identity and configuration
```

## Updating content

Update project metadata in `dist/app.js` and its matching card in `dist/index.html`. Use the same `data-project` key in both. Project groups are `creator`, `short`, and `ai`. Media identifiers link to the user's supplied Google Drive videos; original videos are not copied into this repository.

Posters are local images downloaded from the corresponding shared Drive files. The video iframe loads only after a project is opened and is removed when the dialog closes. Full playback depends on the file remaining accessible in Google Drive. Each dialog includes a direct viewing link.

The optional `scripts/fetch-assets.py` uses public poster URLs and downloads the font and its license. It has no credentials and does not access personal identification files.

## Content and credits

Professional information comes from the résumé supplied for this project. The gallery uses six representative samples with editorial display titles. Documentary footage is not identified as the San Vicente school project because that mapping has not been confirmed. Product and short-form samples are described as editing samples, without claiming a commission or endorsement from brands or people shown.

The monogram composition intentionally serves as the About visual; replace it with a dedicated professional portrait if desired. No availability claims, client testimonials, performance metrics, or prices have been invented.

## Deployment

Deploy the contents of `dist/` to any static host. The Sites configuration publishes this directory. Set the canonical URL and Open Graph image origin in `dist/index.html` when moving to a different domain.

Production website: [editsbymarc.vercel.app](https://editsbymarc.vercel.app).

For Vercel, import `mark-juswa/editsbymarc` with the repository root as the project root. The tracked `vercel.json` selects the Other preset, skips installation and building, and serves `dist/` directly. Vercel's local account/project state is excluded from Git.

## Verification

The first version was checked in the browser at desktop, 768px, and 390px layouts. Checks include category filtering, mobile menu expansion and closing, embedded playback, Escape-to-close, focus restoration, and removing the video player after close. Local asset references and anchors are also checked before packaging.
