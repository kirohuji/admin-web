<template>
  <div v-loading="formDataFetch.loading" style="padding-bottom: 41px">
    <DataForm ref="dataForm" :forms="config.form" label-position="right" :data="formData" />
    <div style="display: flex;justify-content: center;">
      <el-button>取消</el-button>
      <el-button @click="save(0)">存为草稿</el-button>
      <el-button type="primary" @click="save(1)">保存</el-button>
    </div>
  </div>
</template>

<script>
import DataForm from '@/components/organisms/DataForm'
import config from './config'
import { service } from './service'
export default {
  inject: ['layout'],
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
  computed: {
    searcher() {
      return {
        ...this.$refs.dataForm.model,
        tag: this.$refs.dataForm.model.tag.join(','),
        tag_count: 1
      }
    },
    type() {
      return this.layout.activeName
    }
  },
  created() {
    this.currentId = this.$route.params && this.$route.params.id
    if (Number(this.currentId) !== 0) {
      this.formDataFetch.refresh()
    }
  },
  methods: {
    save(status) {
      this.$refs.dataForm.model.content = window.tinymce.activeEditor.getContent()
      service
        .insert({
          ...this.searcher,
          types: this.type,
          status
        })
        .then((res) => {
          if (status === 0) {
            this.$message.success('存为草稿成功')
          } else if (status === 1) {
            this.$message.success('上架成功')
          }
        })
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
