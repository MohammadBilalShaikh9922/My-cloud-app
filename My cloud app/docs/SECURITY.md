# Security checklist

This ZIP is a development foundation, not a production security certification.

- [ ] HTTPS at every public endpoint
- [ ] Secure, HttpOnly, SameSite cookies for browser sessions; CSRF defenses for cookie-authenticated mutations
- [ ] Strong password hashing (bcrypt/Argon2), password reset, email verification, login throttling
- [ ] Session rotation, expiry, revocation and logout-all-sessions
- [ ] Strict CORS allowlist; no wildcard in production
- [ ] Request validation and payload/file size limits
- [ ] Rate limiting using a shared store
- [ ] Encrypt Google refresh tokens using KMS/envelope encryption; key separate from DB
- [ ] Never expose/log OAuth tokens, passwords, authorization codes or email bodies
- [ ] Enforce user ownership on every query and mutation; test cross-user access
- [ ] OAuth state, redirect URI, PKCE where appropriate, and callback validation
- [ ] Minimal OAuth scopes; privacy policy, terms, retention/deletion policy
- [ ] Redacted audit logs, backups, restore tests, monitoring and incident response
- [ ] Malware/content scanning and safe download headers if serving uploaded files
- [ ] Google OAuth verification and API policy review before production
