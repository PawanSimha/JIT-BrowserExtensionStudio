import fs from 'fs';
import path from 'path';

const src = 'dist/extension';
const dest = '.';

if (!fs.existsSync(src)) {
  console.error('Build output not found at', src);
  console.error('Run `npm run build` first.');
  process.exit(1);
}

let count = 0;
for (const entry of fs.readdirSync(src)) {
  const srcPath = path.join(src, entry);
  const destPath = path.join(dest, entry);
  fs.cpSync(srcPath, destPath, { recursive: true, force: true });
  count++;
}

console.log(`Copied ${count} entries from ${src} to project root.`);
