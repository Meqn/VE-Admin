<template>
  <el-container class="ve-layout" v-resize:debounce="$_resize">
    <div v-if="false" class="drawer-mask" />

    <LayoutSider :width="siderWidth" :style="{ paddingTop: headerHeight }" />

    <section class="ve-layout-main">
      <LayoutHeader :height="headerHeight" class="v-layout-header" />
      <el-header :height="headerHeight" style="background: transparent"></el-header>

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
      layoutWidth: 0,
      headerHeight: '56px',
      siderWidth: '210px'
    }
  },
  mounted() {
    const $header = this.$refs['header']
    if ($header) {
      this.layout.headerHeight = $header.$el.clientHeight
    }
  },
  methods: {
    $_resize({ width }) {
      console.log('resize ', width)
      this.layoutWidth = width
      if (width < 992) {
        this.$refs.sidebar?.closeSideBar()
        this.$store.dispatch('app/toggleDevice', 'tablet')
      } else {
        this.$store.dispatch('app/toggleDevice', 'desktop')
      }
    }
  }
}
</script>
