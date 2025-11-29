import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Update aplikasi otomatis jika ada versi baru
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      
      // --- KONFIGURASI OFFLINE (WORKBOX) ---
      workbox: {
        // 1. Cache aset statis (HTML, CSS, JS, Gambar lokal)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        
        runtimeCaching: [
          {
            // 2. Cache Google Fonts (Agar font tidak hilang saat offline)
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 tahun
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // 3. Cache Data API Backend (PENTING: Agar data wisata muncul saat offline)
            // URL ini sudah disesuaikan dengan backend Vercel Anda
            urlPattern: /^https:\/\/wisata-kitaa\.vercel\.app\/api\/.*/i, 
            handler: 'NetworkFirst', // Coba internet dulu, kalau mati baru ambil dari cache
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 1 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
             // 4. Cache Gambar dari Supabase Storage
             // Pola regex ini (.*) artinya "apa saja", jadi Anda TIDAK PERLU mengubahnya
             // Dia akan otomatis mencocokkan link: https://[project-id].supabase.co/storage/...
             urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
             handler: 'CacheFirst', // Ambil cache dulu biar loading gambar cepat
             options: {
               cacheName: 'supabase-image-cache',
               expiration: {
                 maxEntries: 150,
                 maxAgeSeconds: 60 * 60 * 24 * 7 // 1 minggu
               },
               cacheableResponse: {
                 statuses: [0, 200]
               }
             }
          }
        ]
      },

      // --- TAMPILAN APLIKASI (MANIFEST) ---
      manifest: {
        name: 'Katalog wisata Centraloka',
        short_name: 'Centraloka',
        description: 'Aplikasi Katalog Wisata Terbaik',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Tampil seperti aplikasi native (tanpa bar browser)
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png', // Pastikan file ini ada di folder 'frontend/public'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Pastikan file ini ada di folder 'frontend/public'
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})