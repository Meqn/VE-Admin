import Layout from '@demo/Layout'

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
        name: 'BasicForm',
        meta: { title: '基础表单' }
      },
      {
        path: 'step',
        component: () => import('@demo/views/form/step'),
        name: 'StepForm',
        meta: { title: '分步表单' }
      },
      {
        path: 'advanced',
        component: () => import('@demo/views/form/advanced'),
        name: 'AdvancedForm',
        meta: { title: '高级表单', cache: true }
      }
    ]
  }
]
