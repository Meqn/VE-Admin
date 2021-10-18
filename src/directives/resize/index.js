import resizeDirective from './resizeDirective'

const install = function(Vue) {
  Vue.directive('resize', resizeDirective)
}

if (window.Vue) {
  Vue.use(install) // eslint-disable-line
}

export default {
  install,
  resizeDirective
}
