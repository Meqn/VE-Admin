<template>
<div :class="['ve-page-header', { 'has-footer': hasFooter }, { 'is-ghost': ghost }]">
  <slot name="breadcrumb">
    <el-breadcrumb
      v-if="breadcrumbProps && breadcrumbRoutes.length > 0"
      :separator="breadcrumbProps.separator"
      :separator-class="breadcrumbProps.separatorClass"
      class="page-header-breadcrumb">
      <el-breadcrumb-item
        v-for="(route, i) in breadcrumbRoutes"
        :key="i"
        :replace="!!route.route"
        :to="{ path: route.path }">
        {{ route.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </slot>
  <ve-flex justify="between" align="middle" class="page-header-heading">
    <ve-flex align="middle" class="page-header-left">
      <slot name="back">
        <ve-flex v-if="backProps" align="middle" class="page-back" @click.native="onBack">
          <i :class="[backProps.icon, 'back-icon']"></i>
          <span v-if="backProps.text" class="back-text">{{ backProps.text }}</span>
        </ve-flex>
      </slot>
      <slot name="title">
        <span class="page-title">{{ title }}</span>
        <span class="page-subtitle">{{ subTitle }}</span>
      </slot>
    </ve-flex>
    <div v-if="$slots.extra" class="page-header-extra">
      <slot name="extra" />
    </div>
  </ve-flex>
  <div v-if="$slots.default" class="page-header-content">
    <slot />
  </div>
  <div class="page-header-footer" v-if="hasFooter">
    <template v-if="tabList.length > 0">
      <el-tabs class="page-header-tab" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name" />
      </el-tabs>
      <div class="page-header-tab-extra" v-if="$slots.tabExtra">
        <slot name="tabExtra"></slot>
      </div>
    </template>
    <slot v-else name="footer" />
  </div>
</div>
</template>

<script>
import VeFlex from '@/components/Flex'
import isObjectLike from 'lodash/isObjectLike'

export default {
  name: 'VePageHeader',
  components: {
    VeFlex
  },
  props: {
    ghost: Boolean,
    title: String,
    subTitle: String,
    breadcrumb: [Boolean, Object],
    back: [Boolean, Object],
    tabList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeTab: ''
    }
  },
  computed: {
    hasFooter() {
      return this.tabList.length > 0 || this.$slots.footer
    },
    backProps() {
      const { back } = this
      if (back) {
        const defaults = {
          // text: '返回',
          icon: 'el-icon-back'
        }
        if (isObjectLike(back)) {
          return {
            ...defaults,
            ...back
          }
        }
        return defaults
      }
      return false
    },
    breadcrumbProps() {
      const { breadcrumb } = this
      if (breadcrumb) {
        const defaults = {
          separator: '/',
          separatorClass: ''
        }
        if (isObjectLike(breadcrumb)) {
          return {
            ...defaults,
            ...breadcrumb
          }
        }
        return defaults
      }
      return false
    },
    breadcrumbRoutes() {
      const { breadcrumbProps, $route } = this
      if (breadcrumbProps) {
        if (breadcrumbProps.routes) {
          return breadcrumbProps.routes
        }
        if ($route && $route.matched) {
          const len = $route.matched.length
          return $route.matched.map((route, index) => ({
            text: route.meta.title,
            path: (len - 1) === index ? ($route.fullPath || route.path) : route.path
          }))
        }
        return []
      }
      return []
    }
  },
  watch: {
    tabList: {
      handler(v) {
        if (v && v.length > 0) {
          this.activeTab = (() => {
            const { tabList } = this
            const act = tabList.filter(v => v.active)
            if (act.length > 0) {
              return act[0].name
            }
            return tabList[0].name
          })()
        }
      },
      immediate: true
    },
    activeTab(val) {
      this.$emit('tab-change', val)
    }
  },
  created() {
    console.log('this.$route', this.$route)
  },
  methods: {
    onBack() {
      if (this.$listeners.back) {
        this.$emit('back')
      } else {
        this.$router.go(-1)
      }
    },
    handleTabClick(tab, event) {
      this.$emit('tab-click', tab, event)
    }
  }
}
</script>

<style lang="scss">
.ve-page-header{
  position: relative;
  padding: 16px 20px;
  background-color: #fff;
  
  &.has-footer{
    padding-bottom: 0;
  }
  &.is-ghost{
    background-color: inherit;
  }
  .page-header{
    &-breadcrumb{
      margin-bottom: 8px;
    }
    &-content{
      position: relative;
      margin-top: 12px;
    }
    &-footer{
      position: relative;
      margin-top: 12px;
    }
    &-left{
      max-width: 72%;
    }
    &-left, &-extra{
      padding: 4px 0;
    }
    &-tab{
      &-extra{
        position: absolute; bottom: 8px; right: 0;
      }
      .el-tabs__item{
        font-size: 16px;
      }
      .el-tabs__header{
        margin-bottom: 0;
      }
      .el-tabs__nav-wrap::after{
        display: none;
      }
      .el-tabs__content{
        display: none;
      }
    }
  }
  .page-title{
    margin-right: 12px;
    color: $--color-text-primary;
    font-size: 20px;
    line-height: 32px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .page-subtitle{
    white-space: nowrap;
    font-size: 14px;
    margin-right: 12px;
  }
  .page-back{
    position: relative;
    // margin-right: 40px;
    margin-right: 16px;
    cursor: pointer;
    &:hover{
      color: $--color-primary;
    }
    /* &::after{
      content: "";
      position: absolute;
      width: 1px;
      height: 16px;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #dcdfe6;
    } */
    .back-icon{
      font-size: 20px;
    }
    .back-text{
      margin-left: 2px;
    }
  }
}
</style>
