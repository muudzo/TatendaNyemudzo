# Tatenda Nyemudzo, portfolio

Design and engineering for systems that keep working when conditions are bad.

A static Astro site: typed MDX case studies, about 5 KB of JavaScript, a strict hashed CSP, offline
reading through a service worker, and a **Power** switch that shows the site degrading gracefully
under a simulated power cut. The reasoning behind every decision is in [docs/DESIGN.md](docs/DESIGN.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + static build into dist/
npm test           # unit tests (Vitest)
npm run test:e2e   # browser tests in Chromium + WebKit, incl. visual baselines
```

Set `SITE_URL` to the production origin when building, so canonical URLs, Open Graph images and the
sitemap are absolute:

```bash
SITE_URL=https://example.com npm run build
```

## Deploy (Cloudflare Workers static assets)

Live at https://tatenda-nyemudzo.kariba-starlight.workers.dev

```bash
SITE_URL=https://tatenda-nyemudzo.kariba-starlight.workers.dev npm run build
npx wrangler deploy                      # uses wrangler.jsonc, uploads dist/
BASE_URL=https://tatenda-nyemudzo.kariba-starlight.workers.dev npm run test:e2e -- tests/e2e/site.spec.ts
```

Response headers live in `public/_headers`. When a custom domain is connected, change `SITE_URL`
to it, rebuild and redeploy.

## Where things live

| Path | What |
|---|---|
| `src/content/work/*.mdx` | Case studies. The schema in `src/content.config.ts` requires role, status, evidence and primitives |
| `src/data/` | Site constants, the primitive vocabulary, experiments/archive index, trajectory |
| `src/lib/` | Pure, tested logic: matrix derivation, page-weight accounting, work ordering |
| `src/components/` | Layout, case-study parts (`Plate`, `Note`, `Bars`) and the signature diagrams |
| `src/scripts/` | The power switch and offline support: the only client JavaScript |
| `src/styles/tokens.css` | Colour, type and motion tokens, including the power-off theme |
| `public/sw.js` | Service worker: pages network-first, hashed assets cache-first |
| `public/v1/` | The retired Nostalgia OS portfolio, preserved and playable |

## Adding a project

1. Create `src/content/work/<slug>.mdx` with the frontmatter fields the schema requires.
2. Flagships use eight `##` sections: Context, Problem, Thinking, Design, Build, Iteration, Result,
   Reflection. Supporting studies use four.
3. Every figure needs a written twin (`<Plate>`'s `text` slot). That's what screen readers read and
   what the page shows with the power off.
4. Only real numbers. If it isn't in a repo, a document or a measurement, it doesn't go in `facts`.
