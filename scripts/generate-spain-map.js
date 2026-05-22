// generate-spain-map.js
// Extracts Spain province polygons and Teruel path from the Wikipedia locator SVG,
// re-styles for the dark tech theme, and outputs public/spain-map.svg
// Transform: translate(17.05 -9) scale(0.45)
//   maps source peninsula (83-935, 196-740) → viewport (54-437, 79-324)
//   Teruel city (651, 420) → (310, 180)

const fs = require('fs')
const path = require('path')

const srcPath = path.join(__dirname, '..', 'docs', 'pellisoft-images-logo', 'Teruel_in_Spain_(plus_Canarias).svg')
const outPath = path.join(__dirname, '..', 'public', 'spain-map.svg')

const src = fs.readFileSync(srcPath, 'utf8')

// ── Extract Spain group content ──────────────────────────────────────────
const spainStartTag = '<g id="Spain">'
const spainStart = src.indexOf(spainStartTag) + spainStartTag.length

// Find matching </g> by tracking depth
let depth = 1
let pos = spainStart
let spainEnd = -1
while (pos < src.length - 3 && depth > 0) {
  if (src[pos] === '<') {
    if (src.slice(pos, pos + 3) === '<g ') { depth++; pos += 3 }
    else if (src.slice(pos, pos + 4) === '</g>') {
      depth--
      if (depth === 0) { spainEnd = pos; break }
      pos += 4
    } else { pos++ }
  } else { pos++ }
}

if (spainEnd < 0) { console.error('Could not find end of Spain group'); process.exit(1) }
const spainContent = src.slice(spainStart, spainEnd)

// ── Extract all province polygons (FEFEE9 fill) from entire SVG ──────────
const polygonRe = /<polygon[^>]*fill="#FEFEE9"[^>]*\/>/gs
const polygons = []
for (const m of src.matchAll(polygonRe)) {
  let poly = m[0]
  poly = poly.replace(/fill="#FEFEE9"/g, 'fill="#0d1d30"')
  poly = poly.replace(/\s*id="[^"]*"/g, '')
  polygons.push(poly)
}
// Also grab any FDFCEA polygons (some provinces use this variant)
const polygonRe2 = /<polygon[^>]*fill="#FDFCEA"[^>]*\/>/gs
for (const m of src.matchAll(polygonRe2)) {
  let poly = m[0]
  poly = poly.replace(/fill="#FDFCEA"/g, 'fill="#0d1d30"')
  poly = poly.replace(/\s*id="[^"]*"/g, '')
  polygons.push(poly)
}
console.log(`Found ${polygons.length} province polygons`)

// ── Extract Teruel province path (C12838) ────────────────────────────────
const teruelRe = /<path fill="#C12838"[^>]*\/>/gs
const teruelMatch = teruelRe.exec(src)
if (!teruelMatch) { console.error('Teruel path not found'); process.exit(1) }
let teruelPath = teruelMatch[0]
// Dark fill (will be overlaid with animated red in TeruelMap.tsx)
teruelPath = teruelPath.replace('fill="#C12838"', 'fill="#0d1d30"')
teruelPath = teruelPath.replace(/\s*id="[^"]*"/g, '')
console.log(`Teruel path extracted, ${teruelPath.length} chars`)

// ── Build output SVG ─────────────────────────────────────────────────────
const out = [
  '<?xml version="1.0" encoding="utf-8"?>',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">',
  '  <rect width="520" height="460" fill="#050d1a"/>',
  '  <!-- transform: scale(0.45) translate(17.05,-9) — Teruel city(651,420)→(310,180) -->',
  '  <g transform="translate(17.05 -9) scale(0.45)"',
  '     fill="#0d1d30" stroke="rgba(90,130,190,0.22)" stroke-width="1"',
  '     stroke-linejoin="round" stroke-linecap="round">',
  ...polygons.map(p => `    ${p}`),
  '    <!-- Teruel province – animated red overlay applied in TeruelMap.tsx -->',
  `    ${teruelPath}`,
  '  </g>',
  '</svg>',
].join('\n')

fs.writeFileSync(outPath, out, 'utf8')
const size = (fs.statSync(outPath).size / 1024).toFixed(1)
console.log(`Written to ${outPath} (${size} KB)`)
