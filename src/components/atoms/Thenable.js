export default {
  props: ['runner', 'params', 'callback', 'default', 'vm'],
  data() {
    return {
      result: {
        loading: true,
        error: false,
        data: []
      }
    }
  },
  created() {
    if (this.default) {
      this.result.data = this.default
    }
    if (this.runner) {
      this.runner(this.params)
        .then((res) => this.callback(res.data))
        .then((res) => (this.result.data = res))
    }
  },
  render() {
    return this.$scopedSlots.default({
      result: this.result
    })
  }
}
