<template>
  <div>
    <el-select v-bind="$attrs" multiple collapse-tags placeholder="请选择" v-on="$listeners">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary" style="margin-left: 8px" @click="$refs.formDialog.open()">导入</el-button>
    <BaseDialog ref="formDialog" title="用户导入" append-to-body :is-return="true">
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
            <div />
          </template>
        </DataSearchForm>
      </Card>
      <Card style="padding: 14px;padding-top: 0">
        <DataTable ref="table" v-bind="table" style="padding: 0" @change="tableData.refresh.call(tableData)" />
      </Card>
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
import BaseDialog from '@/components/molecules/BaseDialog.vue'
import DataTable from '@/components/organisms/DataTable'
import DataSearchForm from '@/components/organisms/DataSearchForm'
import Card from '@/components/atoms/Card'
import config from './config'
import { service } from './service'
import _ from 'lodash'
export default {
  components: {
    Card,
    DataTable,
    DataSearchForm,
    BaseDialog
  },
  data() {
    return {
      config: config,
      updated: true,
      table: {
        selected: {},
        data: [],
        column: config.table
      },
      options: [],
      value: ''
    }
  },
  computed: {
    type() {
      return localStorage.getItem('selectedTab')
    },
    searcher() {
      return this.$refs.dataSearchForm.model
    }
  },
  mounted() {
    this.change()
  },
  // updated() {
  //   this.change()
  // },
  thenable: {
    tableData() {
      return {
        target: 'table.data',
        runner: service.find.bind(service),
        variables: {
          type: this.type,
          node_id: 0
        },
        callback: (res) => {
          return res.list
        },
        immediate: true
      }
    }
  },
  methods: {
    change() {
      if (this.$attrs.value) {
        this.setData(
          this.$attrs.value.map((item) => {
            return {
              label: item[this.$attrs.props.label],
              value: item[this.$attrs.props.value]
            }
          })
        )
      }
    },
    setData(result) {
      this.$emit(
        'input',
        result.map((item) => item.value)
      )
      this.options = _.uniqBy(this.options.concat(result), function(o) {
        return o.value
      })
    },
    handleSubmit() {
      const result = this.$refs.table.$refs.table.selection.map((item) => {
        return {
          label: item.name,
          value: item.user_id
        }
      })
      this.setData(result)
      this.$refs.formDialog.close()
    }
  }
}
</script>

<style></style>
