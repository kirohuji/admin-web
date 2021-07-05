<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm :forms="config.search" label-position="right" style="justify-content: space-between;">
        <template v-slot:right>
          <el-button @click="$refs.formDialog.open()">新建宣教</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable v-bind="table" style="padding: 0">
        <template v-slot:operation="{ row }">
          <div style="display: flex;justify-content: space-between;">
            <el-link
              type="primary"
              @click="
                () => {
                  table.selected = row
                  $refs.formDialog.open()
                }
              "
            >编辑</el-link>
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
export default {
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
      table: {
        selected: {},
        data: [
          {
            name: '王真',
            org: '测试',
            roles: '测试',
            card: '测试',
            status: '测试'
          }
        ],
        column: [
          {
            prop: 'name',
            label: '编号',
            width: '100'
          },
          {
            prop: 'org',
            label: '分类',
            width: '200'
          },
          {
            prop: 'roles',
            label: '标题名称'
          },
          {
            prop: 'remark',
            label: '状态',
            width: '100'
          },
          {
            prop: 'status',
            label: '目标对象',
            width: '120'
          },
          {
            prop: 'status',
            label: '已读人数/目标人数',
            width: '200'
          },
          {
            prop: 'status',
            label: '阅读率',
            width: '120'
          },
          {
            prop: 'status',
            label: '更新时间',
            width: '120'
          },
          {
            prop: 'status',
            label: '操作人',
            width: '120'
          },
          {
            prop: 'operation',
            label: '操作',
            width: '200',
            scopedSlots: true
          }
        ]
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
