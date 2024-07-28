import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates service worker
      manifest: {
        name: 'Alaya Arts - React Ecommerce Store',
        short_name: 'Alaya Arts',
        description: 'Alaya Arts - React Ecommerce Store',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/static/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/static/favicon.png',
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
