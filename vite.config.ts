import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src') // @代替src
    }
  },
  server: {
    host: '127.0.0.1', //自定义主机名
    port: 5180, //自定义端口
    https: false, // https是否开启,
    proxy: {
      '/api': {
        target: 'https://devapi.qweather.com/v7/weather',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '')
        }
      },
      '/city': {
        target: 'https://geoapi.qweather.com/v2/city/lookup',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/city/, '')
        }
      },
      '/province': {
        target: 'https://restapi.amap.com/v3/config/district',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/province/, '')
        }
      },
      '/country': {
        target: 'https://restapi.amap.com/v3/config/district',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/country/, '')
        }
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   hack: `true; @import (reference) "${path.resolve('src/assets/css/base.less')}";`
        // },
        // globalVars: {
        //   // 全局变量
        //   mainColor: "red",
        // },
        javascriptEnabled: true,
        math: 'always' // 括号内才使用数学计算
      }
    }
  }
})
