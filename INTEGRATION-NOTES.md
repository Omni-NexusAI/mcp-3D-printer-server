# Integration Notes

Where to wire these changes
- In your server entry (e.g., src/index.js or src/server.js):
  const { SERVER_HOST, SERVER_PORT } = require('./security/config');
  const { corsCheck } = require('./security/cors');
  const { safeJoin } = require('./security/paths');
  const { redactSecrets } = require('./security/redaction');

HTTP server binding
- Bind the server to SERVER_HOST and SERVER_PORT.

CORS
- If you use a CORS middleware, implement a dynamic origin function that calls corsCheck(origin) and allows only configured origins.

File operations
- When reading/writing STL or temp files, resolve with safeJoin(WORKSPACE_DIR, relativePath) and reject traversal attempts.

Logging
- Wrap any logs that may contain user-supplied or secret-like content with redactSecrets().
