import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import profileHandler from './api/christian.js'

const profileApi = () => ({
  name: 'profile-api',
  configureServer(server) {
    server.middlewares.use('/api/christian', profileHandler)
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/christian', profileHandler)
  },
})

export default defineConfig({
  plugins: [react(), profileApi()],
  server: {
    port: 3000,
  },
})
