<script>
import isObjectLike from 'lodash/isObjectLike'
import { omit } from '@/utils'
import { getComponentFromProp } from '../utils'

export default {
  name: 'VePageHeader',
  props: {
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
  data() {
    return {
      activeTab: ''
    }
  },
  computed: {
    hasHeading() {
      const { $slots, backProps, title, subTitle, extra } = this
      return $slots.back || $slots.title || $slots.extra || backProps || title || subTitle || extra
    },
    hasFooter() {
      return (this.tabList && this.tabList.length > 0) || this.$slots.footer
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
      handler(list) {
        if (list && list.length > 0) {
          const acts = list.filter(v => v.active)
          this.activeTab = acts.length > 0 ? acts[0].name : list[0].name
        }
      },
      immediate: true
    },
    activeTab(val) {
      this.$emit('tab-change', val)
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
    onClickTab(tab, event) {
      this.$emit('tab-click', tab, event)
    },
    onClickExtra() {
      this.$emit('extra-click')
    },
    onClickTabExtra() {
      this.$emit('tab-extra-click')
    }
  },
  render() {
    const {
      $slots,
      ghost = false,
      breadcrumbProps,
      breadcrumbRoutes,
      backProps,
      title,
      subTitle,
      tabProps = {},
      tabList
    } = this

    const pageClass = {
      've-page-header': true,
      'has-footer': this.hasFooter,
      'is-ghost': ghost
    }
    
    // ------ breadcrumb 导航区域
    let breadcrumbDom = $slots['breadcrumb']
    if (!breadcrumbDom && breadcrumbProps && breadcrumbRoutes.length > 0) {
      breadcrumbDom = (
        <el-breadcrumb
          separator={breadcrumbProps.separator}
          separator-class={breadcrumbProps.separatorClass}
          class="page-header-breadcrumb">
          {
            breadcrumbRoutes.map((route, i) => (
              <el-breadcrumb-item key={i} replace={!!route.route} to={{ path: route.path }}>{ route.text }</el-breadcrumb-item>
            ))
          }
        </el-breadcrumb>
      )
    }
    
    // ------ header 头部区域
    // back 返回
    let backDom = $slots['back']
    if (!backDom && backProps) {
      backDom = (
        <div align="middle" class="page-back" onClick={this.onBack}>
          <i class={[backProps.icon, 'back-icon']}></i>
          { backProps.text ? (<span class="back-text">{ backProps.text }</span>) : null}
        </div>
      )
    }
    // title 标题
    const titleDom = $slots['title'] || [title, subTitle].map((item, i) => {
      if (i === 0 && title) {
        return <span class="page-title">{ item }</span>
      }
      if (i === 1 && subTitle) {
        return <span class="page-subtitle">{ subTitle }</span>
      }
    })
    // extra 头部右侧扩展
    const extraContent = getComponentFromProp(this, 'extra')

    // heading 头部
    const headingDom = this.hasHeading && (
      <div class="page-header-heading">
        <div class="page-header-left">
          { backDom }
          { titleDom }
        </div>
        { extraContent && <div class="page-header-extra" onClick={this.onClickExtra}>{extraContent}</div> }
      </div>
    )

    // ------ footer 底部区域
    let footDom = $slots['footer']
    if (tabList && tabList.length > 0) {
      const tabbarProps = {
        class: 'page-header-tab',
        props: {
          ...tabProps
        },
        on: {
          'tab-click': this.onClickTab
        }
      }
      const tabsDom = (
        <el-tabs vModel={this.activeTab} {...tabbarProps}>
          {
            tabList.map(item => {
              const paneProps = {
                props: omit(item, ['active', 'slot', 'render'])
              }
              const labelSlot = this.$scopedSlots[item.slot]
              const labelRender = item.render
              let labelDom = null
              if (labelSlot || labelRender) {
                labelDom = (
                  <template slot="label">{ labelSlot ? labelSlot(item) : labelRender(this.$createElement, item) }</template>
                )
              }
              return (<el-tab-pane {...paneProps}>{labelDom}</el-tab-pane>)
            })
          }
        </el-tabs>
      )
      const tabExtraContent = getComponentFromProp(this, 'tabExtra')
      const tabExtraDom = tabExtraContent && (<div class="page-header-tab-extra" onClick={this.onClickTabExtra}>{tabExtraContent}</div>)
      footDom = [tabsDom, tabExtraDom]
    }
    
    return (
      <div class={pageClass}>
        {breadcrumbDom}
        {headingDom}
        {$slots.default && (<div class="page-header-content">{$slots.default}</div>)}
        {this.hasFooter && (<div class="page-header-footer">{footDom}</div>)}
      </div>
    )
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
      margin-bottom: 12px;
    }
    &-heading{
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      display: flex;
      align-items: center;
      max-width: 72%;
    }
    &-left, &-extra{
      padding: 4px 0;
    }
    &-tab{
      &-extra{
        position: absolute; bottom: 12px; right: 0;
      }
      .el-tabs__item{
        font-size: 16px;
        height: 48px;
        line-height: 48px;
      }
      .el-tabs__header{
        margin-bottom: 0;
      }
      .el-tabs__nav-wrap::after{
        display: none;
      }
      &.el-tabs--card > .el-tabs__header{
        padding-top: 8px;
        border-bottom: none;
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
    display: flex;
    align-items: center;
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
