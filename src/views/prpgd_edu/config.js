export default {
  search: {
    col: 0,
    fields: [
      {
        label: '资讯分类',
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
        label: '状态',
        prop: 'aduit',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small'
      },
      {
        label: '日期',
        prop: 'aduit',
        component: 'date-picker',
        type: 'daterange',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small',
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期'
      }
    ]
  },
  form: {
    col: 1,
    fields: [
      {
        label: '发布账号',
        prop: 'title',
        component: 'label',
        required: true
      },
      {
        label: '分类',
        prop: 'date',
        component: 'radio-group',
        layout: 'center',
        options: [
          {
            label: '饮食宣教'
          },
          {
            label: '护理常识'
          },
          {
            label: '康复宣教'
          },
          {
            label: '安全宣教'
          },
          {
            label: '疾病宣教'
          },
          {
            label: '药物知识'
          }
        ],
        required: true
      },
      {
        label: '标题',
        prop: 'phone',
        component: 'input',
        placeholder: '请输入内容数字限制30字内',
        size: 'small',
        required: true
      },
      {
        label: '封面',
        prop: 'dingding',
        component: 'image',
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
