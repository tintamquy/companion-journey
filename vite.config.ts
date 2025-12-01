import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-headers',
      closeBundle() {
        // Copy _headers to dist after build
        try {
          copyFileSync(
            join(__dirname, 'public', '_headers'),
            join(__dirname, 'dist', '_headers')
          )
          copyFileSync(
            join(__dirname, 'public', '_redirects'),
            join(__dirname, 'dist', '_redirects')
          )
        } catch (error) {
          console.warn('Failed to copy _headers/_redirects:', error)
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'ui-vendor': ['framer-motion', 'canvas-confetti'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
