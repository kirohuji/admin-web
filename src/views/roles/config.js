import { deleteChildren } from '@/utils'
import { organizationService } from './service'
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
        prop: 'aduit',
        component: 'cascader',
        size: 'small',
        isReal: true,
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
        multiple: true,
        size: 'small'
      },
      {
        label: '发布账号',
        prop: 'pub_info',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small'
      },
      {
        label: '角色描述',
        prop: 'describe',
        component: 'input',
        type: 'textarea',
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
      prop: 'description',
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
