# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Static Vue 3 + Vite SPA for the Knowledge Engine Lab organizational site. Member data lives in `src/data/members.js`. No backend, database, Docker, or environment variables.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite dev server | `npm run dev` | 5173 (default) | Primary local development server |
| Vite preview | `npm run preview` | 4173 (default) | Serves production build from `dist/` |

Only the Vite dev server is required for end-to-end development and testing.

### Common commands

See `README.md` and `package.json` for standard commands:

- Install: `npm ci || npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

CI uses Node 20 (`.github/workflows/deploy.yml`). The cloud VM may have a newer Node version; both work with this project.

### Lint / test

There is no ESLint, Prettier, or test runner configured. `npm run build` is the main automated verification step.

### Routing and base path

Hash-based routes: `/#/overall`, `/#/direction`, `/#/platform`. Production builds use base path `/myteam/` (see `vite.config.js`); dev uses `/`.

### Gotchas

- After changing `src/data/members.js`, the dev server hot-reloads automatically; run `npm run build` before deploying or using `npm run preview`.
- Do not put `npm run dev` or `npm run preview` in the VM update script; start servers manually in a tmux session when needed.
