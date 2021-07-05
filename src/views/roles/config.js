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
        component: 'select',
        size: 'small'
      }
    ]
  },
  form: {
    col: 1,
    fields: [
      {
        label: '所属机构',
        prop: 'date',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small',
        required: true
      },
      {
        label: '角色名称',
        prop: 'date',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small',
        required: true
      },
      {
        label: '用户成员',
        prop: 'roles',
        component: 'import',
        multiple: true,
        size: 'small'
      },
      {
        label: '发布账号',
        prop: 'date',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small'
      },
      {
        label: '角色描述',
        prop: 'date',
        component: 'input',
        type: 'textarea',
        placeholder: '请输入内容',
        style: 'width: 400px',
        size: 'small'
      }
    ]
  }
}
