import Flex from './Flex'
import Icon from './Icon'

const components = [
  Flex,
  Icon
]

const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }
  components.forEach(component => {
    if (component.name) {
      Vue.component(component.name, component)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
