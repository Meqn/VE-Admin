import Layout from '@demo/Layout'

export default [
  {
    path: '/account',
    component: Layout,
    name: 'account',
    redirect: '/account/center',
    meta: { title: '个人页', icon: 'el-icon-user' },
    children: [
      {
        path: 'center',
        component: () => import('@demo/views/form/basic'),
        name: 'account_center',
        meta: { title: '个人中心' }
      },
      {
        path: 'settings',
        component: () => import('@demo/views/form/basic'),
        name: 'account_settings',
        meta: { title: '基本设置' }
      }
    ]
  }
]
