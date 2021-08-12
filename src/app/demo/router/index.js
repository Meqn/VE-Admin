import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import Redirect from '@demo/views/redirect'

import formRoutes from './modules/form'
import listRoutes from './modules/list'
import profileRoutes from './modules/profile'
import exceptionRoutes from './modules/exception'
import resultRoutes from './modules/result'
import accountRoutes from './modules/account'
import extentRoutes from './modules/extent'

// Throw Error "NavigationDuplicated" #2872
// https://stackoverflow.com/questions/57837758/navigationduplicated-navigating-to-current-location-search-is-not-allowed
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/redirect',
    component: Redirect,
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@demo/views/login'),
    hidden: true,
    meta: { noRequiresAuth: true }
  },
  {
    path: '/404',
    component: () => import('@demo/views/404'),
    hidden: true,
    meta: { noRequiresAuth: true }
  },
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@demo/views/dashboard'),
        name: 'dashboard',
        meta: { title: 'Dashboard', icon: 'el-icon-s-operation' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 创建并配置默认路由
const createRouter = () => new VueRouter({
  routes: [].concat(formRoutes, extentRoutes, routes)
})

// 创建并配置默认路由
const router = createRouter()

// 异步加载路由
const asyncRoutes = [
  ...listRoutes,
  ...profileRoutes,
  ...resultRoutes,
  ...exceptionRoutes,
  ...accountRoutes
]

setTimeout(() => {
  // router.addRoutes 已废弃
  asyncRoutes.forEach(route => router.addRoute(route))
}, 1)

// 所有路由，可排序
export const allRoutes = [].concat(routes, formRoutes, asyncRoutes, extentRoutes)

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
