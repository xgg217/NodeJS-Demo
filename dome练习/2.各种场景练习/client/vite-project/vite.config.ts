import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import'
const { resolve } = require('path');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }]
    })
  ],
  base: './',
  // 定义相对路径，@代替
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3100",
      }
    }
  }
})

// export default viteConfig
