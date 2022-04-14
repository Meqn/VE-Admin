<template>
<el-container style="height: 100vh">
  <el-aside width="200px" class="sider">Aside</el-aside>
  <el-container>
    <el-header class="header">Header</el-header>
    <el-main class="main">
      <p v-for="i in 3" :key="i">第{{ i + 1}}行</p>

      <el-row :gutter="20" class="mb-20" style="background:#eee; padding: 20px">
        <el-col :span="12">
          <VeCard
            style="width: 500px"
            title="测试卡片1">
            <template #extra>
              <a href="#">more</a> | 
              <a href="#">links</a>
            </template>
            <p v-for="i in 5" :key="i" style="line-height: 24px">阿拉啦啦啦啦啦</p>
          </VeCard>
        </el-col>
        <el-col :span="12">
          <VeCard
            style="width: 500px"
            title="测试卡片2"
            extra="啦啦啦"
            bordered
            tabExtra="啊哈哈"
            :tabList="[{ label: '菜单一', name: '2' }, { label: '菜单二', name: '5', active: true }, { label: '菜单三', name: '8' }]">
            <VeCardGrid style="width: 25%; text-align: center" v-for="i in 8" :key="i" :hoverable="i !== 2">啦啦啦啦啦啦</VeCardGrid>
          </VeCard>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mb-20" style="background:#eee;padding:20px">
        <el-col :span="12">
          <VeCard
            style="width: 500px"
            :bordered="false"
            :tabList="[{ label: '菜单一', name: '2', render: renderLabel }, { label: '菜单二', name: '5', active: true }, { label: '菜单三', name: '8' }]">
            <p v-for="i in 5" :key="i" style="line-height: 24px">阿拉啦啦啦啦啦</p>
          </VeCard>
        </el-col>
        <el-col :span="12">
          <ve-card title="Card title">
            <p style="font-size: 14px; color: rgba(0, 0, 0, 0.85); margin-bottom: 16px; font-weight: 500">
              Group title
            </p>
            <ve-card title="Inner card title" type="inner" size="small">
              <template #extra>
                <a href="#">More</a>
              </template>
              Inner Card content
            </ve-card>
            <ve-card hoverable title="Inner card title" class="mt-16" type="inner">
              <template #extra>
                <a href="#">More</a>
              </template>
              Inner Card content
            </ve-card>
            <ve-card type="inner" class="mt-16">
              <template #cover>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              </template>
              <template class="ant-card-actions" #actions>
                <span key="setting">啊</span>
                <span key="edit">哦</span>
                <span key="ellipsis">额</span>
                <i class="el-icon-delete"></i>
                <ve-icon name="el-icon-setting" />
              </template>
              <ve-card-meta title="Card title title title title title title title" description="This is the description. This is the description. This is the description">
                <template #avatar>
                  <el-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </template>
              </ve-card-meta>
            </ve-card>
          </ve-card>
          
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mb-20">
        <el-col :span="8">
          <VeCard
            style="width: 200px"
            title="测试卡片"
            bordered>
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <ve-card-meta title="Europe Street beat">
              <template #description>www.instagram.com</template>
            </ve-card-meta>
          </VeCard>
        </el-col>
        <el-col :span="8">
          <ve-card hoverable style="width: 300px" size="small">
            <template #cover>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </template>
            <template class="ant-card-actions" #actions>
              <span key="setting">啊</span>
              <span key="edit">哦</span>
              <el-button type="primary">确定</el-button>
              <i class="el-icon-delete"></i>
              <ve-icon name="el-icon-setting" />
            </template>
            <ve-card-meta title="Card title title title title title title title" description="This is the description. This is the description. This is the description">
              <template #avatar>
                <el-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </template>
            </ve-card-meta>
          </ve-card>
        </el-col>
        <el-col :span="8">
          <VeCard
            style="width: 100%"
            title="标签卡片"
            bordered
            :tabList="[{ label: '菜单一', name: '2', slot: 'menu1' }, { label: '菜单二', name: '5', active: true }, { label: '菜单三', name: '8' }]">
            <p v-for="i in 5" :key="i" style="line-height: 24px">阿拉啦啦啦啦啦</p>
            <template #menu1="menu">
              <span>{{menu.label}} 😀</span>
            </template>
          </VeCard>
        </el-col>
      </el-row>

      <VeCard
        style="width: 500px"
        title="测试卡片"
        bordered
        :tabList="[{ label: '菜单一', name: '2' }, { label: '菜单二', name: '5', active: true }, { label: '菜单三', name: '8' }]">
        <p v-for="i in 5" :key="i" style="line-height: 24px">阿拉啦啦啦啦啦</p>
      </VeCard>
    </el-main>
    <el-footer class="footer" v-loading="loading" @click.native="testHttp">Footer</el-footer>
  </el-container>
</el-container>
</template>

<script>
import { withCancelToken } from '@/utils/request/index'
import { login, getArea, getError } from '@/api/fetch'
import { getRule } from '@/api/rule'
const [useLogin, abortLogin] = withCancelToken(getArea)

// const CancelToken = HTTP.CancelToken
// const source = CancelToken.source()

export default {
  name: 'layout',
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    getRule({ page: 2 }).then(res => {
      console.log('rule', res)
    })
  },
  methods: {
    renderLabel(h, item) {
      return (<span>{ item.label } 🙂</span>)
    },
    testHttp() {
      this.loading = true
      useLogin('320000').then(res => {
        console.log('login resolve', res)
      }).catch(err => {
        console.error('login error', err)
      })
    }
  }
}
</script>

<style lang="scss">
.sider{
  background-color: aquamarine;
}
.header, .footer{
  background-color: #eee;
}
.main{
  p{
    margin: 12px 0;
    line-height: 50px;
    background-color: ccc;
  }
}
</style>
