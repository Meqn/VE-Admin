<template>
<div :class="['ve-page-header', { 'has-footer': hasFooter }, { 'is-ghost': ghost }]">
  <slot name="breadcrumb">
    <el-breadcrumb v-if="breadcrumb.length > 0" :separator-class="separator" class="page-header-breadcrumb">
      <el-breadcrumb-item
        v-for="(route, i) in breadcrumb"
        :key="i"
        :to="{ path: route.path }">
        {{ route.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </slot>
  <ve-flex justify="between" align="middle" class="page-header-heading">
    <ve-flex align="middle" class="page-header-left">
      <div v-if="showBack" class="page-back" @click="onBack">
        <i :class="backIcon"></i> {{ backText }}
      </div>
      <slot name="title">
        <span class="page-title">{{ title }}</span>
        <span class="page-subtitle">{{ subTitle }}</span>
      </slot>
    </ve-flex>
    <div v-if="$slots.extra" class="page-header-extra">
      <slot name="extra" />
    </div>
  </ve-flex>
  <div class="page-header-content" v-if="$slots.default">
    <slot />
  </div>
  <div class="page-header-footer" v-if="hasFooter">
    <slot name="footer" />
    <el-tabs v-if="tabList.length > 0" class="page-header-tab" v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name" />
    </el-tabs>
  </div>
</div>
</template>

<script>
import VeFlex from '@/components/Flex'
export default {
  name: 'VePageHeader',
  components: {
    VeFlex
  },
  props: {
    title: String,
    subTitle: String,
    separator: {
      type: String,
      default: 'el-icon-arrow-right'
    },
    breadcrumb: {
      type: Array,
      default: () => []
    },
    ghost: Boolean,
    showBack: Boolean,
    backIcon: {
      type: String,
      default: 'el-icon-back'
    },
    backText: {
      type: String,
      default: '返回'
    },
    tabList: {
      type: Array,
      default: () => []
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
    }
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
      margin-top: 12px;
    }
    &-footer{
      margin-top: 16px;
    }
    &-left{
      max-width: 72%;
    }
    &-left, &-extra{
      padding: 4px 0;
    }
    &-tab{
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
    color: #606266;
    margin-right: 12px;
  }
  .page-back{
    position: relative;
    margin-right: 40px;
    cursor: pointer;

    &::after{
      content: "";
      position: absolute;
      width: 1px;
      height: 16px;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #dcdfe6;
    }
  }
}
</style>
