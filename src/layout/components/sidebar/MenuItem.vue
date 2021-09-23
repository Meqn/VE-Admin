<script>
export default {
  name: 'MenuItem',
  functional: true,
  render(h, { props }) {
    const { icon, title } = props
    const vnodes = []
    if (icon) {
      vnodes.push(<VeIcon name={icon} class="sub-el-icon" />)
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
