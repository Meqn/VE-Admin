<script>
export default {
  name: 'SeleteItem',
  props: {
    index: Number,
    source: {
      type: Object,
      default: () => {}
    },
    itemClick: Function
  },
  inject: {
    top: 'select'
  },
  render(h) {
    const $defaultSlot = this.top.$scopedSlots.default || this.$scopedSlots.default
    return (
      <div class="select-option-item" onClick={this.onClick}>
        { $defaultSlot ? $defaultSlot({ item: this.source, index: this.index }, h) : this.source.label }
      </div>
    )
  },
  methods: {
    onClick(event) {
      event.stopPropagation()
      // event.preventDefault()
      this.itemClick(this.source, this.index)
    }
  }
}
</script>
