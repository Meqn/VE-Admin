<template>
<Form
  class="ve-query-form"
  ref="searchForm"
  :model="model"
  :rules="rules"
  :labelPosition="labelPosition"
  :labelWidth="labelWidth"
  :labelSuffix="labelSuffix"
  :hideRequiredAsterisk="hideRequiredAsterisk"
  :showMessage="showMessage"
  :inlineMessage="inlineMessage"
  :statusIcon="statusIcon"
  :validateOnRuleChange="validateOnRuleChange"
  :size="size"
  :disabled="disabled"
  :layout="layout"
  @resize="$_changeColumn">
  <FormGroup type="grid" :gutter="gutter">
    <slot />
    <!-- label=" " 全角空格,解决`layout=vertical`错位显示问题 -->
    <FormItem :offset="actionOffset" label="0" label-width="1px" class="form-action">
      <div class="form-action-content">
        <slot name="action" v-bind="{ collapsed: isCollapsed }">
          <el-button @click="resetForm">{{ resetText }}</el-button>
          <el-button type="primary" @click="submitForm" :loading="loading">{{ searchText }}</el-button>
          <el-link
            v-if="hasCollapse"
            :class="['form-collapse', { 'is-collapse': isCollapsed }]"
            type="primary"
            :underline="false"
            @click="toggleCollapse">
            {{ isCollapsed ? '展开' : '收起' }}
            <i class="el-icon-arrow-up el-icon--right icon-arrow"></i>
          </el-link>
        </slot>
      </div>
    </FormItem>
  </FormGroup>
</Form>
</template>

<script>
import { Form, FormGroup, FormItem } from './index'
export default {
  name: 'VeQueryForm',
  components: {
    Form,
    FormGroup,
    FormItem
  },
  props: {
    // cells
    gutter: {
      type: Number,
      default: 24
    },
    // form
    model: Object,
    rules: Object,
    // inline: Boolean, //由layout控制
    labelPosition: String,
    labelWidth: {
      type: String,
      default: '92px'
    },
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
    // 表单项布局
    layout: String,
    // queryForm
    resetText: {
      type: String,
      default: '重 置'
    },
    searchText: {
      type: String,
      default: '查 询'
    },
    collapsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      isCollapsed: this.collapsed,
      column: 1,
      actionOffset: 1
    }
  },
  computed: {
    hasCollapse() {
      const nodes = this.$slots.default
      if (nodes) {
        return nodes.length >= this.column
      }
      return false
    }
  },
  methods: {
    $_changeColumn(num) {
      this.column = num
      this.$nextTick(() => {
        this.toggleCollapse(false)
      })
    },
    submitForm() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('submit')
        } else {
          return false;
        }
      })
    },
    resetForm() {
      this.$refs['searchForm'].resetFields()
      this.$emit('reset')
    },
    finish() {
      this.loading = false
    },
    /**
     * 控制展开与隐藏 (含初始状态)
     * change: 是否改变状态, 仅在点击展开时改变状态
     */
    toggleCollapse(change = true) {
      const nodes = this.$slots.default
      if (!nodes) return
      const { column } = this

      if (change) {
        this.isCollapsed = !this.isCollapsed
      }
      if (this.isCollapsed) {
        const start = column === 1 ? 1 : column - 1
        this.actionOffset = this.$_computedOffset(nodes.slice(0, start))
        nodes.forEach((node, index) => {
          if (index >= start) {
            node.componentInstance.hide()
          } else {
            node.componentInstance.show()
          }
        })
      } else {
        this.actionOffset = this.$_computedOffset(nodes)
        nodes.forEach((node) => {
          node.componentInstance.show()
        })
      }
    },
    // 计算action位移
    $_computedOffset(nodes) {
      // 思路: 1. 先找到最后一个显示项formItem的 `span >= 24`(即刚好占一行)
      // 2. 然后从这个formItem开始计算所有显示项的`span`总和
      // 3. 最后通过下面计算公式算出actionItem的偏移量
      // 计算公式: (一行栅格数24) - (action的span数) - (显示项span总和 % 24)
      try {
        const { column } = this
        const colSpan = Math.floor(24 / column)
        let remain = 0
        if (nodes.length > 0) {
          const indexArr = []
          let nodeArr = []
          nodes.forEach((node, i) => {
            const num = node.componentInstance.spanNum
            nodeArr.push(num)
            if (num >= 24) {
              indexArr.push(i)
            }
          })
          const indexArrLen = indexArr.length
          if (indexArrLen > 0) {
            nodeArr = nodeArr.slice(indexArr[indexArrLen - 1] + 1)
          }
          const total = nodeArr.reduce((a, c) => {
            return a + c
          }, 0)
          remain = total % 24
        }
        return 24 - colSpan - remain
      } catch (error) {
        return 0
      }
    }
  }
}
</script>
