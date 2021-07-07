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
          <el-button
            @click="
              () => {
                table.selected = {
                  org: $refs.dataSearchForm.model.aduit,
                }
                $refs.formDialog.open()
              }
            "
          >新建用户</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable ref="table" v-bind="table" style="padding: 0" @change="tableData.refresh.call(tableData)">
        <template v-slot:operation="{ row }">
          <div style="display: flex;justify-content: space-around">
            <el-link
              type="primary"
              @click="
                () => {

                  table.selected = row
                  $refs.formDialog.open()
                }
              "
            >编辑</el-link>
            <el-link
              type="primary"
              @click="
                () => {
                  table.selected = row
                  handleTrigger(row)
                }
              "
            >禁用</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog ref="formDialog" title="新增用户">
      <DataForm ref="dataForm" :forms="config.form" label-position="right" :context="this" :data="table.selected" />
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
        mode: 'edit',
        title: '编辑用户'
      },
      config: config,
      node_id: 0,
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
    handleSubmit() {
      service
        .insert({
          ...this.$refs.dataForm.model,
          type: this.type,
          node_id: this.node_id
        })
        .then(() => {
          this.$message.success('插入成功')
          this.$refs.formDialog.close()
        })
      // roleService.insert()
    },
    handleTrigger(row) {
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
