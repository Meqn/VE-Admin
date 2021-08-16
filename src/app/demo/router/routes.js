import Layout from '@/layout'
import Redirect from '@demo/views/redirect'

// 基础路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Redirect,
    hidden: true,
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
  }
  /* 
  // ⚠️注： 1. 404页面必须放在末尾 !!!
  //       2. 如果是动态载入路由，必须将不匹配路径(path="*")跳转404 route从初始路由中移除
  { path: '*', redirect: '/404', hidden: true } */
]

export const page404 = { path: '*', redirect: '/404', hidden: true }

// 其他路由模块
export { default as exceptionRoutes } from './modules/exception'
export { default as formRoutes } from './modules/form'
export { default as listRoutes } from './modules/list'
export { default as profileRoutes } from './modules/profile'
export { default as resultRoutes } from './modules/result'
export { default as accountRoutes } from './modules/account'
export { default as extentRoutes } from './modules/extent'
