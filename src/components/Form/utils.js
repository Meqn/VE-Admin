
export function getSpanCount(column) {
  return Math.floor(24 / column)
}

function isRequired(props, rules = {}) {
  let isRequired = false
  if (props && props.prop) {
    const itemRules = props.rules || rules[props.prop] || []
    const requiredRule = props.required !== undefined ? { required: !!props.required } : [];
    [].concat(itemRules, requiredRule).every(rule => {
      if (rule.required) {
        isRequired = true
        return false
      }
      return true
    })
  }
  return isRequired
}

export function getFormItemProps(props, group) {
  const result = {
    ref: 'elFormItem',
    class: props.formItemClass,
    style: props.formItemStyle,
    props: {
      prop: props.prop,
      label: props.label,
      labelWidth: props.labelWidth,
      required: isRequired(props, group.form?.rules),
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

  if (group.type === 'cell') {
    result.props.label = undefined
    result.props.labelWidth = '0px'
  }

  return result
}
