export default {
  menus: {
    list: [
      {
        c_id: 1,
        name: '咨询类型',
        type: 'infomanage'
      },
      {
        c_id: 2,
        name: '宣教类型',
        type: 'prpgd_edu'
      },
      {
        c_id: 3,
        name: '活动类型',
        type: 'active'
      },
      {
        c_id: 4,
        name: '消息类型',
        type: 'news'
      },
      {
        c_id: 5,
        name: '发布主体',
        type: 'publisher'
      }
    ]
  },
  tree: {
    list: [
      {
        node_id: 1,
        p_node_id: 0,
        name: '健康知识',
        children: [
          {
            node_id: 3,
            p_node_id: 1,
            name: '健康养生',
            children: []
          },
          {
            node_id: 6,
            p_node_id: 1,
            name: '健康知识',
            children: []
          },
          {
            node_id: 2,
            p_node_id: 1,
            name: '生活健康知识',
            children: []
          }
        ]
      },
      {
        node_id: 10,
        p_node_id: 0,
        name: '测试1',
        children: []
      },
      {
        node_id: 5,
        p_node_id: 0,
        name: '健康测试',
        children: []
      }
    ]
  }
}
