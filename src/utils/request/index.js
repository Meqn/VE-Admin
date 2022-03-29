import Axios from 'axios'
import withCancelToken from './withCancel'
import useToken from './token'
import useError from './error'
import userFormat from './format'
import { getToken } from '@/utils/auth'

const service = Axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 1. 请求携带token
useToken(service, {
  authTokenName: 'Authorization',
  getToken
})
// 2. 响应错误处理
useError(service, {
  customMessage: true,
  illegalStatus: [401]
})
// 3. 统一返回结果。⚠️ 必须放在最后
userFormat(service)

export {
  withCancelToken
}

export default service
