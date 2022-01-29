<script>
import './style.scss'
import { omit } from '@/utils'
import { filterEmpty, getComponentFromProp } from '../utils'

const prefixCls = 've-card'

export default {
  name: 'VeCard',
  props: {
    headStyle: Object,
    bodyStyle: Object,
    title: String,
    extra: String,
    bordered: Boolean,
    loading: Boolean,
    hoverable: Boolean,
    type: String,
    ghost: Boolean,
    size: {
      type: String,
      validator(val) {
        return ['default', 'small'].includes(val)
      }
    },
    tabList: Array,
    tabExtra: String,
    tabProps: Object
  },
  data() {
    return {
      activeTab: '',
      widerPadding: false
    };
  },
  computed: {
    hasTabs() {
      return this.tabList && this.tabList.length > 0
    }
  },
  watch: {
    tabList: {
      handler(list) {
        if (list && list.length > 0) {
          const acts = list.filter(v => v.active)
          this.activeTab = acts.length > 0 ? acts[0].name : list[0].name
        }
      },
      immediate: true
    },
    activeTab(val) {
      this.$emit('tab-change', val)
    }
  },
  methods: {
    getTabPanel() {
      return this.tabList.map(item => {
        const paneProps = {
          props: omit(item, ['active', 'slot', 'render'])
        }
        const labelSlot = this.$scopedSlots[item.slot]
        const labelRender = item.render
        let labelDom = null
        if (labelSlot || labelRender) {
          labelDom = (
            <template slot="label">{ labelSlot ? labelSlot(item) : labelRender(this.$createElement, item) }</template>
          )
        }
        return (<el-tab-pane {...paneProps}>{labelDom}</el-tab-pane>)
      })
    },
    getAction(actions) {
      return actions.map((action, index) => (
        <li key={`action-${index}`}>{action}</li>
      ))
    },
    onClickTab(tab, event) {
      this.$emit('tab-click', tab, event)
    },
    onClickExtra() {
      this.$emit('extra-click')
    },
    isContainGrid(nodes = []) {
      return nodes.some(node => node.tag && node.componentOptions && node.componentOptions.Ctor.options.name === 'VeCardGrid')
    }
  },
  render() {
    const {
      headStyle = {},
      bodyStyle = {},
      bordered = true,
      size = 'default',
      type,
      tabProps = {},
      hasTabs,
    } = this.$props

    const { $slots } = this;
    const classString = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-loading`]: this.loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-ghost`]: this.ghost,
      [`${prefixCls}-hoverable`]: !!this.hoverable,
      [`${prefixCls}-contain-grid`]: this.isContainGrid($slots.default),
      [`${prefixCls}-contain-tabs`]: hasTabs,
      [`${prefixCls}-${size}`]: size !== 'default',
      [`${prefixCls}-type-${type}`]: !!type
    }

    const tabbarProps = {
      props: {
        ...tabProps
      },
      on: {
        'tab-click': this.onClickTab
      },
      class: `${prefixCls}-tabs`
    }

    // ------ header 头部区域
    let header
    const titleContent = getComponentFromProp(this, 'title')
    const extraContent = getComponentFromProp(this, 'extra')
    const tabExtraContent = getComponentFromProp(this, 'tabExtra')
    const headDom = (titleContent || extraContent)
      ? (
        <div class={`${prefixCls}-head-wrapper`}>
          {titleContent && <div class={`${prefixCls}-head-title`}>{titleContent}</div>}
          {extraContent && <div class={`${prefixCls}-extra`} onClick="onClickExtra">{extraContent}</div>}
        </div>
      )
      : null
    const tabsDom = hasTabs ? (
      <div class="ve-card-tabs-wrapper">
        <el-tabs vModel={this.activeTab} { ...tabbarProps }>
          { this.getTabPanel() }
        </el-tabs>
        {tabExtraContent && <div class={`${prefixCls}-tabs-extra`}>{tabExtraContent}</div>}
      </div>
    ) : null

    if (headDom || tabsDom) {
      header = (
        <div class={`${prefixCls}-head`} style={headStyle}>
          {headDom}
          {tabsDom}
        </div>
      )
    }

    // ------ cover 卡片封面区域
    const cover = getComponentFromProp(this, 'cover')
    const coverDom = cover ? <div class={`${prefixCls}-cover`}>{cover}</div> : null
    
    // ------ body 主体区域
    const children = $slots.default
    const bodyProps = {
      class: `${prefixCls}-body`,
      style: bodyStyle,
      directives: [
        {
          name: 'loading',
          value: this.loading
        }
      ]
    }
    const body = (
      <div {...bodyProps}>
        {children}
      </div>
    )

    // ------ actions 卡片操作区域
    const actions = filterEmpty(this.$slots.actions)
    const actionDom = actions && actions.length > 0
      ? (<ul class={`${prefixCls}-actions`}>{this.getAction(actions)}</ul>)
      : null

    return (
      <div class={classString}>
        {header}
        {coverDom}
        {children ? body : null}
        {actionDom}
      </div>
    )
  }
}
</script>
