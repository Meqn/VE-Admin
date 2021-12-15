/*! 已引入 lodash.js，将不再使用 utils.js和types.js 内的函数 */

/**
 * 函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, previous, args, result, context

  const later = function() {
    // 据上一次触发时间间隔
    const passed = Date.now() - previous
    // 上次触发时间间隔 小于设定时间间隔
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed)
    } else {
      timeout = null
      if (!immediate) result = func.apply(context, args)
      // This check is needed because `func` can recursively invoke `debounced`.
      if (!timeout) args = context = null
    }
  };

  const debounced = function() {
    args = arguments
    context = this
    previous = Date.now()
    if (!timeout) {
      // 如果延时不存在，重新设定延时
      timeout = setTimeout(later, wait);
      if (immediate) result = func.apply(context, args)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = args = context = null
  }

  return debounced
}

/**
 * 函数节流
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 
 * @returns 
 */
export function throttle(func, wait, options) {
  let timeout, context, args, result
  // 标记时间戳
  let previous = 0
  // options可选属性 leading: true/false 表示第一次事件马上触发回调/等待wait时间后触发
  // options可选属性 trailing: true/false 表示最后一次回调触发/最后一次回调不触发
  if (!options) options = {}

  const later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  const throttled = function() {
    const _now = Date.now()
    // 如果是第一次触发且选项设置不立即执行回调
    if (!previous && options.leading === false) previous = _now
    // 距离下次触发回调还需等待的时间
    const remaining = wait - (_now - previous)
    context = this
    args = arguments
    // 等待时间 <= 0或者不科学地 > wait（异常情况）
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = _now
      // 触发回调
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 在定时器不存在且选项设置最后一次触发需要执行回调的情况下
      // 设置定时器，间隔remaining时间后执行later
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}

/**
 * deepClone
 * @param {any} source 
 * @returns 
 */
export function deepClone(source) {
  let copy
  
  // eslint-disable-next-line yoda
  if (null === source || 'object' !== typeof source) return source

  // Handle Date
  if (source instanceof Date) {
    copy = new Date()
    copy.setTime(source.getTime())
    return copy
  }

  // Handle Array
  if (source instanceof Array) {
    copy = []
    for (let i = 0, len = source.length; i < len; i++) {
      copy[i] = deepClone(source[i])
    }
    return copy
  }

  // Handle Object
  if (source instanceof Object) {
    copy = {}
    for (const attr in source) {
      if (Object.prototype.hasOwnProperty.call(source, attr)) {
        copy[attr] = deepClone(source[attr])
      }
    }
    return copy
  }

  throw new Error("Unable to copy! Its type isn't supported.")
}

/**
 * 数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * 将连接线命名规则转成驼峰
 * @param {*} name 待转换的字符串
 * @param {*} separator 连接符
 * @returns 
 */
export function camelCase(name, separator = '-') {
  const regx = new RegExp(separator + '([a-z])', 'g')
  return name.replace(regx, (match, letter) => {
    return letter.toUpperCase()
  })
}

/**
 * 将骆驼命名规则转成连接线方式
 * @param {*} name 待转换的字符串
 * @param {*} separator 连接符
 * @returns 
 */
export function kebabCase(str, separator = '-') {
  const regx = /([^-])([A-Z])/g
  return str.replace(regx, `$1${separator}$2`).toLowerCase()
}

