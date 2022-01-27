<script>
import './style.scss'
import { omit } from '@/utils'
import { filterEmpty, getComponentFromProp } from '../utils'
/* import {
  getSlotOptions,
  filterEmpty,
  getListeners,
} from '../_util/props-util'; */
// import BaseMixin from '../_util/BaseMixin';

const prefixCls = 've-card'

export default {
  name: 'VeCard',
  props: {
    headStyle: Object,
    bodyStyle: Object,
    title: String,
    extra: String,
    bordered: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    hoverable: Boolean,
    type: String,
    ghost: Boolean,
    size: {
      type: String,
      validator(val) {
        return ['default', 'small'].includes(val)
      },
      default: 'default'
    },
    tabList: Array,
    tabExtra: String,
    tabProps: {
      type: Object,
      default: () => {}
    }
    // tabs: tabprops, tabSlot, tabActive
    // actions: $slots,
    // tabBarExtraContent: slot,
    // collapsible
  },
  data() {
    return {
      activeTab: '',
      widerPadding: false
    };
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
          props: omit(item, ['active', 'slot'])
        }
        const labelSlot = this.$scopedSlots[item.slot]
        const labelDom = labelSlot ? (<template slot="label">{labelSlot(item)}</template>) : null

        return (<el-tab-pane {...paneProps}>{labelDom}</el-tab-pane>)
      })
    },
    getAction(actions) {
      return actions.map((action, index) => (
        <li key={`action-${index}`}>{action}</li>
      ))
    },
    onTabClick(tab, event) {
      this.$emit('tab-click', tab, event)
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
      tabList,
    } = this.$props

    const hasTabs = tabList && tabList.length > 0

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
        ...this.tabProps
      },
      on: {
        tabClick: this.onTabClick
      },
      class: `${prefixCls}-tabs`
    }

    // header 头部区域
    let header
    const titleContent = getComponentFromProp(this, 'title')
    const extraContent = getComponentFromProp(this, 'extra')
    const tabExtraContent = getComponentFromProp(this, 'tabExtra')
    const headDom = (titleContent || extraContent)
      ? (
        <div class={`${prefixCls}-head-wrapper`}>
          {titleContent && <div class={`${prefixCls}-head-title`}>{titleContent}</div>}
          {extraContent && <div class={`${prefixCls}-extra`}>{extraContent}</div>}
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

    const cover = getComponentFromProp(this, 'cover')
    const coverDom = cover ? <div class={`${prefixCls}-cover`}>{cover}</div> : null

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
    
    const actions = filterEmpty(this.$slots.actions)
    const actionDom = actions && actions.length
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
