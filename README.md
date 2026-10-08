# SUNGRID website

The public website for SUNGRID (Pvt) Ltd., built with the Next.js Pages Router. It includes the company pages, project gallery, certificate viewer, solar system calculator, and a locally validated demo inquiry form.

## Local development

Use Node.js 22. The repository includes an `.nvmrc` file for nvm users.

```bash
nvm use
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The asset manifest is generated automatically before development and production builds. Run it directly after adding or renaming files under `public/assets/clients`, `public/assets/brands`, `public/assets/gallery`, or `public/assets/certificates`:

```bash
npm run assets
```

## Validation

```bash
npm run lint
npm test
npm run build
```

The quote form is intentionally presented as a demo and does not submit or persist inquiry data. The review section renders a supplied static snapshot of Google reviews and is not live-synced. The Contact page uses the provided Google Maps embed.
