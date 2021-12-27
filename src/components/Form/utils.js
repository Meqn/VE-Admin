
export function getSpanCount(column) {
  return Math.floor(24 / column)
}

export function getFormItemProps(props, type = 'grid') {
  const result = {
    ref: 'elFormItem',
    class: props.formItemClass,
    style: props.formItemStyle,
    props: {
      prop: props.prop,
      label: props.label,
      labelWidth: props.labelWidth,
      required: props.required,
      rules: props.rules,
      error: props.error,
      showMessage: props.showMessage,
      inlineMessage: props.inlineMessage,
      size: props.size
    }
  }
  if (props.scopedSlots) {
    result.scopedSlots = props.scopedSlots
  }

  if (type === 'cell') {
    result.props.label = undefined
    result.props.labelWidth = '0px'
  }

  return result
}
