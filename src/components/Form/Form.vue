<template>
  <el-form
    ref="veForm"
    class="ve-form"
    v-resize:debounce="$_resize"
    :model="model"
    :rules="rules"
    :labelPosition="labelPosition"
    :labelWidth="labelWidth"
    :labelSuffix="labelSuffix"
    :inline="false"
    :inlineMessage="inlineMessage"
    :statusIcon="statusIcon"
    :showMessage="showMessage"
    :size="size"
    :disabled="disabled"
    :validateOnRuleChange="validateOnRuleChange"
    :hideRequiredAsterisk="hideRequiredAsterisk"
    v-on="$listeners">
    <slot />
  </el-form>
</template>

<script>
import resize from 'v-resize-observer'
import { SPAN_BREAKPOINTS } from '../constant'
import { getBreakpointSpan } from '../utils'
import './style.scss'

export default {
  name: 'VeForm',
  directives: {
    resize: resize.directive
  },
  props: {
    // form
    model: Object,
    rules: Object,
    // inline: Boolean, // 移除 inline 行内表单模式
    labelPosition: String,
    labelWidth: String,
    labelSuffix: String,
    hideRequiredAsterisk: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    inlineMessage: Boolean,
    statusIcon: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    size: String,
    disabled: Boolean,
    // 附加属性
    column: {
      type: Number,
      validator(val) {
        return val > 0 && val <= 4
      }
    }
  },
  data() {
    return {
      columnNum: this.column || 3
    }
  },
  computed: {
    isVertical() {
      return this.labelPosition === 'top'
        ? true
        : !this.labelWidth
    }
  },
  provide() {
    return {
      getColumn: this.getColumn,
      form: this
    }
  },
  mounted() {
    const formMethods = ['validate', 'validateField', 'resetFields', 'clearValidate']
    const $veForm = this.$refs.veForm
    formMethods.forEach(method => {
      this[method] = $veForm[method]
    })
  },
  methods: {
    getColumn() {
      return this.column || this.columnNum
    },
    $_resize({ width }) {
      this.columnNum = getBreakpointSpan(width, SPAN_BREAKPOINTS, this.isVertical ? 'vertical' : 'default')
      this.$emit('resize', this.columnNum)
    }
  }
}
</script>
