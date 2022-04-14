import request from '@/utils/request'

export function userLogin(data = {}) {
  return request({
    url: '/user/login/',
    method: 'post',
    data
  })
}

export function userLogout(data = {}) {
  return request({
    url: '/user/logout/',
    method: 'post',
    data
  })
}

export function getUserInfo(userId) {
  return request({
    url: '/user/10/',
    method: 'get',
    params: {
      role: userId
    }
  })
}

export function getMenus(role) {
  return request({
    url: '/user/menus/',
    method: 'get',
    params: {
      role
    }
  })
}
