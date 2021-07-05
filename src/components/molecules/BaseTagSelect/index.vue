<template>
  <div>
    <div>
      <el-select v-bind="$attrs" multiple collapse-tags placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span>预计1326人</span>
    </div>
    <div>
      <span>选择标签</span>
      <el-tag v-for="(tag, index) in options" :key="index" type="info">{{ tag.label }}</el-tag>
      <el-link type="primary" @click="$refs.formDialog.open()">更多标签</el-link>
    </div>
    <!-- <el-button type="primary" style="margin-left: 8px" @click="$refs.formDialog.open()">导入</el-button> -->
    <BaseDialog ref="formDialog" title="新增用户" append-to-body>
      导入的内容
    </BaseDialog>
  </div>
</template>

<script>
import BaseDialog from '../BaseDialog.vue'
// class Label {
//   constructor(value, label) {
//     (this.value = value), (this.label = label)
//   }
// }
export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  }
}
</script>

<style></style>
