<script>
export default {
  name: 'VeSelect',
  props: {
    value: [Number, String, Boolean, Array],
    multiple: Boolean,
    remote: Boolean,
    remoteMethod: Function, // 必须是 PromiseFn
    /** 自定义props */
    options: Array, // 列表数据
    immediate: Boolean // 是否立即执行 (默认有值，可用于编辑状态)
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    const defaultVal = !this.multiple
      ? this.value || ''
      : Array.isArray(this.value) ? this.value : []
    
    return {
      loading: false,
      val: defaultVal,
      optionList: []
    }
  },
  mounted() {
    if (this.remote && this.immediate) {
      this.$_queryData()
    } else if (this.options) {
      this.optionList = this.options
    }

    this.$watch('value', val => (this.val = val))
    this.$watch('options', val => {
      if (!this.remote) {
        this.optionList = val
      }
    })

    this.$nextTick(() => {
      // 限制最大宽度，避免select-option内容过长超出屏幕
      try {
        const winWidth = window.innerWidth || document.body.clientWidth
        const { left } = this.$el.getBoundingClientRect()
        const $popper = this.$refs.select?.$refs.popper.$el
        if ($popper) {
          $popper.style.maxWidth = Math.round(winWidth - left - 20) + 'px'
        }
      } catch (error) {
        console.error(error)
      }
    })
  },
  render(h) {
    const selectProps = {
      ref: 'select',
      props: {
        ...this.$attrs,
        value: this.val,
        multiple: this.multiple,
        remote: this.remote,
        loading: this.loading,
        remoteMethod: this.$_queryData
      },
      on: {
        ...this.$listeners,
        change: this.$_onChange,
        focus: this.$_onFocus
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
          this.optionList.map((item, index) => {
            const scopedSlots = $defaultSlot ? {
              default: () => $defaultSlot({ item, index })
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
    $_queryData(text = '') {
      try {
        if (this.loading) return
        if (this.remote && this.remoteMethod) {
          this.loading = true
          this.remoteMethod({ text }).then(data => {
            this.optionList = data
          }).finally(() => {
            this.loading = false
          })
        }
      } catch (error) {
        this.optionList = []
      }
    },
    // 获取焦点状态
    $_onFocus() {
      if (this.remote && !this.optionList?.length) {
        this.$_queryData()
      }
      this.$emit('focus')
    },
    $_onChange(val) {
      const index = this.optionList.findIndex(v => v.value === val)
      this.$emit('change', val, this.optionList[index])
    },
    focus() {
      this.$refs.select?.focus()
    },
    blur() {
      this.$refs.select?.blur()
    }
  }
}
</script>
