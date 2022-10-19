import path from 'path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginMars3d } from 'vite-plugin-mars3d'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export default ({ mode }: ConfigEnv) => {
  const root = process.cwd()

  const ENV = loadEnv(mode, root)
  console.log('🚀 ~ file: vite.config.ts ~ line 17 ~ ENV', ENV)

  return defineConfig({
    base: ENV.VITE_BASE_URL,
    define: {
      'process.env': {
        mode,
        BASE_URL: ENV.VITE_BASE_URL,
      },
      'buildTime': new Date(),
    },
    resolve: {
      alias: {
        '@mars': path.join(__dirname, 'src'),
        '@': path.join(__dirname, 'src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    optimizeDeps: {
      include: ['kml-geojson', '@mars/common/store/widget'],
    },
    json: {
      // 支持从 .json 文件中进行按名导入
      namedExports: true,
      stringify: false,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, 'src/components/mars-ui/base.less')}";`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          rewrite: path => path.replace(/^\/api/, ''),
          target: `http://${ENV.VITE_API_URL}`,
        },
      },
    },
    build: {
      // 输出路径
      outDir: path.join('./dist', ENV.VITE_BASE_URL),
      // 小于此阈值的导入或引用资源将内联为 base64 编码， 以避免额外的http请求， 设置为 0, 可以完全禁用此项，
      assetsInlineLimit: 4096,
      // 启动 / 禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 soutrce map 文件
      sourcemap: false,
      // 自定义rollup-commonjs插件选项
      commonjsOptions: {
        include: /node_modules|packages|src\/common\/store/,
      },
      // 当设置为 true, 构建后将会生成 manifest.json 文件
      manifest: false,
      // 设置为 false 可以禁用最小化混淆,或是用来指定是应用哪种混淆器 boolean | 'terser' | 'esbuild'
      // minify: 'terser',
      // 传递给 Terser 的更多 minify 选项
      // terserOptions: {},
      // 设置为false 来禁用将构建好的文件写入磁盘
      write: true,
      // 默认情况下 若 outDir 在 root 目录下， 则 Vite 会在构建时清空该目录。
      emptyOutDir: true,
    },
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
          { 'vue-request': ['useRequest', 'usePagination'] },
          { 'vue/server-renderer': ['renderToString'] },
          {
            'mars3d': [
              ['*', 'mars3d'],
            ],
            '@turf/turf': [
              ['*', 'turf'],
            ],
            'mars3d-cesium': [
              ['*', 'Cesium'],
            ],
          },
        ],
        dirs: [
          './src/api',
          './src/store',
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: true,
      }),
      Pages(),
      Layouts(),
      Components({
        dts: true,
        directoryAsNamespace: true,
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less',
            resolveIcons: true,
          }),
        ],
      }),
      // https://github.com/antfu/unocss
      Unocss(),
      vitePluginMars3d(),
    ],
  })
}
