import './style.scss'
export default {
  props: ['column', 'data', 'total', 'idKey', 'selectData'],
  data: () => ({
    table: {},
    multipleSelectionAll: [], // 所有选中的数据包含跨页数据
    multipleSelection: [], // 当前页选中的数据
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
    selectData: {
      handler(val) {
        console.log('执行', val)
        this.multipleSelectionAll = val
        this.setSelectRow()
      },
      immediate: true,
      deep: true
    },
    data: {
      handler() {
        this.page.total = this.total || this.data.length
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach((row) => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      // 得到当前页没有选中的id
      this.data.forEach((row) => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach((id) => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData()
    },
    handleSelectionChange(val) {
      // table组件选中事件,记得加上@selection-change="handleSelectionChange"
      this.multipleSelection = val
    },
    // 设置选中的方法
    setSelectRow() {
      // debugger
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      this.multipleSelectionAll.forEach((row) => {
        selectAllIds.push(row[idKey])
      })
      console.log(selectAllIds)
      // debugger
      this.$nextTick(() => {
        this.$refs.table.clearSelection()
        for (var i = 0; i < this.data.length; i++) {
          if (selectAllIds.indexOf(this.data[i][idKey]) >= 0) {
            // 设置选中，记住table组件需要使用ref="table"
            this.$refs.table.toggleRowSelection(this.data[i], true)
          }
        }
      })
    },
    handleSizeChange(data) {
      this.changePageCoreRecordData()
      this.$emit('change')
    },
    handleCurrentChange(data) {
      this.changePageCoreRecordData()
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
            },
            on: {
              'selection-change': this.handleSelectionChange
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
