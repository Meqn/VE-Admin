<script>
export default {
  name: 'Redirect',
  created() {
    const { $route, $router } = this
    const { params, query } = $route
    const { path } = params
    if (path) {
      $router.replace({ path: '/' + path, query })
    } else {
      // 无跳转地址，则默认跳转到第一个菜单
      let route = '/'
      const routeArr = this.$store.state.permission?.routes
      if (routeArr) {
        routeArr.some(v => {
          const hidden = v.hidden || v.meta?.hidden
          if (!hidden) {
            route = v.path
            return true
          }
          return false
        })
      }
      $router.replace(route)
    }
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
