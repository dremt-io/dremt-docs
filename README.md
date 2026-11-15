# DREMT Docs

Source for https://docs.dremt.io, a static site built with VitePress.

```bash
npm install
npm run docs:dev       # http://localhost:5173
npm run docs:build     # output in .vitepress/dist
```

- Pages: `index.md`, `token/`, `integration/`, `compliance.md`, `security.md`, `faq.md`, `glossary.md`
- Config and theme: `.vitepress/`
- Static files (logo, favicon): `public/`
- Legal and audit documents: `public/legal/` (served at https://docs.dremt.io/legal/)
- Licence: `LICENSE` (CC BY 4.0 for text, MIT for code samples)
