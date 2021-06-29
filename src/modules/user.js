const module = 'c_admin'
export class Node {
    title = ''
    name = ''
    children = ''
}
export class OrganmanageService {
  constructor({ api }) {
    this.api = api
  }
  makeUserService({ api }) {
    this.api = api
    return this
  }
  getrbacnode() {
    return this.api.post(`${module}/checkedtypenode`)
  }
}
