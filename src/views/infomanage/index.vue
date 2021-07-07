<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm
        ref="dataSearchForm"
        :forms="config.search"
        label-position="right"
        style="justify-content: space-between;"
        mode="search"
        @search="() => tableData.refresh.call(tableData, $refs.dataSearchForm.model)"
      >
        <template v-slot:right>
          <el-button type="primary" @click="$router.push(`/information/infomanage/edit/${0}`)">新建资讯</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable v-bind="table" style="padding: 0" @change="tableData.refresh.call(tableData)">
        <template v-slot:operation="{ row }">
          <div style="display: flex;justify-content: space-between;">
            <router-link :to="`/information/infomanage/edit/${row.id}`">
              <el-link type="primary">编辑</el-link>
            </router-link>
            <el-link type="primary">下架</el-link>
            <el-link type="primary">复制</el-link>
            <el-link type="primary">删除</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog ref="formDialog" title="新建宣教">
      <DataForm :forms="config.form" label-position="right" :data="table.selected" />
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
      config: config,
      node_id: 1,
      table: {
        selected: {},
        data: [],
        column: config.table
      }
    }
  },
  computed: {
    types() {
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
          types: this.types,
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
    handleSearch(model) {
      console.log(model)
    },
    onSubmit() {
      console.log('submit!')
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
