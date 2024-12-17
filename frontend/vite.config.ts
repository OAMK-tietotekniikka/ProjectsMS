import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  // define the plugins that Vite should use

  plugins: [react()],

  // define which port the preview server should run on
  build: {
    minify: false, // Disable minification
    sourcemap: true, // Optional: Include source maps for better debugging
  },

  preview: {
    host: true,
    port: 5000
  }
})
