const module = 'c_admin/organization'
export class Node {
    node_id = ''
    p_node_id = ''
    name = ''
    is_checked = ''
    children = []
}
export class OrganmanageService {
  constructor({ api }) {
    this.api = api
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }

  //   checkedtypenode(o_id, node_id_arr) {
  //     return this.api.post(`${module}/checkedtypenode`, {
  //       o_id,
  //       node_id_arr
  //     })
  //   }
  //   deltypenode({ o_id, node_id }) {
  //     return this.api.post(`${module}/deltypenode`, {
  //       o_id,
  //       node_id
  //     })
  //   }
  //   createtypenode({ o_id, name, p_node_id }) {
  //     return this.api.post(`${module}/createtypenode`, {
  //       o_id,
  //       name,
  //       p_node_id
  //     })
  //   }
  //   editnode({ o_id, name, node_id }) {
  //     return this.api.post(`${module}/editnode`, {
  //       o_id,
  //       name,
  //       node_id
  //     })
  //   }
  // 获取机构字典
  gettablist() {
    return this.api.post(`${module}/gettabtypedata`)
  }
  // 获取机构字典列表
  gettabtypedata(o_id) {
    return this.api.post(`${module}/gettabtypedata`, {
      o_id
    })
  }
}
