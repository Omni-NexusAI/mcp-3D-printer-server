/* Security-focused runtime configuration with validation */
import os from 'os';
import path from 'path';

function parseOrigins(val?: string): ReadonlyArray<string> {
  if (!val) return [];
  return String(val)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function isValidHost(h: string): boolean {
  // Allow localhost by default; otherwise require non-empty hostname/IP
  return typeof h === 'string' && h.length > 0;
}

function isValidPort(p: string | number): boolean {
  const n = Number(p);
  return Number.isInteger(n) && n > 0 && n < 65536;
}

function getEnv(name: string, def: string): string {
  const v = process.env[name];
  return v === undefined || v === '' ? def : v;
}

export const SERVER_HOST = getEnv('SERVER_HOST', '127.0.0.1');
export const SERVER_PORT_RAW = getEnv('SERVER_PORT', '3000');
export const CORS_ALLOWED_ORIGINS = parseOrigins(process.env.CORS_ALLOWED_ORIGINS);
export const WORKSPACE_DIR = getEnv('WORKSPACE_DIR', path.join(os.tmpdir(), 'mcp_workspace'));

if (!isValidHost(SERVER_HOST)) {
  throw new Error('Invalid SERVER_HOST');
}
if (!isValidPort(SERVER_PORT_RAW)) {
  throw new Error('Invalid SERVER_PORT');
}
if (!path.isAbsolute(WORKSPACE_DIR)) {
  throw new Error('WORKSPACE_DIR must be an absolute path');
}
for (const origin of CORS_ALLOWED_ORIGINS) {
  try {
    new URL(origin);
  } catch {
    throw new Error(`Invalid URL in CORS_ALLOWED_ORIGINS: ${origin}`);
  }
}

export const SERVER_PORT = Number(SERVER_PORT_RAW);
