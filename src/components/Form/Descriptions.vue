<script>
/* eslint-disable */
import { Descriptions } from 'element-ui'
export default {
  name: 'Descriptions',
  extends: Descriptions,
  methods: {
    getRows() {
      const children = ((this.$slots.default || []).filter(vnode => vnode.tag && vnode.componentOptions && (['ElDescriptionsItem', 'VeFormItem'].includes(vnode.componentOptions.Ctor.options.name))))
      const nodes = children.map(vnode => {
        return {
          props: this.getOptionProps(vnode),
          slots: this.getSlots(vnode),
          vnode
        };
      });
      const rows = [];
      let temp = [];
      let count = this.column;

      nodes.forEach((node, index) => {
        const span = node.props.span || 1;

        if (index === children.length - 1) {
          temp.push(this.filledNode(node, span, count, true));
          rows.push(temp);
          return;
        }

        if (span < count) {
          count -= span;
          temp.push(node);
        } else {
          temp.push(this.filledNode(node, span, count));
          rows.push(temp);
          count = this.column;
          temp = [];
        }
      });

      return rows;
    }
  }
}
</script>
