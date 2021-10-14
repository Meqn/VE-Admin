import { debounce, throttle } from '@/utils'
import ResizeObserver from 'resize-observer-polyfill'

export default class Resize {
  resizeObserver = null
  currentElement = null
  width = 0
  height = 0
  
  constructor(el, options = {}) {
    this.options = Object.assign({
      rateDelay: 150 // The rate limit wait time
    }, options)

    this.init(el)
  }

  init(element) {
    if (this.options.disabled) {
      this.destroyObserver()
      return
    }

    if (element !== this.currentElement) {
      this.destroyObserver()
      this.currentElement = element
    }
    if (!this.resizeObserver && element) {
      this.resizeObserver = new ResizeObserver(this._onResize())
      this.resizeObserver.observe(element)
    }
  }

  _onResize() {
    const { rateLimiter, rateDelay } = this.options
    if (rateLimiter) {
      const limiter = { debounce, throttle }
      return limiter[rateLimiter](this._handleResize.bind(this), rateDelay)
    }
    return this._handleResize.bind(this)
  }

  _handleResize(entries) {
    const target = entries[0].target
    const { width, height } = target.getBoundingClientRect()

    const fixedWidth = Math.floor(width)
    const fixedHeight = Math.floor(height)

    if (this.width !== fixedWidth || this.height !== fixedHeight) {
      const size = { width: fixedWidth, height: fixedHeight }
      this.width = fixedWidth
      this.height = fixedHeight

      const { resize } = this.options
      if (typeof resize === 'function') {
        Promise.resolve().then(() => {
          resize(size, target)
        })
      }
    }
  }

  destroyObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  }
}
