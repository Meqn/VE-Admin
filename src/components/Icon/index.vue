<template>
  <i v-if="iconType === 'svg'" class="ve-icon" v-on="$listeners" :style="iconStyle" role="icon">
    <svg class="svg-icon"><use :xlink:href="`#icon-${name}`" /></svg>
  </i>
  <i v-else-if="iconType === 'external'" class="ve-icon external-icon" v-on="$listeners" :style="iconStyle" role="img" />
  <i v-else :class="['ve-icon', name]" v-on="$listeners" :style="iconStyle" role="icon" />
</template>

<script>
export default {
  name: 'VeIcon',
  props: {
    name: {
      type: String,
      require: true
    },
    size: Number,
    color: [String, Array],
    rotate: Number
  },
  computed: {
    iconType() {
      const extRegx = /^(https?:\/\/)/
      const iconRegx = /^\w+-icon-/
      const { name } = this
      if (extRegx.test(name)) {
        return 'external'
      }
      if (iconRegx.test(name)) {
        return 'font'
      }
      return 'svg'
    },
    iconStyle() {
      const { color, size, rotate, iconType } = this
      const styleObj = {}

      const [currentColor, fillColor] = Array.isArray(color) ? color : [color]
      currentColor && (styleObj['color'] = currentColor)
      if (fillColor) {
        styleObj['fill'] = fillColor
        styleObj['stroke'] = fillColor
      }
      
      if (size) {
        styleObj['fontSize'] = size + 'px'
      }

      if (iconType === 'external') {
        styleObj['background-image'] = `url(${this.name})`
      }

      if (typeof rotate === 'number') {
        styleObj['transform'] = `rotate(${rotate}deg)`
      }

      return styleObj
    }
  }
}
</script>

<style lang="scss">
.ve-icon{
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 1em;
  vertical-align: baseline;
  line-height: 1;
  font-style: normal;
  color: currentColor;
  fill: currentColor;
  stroke: currentColor;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.external-icon{
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.svg-icon{
  width: 1em;
  height: 1em;
  display: inline-block;
  font-style: normal;
}

// 自定义 iconfont
[class^="ve-icon-"], [class*=" ve-icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'iconfont' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
