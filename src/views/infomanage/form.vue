<template>
  <div v-loading="formDataFetch.loading" style="padding-bottom: 41px">
    <DataForm ref="dataForm" :forms="config.form" label-position="right" :data="formData" />
    <div style="display: flex;justify-content: center;">
      <el-button>取消</el-button>
      <el-button @click="save">存为草稿</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import DataForm from '@/components/organisms/DataForm'
import config from './config'
import { service } from './service'
export default {
  components: {
    DataForm
  },
  data() {
    return {
      config: config,
      currentId: null,
      formData: {}
    }
  },
  created() {
    this.currentId = this.$route.params && this.$route.params.id
    this.formDataFetch.refresh()
  },
  methods: {
    save() {
      this.$refs.dataForm.model.content = window.tinymce.activeEditor.getContent()
    }
  },
  thenable: {
    formDataFetch() {
      return {
        target: 'formData',
        runner: service.findOne.bind(service),
        variables: function() {
          return {
            i_id: this.currentId
          }
        },
        callback: (res) => res,
        immediate: false
      }
    }
  }
}
</script>

<style></style>
