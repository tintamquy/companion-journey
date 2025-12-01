import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-mime-types',
      closeBundle() {
        const distDir = join(__dirname, 'dist')
        const publicDir = join(__dirname, 'public')
        
        // Copy _headers and _redirects
        const filesToCopy = ['_headers', '_redirects']
        filesToCopy.forEach((file) => {
          const srcPath = join(publicDir, file)
          const destPath = join(distDir, file)
          if (existsSync(srcPath)) {
            copyFileSync(srcPath, destPath)
            console.log(`✅ Copied ${file} to dist`)
          }
        })
        
        // Fix index.html to ensure correct script loading
        const indexPath = join(distDir, 'index.html')
        if (existsSync(indexPath)) {
          let html = readFileSync(indexPath, 'utf-8')
          
          // Remove duplicate type="module" and ensure correct format
          html = html.replace(/type="module"\s+type="module"/g, 'type="module"')
          html = html.replace(/<script([^>]*src="[^"]*\.js[^"]*"[^>]*)(?!.*type="module")>/g, '<script type="module"$1>')
          
          writeFileSync(indexPath, html, 'utf-8')
          console.log('✅ Fixed index.html script tags')
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
