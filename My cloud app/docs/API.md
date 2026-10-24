# API contract (initial proposal)

Base URL: `/api/v1`. JSON unless stated otherwise. Require application authentication for all endpoints except signup/login/health.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Liveness |
| POST | `/auth/signup` | Create application account |
| POST | `/auth/login` | Start application session |
| GET | `/me` | Current user |
| GET | `/accounts` | List connected Google accounts (no tokens) |
| POST | `/accounts/google/connect` | Start OAuth flow (Phase 2) |
| DELETE | `/accounts/:id` | Disconnect account and erase stored token |
| GET | `/drive/files` | List virtual file metadata |
| GET | `/drive/search?q=` | Search connected Drive indexes |
| POST | `/drive/uploads` | Create upload job; worker chooses provider account |
| GET | `/drive/files/:id/download` | Authorize and stream provider file |
| GET | `/gmail/messages` | Unified mailbox |
| GET | `/gmail/search?q=` | Search connected Gmail accounts |
| GET | `/gmail/threads/:id` | Read thread from owning provider account |
| GET | `/jobs/:id` | Job status |

Return generic auth errors; do not expose stack traces, provider tokens, or sensitive provider payloads.
