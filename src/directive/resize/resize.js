import Resize from './ResizeObserver'

function getOptions({ value, arg, modifiers }) {
  const options = {}

  // resizeCallback
  if (typeof value === 'function') {
    options['resize'] = value
  }
  
  // Limit the rate of size change events
  if (arg) {
    if (arg === 'debounce') options['rateLimiter'] = 'debounce'
    else if (arg === 'throttle') options['rateLimiter'] = 'throttle'
  }

  // The rate limit wait time
  if (modifiers) {
    const delay = Object.keys(modifiers).map(k => parseInt(k)).find(v => !isNaN(v))
    options['rateDelay'] = delay || 150
  }

  return options
}

export default {
  bind(el, binding) {
    const { value } = binding
    if (value && typeof value !== 'function') {
      return console.warn('v-resize should received a function as value')
    }
    const ro = new Resize(el, getOptions(binding))
    el.__resize__ = ro
  },
  unbind(el) {
    const ro = el.__resize__
    if (ro) {
      ro.destroyObserver()
    }
  }
}
