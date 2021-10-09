<script>
export default {
  name: 'TableColumn',
  props: {
    option: Object
  },
  inject: ['top'],
  render(h) {
    const $top = this.top
    const { renderColumn, slots } = this.option
    const defaultSlot = (slots && slots.default) ? $top.$scopedSlots[slots.default] : null
    const headerSlot = (slots && slots.header) ? $top.$scopedSlots[slots.header] : null

    const scopedSlots = {}
    if (renderColumn || defaultSlot) {
      // props = { row, column, $index }
      scopedSlots.default = props => (renderColumn ? renderColumn(h, props) : defaultSlot(props))
    }
    if (headerSlot) {
      // props = { column, $index }
      scopedSlots.header = props => headerSlot(props)
    }
    return h('el-table-column', {
      props: this.option,
      scopedSlots
    })
  }
}
</script>
