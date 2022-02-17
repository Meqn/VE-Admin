<template>
<PageLayout
  title="基础表单"
  content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
  breadcrumb>
  
  <ve-card>
    <el-form :model="basicForm" :rules="formRules" hide-required-asterisk ref="basicForm" label-position="top" class="basic-form">
      <el-form-item label="标题" prop="title">
        <el-input v-model="basicForm.title"></el-input>
      </el-form-item>
      <el-form-item label="起止时间" prop="date" required>
        <el-date-picker
          v-model="basicForm.date"
          class="w-auto"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="目标描述" prop="description">
        <el-input type="textarea" placeholder="请输入你的阶段性工作目标" v-model="basicForm.description" />
      </el-form-item>
      <el-form-item label="目标类别" prop="range">
        <el-checkbox-group v-model="basicForm.range">
          <el-checkbox label="1">生活</el-checkbox>
          <el-checkbox label="2">科技</el-checkbox>
          <el-checkbox label="3">娱乐</el-checkbox>
          <el-checkbox label="4">理论</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="客户" prop="partner">
        <template #label>
          客户
          <ve-text type="info" class="ml-4">(选填)</ve-text>
          <el-tooltip effect="dark" content="目标的服务对象" placement="top">
            <ve-text type="info" class="ml-8"><ve-icon name="el-icon-warning-outline" /></ve-text>
          </el-tooltip>
        </template>
        <el-select v-model="basicForm.partner" placeholder="请选择服务客户">
          <el-option label="工行银行" value="1"></el-option>
          <el-option label="农业银行" value="2"></el-option>
          <el-option label="建设银行" value="3"></el-option>
          <el-option label="交通银行" value="4"></el-option>
          <el-option label="招商银行" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="commenter">
        <template #label>
          约评人
          <ve-text type="info" class="ml-4">(选填)</ve-text>
        </template>
        <el-input v-model="basicForm.commenter" placeholder="请直接 @姓名／工号，最多可邀请 5 人"></el-input>
      </el-form-item>
      <el-form-item prop="weight">
        <template #label>
          权重
          <ve-text type="info" class="ml-4">(选填)</ve-text>
        </template>
        <el-input-number v-model="basicForm.weight" :min="0" :max="10" class="w-auto" />
      </el-form-item>
      <el-form-item label="目标公开" prop="open">
        <el-radio-group v-model="basicForm.open">
          <el-radio label="1">公开</el-radio>
          <el-radio label="2">部分公开</el-radio>
          <el-radio label="3">不公开</el-radio>
        </el-radio-group>
        <div class="gray">客户、邀评人默认被分享</div>
      </el-form-item>
      <el-form-item class="mt-40">
        <el-button type="primary" @click="submitForm('basicForm')">立即创建</el-button>
        <el-button @click="resetForm('basicForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </ve-card>
  
</PageLayout>
</template>

<script>
export default {
  name: 'BasicForm',
  data() {
    return {
      basicForm: {
        title: '',
        date: '',
        description: '',
        standard: '',
        range: [],
        partner: '',
        commenter: '',
        weight: 0,
        open: '',
      },
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 40, message: '长度在 5 到 40 个字符', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择起止时间', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写工作目标', trigger: 'blur' }
        ],
        standard: [
          { required: true, message: '请填写衡量标准', trigger: 'blur' }
        ],
        range: [
          { required: true, message: '请至少选择一个范围', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('form', this.basicForm)
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-form{
  max-width: 600px;
  margin: 8px auto;

  &.el-form--label-top{
    ::v-deep{
      .el-form-item__label{
        padding: 0;
      }
    }
  } 
}

</style>
