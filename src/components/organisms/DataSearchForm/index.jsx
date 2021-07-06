import _ from 'lodash'
import BaseEnter from '@/components/molecules/BaseEnter'
import BaseSearchButton from '@/components/molecules/BaseSearchButton'
import Thenable from '@/components/atoms/Thenable'
import './style.scss'
const FormItem = {
  name: 'FormItem',
  props: ['item', 'value', 'zValue','context'],
  watch: {
    zValue: {
      handler() {
        if (this.item.isReal) {
          this.$emit('search')
        }
      },
      deep: true
    }
  },
  render() {
    return (
      <ElFormItem
        {...{
          props: this.item
        }}
      >
        {this.item.async ? (
          <Thenable
            {...{
              props: {
                vm: this.context,
                ...this.item.options.call(this.vm)
              },
              scopedSlots: {
                default: ({ result: { data }}) => (
                  <BaseEnter
                    {...{
                      props: { model: this.value },
                      attrs: {
                        ...this.item,
                        options: data
                      },
                      on: this.$listeners
                    }}
                  />
                )
              }
            }}
          ></Thenable>
        ) : (
          <BaseEnter
            {...{
              props: { model: this.value },
              attrs: this.item,
              on: this.$listeners
            }}
          />
        )}
      </ElFormItem>
    )
  }
}
export default {
  /**
     * 表单的加载事件
     */
  props: ['forms', 'buttons', 'mode'],
  component: {
    BaseEnter,
    BaseSearchButton
  },
  data() {
    return {
      model: {}
    }
  },
  computed: {
    row() {
      return this.forms.col > 0 ? Math.round(this.forms.fields.length / this.forms.col) : 0
    },
    span() {
      return this.forms.col > 0 ? Math.round(24 / this.forms.col) : 0
    }
  },
  created() {
    this.transform()
  },
  methods: {
    search() {
      this.$emit('search', this.model)
    },
    transform() {
      this.$set(
        this,
        'model',
        _.zipObject(
          this.forms.fields.map((n) => n.prop),
          this.forms.fields.map((n) => _.defaultTo(n.default, ''))
        )
      )
    },
    has(rIndex, cIndex) {
      return cIndex + 1 > rIndex * this.forms.col && cIndex + 1 <= (rIndex + 1) * this.forms.col
    }
  },
  render(h) {
    return (
      <ElForm inline class='data-search-form'>
        <div style='display: flex'>
          {this.$scopedSlots.left && this.$scopedSlots.left()}
          {/* {this.mode === 'search' && <BaseSearchButton />} */}
          {this.forms.col === 0
            ? this.forms.fields.map((item) => (
              <FormItem
                item={item}
                value={this.model}
                zValue={this.model[item.prop]}
                context={this.context}
                {...{
                  on: this.$listeners
                }}
              />
            ))
            : Array.apply(null, { length: this.row }).map((r, rIndex) => (
              <ElRow>
                {this.forms.fields.map(
                  (item, index) =>
                    this.has(rIndex, index) && (
                      <ElCol span={this.span}>
                        <FormItem
                          item={item}
                          value={this.model}
                          zValue={this.model[item.prop]}
                          context={this.context}
                          {...{
                            on: this.$listeners
                          }}
                        />
                      </ElCol>
                    )
                )}
              </ElRow>
            ))}
        </div>
        {this.$scopedSlots.right ? (
          <div class='buttons'>{this.$scopedSlots.right()}</div>
        ) : (
          <div class='buttons'>
            <ElButton type='primary' size='small' onClick={() => this.search()}>
                            搜索
            </ElButton>
            <ElButton size='small' basic>
                            导出
            </ElButton>
          </div>
        )}
      </ElForm>
    )
  }
}
