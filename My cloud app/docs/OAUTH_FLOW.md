# Google OAuth flow (Phase 2 — implementation checklist)

1. Create a Google Cloud project; enable Drive API and Gmail API.
2. Configure OAuth consent screen, authorized domains, privacy policy, terms, and test users.
3. Register a web OAuth client with exact redirect URI(s).
4. Backend creates a cryptographically random `state`, stores it server-side with user ID, expiry, and one-time-use status, then redirects to Google.
5. Request offline access only when needed. Ask for minimum scopes; start with read-only scopes for V1.
6. Callback validates `state` and user session binding, exchanges code server-side, fetches stable Google subject ID and email, and associates the account with the current application user.
7. Encrypt refresh token before database storage using a key outside the database. Never send refresh tokens to the frontend or log tokens/codes.
8. Handle absent refresh token on repeat consent carefully; do not overwrite a good token with an empty value.
9. On disconnect, disable account routing, revoke authorization where supported, delete token material, and mark related sync jobs accordingly.
10. Handle revocation, `invalid_grant`, rate limits, retries with exponential backoff and jitter.

Google scopes can trigger sensitive/restricted-scope verification and possibly a security assessment. Verify current official Google documentation and policy for the exact scopes before production. Do not bypass verification or consent.
