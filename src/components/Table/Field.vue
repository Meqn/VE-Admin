<script>
export default {
  name: 'TableField',
  props: {
    data: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  inject: ['top'],
  mounted() {
    if (this.top.editable === 'cell') {
      const $field = this.$refs.field
      $field && $field.focus()
      console.log('$field', $field)
    }
  },
  render() {
    const { type, option } = this
    const { row, prop } = this.data
    const fieldOptions = {
      on: this.$listeners,
      props: {
        size: this.top.table.size,
        ...option
      },
      ref: 'field'
    }
    // Input 输入框
    if (type === 'text' || type === 'textarea') {
      return (
        <el-input vModel={row[prop]} autosize={true} { ...fieldOptions } type={type} />
      )
    }
    // InputNumber 计数器
    if (type === 'inputNumber') {
      return (
        <el-input-number vModel={row[prop]} min={1} max={100} { ...fieldOptions } />
      )
    }
    // Select 选择器
    if (type === 'select' && option.options) {
      return (
        <el-select vModel={row[prop]} placeholder="请选择" { ...fieldOptions }>
          {
            option.options.map(item => (<el-option key={item.value} label={item.label} value={item.value} />))
          }
        </el-select>
      )
    }
    // Switch 开关
    if (type === 'switch') {
      return (
        <el-switch vModel={row[prop]} class="switch-text" { ...fieldOptions } />
      )
    }
    // TimePicker 时间选择器
    if (type === 'time') {
      return (
        <el-time-picker vModel={row[prop]} placeholder="选择时间" picker-options={{ selectableRange: '00:00:00 - 23:59:59' }} value-format="HH:mm:ss" { ...fieldOptions } />
      )
    }
    // DatePicker 日期选择器
    if (type === 'date' || type === 'datetime') {
      return (
        <el-date-picker vModel={row[prop]} placeholder="选择日期" value-format="yyyy-MM-dd" { ...fieldOptions } type={type} />
      )
    }
    return null
  }
}
</script>
