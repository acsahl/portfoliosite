import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The fonts that paint the first screen. Preloading them lets the hero
// nameplate render in Playfair right away instead of swapping in late.
const CRITICAL_FONTS = [
  /playfair-display-latin-wght-normal.*\.woff2$/,
  /playfair-display-latin-wght-italic.*\.woff2$/,
  /geist-latin-wght-normal.*\.woff2$/,
]

function preloadCriticalFonts() {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const files = Object.keys(ctx.bundle).filter((file) =>
          CRITICAL_FONTS.some((pattern) => pattern.test(file)),
        )
        return {
          html,
          tags: files.map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head',
          })),
        }
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadCriticalFonts()],
})
