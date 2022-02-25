<script>
export default {
  name: 'VeFlex',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    direction: {
      type: String,
      validator(val) {
        return ['row', 'column'].indexOf(val) !== -1
      }
    },
    wrap: {
      type: String,
      validator(val) {
        return ['nowrap', 'wrap'].indexOf(val) !== -1
      }
    },
    align: {
      type: String,
      validator(val) {
        return ['top', 'middle', 'bottom', 'baseline', 'stretch'].indexOf(val) !== -1
      }
    },
    justify: {
      type: String,
      validator(val) {
        return ['left', 'center', 'right', 'between', 'around'].indexOf(val) !== -1
      }
    }
  },
  render (h) {
    return h(this.tag, {
      class: [
        'flex',
        (this.direction && `flex--${this.direction}`),
        (this.wrap && `flex--${this.wrap}`),
        (this.justify && `flex--${this.justify}`),
        (this.align && `flex--${this.align}`)
      ]
    }, this.$slots.default)
  }
}
</script>
