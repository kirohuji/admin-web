<template>
  <div style="display: flex;">
    <!-- 输入框-->
    <template v-if="$attrs.component === 'input'">
      <el-input v-model="model[$attrs.prop]" v-bind="$attrs" />
    </template>
    <!-- 上传器 -->
    <template v-if="$attrs.component === 'image'">
      <BaseImageUpload />
    </template>
    <!-- 上传器 -->
    <template v-if="$attrs.component === 'tag-select'">
      <BaseTagSelect v-model="model[$attrs.prop]" />
    </template>
    <template v-if="$attrs.component === 'edit'">
      <BaseEditor v-model="model[$attrs.prop]" />
    </template>
    <template v-if="$attrs.component === 'cascader'">
      <el-cascader v-model="model[$attrs.prop]" v-bind="$attrs" v-on="$listeners" />
    </template>
    <!-- 导入器 -->
    <template v-else-if="$attrs.component === 'import'">
      <BaseImport v-model="model[$attrs.prop]" v-bind="$attrs" />
    </template>
    <!-- 搜索器 -->
    <template v-else-if="$attrs.component === 'search'">
      <BaseSearch v-model="model[$attrs.prop]" v-bind="$attrs" v-on="$listeners" />
    </template>
    <!-- 文本 -->
    <template v-else-if="$attrs.component === 'label'">
      <span v-bind="$attrs">{{ model[$attrs.prop] }}</span>
    </template>
    <!-- 日期选择器-->
    <template v-else-if="$attrs.component === 'date-picker'">
      <el-date-picker v-model="model[$attrs.prop]" v-bind="$attrs" />
    </template>
    <!-- 地址选择器-->
    <template v-else-if="$attrs.component === 'address'">
      <el-cascader v-model="model[$attrs.prop]" v-bind="$attrs" :options="regionData" />
    </template>
    <!-- 一般选择器-->
    <template v-else-if="$attrs.component === 'select'">
      <el-select v-model="model[$attrs.prop]" v-bind="$attrs">
        <el-option v-for="item in $attrs.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </template>
    <!-- 有边框的单选器-->
    <template v-else-if="$attrs.component === 'radio-border-group'">
      <el-radio-group v-model="model[$attrs.prop]" v-bind="$attrs" class="radio-border-group">
        <el-radio v-for="item in $attrs.options" :key="item.value" :label="item.value || item.label">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <!-- 单选器-->
    <template v-else-if="$attrs.component === 'radio-group'">
      <el-radio-group v-model="model[$attrs.prop]" v-bind="$attrs">
        <el-radio v-for="item in $attrs.options" :key="item.value" :label="item.value || item.label">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import BaseImport from '../BaseImport'
import BaseTagSelect from '@/vocationals/BaseTagSelect'
import BaseSearch from '../BaseSearch'
import BaseImageUpload from '../BaseImageUpload'
import BaseEditor from '../BaseEditor'
export default {
  name: 'BaseEnter',
  components: {
    BaseImport,
    BaseSearch,
    BaseEditor,
    BaseTagSelect,
    BaseImageUpload
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['model'],
  data() {
    return {
      regionData: regionData
    }
  }
}
</script>
<style lang="scss">
.radio-border-group {
    padding: 16px 0px 0 16px;
    border: 1px solid #b6c8d5;
    border-radius: 4px;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    .el-radio {
        width: 115px;
        margin-bottom: 15px;
    }
}
</style>
