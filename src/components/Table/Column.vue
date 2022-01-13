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

    // 是否可编辑状态
    const isEdit = top.editable && editable
    // 是否自定义渲染 column
    const isCustomRender = renderColumn || defaultSlot

    if (isEdit || isCustomRender) {
      scopedSlots.default = ({ row, column, $index }) => {
        // 是否编辑 column
        const isEditCell = top.editingCell && top.editingCell.colKey === prop && top.editingCell.rowKey === $index
        // 是否编辑 row
        const isEditRow = top.editingRow.includes($index)
        // 设置当前 row 或 column 处于编辑状态
        // 可在 `scopedSlots.default`中通过`column.editing`来判断是否处于编辑状态
        if (isEditCell || isEditRow) {
          column.editing = true
        }
        
        const fieldProps = {
          on: {
            blur: () => {
              if (top.editable === 'field') {
                top.save($index)
              }
            },
            change: val => {
              console.log('change', val)
            }
          }
        }

        if (isEdit) {
          const _row = column.editing ? top.editingData[$index] : row
          return (
            renderColumn
              ? renderColumn(h, { row: _row, column, $index })
              : defaultSlot
                ? defaultSlot({ row: _row, column, $index })
                : column.editing
                  ? <el-input vModel={_row[prop]} type={valueType} {...fieldProps} />
                  : _row[prop]
          )
        }
        
        if (isCustomRender) {
          return (renderColumn ? renderColumn(h, { row, column, $index }) : defaultSlot({ row, column, $index }))
        }
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
