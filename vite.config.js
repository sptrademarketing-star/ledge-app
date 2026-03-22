import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ledge — Voice Finance',
        short_name: 'Ledge',
        description: 'Speak it. Track it. Budget it.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F7F6F3',
        theme_color: '#0F1F3D',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})