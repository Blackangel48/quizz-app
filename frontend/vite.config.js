import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permet l'accès externe (important pour Docker)
    port: 5173,
    watch: {
      usePolling: true, // Aide à détecter les changements de fichiers sous Docker/Windows/Linux
    },
  },
})