import { fileURLToPath, URL } from 'node:url'
import vuetify from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173
  }
}
