// Snapshots the built SPA's rendered DOM back into dist/index.html so crawlers
// and link-unfurlers that don't execute JS (or delay JS rendering) still see
// real content. The app still hydrates normally on load for real visitors.
import { chromium } from 'playwright'
import { preview } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')

const previewServer = await preview({ root, preview: { port: 4173 } })
const url = previewServer.resolvedUrls.local[0]

try {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  const appHtml = await page.$eval('#app', el => el.outerHTML)
  await browser.close()

  const indexPath = resolve(distDir, 'index.html')
  const html = await readFile(indexPath, 'utf-8')
  const prerendered = html.replace(
    /<div id="app"><\/div>/,
    appHtml
  )
  await writeFile(indexPath, prerendered)

  console.log('Prerendered dist/index.html')
} catch (err) {
  // Never fail the whole build over prerendering: dist/index.html falls back
  // to the plain client-rendered shell, which still works fine for users.
  console.warn('Skipping prerender step:', err.message)
} finally {
  await new Promise((res) => previewServer.httpServer.close(res))
}
