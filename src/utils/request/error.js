// import Axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { isBoolean, isObject } from './utils'

const propName = '_errorMessage'

/**
 * 当前配置项
 * @param {AxiosRequestConfig} config AxiosRequestConfig
 * @param {object} defaultOptions 默认配置项
 * @returns 
 */
function getCurrentConfig(config, defaultOptions = {}) {
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
 * http错误消息
 * @param {AxiosError} error AxiosError
 * @returns 
 */
function httpStatusMessage(error) {
  if (error && error.response) {
    const status = error.response.status
    const url = error.response.config?.url || ''
    const statusObj = {
      302: '接口重定向(302)',
      400: '请求错误(400)',
      401: '请求未授权(401)',
      403: '无操作权限(403)',
      404: `请求地址出错(404): ${url}`,
      405: '请求的方法被禁止(405)',
      408: '请求超时(408)',
      409: '系统已存在相同数据(409)',
      500: '服务器内部错误(500)',
      501: '服务未实现(501)',
      502: '网关错误(502)',
      503: '服务不可用(503)',
      504: '服务暂时无法访问,请稍后再试(504)',
      505: 'HTTP版本不支持(505)',
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
 * 登录
 */
function handleLogin(code, { illegalStatus, redirectLogin = '' }) {
  if (code && illegalStatus && illegalStatus.includes(code)) {
    if (typeof redirectLogin === 'function') {
      return redirectLogin()
    } else {
      MessageBox.confirm('登录状态已失效或已超时，请重新登录', '温馨提示', {
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
 * 
 * @param {AxiosInstance} axios 
 * @param {object} options 配置项
 * @param {boolean} options.disable 是否禁用
 * @param {function} options.duration 错误消息时长
 * @param {array<string>} options.illegalStatus 无效状态码
 * @param {function | string} options.redirectLogin login页面
 */
export default function axiosError(axios, options = {}) {
  const defaultOptions = {
    disable: false,
    customMessage: false,
    ...options
  }

  axios.interceptors.response.use(
    response => {
      const conf = getCurrentConfig(response.config, defaultOptions)

      if (!conf.disable) {
        const { data } = response

        if (data.code !== undefined && data.code !== 0) {
          const errMsg = data.message || 'Error'
          
          Message({
            message: errMsg,
            type: 'error',
            duration: conf.duration || 3000
          })

          // 无效登录状态
          handleLogin(data.code, conf)

          return Promise.reject(new Error(errMsg))
        }
      }

      return response
    },
    error => {
      const conf = getCurrentConfig(error.config, defaultOptions)
      
      if (!conf.disable) {
        // const errMsg = error.message || error.response?.statusText
        const errMsg = (conf.customMessage && httpStatusMessage(error)) || error.message || error.response?.statusText
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
        handleLogin(error.response?.status, conf)
      }
      return Promise.reject(error)
    }
  )
}
