import setupMock from './mock'

import {
  avatar,
  constellation
} from './const'

import user from './user'
import article from './article'

const mocks = [
  ...user,
  ...article
]

setupMock({
  enable: process.env.NODE_ENV === 'development',
  timeout: '300-1500'
}, function({ Mock, mockXHR }) {
  // 创建自定义随机数
  const Random = Mock.Random
  Random.extend({
    constellation: () => Random.pick(constellation),
    avatar: () => Random.pick(avatar)
  })

  // 生成接口
  mocks.forEach(item => {
    mockXHR(item.url, item.type, item.response)
  })
})
