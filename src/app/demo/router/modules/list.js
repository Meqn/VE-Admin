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
        name: 'list_basic',
        meta: { title: '标准列表' }
      },
      {
        path: 'table',
        component: BlankView,
        name: 'list_table',
        redirect: '/list/table/list',
        meta: { title: '表格列表', asMenu: true },
        children: [
          {
            path: 'list',
            component: () => import('@demo/views/list/table'),
            name: 'ListTableList',
            meta: { hidden: true, title: '表格列表', automount: true, activeMenu: '/list/table', cache: true }
          },
          {
            path: 'create',
            component: () => import('@demo/views/form/basic'),
            name: 'ListTableCreate',
            meta: { hidden: true, title: '创建表格', automount: true, activeMenu: '/list/table' }
          },
          {
            path: 'detail',
            component: () => import('@demo/views/form/basic'),
            name: 'ListTableDetail',
            meta: { hidden: true, title: '数据详情', automount: true, activeMenu: '/list/table' }
          },
          {
            path: 'edit',
            component: () => import('@demo/views/form/basic'),
            name: 'ListTableEdit',
            meta: { hidden: true, automount: true, activeMenu: '/list/table' }
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
