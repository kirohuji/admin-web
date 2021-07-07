<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm
        ref="dataSearchForm"
        :forms="config.search"
        label-position="right"
        style="justify-content: space-between;"
        mode="search"
        @search="() => tableData.refresh.call(tableData, searcher)"
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
            <el-link
              :type="row.status !== 2 ? 'primary' : ''"
              :disabled="row.status === 2"
              @click="handleSetPull(row)"
            >下架</el-link>
            <el-link type="primary" @click="handleCopy(row)">复制</el-link>
            <el-link type="primary" @click="handleDelete(row)">删除</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
  </div>
</template>

<script>
import DataTable from '@/components/organisms/DataTable'
import DataSearchForm from '@/components/organisms/DataSearchForm'
import Card from '@/components/atoms/Card'
import config from './config'
import { service } from './service'
export default {
  inject: ['layout'],
  components: {
    Card,
    DataTable,
    DataSearchForm
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
      return {
        ...this.$refs.dataSearchForm.model,
        node_id: this.$refs.dataSearchForm.model.type.join(''),
        s_date: this.$refs.dataSearchForm.model.date && this.$refs.dataSearchForm.model.date[0],
        e_date: this.$refs.dataSearchForm.model.date && this.$refs.dataSearchForm.model.date[1]
      }
    }
  },
  thenable: {
    tableData() {
      return {
        target: 'table.data',
        runner: service.find.bind(service),
        variables: {
          types: this.types
        },
        callback: (res) => {
          return res.list
        },
        immediate: true
      }
    }
  },
  methods: {
    handleSetPull(row) {
      service.setpull(row).then((res) => {
        this.$message.success('下架成功')
      })
    },
    handleCopy(row) {
      this.$confirm('确定复制当前资讯内容并存为新的草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          service
            .findOne({
              i_id: row.i_id
            })
            .then(async({ data }) => {
              delete data.i_id
              data.title = data.title + '(拷贝)'
              data.status = 0
              data.types = this.types
              data.tag = data.object_arr.map((item) => item.key).join(',')
              service
                .getmembertagcount({
                  name: data.tag
                })
                .then((res) => {
                  data.tag_count = res.data.count
                  service.insert(data).then((res) => {
                    this.$message.success('复制成功')
                    this.tableData.refresh()
                  })
                })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消复制'
          })
        })
    },
    handleDelete(row) {
      this.$confirm('删除内容不可回复，确认是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          service.remove(row).then((res) => {
            this.$message.success('删除成功')
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
