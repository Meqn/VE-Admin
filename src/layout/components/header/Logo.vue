<script>
import { isVNode } from '@/components/utils'
export default {
  name: 'HeaderLogo',
  inject: {
    top: ['layout']
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    showTitle() {
      return this.collapsed ? !this.top.siderCollapsed : true
    }
  },
  render() {
    const { top, showTitle } = this
    const title = typeof top.title === 'string'
      ? (<h1 v-show={showTitle}>{top.title}</h1>)
      : isVNode(top.title) && showTitle
        ? top.title
        : null
    
    return (
      <a class="header-logo" onClick={top.onMenuHeaderClick}>
        { top.logo && (<img src={top.logo} alt="logo" />) }
        { title }
      </a>
    )
  }
}
</script>

<style lang="scss" scoped>
.header-logo{
  display: flex;
  align-items: center;
  height: 100%;

  h1{
    margin-left: 12px;
    font-size: 20px;
    white-space: nowrap;
  }
}
</style>
