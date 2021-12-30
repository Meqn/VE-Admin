/**
 * Created by PanJiaChen
 * updated in 2021/08
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} 身份证
 * @returns {Boolean}
 */
export function validIdCard(idcard) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idcard)
}

/**
 * @param {string} 手机号
 * @returns {Boolean}
 */
export function validMobile(mobile) {
  const reg = /^1\d{10}$/
  return reg.test(mobile)
}

/**
 * @param {string} 正整数
 * @returns {Boolean}
 */
export function validPositiveInt(int) {
  const reg = /^([1-9]\d*|0)$/
  return reg.test(int)
}

/**
 * @param {string} 5-16位密码
 * @returns {Boolean}
 */
export function validPassword(name) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,16}$/
  return reg.test(name)
}

export function validCssValue(val) {
  const reg = /^-?\d+(px|em|%|vw|vh|rem)$/
  return reg.test(val)
}

export function isVNode(node) {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

export function isEmptyElement(c) {
  return !(c.tag || (c.text && c.text.trim() !== ''));
}
