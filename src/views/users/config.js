import { deleteChildren } from '@/utils'
import { organizationService, roleService } from './service'
const orgOptions = function() {
  return {
    runner: organizationService.gettabtypedata.bind(organizationService),
    params: {
      o_id: localStorage.getItem('selectedTab')
    },
    default: [],
    callback: (data) => deleteChildren(data.list)
  }
}
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
        cached: 'aduit',
        props: {
          value: 'node_id',
          label: 'name',
          checkStrictly: true
        },
        options: orgOptions
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
        options: orgOptions
      },
      {
        label: '姓名',
        prop: 'name',
        component: 'input',
        type: 'input',
        placeholder: '请输入内容',
        size: 'small',
        required: true
      },
      {
        label: '手机号',
        prop: 'phone',
        component: 'input',
        type: 'input',
        placeholder: '请输入内容',
        size: 'small'
      },
      // {
      //   label: '钉钉账号',
      //   prop: 'dingding',
      //   component: 'input',
      //   type: 'input',
      //   placeholder: '请输入内容',
      //   size: 'small',
      //   required: true
      // },
      {
        label: '所属角色',
        prop: 'r_id',
        component: 'radio-border-group',
        size: 'small',
        style: 'width: 598px',
        async: true,
        props: {
          value: 'node_id',
          label: 'name',
          checkStrictly: true
        },
        options: function() {
          console.log('this', this)
          return {
            runner: roleService.find.bind(roleService),
            params: {
              type: localStorage.getItem('selectedTab'),
              node_id: 0
            },
            default: [],
            callback: (data) => {
              return data.list.map((item) => {
                return {
                  label: item.name,
                  value: item.r_id
                }
              })
            }
          }
        }
      },
      {
        label: '备注',
        prop: 'remark',
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
      label: '姓名',
      width: '120'
    },
    {
      prop: 'node_name',
      label: '所属机构',
      width: '250'
    },
    {
      prop: 'r_name',
      label: '所属角色',
      width: '100'
    },
    {
      prop: 'remark',
      label: '备注'
    },
    {
      prop: 'status',
      label: '状态',
      width: '80',
      formatter: (row) => {
        switch (row.status) {
          case 'allow':
            return '在用'
          case 'ban':
            return '禁用'
        }
      }
    },
    {
      prop: 'operation',
      label: '操作',
      width: '100',
      scopedSlots: true
    }
  ]
}
