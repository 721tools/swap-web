import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api': 'http://dev.721tools.xyz',
      '/ws': {
        target: 'ws://dev.721tools.xyz',
        ws: true,
        changeOrigin: true,
        onProxyReq: function (request) {
          request.setHeader('origin', 'http://dev.721tools.xyz')
        }
      }
    }
  }
})
