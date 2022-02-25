import Flex from './Flex'
import Icon from './Icon'
import Text from './Text'
import Space from './Space'
import { Card, CardGrid, CardMeta } from './Card'
import Container from './Container'
import PageHeader from './PageHeader'
import { Table, TableCell } from './Table'
import { Form, FormGroup, FormItem, QueryForm } from './Form'

const components = [
  Flex,
  Icon,
  Text,
  Space,
  Card, CardGrid, CardMeta,
  Container,
  PageHeader,
  Table, TableCell,
  QueryForm,
  Form, FormGroup, FormItem
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
