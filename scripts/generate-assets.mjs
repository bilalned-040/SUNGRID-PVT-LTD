import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/assets');
const names = {
  brands: { canadian: 'Canadian Solar', jinko: 'Jinko Solar', longi: 'LONGi', aiko: 'AIKO', solax: 'SolaX Power', goodwe: 'GoodWe', genixgreen: 'GenixGreen', 'pakistan-cables': 'Pakistan Cables', cnc: 'CNC Electric', itel: 'itel', inverex: 'Inverex' },
  clients: {
    '3.18.24': 'Pakistan Army Housing Directorate, PDH (South) HQ',
    '3.19.32': 'The Horizon School', '3.20.50': 'United Charter Schools, Jinnah Avenue Campus',
    '3.21.29': 'The Next School, Gulshan Campus', '3.22.11': 'Grow Safe (Pvt) Ltd.',
    '3.24.43': 'Driving License Sindh', '3.31.02': 'Sikandar & Sons', '3.31.25': 'Saya Fashions',
    '3.31.45': 'Jamia Abi Bakr Al-Islamia', '3.31.59': 'Abi Bakr Islamic Academy',
    '3.32.12': 'Jama Masjid Muhammadi', '3.32.21': 'Masjid Aqsa, Block 13, Gulshan-e-Iqbal',
    '3.33.32': 'Muhammad Ali Jauhar Academy School',
  },
  certificates: {
    'WhatsApp Image 2026-10-02 at 16.21.43.jpeg': 'GoodWe training program certificate',
    'WhatsApp Image 2026-10-02 at 16.21.44 (1).jpeg': 'Pylontech technical training certificate',
    'WhatsApp Image 2026-10-02 at 16.21.44.jpeg': 'Solis training certificate',
  },
};
const galleryDescriptions = JSON.parse(await fs.readFile('data/asset-labels.json', 'utf8'));
const manifest = {};
for (const group of ['gallery', 'clients', 'brands', 'certificates']) {
  let files = [];
  try { files = (await fs.readdir(path.join(root, group))).filter(f => /\.(png|jpe?g|webp|avif)$/i.test(f)).sort(); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (!files.length) console.warn(`Assets: ${group} is missing or empty; its page will display a fallback.`);
  manifest[group] = [];
  for (const [index, file] of files.entries()) {
    try {
      const metadata = await sharp(path.join(root, group, file)).metadata();
      const stem = path.parse(file).name;
      let label = group === 'gallery' ? galleryDescriptions[file] || `Solar installation photograph ${index + 1}` : names[group]?.[stem] || names[group]?.[file] || stem.charAt(0).toUpperCase() + stem.slice(1);
      if (group === 'clients') label = Object.entries(names.clients).find(([time]) => file.includes(time))?.[1] || `Client logo ${index + 1}`;
      const rotated = [5, 6, 7, 8].includes(metadata.orientation);
      manifest[group].push({ src: `/assets/${group}/${encodeURIComponent(file)}`, file, label, width: rotated ? metadata.height : metadata.width, height: rotated ? metadata.width : metadata.height, dark: group === 'brands' && stem === 'inverex' });
    } catch { console.warn(`Assets: could not read ${group}/${file}; skipped.`); }
  }
}
await fs.mkdir('data', { recursive: true });
await fs.writeFile('data/assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(Object.entries(manifest).map(([key, items]) => `${items.length} ${key}`).join(' · '));
