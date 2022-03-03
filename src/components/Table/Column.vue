<script>
import Cell from './Cell.vue'
import { ROW_KEY } from './constant'

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
        const rowKey = row[ROW_KEY] // 当前所属行唯一值
        const { editingCell } = top

        // 判断当前是否编辑 column
        const isEditingCell = editingCell && editingCell.colKey === prop && editingCell.rowKey === rowKey
        
        // 判断当前是否编辑 row
        const isEditingRow = top.editingRow.includes(rowKey)

        // 设置当前 row 或 column 处于编辑状态
        // 可在 `scopedSlots.default`中通过`column.editing`来判断是否处于编辑状态
        if (isEditingCell || isEditingRow) {
          column.editing = true
        }
        
        if (isEditable) {
          const _row = column.editing ? top.editingData[rowKey] : row
          const scopeValue = { row: _row, column, $index }
          return (
            renderColumn
              ? renderColumn(h, scopeValue)
              : defaultSlot
                ? defaultSlot(scopeValue)
                : <Cell data={scopeValue} rowKey={rowKey} fieldProps={this.option.fieldProps} fieldType={this.option.fieldType} />
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
