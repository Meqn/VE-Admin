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
export const isSymbol = arg => getType(arg) === 'symbol'
export const isObject = arg => getType(arg) === 'object'
export const isArray = Array.isArray || (arg => getType(arg) === 'array')

export default {
  getType,
  isNil,
  isUndefined,
  isNull,
  isBoolean,
  isString,
  isNumber,
  isSymbol,
  isObject,
  isArray
}
