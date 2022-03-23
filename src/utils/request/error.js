// import Axios from 'axios'
import { MessageBox, Message } from 'element-ui'

/**
 * http错误消息
 * @param {AxiosError} error AxiosError
 * @returns 
 */
function httpStatusMessage(error) {
  if (error && error.response) {
    const status = error.response.status
    const url = error.response.config?.url || ''
    const statusObj = {
      302: '接口重定向',
      400: '请求错误',
      401: '未登录或登录已超时',
      403: '无操作权限',
      404: `请求地址出错: ${url}`,
      408: '请求超时',
      409: '系统已存在相同数据',
      500: '服务器内部错误',
      501: '服务未实现',
      502: '网关错误',
      503: '服务不可用',
      504: '服务暂时无法访问,请稍后再试',
      505: 'HTTP版本不支持',
    }
    if (status && statusObj[status]) {
      return statusObj[status]
    }
    if (error.message.includes('timeout')) return '网络请求超时'
    if (error.message.includes('Network')) return window.navigator.onLine ? '服务端异常' : '网络连接错误'
  }
  return ''
}

/**
 * 重新登录
 */
function handleLogin(code, { illegalStatus, redirectLogin = '' }) {
  if (code && illegalStatus && illegalStatus.includes(code)) {
    if (typeof redirectLogin === 'function') {
      return redirectLogin()
    } else {
      MessageBox.confirm('登录状态已失效或已超时，请重新登录', '登录提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = redirectLogin
      })
    }
  }
}

/**
 * Axios响应错误处理
 * @param {object} axiosOptions axios响应
 * @param {AxiosError} axiosOptions.error 
 * @param {AxiosResponse} axiosOptions.response 
 * @param {object} options 配置项
 * @param {function} options.duration 错误消息时长
 * @param {array<string>} options.illegalStatus 无效状态码
 * @param {function | string} options.redirectLogin login页面
 * @returns 
 */
export function handleError({ error, response }, options) {
  // HTTP错误处理
  if (error) {
    const errMsg = error.message || error.response?.statusText
    // const errMsg = httpStatusMessage(error) || error.message || error.response?.statusText
    /* const url = error.response?.config?.url || ''
    if (Axios.isCancel(error)) {
      return console.error(`重复请求: ${url}`)
    } */
    Message({
      message: errMsg,
      type: 'error',
      duration: options.duration || 3000
    })

    // 无效登录状态
    handleLogin(error.response?.status, options)

    return Promise.reject(error)
  }
  
  // 后端错误处理
  if (response) {
    const { data } = response

    if (data.code !== 0) {
      const errMsg = data.message || 'Error'
      
      Message({
        message: errMsg,
        type: 'error',
        duration: options.duration || 3000
      })

      // 无效登录状态
      handleLogin(data.code, options)

      return Promise.reject(new Error(errMsg))
    }
    return response
  }
}

/**
 * 
 * @param {AxiosInstance} axios 
 * @param {object} options 配置项
 * @param {boolean} options.disable 是否禁用
 * @param {function} options.duration 错误消息时长
 * @param {array<string>} options.illegalStatus 无效状态码
 * @param {function | string} options.redirectLogin login页面
 */
export default function axiosError(axios, options = {}) {
  const {
    disable = false
  } = options

  axios.interceptors.response.use(
    response => {
      return disable ? response : handleError({ response }, options)
    },
    error => {
      return disable ? Promise.reject(error) : handleError({ error }, options)
    }
  )
}
