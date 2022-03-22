<script>
import { getOptionProps, getSlots } from '../utils'
import { getFormItemProps } from './utils'

export default {
  name: 'VeFormGroup',
  props: {
    type: {
      type: String,
      default: 'grid'
    },
    title: String,
    extra: String,
    // 一行 Item 的数量
    column: Number,
    // row
    gutter: Number,
    align: {
      type: String,
      default: 'top'
    },
    // Descriptions
    direction: {
      type: String,
      default: 'horizontal'
    },
    size: String
  },
  provide() {
    return {
      group: this,
      getColumn: this.getColumnFromGroup
    }
  },
  inject: ['form', 'getColumn'],
  computed: {
    columnNum() {
      return this.column || this.getColumn()
    },
    groupSize() {
      return this.size || this.form.size
    }
  },
  methods: {
    getColumnFromGroup() {
      return this.columnNum
    },
    getItems() {
      const $default = this.$slots.default || []
      const children = $default.filter(vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'VeFormItem')
      const nodes = children.map(vnode => {
        return {
          props: getOptionProps(vnode),
          slots: getSlots(vnode),
          vnode
        };
      })

      return nodes
    }
  },
  render() {
    const { type, title, extra, $slots } = this
    const contentDom = {
      grid: null,
      cell: null
    }
    
    if (type === 'cell') {
      // cell
      const items = this.getItems()
      contentDom.cell = (
        <el-descriptions border column={this.columnNum} direction={this.direction} size={this.groupSize} class={['ve-form-cell', `ve-form-cell-${this.direction}`]}>
          { items.map(item => {
            const formItemProps = getFormItemProps({ ...item.props, size: this.groupSize }, this)
            return (
              <el-descriptions-item label={item.props.label} span={item.props.span || 1}>
                <label slot="label" class={['cell-item-label', { 'is-required': formItemProps.props.required }, { 'is-no-asterisk': this.form.hideRequiredAsterisk }]}>
                  { item.slots.label || item.props.label }
                </label>
                <el-form-item { ...formItemProps }>
                  { item.slots.default }
                </el-form-item>
              </el-descriptions-item>
            )
          })}
        </el-descriptions>
      )
    } else {
      // type = grid
      contentDom.grid = (
        <el-row ref="row" type="flex" justify="start" align={this.align} gutter={this.gutter} class="ve-form-grid">
          {this.$slots.default}
        </el-row>
      )
    }

    return (
      <div class="ve-form-group">
        {
          (title || extra || $slots.title || $slots.extra)
            ? <div class="ve-form-group-header">
              <div class="ve-form-group-title">
                { $slots.title ? $slots.title : title}
              </div>
              <div class="ve-form-group-extra">
                { $slots.extra ? $slots.extra : extra }
              </div>
            </div>
            : null
        }

        <div class="ve-form-group-body">{contentDom[type] || this.$slots.default}</div>
      </div>
    )
  }
}
</script>
