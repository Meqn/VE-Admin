<template>
<VePageContainer>
  <VeCard>
    <el-result
      icon="error"
      title="提交失败"
      subTitle="请核对并修改以下信息后，再重新提交。">
      <template #extra>
        <el-button type="primary">返回修改</el-button>
      </template>
    </el-result>

    <VeCard :bordered="false" style="background: #fafafa">
      <div class="card-title mb-12">您提交的内容有如下错误：</div>
      <p>
        <VeText icon="el-icon-circle-close" icon-color="#FF3333">您的账户已被冻结</VeText>
        <VeText type="primary" class="ml-16">立即解冻 <i class="el-icon-view el-icon-arrow-right"></i></VeText>
      </p>
      <p class="mt-4">
        <VeText icon="el-icon-circle-close" icon-color="#FF3333">您的账户还不具备申请资格</VeText>
        <VeText type="primary" class="ml-16">立即升级 <i class="el-icon-view el-icon-arrow-right"></i></VeText>
      </p>
    </VeCard>
  </VeCard>
</VePageContainer>
</template>

<script>
export default {
  name: 'ResultFail'
}
</script>
