import request from '@/utils/request'

export function postArticle(data) {
  return request({
    url: '/user/login/',
    method: 'post',
    data
  })
}

export function getArticleList(params) {
  return request({
    url: '/article/',
    method: 'get',
    params
  })
}
