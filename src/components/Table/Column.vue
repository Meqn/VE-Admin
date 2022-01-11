<script>
export default {
  name: 'TableColumn',
  props: {
    option: Object
  },
  inject: ['top'],
  render(h) {
    const top = this.top
    const { render: renderColumn, slots, editable, valueType, prop } = this.option
    const scopedSlots = {}
    
    const headerSlot = (slots && slots.header) ? top.$scopedSlots[slots.header] : null
    if (headerSlot) {
      // props = { column, $index }
      scopedSlots.header = props => headerSlot(props)
    }

    const defaultSlot = (slots && slots.default) ? top.$scopedSlots[slots.default] : null

    if (top.editable && editable) {
      scopedSlots.default = props => {
        const { row, $index } = props
        if ((top.editCell && top.editCell.label === prop && top.editCell.index === $index) || top.editRow.includes($index)) {
          props.column.editing = true
        }
        
        const fieldProps = {
          on: {
            blur: () => {
              if (top.editable === 'field') {
                top.editCell = null
              }
            },
            change: val => {
              console.log('change', val)
            }
          }
        }

        return (
          renderColumn
            ? renderColumn(h, props)
            : defaultSlot
              ? defaultSlot(props)
              : props.column.editing
                ? <el-input vModel={row[prop]} type={valueType} {...fieldProps} />
                : row[prop]
        )
      }
    } else {
      if ((renderColumn || defaultSlot)) {
        scopedSlots.default = props => (renderColumn ? renderColumn(h, props) : defaultSlot(props))
      }
    }

    const columnProps = {
      props: this.option,
      scopedSlots
    }
    return (<el-table-column column-key={prop} {...columnProps} />)
  }
}
</script>
