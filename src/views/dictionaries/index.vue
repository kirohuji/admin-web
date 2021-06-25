<template>
  <Card class="main-layout">
    <Card class="left" style="flex-grow: 1;">
      <div class="card-header">机构字典</div>
      <div class="card-body">
        <div class="card-item">政府</div>
        <div class="card-item"> 医疗</div>
      </div>
    </Card>
    <div style="flex-grow: 8;">
      <Card class="right" style="height: 100%;">
        <DataTree />
      </Card>
      <div style="display: flex;justify-content: center;">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/atoms/Card'
import DataTree from '@/components/organisms/DataTree'
export default {
  components: {
    Card,
    DataTree
  }
}
</script>
<style scoped lang="scss">
.main-layout {
    padding: 1px 0px 0px;
    display: flex;
}
.left,
.right {
    border: 1px solid #ebedf0;
    margin: 14px 12px;
}
.card-header {
    text-align: center;
    padding: 19px;
    color: #1684dd;
    font-size: 16px;
}
.card-item {
    padding: 15px 22px;
    color: #333333;
    font-size: 18px;
}
</style>
