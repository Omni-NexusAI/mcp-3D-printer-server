/* Security-focused runtime configuration with validation */
const os = require('os');
const path = require('path');

function parseOrigins(val) {
  if (!val) return [];
  return String(val)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function isValidHost(h) {
  // Allow localhost by default; otherwise require non-empty hostname/IP
  return typeof h === 'string' && h.length > 0;
}

function isValidPort(p) {
  const n = Number(p);
  return Number.isInteger(n) && n > 0 && n < 65536;
}

function getEnv(name, def) {
  const v = process.env[name];
  return v === undefined || v === '' ? def : v;
}

const SERVER_HOST = getEnv('SERVER_HOST', '127.0.0.1');
const SERVER_PORT = getEnv('SERVER_PORT', '3000');
const CORS_ALLOWED_ORIGINS = parseOrigins(process.env.CORS_ALLOWED_ORIGINS || '');
const WORKSPACE_DIR = getEnv('WORKSPACE_DIR', path.join(os.tmpdir(), 'mcp_workspace'));

if (!isValidHost(SERVER_HOST)) {
  throw new Error('Invalid SERVER_HOST');
}
if (!isValidPort(SERVER_PORT)) {
  throw new Error('Invalid SERVER_PORT');
}

module.exports = {
  SERVER_HOST,
  SERVER_PORT: Number(SERVER_PORT),
  CORS_ALLOWED_ORIGINS,
  WORKSPACE_DIR,
};
