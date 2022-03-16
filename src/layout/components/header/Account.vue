<script>
import { omit } from '@/utils'
export default {
  name: 'HeaderAccount',
  props: {
    avatar: String,
    name: [String, Object],
    menus: Array
  },
  methods: {
    handleCommand(command) {
      this.$emit('command', command)
    }
  },
  render() {
    const { menus, handleCommand } = this
    const dropdownProps = {
      on: { command: handleCommand }
    }

    return (
      <el-dropdown {...dropdownProps}>
        <div class="flex-middle h-full">
          <el-avatar size={24} src={this.avatar} />
          { this.name && (<span class="ml-8 norwap">{this.name}</span>) }
        </div>
        <el-dropdown-menu slot="dropdown">
          {
            menus && menus.map(item => {
              const itemPprops = { props: { ...omit(item, ['title']) } }
              return <el-dropdown-item { ...itemPprops }>{item.title}</el-dropdown-item>
            })
          }
        </el-dropdown-menu>
      </el-dropdown>
    )
  }
}
</script>
