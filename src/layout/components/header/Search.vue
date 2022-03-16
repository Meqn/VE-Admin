<template>
<div class="header-search">
  <ve-icon name="el-icon-search" :size="20" class="search-icon" @click="enterSearchMode" />
  <el-autocomplete
    :class="['search-input', searchMode ? 'enter' : 'leave']"
    ref="input"
    v-model="value"
    :fetch-suggestions="querySearch"
    value-key="label"
    placeholder="快速导航"
    clearable
    @select="handleSelect"
    @blur="leaveSearchMode"
    @clear="onClear"
  />
</div>
</template>

<script>
import { flatMapDeep, resolvePath } from '@/utils'

export default {
  name: 'HeaderSearch',
  data() {
    return {
      searchMode: false,
      value: ''
    }
  },
  props: {
    routes: Array
  },
  inject: {
    top: ['layout']
  },
  computed: {
    options() {
      const routes = flatMapDeep(this.routes, 'children', (item, parent) => ({
        value: resolvePath((parent?.value || '/'), item.path || ''),
        label: item.meta?.title
      }))
      return routes.filter(item => item.label)
    }
  },
  methods: {
    querySearch(queryString, cb) {
      let res = this.options
      if (queryString) {
        res = this.options.filter(item => item.label.includes(queryString))
      }
      cb(res)
    },
    onClear() {
      this.$refs.input.activated = true
      // document.activeElement.blur()
    },
    handleSelect(item) {
      if (item.value) {
        this.$router.push(item.value)
        this.$nextTick(() => {
          this.value = ''
        })
      }
    },
    enterSearchMode () {
      this.searchMode = true
      this.$emit('active', true)
      setTimeout(() => this.$refs.input.focus(), 300)
    },
    leaveSearchMode () {
      this.searchMode = false
      setTimeout(() => this.$emit('active', false), 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search{
  .search-icon{
    cursor: pointer;
  }
  .search-input{
    overflow: hidden;
    border: 0;
    border-bottom: 1px solid #22415e;
    transition: width 0.3s ease-in-out;

    .layout-header-light & {
      border-bottom-color: #e1e1e1;
    }

    &.leave{
      width: 0px;
      input{
        display: none;
      }
    }
    &.enter{
      width: 200px;
      input:focus{
        box-shadow: 0 0 0 0;
      }
    }
    ::v-deep .el-input__inner{
      color: #C0C4CC;
      border: none;
      background-color: transparent;
    }
  }
}
</style>
