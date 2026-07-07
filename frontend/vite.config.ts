import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/proxy/token': {
        target: 'https://entreprise.francetravail.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace('/proxy/token', '/connexion/oauth2/access_token'),
      },
      '/proxy/api': {
        target: 'https://api.francetravail.io',
        changeOrigin: true,
        rewrite: (path) => path.replace('/proxy/api', ''),
      },
    },
  },
})
