import Vue from 'vue'
import Vuex from 'vuex'

import { createApp, createPermission, createUser, baseGetters, getModulesFromFiles } from '@/store'

import { userLogin, userLogout, getUserInfo, getMenus } from '@/api/user'
import appConfig from '@demo/app.config'
import { resetRouter } from '@demo/router'
import { constantRoutes, asyncRoutes, notFoundRoute } from '@demo/router/routes'

Vue.use(Vuex)

const appModule = createApp({
  appName: 'demo',
  appConfig
})

const userModule = createUser({
  fetches: { userLogin, userLogout, getUserInfo },
  resetRouter
})

const permissionModule = createPermission({
  fetches: { getMenus },
  routes: { constantRoutes, asyncRoutes, notFoundRoute }
})

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = getModulesFromFiles(modulesFiles)

export default new Vuex.Store({
  modules: {
    app: appModule,
    user: userModule,
    permission: permissionModule,
    ...modules
  },
  getters: baseGetters
})
