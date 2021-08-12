import Layout from '@/layout'

export default [
  {
    path: '/list',
    component: Layout,
    name: 'list',
    redirect: '/list/basic',
    meta: { title: '列表页', icon: 'el-icon-s-grid' },
    children: [
      {
        path: 'basic',
        component: () => import('@demo/views/form/basic'),
        name: 'list_basic',
        meta: { title: '标准列表' }
      },
      {
        path: 'table',
        component: () => import('@demo/views/form/basic'),
        name: 'list_table',
        meta: { title: '表格列表' }
      },
      {
        path: 'search',
        component: () => import('@demo/views/form/basic'),
        name: 'list_search',
        meta: { title: '搜索列表' },
        children: [
          {
            path: 'articles',
            component: () => import('@demo/views/form/basic'),
            name: 'list_search_articles',
            meta: { title: '文章列表搜索' }
          },
          {
            path: 'goods',
            component: () => import('@demo/views/form/basic'),
            name: 'list_search_goods',
            meta: { title: '商品列表搜索' },
            children: [
              {
                path: 'daily',
                component: () => import('@demo/views/form/basic'),
                name: 'list_search_goods_daily',
                meta: { title: '生活区' }
              },
              {
                path: 'office',
                component: () => import('@demo/views/form/basic'),
                name: 'list_search_goods_office',
                meta: { title: '办公区' }
              },
              {
                path: '/list/search/articles',
                component: () => import('@demo/views/form/basic'),
                name: 'list_search_goods_articles',
                meta: { title: '其他区' }
              }
            ]
          },
          {
            path: 'applications',
            component: () => import('@demo/views/form/basic'),
            name: 'list_search_applications',
            meta: { title: '应用列表搜索' }
          }
        ]
      }
    ]
  }
]
