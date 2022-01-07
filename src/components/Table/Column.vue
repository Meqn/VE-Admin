<script>
export default {
  name: 'TableColumn',
  props: {
    option: Object
  },
  inject: ['top'],
  render(h) {
    const $top = this.top
    const { render: renderColumn, slots } = this.option
    const scopedSlots = {}

    const headerSlot = (slots && slots.header) ? $top.$scopedSlots[slots.header] : null
    if (headerSlot) {
      // props = { column, $index }
      scopedSlots.header = props => headerSlot(props)
    }

    const defaultSlot = (slots && slots.default) ? $top.$scopedSlots[slots.default] : null
    if (renderColumn || defaultSlot) {
      // props = { row, column, $index }
      scopedSlots.default = props => (renderColumn ? renderColumn(props, h) : defaultSlot(props))
    }

    const columnProps = {
      props: this.option,
      scopedSlots
    }
    return (<el-table-column {...columnProps} />)
  }
}
</script>
