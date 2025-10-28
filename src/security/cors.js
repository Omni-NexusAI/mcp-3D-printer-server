/* CORS helper applying env-driven allowlist */
import { CORS_ALLOWED_ORIGINS } from './config.js';

export function corsCheck(origin?: string): boolean {
  // No origin (e.g., curl) allowed if no allowlist set. If allowlist set, require match.
  if (!origin) return CORS_ALLOWED_ORIGINS.length === 0;
  if (CORS_ALLOWED_ORIGINS.length === 0) return false;
  const ok = CORS_ALLOWED_ORIGINS.some(o => o === origin);
  return ok;
}
