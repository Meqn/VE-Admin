<template>
  <el-container :class="['ve-layout', `ve-layout--${layout}`]" v-resize:debounce="$_resize">
    <div v-if="false" class="drawer-mask" />

    <LayoutSider>
      <template v-if="$scopedSlots.menuHeader" #logo>
        <slot name="menuHeader" v-bind="headerData" />
      </template>
      <template v-if="$slots.menuExtra" #extra><slot name="menuExtra" /></template>
      <template v-if="$slots.menuFooter" #footer><slot name="menuFooter" /></template>
    </LayoutSider>

    <section class="ve-layout-main">
      <LayoutHeader :height="`${headerHeight}px`">
        <template v-if="$scopedSlots.menuHeader" #logo>
          <slot name="menuHeader" v-bind="headerData" />
        </template>
        <template v-if="$slots.headerContent"><slot name="headerContent" /></template>
        <template v-if="$slots.headerRight" #right><slot name="headerRight" /></template>
      </LayoutHeader>
      <el-header :height="`${headerHeight}px`" style="background: transparent" />

      <LayoutMain />
      
      <LayoutFooter v-if="hasFooter" v-bind="footerProps">
        <slot v-if="$slots.footer" name="footer" />
      </LayoutFooter>
    </section>

  </el-container>
</template>

<script>
import './layout.scss'
import { LayoutHeader, LayoutSider, LayoutMain, LayoutFooter } from './components'
import ResizeObserver from 'v-resize-observer'
import isPlainObject from 'lodash/isPlainObject'

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutSider,
    LayoutMain,
    LayoutFooter
  },
  directives: {
    resize: ResizeObserver.directive
  },
  props: {
    loading: Boolean,
    title: {
      type: [String, Object],
      default: 'VE-Admin'
    },
    logo: {
      type: String,
      default: 'https://cdn.jsdelivr.net/gh/Meqn/store/imgs/assets/veComponent.svg'
    },
    layout: {
      type: String,
      validator: (val) => ['side', 'top', 'mix'].includes(val),
      default: 'side'
    },
    headerHeight: {
      type: Number,
      default: 56
    },
    fixedHeader: Boolean,
    headerTheme: {
      type: String,
      default: 'dark'
    },
    siderTheme: {
      type: String,
      default: 'dark'
    },
    siderWidth: {
      type: Number,
      default: 210
    },
    menu: Object,
    routes: Array,
    defaultCollapsed: {
      type: Boolean,
      default: true
    },
    collapsed: {
      type: Boolean,
      default: true
    },
    collapsedPosition: {
      type: String,
      validator: (val) => ['top', 'bottom'].includes(val),
      default: 'bottom'
    },
    footer: [String, Object]
  },
  data() {
    return {
      viewWidth: 1920,
      siderCollapsed: this.defaultCollapsed
    }
  },
  computed: {
    sidebarWidth() {
      return this.siderCollapsed ? 64 : this.siderWidth
    },
    hasFooter() {
      return this.footer || this.$slots.footer
    },
    headerData() {
      const { layout, siderTheme, headerTheme } = this
      return {
        theme: layout === 'side' ? siderTheme : headerTheme,
        mode: layout,
        collapsed: this.siderCollapsed
      }
    },
    footerProps() {
      const { footer } = this
      return typeof footer === 'string'
        ? { copyright: footer }
        : isPlainObject(footer)
          ? footer
          : {}
    }
  },
  provide() {
    return {
      layout: this
    }
  },
  methods: {
    $_resize({ width }) {
      this.viewWidth = width
      const isMobile = width < 767
      // const siderCollapsed = width < 992

      // this.$store.dispatch('app/toggleMobile', isMobile)
      this.toggleSideBar(width < 992)
      this.$emit('resize', { width })
    },
    toggleSideBar(value) {
      if (value === this.siderCollapsed) return
      const val = typeof value === 'boolean' ? value : !this.siderCollapsed
      this.siderCollapsed = val
      this.$emit('collapsed', val)
    },
    onMenuHeaderClick() {
      this.$emit('menu-header')
    }
  }
}
</script>
