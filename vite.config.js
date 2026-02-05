import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true
  },
  preview: {
    host: true,
    port: 5173,
    // Indha keezha irukkira line dhaan unga prachanaiya theerkkum
    allowedHosts: ["ticketing-system-frontend-production.up.railway.app"]
  }
})