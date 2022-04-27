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
  render(h) {
    const $defaultSlot = this.$scopedSlots.default
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
