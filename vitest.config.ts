import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "path"
 
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['test/vitest.setup.ts'],
    globalSetup: './test/global.setup.ts'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})