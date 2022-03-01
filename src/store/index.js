export { default as createApp } from './modules/app'
export { default as createUser } from './modules/user'
export { default as createPermission } from './modules/permission'
export { default as baseGetters } from './getters'

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
