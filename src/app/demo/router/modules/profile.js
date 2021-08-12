import Layout from '@/layout'

export default [
  {
    path: '/profile',
    component: Layout,
    name: 'profile',
    redirect: '/profile/basic',
    meta: { title: '详情页', icon: 'el-icon-edit-outline' },
    children: [
      {
        path: 'basic',
        component: () => import('@demo/views/form/basic'),
        name: 'profile_basic',
        meta: { title: '基础详情页' }
      },
      {
        path: 'advanced',
        component: () => import('@demo/views/form/basic'),
        name: 'profile_advanced',
        meta: { title: '高级详情页' }
      }
    ]
  }
]
