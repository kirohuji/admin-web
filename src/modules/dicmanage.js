const module = 'c_admin/category'
export class Node {
    node_id = ''
    p_node_id = ''
    name = ''
    children = []
}
export class DicmanageService {
  constructor({ api }) {
    this.api = api
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }
  // 删除字典类型节点
  deltypenode({ c_id, node_id }) {
    return this.api.post(`${module}/deltypenode`, {
      c_id,
      node_id
    })
  }
  // 新增字典类型节点
  createtypenode({ c_id, name, p_node_id }) {
    return this.api.post(`${module}/createtypenode`, {
      c_id,
      name,
      p_node_id
    })
  }
  // 上移字典类型节点
  moveupnode({ c_id, node_id }) {
    return this.api.post(`${module}/moveupnode`, {
      c_id,
      node_id
    })
  }
  // 修改字典类型节点
  editnode({ c_id, name, node_id }) {
    return this.api.post(`${module}/editnode`, {
      c_id,
      name,
      node_id
    })
  }
  // 获取字典类型分类左侧列表
  gettablist() {
    return this.api.post(`${module}/gettabtypedata`)
  }
  // 获取字典类型分类节点列表
  gettabtypedata(c_id) {
    return this.api.post(`${module}/gettabtypedata`, {
      c_id
    })
  }
}
