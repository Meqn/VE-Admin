import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

// 获取所有 modules
export function getModulesFromFiles(modulesFiles) {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  // const modulesFiles = require.context(src, true, /\.js$/)

  // you do not need `import app from './modules/app'`
  // it will auto require all vuex module from modules file
  return modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
}

// 动态注册 modules
export function registerModules(modulesFiles) {
  const modules = getModulesFromFiles(modulesFiles)
  Object.keys(modules).forEach(name => {
    store.registerModule(name, modules[name])
  })
}

export { default as createPermission } from './comm/permission'

export default store
