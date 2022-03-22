<script>
import Icon from '../Icon'
import Copy from 'copy-to-clipboard'
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

    copyable: Boolean,
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
    }
  },
  render(h) {
    const { tag, type, disabled, icon, ellipsisClass, copyable, coplied } = this

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

    const $copy = (
      <el-tooltip effect="dark" content={coplied ? 'coplied!' : 'copy'} placement="top">
        <Icon
          name={ coplied ? 'el-icon-document-checked' : 'el-icon-document-copy' }
          class={ ['ml-4 button-copy', { 'is-coplied': coplied }] }
          onClick={ this.onCopy }
        />
      </el-tooltip>
    )
    
    return (
      <tag
        class={ ['ve-text', type ? `ve-text-${type}` : '', ellipsisClass, { 'is-hover': this.$listeners.click }, { 'is-disabled': disabled }] }
        onClick={ this.onClick }>
        { icon ? <Icon name={icon} class="mr-4" style={this.iconStyle} /> : null }
        { wrapper(this, this.$slots.default) }
        { copyable ? $copy : null }
        {this.$slots.right}
      </tag>
    )
  },
  methods: {
    onClick() {
      if (this.disabled) return false
      this.$emit('click')
    },
    onCopy(event) {
      event.stopPropagation()
      event.preventDefault()
      // this.$slots.default = VNode
      // VNode.elm = Element
      const text = this.$slots.default?.[0]?.elm?.textContent
      if (text) {
        const result = Copy(text)
        if (result) {
          this.coplied = true
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
