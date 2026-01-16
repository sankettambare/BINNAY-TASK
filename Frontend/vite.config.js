import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/BINNAY-TASK/',   // 👈 repo name (CASE-SENSITIVE)
  build: {
    outDir: 'docs'        // 👈 VERY IMPORTANT
  }
})
