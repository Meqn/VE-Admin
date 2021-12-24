<script>
export default {
  name: 'VeFormGroup',
  props: {
    type: {
      type: String,
      default: 'grid'
    },
    gutter: Number
  },
  provide() {
    return {
      groupType: this.type
    }
  },
  render() {
    const { type, gutter } = this

    // grid
    const $grid = (
      <el-row ref="row" type="flex" justify="start" align="top" gutter={gutter} class="form-row">
        {this.$slots.default}
      </el-row>
    )
    
    return type === 'grid'
      ? $grid : null
  }
}
</script>
