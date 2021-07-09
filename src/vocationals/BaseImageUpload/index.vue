<template>
  <div>
    <el-upload
      ref="uploader"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="handleUpload"
      :file-list="fileList"
      :class="{ has_file: hasFile }"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in" />
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download" />
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },
  computed: {
    hasFile() {
      return this.fileList.length >= 1
    }
  },
  methods: {
    handleRemove(file) {
      this.$refs.uploader.clearFiles()
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      console.log(file)
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    handleUpload(file) {
      this.fileList.push(file)
      console.log('handleUpload', file)
    }
  }
}
</script>

<style lang="scss">
.has_file {
    .el-upload.el-upload--picture-card {
      display: none;
    }
}
</style>
