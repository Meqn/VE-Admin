<template>
  <el-popover width="240" trigger="click" class="layout-head-notice">
    <el-empty :image="require('@/assets/empty.svg')" :image-size="64" description="暂无消息"></el-empty>
    <div slot="reference" class="btn-noitce">
      <ve-icon name="el-icon-bell" :size="20" />
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'HeaderNotice'
}
</script>
<style lang="scss" scoped>
.layout-head-notice{
  ::v-deep{
    .el-popover__reference-wrapper{
      height: 100%;
    }
  }
  .btn-noitce{
    display: flex; align-items: center;
    height: 100%;
  }
}
</style>
