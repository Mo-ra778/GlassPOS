# GlassPOS

GlassPOS is a modern, multilingual Point-of-Sale (POS) frontend built with React and TypeScript. It provides a single-page application for managing sales, products, customers, expenses and reports, and ships with a local mock API for fast development and testing.

---

## Key Features
- Single-page application (SPA) built with React + Vite + TypeScript
- Pages for POS, Products, Customers, Expenses, Reports, Settings and Dashboard
- Local mock API for development: `services/mockApi.ts`
- Internationalization (i18n) support via `i18next` and `react-i18next`
- Client-side reporting & export utilities: jspdf, xlsx, print-js, jspdf-autotable
- Smooth UI animations using Framer Motion
- Reusable UI components and app-wide Context for state management

---

## Tech Stack
- Language: TypeScript
- Framework / Runtime: React (functional components) + Vite
- Notable libraries:
  - react-router-dom (routing)
  - i18next / react-i18next (internationalization)
  - framer-motion (animations)
  - recharts (charts)
  - jspdf, jspdf-autotable, xlsx, print-js (reporting & export)

Dependencies (from package.json):
- react ^19.2.0
- react-dom ^19.2.0
- react-router-dom ^7.9.4
- i18next ^25.6.0
- react-i18next ^16.0.0
- i18next-browser-languagedetector ^8.2.0
- framer-motion ^12.23.24
- jspdf ^3.0.3
- xlsx ^0.18.5
- recharts ^3.2.1
- print-js ^1.6.0
- jspdf-autotable ^5.0.2

Dev dependencies:
- vite ^6.2.0
- @vitejs/plugin-react ^5.0.0
- typescript ~5.8.2
- @types/node ^22.14.0

---

## Repository layout (top-level)

```
App.tsx
index.tsx
index.html
package.json
tsconfig.json
vite.config.ts
types.ts
metadata.json
README.md (this file)

pages/
  Dashboard.tsx
  Pos.tsx
  Products.tsx
  Customers.tsx
  Expenses.tsx
  Settings.tsx
  LoginPage.tsx
  Reports.tsx

components/
  layout/
    Header.tsx
    Sidebar.tsx
    PageWrapper.tsx
  ui/
    GlassCard.tsx
    NeuButton.tsx
    Icon.tsx

contexts/
  AppContext.tsx

hooks/
  useAppContext.ts
  useAuth.ts

services/
  mockApi.ts

i18n/
  config.ts
```

How it fits together:
- `index.tsx` mounts the React app and loads global providers.
- `App.tsx` provides the main routing and layout; it uses `AppContext` to provide global state (auth, cart/session, UI settings).
- Pages in `pages/` are routed views rendered inside the layout components in `components/layout/`.
- `services/mockApi.ts` supplies fake endpoints and sample data during development; replace with real API calls when integrating with a backend.
- `i18n/config.ts` configures language detection and translation resources.

---

## Quick start (development)
Prerequisites:
- Node.js 18+ (recommended)
- npm (or use yarn/pnpm if you adapt scripts)

Commands:
```bash
# Clone
git clone https://github.com/Mo-ra778/pos.git
cd pos

# Install dependencies
npm install

# Start development server (Vite)
npm run dev

# Build for production
npm run build

# Preview the built production bundle
npm run preview
```
Scripts are defined in package.json:
- dev: vite
- build: vite build
- preview: vite preview

---

## Environment & configuration
- The repository currently uses a local mock API (`services/mockApi.ts`). There are no required environment variables in the codebase as-is.
- When integrating a real backend, add the appropriate environment variables (API base URL, auth tokens) and document them in this README.

Recommended Node version: 18.x or later.

---

## Development notes & guidance

Replace mock API with a real backend:
1. Create an HTTP client module (e.g., `services/apiClient.ts`) using fetch or axios.
2. Replace or wrap calls in `services/mockApi.ts` with the real client.
3. Update pages/components (`Pos.tsx`, `Products.tsx`, etc.) to call the new client or inject it via Context.

State management:
- Global state and session behavior live in `contexts/AppContext.tsx`. Inspect this file to understand authentication flow, cart/session data, and how user preferences (like language) are stored.

Internationalization:
- `i18n/config.ts` sets up i18next and language detection. Add locales and translation files per language and register them in the config.

UI & layout:
- Layout components (Header, Sidebar, PageWrapper) control the main app shell; pages render into PageWrapper.

Reporting & exports:
- PDF and table export utilities are provided through jspdf, jspdf-autotable, and xlsx. Check page-specific export implementations for usage examples.

---

## Testing & linting
- There are no test or lint scripts present in package.json. Recommended next steps:
  - Add unit tests with vitest or jest + React Testing Library
  - Add TypeScript strict rules and an ESLint configuration
  - Add GitHub Actions for CI (install/test/build)

---

## Contributing
- Open an issue for feature requests or bugs.
- Create feature branches with clear names (e.g., `feature/products-filter`, `fix/auth-redirect`).
- Submit pull requests with a clear description and, where relevant, screenshots or short recordings.
- Keep changes scoped and split large work into smaller PRs if needed.

---

## Suggested license
- No LICENSE file currently included. Recommended license: MIT. Add a `LICENSE` file if you want to make usage and contribution terms explicit.

---

## Troubleshooting
- Dev server fails to start: ensure Node.js and npm versions are compatible. Remove node_modules and reinstall if necessary (`rm -rf node_modules package-lock.json && npm install`).
- Missing translations: check `i18n/config.ts` and the locales files (if present) for registration and keys.
- Data not showing in pages: confirm whether pages are calling `mockApi` or a real API and verify that `services/mockApi.ts` returns expected data shapes.

---

## Contact & support
If you want the repository updated (for example, to add a LICENSE, CI, or switch mocks to real API integration), provide the desired license choice and any backend API details (endpoints, auth scheme) and the project can be updated accordingly.
