export default {
  render() {
    return <div>{this.$scopedSlot.default()}</div>;
  }
};
