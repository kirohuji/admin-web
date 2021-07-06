<template>
  <el-input v-bind="$attrs" v-on="$listeners">
    <el-button slot="append" type="primary" @click="() => $emit('search')">搜索</el-button>
  </el-input>
</template>

<script>
export default {}
</script>

<style></style>
