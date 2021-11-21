import Flex from './Flex'
import Icon from './Icon'
import Container from './Container'
import PageHeader from './PageHeader'
import Table from './Table'
import { LayoutForm, LayoutFormItem, QueryFilter } from './LayoutForm'

const components = [
  Flex,
  Icon,
  Container,
  PageHeader,
  Table,
  LayoutForm,
  LayoutFormItem,
  QueryFilter
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
