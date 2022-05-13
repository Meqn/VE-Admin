<template>
<div class="ve-table-cell">
  <template v-if="data.column.editing">
    <div class="ve-table-cell-content">
      <slot name="edit">
        <el-input-number
          v-if="fieldType === 'inputNumber'"
          @keyup.enter.native="$_handleSave"
          @keyup.27.native="$_handleCancel"
          :min="1" :max="100"
          ref="field" v-model="data.row[prop]" v-on="$listeners" v-bind="fieldProps" />
        <el-select
          v-else-if="fieldType === 'select'"
          @keyup.27.native="$_handleCancel"
          placeholder="请选择"
          class="w-full"
          ref="field" v-model="data.row[prop]" v-on="$listeners" v-bind="fieldProps">
          <template v-if="Array.isArray(fieldProps.options)">
            <el-option v-for="item in fieldProps.options" :key="item.value" :label="item.label" :value="item.value" />
          </template>
        </el-select>
        <el-switch
          v-else-if="fieldType === 'switch'"
          class="switch-text"
          ref="field" v-model="data.row[prop]" v-on="$listeners" v-bind="fieldProps" />
        <el-time-picker
          v-else-if="fieldType === 'time'"
          placeholder="选择时间" :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }" value-format="HH:mm:ss" 
          ref="field" v-model="data.row[prop]" v-on="$listeners" v-bind="fieldProps" />
        <el-date-picker
          v-else-if="fieldType === 'date' || fieldType === 'datetime'"
          placeholder="选择日期" value-format="yyyy-MM-dd"
          ref="field" v-model="data.row[prop]" v-on="$listeners" v-bind="fieldProps" :type="fieldType" />
        <el-input
          v-else-if="fieldType === 'textarea'"
          @keyup.27.native="$_handleCancel"
          ref="field" autosize v-model="data.row[prop]" v-on="$listeners" v-bind="fieldProps" type="textarea" />
        <el-input
          v-else
          @keyup.enter.native="$_handleSave"
          @keyup.27.native="$_handleCancel"
          ref="field" v-model="data.row[prop]" v-on="$listeners" v-bind="fieldProps" />
      </slot>
    </div>
    <template v-if="showButtons">
      <Icon name="el-icon-check" title="保存" @click="$_handleSave" class="btn-save" />
      <Icon v-if="showCancel" name="el-icon-close" title="取消" @click="$_handleCancel" class="btn-cancel" />
    </template>
  </template>
  <template v-else>
    <div class="ve-table-cell-content">
      <slot>{{ data.row[prop] }}</slot>
    </div>
    <Icon v-if="showButtons" name="el-icon-edit" title="编辑" @click="$_handleEdit" class="btn-edit" />
  </template>
</div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'VeTableCell',
  components: {
    Icon
  },
  inject: {
    top: 'table'
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    rowKey: String,
    mode: {
      type: String,
      validator(val) {
        return ['auto', 'handle'].includes(val)
      }
    },
    fieldType: {
      type: String,
      validator(val) {
        return ['text', 'textarea', 'inputNumber', 'select', 'switch', 'time', 'date', 'datetime'].includes(val)
      },
      default: 'text'
    },
    fieldProps: {
      type: Object,
      default: () => {}
    },
    hasCancel: Boolean
  },
  computed: {
    prop() {
      return this.data.column.property
    },
    isEditCell() {
      return this.top.editableType === 'cell'
    },
    cellEditMode() {
      return this.top.editableConfig?.cellEditMode || 'auto'
    },
    showButtons() {
      return this.isEditCell && this.cellEditMode === 'handle'
    },
    showCancel() {
      return this.hasCancel || this.top.editableConfig?.cellEditCancel
    }
  },
  watch: {
    'data.column.editing'(val) {
      if (this.isEditCell) {
        if (val) {
          // 自动获取焦点
          this.$nextTick(() => {
            const $field = this.$refs['field'] || this.$el.querySelector('input') || this.$el.querySelector('textarea')
            $field && $field.focus()
          })
          // 自动保存 (绑定事件)
          if (this.cellEditMode === 'auto') {
            document.addEventListener('click', this.$_hanleClickSave)
          }
        } else {
          // 取消自动保存 (绑定事件)
          if (this.cellEditMode === 'auto') {
            document.removeEventListener('click', this.$_hanleClickSave)
          }
        }
      }
    }
  },
  methods: {
    $_handleEdit() {
      this.top.edit(this.data)
    },
    // 编辑保存
    $_handleSave() {
      if (this.isEditCell) {
        this.top.save(this.rowKey || this.data.row)
      }
    },
    // 取消编辑
    $_handleCancel() {
      if (this.isEditCell) {
        this.top.edit(this.data, false)
      }
    },
    // 自动保存
    $_hanleClickSave(ev) {
      if (!this.$el.contains(ev.target)) {
        this.$_handleSave()
      }
    }
  }
}
</script>
