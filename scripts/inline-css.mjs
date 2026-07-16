#!/usr/bin/env node
// Inlines css/site.css into index.html between the INLINE-CSS markers so the
// landing page has no render-blocking stylesheet. site.css stays the source of
// truth (also used by /cv/). Run after editing site.css:
//   node scripts/inline-css.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(join(root, 'css/site.css'), 'utf8');
const htmlPath = join(root, 'index.html');
let html = await readFile(htmlPath, 'utf8');

// Minify: strip comments and collapse whitespace (safe for this hand-written CSS).
const min = css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

const start = '/* INLINE-CSS:START */';
const end = '/* INLINE-CSS:END */';
const re = new RegExp(
  start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
);
if (!re.test(html)) {
  console.error('INLINE-CSS markers not found in index.html');
  process.exit(1);
}
html = html.replace(re, `${start}${min}${end}`);
await writeFile(htmlPath, html);
console.log(`Inlined css/site.css (${min.length} bytes minified) into index.html`);
