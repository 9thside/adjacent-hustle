import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        methodology: resolve(__dirname, 'methodology.html'),
        about:       resolve(__dirname, 'about.html'),
        contact:     resolve(__dirname, 'contact.html'),
        careers:     resolve(__dirname, 'careers.html'),
      },
    },
  },
})
