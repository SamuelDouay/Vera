import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
 server: {
    host: 'localhost',
    port: 3000,
    // Optionnel : forcer le HMR à utiliser HTTP au lieu de WebSocket
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})