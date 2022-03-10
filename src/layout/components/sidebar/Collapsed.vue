<script>
export default {
  name: 'SiderCollapsed',
  inject: {
    top: ['layout']
  },
  props: {
    size: Number
  },
  methods: {
    toggleSideBar() {
      this.top.toggleSideBar()
    }
  },
  render() {
    let className = 'el-icon-s-unfold'
    let title = '展开'
    if (!this.top.siderCollapsed) {
      className = 'el-icon-s-fold'
      title = '收起'
    }
    const iconStyle = {}
    if (this.size) {
      iconStyle['font-size'] = this.size + 'px'
    }
    return (
      <div class="sider-menu-collapse" onClick={this.toggleSideBar} title={title}>
        <i class={className} style={iconStyle} />
      </div>
    )
  }
}
</script>

<style lang="scss">
.sider-menu-collapse{
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
