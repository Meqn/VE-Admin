
function getUser(name) {
  return {
    username: name,
    nickname: name === 'admin' ? '管理员' : '编辑者',
    role_code: name,
    status: 'ok',
    token: 'eyJhbGciOiJIUzI1NiJ9.YzLZQfUAOT76wRUlx7qVdO-D3xpkY2oTOoYWkM7bevo',
    avatar: 'https://img.zcool.cn/community/01cb2b556c296d0000009fcb6c4222.jpg@2o.jpg'
  }
}

export default {
  'post:/user/login/': ({ username }) => {
    return getUser(username)
  },
  'post:/user/logout/': () => {
    return {}
  },
  'get:/user/:id/': ({ role }) => {
    return getUser(role)
  }
}
