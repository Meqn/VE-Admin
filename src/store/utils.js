/**
 * 自动获取指定目录下所有 modules
 * @param {*} modulesContext queryModules
 * @returns 
 */
export function queryModules(modulesContext) {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  // const modulesContext = require.context(src, true, /\.js$/)

  // you do not need `import app from './modules/app'`
  // it will auto require all vuex module from modules file
  try {
    return modulesContext.keys().reduce((modules, modulePath) => {
      // set './app.js' => 'app'
      const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
      const value = modulesContext(modulePath)
      modules[moduleName] = value.default
      return modules
    }, {})
  } catch (error) {
    console.error('required store.modules failed.')
    return {}
  }
}

/**
 * 动态注册 modules
 * @param {*} store vuex
 * @param {*} modulesContext queryModules
 */
export function registerModules(store, modulesContext) {
  if (store && store.registerModule && typeof modulesContext === 'function') {
    const modules = queryModules(modulesContext)
    Object.keys(modules).forEach(name => {
      store.registerModule(name, modules[name])
    })
  }
}
