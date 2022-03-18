import store, { registerModules, createPermission } from '@/store'

import { getMenus } from '@/api/user'
import { resetRouter } from '@demo/router'
import { constantRoutes, asyncRoutes, notFoundRoute } from '@demo/router/routes'

// permission模块
const permissionModule = createPermission({
  handlers: { getMenus, resetRouter },
  routes: { constantRoutes, asyncRoutes, notFoundRoute }
})
store.registerModule('permission', permissionModule)

// 注册 ./modules 目录下的所有模块
const modulesFiles = require.context('./modules', true, /\.js$/)
registerModules(modulesFiles)

export default store
