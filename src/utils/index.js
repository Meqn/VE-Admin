import { resolve } from 'path'
import { isExternal } from './validate'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

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
 * 
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
 * css单位
 * @param {*} val 
 * @returns 
 */
export function cssUnit(val) {
  const regx = /^\d+(px|em|%|vw|vh|rem)?$/
  if (regx.test(val)) {
    return isNaN(val) ? val : val + 'px'
  }
  return ''
}


/**
 * 获取文件后缀
 * @param {*} fileSrc 
 * @returns 
 */
export function fileSuffix (fileSrc) {
  if (typeof fileSrc !== 'string') return ''
  const _path = fileSrc.split('?')[0]
  return _path.includes('.') ? _path.split('.').pop().toLocaleLowerCase() : ''
}

/**
 * 获取文件类型
 * @param {*} fileSrc 
 * @returns 
 */
export function fileType(fileSrc) {
  const suffixes = {
    image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
    video: ['mp4', 'm3u8', 'rmvb', 'avi', '3gp', 'mkv', 'flv', 'mov'],
    audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
    pdf: ['pdf']
  }
  const _fileSuffix = fileSuffix(fileSrc)
  if (!_fileSuffix) return ''
  let _type = ''
  Object.keys(suffixes).some(key => {
    if (suffixes[key].includes(_fileSuffix)) {
      _type = key
      return true
    }
  })
  return _type || _fileSuffix
}

/**
 * 获取指定数字范围内的随机数
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
export const randomNum = (min, max) => Math.round(Math.random() * (max - min)) + min

/**
 * 随机生成8位字符串
 * @returns 
 */
export const randomStr = () => Math.floor(Math.random() * Date.now()).toString(36)

/**
 * 生成UUID
 * @returns 
 */
export function generateUUID () {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
  return uuid
}

/**
 * 数字转千分位
 * @param {*} num 
 * @returns 
 */
export const toThousands = num => (num && num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))

/**
 * 递归方式扁平化集合
 * @param {Array} collection 数据集合
 * @param {String} childProp 子元素name
 * @param {Function} handler 当前项返回值的处理函数
 * @param {any} currentValue 当前项的返回值 (用于handler中存在数据依赖)
 * @returns 
 */
export function flatMapDeep(collection, childProp = 'children', handler, currentValue) {
  let res = []
  if (Array.isArray(collection)) {
    collection.forEach(item => {
      const _item = typeof handler === 'function' ? handler(item, currentValue) : item
      res.push(_item)
      if (item[childProp]) {
        res = res.concat(flatMapDeep(item[childProp], childProp, handler, _item))
      }
    })
  }
  return res
}

/**
 * 将路径或路径片段的序列解析为绝对路径
 * @param {String} base 基础路径
 * @param {[String | Array]} path 当前路径
 * @returns 
 */
export function resolvePath(base, path) {
  try {
    if (Array.isArray(path)) {
      return resolve(base, ...path)
    }
    return isExternal(path) ? path : resolve(base, path)
  } catch (error) {
    console.error(error)
  }
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
