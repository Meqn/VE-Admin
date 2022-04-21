import Flex from './Flex'
import Icon from './Icon'
import Text from './Text'
import Space from './Space'
import { Card, CardGrid, CardMeta } from './Card'
import Container from './Container'
import PageHeader from './PageHeader'
import PageContainer from './PageContainer'
import { Table, TableCell } from './Table'
import { Form, FormGroup, FormItem, QueryForm } from './Form'
import Select from './Select'

const components = [
  Flex,
  Icon,
  Text,
  Space,
  Card, CardGrid, CardMeta,
  Container,
  PageHeader,
  PageContainer,
  Table, TableCell,
  QueryForm,
  Form, FormGroup, FormItem,
  Select
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
  Flex,
  Icon,
  Text,
  Space,
  Card,
  CardGrid,
  CardMeta,
  Container,
  PageHeader,
  PageContainer,
  Table,
  TableCell,
  QueryForm,
  Form,
  FormGroup,
  FormItem
}
