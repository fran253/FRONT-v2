import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 80,
    strictPort: true,
    cors: true,
    // Lista de dominios permitidos
    allowedHosts: [
      'academiq.retocsv.es',
      'localhost',
      '127.0.0.1'
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 80,
    strictPort: true,
    cors: true,
    // Lista de dominios permitidos
    allowedHosts: [
      'academiq.retocsv.es',
      'localhost',
      '127.0.0.1'
    ]
  }
})