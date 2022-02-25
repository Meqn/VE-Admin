<script>
import { randomStr } from '@/utils'
import staticData from './data'
import { getProjectList } from '@/api/common'

export default {
  name: 'AppSelectFilter',
  props: {
    value: [Number, String, Array],
    multiple: Boolean,
    disabled: Boolean,
    size: String,
    clearable: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    multipleLimit: Number,
    name: String,
    autocomplete: {
      type: String,
      default: 'off'
    },
    placeholder: String,
    filterable: {
      type: Boolean,
      default: true
    },
    remote: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    /** 自定义props */
    // 列表数据
    data: Array,
    type: {
      type: String,
      validator(val) {
        return ['', 'demo', 'project', 'myProject', 'company', 'user', 'userRole', 'department', 'job'].includes(val)
      }
    },
    // 是否立即执行 (默认有值，可用于编辑状态)
    immediate: Boolean,
    // 附加查询条件
    query: Object,
    // 请求后的数据处理
    handler: Function
  },
  data() {
    const defaultVal = !this.multiple
      ? this.value || ''
      : Array.isArray(this.value)
        ? this.value
        : []
    
    return {
      loading: false,
      val: defaultVal,
      list: [],
      pageSize: 30,
      popperClass: 'select-popper-' + randomStr() // 唯一性
    }
  },
  watch: {
    value(val) {
      this.val = val
    }
  },
  created() {
    if (this.data) { // 传递数据
      this.list = this.data
    } else {
      if (this.remote) { // 请求数据
        if (this.immediate) {
          this.queryList()
        }
      } else { // 内置数据
        this.list = staticData[this.type] || []
      }
    }
  },
  render(h) {
    let props = {
      value: this.val,
      multiple: this.multiple,
      disabled: this.disabled,
      size: this.size,
      clearable: this.clearable,
      'collapse-tags': this.collapseTags,
      'multiple-limit': this.multipleLimit,
      name: this.name,
      autocomplete: this.autocomplete,
      placeholder: this.placeholder,
      filterable: this.filterable,
      'popper-class': this.popperClass,
      'popper-append-to-body': this.popperAppendToBody
    }
    let events = {
      input: (value) => (this.val = value),
      change: this.$_onChange,
      removeTag: (value) => (this.$emit('remove-tag', value))
    }
    if (this.remote && !this.data) {
      props = Object.assign({
        'remote-method': this.queryList,
        remote: this.remote,
        loading: this.loading
      }, props)
      events = Object.assign({
        focus: this.$_onFocus,
        clear: this.$_onClear
      }, events)
    }
    const $defaultSlot = this.$scopedSlots.default
    return h(
      'el-select',
      {
        ref: 'select',
        props,
        on: events
      },
      this.list.map(item => h('el-option', {
        props: {
          label: item.name,
          value: item.value
        }
      }, $defaultSlot && $defaultSlot({ item })))
    )
  },
  methods: {
    setSelectPopperStyle() {
      // 限制最大宽度，避免select-option内容过长超出屏幕
      try {
        const winWidth = window.innerWidth || document.body.clientWidth
        const selectLeft = this.$el?.getBoundingClientRect().left
        let maxWidth = this.$el.clientWidth
        if (selectLeft) {
          maxWidth = Math.round(winWidth - selectLeft - 20)
        }
        document.querySelector(`.${this.popperClass}`).style['max-width'] = maxWidth + 'px'
      } catch (error) {
        console.error(error)
      }
    },
    queryList(text) {
      if (this.loading) return
      if (!text && this.list.length > 0) return
      const _request = this[`$_${this.type}`]
      if (_request) {
        this.loading = true
        _request.call(this, text || '').finally(() => {
          if (!this.loading) {
            // 配合 clear 事件
            this.list = []
          }
          this.loading = false
        })
      }
    },
    getQuery(key, value) {
      const condition = Object.assign({ page_size: this.pageSize }, this.query)
      if (key) {
        condition[key] = value
      }
      return condition
    },
    focus() {
      this.$refs['select'].focus()
    },
    blur() {
      this.$refs['select'].blur()
    },
    // 获取焦点状态
    $_onFocus() {
      this.setSelectPopperStyle()

      if (this.remote && this.filterable) {
        this.queryList()
      }
      this.$emit('focus')
    },
    // 清空过滤文本
    $_onClear() {
      if (this.remote) {
        this.loading = false
        this.list = []
      }
      this.$emit('clear')
    },
    $_onChange(val) {
      const index = this.list.findIndex(v => v.value === val)
      this.$emit('input', val)
      this.$emit('change', this.list[index], index)
    },
    // 项目
    $_project(text) {
      return getProjectList(this.getQuery('project_name', text)).then(({ data }) => {
        if (data) {
          const results = data.results.map(v => {
            return {
              ...v,
              value: v.id,
              name: v.project_name
            }
          })
          this.list = typeof handler === 'function' ? (this.handler() || []) : results
        }
      })
    }
  }
}
</script>
