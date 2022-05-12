<template>
<VePageContainer
  title="分布表单"
  content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
  breadcrumb>

  <VeCard>
    <el-steps :active="step" simple>
      <el-step title="填写转账信息" icon="el-icon-edit"></el-step>
      <el-step title="确认转账信息" icon="el-icon-user"></el-step>
      <el-step title="完成" icon="el-icon-circle-check"></el-step>
    </el-steps>

    <div class="mt-40 step-form" v-if="step === 1">
      <el-form ref="step1" :model="form" :rules="rule1" label-position="top">
        <el-form-item label="付款账户" prop="payerAccount">
          <el-input v-model="form.payerAccount" clearable></el-input>
        </el-form-item>
        <el-form-item label="收款账户" prop="payeeAccount">
          <div class="flex">
            <el-select v-model="form.payType" placeholder="请选择服务客户" style="width: 150px">
              <el-option label="银行账户" :value="2"></el-option>
              <el-option label="支付宝" :value="1"></el-option>
            </el-select>
            <el-input v-model="form.payeeAccount" clearable class="ml-12 flex-item"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="收款人姓名" prop="payeeName">
          <el-input v-model="form.payeeName" clearable></el-input>
        </el-form-item>
        <el-form-item label="转账金额" prop="amount">
          <el-input v-model="form.amount" type="number">
            <span slot="prefix">￥</span>
          </el-input>
        </el-form-item>
        <el-form-item class="mt-40">
          <el-button type="primary" @click="onSubmit(1)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mt-40 step-form" v-if="step === 2">
      <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="warning" show-icon />
      <el-descriptions :column="1" border class="mt-20">
        <el-descriptions-item label="付款账户">{{ form.payerAccount }}</el-descriptions-item>
        <el-descriptions-item label="收款账户">{{ form.payeeAccount }}</el-descriptions-item>
        <el-descriptions-item label="收款人姓名">{{ form.payeeName }}</el-descriptions-item>
        <el-descriptions-item label="转账金额">
          <span class="font-18">{{ form.amount }}</span> 元
        </el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <el-form ref="step2" :model="form" :rules="rule2" label-position="top" style="margin-top: -12px">
        <el-form-item label="支付密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="mt-40">
          <el-button @click="step = 1">上一步</el-button>
          <el-button type="primary" @click="onSubmit(2)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mt-40 step-form" v-if="step === 3">
      <el-result
        icon="success"
        title="操作成功"
        subTitle="预计两小时内到账">
        <template #extra>
          <el-button type="primary" @click="step = 1">再转一笔</el-button>
          <el-button>查看账单</el-button>
        </template>
      </el-result>

      <div class="pa-24" style="background: #fafafa">
        <el-descriptions :column="1" ghost>
          <el-descriptions-item label="付款账户">{{ form.payerAccount }}</el-descriptions-item>
          <el-descriptions-item label="收款账户">{{ form.payeeAccount }}</el-descriptions-item>
          <el-descriptions-item label="收款人姓名">{{ form.payeeName }}</el-descriptions-item>
          <el-descriptions-item label="转账金额">
            <span class="font-18">{{ form.amount }}</span> 元
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <el-divider class="mt-40 mb-40" />

    <div class="step-form-description">
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      <h4>转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
    </div>
  </VeCard>
</VePageContainer>
</template>

<script>
export default {
  name: 'StepForm',
  data() {
    return {
      step: 1,
      form: {
        payerAccount: 'alibaba@alipay.com',
        payType: 1,
        payeeAccount: 'wang123',
        payeeName: '王毛毛',
        amount: 500,
        password: '12345'
      },
      rule1: {
        payerAccount: [
          { required: true, message: '请输入付款账户', trigger: 'blur' }
        ],
        payeeAccount: [
          { required: true, message: '请输入收款账户', trigger: 'blur' }
        ],
        payeeName: [
          { required: true, message: '请输入收款人姓名', trigger: 'blur' }
        ],
        amount: [
          { type: 'number', required: true, message: '请输入转账金额', trigger: 'blur' }
        ]
      },
      rule2: {
        password: [
          { required: true, message: '请输入支付密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(step) {
      const formRef = 'step' + step
      console.log(`this.$refs[${formRef}]`, this.$refs[formRef])
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.step = step + 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.step-form{
  max-width: 480px;
  margin: 0 auto;

  .el-form--label-top{
    ::v-deep{
      .el-form-item__label{
        padding: 0;
      }
    }
  } 

  &-description{
    h3{
      margin-bottom: 8px;
    }
    p{
      margin: 4px 0;
    }
  }
}
</style>
