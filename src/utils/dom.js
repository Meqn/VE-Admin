

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * 加载图片
 * @param {*} path 
 * @param {*} callback 
 * @returns Promise
 */
export function loadImage(path, callback) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onerror = function (error) {
      callback && callback(error)
      reject(error)
      img.onerror = img = null
    }
    img.onload = function () {
      callback && callback(null, img)
      resolve(img)
      img.onload = img = null
    }
    img.src = path
    if (img.complete) {
      callback && callback(null, img)
      resolve(img)
      img.onerror = img.onload = img = null
    }
  })
}
