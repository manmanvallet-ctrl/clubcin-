// Assemble le prototype en une seule page HTML autonome (dist-artifact/club-cine.html).
// Usage : npm run build:artifact
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'

execSync('npx vite build --mode artifact --outDir dist-artifact/build', { stdio: 'inherit' })
const dir = 'dist-artifact/build/assets/'
const read = (ext) => readFileSync(dir + readdirSync(dir).find((f) => f.endsWith(ext)), 'utf8')
const js = read('.js').replaceAll('</script', '<\\/script')
const html = `<title>Club Ciné</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>${read('.css')}</style>
<div id="root"></div>
<script type="module">${js}</script>
`
mkdirSync('dist-artifact', { recursive: true })
writeFileSync('dist-artifact/club-cine.html', html)
console.log('dist-artifact/club-cine.html', Math.round(html.length / 1024) + ' Ko')
