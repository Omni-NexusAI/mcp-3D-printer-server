# Security Hardening Guide

This project now ships with secure defaults and utilities. Quick steps:

1) Install deps to materialize overrides
   npm install
   This updates package-lock.json to ensure semver >= 7.5.2 and @babel/runtime >= 7.26.10.
   Commit the lockfile change in this branch so CI/PR builds are deterministic.

2) Bind to localhost by default (recommended)
   Set environment variables:
   - SERVER_HOST=127.0.0.1 (default)
   - SERVER_PORT=3000
   Deploy behind a reverse proxy with TLS for remote access.

3) Configure CORS allowlist
   - CORS_ALLOWED_ORIGINS=https://example.com,https://app.example.com
   Avoid wildcard (*) in production.

4) Secrets redaction
   - Use redactSecrets() for logging; avoid printing API keys/tokens.

5) Path safety for STL/IO
   - Set WORKSPACE_DIR to an absolute directory for file operations.
   - Use safeJoin() and isPathInside() to prevent path traversal.

6) Env validation
   - The config module validates host, port, origins, and workspace.

Integration notes
- Import and use from src/security/config, src/security/paths, src/security/redaction in your server entrypoint.
