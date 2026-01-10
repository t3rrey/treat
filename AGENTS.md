# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains Expo Router screens and layouts; route groups live under `app/(tabs)` (e.g., `app/(tabs)/coffee.tsx`, `app/(tabs)/rate-food/step-1.tsx`).
- `lib/` holds shared UI and utilities: `lib/components/` (feature subfolders), `lib/consts/`, and shared types in `lib/types.ts`.
- `convex/` contains backend schema/types and generated Convex bindings.
- `sampleData.jsonl` is seed data used with Convex imports.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies.
- `npx convex dev` provisions a Convex dev deployment, creates `.env.local`, and syncs functions.
- `pnpm start` runs the Expo dev server.
- `pnpm android`, `pnpm ios`, `pnpm web` open platform-specific targets.
- `pnpm lint` runs ESLint (Expo config).
- `npx convex import --table products sampleData.jsonl` seeds local data.
- `pnpm run reset-project` resets the starter template (use with care).

## Coding Style & Naming Conventions
- TypeScript/TSX with 2-space indentation and double quotes; follow existing file formatting.
- File names use kebab-case (`restaurant-card.tsx`) and Expo Router naming (`_layout.tsx`, `index.tsx`).
- Keep shared UI in `lib/components/` and route-specific logic in `app/`.

## Testing Guidelines
- No test framework or coverage targets are configured yet, and there is no `pnpm test` script.
- If you add tests, prefer `__tests__/` or `*.test.tsx` naming and document the runner in this file.

## Commit & Pull Request Guidelines
- No established commit history yet; use concise, imperative subjects (e.g., `Add coffee rating screen`).
- PRs should include a clear summary, manual test steps, and screenshots for UI changes; link related issues when applicable.

## Configuration & Environment
- `.env.local` is created by `npx convex dev` and should contain `EXPO_PUBLIC_CONVEX_URL`.
- Treat local env files as developer-specific; avoid committing secrets.
