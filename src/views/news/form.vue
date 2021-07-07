<template>
  <div style="padding-bottom: 41px">
    <DataForm :forms="config.form" label-position="right" />
    <div style="display: flex;justify-content: center;">
      <el-button>取消</el-button>
      <el-button>存为草稿</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import DataForm from '@/components/organisms/DataForm'
import config from './config'
export default {
  components: {
    DataForm
  },
  data() {
    return {
      config: config
    }
  },
  created() {
    // const id = this.$route.params && this.$route.params.id
    // this.fetchData(id)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {}
}
</script>

<style></style>
