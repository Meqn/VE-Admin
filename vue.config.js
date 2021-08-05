/* eslint-disable indent */
const glob = require('glob')
const path = require('path')
const fs = require('fs')

const resolve = dir => path.join(__dirname, dir)

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

module.exports = {
  pages,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      // 设置别名
      alias: {
        '@': resolve('src'),
        ...appAlias
      }
    }
  },
  chainWebpack(config) {
    // 定义全局变量
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env'] = Object.assign(definitions[0]['process.env'], {
        APP_MODE: 'MPA'
      })
      return definitions
    })
    // < 5kb 的图片转base64
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 5120 }))
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}
