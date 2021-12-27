<template>
  <el-form
    ref="veForm"
    class="ve-form"
    v-resize:debounce="$_resize"
    :model="model"
    :rules="rules"
    :labelPosition="labelAlign"
    :labelWidth="labelWidth"
    :labelSuffix="labelSuffix"
    :inline="layout === 'horizontal'"
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
import resizeDirective from 'v-resize-observer/src/directive'
export default {
  name: 'VeForm',
  directives: {
    resize: resizeDirective
  },
  props: {
    // form
    model: Object,
    rules: Object,
    // inline: Boolean, //由layout控制
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
    // 表单项布局
    layout: {
      type: String,
      validator(val) {
        return ['vertical', 'horizontal', ''].includes(val)
      }
    },
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
  provide() {
    return {
      getColumn: this.getColumn
    }
  },
  computed: {
    labelAlign() {
      return this.layout === 'vertical'
        ? 'top' : this.labelPosition === 'top'
          ? 'right' : this.labelPosition || 'right'
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
      if (width > 1366) {
        this.columnNum = 4
      } else if (width <= 1366 && width > 992) {
        this.columnNum = 3
      } else if (width <= 992 && width > 600) {
        this.columnNum = 2
      } else {
        this.columnNum = 1
      }
      this.$emit('resize', this.columnNum)
    }
  }
}
</script>

<style lang="scss">
.ve-form{
  &.el-form--label-top{
    .el-form-item__label{
      padding-bottom: 0;
    }
  }
  &-grid{
    flex-wrap: wrap;
  }
  &-cell{
    .el-form-item{
      margin-bottom: 0;
    }
  }

  &-group{
    font-size: $--font-size-base;
    color: $--color-text-primary;

    &-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $--descriptions-header-margin-bottom;
    }
    &-title{
      font-size: $--descriptions-title-font-size;
      font-weight: bold;
    }
  }
}
</style>
