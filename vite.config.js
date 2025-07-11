// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // JAUNS: pievienojiet `base` īpašību
  base: '/spanijaskailgliemezis-frontend/', // Repozitorija nosaukums GitHub Pages 1
})