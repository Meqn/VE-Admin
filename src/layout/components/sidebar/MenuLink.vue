<script>
import { isExternal } from '@/utils/validate'
export default {
  name: 'MenuLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render() {
    const { to } = this
    const $slot = this.$slots.default
    if (isExternal(to)) {
      return <a href={to} target="_blank">{$slot}</a>
    } else {
      return <router-link to={to}>{$slot}</router-link>
    }
  }
}
</script>
