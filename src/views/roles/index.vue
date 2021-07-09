<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm
        ref="dataSearchForm"
        mode="search"
        :forms="config.search"
        label-position="right"
        style="justify-content: space-between;"
        @search="() => tableData.refresh.call(tableData, $refs.dataSearchForm.model)"
      >
        <template v-slot:right>
          <el-button @click="handleCreate">新建角色</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable
        v-loading="tableData.loading"
        v-bind="table"
        style="padding: 0"
        @change="tableData.refresh.call(tableData)"
      >
        <template v-slot:operation="{ row }">
          <div style="display: flex;justify-content: space-around">
            <el-link type="primary" @click="handleAuthorize(row)">授权</el-link>
            <el-link type="primary" @click="handleUpdate(row)">编辑</el-link>
            <el-link type="primary" @click="handleDelete(row)">删除</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <!-- 表单新增/编辑对话框 -->
    <BaseDialog ref="formDialog" v-bind="dialog">
      <DataForm ref="dataForm" :forms="config.form" label-position="right" :context="this" :data="table.selected" />
      <template v-slot:footer>
        <div class="footer">
          <el-button @click="$refs.formDialog.close()">取消</el-button>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </div>
      </template>
    </BaseDialog>
    <!-- 授权对话框 -->
    <BaseDialog ref="authorizeDialog" title="角色授权" width="200">
      <AuthorizeLayout left="用户搜索" right="居民权限">
        <template v-slot:left>
          <DataTree id="name" ref="rbacNodeList" :data="authorize.rbac_node_list" show-checkbox name="title" />
        </template>
        <template v-slot:right>
          <DataTree ref="memberNodeList" :data="authorize.member_node_list" show-checkbox />
        </template>
      </AuthorizeLayout>
      <template v-slot:footer>
        <div class="footer">
          <el-button @click="$refs.authorizeDialog.close()">取消</el-button>
          <el-button type="primary" @click="handleAuthorizeSubmit">保存</el-button>
        </div>
      </template>
    </BaseDialog>
  </div>
</template>

<script>
import DataTable from '@/components/organisms/DataTable'
import DataSearchForm from '@/components/organisms/DataSearchForm'
import DataForm from '@/components/organisms/DataForm'
import BaseDialog from '@/components/molecules/BaseDialog.vue'
import Card from '@/components/atoms/Card'
import config from './config'
import DataTree from '@/components/organisms/DataTree'
import { service } from './service'
import _ from 'lodash'
const AuthorizeLayout = ({ props: { left, right }, scopedSlots }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-evenly'
    }}
  >
    <div style='display: flex;align-items: baseline;'>
      <span>{left}</span>
      {scopedSlots.left && scopedSlots.left()}
    </div>
    <ElDivider direction='vertical' />
    <div style='display: flex;align-items: baseline;'>
      <span>{right}</span>
      {scopedSlots.right && scopedSlots.right()}
    </div>
  </div>
)
export default {
  inject: ['layout'],
  components: {
    Card,
    DataTable,
    DataSearchForm,
    DataForm,
    AuthorizeLayout,
    BaseDialog,
    DataTree
  },
  data() {
    return {
      dialog: {
        mode: '',
        title: ''
      },
      authorize: {
        rbac_node_list: [],
        member_node_list: []
      },
      config: config,
      table: {
        selected: {},
        data: [],
        column: config.table
      }
    }
  },
  computed: {
    type() {
      return this.layout.activeName
    },
    searcher() {
      return this.$refs.dataSearchForm.model
    },
    r_id() {
      return this.table.selected.r_id
    }
  },
  created() {
    console.log(this)
  },
  thenable: {
    authorizeData() {
      return {
        runner: service.getrbacrole.bind(service),
        variables: () => {
          return {
            type: this.type,
            r_id: this.r_id
          }
        },
        callback: (res) => {
          this.authorize = res
          this.$refs.authorizeDialog.open()
        },
        immediate: false
      }
    },
    tableData() {
      return {
        target: 'table.data',
        runner: service.find.bind(service),
        variables: function() {
          return {
            type: this.type,
            node_id: this.node_id
          }
        },
        callback: (res) => res.list,
        immediate: true
      }
    }
  },
  methods: {
    handleAuthorizeSubmit() {
      service
        .setrbacrole({
          type: this.type,
          r_id: this.r_id,
          rbac_node_arr: [
            ...this.$refs.rbacNodeList.getCheckedKeys(),
            ...this.$refs.rbacNodeList.getHalfCheckedKeys()
          ].join(','),
          member_node_arr: [
            ...this.$refs.memberNodeList.getCheckedKeys(),
            this.$refs.memberNodeList.getHalfCheckedKeys()
          ].join(','),
          admin_role_info: ''
        })
        .then((res) => {
          this.$message.success('设置成功')
          this.authorizeData.refresh()
        })
    },
    handleAuthorize(row) {
      this.table.selected = row
      this.authorizeData.refresh()
    },
    handleCreate() {
      this.table.selected = {}
      this.dialog.title = '新建角色'
      this.dialog.mode = 'insert'
      this.$refs.formDialog.open()
      this.$refs.dataForm && this.$refs.dataForm.resetFields()
    },
    handleUpdate(row) {
      this.table.selected = {}
      this.dialog.mode = 'update'
      this.dialog.title = '编辑角色'
      service
        .findOne({
          ...row,
          type: this.type
        })
        .then(({ data }) => {
          this.table.selected = data
          this.$refs.formDialog.open()
          this.$refs.dataForm.resetFields()
        })
    },
    handleSubmit() {
      const form = _.cloneDeep(this.$refs.dataForm.model)
      form.node_id = 12
      if (form.admin_arr) {
        form.admin_arr = form.admin_arr.join(',')
      }
      switch (this.dialog.mode) {
        case 'update':
          service
            .update({
              ...form,
              type: this.type
            })
            .then(() => {
              this.$message.success('编辑成功')
              this.table.selected = {}
              this.$refs.formDialog.close()
              this.tableData.refresh()
            })
          break
        case 'insert':
          service
            .insert({
              ...form,
              type: this.type
            })
            .then(() => {
              this.$message.success('新建成功')
              this.table.selected = {}
              this.$refs.formDialog.close()
              this.tableData.refresh()
            })
          break
      }
      // roleService.insert()
    },
    handleDelete(model) {
      this.$confirm('删除内容不可回复，确认是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          service
            .delin({
              type: this.type,
              ...model
            })
            .then((res) => {
              this.$message('删除成功')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .color-header {
    th {
        padding: 0 0;
        background-color: rgba(229, 229, 229, 1);

        .cell {
            color: #333;
        }
    }

    td {
        border: 1px solid rgba(198, 198, 198, 1);
    }
    // border: 1px solid rgba(229, 229, 229, 1);
}
</style>
