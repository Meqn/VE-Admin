import Layout from '@/layout'

export default [
  {
    path: '/form',
    component: Layout,
    name: 'form',
    redirect: '/form/basic',
    meta: { title: '表单页', icon: 'el-icon-edit-outline' },
    children: [
      {
        path: 'basic',
        component: () => import('@demo/views/form/basic'),
        name: 'form_basic',
        meta: { title: '基础表单' }
      },
      {
        path: 'step',
        component: () => import('@demo/views/form/basic'),
        name: 'form_step',
        meta: { title: '分步表单' }
      },
      {
        path: 'advanced',
        component: () => import('@demo/views/form/basic'),
        name: 'form_advanced',
        meta: { title: '高级表单' }
      }
    ]
  }
]
