import Flex from './Flex'
import Icon from './Icon'
import Container from './Container'
import PageHeader from './PageHeader'
import Table from './Table'
import { QueryForm, GridForm, GridFormItem } from './GridForm'

const components = [
  Flex,
  Icon,
  Container,
  PageHeader,
  Table,
  QueryForm,
  GridForm,
  GridFormItem
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
