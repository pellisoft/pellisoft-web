const fs = require('fs')
const src = fs.readFileSync('docs/pellisoft-images-logo/Teruel_in_Spain_(plus_Canarias).svg', 'utf8')
const re = /fill="#C12838" d="([^"]+)"/s
const m = re.exec(src)
const p = m[1].replace(/\s+/g, ' ').trim()
fs.writeFileSync('scripts/teruel-path.txt', p)
console.log('chars:', p.length)
console.log('first 100:', p.substring(0, 100))
console.log('last 80:', p.slice(-80))
