<template>
  <Card class="main-layout">
    <Card class="left-layout" style="flex-grow: 1;">
      机构字典
    </Card>
    <Card class="right-layout" style="flex-grow: 8;">
      机构字典
    </Card>
  </Card>
</template>

<script>
import Card from '@/components/atoms/Card'
export default {
  components: {
    Card
  }
}
</script>
<style scoped lang="scss">
.main-layout {
    padding: 1px 0px 0px;
    display: flex;
}
.left-layout,
.right-layout {
    border: 1px solid #ebedf0;
    margin: 14px 12px;
}
</style>
