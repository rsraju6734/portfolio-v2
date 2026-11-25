import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes every asset path relative, so the built site works on
// GitHub Pages at https://rsraju6734.github.io/<any-repo-name>/ without changes.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: { gsap: ['gsap'] },
      },
    },
  },
})
