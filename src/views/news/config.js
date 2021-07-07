import { deleteChildren } from '@/utils'
import { service } from './service'
export default {
  search: {
    col: 0,
    fields: [
      {
        label: '消息搜索',
        prop: 'title',
        component: 'search',
        placeholder: '根据标题名称、编号搜索',
        size: 'small'
      },
      {
        label: '消息分类',
        prop: 'type',
        component: 'select',
        placeholder: '请选择消息分类',
        async: true,
        isReal: true,
        cached: 'news_type',
        props: {
          value: 'node_id',
          label: 'name',
          checkStrictly: true
        },
        options: function() {
          return {
            runner: service.getcategorylist.bind(service),
            params: {},
            default: [],
            callback: (data) => deleteChildren(data.list)
          }
        },
        size: 'small'
      },
      {
        label: '状态',
        prop: 'status',
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
        prop: 'date',
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
  },
  table: [
    {
      prop: 'i_id',
      label: '编号',
      width: '100'
    },
    {
      prop: 'c_name',
      label: '分类',
      width: '200'
    },
    {
      prop: 'title',
      label: '标题名称'
    },
    {
      prop: 'status',
      label: '状态',
      width: '100'
    },
    {
      prop: 'status',
      label: '目标对象',
      width: '120'
    },
    {
      prop: 'tag_read_count',
      label: '已读人数/目标人数',
      width: '200'
    },
    {
      prop: 'tag_count',
      label: '阅读率',
      width: '120'
    },
    {
      prop: 'updated_at',
      label: '更新时间',
      width: '120'
    },
    {
      prop: 'admin_name',
      label: '操作人',
      width: '120'
    },
    {
      prop: 'operation',
      label: '操作',
      width: '200',
      scopedSlots: true
    }
  ]
}
