<template>
<div class="login-wrapper">
  <el-form :model="form" :rules="rules" size="default" ref="form" class="login-form">
    <el-form-item class="login-form-header">
      <h1>系统登录</h1>
    </el-form-item>
  <el-form-item prop="username">
    <el-input type="text" v-model="form.username" placeholder="请填写用户名" autocomplete="off">
      <template #prefix>
        <i class="el-icon-user-solid"></i>
      </template>
    </el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input type="password" v-model="form.password" placeholder="请填写密码" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item prop="remeber">
    <el-checkbox v-model="form.remeber">自动登录</el-checkbox>
    <el-link type="primary" :underline="false" style="float: right">忘记密码？</el-link>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" :loading="loading" @click="handleLogin('form')" style="width: 100%">
      {{ loading ? '登录中...' : '登 录' }}
    </el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'user-login',
  data() {
    return {
      loading: false,
      redirect: undefined,
      form: {
        username: 'admin',
        password: 'admin',
        remeber: false
      },
      rules: {
        username: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '用户名长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    const { query } = this.$route
    if (query) {
      this.redirect = query.redirect
    }
  },
  methods: {
    ...mapActions('user', ['login', 'getInfo']),
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.login(this.form).then(() => {
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
            this.getInfo(this.form.username)
            this.$router.push({ path: this.redirect || '/', query: this.$route.query })
          }).finally(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $--background-color;
}
.login-form{
  position: absolute; top: 40%; left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  padding: 32px 40px;
  border-radius: 2px;
  box-shadow: 3px 3px 12px rgba($color: #000000, $alpha: .06);
  background-color: #fff;

  &-header{
    margin-bottom: 32px;
  }
}
</style>
