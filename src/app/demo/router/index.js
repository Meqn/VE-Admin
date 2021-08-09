import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import Redirect from '@demo/views/redirect'
import asyncRoutes from './modules'

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

const router = new VueRouter({
  routes
})

setTimeout(() => {
  if (Array.isArray(asyncRoutes)) {
    asyncRoutes.forEach(route => router.addRoute(route))
  } else {
    router.addRoute(asyncRoutes)
  }
}, 1)

export const allRoutes = [...routes, ...asyncRoutes]

export default router
