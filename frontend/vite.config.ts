import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  // define the plugins that Vite should use

  plugins: [react()],

  // define which port the preview server should run on

  //preview: {
    //host: true,
    //port: 5000
  //}
})
