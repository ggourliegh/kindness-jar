// Script to generate PNG icons from SVG data
// Run with: node generate-icons.js

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// SVG templates
const svgs = {
  '192': `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' fill='#FF6B6B' rx='48'/><text x='96' y='140' font-size='120' text-anchor='middle' fill='white'>💕</text></svg>`,
  '512': `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='#FF6B6B' rx='128'/><text x='256' y='380' font-size='320' text-anchor='middle' fill='white'>💕</text></svg>`,
  '180': `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' fill='#FF6B6B' rx='45'/><text x='90' y='132' font-size='112' text-anchor='middle' fill='white'>💕</text></svg>`
};

// Create PNG from SVG
async function createPNG(svgString, size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Convert SVG to data URL
  const svgDataUrl = 'data:image/svg+xml;base64,' + Buffer.from(svgString).toString('base64');

  try {
    const img = await loadImage(svgDataUrl);
    ctx.drawImage(img, 0, 0, size, size);

    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Created: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error creating ${outputPath}:`, error.message);
  }
}

// Generate all icons
async function generateIcons() {
  console.log('🎨 Generating PWA icons...\n');

  await createPNG(svgs['192'], 192, 'icons/icon-192x192.png');
  await createPNG(svgs['512'], 512, 'icons/icon-512x512.png');
  await createPNG(svgs['180'], 180, 'icons/apple-touch-icon.png');

  console.log('\n✨ All icons generated successfully!');
}

generateIcons().catch(console.error);
