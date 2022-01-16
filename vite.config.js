import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //设置公共基础路径
  base: isProduction ? './' : '/',
  server: {
    //设置端号
    port: 3090,
    //设置浏览器自动打开
    open: true,
    //设置反向代理
    proxy: {
      '/api': {
        target: 'https://localhost:3090',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    //设置别名
    alias: {
      'vue':  'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, './src')
    },
    //省略扩展名
    extensions:['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    // 设置全局样式
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/globe.scss";'
      }
    }
  }
})
