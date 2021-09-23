<template>
<header class="ve-layout-header">
  <div class="header-left">
    <a class="header-logo">
      <template v-if="logo">
        <img v-if="logo.url" :src="logo.url" alt="logo">
        <h1 v-if="logo.text">{{ logo.text }}</h1>
      </template>
      <h1 v-else>管理平台</h1>
    </a>
  </div>
  <div class="header-center"></div>
  <div class="header-right">
    <span class="header-item">
      <VeIcon name="el-icon-search" :size="20" />
    </span>
    <span class="header-item">
      <VeIcon name="el-icon-bell" :size="20" />
    </span>
    <el-dropdown class="header-item" @command="userCommand">
      <VeFlex align="middle">
        <el-avatar :size="24" :src="user.avatar"></el-avatar>
        <span class="ml-8">{{ user.nickname }}</span>
      </VeFlex>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item icon="el-icon-user" command="center">个人中心</el-dropdown-item> -->
        <el-dropdown-item icon="el-icon-user" command="setting">账户设置</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" divided command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    
  </div>
</header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'VeLayoutHeader',
  computed: {
    ...mapGetters(['logo', 'user'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    userCommand(command) {
      if (command === 'logout') {
        this.logout().then(() => {
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
