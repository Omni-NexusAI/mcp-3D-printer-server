/* Path safety helpers to constrain file operations */
import path from 'path';

export function isPathInside(parent: string, child: string): boolean {
  const rel = path.relative(parent, child);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

export function safeJoin(baseDir: string, ...segments: string[]): string {
  const target = path.join(baseDir, ...segments);
  const base = path.resolve(baseDir);
  const resolved = path.resolve(target);
  if (!isPathInside(base, resolved) && resolved !== base) {
    throw new Error('Path traversal detected');
  }
  return resolved;
}
