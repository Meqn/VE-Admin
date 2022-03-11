<script>
export default {
  name: 'LayoutFooter',
  props: {
    copyright: [String, Object],
    links: Array
  },
  render() {
    const { links, copyright } = this

    let linksDom = null
    if (links && links.length > 0) {
      linksDom = (
        <div class="ve-layout-footer-links">
          {
            links.map(item => {
              return item.href
                ? (<a key={item.key || item.href} href={item.href} class="link-item" title={item.key} target={item.blankTarget ? '_blank' : '_self'}>{item.title}</a>)
                : (<span key={item.key} class="link-item" title={item.key}>{item.title}</span>)
            })
          }
        </div>
      )
    }

    const copyrightDom = copyright ? (<div class="ve-layout-footer-copyright">Copyright @ {copyright}</div>) : null

    return (
      <el-footer height="auto">
        <div class="ve-layout-footer">
          { this.$slots.default || ([linksDom, copyrightDom]) }
        </div>
      </el-footer>
    )
  }
}
</script>
