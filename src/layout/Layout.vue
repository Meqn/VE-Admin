<template>
  <el-container class="ve-layout" v-resize:debounce="$_resize">
    <div v-if="false" class="drawer-mask" />

    <LayoutSider :width="`${siderWidth}px`" :style="{ paddingTop: `${headerHeight}px` }" />

    <section class="ve-layout-main">
      <LayoutHeader :height="`${headerHeight}px`" />
      <el-header :height="`${headerHeight}px`" style="background: transparent"></el-header>

      <LayoutMain />

      <el-footer height="auto" class="v-layout-footer">
        <div class="pt-24 pb-24 tac">Copyright @ 2022 Ve-admin. All Rights Reserved</div>
      </el-footer>
    </section>

  </el-container>
</template>

<script>
import './layout.scss'
import { LayoutHeader, LayoutSider, LayoutMain } from './components'
import resizeDirective from 'v-resize-observer/src/directive'

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutSider,
    LayoutMain
  },
  directives: {
    resize: resizeDirective
  },
  data() {
    return {
      viewWidth: 1920,
      headerHeight: 56
    }
  },
  computed: {
    siderWidth() {
      return this.$store.getters.sideCollapsed ? 64 : 210
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
      const sideCollapsed = width < 992

      this.$store.dispatch('app/toggleMobile', isMobile)
      this.$store.dispatch('app/toggleSideBar', sideCollapsed)
    }
  }
}
</script>
