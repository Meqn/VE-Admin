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
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
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
 * @param {*} hyphen 连接符
 * @returns 
 */
export function camelCase(name, hyphen = '-') {
  const regx = new RegExp(hyphen + '([a-z])', 'g')
  return name.replace(regx, (match, letter) => {
    return letter.toUpperCase()
  })
}

/**
 * 将骆驼命名规则转成连接线方式
 * @param {*} name 待转换的字符串
 * @param {*} hyphen 连接符
 * @returns 
 */
export function kebabCase(name, hyphen = '-') {
  return name.replace(/[A-Z]/g, (match) => {
    return hyphen + match.toLowerCase()
  })
}
