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
        label: '所属单位',
        prop: 'org',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small',
        required: true
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
        size: 'small',
        required: true
      },
      {
        label: '钉钉账号',
        prop: 'dingding',
        component: 'input',
        type: 'input',
        placeholder: '请输入内容',
        size: 'small',
        required: true
      },
      {
        label: '所属角色',
        prop: 'roles',
        component: 'radio-border-group',
        size: 'small',
        style: 'width: 598px',
        options: [
          {
            label: '卫健信息科长'
          },
          {
            label: '疾控科科长'
          },
          {
            label: '卫健局局长'
          },
          {
            label: '基位科长'
          },
          {
            label: '卫健局局长'
          },
          {
            label: '基位科长1'
          }
        ]
      },
      {
        label: '备注',
        prop: 'remark',
        component: 'input',
        type: 'textarea',
        placeholder: '请输入内容',
        style: 'width: 400px',
        size: 'small',
        required: true
      }
    ]
  }
}
