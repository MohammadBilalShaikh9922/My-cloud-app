# Development roadmap

## Phase 1 — Foundation
- [x] Next.js dashboard shell and navigation
- [x] Express API foundation and health endpoint
- [x] PostgreSQL schema using Prisma
- [x] Initial signup/login endpoints
- [x] Storage balancing module and tests
- [ ] Production auth hardening, email verification/reset, full test suite

## Phase 2 — Google connection
- [ ] Google Cloud setup, OAuth state/session binding
- [ ] Encrypted refresh-token storage and account listing/disconnect
- [ ] Scope review and OAuth verification plan

## Phase 3 — Drive
- [ ] Provider adapter and read-only metadata sync
- [ ] Virtual file ID mapping, unified list/search/download
- [ ] Upload jobs, capacity checks, balancing, retries and reconciliation
- [ ] Rename/move/trash/restore with ownership checks

## Phase 4 — Gmail
- [ ] Read-only message listing/search/thread view
- [ ] Account source indicator; minimize stored content
- [ ] Attachment handling with safe limits

## Phase 5 — Synchronization
- [ ] Queue + worker (e.g. Redis/BullMQ)
- [ ] Drive/Gmail sync cursors and supported notifications
- [ ] Retry/backoff, idempotency, dead-letter handling and monitoring

## Phase 6 — Production
- [ ] Threat model and independent security review
- [ ] OAuth verification/security assessment if applicable
- [ ] Privacy policy, terms, deletion/export flow
- [ ] Monitoring, backups/restore drills, deployment and load testing
