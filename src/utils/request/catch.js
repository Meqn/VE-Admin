import { isObject } from './utils'

const namespace = 'axios-catch'
const defaultOptions = {
  handler: (error) => Promise.reject(error)
}

function catchErrorHandler(error, options) {
  const { config } = error
  const catchConfig = config[namespace]
  if (!config || !catchConfig) return Promise.reject(error)
  if (isObject(catchConfig) && catchConfig.handler) {
    return catchConfig.handler(error)
  }
  return options.handler(error)
}

export default function axiosCatch(axios, options = defaultOptions) {
  axios.interceptors.request.use(undefined, error => catchErrorHandler(error, options))
  axios.interceptors.response.use(undefined, error => catchErrorHandler(error, options))
}
