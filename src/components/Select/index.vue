<script>
const popClass = 've-select-popper-' + Math.floor(Math.random() * Date.now()).toString(36) // 唯一性

export default {
  name: 'VeSelect',
  props: {
    value: [Number, String, Boolean, Array],
    remote: Boolean,
    remoteMethod: Function, // 必须是 PromiseFn
    popperClass: String,
    /** 自定义props */
    options: Array, // 列表数据
    immediate: Boolean // 是否立即执行 (默认有值，可用于编辑状态)
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    const { multiple } = this.$attrs
    const defaultVal = !multiple
      ? this.value || ''
      : Array.isArray(this.value) ? this.value : []
    
    return {
      loading: false,
      val: defaultVal,
      list: []
    }
  },
  created() {
    if (this.remote && this.immediate) {
      this.$_queryData()
    } else if (this.options) {
      this.list = this.options
    }

    this.$watch('value', val => (this.val = val))
    this.$watch('options', val => {
      if (!this.remote) {
        this.list = val
      }
    })
  },
  render(h) {
    const selectProps = {
      props: {
        ...this.$attrs,
        value: this.val,
        remote: this.remote,
        loading: this.loading,
        remoteMethod: this.$_queryData,
        popperClass: this.popperClass ? (`${popClass} ${this.popperClass}`) : popClass
      },
      on: {
        ...this.$listeners,
        change: this.$_onChange,
        focus: this.$_onFocus,
        clear: this.$_onClear
      }
    }

    const $defaultSlot = this.$scopedSlots.default
    const $slots = this.$slots
    // Select 组件头部内容
    const prefixDom = $slots.prefix && (<template slot="prefix">{$slots.prefix}</template>)
    // 无选项时的列表
    const emptyDom = $slots.empty && (<template slot="empty">{$slots.empty}</template>)

    return (
      <el-select {...selectProps}>
        {
          this.list.map(item => {
            const scopedSlots = $defaultSlot ? {
              default: () => $defaultSlot(item)
            } : {}
            return (
              <el-option key={item.value} label={item.label} value={item.value} disabled={item.disabled} {...{ scopedSlots }} />
            )
          })
        }
        { prefixDom }
        { emptyDom }
      </el-select>
    )
  },
  methods: {
    $_setSelectPopperStyle() {
      // 限制最大宽度，避免select-option内容过长超出屏幕
      try {
        const winWidth = window.innerWidth || document.body.clientWidth
        const selectLeft = this.$el?.getBoundingClientRect().left
        let maxWidth = this.$el.clientWidth
        if (selectLeft) {
          maxWidth = Math.round(winWidth - selectLeft - 20)
        }
        document.querySelector(`.${popClass}`).style['max-width'] = maxWidth + 'px'
      } catch (error) {
        console.error(error)
      }
    },
    $_queryData(text) {
      try {
        if (this.loading) return
        if (!text && this.list.length > 0) return
        if (this.remoteMethod) {
          this.loading = true
          this.remoteMethod(text).then(data => {
            this.list = data
          }).finally(() => {
            if (!this.loading) {
              // 配合 clear 事件
              this.list = []
            }
            this.loading = false
          })
        }
      } catch (error) {
        this.list = []
      }
    },
    // 获取焦点状态
    $_onFocus() {
      this.$_setSelectPopperStyle()
      
      if (this.remote && !this.list?.length) {
        this.$_queryData()
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
      this.$emit('change', val, this.list[index])
    },
    focus() {
      this.$refs['select']?.focus()
    },
    blur() {
      this.$refs['select']?.blur()
    }
  }
}
</script>
