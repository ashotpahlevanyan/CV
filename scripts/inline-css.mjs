#!/usr/bin/env node
// Inlines css/site.css into index.html and cv/index.html between the INLINE-CSS
// markers so neither page has a render-blocking stylesheet. site.css stays the
// source of truth. Run after editing site.css:
//   node scripts/inline-css.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(join(root, 'css/site.css'), 'utf8');

// Minify: strip comments and collapse whitespace (safe for this hand-written CSS).
const min = css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

const start = '/* INLINE-CSS:START */';
const end = '/* INLINE-CSS:END */';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const re = new RegExp(esc(start) + '[\\s\\S]*?' + esc(end));

for (const rel of ['index.html', 'cv/index.html']) {
  const htmlPath = join(root, rel);
  let html = await readFile(htmlPath, 'utf8');
  if (!re.test(html)) {
    console.error(`INLINE-CSS markers not found in ${rel}`);
    process.exit(1);
  }
  html = html.replace(re, `${start}${min}${end}`);
  await writeFile(htmlPath, html);
  console.log(`Inlined css/site.css (${min.length} bytes minified) into ${rel}`);
}
