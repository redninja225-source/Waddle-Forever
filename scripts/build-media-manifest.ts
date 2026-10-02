import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { OUT_DIR, createOut } from './zip';
import { VERSION } from '../src/common/constants';

const MEDIA_DIR = path.join(__dirname, '..', 'media');

const listFiles = (dir: string): string[] => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(full));
    } else if (entry.isFile() && entry.name !== '.version') {
      files.push(full);
    }
  }
  return files;
};

const hashMediaDir = (dir: string): string => {
  const hash = crypto.createHash('sha256');
  const files = listFiles(dir).sort();
  for (const file of files) {
    const relative = path.relative(dir, file).replace(/\\/g, '/');
    hash.update(relative);
    hash.update(crypto.createHash('sha256').update(fs.readFileSync(file)).digest());
  }
  return hash.digest('hex');
};

createOut();

(async () => {
  const media: Record<string, string> = {};
  for (const dir of fs.readdirSync(MEDIA_DIR)) {
    const fullDir = path.join(MEDIA_DIR, dir);
    if (fs.lstatSync(fullDir).isDirectory()) {
      console.log(`Hashing media/${dir}...`);
      media[dir] = hashMediaDir(fullDir);
    }
  }

  const manifest = { version: VERSION, media };
  const outPath = path.join(OUT_DIR, 'media-manifest.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  console.log(`Wrote ${outPath}`);
})();
