import Layout from '@demo/Layout'
import BlankView from '@/layout/BlankView'

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
        name: 'ListBasic',
        meta: { title: '标准列表' }
      },
      {
        path: 'table',
        component: BlankView,
        name: 'ListTable',
        meta: { title: '查询表格', asMenu: true, automount: true },
        children: [
          {
            path: '',
            component: () => import('@demo/views/list/table'),
            name: 'TableList',
            meta: { hidden: true, title: '列表', activeMenu: '/list/table', cache: true }
          },
          {
            path: 'create',
            component: () => import('@demo/views/form/basic'),
            name: 'TableCreate',
            meta: { hidden: true, title: '创建表格', activeMenu: '/list/table' }
          },
          {
            path: 'edit',
            component: () => import('@demo/views/form/basic'),
            name: 'TableEdit',
            meta: { hidden: true, activeMenu: '/list/table' }
          },
          {
            path: '/list/table/:id/',
            component: () => import('@demo/views/form/basic'),
            name: 'TableDetail',
            meta: { hidden: true, title: '数据详情', activeMenu: '/list/table' }
          }
        ]
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
            path: 'applications',
            component: () => import('@demo/views/form/basic'),
            name: 'list_search_applications',
            meta: { title: '应用列表搜索' }
          },
          {
            path: 'goods',
            component: () => import('@demo/views/form/basic'),
            name: 'list_search_goods',
            redirect: '/list/search/goods/daily',
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
              }
            ]
          }
        ]
      }
    ]
  }
]
