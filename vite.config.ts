import path from 'path'

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
      '@': path.resolve('./src') // @代替src
    }
  },
  server: {
    host: '127.0.0.1', //自定义主机名
    port: 8991, //自定义端口
    https: false, // https是否开启,
    proxy: {
      '/api': {
        target: 'https://devapi.qweather.com',
        changeOrigin: true,
        rewrite: (path)=> {
          return '/v7/weather' + path;
        },
      },
      '/city': {
        target: 'https://geoapi.qweather.com',
        changeOrigin: true,
        rewrite: (path)=> {
          return '/v2' + path;
        },
      }
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
