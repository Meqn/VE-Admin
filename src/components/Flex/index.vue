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

<style lang="scss">
.flex{
  display: flex;
  &-item{
    min-width: 0;
    flex: 1;
  }
  &--row{
    flex-direction: row;
  }
  &--column{
    flex-direction: column;
  }
  &--nowrap{
    flex-wrap: nowrap;
  }
  &--wrap{
    flex-wrap: wrap;
  }
  &--left{
    justify-content: flex-start;
  }
  &--center{
    justify-content: center
  }
  &--right{
    justify-content: flex-end;
  }
  &--between{
    justify-content: space-between;
  }
  &--around{
    justify-content: space-around;
  }
  &--top{
    align-items: flex-start;
  }
  &--middle{
    align-items: center;
  }
  &--bottom{
    align-items: flex-end;
  }
  &--baseline{
    align-items: baseline;
  }
  &--stretch{
    align-items: stretch;
  }
}
</style>
