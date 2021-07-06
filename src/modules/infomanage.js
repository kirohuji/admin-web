import { Service } from './base'
const module = 'c_admin/information/infomanage'
export class Infomanage {
  constructor(i_id, node_id, title, image, content, status) {
    this.i_id = i_id
    this.node_id = node_id
    this.title = title
    this.image = image
    this.content = content
    this.status = status
  }
}
export class InfomanageService extends Service {
  constructor(api) {
    super({ api, module })
  }
}
