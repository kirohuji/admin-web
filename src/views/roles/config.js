export default {
  search: {
    col: 3,
    fields: [
      {
        label: '角色搜索',
        prop: 'date',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small',
        required: true,
        rules: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' }
        ]
      },
      {
        label: '所属机构',
        prop: 'aduit',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
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
