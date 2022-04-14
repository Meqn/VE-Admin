import request from '@/utils/request'

export function getRule(params) {
  return request.get('/rule/', {
    params
  })
}
