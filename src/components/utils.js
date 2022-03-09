// Component: $el, $vnode
// VNode: componentInstance, componentOptions = {Ctor, listeners, propsData, tag}, data, elm, context
/**
 Component:   | $el   | $vnode  | $options          |
 VNode:       | elm   | VNode   | componentOptions  |
*/

export function isVNode(node) {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

export function isStringElement(c) {
  return !c.tag
}

export function isEmptyElement(c) {
  return !(c.tag || (c.text && c.text.trim() !== ''));
}

export function filterEmpty(children = []) {
  return children.filter(c => !isEmptyElement(c));
}

export function isValidElement(element) {
  return (
    element &&
    typeof element === 'object' &&
    'componentOptions' in element &&
    'context' in element &&
    element.tag !== undefined
  ) // remove text node
}

/**
 * 
 * @param {[ComponentInstance | VNode]} instance 组件实例或vnonde
 * @param {*} prop 属性
 * @returns 
 */
export function hasProp(instance, prop) {
  const $options = instance.$options || instance.componentOptions || {}
  const propsData = $options.propsData || {}
  return prop in propsData
}

export function filterProps(props, propsData = {}) {
  const res = {}
  Object.keys(props).forEach(k => {
    if (k in propsData || props[k] !== undefined) {
      res[k] = props[k]
    }
  })
  return res
}

/**
 * getOptionProps
 * @param {*} vnode 组件
 * @returns 
 */
export function getOptionProps(vnode) {
  if (vnode.componentOptions) {
    const componentOptions = vnode.componentOptions
    const { propsData = {}, Ctor = {} } = componentOptions
    const props = (Ctor.options || {}).props || {}
    const res = {}
    for (const k in props) {
      const v = props[k]
      const defaultValue = v.default
      if (defaultValue !== undefined) {
        res[k] = typeof defaultValue === 'function' ? defaultValue.call(vnode) : defaultValue
      }
    }
    return { ...res, ...propsData }
  }
  const { $options = {}, $props = {} } = vnode
  return filterProps($props, $options.propsData)
}


export function getPropsData(vnode) {
  const componentOptions = vnode.$vnode ? vnode.$vnode.componentOptions : vnode.componentOptions
  return componentOptions ? componentOptions.propsData || {} : {}
}

export function getAllProps(vnode) {
  let data = vnode.data || {}
  let componentOptions = vnode.componentOptions || {}
  if (vnode.$vnode) {
    data = vnode.$vnode.data || {}
    componentOptions = vnode.$vnode.componentOptions || {}
  }
  return { ...data.props, ...data.attrs, ...componentOptions.propsData }
}

export function getComponentName(componentOptions) {
  return componentOptions && (componentOptions.Ctor.options.name || componentOptions.tag)
}


export function getAllChildren(vnode) {
  const componentOptions = (vnode.$vnode ? vnode.$vnode.componentOptions : vnode.componentOptions) || {}
  return vnode.children || componentOptions.children || []
}

export function getScopedSlots(vnode) {
  return (vnode.data && vnode.data.scopedSlots) || {}
}

export function getSlots(vnode) {
  const children = getAllChildren(vnode)
  const slots = {}
  children.forEach(child => {
    if (!isEmptyElement(child)) {
      const name = (child.data && child.data.slot) || 'default'
      slots[name] = slots[name] || []
      if (child.tag === 'template') {
        slots[name].push(child.children)
      } else {
        slots[name].push(child)
      }
    }
  })
  return { ...slots, ...getScopedSlots(vnode) }
}

/**
 * 获取单个slot内容
 * @param {*} self 当前组件
 * @param {*} name slot名称
 * @param {*} options 参数
 * @returns 
 */
export function getSlot(self, name = 'default', options = {}) {
  return (
    (self.$scopedSlots && self.$scopedSlots[name] && self.$scopedSlots[name](options)) ||
    self.$slots[name] ||
    []
  )
}

export function getSlotOptions(vnode) {
  if (vnode.fnOptions) {
    // 函数式组件
    return vnode.fnOptions
  }
  const componentOptions = vnode.$vnode ? vnode.$vnode.componentOptions : vnode.componentOptions
  return componentOptions ? componentOptions.Ctor.options || {} : {}
}

/**
 * getComponentFromProp
 * @param {[ComponentInstance | VNode]} instance 组件
 * @param {*} prop 属性
 * @param {*} options 
 * @returns 
 */
export function getComponentFromProp(instance, prop, options = instance) {
  if (instance.$createElement) { // ComponentInstance
    const h = instance.$createElement
    const temp = instance[prop]
    if (temp !== undefined) {
      return typeof temp === 'function' ? temp(h, options) : temp
    }

    const $scopedSlots = instance.$scopedSlots[prop]
    return (
      ($scopedSlots && $scopedSlots(options)) || instance.$slots[prop] || undefined
    )
  } else { // VNode
    const h = instance.context.$createElement
    const temp = getPropsData(instance)[prop]
    if (temp !== undefined) {
      return typeof temp === 'function' ? temp(h, options) : temp
    }

    const slotsProp = getSlots(instance)[prop]
    return (typeof slotsProp === 'function' ? slotsProp(options) : slotsProp) || undefined
  }
}

/**
 * 获取所有事件
 * @param {*} vnode vnode
 * @returns 
 */
export function getEvents(vnode) {
  let events = {}
  if (vnode.componentOptions && vnode.componentOptions.listeners) {
    events = vnode.componentOptions.listeners
  } else if (vnode.data && vnode.data.on) {
    events = vnode.data.on
  }
  return { ...events }
}

/**
 * use getListeners instead this.$listeners
 * @param {ComponentInstance} context 当前组件
 * @returns 
 */
export function getListeners(context) {
  return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {}
}

/**
 * 单行展示表单列数
 * @param {*} width 容器宽度
 * @param {*} breakpoints 断点列表
 * @param {*} layout 布局方式
 * @returns 
 */
export function getBreakpointSpan(width, breakpoints, layout = 'default') {
  const points = breakpoints[layout]
  if (width < points[0]) {
    return 1
  } else if (width >= points[0] && width < points[1]) {
    return 2
  } else if (width >= points[1] && width < points[2]) {
    return 3
  } else {
    return 4
  }
}
