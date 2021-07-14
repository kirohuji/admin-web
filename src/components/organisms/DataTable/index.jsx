import './style.scss'
export default {
  props: ['column', 'data', 'total'],
  data: () => ({
    table: {},
    page: {
      layout: `total, sizes, prev, pager, next, jumper`,
      total: 0,
      'page-sizes': [10, 15, 30, 100],
      'page-size': 10,
      background: false
    }
  }),
  computed: {
    pagination() {
      return {
        limit: this.page['page-size'],
        page: this.$refs.pagination.internalCurrentPage,
        total: this.page.total
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.page.total = this.total || this.data.length
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleSizeChange(data) {
      console.log(data)
      this.$emit('change')
    },
    handleCurrentChange(data) {
      console.log(data)
      this.$emit('change')
    }
  },
  render() {
    return (
      <div class='data-table'>
        <ElTable
          ref='table'
          data={this.data}
          {...{
            props: {
              ...this.$attrs,
              ...this.table
            }
          }}
        >
          {this.column.map((item) => (
            <ElTableColumn
              {...{
                props: item,
                scopedSlots: {
                  default: this.$scopedSlots[item.prop]
                }
              }}
            />
          ))}
        </ElTable>
        {!this.$attrs.noPage && (
          <ElPagination
            class='pagination'
            ref='pagination'
            {...{
              props: this.page,
              on: {
                'size-change': this.handleSizeChange,
                'current-change': this.handleCurrentChange
              }
            }}
          ></ElPagination>
        )}
      </div>
    )
  }
}
