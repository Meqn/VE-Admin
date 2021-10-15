<template>
<span class="fullscreen-wrap" :title="fullScreen ? '退出全屏' : '全屏'" @click="toggleScreen">
  <slot v-bind="{ fullScreen }">
    <svg class="fullscreen-icon" width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path v-if="fullScreen" d="M33 6v9h9M15 6v9H6M15 42v-9H6M33 42v-9h8.9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path v-else d="M33 6h9v9M42 33v9h-9M15 42H6v-9M6 15V6h9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </slot>
</span>
</template>

<script>
export default {
  name: 'VeFullscreen',
  props: {
    element: [String, Object, Element]
  },
  data() {
    return {
      fullScreen: false
    }
  },
  computed: {
    el() {
      const { element } = this
      if (element) {
        if (element instanceof Element) {
          return element
        }
        if (typeof element === 'string') {
          return document.querySelector(element)
        }
      }
      return document.body
    }
  },
  mounted() {
    this.addListener()
    this.$on('hook:beforeDestroy', this.removeListener.bind(this))
  },
  methods: {
    toggleScreen() {
      if (this.fullScreen) {
        this.outFullScreen()
      } else {
        this.inFullScreen()
      }
    },
    inFullScreen() {
      const { el } = this
      el.classList.add('js-fullscreen')
      if (el.requestFullscreen) {
        el.requestFullscreen()
        return true
      } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen()
        return true
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
        return true
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen()
        return true
      }
      this.$message.warn('对不起，您的浏览器不支持全屏模式')
      el.classList.remove('js-fullscreen')
      return false
    },
    outFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      this.el.classList.remove('js-fullscreen')
    },
    addListener() {
      document.addEventListener('fullscreenchange', this.fullScreenListener)
      document.addEventListener('webkitfullscreenchange', this.fullScreenListener)
      document.addEventListener('mozfullscreenchange', this.fullScreenListener)
      document.addEventListener('msfullscreenchange', this.fullScreenListener)
    },
    removeListener() {
      document.removeEventListener('fullscreenchange', this.fullScreenListener)
      document.removeEventListener('webkitfullscreenchange', this.fullScreenListener)
      document.removeEventListener('mozfullscreenchange', this.fullScreenListener)
      document.removeEventListener('msfullscreenchange', this.fullScreenListener)
    },
    fullScreenListener(e) {
      if (e.target === this.el) {
        this.fullScreen = !this.fullScreen
      }
    }
  }
}
</script>

<style lang="scss">
:-ms-fullscreen{
  background-color: #fff !important;
}
:-moz-full-screen{
  background-color: #fff !important;
}
:-webkit-full-screen{
  background-color: #fff !important;
}
:fullscreen{
  background-color: #fff !important;
}

.fullscreen-wrap{
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 100%;
  cursor: pointer;
  .fullscreen-icon{
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 1em;
    vertical-align: baseline;
    font-style: normal;
    // fill: currentColor;
    color: currentColor;
  }
}
.js-fullscreen{
  position: relative;
  overflow-y: auto;
  scrollbar-color: #8c8c8c #d9d9d9;
  scrollbar-width: thin;
  -ms-overflow-style: none;
}
</style>
