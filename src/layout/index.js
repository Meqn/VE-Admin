import Layout from './Layout'
import PageLayout from './PageLayout'
import BlankView from './BlankView'

const components = [
  Layout,
  PageLayout,
  BlankView
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

export {
  install as default,
  Layout,
  PageLayout,
  BlankView
}
