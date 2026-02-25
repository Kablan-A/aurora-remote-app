import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/Header',
        './Form': './src/components/Form',
        './Input': './src/components/Input',
        './Catalog': './src/components/Catalog',
        './NotificationManager': './src/components/NotificationManager',
        './emitter': './src/emitter',
      },
      shared: ['react', 'react-dom'],
    })
  ],
  build: {
    cssCodeSplit: false
  },
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
    cors: true,
  }
})