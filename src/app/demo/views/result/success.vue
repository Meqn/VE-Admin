<template>
<VePageContainer>
  <VeCard>
    <el-result
      icon="success"
      title="提交成功"
      subTitle="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。">
      <template #extra>
        <el-button type="primary">返回列表</el-button>
        <el-button>查看项目</el-button>
        <el-button>打 印</el-button>
      </template>
    </el-result>

    <div class="pa-24" style="background: #fafafa">
      <el-descriptions title="项目名称" :column="3" ghost>
        <el-descriptions-item label="项目 ID">23421</el-descriptions-item>
        <el-descriptions-item label="负责人">曲丽丽</el-descriptions-item>
        <el-descriptions-item label="生效时间">2016-12-12 ~ 2017-12-12</el-descriptions-item>
      </el-descriptions>

      <el-steps :active="2" align-center class="mt-24">
        <el-step title="创建项目">
          <template #description>
            <VeText>曲丽丽</VeText>
            <VeText type="primary" icon="el-icon-chat-dot-round" class="ml-12" />
            <div class="gray">2016-12-12 12:32</div>
          </template>
        </el-step>
        <el-step title="部门初审">
          <template #description>
            <VeText>周毛毛</VeText>
            <VeText type="primary" icon="el-icon-chat-dot-round" class="ml-12">催一下</VeText>
          </template>
        </el-step>
        <el-step title="财务复核"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
  </VeCard>
</VePageContainer>
</template>

<script>
export default {
  name: 'ResultSuccess'
}
</script>
