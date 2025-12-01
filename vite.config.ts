import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-headers-files',
      closeBundle() {
        // Copy _headers and _redirects to dist after build
        const publicDir = join(__dirname, 'public')
        const distDir = join(__dirname, 'dist')
        
        const filesToCopy = ['_headers', '_redirects']
        
        filesToCopy.forEach((file) => {
          const srcPath = join(publicDir, file)
          const destPath = join(distDir, file)
          
          if (existsSync(srcPath)) {
            try {
              copyFileSync(srcPath, destPath)
              console.log(`✅ Copied ${file} to dist`)
            } catch (error) {
              console.warn(`⚠️ Failed to copy ${file}:`, error)
            }
          } else {
            console.warn(`⚠️ ${file} not found in public folder`)
          }
        })
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
