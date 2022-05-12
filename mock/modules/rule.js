import { pagination, Random } from '../mock'

const ruleStatus = [
  { value: 0, text: '关闭' },
  { value: 1, text: '运行中' },
  { value: 2, text: '已上线' },
  { value: -1, text: '异常' },
]

export default [
  {
    url: '/rule/',
    type: 'get',
    response: (data) => {
      const { query } = data
      const item = {
        'id|+1': 1000,
        name: 'TradeCode @integer(1, 999)',
        avatar: '@avatar',
        'callNo|100-999': 212,
        createdAt: '@datetime',
        description: '这里是一段关于TradeCode描述',
        owner: '@cname',
        'progress|0-100': 1,
        'status|1': ruleStatus,
        updatedAt: '@datetime'
      }
      return pagination(item, { ...query, count: 331 })
    }
  },
  {
    url: '/rule/status/',
    type: 'get',
    response: ruleStatus
  }
]
