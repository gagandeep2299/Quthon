# Integration Plan — Quthon Marketing Website

## Backend
- Project folder: none; static frontend only.
- Run command: `npm run dev`
- Build command: `npm run build`
- Output: `dist/`
- Health endpoint: none required.

## Frontend
- Project folder: repository root.
- Framework: React + TypeScript + Vite.
- API seam: none; all content is typed static data in `src/data.ts`.
- Mock files: none; no mock data state or preview switcher remains.
- Contact conversion: mailto link to `hello@quthon.com`; no form persistence or external endpoint.

## API Routes
- None required.

## Database
- None required.
- Migration tool: none.
- Connection environment variables: none.
- Explicit requirement: do not add seed data or persistent storage.

## Shared Types
- Site data types are local TypeScript data structures in `src/data.ts`.

## Services
- Essential: static React frontend and Azure Static Web Apps-compatible build output.
- Enhancement: analytics, external lead endpoint, and CMS integration may be added only in a later approved scope.
