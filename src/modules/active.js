import { Service } from './base'
const module = 'c_admin/information/active'
export class Active {
  constructor(i_id, node_id, title, image, content, status) {
    this.i_id = i_id
    this.node_id = node_id
    this.title = title
    this.image = image
    this.content = content
    this.status = status
  }
}
export class ActiveService extends Service {
  constructor({ api }) {
    super({ api, module })
  }
  //  分类列表
  getcategorylist() {
    return this.api.post(`${this.module}/getcategorylist`)
  }
}
