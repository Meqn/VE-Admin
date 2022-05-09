import Layout from '@demo/Layout'
import Redirect from '@demo/views/redirect'

import exceptionRoutes from './modules/exception'
import formRoutes from './modules/form'
import listRoutes from './modules/list'
import profileRoutes from './modules/profile'
import resultRoutes from './modules/result'
import accountRoutes from './modules/account'
// 外链
import externalRoutes from './modules/external'

// 基础路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Redirect,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@demo/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@demo/views/login'),
    meta: { noRequiresAuth: true, hidden: true }
  },
  {
    path: '/404',
    component: () => import('@demo/views/404'),
    hidden: true,
    meta: { noRequiresAuth: true, hidden: true }
  },
  {
    path: '/demo',
    component: () => import('@demo/views/demo'),
    hidden: true,
    meta: { noRequiresAuth: true, hidden: true }
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
        meta: { title: 'dashboard', icon: 'el-icon-s-operation' }
      }
    ]
  },
  // ⚠️注： 1. 未找到页面路由 必须放在末尾 !!!
  //       2. 如果是动态载入路由，必须将不匹配路径(path="*")跳转404 route从初始路由中移除
  { path: '*', name: 'NotFound', redirect: '/404', hidden: true }
]

// 异步路由
export const asyncRoutes = [].concat(formRoutes, listRoutes, profileRoutes, exceptionRoutes, resultRoutes, accountRoutes, externalRoutes)
