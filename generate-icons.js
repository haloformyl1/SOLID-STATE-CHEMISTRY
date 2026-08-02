import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'public', 'favicon.svg');
const icon192 = path.join(process.cwd(), 'public', 'pwa-192x192.png');
const icon512 = path.join(process.cwd(), 'public', 'pwa-512x512.png');
const appleIcon = path.join(process.cwd(), 'public', 'apple-touch-icon.png');

async function generate() {
  const svgBuffer = fs.readFileSync(svgPath);

  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(icon192);

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(icon512);

  // Apple touch icon is typically 180x180 and usually opaque background (SVG already has #06131d background)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(appleIcon);

  console.log('Icons generated successfully!');
}

generate().catch(console.error);
