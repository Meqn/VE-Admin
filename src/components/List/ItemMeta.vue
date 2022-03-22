<script>
export default {
  name: 'VeItemMeta',
  functional: true,
  props: {
    avatar: [String, Object],
    description: [String, Object],
    title: [String, Object]
  },
  render(h, context) {
    const { props, slots, listeners } = context
    const slotsMap = slots()

    const avatar = props.avatar || slotsMap.avatar
    const title = props.title || slotsMap.title
    const description = props.description || slotsMap.description
    const content = (
      <div class={`ve-item-meta-content`}>
        {title && <h4 class={`ve-item-meta-title`}>{title}</h4>}
        {description && <div class={`ve-item-meta-description`}>{description}</div>}
      </div>
    );
    return (
      <div {...{ on: listeners }} class={`ve-item-meta`}>
        {avatar && <div class={`ve-item-meta-avatar`}>{avatar}</div>}
        {(title || description) && content}
      </div>
    );
  }
}
</script>
