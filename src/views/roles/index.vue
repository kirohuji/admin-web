<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm :forms="config.search" label-position="right" style="justify-content: space-between;">
        <template v-slot:right>
          <el-button>新建角色</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable v-bind="table" style="padding: 0">
        <template v-slot:operation>
          <div>
            <el-link type="primary" @click="$refs.baseDialog.open()">授权</el-link>
            <el-link type="primary">编辑</el-link>
            <el-link type="primary">删除</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog ref="baseDialog" title="新增用户">
      <DataForm :forms="config.form" label-position="right" />
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
        data: [
          {
            name: '王真',
            sex: '男',
            age: 43,
            card: '330324199708025997',
            type: '脱贫',
            country: '普格县',
            towns: '花山镇',
            address: '补觉村015号',
            source: '系统预警',
            content: '年度医疗自费支出4540',
            chance: '高',
            date: '2021.01.21 10:211',
            audit: '待审核',
            audit_date: '-'
          }
        ],
        column: [
          {
            prop: 'name',
            label: '角色名称',
            width: '300'
          },
          {
            prop: 'description',
            label: '角色描述'
          },
          {
            fixed: 'right',
            prop: 'operation',
            label: '操作',
            width: '150',
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
