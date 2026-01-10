# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Treat is a cross-platform mobile app (iOS/Android/Web) for couples to collaboratively rate restaurants and coffee shops. Built with Expo + React Native (TypeScript) frontend and Convex serverless backend with real-time sync.

## Development Commands

```bash
# Start Expo dev server
pnpm start

# Run on specific platform
pnpm ios
pnpm android
pnpm web

# Run Convex backend (keep running in separate terminal)
npx convex dev

# Linting
pnpm lint
```

## Architecture

### Frontend (Expo Router - File-Based Routing)

- `app/` - Routes using file-based routing. Groups like `(tabs)` organize navigation.
- `app/_layout.tsx` - Root layout with ConvexProvider
- `app/(tabs)/_layout.tsx` - Bottom tab navigation (3 tabs)
- `lib/components/` - Reusable UI components
- `lib/consts/theme.ts` - Design tokens (colors, spacing)
- `lib/types.ts` - Shared TypeScript types

### Backend (Convex)

- `convex/schema.ts` - Database schema (users, places, reviews tables)
- `convex/types.ts` - TypeScript types for Convex data
- `convex/_generated/` - Auto-generated types (don't edit)

Convex queries/mutations go in `convex/*.ts` files and are automatically synced when `npx convex dev` is running.

### Data Model

- **users**: firstName, lastName, email
- **places**: restaurants/cafes with status ("want_to_try" | "visited"), category, Google Place ID
- **reviews**: ratings (taste, price, service, coffee) on 1-10 scale, foodsEaten array, notes

## Design System

Purple-themed with retro/playful aesthetic:

- Primary: `#8A3DFF`, Dark: `#5D00B0`
- Bold borders (2-3px), hard shadows (no blur)
- Spacing tokens in `lib/consts/theme.ts`: xs(4), sm(8), md(12), lg(16), xl(24)
