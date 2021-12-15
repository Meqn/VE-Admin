/*! 已引入 lodash.js，将不再使用 utils.js和types.js 内的函数 */

const typeRegExp = /(?:^\[object\s(.*?)\]$)/

export const getType = any => {
  return Object.prototype.toString
    .call(any)
    .replace(typeRegExp, '$1')
    .toLowerCase()
}

export const isNil = arg => arg === null || arg === undefined
export const isUndefined = arg => getType(arg) === 'undefined'
export const isNull = arg => getType(arg) === 'null'
export const isBoolean = arg => getType(arg) === 'boolean'
export const isString = arg => getType(arg) === 'string'
export const isNumber = arg => !isNaN(parseFloat(arg)) && isFinite(arg)
export const isFunction = arg => typeof arg === 'function'
export const isObject = arg => getType(arg) === 'object'
export const isObjectLike = arg => typeof arg === 'object' && arg !== null
export const isArray = Array.isArray || (arg => getType(arg) === 'array')
export const isSymbol = arg => getType(arg) === 'symbol'
export const isMap = arg => getType(arg) === 'map'
export const isSet = arg => getType(arg) === 'set'
export const isDate = arg => getType(arg) === 'date'

export function isEmpty(arg) {
  if (isNil(arg)) return true
  if (isArray(arg) || isString(arg)) return !!arg.length
  if (isObject) return !!Object.keys(arg).length
}

export default {
  getType,
  isEmpty,
  isNil,
  isUndefined,
  isNull,
  isBoolean,
  isString,
  isNumber,
  isFunction,
  isSymbol,
  isObject,
  isArray,
  isMap,
  isSet,
  isDate
}
