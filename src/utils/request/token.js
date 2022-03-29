import { isBoolean, isObject } from './utils'

const propName = '_withToken'

/**
 * 当前配置项
 * @param {AxiosRequestConfig} config AxiosRequestConfig
 * @param {object} defaultOptions 默认配置项
 * @returns 
 */
function getCurrentState(config, defaultOptions = {}) {
  try {
    const state = isBoolean(config[propName])
      ? { disable: !config[propName] }
      : isObject(config[propName])
        ? config[propName]
        : {}
    return {
      ...defaultOptions,
      ...state
    }
  } catch (error) {
    return { ...defaultOptions }
  }
}

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
  const defaultOptions = {
    authTokenName: 'Authorization',
    tokenPrefix: '',
    disable: false,
    ...options
  }

  axios.interceptors.request.use(config => {
    const { getToken, authTokenName, tokenPrefix, disable } = getCurrentState(config, defaultOptions)
    const token = getToken && getToken()

    if (!disable && token) {
      config.headers[authTokenName] = `${tokenPrefix}${token}`
    }
    return config
  })

  axios.interceptors.response.use(
    response => {
      const { setToken, newTokenName } = getCurrentState(response.config, defaultOptions)
      if (response.headers && setToken) {
        const newToken = response.headers[newTokenName]
        newToken && setToken(newToken)
      }
      return response
    },
    error => {
      const { setToken, newTokenName } = getCurrentState(error.config, defaultOptions)
      const responseHeaders = error.response?.headers
      if (responseHeaders && setToken) {
        const newToken = error.response.headers[newTokenName]
        newToken && setToken(newToken)
      }
      return Promise.reject(error)
    }
  )
}
