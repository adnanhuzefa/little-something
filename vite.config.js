import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the built site work from any host or sub-folder
// (Netlify, Vercel, Cloudflare Pages, GitHub Pages ...).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: true }, // lets you open the dev server on your phone (same Wi-Fi)
  build: { target: 'es2019', chunkSizeWarningLimit: 900 },
})
