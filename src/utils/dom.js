/**
 * 绑定事件
 * @param {*} element 元素
 * @param {*} event 事件类型
 * @param {*} handler 事件方法
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else if (document.attachEvent) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element['on' + event] = handler
      }
    }
  }
})();

/**
 * 解绑事件
 * @param {*} element 
 * @param {*} event 
 * @param {*} handler 
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else if (document.detachEvent) {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element['on' + event] = null
      }
    }
  }
})();

/**
 * 执行一次绑定事件
 * @param {*} element 
 * @param {*} event 
 * @param {*} handler 
 */
export const once = function(element, event, handler) {
  const listener = function() {
    if (handler) {
      handler.apply(this, arguments)
    }
    off(element, event, listener)
  }
  on(element, event, listener)
}

/**
 * Check if an element has a class
 * @param {Element} el
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(el, cls) {
  if (!el || !cls) return false
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (` ${el.className} `).indexOf(` ${cls} `) > -1
    // return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }
}

/**
 * Add class to element
 * @param {Element} el
 * @param {string} cls
 */
export function addClass(el, cls) {
  // el.classList.add不能有空格
  if (!hasClass(el, cls)) el.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {Element} elm
 * @param {string} cls
 */
export function removeClass(el, cls) {
  if (hasClass(el, cls)) {
    // el.className = ` ${el.className} `.replace(` ${cls} `, ' ')
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
}

/**
 * @param {Element} el
 * @param {string} cls
 */
export function toggleClass(el, cls) {
  if (!el || !cls) return
  let classStr = el.className
  const nameIndex = classStr.indexOf(cls)
  if (nameIndex === -1) {
    classStr += ' ' + cls
  } else {
    classStr =
      classStr.substr(0, nameIndex) +
      classStr.substr(nameIndex + cls.length)
  }
  el.className = classStr
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
