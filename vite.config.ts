import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@layout', replacement: '/src/layout' },


      { find: '@http', replacement: '/src/plugins/axios.ts' },
      { find: '@auth', replacement: '/src/plugins/auth.ts' },
      { find: '@crut', replacement: '/src/plugins/http-models.js' },


      { find: '@login', replacement: '/src/store/login' },
      { find: '@register', replacement: '/src/store/register' },
      { find: '@brands', replacement: '/src/store/brands' },
      { find: '@models', replacement: '/src/store/models' },
      { find: '@products', replacement: '/src/store/products' }
      




    ]
  }
})
