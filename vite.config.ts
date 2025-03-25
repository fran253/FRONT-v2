import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    hmr: {
      protocol: 'ws'
    },
    proxy: {
      'https://localhost:7278/api': {
        target: 'http://localhost:7278', 
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.options.agent = false;
          proxy.options.headers = {
            'Connection': 'keep-alive'
          };
        }
      }
    }
  }
})