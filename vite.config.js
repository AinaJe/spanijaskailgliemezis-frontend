// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pārliecinieties, ka šī bāzes URL ir pareiza.
  // Tai jābūt jūsu GitHub repozitorija nosaukumam ar slīpsvītru sākumā un beigās.
  // Piemēram, ja jūsu repozitorijs ir 'my-react-app', tad tas būtu '/my-react-app/'
  base: '/spanijaskailgliemezis-frontend/', // Jūsu GitHub repozitorija nosaukums

  build: {
    // Nodrošina, ka izvades mape ir 'dist' (noklusējuma vērtība)
    outDir: 'dist',

    // Šīs opcijas palīdz kontrolēt ģenerēto failu nosaukumus,
    // nodrošinot, ka resursu ceļi ir pareizi pat apakšceļos.
    rollupOptions: {
      output: {
        // Kontrolē JavaScript failu nosaukumus
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        // Kontrolē CSS un citu statisko resursu failu nosaukumus
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Nodrošina, ka statiskie resursi tiek pareizi iekļauti
    // un to ceļi tiek atrisināti attiecībā pret bāzes URL.
    assetsDir: 'assets', // Resursu mape dist/
  },
})