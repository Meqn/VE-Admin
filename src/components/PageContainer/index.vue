<template>
<section class="ve-page-container">

  <div v-if="$slots.header" :class="['ve-page-container-header', headClass]" :style="headStyle">
    <slot name="header" />
  </div>
  <PageHeader
    v-if="hasPageHeader"
    :ghost="ghost"
    :breadcrumb="breadcrumb"
    :title="title"
    :subTitle="subTitle"
    :extra="extra"
    :back="back"
    :tabExtra="tabExtra"
    :tabProps="tabProps"
    :tabList="tabList"
    v-on="$listeners">
    <!-- 面包屑导航区域 -->
    <template v-if="$slots.breadcrumb" #breadcrumb>
      <slot name="breadcrumb" />
    </template>
    <!-- 返回区域 -->
    <template v-if="$slots.back" #back>
      <slot name="back" />
    </template>
    <!-- 标题区域 -->
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <!-- 默认内容区域 -->
    <template v-if="content || $slots.content" #default>
      <slot name="content">{{ content }}</slot>
    </template>
    <!-- 操作区 -->
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <!-- tabList 右侧区域 -->
    <template v-if="$slots.tabExtra" #tabExtra>
      <slot name="tabExtra" />
    </template>
  </PageHeader>

  <div :class="['ve-page-container-content', bodyStyle]" :style="headStyle">
    <slot />
  </div>

  <div v-if="$slots.footer" :class="['ve-page-container-footer', footClass]" :style="footStyles">
    <slot name="footer" />
  </div>
</section>
</template>

<script>
import PageHeader from '../PageHeader'

export default {
  name: 'VePageContainer',
  components: {
    PageHeader
  },
  props: {
    headStyle: Object,
    headClass: String,
    bodyStyle: Object,
    bodyClass: String,
    footStyle: Object,
    footClass: String,
    // 头部区域
    content: String,
    ghost: Boolean,
    breadcrumb: [Boolean, Object],
    back: [Boolean, Object],
    title: String,
    subTitle: String,
    extra: String,
    tabList: Array,
    tabExtra: String,
    tabProps: Object
  },
  inject: ['layout'],
  computed: {
    hasPageHeader() {
      const { header, breadcrumb, title, content, extra } = this.$slots
      return !header && (breadcrumb || this.breadcrumb || title || this.title || content || this.content || extra || this.extra || this.tabList)
    },
    footStyles() {
      const { footStyle = {} } = this
      const width = `calc(100% - ${this.layout.sidebarWidth}px)`
      return { width: `${width}`, ...footStyle }
    }
  }
}
</script>

<style lang="scss">
.ve-page-container{
  &-footer{
    position: fixed; bottom: 0; right: 0; z-index: 10;
    width: 100%;
    padding: 8px 20px;
    background-color: #fff;
    box-shadow: 0 -6px 16px -8px rgb(0 0 0 / 8%), 0 -9px 28px 0 rgb(0 0 0 / 5%), 0 -12px 48px 16px rgb(0 0 0 / 3%);
    transition: width .3s cubic-bezier(.645,.045,.355,1);
  }
  &-content{
    position: relative;
    padding: 20px;
  }
}
</style>
