<template>
  <Card class="main-layout">
    <MenusCard class="left" style="flex-grow: 1;" v-bind="dicmanage.menus" :is-edit="true" @click="handleMenu" />
    <div style="flex-grow: 8;">
      <Card class="right" style="height: 700px;overflow-y:scroll;padding: 25px 20px">
        <DataTree :list="dicmanage.tree.list" />
      </Card>
      <OperationButtons />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/atoms/Card'
import DataTree from '@/components/organisms/DataTree'
import MenusCard from '@/vocationals/MenusCard'
// import { NodeMenu } from '@/modules/organmanage'
import test from './test'

const OperationButtons = () => (
  <div style='display: flex;justify-content: center;'>
    <el-button>取消</el-button>
    <el-button type='primary'>保存</el-button>
  </div>
)
/**
 * 新建字典分类
 */
const CreateCategoryButton = {
  inject: ['dicmanage'],
  render() {
    return (
      <el-button type='primary' icon='el-icon-plus'>
                新建字典分类
      </el-button>
    )
  }
}
export default {
  provide() {
    return {
      dicmanage: this
    }
  },
  components: {
    Card,
    DataTree,
    MenusCard,
    OperationButtons
  },
  data() {
    return {
      dicmanage: {
        menus: {
          title: CreateCategoryButton,
          list: test.menus.list
        },
        tree: test.tree
      }
    }
  },
  methods: {
    handleMenu(menu) {
      console.log(menu)
    }
  }
}
</script>
<style scoped lang="scss">
.menu-title {
    color: #008dff;
    font-size: 13px;
    text-align: center;
    margin: 19px;
}
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
::v-deep is-checked {
    color: red;
}
</style>
