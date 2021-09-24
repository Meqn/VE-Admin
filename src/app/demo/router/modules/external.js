export default [
  {
    path: '/external-link',
    name: 'ExternalLink',
    children: [
      {
        path: 'https://www.baidu.com',
        name: 'BaiduLink',
        meta: { title: '外部链接', icon: 'el-icon-link' }
      }
    ]
  }
]
