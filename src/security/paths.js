/* Path safety helpers to constrain file operations */
const path = require('path');

function isPathInside(parent, child) {
  const rel = path.relative(parent, child);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function safeJoin(baseDir, ...segments) {
  const target = path.join(baseDir, ...segments);
  const base = path.resolve(baseDir);
  const resolved = path.resolve(target);
  if (!isPathInside(base, resolved) && resolved !== base) {
    throw new Error('Path traversal detected');
  }
  return resolved;
}

module.exports = { isPathInside, safeJoin };
