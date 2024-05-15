import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// 创建别名
const aliases = {
  '@': fileURLToPath(new URL('./src', import.meta.url))
}

// https://vitejs.dev/config/
// 配置Vite
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: aliases
  }
})