# My Cloud — Unified Google Accounts (Starter)

A modular monorepo for a virtual unified layer over multiple Google accounts. Google quotas are **not merged**; storage figures are an application-level aggregate. V1 stores each complete file in one Google Drive account (no chunking).

## Status
- **Implemented foundation:** Next.js dashboard shell, Express/TypeScript API, Prisma/PostgreSQL schema, password auth endpoints, storage-balancing module + tests, Docker Compose, env templates.
- **Not yet enabled:** Google OAuth, Drive/Gmail API operations, background worker, production-grade email/password reset, production deployment. These require real Google Cloud configuration and a security review. No fake provider integration is included.
- This is a starter, not yet production-ready. Review `docs/SECURITY.md` before exposing it publicly.

## Requirements
- Windows 10/11
- Node.js 20+ and npm
- Docker Desktop (recommended for PostgreSQL)

## Run locally
1. Install Node.js LTS and Docker Desktop.
2. Extract this ZIP.
3. Copy `apps/api/.env.example` to `apps/api/.env`; set a long random `JWT_SECRET` and `TOKEN_ENCRYPTION_KEY` (32-byte key encoded as 64 hex characters).
4. Copy `apps/web/.env.example` to `apps/web/.env.local`.
5. In the project root, run `docker compose up -d postgres`.
6. Open a terminal in `apps/api`, run `npm install`, then `npm run prisma:generate`, `npm run prisma:migrate`, and `npm run dev`.
7. Open another terminal in `apps/web`, run `npm install`, then `npm run dev`.
8. Visit http://localhost:3000. API health: http://localhost:4000/health.

> The auth implementation is a development foundation. Before production, add email verification, password reset, session revocation, rate limiting backed by a shared store, security testing, and reviewed cookie/session settings.

## Monorepo
- `apps/web`: Next.js frontend
- `apps/api`: Express API and Prisma data model
- `packages/core`: storage balancing logic and tests
- `docs`: architecture, API contract, OAuth flow, roadmap, security notes

## Important design rules
1. Each connected Google account remains independent.
2. Never return Google refresh tokens to the browser.
3. Every resource lookup must enforce application-user ownership.
4. Never route uploads to unavailable/disconnected accounts.
5. V1 uploads a whole file to one account.
6. Google OAuth scopes and verification requirements must be reviewed against current Google policies before launch.
