import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-mime-types-and-copy-files',
      closeBundle() {
        const distDir = join(__dirname, 'dist')
        const publicDir = join(__dirname, 'public')
        
        // Copy _headers, _redirects, and service worker
        const filesToCopy = ['_headers', '_redirects', 'sw-fix-mime.js']
        filesToCopy.forEach((file) => {
          const srcPath = join(publicDir, file)
          const destPath = join(distDir, file)
          if (existsSync(srcPath)) {
            copyFileSync(srcPath, destPath)
            console.log(`✅ Copied ${file} to dist`)
          }
        })
        
        // Fix index.html
        const indexPath = join(distDir, 'index.html')
        if (existsSync(indexPath)) {
          let html = readFileSync(indexPath, 'utf-8')
          
          // Remove duplicate type="module" - fix pattern
          html = html.replace(/type="module"\s+type="module"/g, 'type="module"')
          html = html.replace(/type="module"\s+crossorigin/g, 'type="module" crossorigin')
          
          // Ensure all script tags have correct format
          html = html.replace(
            /<script\s+type="module"\s+type="module"/g,
            '<script type="module"'
          )
          
          // Add service worker registration if not present
          if (!html.includes('sw-fix-mime.js')) {
            const headEnd = html.indexOf('</head>')
            if (headEnd > -1) {
              const swScript = `
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw-fix-mime.js').catch(() => {})
        })
      }
    </script>`
              html = html.slice(0, headEnd) + swScript + '\n' + html.slice(headEnd)
            }
          }
          
          writeFileSync(indexPath, html, 'utf-8')
          console.log('✅ Fixed index.html')
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
