<template>
<ve-container>
  <ve-page-header
    breadcrumb
    title="分布表单"
    sub-title="保存表单并不是提交"
    extra="哈哈哈😀"
    back
    tab-extra="吼吼😀"
    @tab-change="onTabChange"
    @extra-click="onTabChange"
    @tab-extra-click="onTabChange"
    :tabList="[{ label: '菜单一', name: '2', slot: 'menu' }, { label: '菜单二', name: '5', render: renderLabel, active: true }, { label: '菜单三', name: '8' }]">
    <p>哈哈哈哈哈哈哈哈哈</p>
    <p>哈哈哈哈哈哈哈哈哈</p>
    <p>哈哈哈哈哈哈哈哈哈</p>
    <template #menu="item">{{item.label}}😀</template>
  </ve-page-header>
  <div style="padding: 16px; background: #fff" id="demo">
    <VeQueryForm :model="form">
      <VeFormItem prop="name" label="1活动名称">
        <el-input v-model="form.name"></el-input>
      </VeFormItem>
      <VeFormItem prop="name" label="2活动名称">
        <el-input v-model="form.name"></el-input>
      </VeFormItem>
      <VeFormItem prop="name" label="3活动名称">
        <el-input v-model="form.name"></el-input>
      </VeFormItem>
      <VeFormItem prop="name" label="4活动名称">
        <el-input v-model="form.name"></el-input>
      </VeFormItem>
      <VeFormItem prop="name" label="5活动名称">
        <el-input v-model="form.name"></el-input>
      </VeFormItem>
    </VeQueryForm>

    <el-divider />
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button @click="resetFormItem">重置 Item1</el-button>

    <el-divider />

    <VeForm :model="ruleForm2" :rules="rules" label-width="100px" ref="ruleForm2" size="mini">

      <VeFormGroup type="grid" :gutter="24" title="测试表单" extra="哈哈哈">
        <ve-form-item prop="name" label="哟哟哟">
          <el-input v-model="ruleForm2.name"></el-input>
        </ve-form-item>
        <ve-form-item prop="name" label="活动名称">
          <el-input v-model="ruleForm2.name"></el-input>
          <template slot="label">
            <ve-text icon="el-icon-platform-eleme">啦啦</ve-text>
          </template>
        </ve-form-item>
        <ve-form-item prop="name" label="活动名称 3" :span="2">
          <el-input v-model="ruleForm2.name"></el-input>
        </ve-form-item>
        <ve-form-item prop="name" label="活动名称">
          <el-input v-model="ruleForm2.name"></el-input>
        </ve-form-item>
      </VeFormGroup>

      <el-divider />

      <VeFormGroup type="cell" title="测试表单" extra="哈哈哈" size="medium">
        <ve-form-item prop="region" label="测试名称 01" labelWidth="100px">
          <el-input v-model="ruleForm2.region" placeholder="请输入名称"></el-input>
          <template slot="label">
            <ve-text icon="el-icon-platform-eleme">测试名</ve-text>
          </template>
          <template slot="error">
            <ve-text icon="el-icon-platform-eleme">错啦啦啦</ve-text>
          </template>
        </ve-form-item>

        <ve-form-item prop="desc" label="活动名称 02" :span="2">
          <VeFlex>
          <el-input v-model="ruleForm2.desc" placeholder="请输入"></el-input>
          <el-input v-model="ruleForm2.desc" placeholder="请输入"></el-input>
          </VeFlex>
        </ve-form-item>

        <ve-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm2.region" placeholder="请选择活动区域" class="w-10/10">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </ve-form-item>

        <ve-form-item prop="name" label="用户名 3">
          <el-input v-model="ruleForm2.name" placeholder="请输入"></el-input>
        </ve-form-item>

        <ve-form-item prop="name" label="用户名 4">
          <el-input v-model="ruleForm2.name" placeholder="请输入"></el-input>
        </ve-form-item>

      </VeFormGroup>

      <el-divider />

      <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </VeForm>

  </div>
</ve-container>
</template>

<script>
/* eslint-disable */
// import Descriptions from '@/components/Form/Descriptions.vue'
import { FormItem } from '@/components/Form'
import { GridForm, GridFormItem } from '@/components/GridForm/'

export default {
  name: 'basic-form',
  components: {
    FormItem,
    GridForm,
    GridFormItem
    // Descriptions
  },
  directives: {
    demo: {
      bind(el, binding, vnode) {
        // console.log('el : ', el)
        // console.log('vnode : ', vnode)
        const { name, value, arg, modifiers } = binding
        // console.log('binding : ', binding)
        // console.log('modifiers :', modifiers)
      }
    }
  },
  props: {
    disabled: Boolean
  },
  data() {
    return {
      form: {
        name: ''
      },
      resizeObserver: null,
      currentElement: null,
      size: {
        width: 0,
        height: 0,
        offsetWidth: 0,
        offsetHeight: 0
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      ruleForm2: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        list: [
          {
            name: '',
            age: '',
            gender: ''
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      // this.index = null
    }, 5000);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    resetFormItem() {
      this.$refs.item1.resetField()
    },
    handleResize(val, el) {
      console.log('resize : ', val, el)
    },
    handleResize2(val, el) {
      console.log('v-resize : ', val)
    },
    onViewPlay() {
      this.$refs['view'].open(5)
    },
    handleOpen(index, num) {
      // this.showView = true
      if (num === 2) {
        this.index2 = index
      } else {
        this.index = index
      }
      
      // this.$refs['view'].open(index)
    },
    renderLabel(h, item) {
      return (<span>{item.label} ⚠️</span>)
    },
    onOpen(a) {
      console.log('event open', a)
    },
    onClose(a) {
      console.log('event close', a)
      this.index = a
      // this.showView = false
    },
    onTabChange(tab) {
      console.log('tab change ', tab)
    }
  }
}
</script>

<style lang="scss">
.form-border{
  //
}
</style>
