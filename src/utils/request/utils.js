
export const isObject = arg => (arg !== null && typeof arg === 'object')
export const isBoolean = arg => typeof arg === 'boolean'

/**
 * 每个请求生成唯一key
 * @param {*} config 
 * @returns 
 */
function getPendingKey(config) {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join(':')
}
