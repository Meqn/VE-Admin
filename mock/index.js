import user from './user'
import article from './article'

const MockData = Object.assign({}, user, article)

export default function request(options) {
  const { url, method, params, data } = options
  // const delay = Math.floor(Math.random() * 2000)
  const delay = (Math.round(Math.random() * 2) + 1) * 1000 // 1s - 4s
  console.log('request: ', `${method}:${url}`, delay)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: 'ok',
        data: MockData[`${method}:${url}`](params || data)
      })
    }, delay)
  })
}
