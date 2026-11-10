// Makes dist/ work from file:// as well as from a server (demo review screenshots: site_capture.mjs capture file://…/dist/index.html).
// Root-absolute asset paths become relative: index.html → ./_astro, ./img; CSS in _astro → ./font.woff2.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.cwd(), 'dist');
for (const f of fs.readdirSync(dist).filter((n) => n.endsWith('.html'))) {
  const p = path.join(dist, f);
  const html = fs.readFileSync(p, 'utf8').replace(/(href|src|srcset)="\/(_astro|img)\//g, '$1="./$2/').replace(/url\(\/_astro\//g, 'url(./_astro/');
  fs.writeFileSync(p, html);
}
const assets = path.join(dist, '_astro');
for (const f of fs.readdirSync(assets).filter((n) => n.endsWith('.css'))) {
  const p = path.join(assets, f);
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(/url\(\/_astro\//g, 'url(./'));
}
