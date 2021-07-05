<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-tree :data="list" v-bind="$attrs" node-key="node_id" :expand-on-click-node="false">
        <span slot-scope="{ node }" class="custom-tree-node">
          <span>{{ node.data.name }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss">
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    padding-right: 8px;
}
::v-deep .el-tree {
    .is-checked.el-tree-node {
        color: red;
    }
}
</style>
