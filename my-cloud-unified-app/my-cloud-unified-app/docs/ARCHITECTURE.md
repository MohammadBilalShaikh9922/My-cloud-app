# Architecture

```text
Browser (Next.js)
  | secure app session; never Google tokens
  v
Node.js API (Express)
  |-- Auth & authorization
  |-- Connected-account manager
  |-- Virtual Drive service
  |-- Unified Gmail read/search service
  |-- Upload planner / storage balancer
  |-- Job producer
  v
PostgreSQL <---- Worker / queue (Phase 5)
  |
  +-- user-owned virtual metadata and sync/upload job state

Google OAuth 2.0
  |-- Google Drive API (provider files remain in their source account)
  +-- Gmail API (messages remain in their source account)
```

## Key principle
The application is a virtual index and control layer. It does not combine or change Google's actual quotas. Each virtual file maps to exactly one provider account and one provider file ID.

## Suggested production components
- Web: Next.js
- API: Node.js + TypeScript + Express
- DB: PostgreSQL + Prisma
- Queue: Redis + BullMQ (add in Phase 5)
- Secrets: cloud secret manager + envelope encryption/KMS for refresh tokens
- Observability: structured redacted logs, metrics, error tracking
- Deployment: separate web/API/worker services and managed PostgreSQL

## Ownership model
Every user-owned row includes `userId` or is reachable through a row that does. Query virtual resources with both resource ID and authenticated user ID. Never trust a user-supplied `googleAccountId` without checking its ownership and status.
