<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-tree :data="data" show-checkbox node-key="name" default-expand-all :expand-on-click-node="false">
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ data.title }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              新增
            </el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">
              编辑
            </el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1000

export default {
  data() {
    const data = [
      {
        title: '运营管理后台',
        name: 'c_admin',
        children: [
          {
            title: '资讯中心',
            name: 'information',
            children: [
              {
                title: '资讯管理',
                name: 'infomanage',
                children: [
                  {
                    title: '政府',
                    name: 'government',
                    children: []
                  },
                  {
                    title: '医疗',
                    name: 'medical',
                    children: []
                  },
                  {
                    title: '居民',
                    name: 'resident',
                    children: []
                  },
                  {
                    title: '系统',
                    name: 'system',
                    children: []
                  }
                ]
              },
              {
                title: '宣教管理',
                name: 'prpgd_edu',
                children: [
                  {
                    title: '政府',
                    name: 'government',
                    children: []
                  },
                  {
                    title: '医疗',
                    name: 'medical',
                    children: []
                  },
                  {
                    title: '居民',
                    name: 'resident',
                    children: []
                  },
                  {
                    title: '系统',
                    name: 'system',
                    children: []
                  }
                ]
              },
              {
                title: '活动中心',
                name: 'active',
                children: [
                  {
                    title: '政府',
                    name: 'government',
                    children: []
                  },
                  {
                    title: '医疗',
                    name: 'medical',
                    children: []
                  },
                  {
                    title: '居民',
                    name: 'resident',
                    children: []
                  },
                  {
                    title: '系统',
                    name: 'system',
                    children: []
                  }
                ]
              },
              {
                title: '消息中心',
                name: 'news',
                children: []
              }
            ]
          },
          {
            title: '用户中心',
            name: 'user',
            children: [
              {
                title: '用户管理',
                name: 'usermanage',
                children: [
                  {
                    title: '政府',
                    name: 'government',
                    children: []
                  },
                  {
                    title: '医疗',
                    name: 'medical',
                    children: []
                  },
                  {
                    title: '居民',
                    name: 'resident',
                    children: []
                  },
                  {
                    title: '系统',
                    name: 'system',
                    children: []
                  }
                ]
              },
              {
                title: '角色管理',
                name: 'rolemanage',
                children: [
                  {
                    title: '政府',
                    name: 'government',
                    children: []
                  },
                  {
                    title: '医疗',
                    name: 'medical',
                    children: []
                  },
                  {
                    title: '居民',
                    name: 'resident',
                    children: []
                  },
                  {
                    title: '系统',
                    name: 'system',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            title: '字典管理',
            name: 'dictionaries',
            children: [
              {
                title: '字典管理',
                name: 'dicmanage',
                children: []
              }
            ]
          },
          {
            title: '机构维护',
            name: 'organization',
            children: [
              {
                title: '机构维护',
                name: 'organmanage',
                children: []
              }
            ]
          }
        ]
      }
    ]
    return {
      data: JSON.parse(JSON.stringify(data))
    }
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    padding-right: 8px;
}
</style>
