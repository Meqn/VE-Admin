<template>
<el-col :span="spanNum" :offset="offset" v-show="visible" class="form-col">
  <el-form-item
    ref="elFormItem"
    :class="formItemClass"
    :style="formItemStyle"
    :prop="prop"
    :label="label"
    :labelWidth="labelWidth"
    :required="required"
    :rules="rules"
    :error="error"
    :showMessage="showMessage"
    :inlineMessage="inlineMessage"
    :size="size"
    v-on="$listeners">
    <slot />
    <template #label><slot name="label" /></template>
    <template v-slot:error="itemError">
      <slot v-bind="{ error: itemError }" />
    </template>
  </el-form-item>
</el-col>
</template>

<script>
export default {
  name: 'VeGridFormItem',
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
    // 其他
    formItemClass: [String, Object, Array],
    formItemStyle: [String, Object]
  },
  inject: ['colSpan', 'column'],
  data() {
    return {
      visible: true
    }
  },
  computed: {
    spanNum() {
      const colSpan = this.colSpan()
      if (this.span) {
        const _span = this.span / this.column()
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
  }
}
</script>
