/**
 * 自动为请求 headers 加上 JWT
 * @param {Axios} axios axios实例
 * @param {object} options 配置项
 * @param {string} options.authTokenName token名
 * @param {string} options.newTokenName response.headers中的token名
 * @param {function} options.getToken 获取本地token
 * @param {function} options.setToken 保存token
 * @param {boolean} options.disable 是否禁用
 * @param {string} options.tokenPrefix JWT前缀
 */
export default function axiosToken(axios, options = {}) {
  const {
    authTokenName = 'Authorization',
    newTokenName = 'x-token',
    tokenPrefix = '',
    getToken,
    setToken,
    disable = false
  } = options

  axios.interceptors.request.use(config => {
    const token = getToken && getToken()
    if (!disable && token) {
      config.headers[authTokenName] = `${tokenPrefix}${token}`
    }
    return config
  })

  axios.interceptors.response.use(
    response => {
      if (response.headers && setToken) {
        const newToken = response.headers[newTokenName]
        newToken && setToken(newToken)
      }
      return response
    },
    error => {
      if (error && error.response && setToken) {
        const newToken = error.response.headers[newTokenName]
        newToken && setToken(newToken)
      }
      return Promise.reject(error)
    }
  )
}
