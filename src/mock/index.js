import user from './user'

const MockData = Object.assign({}, user)

export default function request(options) {
  const { url, method, params, data } = options
  const delay = Math.floor(Math.random() * 2000)

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
