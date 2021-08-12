import request from '@/mock'

export function userLogin(data) {
  return request({
    url: '/user/login/',
    method: 'post',
    data
  })
}

export function userLogout(data) {
  return request({
    url: '/user/logout/',
    method: 'post',
    data
  })
}

export function getUserInfo(userId) {
  return request({
    url: '/user/:id/',
    method: 'get',
    params: {
      role: userId
    }
  })
}
