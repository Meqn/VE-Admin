<script>
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
    size: String,
    // form-item 附加
    formItemClass: [String, Object, Array],
    formItemStyle: [String, Object]
  },
  inject: ['getSpan', 'getColumn', 'groupType'],
  data() {
    return {
      visible: true,
      validError: null
    }
  },
  computed: {
    spanNum() {
      const colSpan = this.getSpan()
      if (this.span) {
        const _span = this.span / this.getColumn()
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
  render() {
    const { spanNum, offset, visible } = this

    // el-form-item
    let errorSlot = {}
    if (this.$scopedSlots.error) {
      errorSlot = {
        error: ({ error }) => this.$scopedSlots.error({ error })
      }
    }
    const $formItem = (<el-form-item
      ref="elFormItem"
      class={this.formItemClass}
      style={this.formItemStyle}
      prop={this.prop}
      label={this.label}
      labelWidth={this.labelWidth}
      required={this.required}
      rules={this.rules}
      error={this.error}
      showMessage={this.showMessage}
      inlineMessage={this.inlineMessage}
      size={this.size}
      scopedSlots={errorSlot}>

      {this.$slots.default}
      { this.$slots.label && (<template slot="label">{this.$slots.label}</template>) }
    </el-form-item>)

    return (
      <el-col span={spanNum} offset={offset} vShow={visible} class="form-col">
        {$formItem}
      </el-col>
    )
  },
  methods: {
    hide() {
      this.visible = false
    },
    show() {
      this.visible = true
    }
  }
}
</script>
