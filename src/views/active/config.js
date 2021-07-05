export default {
  search: {
    col: 0,
    fields: [
      {
        label: '活动搜索',
        prop: 'title',
        component: 'search',
        placeholder: '根据标题名称、编号搜索',
        size: 'small'
      },
      {
        label: '活动分类',
        prop: 'type',
        component: 'select',
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
        size: 'small'
      },
      {
        label: '状态',
        prop: 'aduit',
        component: 'select',
        options: [
          {
            label: '上线中'
          },
          {
            label: '草稿'
          },
          {
            label: '已下架'
          }
        ]
      },
      {
        label: '发布主体',
        prop: 'aduit',
        component: 'select',
        options: [
          {
            label: '上线中'
          },
          {
            label: '草稿'
          },
          {
            label: '已下架'
          }
        ]
      },
      {
        label: '日期',
        prop: 'aduit',
        component: 'date-picker',
        type: 'date',
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
        label: '编辑',
        prop: 'roles',
        component: 'edit'
      },
      {
        label: '对象',
        prop: 'remark',
        component: 'tag-select',
        size: 'small'
      }
    ]
  }
}
