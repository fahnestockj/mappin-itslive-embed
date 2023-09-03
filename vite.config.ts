import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/build-options.html#build-rollupoptions
// https://rollupjs.org/configuration-options/#output-entryfilenames

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'mappin-build.js',
        chunkFileNames: 'mappin-build.js',
        assetFileNames: (info) => {
          if(info.name.includes('css')) {
            return 'mappin-build.css'
          }
          return '[name].[ext]'
        }
      }
    }
  }
})
