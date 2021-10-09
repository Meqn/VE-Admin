<template>
<el-tooltip :content="tooltip" placement="top">
  <i title="刷新" class="toolbar-icon" @click="onClick">
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.728 36.728A17.943 17.943 0 0124 42c-9.941 0-18-8.059-18-18S14.059 6 24 6c4.97 0 9.47 2.015 12.728 5.272C38.386 12.93 42 17 42 17" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M42 8v9h-9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </i>
</el-tooltip>
</template>

<script>
export default {
  name: 'table-reload',
  props: {
    tooltip: {
      type: String,
      default: '刷新'
    }
  },
  inject: ['top'],
  methods: {
    onClick() {
      this.top.refresh()
    }
  }
}
</script>
