/* Redaction utility for logs to avoid leaking secrets */
const SECRET_KEYS: ReadonlyArray<string> = [
  'AUTH', 'TOKEN', 'SECRET', 'PASSWORD', 'API_KEY', 'ACCESS_KEY', 'GITHUB_TOKEN', 'OPENAI_API_KEY'
];

export function redactSecrets(input: any): string {
  if (input == null) return input;
  let s = typeof input === 'string' ? input : JSON.stringify(input);
  for (const key of SECRET_KEYS) {
    const re = new RegExp(`${key}=[^\s&]+`, 'gi');
    s = s.replace(re, `${key}=[REDACTED]`);
  }
  // Generic hex-like tokens
  s = s.replace(/[A-Za-z0-9_\-]{20,}/g, '[REDACTED]');
  return s;
}
