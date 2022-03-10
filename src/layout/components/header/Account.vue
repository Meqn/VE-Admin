<template>
  <el-dropdown @command="userCommand">
    <div class="flex-middle">
      <el-avatar :size="24" :src="user.avatar"></el-avatar>
      <span class="ml-8">{{ user.nickname }}</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item icon="el-icon-user" command="center">个人中心</el-dropdown-item>
      <el-dropdown-item icon="el-icon-setting" command="setting">账户设置</el-dropdown-item>
      <el-dropdown-item icon="el-icon-switch-button" divided command="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'HeaderAccount',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    userCommand(command) {
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
