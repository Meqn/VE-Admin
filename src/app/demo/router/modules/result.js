import Layout from '@/layout'

export default [
  {
    path: '/result',
    component: Layout,
    name: 'result',
    redirect: '/result/success',
    meta: { title: '结果页', icon: 'el-icon-stopwatch' },
    children: [
      {
        path: 'success',
        component: () => import('@demo/views/form/basic'),
        name: 'result_success',
        meta: { title: '成功页' }
      },
      {
        path: 'fail',
        component: () => import('@demo/views/form/basic'),
        name: 'result_fail',
        meta: { title: '失败页' }
      }
    ]
  }
]
