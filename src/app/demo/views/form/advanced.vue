<template>
<VePageContainer
  title="高级表单"
  content="高级表单常见于一次性输入和提交大批量数据的场景。"
  breadcrumb>

  <ve-form :model="form" :rules="formRules" ref="form" label-position="top" class="advanced-form">
    <ve-card title="仓库管理">
      <ve-form-group type="grid" :gutter="32">
        <ve-form-item prop="store.name" label="仓库名" required>
          <el-input v-model="form.store.name"></el-input>
        </ve-form-item>
        <ve-form-item prop="store.url" label="仓库域名" required>
          <el-input v-model="form.store.url">
            <template slot="prepend">Https://</template>
            <template slot="append">.com</template>
          </el-input>
        </ve-form-item>
        <ve-form-item prop="store.owner" label="仓库管理员" required>
          <el-select v-model="form.store.owner" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ve-form-item>
        <ve-form-item prop="store.approver" required>
          <ve-text slot="label">
            审批人
            <el-tooltip slot="right" effect="dark" content="仓库的管理对象" placement="top">
              <ve-text type="info" class="ml-8"><ve-icon name="el-icon-warning-outline" /></ve-text>
            </el-tooltip>
          </ve-text>
          <el-select v-model="form.store.approver" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ve-form-item>
        <ve-form-item prop="store.dateRange" label="生效日期" required>
          <el-date-picker
            v-model="form.store.dateRange"
            class="w-full"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </ve-form-item>
        <ve-form-item prop="store.type" label="仓库类型" required>
          <el-select v-model="form.store.type" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ve-form-item>
      </ve-form-group>
    </ve-card>

    <ve-card title="任务管理" class="mt-20">
      <ve-form-group :gutter="32">
        <ve-form-item prop="task.name" label="任务名" required>
          <el-input v-model="form.task.name"></el-input>
        </ve-form-item>
        <ve-form-item prop="task.desc" label="任务描述" required>
          <el-input v-model="form.task.desc"></el-input>
        </ve-form-item>
        <ve-form-item prop="task.executor" label="执行人" required>
          <el-select v-model="form.store.executor" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ve-form-item>
        <ve-form-item prop="task.officer" label="责任人" required>
          <el-select v-model="form.store.officer" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ve-form-item>
        <ve-form-item prop="task.dateRange" label="生效日期" required>
          <el-date-picker
            v-model="form.task.dateRange"
            class="w-full"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </ve-form-item>
        <ve-form-item prop="task.type" label="任务类型" required>
          <el-select v-model="form.task.type" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </ve-form-item>
      </ve-form-group>
    </ve-card>

    <ve-card title="成员管理" class="mt-20">
      <ve-table
        ref="table"
        :toolbar="false"
        :data="form.users"
        :columns="userColumns"
        editable="single-row"
        new-row
        @new-row="onNewRow">
        <template v-slot:part="scope">
          <ve-table-cell :data="scope" fieldType="select" :fieldProps="{ options: partmentsList }">
            {{ partmentsMap[scope.row['part']] }}
          </ve-table-cell>
        </template>
        <template v-slot:action="scope">
          <ve-space :size="12">
            <template v-if="scope.column.editing">
              <el-button type="text" @click="onSaveRow(scope)">保存</el-button>
              <el-button type="text" @click="onCancelRow(scope)">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" @click="onEditRow(scope)">编辑</el-button>
            </template>
            <el-popconfirm title="是否删除此行？" placement="top" @confirm="onDelRow(scope)">
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </ve-space>
        </template>
      </ve-table>
    </ve-card>
  </ve-form>

  <VeFlex justify="right" slot="footer">
    <el-button @click="resetForm('form')">重置</el-button>
    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
  </VeFlex>
</VePageContainer>
</template>

<script>
export default {
  name: 'AdvancedForm',
  data() {
    return {
      form: {
        title: '',
        store: {
          name: '',
          url: '',
          owner: '',
          approver: '',
          dateRange: '',
          type: '',
        },
        task: {
          name: '',
          desc: '',
          executor: '',
          officer: '',
          dateRange: '',
          type: '',
        },
        users: [
          { name: 'John Brown', number: '00001', part: '1' },
          { name: 'Jim Green', number: '00002', part: '2' },
          { name: 'Joe Black', number: '00003', part: '3' },
          { name: 'Lee Pink', number: '00004', part: '4' },
          { name: 'Zhang Red', number: '00005', part: '5' }
        ]
      },
      formRules: {
        'store.name': [
          { required: true, message: '请输入仓库名', trigger: 'blur' },
          { min: 5, max: 40, message: '长度在 5 到 40 个字符', trigger: 'blur' }
        ],
        'store.dateRange': [
          { required: true, message: '请选择起止时间', trigger: 'change' }
        ]
      },
      userColumns: [
        { type: 'index', label: '序号', width: '80px' },
        { prop: 'name', label: '成员姓名', editable: true },
        { prop: 'number', label: '工号', editable: true },
        { prop: 'part', label: '所属部门', editable: true, slots: { default: 'part' } },
        { prop: 'action', label: '操作', slots: { default: 'action' }, width: '150px' }
      ],
      partmentsList: [
        { value: '1', label: 'New York No. 1 Lake Park' },
        { value: '2', label: 'London No. 1 Lake Park' },
        { value: '3', label: 'Sidney No. 1 Lake Park' },
        { value: '4', label: 'Hongkong No. 1 Lake Park' },
        { value: '5', label: 'Beijing No. 1 Lake Park' }
      ],
      userList: [
        { label: '付晓晓', value: '1' },
        { label: '周毛毛', value: '2' },
        { label: '蔡丝丝', value: '3' }
      ],
      typeList: [
        { label: '公开', value: '0' },
        { label: '私密', value: '1' }
      ]
    }
  },
  computed: {
    partmentsMap() {
      return this.partmentsList.reduce((acc, item) => {
        acc[item.value] = item.label
        return acc
      }, {})
    }
  },
  created() {
    console.log('AdvancedForm: created!')
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
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onEditRow({ row, column, $index }) {
      this.$refs['table'].edit(row)
    },
    onSaveRow({ row, column, $index }) {
      this.$refs['table'].save(row)
    },
    onCancelRow({ row, column, $index }) {
      this.$refs['table'].edit(row, false)
    },
    onDelRow({ row, column, $index }) {
      this.$refs['table'].delete(row)
    },
    onNewRow() {
      this.$refs['table'].addRow({ name: '', number: '', part: '' })
    }
  }
}
</script>
