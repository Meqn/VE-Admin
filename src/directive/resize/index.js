import Resize from './resize'

const install = function(Vue) {
  Vue.directive('resize', Resize)
}

if (window.Vue) {
  Vue.use(install) // eslint-disable-line
}

Resize.install = install
export default Resize
