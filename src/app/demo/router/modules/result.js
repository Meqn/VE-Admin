import Layout from '@demo/Layout'

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
        component: () => import('@demo/views/result/success'),
        name: 'ResultSuccess',
        meta: { title: '成功页' }
      },
      {
        path: 'fail',
        component: () => import('@demo/views/result/fail'),
        name: 'ResultFail',
        meta: { title: '失败页' }
      }
    ]
  }
]
