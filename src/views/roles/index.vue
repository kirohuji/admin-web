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
        v-bind="table"
        style="padding: 0"
        @change="tableData.refresh.call(tableData)"
      >
        <template v-slot:operation="{ row }">
          <div style="display: flex;justify-content: space-around">
            <el-link
              type="primary"
              @click="$refs.authorizeDialog.open()"
            >授权</el-link>
            <el-link
              type="primary"
              @click="handleUpdate(row)"
            >编辑</el-link>
            <el-link
              type="primary"
              @click="handleDelete(row)"
            >删除</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog
      ref="formDialog"
      title="新增用户"
    >
      <DataForm
        ref="dataForm"
        :forms="config.form"
        label-position="right"
        :context="this"
        :data="table.selected"
      />
      <template v-slot:footer>
        <div class="footer">
          <el-button @click="$refs.formDialog.close()">取消</el-button>
          <el-button
            type="primary"
            @click="
              () => {
                handleSubmit()
              }
            "
          >保存</el-button>
        </div>
      </template>
    </BaseDialog>
    <BaseDialog
      ref="authorizeDialog"
      title="角色授权"
      width="200"
    >
      <AuthorizeLayout
        left="用户搜索"
        right="居民权限"
      >
        <template v-slot:left>
          <DataTree />
        </template>
        <template v-slot:right>
          <DataTree />
        </template>
      </AuthorizeLayout>
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
      dialog: {},
      config: config,
      node_id: 0,
      info: {},
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
  thenable: {
    tableData() {
      return {
        target: 'table.data',
        runner: service.find.bind(service),
        variables: {
          type: this.type,
          node_id: this.node_id
        },
        callback: (res) => {
          return res.list
        },
        immediate: true
      }
    }
  },
  methods: {
    handleCreate() {
      this.dialog.title = '新建角色'
      this.dialog.mode = 'insert'
      this.$refs.formDialog.open()
    },
    handleUpdate(row) {
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
        })
    },
    handleSubmit() {
      const form = this.$refs.dataForm.model
      //   debugger;
      //   form.admin_arr = form.admin_arr.split(',')

      switch (this.dialog.mode) {
        case 'update':
          service
            .update({
              ...form
            })
            .then(() => {
              this.$message.success('编辑成功')
              this.$refs.formDialog.close()
            })
          break
        case 'insert':
          form.node_id = 0
          service
            .insert({
              ...form
            })
            .then(() => {
              this.$message.success('新建成功')
              this.$refs.formDialog.close()
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
