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
import { service } from './service'
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
      this.$emit('input', '')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      console.log(file)
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    urlToBase64(url) {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = function() {
          const canvas = document.createElement('canvas')
          canvas.width = this.naturalWidth
          canvas.height = this.naturalHeight
          // 将图片插入画布并开始绘制
          canvas.getContext('2d').drawImage(image, 0, 0)
          // result
          const result = canvas.toDataURL('image/png')
          resolve(result)
        }
        // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        image.setAttribute('crossOrigin', 'Anonymous')
        image.src = url
        // 图片加载失败的错误处理
        image.onerror = () => {
          reject(new Error('转换失败'))
        }
      })
    },
    handleUpload(file, fileList) {
      return this.urlToBase64(file.url).then((res) => {
        service
          .updatefile({
            file: res.split(',')[1]
          })
          .then((res) => {
            console.log('冲鸭')
            this.fileList.push(file)
            this.$emit('input', res.data.url)
            return true
          })
          .catch(() => {
            this.handleRemove()
            return false
          })
      })
    },
    beforeUpload(res, file) {
      console.log('发送')
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
