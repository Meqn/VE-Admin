import Axios from 'axios'
import useToken from './token'
import useError from './error'
import userFormat from './format'
import { getToken } from '@/utils/auth'

const CancelToken = Axios.CancelToken

/**
 * 接口请求
 * @param {AxiosRequestConfig | string} config axios配置项
 * @param {object} options 其他配置项
 * @param {boolean} options.withToken 请求headers携带token
 * @param {boolean} options.showErrorMessage 请求响应错误处理
 * @returns 
 */
function request(config, options = {}) {
  const service = Axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
  })
  
  /* service.interceptors.response.use(
    response => {
      console.log('request response:', response)
      return response
    },
    error => {
      console.log('request error:', error)
      console.dir(error)
      return Promise.reject(error)
    }
  ) */

  const requestConfig = typeof config === 'string'
    ? { url: config, method: 'get' }
    : config
  
  const {
    withToken = true,
    showErrorMessage = true
  } = options
  
  // 1. 请求携带token
  if (withToken) {
    useToken(service, {
      getToken
    })
  }

  // 2. 统一响应结果错误处理
  if (showErrorMessage) {
    useError(service)
  }

  // 3. 统一返回结果。⚠️ 必须放在最后
  userFormat(service)

  return service(requestConfig)
}

/**
 * 保持请求唯一
 * @param {AxiosInstance} fetcher 请求函数
 * @returns 
 */
export function withCancelToken(fetcher) {
  let abort
  
  function send(...args) {
    cancel() // 每次请求都自动取消上一次

    const cancelToken = new CancelToken(cancel => (abort = cancel))
    return fetcher.call(this, ...args, { cancelToken })
  }

  function cancel(message = 'abort') {
    if (abort) {
      abort(message)
      abort = null
    }
  }
  return [send, cancel]
}

export default request
