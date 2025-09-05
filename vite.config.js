import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
    ,tailwindcss()
  ]
  ,base: '/xenlogistic/'  // <- add for deploying under a subpath
  ,base: '/xenlogistic_dev/'   // <- add for deploying under a subpath
 
})