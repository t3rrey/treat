# Treat Repository Guidelines

## Product Overview

- Treat is a mobile app for tracking restaurants and coffee spots, rating visits,
  and browsing places in list or map views.

## Project Structure & Module Organization

- `app/` contains Expo Router screens and layouts.
  - `app/(tabs)/index.tsx` is the Home list/map view and add-place entry point.
  - `app/(tabs)/coffee.tsx` lists coffee spots with rating/distance sorting.
  - `app/(tabs)/rate-food/index.tsx` is the multi-step rating flow.
- `lib/components/` holds shared UI (cards, bottom sheets, map view).
- `lib/consts/theme.ts` defines shared colors and spacing; reuse these in UI.
- `lib/types.ts` contains shared types like `PlaceWithRating`.
- `convex/` contains the schema and queries (`convex/schema.ts`,
  `convex/places.ts`).
- `sampleData.jsonl` is legacy template seed data; update it before using for
  `places` imports.

## Data Model Notes

- `places` categories are `restaurant`, `cafe`, `coffee_shop`, `both`, `other`.
- `reviews` ratings are 1-10; `coffeeRating` is optional for coffee/both.
- Average ratings are computed in `convex/places.ts`; keep `PlaceWithRating`
  consistent with those shapes.

## Build, Test, and Development Commands

- `pnpm install` installs dependencies.
- `npx convex dev` provisions a Convex dev deployment and creates `.env.local`.
- `pnpm start` runs the Expo dev server.
- `pnpm android`, `pnpm ios`, `pnpm web` open platform targets.
- `pnpm lint` runs ESLint (Expo config).

## Coding Style & UI Conventions

- TypeScript/TSX with 2-space indentation and double quotes.
- Use `@/` path aliases for project imports.
- Keep the bold, high-contrast UI style: thick borders, hard shadows, and theme
  colors from `lib/consts/theme.ts`.
- Handle location permissions and loading states when using `expo-location` or
  map views.

## Testing Guidelines

- No test runner configured yet. If you add tests, use `__tests__/` or
  `*.test.tsx` and document the runner here.

## Commit & Pull Request Guidelines

- Use concise, imperative commit subjects (e.g., `Add coffee sort toggle`).
- PRs should include a summary, manual test steps, and screenshots for UI
  changes.

## Configuration & Environment

- `.env.local` is developer-specific and should not be committed.
