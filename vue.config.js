/* eslint-disable indent */
const glob = require('glob')
const path = require('path')
const fs = require('fs')

const resolve = dir => path.join(__dirname, dir)
const isProd = process.env.NODE_ENV === 'production'

// 设置app别名, `@app`
const appAlias = {}
// 所有app入口
const entryUrl = './src/app/**?/app.js'

// App入口列表
const pages = (function (url) {
  const entries = glob.sync(url).map(item => {
    const urlArr = item.split('/')
    const oPath = urlArr.slice(0, urlArr.length - 1).join('/')
    const oName = urlArr[urlArr.length - 2]
    const page = {
      name: oName,
      entry: item,
      template: './public/index.html',
      filename: oName === 'index' ? 'index.html' : `${oName}/index.html`,
      title: oName
    }

    // 设置app别名, `@app`
    appAlias[`@${oName}`] = resolve(oPath)

    try { // 默认模板文件
      const tpl = `${oPath}/app.html`
      fs.accessSync(tpl, fs.constants.F_OK)
      page.template = tpl
    } catch (error) {
      // console.log('default template.')
    }
    try { // 单个App配置
      const cfg = `${oPath}/app.config.js`
      fs.accessSync(cfg, fs.constants.F_OK)
      const { title, output, chunks, disabled } = require(cfg)
      if (title) page.title = title
      if (output) {
        page.filename = output + '/index.html'
      } else if (output === '') {
        page.filename = 'index.html'
      }
      if (chunks) page.chunks = chunks
      page.disabled = !!disabled
    } catch (error) {
      // console.log('default config.')
    }
    return page
  })
  return entries.filter(item => !item.disabled).reduce((acc, item) => {
    acc[item.name] = item
    return acc
  }, {})
}(entryUrl))

if (Object.keys(pages).length === 0) {
  console.log('💥 app.js not found... 💥')
  process.exit(1)
}

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'element-ui': 'ELEMENT',
    nprogress: 'NProgress',
    'js-cookie': 'Cookies',
    echarts: 'echarts'
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/element-ui@2.15.7/lib/index.js',
    '//cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    '//cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js',
    '//cdn.jsdelivr.net/npm/echarts@5.1.2/dist/echarts.min.js'
  ]
}

module.exports = {
  pages,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      // 设置别名
      alias: {
        '@': resolve('src'),
        '@root': resolve('.'),
        ...appAlias
      }
    },
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },
  chainWebpack: config => {
    // 定义全局变量
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env'] = Object.assign(definitions[0]['process.env'], {
        APP_MODE: 'MPA'
      })
      return definitions
    })
    // set svg-sprite-loader (svg icon)
    // 清除svg默认配置对`src/components/Icon/`文件夹的处理
    config.module
      .rule('svg')
      .exclude.add(resolve('src/components/Icon/'))
      .end()
    // 添加新的rule处理`src/components/Icon/`内的svg文件 (暂不使用svgo优化)
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/components/Icon/'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // < 5kb 的图片转base64
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 5120 }))
    // 防止多页面打包卡顿
    config => config.plugins.delete('named-chunks')
    // 生产环境下多页面使用CDN
    if (isProd && Object.keys(pages).length > 0) {
      Object.keys(pages).forEach(app => {
        config.plugin(`html-${app}`).tap(args => {
          args[0].cdn = assetsCDN
          return args
        })
      })
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@use "sass:math";@import "~@/styles/comm/variables.scss";'
      }
    }
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件, transpileDependencies可以设置显式转译依赖
  // https://cli.vuejs.org/config/#transpiledependencies
  // transpileDependencies: Array<string | RegExp>
  transpileDependencies: [
    /[/\\]node_modules[/\\]v-resize-observer[/\\]/
  ]
}
