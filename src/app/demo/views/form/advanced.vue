<template>
<PageLayout>
  <ve-page-header
    slot="header"
    title="高级表单"
    breadcrumb>
    表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
  </ve-page-header>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
    <ve-card>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'域名' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true, message: '域名不能为空', trigger: 'blur'
        }">
        <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </ve-card>

    <ve-card>
      <el-table
        :data="dynamicValidateForm.tableData"
        style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.date" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址">
          <template slot-scope="scope">
            <el-input v-model="scope.row.address" />
          </template>
        </el-table-column>
      </el-table>

      <el-divider />

      <ve-table
        ref="veTable"
        :table="tableProps"
        :data="dynamicValidateForm.tableData"
        :columns="tableColumn"
        :editable="{ type: 'cell', cellEditMode: 'auto', cellEditCancel: true }"
        @value-change="onValueChange"
        @cell-dblclick="onCellClick"
        new-row="新用户"
        @new-row="onAddRow">
        <template v-slot:date="scope">
          <VeTableCell :data="scope">
            <el-date-picker
              slot="edit"
              v-model="scope.row.date"
              type="date"
              value-format="yyyy-M-d"
              placeholder="选择日期">
            </el-date-picker>
          </VeTableCell>
        </template>
        <template v-slot:action="scope">
          <ve-space>
            <template v-if="scope.column.editing">
              <el-button type="text" @click="onSaveRow(scope)">保存</el-button>
              <el-button type="text" @click="onCancelRow(scope)">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" @click="onEditRow(scope)">编辑</el-button>
            </template>
            <el-button type="text" @click="onDelRow(scope)">删除</el-button>
          </ve-space>
        </template>
      </ve-table>

    </ve-card>
  </el-form>


  <VeFlex justify="right" slot="footer">
    <el-button type="primary">立即创建</el-button>
    <el-button>重置</el-button>
  </VeFlex>
  
</PageLayout>
</template>

<script>
const data = [{
  date: '2016-05-02',
  name: '王小虎',
  gender: 0,
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  gender: 0,
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王小虎2',
  gender: 0,
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  gender: 0,
  address: ''
}]

const options = [{
  value: 'Beijing',
  label: '北京'
}, {
  value: 'Shanghai',
  label: '上海'
}, {
  value: 'Nanjing',
  label: '南京'
}, {
  value: 'Chengdu',
  label: '成都'
}, {
  value: 'Shenzhen',
  label: '深圳'
}, {
  value: 'Guangzhou',
  label: '广州'
}]

export default {
  name: 'advanced-form',
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: '',
        tableData: data
      },
      tableColumn: [
        { type: 'index' },
        { prop: 'date', label: '日期时间', editable: false, slots: { default: 'date' }, fieldType: 'date' },
        { prop: 'name', label: '真实姓名', editable: true, fieldProps: { clearable: true } },
        { prop: 'gender', label: '性别', editable: true, fieldType: 'switch' },
        { prop: 'address', label: '详细地址', editable: true, fieldType: 'select', fieldProps: { options }, showOverflowTooltip: true },
        { prop: 'actions', label: '操作', slots: { default: 'action' } }
      ],
      options: options,
      tableProps: {}
    }
  },
  mounted() {
  },
  methods: {
    onClickout() {
      console.log('click header out ...')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
      this.dynamicValidateForm.tableData.push({
        date: '',
        name: '',
        address: ''
      })
      this.$refs['veTable'].edit(this.dynamicValidateForm.tableData.length - 1)
    },
    onClickTableCell({ row, column, $index }) {
      // console.log('on cell button click', { row, column, $index })
      this.$refs['veTable'].edit($index)
    },
    onCellClick(row, column, cell, event) {
      // console.log('on cell click', row, column, cell, event)
    },
    onEditRow({ row, column, $index }) {
      console.log('onEditRow ', row, column)
      this.$refs['veTable'].edit(row)
    },
    onSaveRow({ row, column, $index }) {
      // console.log('保存数据', row)
      this.$refs['veTable'].save(row)
    },
    onCancelRow({ row, column, $index }) {
      this.$refs['veTable'].edit(row, false)
    },
    onDelRow({ row, column, $index }) {
      // this.dynamicValidateForm.tableData.splice($index, 1)
      this.$refs['veTable'].delete(row)
    },
    onValueChange(a, b, c) {
      console.log('change value', a, b, c)
    },
    onAddRow() {
      this.$refs['veTable'].addRow(this.dynamicValidateForm.tableData[0], 'top')
    }
  }
}
</script>
