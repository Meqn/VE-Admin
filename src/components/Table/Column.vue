<script>
import Cell from './Cell.vue'
export default {
  name: 'TableColumn',
  props: {
    option: Object
  },
  inject: ['top'],
  render(h) {
    const top = this.top
    const { render: renderColumn, slots, editable, prop } = this.option
    const scopedSlots = {}
    
    const headerSlot = (slots && slots.header) ? top.$scopedSlots[slots.header] : null
    if (headerSlot) {
      // props = { column, $index }
      scopedSlots.header = props => headerSlot(props)
    }

    const defaultSlot = (slots && slots.default) ? top.$scopedSlots[slots.default] : null

    // 是否可编辑
    const isEditable = top.editableType && editable
    // 是否自定义渲染 column
    const isCustomRender = renderColumn || defaultSlot

    if (isEditable || isCustomRender) {
      scopedSlots.default = ({ row, column, $index }) => {
        // 判断当前是否编辑 column
        const isEditingCell = top.editingCell && top.editingCell.colKey === prop && top.editingCell.rowKey === $index
        // 判断当前是否编辑 row
        const isEditingRow = top.editingRow.includes($index)
        // 设置当前 row 或 column 处于编辑状态
        // 可在 `scopedSlots.default`中通过`column.editing`来判断是否处于编辑状态
        if (isEditingCell || isEditingRow) {
          column.editing = true
        }
        
        if (isEditable) {
          const _row = column.editing ? top.editingData[$index] : row
          return (
            renderColumn
              ? renderColumn(h, { row: _row, column, $index })
              : defaultSlot
                ? defaultSlot({ row: _row, column, $index })
                : <Cell data={{ row: _row, column, $index }} />
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
