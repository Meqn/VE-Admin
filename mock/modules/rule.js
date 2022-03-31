import { pagination } from '../mock'

export default [
  {
    url: '/rule/',
    type: 'get',
    response: (data) => {
      console.log('rule', data)
      const { query } = data
      const item = {
        'id|+1': 1000,
        name: 'TradeCode @integer(1, 999)',
        avatar: '@avatar',
        'callNo|100-999': 212,
        createdAt: '@datetime',
        description: '@csentence(10, 30)',
        owner: '@cname',
        'progress|0-100': 1,
        'status|1': [0, 1, 2],
        updatedAt: '@datetime'
      }
      return pagination(item, { ...query, count: 33 })
    }
  }
]
