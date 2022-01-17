<template>
<div class="ve-table-cell">
  <template v-if="data.column.editing">
    <div class="ve-table-cell-content">
      <slot name="edit">
        <el-input v-model="data.row[prop]" ref="field" v-on="$listeners" />
      </slot>
    </div>
    <template v-if="showButtons">
      <Icon name="el-icon-check" title="保存" @click="$_handleSave" class="btn-save" />
      <Icon v-if="hasCancel" name="el-icon-close" title="取消" @click="$_handleCancel" class="btn-cancel" />
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
import Icon from '@/components/Icon'

export default {
  name: 'VeTableCell',
  components: {
    Icon
  },
  inject: ['top'],
  props: {
    data: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      validator(val) {
        return ['auto', 'hand'].includes(val)
      },
      default: 'auto'
    },
    field: Object,
    hasCancel: Boolean
  },
  computed: {
    prop() {
      return this.data.column.property
    },
    isEditCell() {
      return this.top.editableType === 'cell'
    },
    showButtons() {
      return this.top.editableType === 'cell' && this.mode === 'hand'
    }
  },
  watch: {
    'data.column.editing'(val) {
      console.log('watch: data.column.editing', val, this.data)
      if (this.isEditCell) {
        if (val) {
          // 自动获取焦点
          this.$nextTick(() => {
            const $field = this.$refs['field'] || this.$el.querySelector('input') || this.$el.querySelector('textarea')
            $field && $field.focus()
          })
          // 自动保存 (绑定事件)
          if (this.mode === 'auto') {
            document.addEventListener('click', this.$_hanleClickCell)
          }
        } else {
          // 取消自动保存 (绑定事件)
          if (this.mode === 'auto') {
            document.removeEventListener('click', this.$_hanleClickCell)
          }
        }
      }
    }
  },
  methods: {
    $_handleEdit() {
      this.top.edit(this.data)
    },
    $_handleSave() {
      if (this.isEditCell) {
        this.top.save(this.data.$index)
      }
    },
    $_handleCancel() {
      this.top.edit(this.data.$index, false)
    },
    $_hanleClickCell(ev) {
      if (!this.$el.contains(ev.target)) {
        this.$_handleSave()
      }
    }
  }
}
</script>
