<template>
  <div>
    <div>
      <el-select v-bind="$attrs" multiple placeholder="请选择" v-on="$listeners">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span class="tumori">预计1326人</span>
    </div>
    <div style="display: flex;align-items: center;">
      <span class="select_label">选择标签</span>

      <div v-for="(tag, index) in options" :key="index" class="more">
        <span v-if="index === 4" class="none">...</span>
        <el-tag type="info" size="small">{{ tag.label }}</el-tag>
      </div>

      <el-link type="primary" style="margin-left:8px" @click="$refs.formDialog.open()">更多标签</el-link>
    </div>
    <!-- <el-button type="primary" style="margin-left: 8px" @click="$refs.formDialog.open()">导入</el-button> -->
    <BaseDialog ref="formDialog" title="选择对象" append-to-body>
      导入的内容
    </BaseDialog>
  </div>
</template>

<script>
import BaseDialog from '@/components/molecules/BaseDialog.vue'
// class Label {
//   constructor(value, label) {
//     (this.value = value), (this.label = label)
//   }
// }
import { service } from './service'
export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      options: [],
      value: ''
    }
  },
  thenable: {
    more() {
      return {
        target: 'options',
        runner: service.getmembertag.bind(service),
        variables: {
          status: 1
        },
        callback: (res) => {
          return res.list.map((item) => {
            return {
              label: item.name,
              value: item.key
            }
          })
        },
        immediate: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select_label {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #333333;
}
.more {
    margin: 0 8px;
}
.tumori {
    margin-left: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #606266;
}
.none {
    margin-right: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #606266;
}
</style>
