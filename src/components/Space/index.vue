<script>
import isNumber from 'lodash/isNumber'
import { isEmptyElement, isVNode } from '@/utils/validate'

const SIZE_MAP = {
  small: 8,
  middle: 16,
  large: 24
}

const prefixCls = 've-space'

export default {
  name: 'VeSpace',
  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === 'string') {
          return ['small', 'middle', 'large'].includes(val)
        } else {
          return isNumber(val)
        }
      },
      default: 'small'
    },
    direction: {
      type: String,
      validator(val) {
        return ['horizontal', 'vertical'].includes(val)
      },
      default: 'horizontal'
    },
    align: {
      type: String,
      validator(val) {
        return ['start', 'end', 'center', 'baseline'].includes(val)
      },
      default: 'center'
    },
    wrap: Boolean,
    spacer: {
      type: [String, Object],
      validator(val) {
        return typeof val === 'string' || isVNode(val)
      }
    }
  },
  render(h) {
    const $children = this.$slots.default
    if (!$children) return null

    const { align, size, direction, spacer, wrap } = this
    const items = $children.filter(c => !isEmptyElement(c))
    const len = items.length

    if (len === 0) return null
    
    // space
    const spaceClass = {
      [prefixCls]: true,
      [`${prefixCls}-${direction}`]: true,
      [`${prefixCls}-wrap`]: wrap && direction === 'horizontal',
      [`${prefixCls}-align-${align}`]: align
    }

    // space-item
    const itemClassName = `${prefixCls}-item`
    const marginDirection = 'marginRight' // directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';
    const spaceItemStyle = {
      [direction === 'vertical' ? 'marginBottom' : marginDirection]: typeof size === 'string' ? `${SIZE_MAP[size]}px` : `${size}px`
    }

    // spacer
    const spacerClass = `${prefixCls}-spacer`
    const spacerNode = h('span', {
      class: spacerClass,
      style: spaceItemStyle
    }, [spacer || null])

    // items
    const children = []
    items.forEach((child, i) => {
      children.push(
        <div
          class={itemClassName}
          key={`${itemClassName}-${i}`}
          style={i === len - 1 ? null : spaceItemStyle}>
          {child}
        </div>
      )
      if (spacer && (i < len - 1)) {
        children.push(spacerNode)
      }
    })

    return (
      <div class={spaceClass}>{children}</div>
    )
  }
}
</script>

<style lang="scss">
.ve-space{
  display: inline-flex;

  &-vertical {
    flex-direction: column;
  }
  &-wrap{
    flex-wrap: wrap;
  }

  &-align {
    &-center {
      align-items: center;
    }
    &-start {
      align-items: flex-start;
    }
    &-end {
      align-items: flex-end;
    }
    &-baseline {
      align-items: baseline;
    }
  }
}
</style>
