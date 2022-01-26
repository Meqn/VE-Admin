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
      const { color, size, rotate } = this
      const obj = {}
      if (this.iconType === 'external') {
        obj['background-image'] = `url(${this.name})`
      }
      if (size) {
        obj['fontSize'] = size + 'px'
      }
      if (typeof color === 'string') {
        obj['color'] = color
      }
      if (Array.isArray(color)) {
        obj['color'] = color[0]
        if (color.length > 1) {
          obj['fill'] = color[1]
        }
      }
      if (typeof rotate === 'number') {
        obj['transform'] = `rotate(${rotate}deg)`
      }
      return obj
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
  fill: currentColor;
  color: currentColor;
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
</style>
