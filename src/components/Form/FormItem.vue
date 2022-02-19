<script>
import { getSpanCount, getFormItemProps } from './utils'
export default {
  name: 'VeFormItem',
  props: {
    // cell
    span: Number, // 显示 通过计算span的个数
    // span: Number, // 栅格个数，优先级 > colSize
    offset: Number,
    // form-item
    prop: String,
    label: String,
    labelWidth: String,
    required: Boolean,
    rules: [Object, Array],
    error: String,
    showMessage: {
      type: Boolean,
      default: true
    },
    inlineMessage: Boolean,
    // form-item 附加
    formItemClass: [String, Object, Array],
    formItemStyle: Object
  },
  inject: ['group', 'getColumn'],
  data() {
    return {
      visible: true
    }
  },
  computed: {
    spanNum() {
      const column = this.getColumn()
      const colSpan = getSpanCount(column)
      if (this.span) {
        const _span = this.span / column
        if (_span >= 1) {
          return 24
        } else {
          return Math.floor(24 * _span)
        }
      }
      return colSpan
    }
  },
  mounted() {
    // <el-form-item> methods
    const formMethods = ['resetField', 'clearValidate']
    const $item = this.$refs.elFormItem
    formMethods.forEach(method => {
      this[method] = $item[method]
    })
  },
  methods: {
    hide() {
      this.visible = false
    },
    show() {
      this.visible = true
    }
  },
  render() {
    const { spanNum, offset, visible } = this
    const groupType = this.group.type
    const $formItems = {
      grid: null
    }

    // el-form-item
    let scopedSlots = {}
    if (this.$scopedSlots.error) {
      scopedSlots = {
        error: ({ error }) => this.$scopedSlots.error({ error })
      }
    }
    const formItemProps = getFormItemProps(
      { ...this.$props, scopedSlots, size: this.group.groupSize },
      this.group
    )

    // grid
    if (groupType === 'grid') {
      $formItems.grid = (
        <el-col span={spanNum} offset={offset} vShow={visible} class="form-item-grid">
          <el-form-item { ...formItemProps }>
            {this.$slots.default}
            { this.$slots.label && (<template slot="label">{this.$slots.label}</template>) }
          </el-form-item>
        </el-col>
      )
    }

    return (
      $formItems[groupType] || this.$slots.default
    )
  }
}
</script>
