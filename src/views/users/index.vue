<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm
        ref="dataSearchForm"
        mode="search"
        :forms="config.search"
        label-position="right"
        style="justify-content: space-between;"
        @search="() => tableData.refresh.call(tableData, searcher)"
      >
        <template v-slot:right>
          <el-button @click="handleCreate">新建用户</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable
        ref="table"
        v-loading="tableData.loading"
        v-bind="table"
        style="padding: 0"
        @change="tableData.refresh.call(tableData)"
      >
        <template v-slot:operation="{ row }">
          <div style="display: flex;justify-content: space-around">
            <el-link type="primary" @click="handleUpdate(row)">编辑</el-link>
            <el-link type="primary" @click="handleTrigger(row)">{{ row.status === 'ban' ? '开启' : '禁用' }}</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog ref="formDialog" v-bind="dialog">
      <DataForm ref="dataForm" :forms="config.form" label-position="right" :context="this" :data="table.selected" />
      <template v-slot:footer>
        <div class="footer">
          <el-button @click="$refs.formDialog.close()">取消</el-button>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
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
import { service } from './service'
export default {
  inject: ['layout'],
  components: {
    Card,
    DataTable,
    DataSearchForm,
    DataForm,
    BaseDialog
  },
  data() {
    return {
      dialog: {
        mode: '',
        title: ''
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
      return {
        ...this.$refs.dataSearchForm.model,
        node_id: this.$refs.dataSearchForm.model.node_id[0]
      }
    }
  },
  thenable: {
    tableData() {
      return {
        target: 'table.data',
        runner: service.find.bind(service),
        variables: function() {
          return {
            type: this.type
          }
        },
        callback: (res) => res.list,
        immediate: false
      }
    }
  },
  methods: {
    handleCreate() {
      this.table.selected = {
        node_id: this.$refs.dataSearchForm.model.node_id[0]
      }
      this.dialog.title = '新建用户'
      this.dialog.mode = 'insert'
      this.$refs.formDialog.open()
      this.$refs.dataForm && this.$refs.dataForm.resetFields()
    },
    handleUpdate(row) {
      this.table.selected = {}
      this.dialog.mode = 'update'
      this.dialog.title = '编辑用户'
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
      const form = this.$refs.dataForm.model
      switch (this.dialog.mode) {
        case 'update':
          form.node_id = 12
          service
            .update({
              ...form,
              type: this.type
            })
            .then(() => {
              this.$message.success('编辑成功')
              this.$refs.formDialog.close()
              this.tableData.refresh()
            })
          break
        case 'insert':
          form.node_id = 12
          service
            .insert({
              ...form,
              type: this.type
            })
            .then(() => {
              this.$message.success('新建成功')
              this.$refs.formDialog.close()
              this.tableData.refresh()
            })
          break
      }
    },
    handleTrigger(row) {
      this.table.selected = row
      service
        .delin({
          type: row.status === 'ban' ? 1 : 2,
          user_id: row.user_id,
          ...this.searcher
        })
        .then(() => {
          this.$message.success('操作成功')
          this.tableData.refresh()
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
