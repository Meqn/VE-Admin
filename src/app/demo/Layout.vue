<template>
  <Layout
    ref="layout"
    layout="side"
    header-theme="light"
    sider-theme="dark"
    fixed-header
    collapsed-position="bottom"
    :menu="{ uniqueOpened: false }"
    :title="title"
    :logo="logo"
    :routes="routes"
    :footer="footerProps"
    @resize="onResize">
    <template #headerContent>
      <HeaderMenu :menus="menus" :collapsed="true" />
    </template>

    <template #menu>
      <el-input placeholder="搜索菜单" />
    </template>

    <template #headerRight>
      <HeaderSearch class="header-item" :routes="routes" />
      <HeaderNotice class="header-item" />
      <HeaderAccount
        class="header-item"
        @command="handleCommand"
        :avatar="user.avatar"
        :name="user.nickname"
        :menus="[
          { title: '个人中心', icon: 'el-icon-user', command: 'center' },
          { title: '账户设置', icon: 'el-icon-setting', command: 'setting' },
          { title: '退出登录', icon: 'el-icon-switch-button', command: 'logout', divided: true }
        ]"
      />
    </template>

    <!-- <template #menuHeader="{ collapsed }">
      <div class="flex-middle">
        <img src="https://cdn.jsdelivr.net/gh/Meqn/store/imgs/assets/veComponent.svg" style="max-height: 40px" alt="logo">
        <div v-if="!collapsed">VE-Admin</div>
      </div>
    </template> -->
  </Layout>
</template>

<script>
import { Layout, HeaderAccount, HeaderSearch, HeaderNotice, HeaderMenu } from '@/layout'
import AppConfig from './app.config'

export default {
  name: 'DemoLayout',
  components: {
    Layout,
    HeaderAccount,
    HeaderSearch,
    HeaderNotice,
    HeaderMenu
  },
  data() {
    return {
      logo: AppConfig.logo_url,
      title: AppConfig.logo_text,
      // title: (<span class="ml-4">啦啦啦啦</span>),
      menus: [
        { title: '平台演示', path: '/', icon: 'el-icon-data-analysis' },
        { title: '企业运营', path: '/ent/', icon: 'el-icon-coin' },
        { title: '政府监管', path: '/gov/', icon: 'el-icon-aim' },
        { title: '运营管理', path: '/manage/', icon: 'el-icon-set-up' },
      ],
      menuCollapsed: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    routes() {
      return this.$store.state.permission.routes
    },
    collapse() {
      return this.$refs.layout.siderCollapsed
    },
    footerProps() {
      return {
        copyright: '2022 VE-Admin. All Rights Reserved',
        links: [
          { title: 'baidu', href: 'http://baidu.com' },
          { title: <strong>github</strong>, href: 'http://github.com' },
          { title: 'google', href: 'http://gogole.com' }
        ]
      }
    }
  },
  methods: {
    onResize({ width }) {
      this.menuCollapsed = width > 992
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('user/logout').then(() => {
          window.location.href = '/#/login'
        })
      }
      if (command === 'setting') {
        this.$router.push('/password')
      }
    }
  }
}
</script>

<style lang="scss">
.header-menu{
  .ve-text{
    color: inherit;
  }
}
</style>
