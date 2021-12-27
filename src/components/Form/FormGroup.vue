<script>
import isFunction from 'lodash/isFunction'
import { isEmptyElement } from '@/utils/validate'
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
    direction: String,
    size: String
  },
  provide() {
    return {
      groupType: this.type,
      getColumn: this.getColumnFromGroup
    }
  },
  inject: ['getColumn'],
  computed: {
    columnNum() {
      return this.column || this.getColumn()
    }
  },
  methods: {
    getColumnFromGroup() {
      return this.columnNum
    },
    getOptionProps(vnode) {
      if (vnode.componentOptions) {
        const componentOptions = vnode.componentOptions;
        const { propsData = {}, Ctor = {} } = componentOptions;
        const props = (Ctor.options || {}).props || {};
        const res = {};
        for (const k in props) {
          const v = props[k];
          const defaultValue = v.default;
          if (defaultValue !== undefined) {
            res[k] = isFunction(defaultValue) ? defaultValue.call(vnode) : defaultValue;
          }
        }
        return { ...res, ...propsData };
      }
      return {};
    },
    getSlots(vnode) {
      const componentOptions = vnode.componentOptions || {};
      const children = vnode.children || componentOptions.children || [];
      const slots = {};
      children.forEach(child => {
        if (!isEmptyElement(child)) {
          const name = (child.data && child.data.slot) || 'default';
          slots[name] = slots[name] || [];
          if (child.tag === 'template') {
            slots[name].push(child.children);
          } else {
            slots[name].push(child);
          }
        }
      });
      return { ...slots };
    },
    getItems() {
      const $default = this.$slots.default || []
      const children = $default.filter(vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'VeFormItem')
      const nodes = children.map(vnode => {
        return {
          props: this.getOptionProps(vnode),
          slots: this.getSlots(vnode),
          vnode
        };
      })

      return nodes
    }
  },
  render() {
    const { type, title, extra, $slots } = this
    const $content = {
      grid: null,
      cell: null
    }
    
    if (type === 'grid') {
      // grid
      $content.grid = (
        <el-row ref="row" type="flex" justify="start" align={this.align} gutter={this.gutter} class="ve-form-grid">
          {this.$slots.default}
        </el-row>
      )
    } else if (type === 'cell') {
      // cell
      const items = this.getItems()
      $content.cell = (
        <el-descriptions border column={this.columnNum} direction={this.direction} size={this.size} class="ve-form-cell">
          { items.map(item => (
            <el-descriptions-item label={item.props.label}>
              { item.slots.label && (<template slot="label">{item.slots.label}</template>) }
              <el-form-item { ...getFormItemProps(item.props, 'cell') }>
                { item.slots.default }
              </el-form-item>
            </el-descriptions-item>
          ))}
        </el-descriptions>
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

        <div class="ve-form-group-body">{$content[type] || null}</div>
      </div>
    )
  }
}
</script>
