import { deleteChildren } from '@/utils'
import { organizationService, dicmanageService } from './service'
export default {
  search: {
    col: 0,
    fields: [
      {
        label: '角色搜索',
        prop: 'title',
        component: 'search',
        placeholder: '根据标题名称、编号搜索',
        size: 'small'
      },
      {
        label: '所属机构',
        prop: 'node_id',
        component: 'cascader',
        size: 'small',
        isReal: true,
        async: true,
        default: (context) => context.length && context[0].node_id,
        props: {
          value: 'node_id',
          label: 'name',
          checkStrictly: true
        },
        options: function() {
          return {
            runner: organizationService.gettabtypedata.bind(organizationService),
            params: {
              o_id: localStorage.getItem('selectedTab') - 1
            },
            default: [],
            callback: (data) => deleteChildren(data.list)
          }
        }
      }
    ]
  },
  form: {
    col: 1,
    fields: [
      {
        label: '所属单位',
        prop: 'node_id',
        component: 'cascader',
        placeholder: '卫健局',
        size: 'small',
        disabled: true,
        required: true,
        async: true,
        props: {
          value: 'node_id',
          label: 'name',
          checkStrictly: true
        },
        options: function() {
          return {
            runner: organizationService.gettabtypedata.bind(organizationService),
            params: {
              o_id: localStorage.getItem('selectedTab')
            },
            default: [],
            callback: (data) => deleteChildren(data.list)
          }
        }
      },
      {
        label: '角色名称',
        prop: 'name',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small',
        required: true
      },
      {
        label: '用户成员',
        prop: 'admin_arr',
        component: 'import',
        props: {
          value: 'user_id',
          label: 'name'
        },
        multiple: true,
        size: 'small'
      },
      {
        label: '发布账号',
        prop: 'pub_id',
        component: 'select',
        placeholder: '卫健局',
        size: 'small',
        'allow-create': true,
        async: true,
        options: function() {
          return {
            runner: dicmanageService.gettabtypedata.bind(dicmanageService),
            params: {
              c_id: 5
            },
            default: [],
            callback: (data) =>
              deleteChildren(data.list).map((item) => {
                return {
                  label: item.name,
                  value: item.node_id
                }
              })
          }
        }
      },
      {
        label: '角色描述',
        prop: 'describe',
        component: 'input',
        placeholder: '请输入内容',
        style: 'width: 400px',
        size: 'small'
      }
    ]
  },
  table: [
    {
      prop: 'name',
      label: '角色名称',
      width: '300'
    },
    {
      prop: 'describe',
      label: '角色描述'
    },
    {
      fixed: 'right',
      prop: 'operation',
      label: '操作',
      width: '150',
      scopedSlots: true
    }
  ]
}
