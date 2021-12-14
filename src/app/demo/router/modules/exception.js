import Layout from '@demo/Layout'

export default [
  {
    path: '/exception',
    component: Layout,
    name: 'exception',
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'el-icon-warning-outline' },
    children: [
      {
        path: '403',
        component: () => import('@demo/views/form/basic'),
        name: 'exception_403',
        meta: { title: '403' }
      },
      {
        path: '404',
        component: () => import('@demo/views/form/basic'),
        name: 'exception_404',
        meta: { title: '404' }
      },
      {
        path: '500',
        component: () => import('@demo/views/form/basic'),
        name: 'exception_500',
        meta: { title: '500' }
      }
    ]
  }
]
