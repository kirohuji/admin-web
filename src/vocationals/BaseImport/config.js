import { deleteChildren } from '@/utils'
import { organizationService } from './service'
const orgOptions = function() {
  return {
    runner: organizationService.gettabtypedata.bind(organizationService),
    params: {
      o_id: localStorage.getItem('selectedTab') - 1
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
        label: '用户搜索',
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
        options: orgOptions
      }
    ]
  },
  table: [
    {
      type: 'selection',
      width: '55'
    },
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
    }
  ]
}
