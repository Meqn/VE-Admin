<template>
<VePageContainer
  breadcrumb
  title="查询表格">
  <ve-card>
    <ve-table
      title="文章列表"
      :data="articleList"
      :columns="tableColumns"
      :loading="loading"
      :pagination="pagination"
      @pagination-size-change="handleChangePageSize"
      @pagination-current-change="handleCurrentPage">
      <template #search>
        <VeQueryForm :model="articlesParams" label-suffix=" :">
          <VeFormItem prop="title" label="文章标题">
            <el-input v-model="articlesParams.title"></el-input>
          </VeFormItem>
          <VeFormItem prop="category" label="分类">
            <el-input v-model="articlesParams.category"></el-input>
          </VeFormItem>
          <VeFormItem prop="name" label="作者">
            <el-input v-model="articlesParams.author"></el-input>
          </VeFormItem>
          <VeFormItem prop="name" label="发布状态">
            <el-input v-model="articlesParams.status"></el-input>
          </VeFormItem>
          <VeFormItem prop="name" label="创建时间">
            <el-input v-model="articlesParams.create_time"></el-input>
          </VeFormItem>
        </VeQueryForm>
      </template>
      <template #extra>
        <el-button plain icon="el-icon-upload2">全部导出</el-button>
        <el-button type="primary" icon="el-icon-plus">新 增</el-button>
      </template>
      <template #author="{ row }">
        <ve-text>
          {{ row.author.name }}
          <ve-icon class="ml-2 mt-2" :color="row.author.gender === 'male' ? '#0065ff' : '#ff002d'" :name="row.author.gender === 'male' ? 'el-icon-male' : 'el-icon-female'" />
        </ve-text>
      </template>
      <template #status="{ row }">
        <el-tag :type="articleStatusType[row.status.value]" size="mini">{{ row.status.name }}</el-tag>
      </template>
      <template #action="{ row }">
        <ve-space>
          <el-button type="text" @click="$router.push(`/list/table/list/${row.id}/`)">查看</el-button>
          <el-button type="text" @click="$router.push('/dust/demo/create/')">编辑</el-button>
          <el-button type="text" @click="$router.push('/dust/demo/create/')">删除</el-button>
        </ve-space>
      </template>
      <template #action-header><i class="el-icon-setting"/> 操作</template>
    </ve-table>
  </ve-card>
</VePageContainer>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'TableList',
  data() {
    const { page = 1, pageSize = 10 } = this.$route.query
    return {
      loading: false,
      form: {
        name: ''
      },
      articlesParams: {
        title: '',
        category: '',
        author: '',
        status: '',
        createTime: '',
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      },
      articleList: [],
      tableColumns: [
        { prop: 'index', type: 'selection', label: '全选' },
        { prop: 'title', label: '文章标题', minWidth: 200, visible: true, showOverflowTooltip: true },
        { prop: 'category', label: '分类', width: 120, visible: true, render: (h, { row }) => h('span', row.category?.name) },
        { prop: 'author', label: '作者', visible: true, slots: { default: 'author' } },
        { prop: 'createTime', label: '创建时间', width: 180, sortable: true, visible: true },
        { prop: 'status', label: '状态', visible: true, slots: { default: 'status' } },
        { prop: 'viewCount', label: '浏览量', visible: true, render: (h, { row }) => (<ve-text icon="el-icon-view">{row.viewCount}</ve-text>) },
        { prop: 'commentsCount', label: '评论数', visible: true, render: (h, { row }) => (<ve-text icon="el-icon-chat-dot-square">{row.commentsCount}</ve-text>) },
        { prop: 'action', label: '操作', width: '150px', slots: { default: 'action', header: 'action-header' } }
      ],
      pageTotal: 0,
      content: '',
      articleStatusType: {
        publish: 'success',
        draft: 'info',
        secrete: 'warning',
        discard: 'danger'
      }
    }
  },
  computed: {
    pagination() {
      const { page, pageSize } = this.articlesParams
      return {
        total: this.pageTotal,
        currentPage: page,
        pageSize
      }
    }
  },
  created() {
    console.log('TableList: created!')

    this.getArticleList()
    this.$watch('articlesParams', (value) => {
      const { query, path } = this.$route
      const { page = 1, pageSize = 10 } = value
      this.$router.replace({ path, query: { ...query, page, pageSize } })
    }, { deep: true })
  },
  methods: {
    getArticleList() {
      this.loading = true
      getArticleList(this.articlesParams)
        .then(({ data }) => {
          console.log('getArticleList ', data)
          if (data && data.count > 0) {
            this.pageTotal = data.count
            this.articleList = data.results
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSearch() {
      this.loading = true
      setTimeout(() => {
        this.$refs['searchForm']?.finish?.()
        this.loading = false
      }, 1500)
    },
    resetForm() {
      this.$refs['searchForm'].resetForm()
    },
    formatterDate(row, column, cellValue, index) {
      return new Date(cellValue).getTime()
    },
    formatterProject(row, column, cellValue, index) {
      return `<a>${cellValue} - ${index}</a>`
    },
    onTabClick(tab) {
      console.log('tab : ', tab)
    },
    onClickText(text) {
      console.log('click text ...')
    },
    handleChangePageSize(pageSize) {
      this.articlesParams.pageSize = pageSize
      this.getArticleList()
    },
    handleCurrentPage(page) {
      this.articlesParams.page = page
      this.getArticleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-demo{
  padding: 16px;
  background-color: #fff;
}
</style>
