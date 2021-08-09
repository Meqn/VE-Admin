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
  },
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
  },
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
  },
  {
    path: 'https://www.baidu.com',
    name: 'externalLink',
    meta: { title: '外部链接', icon: 'el-icon-link' }
  }
]
