<script>
import Icon from '../Icon'
import Copy from 'copy-to-clipboard'
import { isObject, isVNode } from '../utils'

export default {
  name: 'VeText',
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      validator(val) {
        return ['primary', 'success', 'warning', 'danger', 'info', ''].includes(val)
      }
    },
    tag: {
      type: String,
      default: 'span'
    },
    icon: String,
    iconColor: String,
    iconSize: Number,
    disabled: Boolean,

    code: Boolean,
    keyboard: Boolean,
    delete: Boolean,
    mark: Boolean,
    strong: Boolean,
    italic: Boolean,
    underline: Boolean,

    copyable: [Boolean, Object], // { text, onCopy, icon, tooltips }
    ellipsis: [Boolean, Number]
  },
  data() {
    return {
      copyIcon: 'el-icon-document-copy',
      coplied: false
    }
  },
  computed: {
    ellipsisClass() {
      const { ellipsis } = this
      if (ellipsis) {
        if (ellipsis === 1 || typeof ellipsis === 'boolean') {
          return 'is-ellipsis'
        } else {
          const num = ellipsis > 5 ? 5 : ellipsis
          return `ellipsis-${num}`
        }
      }
      return ''
    },
    iconStyle() {
      const styleObj = {}
      if (this.iconColor && !this.disabled) {
        styleObj['color'] = this.iconColor
      }
      if (this.iconSize) {
        styleObj['font-size'] = this.iconSize + 'px'
      }
      return styleObj
    },
    copyConfig() {
      const { copyable } = this
      const conf = {
        icon: ['el-icon-document-copy', 'el-icon-document-checked'],
        tooltips: ['copy', 'coplied!']
      }
      if (copyable) {
        if (isObject(copyable)) {
          return {
            ...copyable,
            icon: Array.isArray(copyable.icon) ? copyable.icon : conf.icon,
            tooltips: copyable.tooltips
              ? Array.isArray(copyable.tooltips)
                ? copyable.tooltips
                : conf.tooltips
              : false
          }
        }
        return conf
      }
      return false
    }
  },
  render(h) {
    const { tag, type, disabled, icon, ellipsisClass } = this

    function wrapper(
      { code, keyboard, delete: del, mark, strong, italic, underline } = this,
      content
    ) {
      let renderContent = content

      function wrap(needed, tag) {
        if (!needed) return
        renderContent = (<tag>{ renderContent }</tag>)
      }

      wrap(code, 'code')
      wrap(keyboard, 'kbd')
      wrap(del, 'del')
      wrap(mark, 'mark')
      wrap(strong, 'strong')
      wrap(italic, 'i')
      wrap(underline, 'u')

      return renderContent
    }
    
    return (
      <tag
        class={ ['ve-text', type ? `ve-text-${type}` : '', ellipsisClass, { 'is-hover': this.$listeners.click }, { 'is-disabled': disabled }] }
        onClick={ this.onClick }>
        { icon ? <Icon name={icon} class="mr-4" style={this.iconStyle} /> : null }
        { wrapper(this, this.$slots.default) }
        { this.renderCopy() }
        {this.$slots.right}
      </tag>
    )
  },
  methods: {
    renderCopy() {
      const { copyConfig, coplied } = this
      if (!copyConfig) return null

      const { icon, tooltips } = copyConfig
      const iconDom = isVNode(icon[0]) && isVNode(icon[1])
        ? (<span onClick={ this.onCopy }>{coplied ? icon[1] : icon[0]}</span>)
        : (<Icon name={coplied ? icon[1] : icon[0]} class={ ['ml-4 button-copy', { 'is-coplied': coplied }] } onClick={ this.onCopy } />)
      const tooltipsDom = (
        <el-tooltip effect="dark" placement="top">
          <template slot="content">{coplied ? tooltips[1] : tooltips[0]}</template>
          {iconDom}
        </el-tooltip>
      )
      
      if (copyConfig) {
        return copyConfig.tooltips === false ? iconDom : tooltipsDom
      } else {
        return null
      }
    },
    onClick() {
      if (this.disabled) return false
      this.$emit('click')
    },
    onCopy(event) {
      event.stopPropagation()
      event.preventDefault()
      if (this.coplied) return
      // this.$slots.default = VNode
      // VNode.elm = Element
      const { copyConfig } = this
      const text = copyConfig.text ? copyConfig.text : this.$slots.default?.[0]?.elm?.textContent
      if (text) {
        const result = Copy(text)
        if (result) {
          this.coplied = true

          this.$nextTick(() => {
            typeof copyConfig.onCopy === 'function' && copyConfig.onCopy(event)
          })

          setTimeout(() => {
            this.coplied = false
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="scss">
$type-colors: (
  'primary': $--color-primary,
  'success': $--color-success,
  'warning': $--color-warning,
  'danger': $--color-danger,
  'info': $--color-info,
);

.ve-text{
  display: inline-flex;
  align-items: center;
  color: $--color-text-regular;

  &.is-hover{
    cursor: pointer;
    &:hover{
      color: $--color-primary;
    }
  }
  &.is-disabled, &.is-disabled:hover{
    color: $--font-color-disabled-base;
    cursor: not-allowed;
    user-select: none;
  }
  &.is-ellipsis{
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .ve-icon{
      vertical-align: middle;
    }
  }
  @for $i from 2 through 5 {
    &.ellipsis-#{$i}{
      display: -webkit-box;
      -webkit-line-clamp: $i;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @each $key, $val in $type-colors {
    &.ve-text-#{$key} {
      color: $val;

      &.is-hover:hover{
        color: mix($--color-black, $val, 10%);
      }
      &.is-disabled, &.is-disabled:hover{
        color: mix($--color-white, $val, 40%);
      }
    }
  }

  code {
    margin: 0 0.2em;
    padding: 0.2em 0.4em 0.1em;
    font-size: 85%;
    background: rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;
  }
  kbd {
    margin: 0 0.2em;
    padding: 0.15em 0.4em 0.1em;
    font-size: 90%;
    background: rgba(150,150,150,.06);
    border: 1px solid rgba(100,100,100,.2);
    border-bottom-width: 2px;
    border-radius: 3px;
  }

  mark {
    padding: 0;
    background-color: yellow;
  }

  u, ins {
    text-decoration: underline;
    text-decoration-skip-ink: auto;
  }

  s, del {
    text-decoration: line-through;
  }

  strong {
    font-weight: 600;
  }

  .button-copy{
    color: $--color-primary;
    cursor: pointer;
    transition: all .3s ease;

    &.is-coplied{
      color: $--color-success;
    }
  }
}
</style>
