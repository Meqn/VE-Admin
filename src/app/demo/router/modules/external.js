import Layout from '@demo/Layout'
export default [
  {
    path: '/external-link',
    name: 'ExternalLink',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com',
        name: 'BaiduLink',
        meta: { title: '搜百度', icon: 'el-icon-link' }
      }
    ]
  }
]
