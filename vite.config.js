import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates service worker
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Alaya Arts - Feel the Stuff',
        short_name: 'Alaya Arts',
        description: 'Alaya Arts - Feel the Stuff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  server: { port: 3000 },
});
