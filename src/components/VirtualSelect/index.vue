<template>
<el-popover
  ref="popover"
  v-model="visible"
  trigger="click"
  placement="bottom-start"
  :disabled="disabled"
  transition="el-zoom-in-top"
  :popper-options="popperOptions"
  :append-to-body="popperAppendToBody"
  :popper-class="popoverClass">

  <el-select
    slot="reference"
    ref="select"
    v-model="selectedValue"
    :placeholder="placeholder"
    :class="['ve-virtual-select', { 'is-focus': visible }]"
    :size="selectSize"
    :style="{ width }"
    :disabled="disabled"
    :multiple="multiple"
    :value-key="valueKey"
    :clearable="clearable"
    :collapse-tags="collapseTags"
    :multiple-limit="multipleLimit"
    :filterable="false"
    :popper-append-to-body="false"
    @remove-tag="deleteItem"
    @click.native="showSelect = !showSelect">
    <el-option v-for="item in selectedOption" :key="item[valueKey]" :label="item.label" :value="item[valueKey]" />
  </el-select>

  <div class="select-search">
    <el-input
      placeholder="输入关键字"
      v-model="queryText"
      style="width: 100%"
      :size="selectSize"
      clearable
      @input="debouncedQueryChange"
    />
  </div>
  <VirtualList
    ref="scroll"
    class="el-select-dropdown__list select-dropdown-list"
    :data-key="valueKey"
    :data-sources="optionList"
    :data-component="itemComponent"
    :estimate-size="itemHeight"
    :keeps="keeps"
    item-class="el-select-dropdown__item"
    :item-class-add="itemSelectedClass"
    :extra-props="{ itemClick }"
    :item-scoped-slots="{
      default: itemRender
    }"
    footer-class="select-dropdown-footer"
    @totop="onScrollToTop"
    @tobottom="onScrollToBottom">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template #footer>
      <div v-if="loading" :class="['tip-message', { more: currentPage > 1 }]">{{ loadingText }}</div>
      <div v-if="!loading && optionList.length === 0" class="tip-message">{{ noDataText }}</div>
    </template>
  </VirtualList>
</el-popover>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import Item from './Item.vue'
import debounce from 'lodash/debounce'

export default {
  name: 'VeVirtualSelect',
  components: {
    VirtualList
  },
  props: {
    // select
    value: [Number, String, Boolean, Array],
    valueKey: {
      type: String,
      default: 'value'
    },
    multiple: Boolean,
    disabled: Boolean,
    width: String,
    size: String,
    clearable: Boolean,
    collapseTags: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: String,
    filterable: Boolean,
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    loadingText: {
      type: String,
      default: '加载中...'
    },
    noDataText: {
      type: String,
      default: '无数据'
    },
    // select+
    valueOptions: Array,
    options: Array,
    immediate: Boolean,
    // popper
    popperClass: String,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    // scroll dropdown
    itemRender: Function,
    itemHeight: {
      type: Number,
      default: 34
    },
    keeps: {
      type: Number,
      default: 20
    },
    pagination: Object // { total, pageCount, currentPage, pageSize }
  },
  provide() {
    return {
      select: this
    }
  },
  inject: {
    form: {
      default: ''
    },
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      visible: false,
      loading: false,
      selectedValue: this.multiple ? [].concat(this.value) : this.value || '',
      selectedOption: [], // 用于初始化 el-select 的 el-option数据
      optionList: [],
      showSelect: false,
      itemComponent: Item,
      currentPage: this.pagination?.currentPage || 1,
      queryText: ''
    }
  },
  computed: {
    selectSize() {
      return this.size || (this.elFormItem || this.elForm || this.form || {}).size
    },
    popoverClass() {
      return ['el-select-dropdown', this.multiple ? 'is-multiple' : '', 've-virtual-select-dropdown', this.popperClass].filter(v => !!v).join(' ')
    },
    selectedOptionKeys() {
      if (this.selectedOption.length > 0) {
        return this.selectedOption.map(item => item[this.valueKey])
      }
      return []
    },
    selectedIndex() {
      const valueList = [].concat(this.value)
      if (valueList.length > 0) {
        const optionKeys = this.optionList.map(item => item[this.valueKey])
        return valueList.map(v => {
          const index = optionKeys.indexOf(v)
          return index !== -1 ? index : false
        }).filter(v => v !== false)
      }
      return []
    },
    /* selectedOption() {
      // ! 速度太慢，请勿使用（遍历项太多）
      const results = []
      const { value, valueOptions, multiple, valueKey } = this
      const valArr = multiple ? [...value] : [value]
      // 1. 先从 this.valueOptions 中获取
      if (valueOptions) {
        valueOptions.forEach(item => {
          const index = valArr.indexOf(item[valueKey])
          if (index !== -1) {
            results.push(item)
            // 移除已匹配项
            valArr.splice(index, 1)
          }
        })
      }
      // 2. 再从 this.optionList 中获取
      if (valArr.length > 0) {
        const length = this.optionList.length
        for (let i = 0; i < length; i++) {
          const item = this.optionList[i]
          const index = valArr.indexOf(item[valueKey])
          if (index !== -1) {
            results.push(item)
            valArr.splice(index, 1)
            // 如果 selectedValue 对应的 option 都存在，则中断循环
            if (valArr.length === 0) break
          }
        }
      }
      return results
    }, */
    pageCount() {
      if (this.pagination) {
        const { total = 0, pageCount = 0, pageSize = 20 } = this.pagination
        return parseInt(pageCount) > 0
          ? parseInt(pageCount)
          : total && pageSize
            ? Math.ceil(parseInt(total) / parseInt(pageSize))
            : 1
      }
      return 1
    }
  },
  watch: {
    visible(val) {
      this.$emit('visible-change', val)

      if (val) {
        // 1. 初始化 options 数据
        if (this.remote && this.optionList.length === 0) {
          this.$_queryData(this.queryText, this.scrollToIndex)
        }

        // 2. select focus
        this.$refs.select?.focus()

        // 3. 重置 dropdown scroll 位置
        this.scrollToIndex()
      }
    },
    value(val) {
      this.selectedValue = val
    },
    options(val) {
      if (!this.remote) {
        this.optionList = val
      }
    },
    valueOptions: {
      handler(list) {
        // 初始化数据 => 更新 selectedOption
        if (Array.isArray(list) && list.length > 0) {
          const { selectedOptionKeys, valueKey, value } = this
          var valueList = [].concat(value)
          const newList = list.reduce((arr, item) => {
            const val = item[valueKey]
            // 1. 已选中当前项; 2. selectedOption中不存在当前项
            return (valueList.includes(val) && !selectedOptionKeys.includes(val)) ? arr.concat(item) : arr
          }, [])
          this.selectedOption.push(...newList)
        }
      },
      immediate: true
    },
    showSelect() {
      // 隐藏 el-select 自带的下拉框
      this.$refs.select.blur()
    }
  },
  created() {
    this.debouncedQueryChange = debounce((val) => {
      this.handleQueryChange(val)
    }, this.remote ? 300 : 0)
  },
  mounted() {
    this.initOptionData(() => {
      // 初始化数据 => 更新 selectedOption
      this.$nextTick(() => {
        const { selectedOption, selectedOptionKeys, valueKey } = this
        const list = this.selectedIndex.map(i => this.optionList[i])
        if (selectedOption.length === 0) {
          this.selectedOption = list
        } else {
          const newList = list.reduce((arr, item) => {
            return !selectedOptionKeys.includes(item[valueKey]) ? arr.concat(item) : arr
          }, [])
          this.selectedOption.push(...newList)
        }
      })
    })

    this.$nextTick(() => {
      // 限制 popper 最大和最小宽度 (避免select-option内容过长超出屏幕)
      try {
        const winWidth = window.innerWidth || document.body.clientWidth
        const { width, left } = this.$refs.select.$el.getBoundingClientRect()
        const $popper = this.$refs.popover.$refs.popper

        if ($popper) {
          $popper.style.maxWidth = Math.round(winWidth - left - 20) + 'px'
          // this.$refs.popover.$el.querySelector('.el-popover').style.minWidth = this.selectWidth
          $popper.style.minWidth = width + 'px'
        }
      } catch (error) {
        console.error(error)
      }
    })
  },
  methods: {
    // 初始化 optionList 数据
    initOptionData(callback) {
      if (this.remote && this.immediate) {
        this.$_queryData('', callback)
      } else if (this.options) {
        this.optionList = this.options
        callback && callback(this.optionList)
      }
    },
    handleRemoveIteme(item) {},
    handleClearClick(event) {
      // this.deleteSelected(event)
    },
    doDestroy() {
      const $popper = this.$refs.popover?.$refs.popper
      if ($popper) {
        $popper.doDestroy()
      }
    },
    handleClose() {
      this.visible = false;
    },
    itemClick(item, index) {
      if (this.disabled) return

      const currentValue = item[this.valueKey]
      
      if (this.multiple) {
        const { selectedValue } = this
        const valIndex = selectedValue.indexOf(currentValue)
        if (valIndex !== -1) {
          selectedValue.splice(valIndex, 1)
          this.$emit('change', selectedValue)
          this.deleteSelectedOption(item)
        } else {
          this.$emit('change', selectedValue.concat(currentValue))
          this.addSelectedOption(item)
        }
      } else {
        if (currentValue === this.selectedValue) return
        this.$emit('change', currentValue)
        this.visible = false
        this.addSelectedOption(item)
      }
      this.$_updatePopper()
    },
    deleteItem(val) {
      this.$emit('change', this.selectedValue)
      this.$emit('remove-tag', val)

      this.deleteSelectedOption(val)
      this.$_updatePopper(200)
    },
    // 追加 已选中 对应的 options
    addSelectedOption(item) {
      if (this.multiple) {
        if (!this.selectedOptionKeys.includes(item[this.valueKey])) {
          this.selectedOption.push(item)
        }
      } else {
        this.selectedOption = [item]
      }
    },
    // 移除 已选中 对应的 options
    deleteSelectedOption(val) {
      if (this.multiple) {
        const index = this.selectedOptionKeys.indexOf(val)
        if (index !== -1) {
          this.selectedOption.splice(index, 1)
        }
      } else {
        this.selectedOption = []
      }
    },
    // 更新 popover 位置
    $_updatePopper(later = 100) {
      if (this.multiple && !this.collapseTags) {
        setTimeout(() => {
          this.$refs.popover.updatePopper()
        }, later)
      }
    },
    itemSelectedClass(index) {
      return this.selectedIndex.includes(index) ? 'selected' : ''
    },
    $_queryData(text, callback) {
      if (this.loading) return

      const { remote, remoteMethod, pagination, pageCount, currentPage } = this

      // 已超 总页码
      if (pagination && currentPage > pageCount) return
      
      if (remote && remoteMethod) {
        this.loading = true
        remoteMethod({ text: text || '', page: currentPage }).then(data => {
          this.optionList = this.optionList.concat(data)
          callback && callback(this.optionList)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    // 重置 dropdown 滚动位置
    scrollToIndex(index) {
      this.$nextTick(() => {
        const itemIndex = index >= 0 ? index : this.selectedIndex[0]
        const $scroll = this.$refs.scroll
        itemIndex ? $scroll.scrollToIndex(itemIndex) : $scroll.reset()
      })
    },
    onScrollToTop() {
      console.log('scroll top ...')
      this.$emit('scrollTop')
    },
    onScrollToBottom() {
      console.log('scroll bottom ...')
      this.$emit('scrollBottom')

      if (!this.loading && this.remote && this.pagination && this.currentPage < this.pageCount) {
        this.currentPage++
        this.$nextTick(() => {
          this.$_queryData(this.queryText)
        })
      }
    },
    handleQueryChange(val) {
      console.log('change queryText', val)
      if (this.remote) {
        this.currentPage = 1
        this.optionList = []
        this.$_queryData(val)
      }
    }
  }
}
</script>

<style lang="scss">
.el-select.ve-virtual-select{
  &.is-focus{
    .el-select__caret{
      transform: rotateZ(0deg);
    }
    .el-input .el-input__inner{
      border-color: $--color-primary;
    }
  }
  /* > .el-select-dropdown{
    display: none !important;
  } */
}
.el-select-dropdown.ve-virtual-select-dropdown{
  padding: 0;
  &.is-multiple .el-select-dropdown__item.selected::after{
    top: 0;
    right: 16px;
  }

  .select-search{
    padding: 8px 12px;
  }
  .select-dropdown-footer{
    .tip-message{
      text-align: center;
      color: #999;
      padding: 12px 0;
      &.more{
        padding: 6px 0;
      }
    }
  }
}
.el-select-dropdown__list.select-dropdown-list{
  width: 100%;
  // height: 280px;
  overflow: hidden;
  overflow-y: auto;
  min-height: 40px;
  max-height: 280px;

  /* 滚动条 */
  &::-webkit-scrollbar {
    width: 6px !important;
    height: 6px;
  }
  /* 滚动条轨道 */
  &::-webkit-scrollbar-track {
    background: white;
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: $--scrollbar-hover-background-color;
    -webkit-box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.6);
  }
}
</style>
