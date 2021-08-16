// 用户信息
function getUser(name) {
  return {
    username: name,
    nickname: name === 'admin' ? '管理员' : '编辑者',
    role_code: name,
    status: 'ok',
    token: 'eyJhbGciOiJIUzI1NiJ9.YzLZQfUAOT76wRUlx7qVdO.' + name,
    avatar: 'https://img.zcool.cn/community/01cb2b556c296d0000009fcb6c4222.jpg@2o.jpg'
  }
}

// 权限菜单
const menus = {
  admin: [
    {
      title: '表单页',
      name: 'form',
      children: [
        {
          name: 'form_basic',
          title: '基础表单'
        },
        {
          name: 'form_step',
          title: '分步表单'
        },
        {
          name: 'form_advanced',
          title: '高级表单'
        }
      ]
    },
    {
      name: 'list',
      title: '列表页',
      children: [
        {
          name: 'list_basic',
          title: '标准列表'
        },
        {
          name: 'list_table',
          title: '表格列表'
        },
        {
          name: 'list_search',
          title: '搜索列表',
          children: [
            {
              name: 'list_search_articles',
              title: '文章列表搜索'
            },
            {
              name: 'list_search_goods',
              title: '商品列表搜索',
              children: [
                {
                  name: 'list_search_goods_daily',
                  title: '生活区'
                },
                {
                  name: 'list_search_goods_office',
                  title: '办公区'
                },
                {
                  name: 'list_search_goods_articles',
                  title: '其他区'
                }
              ]
            },
            {
              name: 'list_search_applications',
              title: '应用列表搜索'
            }
          ]
        }
      ]
    }
  ],
  editor: []
}

export default {
  'post:/user/login/': ({ username }) => {
    return getUser(username)
  },
  'post:/user/logout/': () => {
    return {}
  },
  'get:/user/:id/': ({ role }) => {
    return getUser(role.split('.')[2])
  },
  'get:/user/menus/': ({ role }) => {
    return menus[role || 'admin']
  }
}
