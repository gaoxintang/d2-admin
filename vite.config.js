import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import { visualizer } from 'rollup-plugin-visualizer'

// https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx
import Jsx from '@vitejs/plugin-vue-jsx'

// https://github.com/nekocode/antd-dayjs-vite-plugin
import AntdDayjs from 'antd-dayjs-vite-plugin'

// https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://github.com/hannoeru/vite-plugin-pages
import Pages from 'vite-plugin-pages'

// https://github.com/anncwb/vite-plugin-svg-icons
import SvgIcons from 'vite-plugin-svg-icons'

// https://github.com/antfu/purge-icons
import PurgeIcons from 'vite-plugin-purge-icons'

export default defineConfig({
  plugins: [
    Vue(),
    Jsx(),
    Components({
      resolvers: [
        ElementPlusResolver()
      ]
    }),
    Pages({
      pagesDir: 'src/views',
      exclude: [
        '**/components/*.vue'
      ],
      extensions: ['vue', 'jsx'],
      extendRoute (route, parent) {
        return route
      }
    }),
    AntdDayjs({
      preset: 'antdv3'
    }),
    visualizer({
      open: true
    }),
    PurgeIcons(),
    SvgIcons({
      iconDirs: [
        path.resolve(process.cwd(), 'src/assets/svg/icon')
      ]
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      'd2-projects': '/d2-projects'
    }
  },
  server: {
    open: true
  },
  build: {
    sourcemap: true
  }
})
