<template>
  <div>
    <!-- 输入框-->
    <template v-if="$attrs.component === 'input'">
      <el-input v-model="model[$attrs.prop]" v-bind="$attrs" />
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
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  name: 'BaseEnter',
  // eslint-disable-next-line vue/require-prop-types
  props: ['model'],
  data() {
    return {
      regionData: regionData
    }
  }
}
</script>
